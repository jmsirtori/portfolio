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
  {
    label: 'Contact:',
    items: [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jmsirtori/' },
      { name: 'juansirtori@gmail.com', href: 'mailto:juansirtori@gmail.com' },
    ],
  },
]

export default function PreviouslyAt() {
  return (
    <section className="previously-at" aria-label="Experience, education and contact">
      <TitleBar>background.txt</TitleBar>
      <dl className="previously-at-inner">
        {rows.map(({ label, items }) => (
          <div className="previously-at-row" key={label}>
            <dt className="previously-at-label">{label}</dt>
            <dd>
              <ul className="previously-at-list">
                {items.map((item) =>
                  typeof item === 'string' ? (
                    <li key={item}>{item}</li>
                  ) : (
                    <li key={item.name}>
                      <a href={item.href}>{item.name}</a>
                    </li>
                  )
                )}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
