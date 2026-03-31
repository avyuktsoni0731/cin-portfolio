import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const GITHUB_USER = 'avyuktsoni0731'
const AVATAR_SRC = `https://github.com/${GITHUB_USER}.png`
const INSTAGRAM_BUILDS = 'https://www.instagram.com/avyukt_builds/'

function SectionTitle({
  children,
  kicker,
}: {
  children: ReactNode
  kicker?: string
}) {
  return (
    <div className="mb-8">
      {kicker ? (
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
          {kicker}
        </p>
      ) : null}
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {children}
      </h2>
    </div>
  )
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 text-sm leading-[1.75] text-foreground/85">{children}</div>
  )
}

export function AboutStory() {
  const reelId = process.env.NEXT_PUBLIC_HERO_YOUTUBE_VIDEO_ID

  return (
    <article className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(80,60,120,0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(40,80,100,0.2), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 pb-28 pt-28 md:pt-32">
        {/* Hero */}
        <header className="mb-20 space-y-6">
          <p className="font-mono text-xs tracking-wide text-foreground/45">
            about · the longer version
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            i build systems that still make sense at 2am.
          </h1>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-foreground/70 md:text-lg">
            <p>
              i&apos;m{' '}
              <span className="text-foreground/90">avyukt</span> —{' '}
              <span className="text-foreground/90">
                computer engineering
              </span>{' '}
              at <span className="text-foreground/90">AMU (ZHCET)</span>,{' '}
              <span className="text-foreground/90">pre-final year</span>. i work
              full-stack at a startup (
              <Link
                href="https://stickapp.club"
                className="text-foreground/85 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                stick
              </Link>
              ), run my own company (
              <Link
                href="https://www.continuumworks.app"
                className="text-foreground/85 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                continuum
              </Link>
              ), ship apps, jump into hardware when the problem isn&apos;t only
              software, and i&apos;m working toward an{' '}
              <span className="text-foreground/90">
                international conference paper
              </span>{' '}
              (voltSense / ieee impact line—still in motion).
            </p>
            <p>
              when a project needs it, i handle photography, editing, and
              graphics myself. lately i&apos;ve been putting more of the build
              process on camera—short videos of the messy middle live on{' '}
              <a
                href={INSTAGRAM_BUILDS}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-foreground/85 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                @avyukt_builds
              </a>{' '}
              on instagram.
            </p>
            <p>
              my founder thinks i&apos;m self-obsessed. i&apos;m choosing to read
              that as alignment on narrative. the rest of my time still goes to
              mobile + backend, agents, pr automation, and hardware spikes—esp32,
              wearables, iot—anything where i can&apos;t sleep until the signal
              path makes sense.
            </p>
          </div>
        </header>

        {/* Pull quote */}
        <figure className="my-16 border-y border-border/25 py-10">
          <blockquote className="font-serif text-xl italic leading-snug text-foreground/80 md:text-2xl">
            &ldquo;the best feeling isn&apos;t when it demos—it&apos;s when it
            survives contact with reality.&rdquo;
          </blockquote>
        </figure>

        {/* Avatar + intro — only what maps to your story (resume / linkedin), no filler hobbies */}
        <div className="mb-20 grid gap-10 md:grid-cols-[minmax(0,1fr)_200px] md:items-start">
          <Prose>
            <p>
              i&apos;ve always learned by taking hardware apart and putting it
              back together—that turned into arduino builds and, later, the same
              instinct applied to backends and deploys: make the signal path
              obvious, then make it reliable.
            </p>
            <p>
              hackathons became the default rhythm: ship something real by the
              deadline, learn what breaks, repeat. the big annual events in my
              city were already running long before i showed up—i wasn&apos;t
              the one who built that machine; i just learned to live inside it.
            </p>
          </Prose>
          <figure className="mx-auto w-full max-w-[200px] md:mx-0 md:max-w-none">
            <div className="overflow-hidden rounded-sm border border-border/30 bg-muted/10 ring-1 ring-inset ring-white/5">
              <Image
                src={AVATAR_SRC}
                alt="Avyukt Soni"
                width={200}
                height={200}
                className="h-auto w-full object-cover"
                unoptimized
                priority
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-foreground/45">
              github.com/{GITHUB_USER}
            </figcaption>
          </figure>
        </div>

        <SectionTitle kicker="01">high school → the hackathon gravity well</SectionTitle>
        <Prose>
          <p>
            i found hackathons the way some people find sports: loud rooms,
            impossible deadlines, strangers who became teammates overnight. the
            rule was simple—ship something by sunday. i started hitting every
            event i could reach—including the ones that pack a few hundred people
            into a hall that had been doing that for years before i arrived.
            robots, ar, tools that shouldn&apos;t have worked but did.
          </p>
          <p>
            that&apos;s when it clicked: i didn&apos;t only want to build{' '}
            <em className="text-foreground/90 not-italic">things</em>. i wanted
            to build <em className="text-foreground/90 not-italic">rooms</em>{' '}
            where other people could build too.
          </p>
        </Prose>

        {/* Stats strip */}
        <div className="my-16 grid grid-cols-2 gap-4 rounded-sm border border-border/25 bg-muted/5 p-6 sm:grid-cols-4">
          {[
            { label: 'national finalist', detail: 'SIH 2025 · NeuroSense' },
            { label: 'top 105 / 3700+', detail: 'Google Solution Challenge' },
            { label: '2× $1,100 wins', detail: 'Rapid Rebuild · LifeQuest' },
            { label: 'bmw challenge', detail: 'Amulate · Continuum.ai' },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                {s.label}
              </p>
              <p className="text-xs leading-snug text-foreground/70">{s.detail}</p>
            </div>
          ))}
        </div>

        <SectionTitle kicker="02">amu · circuits, clubs, and real responsibility</SectionTitle>
        <Prose>
          <p>
            at zakir husain college of engineering &amp; technology, i stopped
            treating engineering as coursework and started treating it as
            infrastructure—for myself and for hundreds of others on campus.
          </p>
          <p>
            as{' '}
            <strong className="font-medium text-foreground/90">
              web &amp; tech lead
            </strong>{' '}
            at{' '}
            <strong className="font-medium text-foreground/90">
              google developer groups on campus (ZHCET)
            </strong>
            , i led ~13 people across three full-stack builds, mentored
            volunteers, and took our team&apos;s{' '}
            <Link
              href="https://github.com/GDSC-ZHCET/VoltSense"
              className="underline decoration-border underline-offset-2 hover:text-foreground"
            >
              VoltSense
            </Link>{' '}
            (same track that&apos;s headed toward an ieee-venue paper on smart
            energy / anomaly detection) to the{' '}
            <strong className="font-medium text-foreground/90">
              top 105 of 3,700+
            </strong>{' '}
            in the{' '}
            <strong className="font-medium text-foreground/90">
              google solution challenge 2025
            </strong>
            . later i stayed on as a mentor.
          </p>
          <p>
            with{' '}
            <strong className="font-medium text-foreground/90">AMURoboclub</strong>{' '}
            as joint coordinator, i mentored teams for{' '}
            <strong className="font-medium text-foreground/90">
              TechnoXian 9.0
            </strong>
            , wrote flight and ground software for an{' '}
            <strong className="font-medium text-foreground/90">
              IN-SPACe CANSAT
            </strong>{' '}
            mission (ASI), and shipped a{' '}
            <strong className="font-medium text-foreground/90">Next.js</strong>{' '}
            +{' '}
            <strong className="font-medium text-foreground/90">PocketBase</strong>{' '}
            registration stack for{' '}
            <strong className="font-medium text-foreground/90">Vercera 4.0</strong>{' '}
            (200+ signups).
          </p>
          <p>
            <strong className="font-medium text-foreground/90">IEEE</strong> —
            head of web operations,{' '}
            <strong className="font-medium text-foreground/90">
              Code-o-Fiesta 3.0
            </strong>
            , technical org for{' '}
            <strong className="font-medium text-foreground/90">
              AMUROVc 3.0
            </strong>
            .
          </p>
        </Prose>

        {/* GitHub */}
        <div className="my-16 rounded-sm border border-border/30 bg-gradient-to-br from-muted/10 to-transparent p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 font-mono text-xs text-foreground/45">
                public graph
              </p>
              <p className="font-serif text-lg text-foreground/90">
                code, issues, and experiments live on github—most of my
                portfolio is there before it&apos;s here.
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-sm border border-border/40 bg-background/60 px-5 py-3 font-mono text-sm text-foreground/80 transition-colors hover:border-border hover:bg-muted/20 hover:text-foreground"
            >
              @{GITHUB_USER} →
            </a>
          </div>
        </div>

        {/* Instagram builds */}
        <div className="my-16 rounded-sm border border-border/30 bg-gradient-to-br from-muted/5 to-transparent p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 font-mono text-xs text-foreground/45">
                builds in motion
              </p>
              <p className="font-serif text-lg text-foreground/90">
                the unpolished parts—solder smoke, failed runs, the one commit that
                finally greened—usually end up as reels on instagram before they
                end up here.
              </p>
            </div>
            <a
              href={INSTAGRAM_BUILDS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-sm border border-border/40 bg-background/60 px-5 py-3 font-mono text-sm text-foreground/80 transition-colors hover:border-border hover:bg-muted/20 hover:text-foreground"
            >
              @avyukt_builds →
            </a>
          </div>
        </div>

        <SectionTitle kicker="03">things i&apos;ve shipped (the short list)</SectionTitle>
        <Prose>
          <p>
            <strong className="font-medium text-foreground/90">stick</strong> —
            react native app (play beta), express backend end to end, docker on{' '}
            <strong className="font-medium text-foreground/90">AWS EC2</strong>,
            ci/cd, marketing site, keeping prod boring.
          </p>
          <p>
            <strong className="font-medium text-foreground/90">continuum</strong>{' '}
            — agentic workflows over slack:{' '}
            <strong className="font-medium text-foreground/90">MCP</strong>,{' '}
            <strong className="font-medium text-foreground/90">FastAPI</strong>,{' '}
            postgres, redis, celery, context across jira, github, calendar.
          </p>
          <p>
            <strong className="font-medium text-foreground/90">commitlens</strong>{' '}
            — open-source pr review agent: webhooks, detectors, learning from
            human comments, claude summaries, slack.
          </p>
          <p>
            <strong className="font-medium text-foreground/90">neurosense</strong>{' '}
            — wearable screening; esp32, fft, mediapipe + random forest,
            sub-100ms websockets.{' '}
            <strong className="font-medium text-foreground/90">
              SIH 2025 national finalist
            </strong>
            .
          </p>
          <p>
            <strong className="font-medium text-foreground/90">zenventures</strong>{' '}
            — lifequest balance winner; next.js, firebase, gemini—with shashank
            chauhan.
          </p>
          <p className="text-foreground/55">
            more builds on the{' '}
            <Link
              href="/work"
              className="underline underline-offset-2 hover:text-foreground/80"
            >
              full work page
            </Link>
            .
          </p>
        </Prose>

        {reelId ? (
          <div className="my-16 space-y-4">
            <SectionTitle kicker="motion">a reel, not a pitch</SectionTitle>
            <p className="mb-4 text-sm text-foreground/55">
              same piece as the home hero—mute by default; use the floating
              control if you want sound.
            </p>
            <div className="aspect-video overflow-hidden rounded-sm border border-border/30 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <iframe
                title="Portfolio reel"
                className="h-full w-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${reelId}?mute=1&controls=1&modestbranding=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}

        {/* Principles — same three you had on the site before */}
        <div className="my-16 border border-border/30 bg-muted/[0.07] p-8 md:p-10">
          <h3 className="mb-6 font-serif text-lg text-foreground/90">
            how i think about building
          </h3>
          <div className="space-y-3 text-xs leading-relaxed text-foreground/75 md:text-sm">
            <p>
              <span className="text-foreground/90">systems over features.</span>{' '}
              a well-designed system naturally produces good features. spend time
              on architecture, not decoration.
            </p>
            <p>
              <span className="text-foreground/90">constraints breed creativity.</span>{' '}
              the best work happens when you have limits. work within them, and
              you&apos;ll find elegant solutions.
            </p>
            <p>
              <span className="text-foreground/90">ship early, iterate always.</span>{' '}
              perfect is the enemy of done. get something working, learn,
              improve.
            </p>
          </div>
        </div>

        {/* Tech strip */}
        <div className="mb-16">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/35">
            tools i reach for
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'TypeScript',
              'Python',
              'FastAPI',
              'Next.js',
              'React Native',
              'Node',
              'PostgreSQL',
              'Redis',
              'Docker',
              'AWS',
              'GCP',
              'WebRTC',
              'ESP32',
            ].map((t) => (
              <span
                key={t}
                className="rounded-sm border border-border/25 bg-background/40 px-2.5 py-1 font-mono text-[11px] text-foreground/55"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="my-16 border border-dashed border-border/30 bg-muted/[0.04] p-6 md:p-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/35">
            fine print
          </p>
          <p className="text-xs leading-relaxed text-foreground/55 md:text-sm">
            allergic to dust and pollen; breathing stuff that means i basically
            wake up and sleep with a cold most days. i compensate with probably
            too much coffee and diet coke. if i seem low-energy in a dusty room,
            it&apos;s not you—it&apos;s my lungs filing a complaint.
          </p>
        </div>

        <footer className="border-t border-border/20 pt-12">
          <p className="mb-6 text-sm leading-relaxed text-foreground/70">
            if you&apos;re building something stubbornly ambitious—infra,
            embedded, agents, or a weekend hack that refuses to die—say hi. i
            like people who finish their sentences with a working demo.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="mailto:soniavyukt@gmail.com"
              className="text-foreground/80 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              soniavyukt@gmail.com
            </a>
            <span className="text-foreground/25">·</span>
            <a
              href="https://linkedin.com/in/avyuktsoni0731"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              linkedin
            </a>
            <span className="text-foreground/25">·</span>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              github
            </a>
            <span className="text-foreground/25">·</span>
            <a
              href={INSTAGRAM_BUILDS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              instagram
            </a>
          </div>
          <p className="mt-10 font-mono text-[11px] text-foreground/35">
            last updated march 2026. always building. always learning.
          </p>
        </footer>
      </div>
    </article>
  )
}
