"use client"

import { ToolsCatalog } from "@/components/tools-catalog"
import { Header } from "@/components/header"
import { useLanguage } from "@/contexts/language-context"

export default function ToolsPage() {
  const { t } = useLanguage()
  
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t("tools.title")}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("tools.description")}
            </p>
          </div>

          <ToolsCatalog />
        </div>
      </div>
    </main>
  )
}