import { FolderIcon, LockIcon, HourglassIcon } from './Icons'

const statusIcons = {
  'in-progress': HourglassIcon,
  locked: LockIcon,
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
  const StatusIcon = statusIcons[status]
  const TabIcon = isLocked ? LockIcon : FolderIcon

  // Locked folders stay focusable (aria-disabled instead of disabled) so
  // keyboard and screen reader users still discover them.
  // No aria-label: the visible text is the accessible name (WCAG 2.5.3 Label
  // in Name), so voice-control users can activate it by what they see.
  return (
    <button
      type="button"
      className="folder-card"
      onClick={isLocked ? undefined : onClick}
      aria-disabled={isLocked || undefined}
    >
      <div className="folder-tab">
        <TabIcon className="folder-icon" />
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
          {StatusIcon && <StatusIcon width={14} height={14} />}
          {statusLabel}
        </span>
      </div>
    </button>
  )
}
