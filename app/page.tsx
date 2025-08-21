import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { RepositoryCarousel } from "@/components/repository-carousel"
// import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { LanguageToggle } from "@/components/language-toggle"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Портфолио Кирилла</h1>
        <p className="text-lg text-muted-foreground">
          Системный администратор и сетевой инженер
        </p>
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            Сайт успешно задеплоен на GitHub Pages!
          </p>
        </div>
      </div>
    </main>
  )
}
