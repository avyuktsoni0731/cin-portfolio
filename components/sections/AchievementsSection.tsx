'use client'

const ACHIEVEMENTS = [
  'National finalist @ Smart India Hackathon 2025 (Hardware Edition) with NeuroSense — MoE / AICTE grand finale.',
  'Top 105 / 3,700+ teams @ Google Solution Challenge 2025 — led VoltSense (AI IoT anomaly detection).',
  'Winner @ Amulate Hackathon (BMW Challenge) with Continuum.ai — selected for internship interview @ BMW Group, Munich.',
  'Two-time hackathon winner ($1,100 each): Rapid Rebuild (BIOSage 2.0, Best Technical Implementation) and LifeQuest Balance (Zenventures, Best System Design).',
  'Web & Tech Lead @ Google Developer Groups on Campus, ZHCET — led 13 people across three full-stack projects; later mentor.',
  'Joint coordinator @ AMURoboclub — TechnoXian 9.0 mentoring; flight & ground software for IN-SPACe CANSAT (ASI); Vercera 4.0 dashboard (200+ registrations, Next.js + PocketBase).',
  'Head of Web Operations @ IEEE Student Branch, AMU — workshops and events including Code-o-Fiesta 3.0; technical org for AMUROVc 3.0.',
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
