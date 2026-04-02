import { HeroTitle } from '@/components/HeroTitle'

export default function HeroIntro() {
  return (
    <div className="fade-in mx-auto max-w-xl text-center">
      <h1 className="min-h-[1.15em]">
        <HeroTitle />
      </h1>
      <p className="mt-5 font-mono text-xs tracking-wide text-muted-foreground sm:text-sm">
        builder · hacker · developer
      </p>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground/85">
        <a
          href="https://www.instagram.com/avyukt_builds/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground/75"
        >
          @avyukt_builds
        </a>{' '}
        — builds on camera
      </p>
      <p
        className="mx-auto mt-5 max-w-md text-balance text-sm font-light leading-relaxed text-muted-foreground sm:text-[15px]"
      >
        i work where real-time data, developer tools, and infrastructure meet — making
        complex systems feel simple.
      </p>
    </div>
  )
}
