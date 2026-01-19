import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CareerSection } from "@/components/career-section"
import { RepositoryCarousel } from "@/components/repository-carousel"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <RepositoryCarousel />
      <BlogSection />
      <ContactSection />
    </main>
  )
}
