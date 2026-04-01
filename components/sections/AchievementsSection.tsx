'use client'

import { NoisePanel } from '@/components/visual/NoisePanel'
import { SectionOrnament, TerminalSparkMark } from '@/components/visual/DecorIcons'

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
    <section className="relative w-full overflow-hidden px-6 py-20 bg-background">
      <div className="mx-auto w-full max-w-3xl">
        <SectionOrnament className="mb-10" />

        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="fade-in-up text-xl font-serif font-semibold tracking-tight">
            highlights
          </h3>
          <div className="hidden opacity-80 sm:block">
            <TerminalSparkMark className="h-12 w-40 text-foreground" />
          </div>
        </div>

        <NoisePanel className="p-6 sm:p-8">
          <ul className="space-y-6">
            {ACHIEVEMENTS.map((achievement, idx) => (
              <li
                key={idx}
                className="fade-in-up flex gap-4 text-sm leading-relaxed text-foreground/80"
                style={{ animationDelay: `${idx * 75}ms` }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/40 ring-1 ring-emerald-400/20"
                  aria-hidden
                />
                <span className="min-w-0">{achievement}</span>
              </li>
            ))}
          </ul>
        </NoisePanel>
      </div>
    </section>
  )
}
