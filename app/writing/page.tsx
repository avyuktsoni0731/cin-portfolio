import type { Metadata } from 'next'
import Link from 'next/link'
import NavHeader from '@/components/NavHeader'
import Footer from '@/components/sections/Footer'
import { PostList } from '@/components/writing/PostList'
import { getAllPosts } from '@/lib/posts'
import { NoisePanel } from '@/components/visual/NoisePanel'
import { JournalSpineMark, SectionOrnament } from '@/components/visual/DecorIcons'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays on building, systems, hardware, and the week after the demo works.',
  alternates: { canonical: '/writing' },
}

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen">
      <NavHeader />
      <section className="relative w-full overflow-hidden bg-background/80 px-6 pb-28 pt-28 backdrop-blur-[2px]">
        <div className="mx-auto w-full max-w-3xl">
          <p className="fade-in-up mb-2 font-mono text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              ← home
            </Link>
          </p>

          <div className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="fade-in-up mb-3 font-serif text-4xl font-semibold tracking-tight">
                writing
              </h1>
              <p className="fade-in-up max-w-lg text-sm leading-relaxed text-muted-foreground">
                longer thoughts — demos, durability, and what happens when
                nobody is watching the screen.
              </p>
            </div>
            <NoisePanel className="hidden shrink-0 p-4 sm:block sm:w-[min(100%,200px)]">
              <JournalSpineMark className="h-24 w-10 text-muted-foreground/50" />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                journal
              </p>
            </NoisePanel>
          </div>

          <SectionOrnament className="mb-14" />

          <PostList posts={posts} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
