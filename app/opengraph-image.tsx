import { ImageResponse } from 'next/og'

export const alt =
  'Avyukt Soni — computer engineering, full-stack, apps, hardware, and builds'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 72,
          background:
            'linear-gradient(165deg, #0a0a0c 0%, #15101a 42%, #0c0a10 100%)',
          color: '#ebe8f0',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Avyukt Soni
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              color: 'rgba(235, 232, 240, 0.55)',
              letterSpacing: '0.08em',
              textTransform: 'lowercase' as const,
            }}
          >
            builder · engineer · full-stack
          </div>
        </div>
        <div
          style={{
            fontSize: 13,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            color: 'rgba(235, 232, 240, 0.35)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
          }}
        >
          Portfolio · AMU ZHCET · Stick · Continuum
        </div>
      </div>
    ),
    { ...size }
  )
}
