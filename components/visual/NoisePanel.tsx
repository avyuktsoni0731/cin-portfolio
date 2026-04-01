import type { ReactNode } from 'react'

/**
 * Subtle film grain + soft border — use behind or around content for depth without photos.
 */
export function NoisePanel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`noise-panel relative overflow-hidden rounded-sm border border-border/25 bg-muted/[0.06] ${className}`}
    >
      {children}
    </div>
  )
}
