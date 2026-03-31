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
    <section className="relative w-full py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-serif font-semibold mb-12 tracking-tight fade-in-up">
          highlights
        </h3>

        <ul className="space-y-6">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <li
              key={idx}
              className="flex gap-4 fade-in-up text-sm text-foreground/80 leading-relaxed"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
