'use client'

type WorkItem = {
  title: string
  /** Optional line under the title — role, org, stack, etc. */
  role?: string
  description: string
  link: string
}

const WORK_ITEMS: WorkItem[] = [
  {
    title: 'stick',
    role: 'co-founder',
    description:
      'Distribution platform for DevTools. 20k users in 5 months, 48k profit.',
    link: 'https://stickapp.club',
  },
  {
    title: 'Real-time Dashboard Systems',
    description:
      'Built several high-frequency dashboard systems for trading and analytics.',
    link: '#',
  },
  {
    title: 'Experimental Music on Streaming',
    role: 'indie artist',
    description:
      '240k streams across Spotify and Apple Music as an indie musician.',
    link: '#',
  },
  {
    title: 'Open Source TypeScript',
    description:
      'Contributing to Aslllios and other rate limiting libraries.',
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
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3
                className={`text-lg font-serif font-semibold group-hover:underline ${item.role ? 'mb-1' : 'mb-2'}`}
              >
                {item.title}
              </h3>
              {item.role ? (
                <p className="mb-2 text-[13px] leading-snug text-foreground/45">
                  {item.role}
                </p>
              ) : null}
              <p className="text-sm leading-relaxed text-foreground/70">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
