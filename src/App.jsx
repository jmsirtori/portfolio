import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import PreviouslyAt from './components/PreviouslyAt'
import FolderCard from './components/FolderCard'
import TitleBar from './components/TitleBar'

const IgnitiaCase = lazy(() => import('./cases/Ignitia'))

// Case studies are deep-linkable via the URL hash (e.g. /#ignitia),
// so they can be shared directly and the browser Back button closes them.
const CASES = ['ignitia']
const caseFromHash = () => {
  const id = window.location.hash.slice(1)
  return CASES.includes(id) ? id : null
}

export default function App() {
  const [openCase, setOpenCase] = useState(caseFromHash)
  // True when the case was opened by clicking a folder (so closing can go Back
  // instead of leaving a duplicate history entry).
  const openedInApp = useRef(false)

  useEffect(() => {
    const onHashChange = () => {
      const id = caseFromHash()
      if (!id) openedInApp.current = false
      setOpenCase(id)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const openCaseStudy = (id) => {
    openedInApp.current = true
    window.location.hash = id
  }

  const closeCaseStudy = useCallback(() => {
    if (openedInApp.current) {
      window.history.back()
    } else {
      // Landed directly on /#ignitia: drop the hash without leaving the site.
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setOpenCase(null)
    }
  }, [])

  return (
    <div className="desktop">
      {/* Header */}
      <header className="desktop-header">
        <TitleBar>juan_manuel_sirtori — portfolio v1</TitleBar>
        <div className="desktop-intro">
          <h1>Juan Manuel Sirtori</h1>
          <p className="role">UX &amp; Product Designer</p>
          <p className="tagline">
            I design tools that solve real problems — from SEO audits to service experiences.
          </p>
        </div>
      </header>

      {/* Experience & education */}
      <PreviouslyAt />

      {/* File explorer */}
      <main id="main" className="file-explorer">
        <div className="explorer-toolbar" aria-hidden="true">
          Work/
        </div>
        <div className="folder-grid" role="list" aria-label="Case studies">
          <div role="listitem">
            <FolderCard
              title="ignitia_seo_auditor"
              hook="The audit tool I built to stop guessing"
              properties="2026  ·  Tool Design  ·  End-to-end"
              status="in-progress"
              statusLabel="Case study in progress — Dec 5"
              previewText="SEO Auditor · React + Vercel · Anthropic API"
              onClick={() => openCaseStudy('ignitia')}
            />
          </div>
          <div role="listitem">
            <FolderCard
              title="toronto_bike_repair"
              hook="Fixing the ride nobody wants to fix"
              properties="2026  ·  Conceptual  ·  Research"
              status="locked"
              statusLabel="Coming soon"
              onClick={null}
            />
          </div>
        </div>
      </main>

      {/* Case study overlay */}
      {openCase === 'ignitia' && (
        <Suspense fallback={null}>
          <IgnitiaCase onClose={closeCaseStudy} />
        </Suspense>
      )}
    </div>
  )
}
