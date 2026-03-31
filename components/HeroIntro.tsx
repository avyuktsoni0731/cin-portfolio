export default function HeroIntro() {
  return (
    <div className="text-center max-w-xl mx-auto fade-in">
      <h1
        className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground lowercase"
        style={{
          textShadow:
            '0 1px 2px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.45), 0 0 40px rgba(0,0,0,0.35)',
        }}
      >
        avyukt soni
      </h1>
      <p className="mt-5 font-mono text-xs sm:text-sm tracking-wide text-foreground/70">
        builder · hacker · developer
      </p>
      <p className="mt-3 font-mono text-[11px] text-foreground/50">
        <a
          href="https://www.instagram.com/avyukt_builds/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-border/50 underline-offset-2 transition-colors hover:text-foreground/75"
        >
          @avyukt_builds
        </a>{' '}
        — builds on camera
      </p>
      <p
        className="mt-5 text-sm sm:text-[15px] text-foreground/60 leading-relaxed font-light max-w-md mx-auto"
        style={{
          textShadow: '0 1px 12px rgba(0,0,0,0.45)',
        }}
      >
        i work where real-time data, developer tools, and infrastructure meet — making
        complex systems feel simple.
      </p>
    </div>
  )
}
