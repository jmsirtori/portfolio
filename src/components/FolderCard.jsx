const statusIcons = {
  'in-progress': '🚧',
  locked: '🔒',
}

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

  // Locked folders stay focusable (aria-disabled instead of disabled) so
  // keyboard and screen reader users still discover them.
  return (
    <button
      type="button"
      className="folder-card"
      onClick={isLocked ? undefined : onClick}
      aria-disabled={isLocked || undefined}
      aria-label={
        isLocked
          ? `${title}: ${hook}. ${statusLabel}`
          : `Open ${title} case study: ${hook}. ${statusLabel}`
      }
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
        <span className={`folder-status ${status}`}>
          <span aria-hidden="true">{statusIcons[status]} </span>
          {statusLabel}
        </span>
      </div>
    </button>
  )
}
