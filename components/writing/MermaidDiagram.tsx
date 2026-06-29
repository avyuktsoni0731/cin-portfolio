'use client'

import { useEffect, useId, useState } from 'react'

type MermaidDiagramProps = {
  chart: string
  caption?: string
}

type MermaidApi = {
  initialize: (config: object) => void
  render: (id: string, text: string) => Promise<{ svg: string }>
}

declare global {
  interface Window {
    mermaid?: MermaidApi
  }
}

let mermaidLoader: Promise<MermaidApi> | null = null

function loadMermaid(): Promise<MermaidApi> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Mermaid requires a browser'))
  }
  if (window.mermaid) return Promise.resolve(window.mermaid)
  if (mermaidLoader) return mermaidLoader

  mermaidLoader = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js'
    script.async = true
    script.onload = () => {
      if (window.mermaid) resolve(window.mermaid)
      else reject(new Error('Mermaid failed to load'))
    }
    script.onerror = () => reject(new Error('Mermaid script failed to load'))
    document.head.appendChild(script)
  })

  return mermaidLoader
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const reactId = useId().replace(/:/g, '')
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = await loadMermaid()
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            darkMode: true,
            background: '#252830',
            primaryColor: '#32353f',
            primaryTextColor: '#e8e6e3',
            primaryBorderColor: '#5a5d68',
            secondaryColor: '#2a2d36',
            secondaryTextColor: '#c8c6c3',
            secondaryBorderColor: '#4a4d58',
            tertiaryColor: '#1f222a',
            tertiaryTextColor: '#a8a6a3',
            tertiaryBorderColor: '#3a3d48',
            lineColor: '#7a7d88',
            textColor: '#e8e6e3',
            mainBkg: '#32353f',
            nodeBorder: '#5a5d68',
            clusterBkg: '#2a2d36',
            clusterBorder: '#4a4d58',
            titleColor: '#e8e6e3',
            edgeLabelBackground: '#2f323c',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            padding: 12,
          },
        })

        const { svg: rendered } = await mermaid.render(
          `mermaid-${reactId}`,
          chart.trim(),
        )
        if (!cancelled) {
          setSvg(rendered)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to render diagram')
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart, reactId])

  return (
    <figure className="my-10 -mx-2 sm:-mx-6 md:-mx-12">
      <div className="overflow-x-auto rounded-sm border border-border/35 bg-muted/10 p-3 ring-1 ring-inset ring-white/5 md:p-5">
        {error ? (
          <p className="font-mono text-xs text-red-400/90">{error}</p>
        ) : svg ? (
          <div
            className="mermaid-diagram flex min-w-[36rem] justify-center [&_svg]:h-auto [&_svg]:max-w-none"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <p className="py-8 text-center font-mono text-[11px] text-muted-foreground">
            rendering diagram…
          </p>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-[11px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
