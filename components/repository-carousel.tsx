"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, GitFork, ChevronLeft, ChevronRight, Terminal, Code2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { siteConfig } from "@/config/site-config"

const languageColors = {
  Python: "bg-blue-500",
  Shell: "bg-green-500",
  PowerShell: "bg-blue-600",
  "C#": "bg-purple-500",
  JavaScript: "bg-yellow-500",
  TypeScript: "bg-blue-400",
  Go: "bg-cyan-500",
}

interface Repository {
  id: number
  name: string
  description: string
  language: string
  stars: number
  forks: number
  url: string
}

export function RepositoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [repos, setRepos] = useState<Repository[]>([])
  const { t } = useLanguage()
  const itemsPerView = 3

  useEffect(() => {
    loadRepositories()
  }, [])

  const loadRepositories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=20`)
      if (response.ok) {
        const data = await response.json()
        const formattedRepos = data
          .filter((repo: any) => !repo.fork) // Исключаем форки
          .map((repo: any, index: number) => ({
            id: index + 1,
            name: repo.name,
            description: repo.description || "No description available",
            language: repo.language || "Unknown",
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            url: repo.html_url,
          }))
        setRepos(formattedRepos)
        setCurrentIndex(0)
      } else {
        console.error("Failed to fetch repositories")
        setRepos(getMockRepositories())
      }
    } catch (error) {
      console.error("Error fetching repositories:", error)
      setRepos(getMockRepositories())
    } finally {
      setIsLoading(false)
    }
  }

  const getMockRepositories = (): Repository[] => [
    {
      id: 1,
      name: "network-automation-scripts",
      description: "Python scripts for automating network configuration and monitoring tasks",
      language: "Python",
      stars: 24,
      forks: 8,
      url: `${siteConfig.github.profileUrl}/network-automation-scripts`,
    },
    {
      id: 2,
      name: "cisco-config-parser",
      description: "Tool for parsing and analyzing Cisco router configurations",
      language: "Python",
      stars: 18,
      forks: 5,
      url: `${siteConfig.github.profileUrl}/cisco-config-parser`,
    },
    {
      id: 3,
      name: "vmware-backup-automation",
      description: "Automated backup solution for VMware virtual machines",
      language: "Shell",
      stars: 31,
      forks: 12,
      url: `${siteConfig.github.profileUrl}/vmware-backup-automation`,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= repos.length ? 0 : prev + itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, repos.length - itemsPerView) : Math.max(0, prev - itemsPerView),
    )
  }

  const visibleRepos = repos.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section id="repositories" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              <span className="flex items-center space-x-3">
                <Terminal className="w-8 h-8 text-purple-600" />
                <span>{t("repos.title")}</span>
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">{t("repos.description")}</p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= repos.length}
              className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleRepos.map((repo) => (
            <Card
              key={repo.id}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card border border-border hover:border-purple-200 dark:hover:border-purple-800"
            >
              {/* Terminal header */}
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-border">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                  <Code2 className="w-3 h-3" />
                  <span>{repo.name}</span>
                </div>
              </div>

              {/* Repository content */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-mono font-semibold text-lg mb-2 text-foreground">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{repo.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div
                        className={`w-3 h-3 rounded-full ${languageColors[repo.language as keyof typeof languageColors] || "bg-gray-500"}`}
                      ></div>
                      <span className="text-xs text-muted-foreground">{repo.language}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-3 h-3" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => window.open(repo.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination dots */}
        {repos.length > itemsPerView && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(repos.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerView) === index ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
