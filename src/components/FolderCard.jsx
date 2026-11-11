export default function FolderCard({
  title,
  hook,
  properties,
  status,
  statusLabel,
  previewText,
  onClick,
}) {
  const isLocked = status === 'locked'

  return (
    <button
      className="folder-card"
      onClick={onClick}
      disabled={isLocked}
      aria-label={isLocked ? `${title} — ${statusLabel}` : `Open ${title} case study`}
    >
      <div className="folder-tab">
        <span className="folder-icon" aria-hidden="true">
          {isLocked ? '🔒' : '📁'}
        </span>
        <span className="folder-filename">{title}</span>
      </div>
      <div className="folder-body">
        <div className="folder-preview" aria-hidden="true">
          <p className="folder-preview-placeholder">
            {isLocked ? '— coming soon —' : (previewText || '[ screen preview ]')}
          </p>
        </div>
        <p className="folder-hook">{hook}</p>
        <p className="folder-properties">{properties}</p>
        <span className={`folder-status ${status}`}>{statusLabel}</span>
      </div>
    </button>
  )
}
