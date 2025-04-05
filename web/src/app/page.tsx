"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlatformSection } from "@/components/platform-section"
import { VideoSection } from "@/components/video-section"
import { FeaturesSection } from "@/components/features-section"
import { WhySigapSection } from "@/components/why-sigap-section"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PlatformSection />
        <VideoSection />
        <FeaturesSection />
        <WhySigapSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}

