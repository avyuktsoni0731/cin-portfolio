'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type AmbientVideoContextValue = {
  registerPlayer: (player: YT.Player | null) => void
  isMuted: boolean
  toggleMute: () => void
  hasPlayer: boolean
}

const AmbientVideoContext = createContext<AmbientVideoContextValue | null>(null)

export function AmbientVideoProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<YT.Player | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [hasPlayer, setHasPlayer] = useState(false)

  const registerPlayer = useCallback((player: YT.Player | null) => {
    playerRef.current = player
    setHasPlayer(!!player)
    if (player) {
      try {
        setIsMuted(player.isMuted())
      } catch {
        setIsMuted(true)
      }
    }
  }, [])

  const toggleMute = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    try {
      if (p.isMuted()) {
        p.unMute()
      } else {
        p.mute()
      }
      setIsMuted(p.isMuted())
    } catch {
      /* noop */
    }
  }, [])

  return (
    <AmbientVideoContext.Provider
      value={{ registerPlayer, isMuted, toggleMute, hasPlayer }}
    >
      {children}
    </AmbientVideoContext.Provider>
  )
}

export function useAmbientVideo() {
  const ctx = useContext(AmbientVideoContext)
  if (!ctx) {
    throw new Error('useAmbientVideo must be used within AmbientVideoProvider')
  }
  return ctx
}
