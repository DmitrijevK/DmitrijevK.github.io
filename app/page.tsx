import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CareerSection } from "@/components/career-section"
import { RepositoryCarousel } from "@/components/repository-carousel"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { LanguageToggle } from "@/components/language-toggle"

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <RepositoryCarousel />
      <BlogSection />
      <ContactSection />
    </main>
  )
}
