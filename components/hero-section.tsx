"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Terminal, Network, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { siteConfig } from "@/config/site-config"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/network-topology-pattern.png')] bg-repeat opacity-20"></div>
      </div>

      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Terminal prompt */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 text-purple-600 font-mono text-sm">
              <Terminal className="w-4 h-4" /> 
              <span>kirill@portfolio:~$</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            <span className="block">{siteConfig.name}</span>
            <span className="block text-purple-600 hover:animate-glitch cursor-default">{t("hero.title")}</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>

          {/* Skills badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
              <Network className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">{t("hero.skills.network")}</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
              <Terminal className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">{t("hero.skills.system")}</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">{t("hero.skills.security")}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              onClick={() => document.getElementById("repositories")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("hero.cta.projects")}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-8 py-3 text-lg bg-transparent"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("hero.cta.contact")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
