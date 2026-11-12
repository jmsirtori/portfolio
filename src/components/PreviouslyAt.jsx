import TitleBar from './TitleBar'

const rows = [
  {
    label: 'Previously at:',
    items: ['Universal Pictures', 'PepsiCo', 'Ignitia'],
  },
  {
    label: 'Education:',
    items: ['Tecnológico de Monterrey', 'University of Toronto'],
  },
]

export default function PreviouslyAt() {
  return (
    <section className="previously-at" aria-label="Experience and education">
      <TitleBar>background.txt</TitleBar>
      <dl className="previously-at-inner">
        {rows.map(({ label, items }) => (
          <div className="previously-at-row" key={label}>
            <dt className="previously-at-label">{label}</dt>
            <dd>
              <ul className="previously-at-list">
                {items.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
