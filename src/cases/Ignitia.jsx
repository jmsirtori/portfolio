import { useEffect, useRef } from 'react'

const sections = [
  'Problem',
  'Who It\'s For',
  'Key Design Decisions',
  'Building It',
  'Testing',
  'What I Learned',
  'What\'s Next',
  'Reflection',
]

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
      aria-label="Ignitia SEO Auditor — Case Study"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="case-window" ref={windowRef}>
        <div className="case-title-bar">
          <span>ignitia_seo_auditor.case — Case Study</span>
          <button
            ref={closeRef}
            className="case-close-btn"
            onClick={onClose}
            aria-label="Close case study"
          >
            ✕
          </button>
        </div>
        <div className="case-body">
          <div className="case-in-progress">
            <p><span aria-hidden="true">🚧 </span>Case study in progress</p>
            <strong>Full write-up coming December 5, 2026</strong>
          </div>
          <ol className="case-sections" aria-label="Case study sections">
            {sections.map((section, i) => (
              <li key={section}>
                <span className="section-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
