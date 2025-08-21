"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex rounded-md border border-border overflow-hidden">
        <Button
          variant={language === "ru" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("ru")}
          className="rounded-none px-3 py-1 text-xs"
        >
          RU
        </Button>
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="rounded-none px-3 py-1 text-xs"
        >
          EN
        </Button>
      </div>
    </div>
  )
}
