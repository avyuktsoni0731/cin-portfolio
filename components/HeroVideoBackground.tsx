'use client'

import { useEffect, useId, useRef } from 'react'
import { loadYoutubeIframeApi } from '@/lib/loadYoutubeIframeApi'
import { useAmbientVideo } from '@/components/AmbientVideoContext'

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
            playerRef.current = e.target
            registerPlayer(e.target)
          },
        },
      })
      playerRef.current = player
    }

    loadYoutubeIframeApi().then(() => {
      if (!cancelled) init()
    })

    return () => {
      cancelled = true
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
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.77vh',
        }}
      />
    </div>
  )
}
