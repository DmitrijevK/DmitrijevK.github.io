import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Автоматизация сетевой инфраструктуры с помощью Python",
    excerpt:
      "Как я создал систему автоматического мониторинга и конфигурации сетевого оборудования CISCO с использованием Python и Netmiko.",
    image: "/network-automation-python.png",
    date: "2024-01-15",
    readTime: "8 мин",
    tags: ["Python", "CISCO", "Automation"],
  },
  {
    id: 2,
    title: "Безопасность VMware vSphere: лучшие практики",
    excerpt:
      "Подробное руководство по настройке безопасности виртуальной инфраструктуры VMware и защите от современных угроз.",
    image: "/vmware-security.png",
    date: "2024-01-08",
    readTime: "12 мин",
    tags: ["VMware", "Security", "Infrastructure"],
  },
  {
    id: 3,
    title: "Пентестинг корпоративных сетей: методология и инструменты",
    excerpt:
      "Мой опыт проведения тестирования на проникновение в корпоративных сетях и анализ наиболее эффективных инструментов.",
    image: "/penetration-testing-network-security.png",
    date: "2024-01-01",
    readTime: "15 мин",
    tags: ["Pentesting", "Security", "Network"],
  },
  {
    id: 4,
    title: "Миграция на Windows Server 2022: пошаговое руководство",
    excerpt: "Практические советы по планированию и выполнению миграции с Windows Server 2016/2019 на новую версию.",
    image: "/placeholder-tpcf6.png",
    date: "2023-12-20",
    readTime: "10 мин",
    tags: ["Windows Server", "Migration", "Infrastructure"],
  },
]

export function BlogSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            <span className="flex items-center justify-center space-x-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <span>Insights, configs, and lessons from the field</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Делюсь опытом работы с сетевыми технологиями, системным администрированием и кибербезопасностью
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`flex ${index === 0 ? "flex-col md:flex-row" : "flex-col"}`}>
                <div className={`${index === 0 ? "md:w-1/2" : ""}`}>
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className={`p-6 ${index === 0 ? "md:w-1/2" : ""}`}>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString("ru-RU")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className={`font-heading font-bold mb-3 ${index === 0 ? "text-xl md:text-2xl" : "text-lg"}`}>
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      Читать
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
          >
            Все статьи
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
