export type WorkItem = {
  title: string
  /** Optional line under the title — role, org, stack, etc. */
  role?: string
  description: string
  link: string
}

/**
 * Full catalog (order: featured on home first, then the rest).
 * Home shows the first `HOME_WORK_COUNT` entries.
 */
export const HOME_WORK_COUNT = 5

export const ALL_WORK_ITEMS: WorkItem[] = [
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
    link: 'https://www.continuumworks.app',
  },
  {
    title: 'Zenventures',
    role: 'LifeQuest Balance 2025 · 1st overall + system design ($1,100)',
    description:
      'Gamified habit web app—quests, XP, streaks, chain-reaction rewards, goal-gradient mechanics, and Gemini-powered insights that generate custom quests from your progress. Next.js, Firebase Auth + Firestore (no hardcoded data), Gemini API. Built with Shashank Chauhan; deployed on Vercel.',
    link: 'https://github.com/avyuktsoni0731/Zenventure',
  },
  {
    title: 'CommitLens',
    role: 'open source · FastAPI · GitHub App',
    description:
      'PR review agent: instant reviews on PR open/update, AST/pattern bug detection, learning from human comments (PostgreSQL), Claude summaries, Slack notifications. Python 3.11, Redis/RQ workers, Docker, Cloud Run + Neon.',
    link: 'https://github.com/avyuktsoni0731/CommitLens',
  },
  {
    title: 'NeuroSense',
    role: 'hardware · signal processing · ML',
    description:
      'Wearable neurological screening for Parkinson’s and epilepsy: ESP32, 100 Hz tremor analysis with 256-point FFT, MediaPipe + Random Forest on finger-tapping video, WebSockets for sub-100 ms streaming. SIH 2025 National Finalist (Hardware Edition).',
    link: 'https://tinted-agustinia-fc4.notion.site/NeuroSense-2d30d86102a48085897dd48648b80314',
  },
  {
    title: 'VoltSense',
    role: 'lead · Google Solution Challenge 2025',
    description:
      'AI IoT stack for real-time voltage anomaly detection: custom smart switch, web dashboard, mobile app. Node.js, Firebase, Docker, Cloud Run, Vertex AI (Gemini). Top 105 of 3700+ teams; authoring IEEE Impact 2026 paper.',
    link: 'https://github.com/GDSC-ZHCET/VoltSense',
  },
  {
    title: 'MyCord',
    role: 'WebRTC · Electron',
    description:
      'P2P voice, 4K@60fps screen share, and file transfer over WebRTC. Custom TURN and signaling from scratch; Electron app with live stats, secure IPC, and native screen picker.',
    link: 'https://tinted-agustinia-fc4.notion.site/MyCord-Personal-Discord-Alternative-2960d86102a480f89fccc620e65b2443?pvs=143',
  },
  {
    title: 'BIOSage 2.0',
    role: 'rapid rebuild hackathon · 1st place',
    description:
      'BIOS-like web UI over a locally hosted LLaMA 3.2 3B on EC2—offline diagnostics and system vitals via systeminformation. Won $1,000 + Best Technical Implementation.',
    link: 'https://github.com/avyuktsoni0731/BIOSage',
  },
  {
    title: 'MicroCLI',
    role: 'Python · embedded',
    description:
      'CLI for direct ESP32/Arduino interaction—serial REPL-style commands (LED ON, PING) without constant re-flashing.',
    link: '#',
  },
  {
    title: 'CipherVault',
    role: 'Flask · Next.js · Google Drive API',
    description:
      'Secure file platform: encrypted uploads, one-time downloads, access logging with Google Drive. OAuth 2.0, SHA-256 verification, client-side encryption—fast transactions with full traceability.',
    link: '#',
  },
  {
    title: 'EttyDB',
    role: 'Telegram · MongoDB · Express',
    description:
      'Remote database management through Telegram—real-time updates and mobile-first editing for web admins without a traditional backend panel.',
    link: '#',
  },
]

export const HOME_WORK_ITEMS = ALL_WORK_ITEMS.slice(0, HOME_WORK_COUNT)
