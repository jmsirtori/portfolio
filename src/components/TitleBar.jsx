// Win95-style title bar: label on the left, window controls on the right.
// Minimize / maximize are decorative; pass `onClose` to render a real close button.

export default function TitleBar({ id, children, onClose, closeRef, closeLabel = 'Close' }) {
  return (
    <div className="title-bar">
      <span className="title-bar-text" id={id}>{children}</span>
      <div className="title-bar-controls">
        <span className="title-bar-btn" aria-hidden="true">_</span>
        <span className="title-bar-btn" aria-hidden="true">□</span>
        {onClose && (
          <button
            type="button"
            ref={closeRef}
            className="title-bar-btn title-bar-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <span aria-hidden="true">✕</span>
          </button>
        )}
      </div>
    </div>
  )
}
