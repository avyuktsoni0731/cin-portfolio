'use client'

import AsciiPlant from '../AsciiPlant'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* Cinematic gradient background with animation */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(135deg, rgba(60,40,80,0.4) 0%, rgba(40,30,50,0.3) 25%, rgba(30,50,70,0.4) 50%, rgba(50,35,60,0.3) 75%, rgba(40,40,50,0.4) 100%)',
          animation: 'gradientShift 15s ease-in-out infinite'
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 seed=%221%22/%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 fill=%22white%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
          backgroundSize: '400px 400px'
        }}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/90" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        {/* ASCII Plant */}
        <div className="mb-20 fade-in">
          <AsciiPlant />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background: linear-gradient(135deg, rgba(60,40,80,0.4) 0%, rgba(40,30,50,0.3) 25%, rgba(30,50,70,0.4) 50%, rgba(50,35,60,0.3) 75%, rgba(40,40,50,0.4) 100%);
          }
          50% {
            background: linear-gradient(135deg, rgba(40,30,50,0.3) 0%, rgba(30,50,70,0.4) 25%, rgba(50,35,60,0.3) 50%, rgba(60,40,80,0.4) 75%, rgba(40,40,50,0.3) 100%);
          }
        }
      `}</style>
    </section>
  )
}
