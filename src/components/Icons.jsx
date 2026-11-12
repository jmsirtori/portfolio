// Pixel-art icons on a 16×16 grid. Drawn as SVG (not emoji) so they render
// identically on every OS and match the hard-edged shell. All decorative.

const base = {
  viewBox: '0 0 16 16',
  width: 20,
  height: 20,
  shapeRendering: 'crispEdges',
  'aria-hidden': true,
  focusable: false,
}

export function FolderIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M1 3h6v1h8v10H1z" fill="#000" />
      <path d="M2 4h4v1h8v8H2z" fill="#ffd84d" />
      <path d="M2 6h12v1H2z" fill="#fff3b0" />
    </svg>
  )
}

export function LockIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 1h6v1h1v5h-2V3H6v4H4V2h1z" fill="#000" />
      <path d="M3 7h10v8H3z" fill="#000" />
      <path d="M4 8h8v6H4z" fill="#c9a227" />
      <path d="M7 10h2v3H7z" fill="#000" />
    </svg>
  )
}

export function HourglassIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 1h10v2H3zM3 13h10v2H3z" fill="#000" />
      <path d="M4 3h8v3h-1v1h-1v2h1v1h1v3H4v-3h1V9h1V7H5V6H4z" fill="#000" />
      <path d="M5 3h6v2h-1v1H9v4h1v1h1v2H5v-2h1v-1h1V6H6V5H5z" fill="#fff" />
      <path d="M6 4h4v1H6zM5 11h6v2H5z" fill="#c9a227" />
    </svg>
  )
}
