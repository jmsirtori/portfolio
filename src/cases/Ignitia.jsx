import { useEffect, useRef } from 'react'
import { marked } from 'marked'
import TitleBar from '../components/TitleBar'
import { HourglassIcon } from '../components/Icons'
import source from '../../content/ignitia-case-study.md?raw'

// The draft file starts with internal working notes and ends with an asset
// checklist; only the part between the title and the checklist is published.
const START = '# An AI audit tool'
const END = '### Assets to produce'
const body = source
  .slice(source.indexOf(START), source.indexOf(END))
  .replace(/\n---\s*$/, '')

// Trusted content (our own file), so rendering it as HTML is safe.
const html = marked
  .parse(body, { breaks: true })
  // Wide tables scroll sideways on small screens; tabindex lets keyboard users scroll them.
  .replace(/<table>/g, '<div class="case-table" role="region" aria-label="Table" tabindex="0"><table>')
  .replace(/<\/table>/g, '</table></div>')
  // Unfinished parts of the draft show as visible placeholders.
  .replace(/<p>\[FILL:([\s\S]*?)\]<\/p>/g, '<p class="case-placeholder">To come:$1</p>')
  // External links open in a new tab.
  .replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http')

export default function Ignitia({ onClose }) {
  const closeRef = useRef(null)
  const windowRef = useRef(null)

  // On open: focus close button and lock background scroll.
  // On close: restore scroll and return focus to the folder that opened it.
  useEffect(() => {
    const trigger = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      if (trigger instanceof HTMLElement) trigger.focus()
    }
  }, [])

  // Escape closes; Tab stays trapped inside the dialog
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !windowRef.current) return
      const focusable = windowRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!windowRef.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="case-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ignitia-dialog-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="case-window" ref={windowRef}>
        <TitleBar
          id="ignitia-dialog-title"
          onClose={onClose}
          closeRef={closeRef}
          closeLabel="Close case study"
        >
          ignitia_seo_auditor.case — Case Study
        </TitleBar>
        <div className="case-body">
          <p className="case-draft-banner">
            <HourglassIcon width={16} height={16} />
            Draft · final version December 5, 2026
          </p>
          <article className="case-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  )
}
