const companies = [
  'Universal Pictures',
  'PepsiCo',
  'University of Toronto',
  'Ignitia',
]

export default function PreviouslyAt() {
  return (
    <section className="previously-at" aria-label="Previous experience">
      <div className="title-bar">
        <div className="title-bar-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        previously_at.txt
      </div>
      <div className="previously-at-inner">
        <span className="previously-at-label">Previously at:</span>
        <ul className="previously-at-list">
          {companies.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
