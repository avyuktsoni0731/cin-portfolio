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
    role: 'senior full-stack developer',
    description:
      'Sole developer of the React Native app (Play Store beta) and Express backend—models, controllers, and APIs. Dockerized and deployed services on AWS EC2; own the site, CI/CD, and DevOps.',
    link: 'https://stickapp.club',
  },
  {
    title: 'Continuum.ai',
    role: 'founder · continuum hq',
    description:
      'Autonomous agentic stack with Model Context Protocol (MCP) and Agno: natural-language control of Jira, GitHub, and Google Calendar from Slack. FastAPI, PostgreSQL, Redis, Celery, Gemini—cross-platform workflows and scheduling from real-time availability.',
    link: '#',
  },
  {
    title: 'NeuroSense',
    role: 'hardware · signal processing · ML',
    description:
      'Wearable neurological screening for Parkinson’s and epilepsy: ESP32, 100 Hz tremor analysis with 256-point FFT, MediaPipe + Random Forest on finger-tapping video, WebSockets for sub-100 ms streaming. SIH 2025 National Finalist (Hardware Edition).',
    link: '#',
  },
  {
    title: 'VoltSense',
    role: 'lead · Google Solution Challenge 2025',
    description:
      'AI IoT stack for real-time voltage anomaly detection: custom smart switch, web dashboard, mobile app. Node.js, Firebase, Docker, Cloud Run, Vertex AI (Gemini). Top 105 of 3700+ teams; authoring IEEE Impact 2026 paper.',
    link: '#',
  },
  {
    title: 'MyCord',
    role: 'WebRTC · Electron',
    description:
      'P2P voice, 4K@60fps screen share, and file transfer over WebRTC. Custom TURN and signaling from scratch; Electron app with live stats, secure IPC, and native screen picker.',
    link: '#',
  },
  {
    title: 'BIOSage 2.0',
    role: 'rapid rebuild hackathon · 1st place',
    description:
      'BIOS-like web UI over a locally hosted LLaMA 3.2 3B on EC2—offline diagnostics and system vitals via systeminformation. Won $1,000 + Best Technical Implementation.',
    link: '#',
  },
  {
    title: 'MicroCLI',
    role: 'Python · embedded',
    description:
      'CLI for direct ESP32/Arduino interaction—serial REPL-style commands (LED ON, PING) without constant re-flashing.',
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
          {WORK_ITEMS.map((item, idx) => {
            const external =
              item.link.startsWith('http') && item.link !== '#'
            return (
            <a
              key={idx}
              href={item.link}
              className="group fade-in-up block hover:opacity-75 transition-opacity"
              style={{ animationDelay: `${idx * 100}ms` }}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
