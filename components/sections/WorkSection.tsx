'use client'

const WORK_ITEMS = [
  {
    title: 'sprint.dev',
    description: 'Distribution platform for DevTools. 20k users in 5 months, 48k profit.',
    link: 'https://sprint.dev',
  },
  {
    title: 'Real-time Dashboard Systems',
    description: 'Built several high-frequency dashboard systems for trading and analytics.',
    link: '#',
  },
  {
    title: 'Experimental Music on Streaming',
    description: '240k streams across Spotify and Apple Music as an indie musician.',
    link: '#',
  },
  {
    title: 'Open Source TypeScript',
    description: 'Contributing to Aslllios and other rate limiting libraries.',
    link: 'https://aslllios.com',
  },
  {
    title: 'Hackathon Winner',
    description: 'Won 23 hackathons at YC, UIUC, UIUC, and Princeton.',
    link: '#',
  },
  {
    title: 'Drone Research',
    description: 'NASA USRC research and various aerial robotics projects.',
    link: '#',
  },
]

export default function WorkSection() {
  return (
    <section
      id="work"
      className="relative w-full py-24 px-6 bg-background"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif font-semibold mb-16 tracking-tight fade-in-up">
          work
        </h2>

        <div className="space-y-12">
          {WORK_ITEMS.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="group fade-in-up block hover:opacity-75 transition-opacity"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-lg font-serif font-semibold mb-2 group-hover:underline">
                {item.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
