import { lazy, Suspense, useState } from 'react'
import './App.css'
import PreviouslyAt from './components/PreviouslyAt'
import FolderCard from './components/FolderCard'

const IgnitiaCase = lazy(() => import('./cases/Ignitia'))

export default function App() {
  const [openCase, setOpenCase] = useState(null)

  return (
    <div className="desktop">
      {/* Header */}
      <header className="desktop-header">
        <div className="title-bar">
          <div className="title-bar-dots" aria-hidden="true">
            <span /><span /><span />
          </div>
          juan_manuel_sirtori — portfolio v1
        </div>
        <div className="desktop-intro">
          <h1>Juan Manuel Sirtori</h1>
          <p className="role">UX &amp; Product Designer</p>
          <p className="tagline">
            I design tools that solve real problems — from SEO audits to service experiences.
          </p>
        </div>
      </header>

      {/* Previously at */}
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
              onClick={() => setOpenCase('ignitia')}
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
          <IgnitiaCase onClose={() => setOpenCase(null)} />
        </Suspense>
      )}
    </div>
  )
}
