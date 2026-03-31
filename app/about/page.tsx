'use client'

import NavHeader from '@/components/NavHeader'
import SoundToggle from '@/components/SoundToggle'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavHeader />
      <SoundToggle />
      
      <section className="w-full py-32 px-6 bg-background pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="fade-in space-y-12">
            {/* Intro */}
            <h1 className="text-3xl md:text-4xl font-serif leading-tight">
              my entire journey as a builder
            </h1>

            {/* Early days */}
            <div className="space-y-6 text-sm leading-relaxed text-foreground/85">
              <p>
                since childhood, i couldn&apos;t keep my hands still. my earliest memories are of taking things apart — circuit boards, old computers, anything with screws. my parents always had books around, and while other kids were outside, i was building makeshift electronics in the garage, failing repeatedly, and learning more from each failure than any textbook could teach.
              </p>

              <p>
                by middle school, i was obsessed with game modding and Arduino. i built a weather station that sent data to a local server. it didn&apos;t work perfectly, but the fact that i could create something that &quot;talked&quot; to itself changed how i thought about systems. real-time, interconnected, alive.
              </p>
            </div>

            {/* Image - childhood build */}
            <div className="fade-in-up my-12">
              <div className="w-full md:w-2/3">
                <img
                  src="/profile.jpg"
                  alt="Early days of building"
                  className="w-full rounded-sm object-cover opacity-90"
                />
                <p className="text-xs text-foreground/60 mt-3 italic">
                  tinkering with hardware, building what didn&apos;t exist yet
                </p>
              </div>
            </div>

            {/* Hackathon era */}
            <div className="space-y-6 text-sm leading-relaxed text-foreground/85">
              <p>
                in high school, i discovered hackathons. these weren&apos;t just competitions — they were communities of people who thought like i did. build fast. break things. learn everything. i started participating in every hackathon within driving distance, and the energy was addictive. the idea that you could take a vague idea on friday night and have a working system by sunday morning felt like magic.
              </p>

              <p>
                i organized my first hackathon at 16 with 200 people. it was chaotic and beautiful. people built robots, drones, AR experiences, and tools that shouldn&apos;t have worked but did. that&apos;s when i realized: i didn&apos;t just want to build. i wanted to create spaces where other people could build.
              </p>
            </div>

            {/* Current work */}
            <div className="space-y-6 text-sm leading-relaxed text-foreground/85">
              <p>
                now i build systems at the intersection of real-time data, developer tools, and infrastructure. i&apos;ve created dashboards that process millions of events per second. i&apos;ve architected systems that help developers deploy faster. i&apos;ve built experimental tools that blend distributed systems with creative workflows.
              </p>

              <p>
                what excites me most: building things that feel impossible until they&apos;re done. the challenge of making complex systems simple. creating infrastructure that disappears into the background, so developers can focus on what matters.
              </p>
            </div>

            {/* Philosophy box */}
            <div className="border border-border/40 rounded-sm p-6 md:p-8 my-12 bg-background/50">
              <h3 className="text-sm font-semibold mb-4 text-foreground/90">how i think about building</h3>
              <div className="space-y-3 text-xs leading-relaxed text-foreground/75">
                <p>
                  <span className="text-foreground/90">systems over features.</span> a well-designed system naturally produces good features. spend time on architecture, not decoration.
                </p>
                <p>
                  <span className="text-foreground/90">constraints breed creativity.</span> the best work happens when you have limits. work within them, and you&apos;ll find elegant solutions.
                </p>
                <p>
                  <span className="text-foreground/90">ship early, iterate always.</span> perfect is the enemy of done. get something working, learn, improve.
                </p>
              </div>
            </div>

            {/* Interests and current work */}
            <div className="space-y-6 text-sm leading-relaxed text-foreground/85">
              <p>
                outside of code, i&apos;m into experimental music production, drone research, and building communities. i spend time thinking about distributed systems at 2am, wondering why real-time systems break under pressure, and exploring the intersection of hardware and software.
              </p>

              <p>
                currently working on: ai-powered development tools, edge computing infrastructure, and systems that help teams move faster. always interested in: hackathons, building in public, and collaborating with people who think differently.
              </p>
            </div>

            {/* Closing note */}
            <div className="pt-6 border-t border-border/20">
              <p className="text-xs text-foreground/60 italic">
                last updated: january 2026. always building. always learning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
