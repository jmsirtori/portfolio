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

  // Focus close button on open, restore focus on close
  useEffect(() => {
    closeRef.current?.focus()
    return () => {}
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
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
      <div className="case-window">
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
            <p>🚧 Case study in progress</p>
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
