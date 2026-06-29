import { FORZA_BENCHMARK_POST } from '@/lib/posts/forza-benchmark'

export type { Post, PostBlock } from '@/lib/posts/types'

const GITHUB_AVATAR = 'https://github.com/avyuktsoni0731.png'

export const POSTS: Post[] = [
  {
    slug: 'the-demo-is-the-easy-part',
    title: 'the demo is the easy part',
    subtitle:
      'what neurosense, voltsense, and a year of student builds taught me about trust after the applause stops',
    description:
      'On shipping systems that still make sense at 2am — demos vs. durability, false positives, and why the boring middle is the real product.',
    publishedAt: '2026-03-12',
    readingTimeMinutes: 8,
    featured: false,
    tags: ['building', 'systems', 'hardware', 'startups'],
    coverImage: {
      src: GITHUB_AVATAR,
      alt: 'Avyukt Soni',
    },
    blocks: [
      {
        type: 'paragraph',
        content:
          'there is a specific kind of high you get when a demo works on the first try. the room nods. someone asks for your linkedin. you start mentally drafting the tweet before the cable is even unplugged.',
      },
      {
        type: 'paragraph',
        content:
          'i have lived on that high. i have also lived in the week after — when the same pipeline throws a false positive at 1:47am and you are the only person who knows which log line matters.',
      },
      {
        type: 'quote',
        content:
          'the best feeling is not when it demos. it is when it survives contact with reality.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'where the story actually starts',
      },
      {
        type: 'paragraph',
        content:
          'most of what i ship lately sits between bare metal and a UI. **neurosense** — wearable screening with esp32, fft, mediapipe, random forest — taught me that the fft is the easy slide in the deck. the hard slide is the one that explains what happens when someone’s grandmother wears the device in a room with fluorescent lights and a fan that shares a frequency bin with something you did not calibrate for.',
      },
      {
        type: 'paragraph',
        content:
          '**voltsense**, our smart-energy track that made it to the top 105 in the google solution challenge, had the same shape: anomaly detection is trivial to show on a chart. making a homeowner believe the alert means something — that is the product.',
      },
      {
        type: 'image',
        src: GITHUB_AVATAR,
        alt: 'build log still — soldering bench and laptop side by side',
        caption:
          'most of the work never makes it into the hero reel. that is fine. the reel is recruitment; the bench is the job.',
        wide: true,
      },
      {
        type: 'heading',
        level: 2,
        content: 'three checks before i call something “shipped”',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          '**can someone else run it?** not “with my notes” — with a readme that assumes they are tired and skeptical.',
          '**what fails quietly?** the scary bugs are not the ones that crash. they are the ones that look like success with wrong data.',
          '**what is the 2am path?** if production misbehaves, is the first response a grep command or a prayer?',
        ],
      },
      {
        type: 'paragraph',
        content:
          'at [stick](https://stickapp.club) this shows up as docker on ec2 and ci/cd that has to stay boring while the app moves fast. at [continuum](https://www.continuumworks.app) it is context that has to survive across jira, github, and calendar without turning into a tab-hopping tax.',
      },
      {
        type: 'heading',
        level: 3,
        content: 'a note on false positives',
      },
      {
        type: 'paragraph',
        content:
          'in screening systems, a false positive is not a metric on a spreadsheet. it is a person who spent an afternoon worried for nothing. i do not have a universal fix — calibration sets, environment tags, human-in-the-loop review — but i have a universal rule: **if you cannot explain the failure mode to a non-engineer, you are not ready to ship.**',
      },
      {
        type: 'code',
        language: 'typescript',
        caption: 'the kind of guardrail i wish more demos had before the stage',
        content: `// not production code — the shape of the question
function shouldAlert(reading: Signal, ctx: RoomContext): boolean {
  if (ctx.calibrationAge > MAX_AGE) return false
  if (ctx.knownNoiseSources.some(n => n.overlaps(reading.peak))) {
    return reading.confidence > HIGH_THRESHOLD
  }
  return reading.confidence > BASE_THRESHOLD
}`,
      },
      {
        type: 'callout',
        title: 'what i am optimizing for now',
        content:
          'fewer features, clearer failure modes, and build logs that show the messy middle — not because authenticity is a brand, but because the messy middle is where the next person learns what not to repeat.',
      },
      {
        type: 'divider',
      },
      {
        type: 'heading',
        level: 2,
        content: 'why i put the build on camera',
      },
      {
        type: 'paragraph',
        content:
          'lately i have been posting more of the unpolished parts on [@avyukt_builds](https://www.instagram.com/avyukt_builds/) — failed runs, the commit that finally greened, solder smoke. not because the portfolio needed content. because the gap between “it worked once” and “it works when i am not in the room” is where most learning happens, and that gap is almost never in the demo video.',
      },
      {
        type: 'paragraph',
        content:
          'if you are building something stubbornly ambitious — infra, embedded, agents, or a weekend hack that refuses to die — [say hi](/about). i like people who finish their sentences with a working demo, and then stay for the week after.',
      },
    ],
  },
  FORZA_BENCHMARK_POST,
]

export function getAllPosts(): Post[] {
  return [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getFeaturedPost(): Post | undefined {
  return POSTS.find((p) => p.featured) ?? getAllPosts()[0]
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
