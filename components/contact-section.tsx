"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, Github } from "lucide-react"
import { siteConfig } from "@/config/site-config"

export function ContactSection() {
  const handleEmailClick = () => {
    window.open(`mailto:${siteConfig.contact.email}`, "_blank")
  }

  const handleLinkedInClick = () => {
    window.open(siteConfig.social.linkedin, "_blank")
  }

  const handleGitHubClick = () => {
    window.open(siteConfig.github.profileUrl, "_blank")
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Готов к новым проектам</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ищете системного администратора или сетевого инженера? Давайте обсудим ваш проект.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.contact.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
                onClick={handleEmailClick}
              >
                Написать
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Linkedin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">LinkedIn</h3>
                <p className="text-sm text-muted-foreground">Профессиональная сеть</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
                onClick={handleLinkedInClick}
              >
                Подключиться
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Github className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-sm text-muted-foreground">Открытый код</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
                onClick={handleGitHubClick}
              >
                Посмотреть
              </Button>
            </div>
          </Card>
        </div>

        {/* ASCII Art Footer */}
        <div className="border-t border-border pt-8">
          <div className="font-mono text-xs text-muted-foreground mb-4">
            <pre className="text-center">
              {`    ╔══════════════════════════════════════╗
    ║  kirill@portfolio:~$ whoami          ║
    ║  > System Administrator              ║
    ║  > Network Engineer                  ║
    ║  > Security Specialist               ║
    ╚══════════════════════════════════════╝`}
            </pre>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Kirill Dmitrijev. All right reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
