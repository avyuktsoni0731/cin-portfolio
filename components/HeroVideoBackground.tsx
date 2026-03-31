'use client'

/**
 * Decorative background: YouTube embed with no UI, non-interactive, muted loop.
 * Set NEXT_PUBLIC_HERO_YOUTUBE_VIDEO_ID to the video id (from the watch URL).
 * Cover math assumes 16:9 (typical for 4K uploads).
 */
export default function HeroVideoBackground({ videoId }: { videoId: string }) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    loop: '1',
    playlist: videoId,
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
    disablekb: '1',
    fs: '0',
    iv_load_policy: '3',
    cc_load_policy: '0',
  })

  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <iframe
        title="Background video"
        className="absolute left-1/2 top-1/2 border-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.77vh',
        }}
        src={src}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen={false}
        tabIndex={-1}
      />
    </div>
  )
}
