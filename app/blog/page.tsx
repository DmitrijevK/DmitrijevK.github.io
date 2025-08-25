import { getAllPosts, getAllTags } from "@/lib/posts"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react"
import Link from "next/link"

const staticPosts = [
  {
    id: "hello-world",
    title: "Автоматизация сетевой инфраструктуры с помощью Python",
    description: "Как я создал систему автоматического мониторинга и конфигурации сетевого оборудования CISCO с использованием Python и Netmiko.",
    date: "2024-01-15",
    readTime: "8 мин",
    tags: ["Python", "CISCO", "Automation"],
    image: "/network-automation-python.png",
    published: true,
    excerpt: "В современном мире сетевого администрирования автоматизация стала не просто прихотью, а необходимостью..."
  },
  {
    id: "vmware-security-best-practices",
    title: "Безопасность VMware vSphere: лучшие практики",
    description: "Подробное руководство по настройке безопасности виртуальной инфраструктуры VMware и защите от современных угроз.",
    date: "2024-01-08",
    readTime: "12 мин",
    tags: ["VMware", "Security", "Infrastructure"],
    image: "/vmware-security.png",
    published: true,
    excerpt: "Виртуализация стала основой современной IT-инфраструктуры, но с ростом популярности VMware vSphere растут и угрозы безопасности..."
  },
  {
    id: "penetration-testing-guide",
    title: "Пентестинг корпоративных сетей: методология и инструменты",
    description: "Мой опыт проведения тестирования на проникновение в корпоративных сетях и анализ наиболее эффективных инструментов.",
    date: "2024-01-01",
    readTime: "15 мин",
    tags: ["Pentesting", "Security", "Network", "Kali Linux"],
    image: "/penetration-testing-network-security.png",
    published: true,
    excerpt: "Тестирование на проникновение (пентестинг) является критически важным компонентом комплексной стратегии кибербезопасности..."
  }
]

const staticTags = ["Python", "CISCO", "Automation", "VMware", "Security", "Infrastructure", "Network", "Kali Linux"]

export default async function BlogPage() {
  let posts = getAllPosts()
  let tags = getAllTags()
  
  if (posts.length === 0) {
    posts = staticPosts
    tags = staticTags
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-20 px-4">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="flex items-center justify-center space-x-3">
              <BookOpen className="w-10 h-10 text-purple-600" />
              <span>Блог</span>
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Делюсь опытом работы с сетевыми технологиями, системным администрированием и кибербезопасностью
          </p>
        </div>

        {/* Фильтр по тегам */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Фильтр по тегам:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Список постов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
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

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt || post.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      >
                        Читать
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Пагинация или "Назад" */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
            >
              ← Назад на главную
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
