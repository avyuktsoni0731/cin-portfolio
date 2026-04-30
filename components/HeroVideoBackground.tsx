'use client'

import { useEffect, useId, useRef } from 'react'
import { loadYoutubeIframeApi } from '@/lib/loadYoutubeIframeApi'
import { useAmbientVideo } from '@/components/AmbientVideoContext'

const UNSTARTED = -1
const ENDED = 0
const PLAYING = 1
const BUFFERING = 3
const CUED = 5

/**
 * Background loop via YouTube IFrame API (mute/unmute from SoundToggle).
 * Requires NEXT_PUBLIC_HERO_YOUTUBE_VIDEO_ID.
 */
export default function HeroVideoBackground({ videoId }: { videoId: string }) {
  const { registerPlayer } = useAmbientVideo()
  const playerRef = useRef<YT.Player | null>(null)
  const rawId = useId()
  const containerId = `hero-yt-${rawId.replace(/:/g, '')}`

  useEffect(() => {
    let cancelled = false
    const timeouts: number[] = []

    const pushTimeout = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timeouts.push(id)
    }

    const safePlay = (p: YT.Player) => {
      try {
        p.mute()
        p.playVideo()
      } catch {
        /* noop */
      }
    }

    const nudgeIfStuck = (p: YT.Player) => {
      try {
        const state = p.getPlayerState()
        if (state === PLAYING || state === BUFFERING) return
        safePlay(p)
      } catch {
        /* noop */
      }
    }

    const init = () => {
      if (cancelled || !window.YT?.Player) return

      const player = new window.YT.Player(containerId, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            const p = e.target
            playerRef.current = p
            registerPlayer(p)
            safePlay(p)
            ;[120, 400, 1000, 2200].forEach((ms) =>
              pushTimeout(() => nudgeIfStuck(p), ms),
            )
          },
          onStateChange: (e) => {
            if (cancelled) return
            const p = e.target
            const state = e.data
            if (state === ENDED) {
              safePlay(p)
              return
            }
            if (state === CUED || state === UNSTARTED) {
              pushTimeout(() => nudgeIfStuck(p), 180)
            }
          },
        },
      })
      playerRef.current = player
    }

    loadYoutubeIframeApi().then(() => {
      if (!cancelled) init()
    })

    const onVisibility = () => {
      if (cancelled || document.visibilityState !== 'visible') return
      const p = playerRef.current
      if (!p) return
      pushTimeout(() => nudgeIfStuck(p), 120)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
      timeouts.forEach((id) => window.clearTimeout(id))
      try {
        playerRef.current?.destroy()
      } catch {
        /* noop */
      }
      playerRef.current = null
      registerPlayer(null)
    }
  }, [videoId, containerId, registerPlayer])

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div
        id={containerId}
        className="absolute left-1/2 top-1/2 border-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          // Overscan-crop hides occasional top/bottom YouTube chrome without bars.
          width: 'calc(100vw + 220px)',
          height: 'calc(56.25vw + 120px)',
          minHeight: 'calc(100vh + 120px)',
          minWidth: 'calc(177.77vh + 220px)',
        }}
      />
    </div>
  )
}
