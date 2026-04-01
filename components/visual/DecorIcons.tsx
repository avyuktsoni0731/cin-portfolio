/** Inline SVGs — stroke-only, monochrome. Swap for your own assets anytime. */

export function SproutMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M60 108V72M60 72c-8-18-28-28-44-24 6 22 26 36 44 36s38-14 44-36c-16-4-36 6-44 24Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground/50"
      />
      <path
        d="M60 72V44M48 52c4-12 12-20 12-28M72 52c-4-12-12-20-12-28"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className="text-foreground/35"
      />
    </svg>
  )
}

export function StackLayersMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M10 50 60 28l50 22-50 22L10 50Z"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-foreground/40"
      />
      <path
        d="M10 38 60 16l50 22-50 22L10 38Z"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-foreground/30"
      />
      <path
        d="M10 26 60 4l50 22-50 22L10 26Z"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-foreground/22"
      />
    </svg>
  )
}

export function TerminalSparkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect
        x="4"
        y="8"
        width="112"
        height="48"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-foreground/35"
      />
      <path
        d="M16 28h24M16 36h40M16 44h16"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className="text-foreground/25"
      />
      <path
        d="M88 36 96 44 108 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-500/50"
      />
    </svg>
  )
}

export function JournalSpineMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 4h28v112H12V4Z"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-foreground/30"
      />
      {[24, 44, 64, 84].map((y) => (
        <path
          key={y}
          d={`M16 ${y}h20`}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
      ))}
    </svg>
  )
}

export function SectionOrnament({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 ${className ?? ''}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border/60" />
      <span className="font-mono text-[10px] text-foreground/25">◆</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border/60" />
    </div>
  )
}
