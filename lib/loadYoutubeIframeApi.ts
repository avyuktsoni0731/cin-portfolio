let apiReady: Promise<void> | null = null

/** Loads youtube.com/iframe_api once; safe to call from multiple components. */
export function loadYoutubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  if (window.YT?.Player) return Promise.resolve()

  if (!apiReady) {
    apiReady = new Promise<void>((resolve) => {
      const done = () => resolve()

      if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const id = window.setInterval(() => {
          if (window.YT?.Player) {
            window.clearInterval(id)
            done()
          }
        }, 16)
        return
      }

      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const first = document.getElementsByTagName('script')[0]
      first.parentNode!.insertBefore(tag, first)

      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        done()
      }
    })
  }

  return apiReady
}
