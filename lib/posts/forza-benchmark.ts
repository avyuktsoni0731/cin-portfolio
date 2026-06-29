import type { Post } from '@/lib/posts/types'

const ARCHITECTURE_DIAGRAM = `flowchart TB
    subgraph Host["Host application (your app / CLI)"]
        COM["COM init (MTA)"]
        STOP["Stop flag / Ctrl+C"]
        CFG["SessionConfig / PipelineParams"]
    end

    subgraph Runtime["capture-runtime"]
        LOOP["run_recording() session loop"]
        METRICS["metrics.csv (optional)"]
    end

    subgraph Video["Video path"]
        WGC["Windows Graphics Capture (WGC)"]
        D3D["D3D11 textures"]
        PIPE["pipeline crate<br/>BGRA → NV12 / I420"]
        VENC["encoder crate<br/>NVENC → OpenH264 fallback"]
    end

    subgraph Audio["Audio path"]
        WASAPI["WASAPI loopback"]
        MIX["audio crate<br/>downmix + presence"]
        AENC["audio_encoder<br/>AAC-LC or Opus"]
    end

    subgraph Output["OutputTarget"]
        FILES["Files<br/>clip.h264 · clip.mp4 · audio.wav"]
        STREAM["Stream channels<br/>VideoPacket · AudioChunk"]
        BOTH["Files + Stream"]
    end

    subgraph Transport["Host transport (not in this repo)"]
        WEBRTC["WebRTC / LiveKit"]
        RTMP["RTMP / WHIP"]
        UPLOAD["S3 / upload / custom"]
    end

    COM --> LOOP
    CFG --> LOOP
    STOP --> LOOP

    LOOP --> WGC --> D3D --> PIPE --> VENC
    LOOP --> WASAPI --> MIX --> AENC

    VENC --> FILES
    AENC --> FILES
    VENC --> STREAM
    AENC --> STREAM
    VENC --> BOTH
    AENC --> BOTH

    LOOP --> METRICS

    STREAM --> WEBRTC
    STREAM --> RTMP
    STREAM --> UPLOAD
    BOTH --> WEBRTC
    BOTH --> RTMP`

export const FORZA_BENCHMARK_POST: Post = {
  slug: 'rust-capture-pipeline-forza-benchmark-vs-obs',
  title: 'building a rust capture pipeline — benchmarking it against obs in forza',
  subtitle:
    'early results from a windows-native screen + system audio capture module — and why i\'m not trying to replace obs for everyone',
  description:
    'A Rust Windows capture pipeline (WGC + NVENC + system audio) benchmarked against OBS in Forza Horizon 6. Early results show lower game overhead and stronger frame-time lows — plus honest caveats on file fps and who this embeddable module is actually for.',
  publishedAt: '2026-06-25',
  readingTimeMinutes: 5,
  featured: true,
  tags: ['rust', 'windows', 'capture', 'benchmark', 'obs', 'nvenc'],
  blocks: [
    {
      type: 'image',
      src: '/blogs/forza-benchmark/hero-image.png',
      alt: 'Forza benchmark — Rust pipeline vs OBS',
      caption: 'Same machine, same route, separate recording sessions.',
      wide: true,
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'the short version',
    },
    {
      type: 'paragraph',
      content:
        'i\'ve been building **rs-capture-pipeline**: a rust library that captures your screen and system audio on windows, encodes video with hardware when possible (nvenc), and hands you either **files** (mp4, h.264, wav) or **encoded packets** your app can forward to a streaming stack.',
    },
    {
      type: 'paragraph',
      content:
        'it\'s not a consumer app. it\'s not obs with a new skin. it\'s the **capture-and-encode layer** you\'d embed inside a collab tool, a session recorder, a clip app, or anything that needs native capture without asking users to install a full broadcaster.',
    },
    {
      type: 'paragraph',
      content:
        'i ran an early benchmark in **forza horizon 6** — same car, same route, two separate sessions: one recording with obs, one with this pipeline. the numbers are promising enough that i wanted to share them honestly, caveats included.',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'why this exists (when obs already exists)',
    },
    {
      type: 'paragraph',
      content:
        'obs is excellent at what it does: scenes, plugins, streaming, production workflows. millions of creators rely on it for good reason.',
    },
    {
      type: 'paragraph',
      content:
        'but when you\'re **building a product**, you often don\'t need obs-the-application. you need:',
    },
    {
      type: 'list',
      items: [
        'reliable **display capture** on windows (without fragile screen-grab hacks)',
        '**system audio** that actually shows up in the recording',
        '**hardware encoding** that doesn\'t torch the cpu',
        'a **library** you can ship inside your installer, not a separate tool users configure',
      ],
    },
    {
      type: 'paragraph',
      content:
        'that\'s the gap i\'m aiming at: **less overhead, more embeddable**, for teams who own the ux and the transport (webrtc, livekit, upload to s3, whatever).',
    },
    {
      type: 'paragraph',
      content:
        'i\'m also dogfooding it for a collab-style project — but the pipeline is meant to stay **independent**. one module, many hosts.',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'what it actually is (without the jargon pile)',
    },
    {
      type: 'paragraph',
      content: 'at a high level, the stack looks like this:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '**capture** — windows graphics capture (wgc) for the display, wasapi loopback for desktop audio',
        '**convert** — gpu path from captured frames toward nv12 / encoder-friendly layouts',
        '**encode** — nvenc when available, sensible fallbacks when not; aac or opus for audio',
        '**output** — write to disk **or** push `VideoPacket` / `AudioChunk` structs over channels for your app to consume',
      ],
    },
    {
      type: 'paragraph',
      content:
        'the public api lives in a crate called **`capture-runtime`**. the repo also ships a small cli (`capture-pipeline`) that\'s basically a reference host — proof that the library works, not the product itself.',
    },
    {
      type: 'mermaid',
      chart: ARCHITECTURE_DIAGRAM,
      caption:
        'capture-runtime — capture → pipeline → encoder → output / stream channels. transport lives in the host.',
    },
    {
      type: 'callout',
      content:
        '**what it does not include (today):** webrtc, signaling, rtp, or a livekit room join. those belong in the **host app**. this project stops at "here is timestamped h.264 and audio payloads — you ship them."',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'how i ran the benchmark',
    },
    {
      type: 'paragraph',
      content: 'i cared about two different questions:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '**while recording, how much does capture hurt the game?** (forza\'s built-in benchmark + on-screen overlay)',
        '**what comes out in the recording file?** (resolution, bitrate, audio)',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'rules i tried to follow',
    },
    {
      type: 'list',
      items: [
        '**one capture tool at a time** — never obs and the pipeline simultaneously',
        '**same resolution target** (1080p), **nvenc h.264**, similar bitrate intent (~45 mbps)',
        '**same-ish driving segment** in forza (not a perfect lab test, but real gameplay)',
        '**msi afterburner overlay** on both runs for fps / gpu / cpu on screen',
      ],
    },
    {
      type: 'paragraph',
      content:
        'the pipeline also writes a **`metrics.csv`** during file recording (cpu and ram for the capture process only). obs gets its **stats** panel for dropped frames. i\'ll publish more on that workflow in a follow-up.',
    },
    {
      type: 'callout',
      title: 'disclaimer',
      content:
        'this is one game, one pc, early software. treat it as directional, not a white paper.',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'results: in-game performance (the part i care about most)',
    },
    {
      type: 'paragraph',
      content:
        'forza\'s performance summary compares cpu simulation, cpu render, and gpu frame rates — including **1% lows** and **0.1% lows**, which tell you how bad the worst moments get.',
    },
    {
      type: 'image',
      src: '/blogs/forza-benchmark/full-benchmark.png',
      alt: 'Benchmark comparison table',
      caption:
        'Full benchmark comparison table — FPS, Low 1%, Low 0.1% for CPU Simulation, CPU Render, GPU. Rust vs OBS.',

    },
    {
      type: 'heading',
      level: 3,
      content: 'average fps (benchmark summary)',
    },
    {
      type: 'table',
      headers: ['metric', 'rust pipeline', 'obs'],
      rows: [
        ['cpu simulation', '**297.4**', '296.8'],
        ['cpu render', '**123.0**', '121.1'],
        ['gpu', '**112.8**', '104.2'],
      ],
    },
    {
      type: 'paragraph',
      content:
        'the gpu line is the stand-out: roughly **8% higher** gpu fps during the benchmark on the pipeline side. cpu simulation is basically a tie — the game logic isn\'t the story here. cpu render favors the pipeline modestly.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'stability (1% and 0.1% lows)',
    },
    {
      type: 'table',
      headers: ['metric', 'rust pipeline', 'obs'],
      rows: [
        ['gpu low 1%', '**98.6**', '90.2'],
        ['gpu low 0.1%', '**94.5**', '87.7'],
        ['cpu render low 0.1%', '**80.4**', '69.6'],
      ],
    },
    {
      type: 'paragraph',
      content:
        'higher lows mean fewer "ouch" frames when the scene gets busy. that\'s the difference you *feel* as a player — less micro-stutter while something is recording in the background.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'achieved fps & overlay (real run)',
    },
    {
      type: 'image',
      src: '/blogs/forza-benchmark/real-time-performance.png',
      alt: 'Performance Summary',
      caption: 'Performance Summary — side-by-side Performance Summary windows with overlay FPS and GPU %.',
    },
    {
      type: 'paragraph',
      content: 'on the run i captured for the comparison video:',
    },
    {
      type: 'table',
      headers: ['', 'rust pipeline', 'obs'],
      rows: [
        ['achieved fps', '**159**', '149'],
        ['overlay (example)', '~104 fps @ ~90% gpu', '~96 fps @ ~93% gpu'],
        ['average latency', '**22.2 ms**', '23.0 ms'],
        ['stutter count', '3', '2'],
      ],
    },
    {
      type: 'paragraph',
      content:
        'so: **higher fps with slightly lower gpu utilization** on the overlay — capture isn\'t free, but the pipeline appears to tax the gpu a bit less for a better result. stutter count was marginally higher on my pipeline run (3 vs 2); i\'d want more sessions before calling that significant.',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'results: system resources',
    },
    // {
    //   type: 'image',
    //   src: '/blogs/forza-benchmark/resources-utilized.png',
    //   alt: 'System Resources',
    //   caption: 'System Resources — GPU ~97% both, CPU ~53% vs ~52%, Memory ~6150 MB vs ~6290 MB.',
    // },
    {
      type: 'table',
      headers: ['resource', 'rust pipeline', 'obs'],
      rows: [
        ['gpu', '~97%', '~97%'],
        ['cpu', '~53%', '~52%'],
        ['memory', '**~6150 mb**', '~6290 mb'],
      ],
    },
    {
      type: 'paragraph',
      content:
        'gpu pegged on both — forza is still the main consumer. cpu is effectively the same. memory was **~140 mb lower** on the pipeline run. not revolutionary, but it\'s the kind of small win that matters when your app is one of several heavy processes.',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'results: the recording files (quality vs frame rate)',
    },
    // {
    //   type: 'media',
    //   description:
    //     'Video/audio metadata table — resolution, bitrate, fps, audio bitrate, channels, sample rate.',
    // },
    {
      type: 'table',
      headers: ['', 'rust pipeline', 'obs'],
      rows: [
        ['resolution', '1920×1080', '1920×1080'],
        ['video bitrate', '**~39.5 mbps**', '~32.4 mbps'],
        ['frames in file', '**~53.4 fps**', '60 fps (hard cap)'],
        ['audio', '192 kbps stereo, 48 khz', '190 kbps stereo, 48 khz'],
      ],
    },
    {
      type: 'paragraph',
      content: 'here\'s the honest nuance:',
    },
    {
      type: 'list',
      items: [
        'the pipeline recording carried **more bits per second** in the exported file — generally good for detail and fewer compression artifacts.',
        'obs **locked 60 fps** in the output. my file landed around **53 fps** — that\'s a **muxing / pacing / capture cadence** tuning issue on my side, not something i\'m proud of yet. in-game performance was *better*; the *file* frame rate still needs work for parity with a hard-capped 60 fps workflow.',
      ],
    },
    {
      type: 'paragraph',
      content:
        'i\'ll be tightening cfr-style output and frame pacing — the benchmark already showed the hard part (runtime overhead) is moving in the right direction.',
    },
    {
      type: 'video',
      youtubeId: 'JqCID-oWQjc',
      caption: 'Side-by-side playback: OBS (left) vs. Rust pipeline (right), same Forza route. Mute for this version — watch differences in frame smoothness and detail.',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'who this is for (and who it isn\'t)',
    },
    {
      type: 'heading',
      level: 3,
      content: 'good fit',
    },
    {
      type: 'list',
      items: [
        '**teams building screen share or session recording** into a desktop app',
        '**streaming / rtc products** that want a windows native publisher instead of browser-only capture',
        '**clip or replay tools** that need nvenc + system audio in-process',
        '**developers** who\'d rather depend on a crate than maintain ffmpeg + gdigrab scripts forever',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'probably not a fit (and that\'s fine)',
    },
    {
      type: 'list',
      items: [
        '**solo streamers** who want scenes, plugins, and a mature ecosystem — use obs',
        '**anyone who needs macos/linux today** — windows is where this lives right now',
        '**anyone who wants webrtc in the box** — you\'ll bridge transport in your host; this stops at encoded media',
      ],
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'what\'s next',
    },
    {
      type: 'paragraph',
      content: 'near-term roadmap for the **module** (not a consumer app):',
    },
    {
      type: 'list',
      items: [
        'examples and integration docs for embedders (`record_to_dir`, `stream_stats`, `INTEGRATION.md` in the repo)',
        'display / source selection apis',
        'tighter **60 fps file output** to match benchmark-quality in-game performance',
        'optional bridges (livekit, rtmp) as **separate** crates or host code — keeping the core transport-agnostic',
        'longer soak tests (10+ minute sessions, drift, reconnect stories)',
      ],
    },
    {
      type: 'image',
      src: '/blogs/forza-benchmark/cli.png',
      alt: 'CLI Output',
      caption: 'CLI Output',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'try it / get involved',
    },
    {
      type: 'paragraph',
      content:
        'the project is an embeddable rust workspace: **`capture-runtime`** is the api surface; the cli is a thin reference host.',
    },
    {
      type: 'paragraph',
      content: 'if you\'re building something that needs native capture:',
    },
    {
      type: 'list',
      items: [
        'i\'d love to hear what **api shape** you\'d need to actually integrate',
        'what **trust bar** you\'d have (metrics, licensing, ci on windows, long-session reports)',
        'whether you\'d pick this over **obs**, **ffmpeg**, or **vendor sdks** — and why',
      ],
    },
    {
      type: 'callout',
      title: 'get in touch',
      content:
        'repo link coming soon. for now — [email me](mailto:soniavyukt@gmail.com) or [say hi on the about page](/about). i\'m especially interested in integration feedback from teams shipping capture in production.',
    },
    { type: 'divider' },
    {
      type: 'heading',
      level: 2,
      content: 'feedback welcome',
    },
    {
      type: 'paragraph',
      content:
        'this is early. the forza numbers made me optimistic; they didn\'t make me complacent. if you\'ve shipped capture in production — or you\'ve been burned by a/v sync, system audio on windows, or "why does screen share destroy fps" — **tell me what i should measure next** or what would make you trust a module like this.',
    },
    {
      type: 'paragraph',
      content:
        'drop a comment, open an issue, or reach out directly. brutal honesty beats polite silence.',
    },
    {
      type: 'paragraph',
      content:
        '*thanks for reading. more technical deep-dives (wgc vs dxgi, audio pacing, downmix for surround wasapi) coming if people want them.*',
    },
  ],
}
