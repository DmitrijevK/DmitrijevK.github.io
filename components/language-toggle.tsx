"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === "ru" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("ru")}
        className="text-xs"
      >
        RU
      </Button>
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="text-xs"
      >
        EN
      </Button>
    </div>
  )
}
