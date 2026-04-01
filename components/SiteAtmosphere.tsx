/**
 * Fixed layers behind all routes: soft color wash + grain so the canvas
 * isn’t flat black. pointer-events: none; content stays interactive.
 */
export function SiteAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[oklch(0.055_0.01_280)]"
        aria-hidden
      />
      {/* Cool mist — ties hero purples to the rest of the page */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-25%,oklch(0.32_0.09_290_/_0.14),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_0%,oklch(0.28_0.06_220_/_0.08),transparent_50%),radial-gradient(ellipse_60%_40%_at_0%_100%,oklch(0.25_0.05_160_/_0.06),transparent_45%)]"
        aria-hidden
      />
      {/* Emerald lift at bottom — echoes GitHub activity without shouting */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_120%,oklch(0.22_0.06_165_/_0.12),transparent_50%)]"
        aria-hidden
      />
      {/* Film grain — site-wide */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
    </>
  )
}
