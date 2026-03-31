export {}

declare global {
  namespace YT {
    interface PlayerEvent {
      target: Player
      data: number
    }
    interface Player {
      mute(): void
      unMute(): void
      isMuted(): boolean
      destroy(): void
    }
    interface PlayerOptions {
      videoId?: string
      width?: string | number
      height?: string | number
      playerVars?: Record<string, string | number | undefined>
      events?: {
        onReady?: (e: PlayerEvent) => void
        onStateChange?: (e: PlayerEvent) => void
      }
    }
    interface PlayerConstructor {
      new (elementId: string, options: PlayerOptions): Player
    }
  }

  interface Window {
    YT?: {
      Player: YT.PlayerConstructor
    }
    onYouTubeIframeAPIReady?: () => void
  }
}
