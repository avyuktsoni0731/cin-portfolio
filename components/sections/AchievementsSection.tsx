'use client'

const ACHIEVEMENTS = [
  'Co-built sprint.dev, a DevTools distribution platform with 20k users in 5 months, 48k profit',
  'Won 23 hackathons at places like YC, UIUC, and Princeton',
  '240k streams originally on Spotify and Apple Music as an indie musician',
  'Got 120 mil views on social media with 130k followers',
  'Drone research at NASA USRC',
  'Got software engineering infra offers from Disney and Intuit',
  'Published research on real-time systems and distributed computing',
  'Built experimental music production tools used by 500+ musicians',
]

export default function AchievementsSection() {
  return (
    <section className="relative w-full px-6 py-20 bg-background">
      <div className="mx-auto w-full max-w-3xl">
        <h3 className="text-xl font-serif font-semibold tracking-tight fade-in-up mb-10">
          highlights
        </h3>

        <ul className="space-y-6">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <li
              key={idx}
              className="fade-in-up flex gap-3 text-sm leading-relaxed text-foreground/80"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <span className="mt-0.5 flex-shrink-0 font-semibold text-primary">•</span>
              <span className="min-w-0">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
