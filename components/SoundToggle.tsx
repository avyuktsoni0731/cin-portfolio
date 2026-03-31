'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { useAmbientVideoOptional } from '@/components/AmbientVideoContext'

export default function SoundToggle() {
  const ctx = useAmbientVideoOptional()
  if (!ctx?.hasPlayer) return null

  const { isMuted, toggleMute } = ctx

  return (
    <div className="group fixed bottom-6 right-6 z-40 flex flex-row items-center gap-3">
      <p
        className="pointer-events-none hidden max-w-[12rem] select-none text-right font-mono text-[11px] leading-snug tracking-wide text-foreground/75 opacity-0 transition-all duration-200 sm:block sm:translate-x-1 sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
        aria-hidden
      >
        {isMuted
          ? "the score's in here — if you want it"
          : 'fade it back to silence'}
      </p>
      <button
        type="button"
        onClick={toggleMute}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/40 bg-background/70 text-foreground/80 shadow-sm backdrop-blur-md transition-colors hover:border-border/60 hover:bg-background/90 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={isMuted ? 'Enable video sound' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        ) : (
          <Volume2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        )}
      </button>
    </div>
  )
}
