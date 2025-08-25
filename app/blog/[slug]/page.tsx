import { getPostById, getPostContent, getPostSlugs } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { notFound } from "next/navigation"

const staticPosts = {
  "hello-world": {
    id: "hello-world",
    title: "Автоматизация сетевой инфраструктуры с помощью Python",
    description: "Как я создал систему автоматического мониторинга и конфигурации сетевого оборудования CISCO с использованием Python и Netmiko.",
    date: "2024-01-15",
    readTime: "8 мин",
    tags: ["Python", "CISCO", "Automation"],
    image: "/network-automation-python.png",
    published: true,
    content: `
# Автоматизация сетевой инфраструктуры с помощью Python

В современном мире сетевого администрирования автоматизация стала не просто прихотью, а необходимостью. Когда у вас есть сотни устройств CISCO, требующих регулярного мониторинга и обновления конфигураций, ручная работа становится неэффективной и подверженной ошибкам.

## Проблема

Моя команда столкнулась с необходимостью:
- Мониторить состояние 200+ сетевых устройств
- Регулярно обновлять конфигурации
- Собирать статистику производительности
- Обеспечивать резервное копирование конфигураций

## Решение

Я разработал систему автоматизации на Python с использованием библиотеки Netmiko. Вот основные компоненты:

### 1. Подключение к устройствам

\`\`\`python
from netmiko import ConnectHandler

def connect_to_device(host, username, password):
    device = {
        'device_type': 'cisco_ios',
        'host': host,
        'username': username,
        'password': password,
        'port': 22,
    }
    
    try:
        connection = ConnectHandler(**device)
        return connection
    except Exception as e:
        print(f"Ошибка подключения к {host}: {e}")
        return None
\`\`\`

## Результаты

После внедрения системы автоматизации:

- ✅ Время на мониторинг сократилось с 4 часов до 30 минут
- ✅ Количество ошибок конфигурации уменьшилось на 80%
- ✅ Все устройства теперь имеют актуальные резервные копии
- ✅ Система работает 24/7 без вмешательства человека

## Заключение

Автоматизация сетевой инфраструктуры - это инвестиция в будущее. Начальные затраты времени на разработку окупаются многократно в долгосрочной перспективе.
    `
  },
  "vmware-security-best-practices": {
    id: "vmware-security-best-practices",
    title: "Безопасность VMware vSphere: лучшие практики",
    description: "Подробное руководство по настройке безопасности виртуальной инфраструктуры VMware и защите от современных угроз.",
    date: "2024-01-08",
    readTime: "12 мин",
    tags: ["VMware", "Security", "Infrastructure"],
    image: "/vmware-security.png",
    published: true,
    content: `
# Безопасность VMware vSphere: лучшие практики

Виртуализация стала основой современной IT-инфраструктуры, но с ростом популярности VMware vSphere растут и угрозы безопасности. В этой статье я поделюсь практическим опытом защиты виртуальной среды.

## Основные угрозы

### 1. Атаки на vCenter Server
vCenter Server является критически важным компонентом, и его компрометация может привести к полному контролю над виртуальной инфраструктурой.

### 2. VM Escape атаки
Теоретически возможно "сбежать" из виртуальной машины и получить доступ к гипервизору.

## Рекомендации по безопасности

### 1. Настройка vCenter Server

\`\`\`bash
# Отключение ненужных сервисов
systemctl disable vsphere-ui
systemctl disable vsphere-client

# Настройка файрвола
ufw allow 443/tcp  # vCenter HTTPS
ufw allow 902/tcp  # vCenter API
ufw deny 22/tcp    # SSH (если не нужен)
\`\`\`

## Заключение

Безопасность VMware vSphere требует комплексного подхода. Важно регулярно обновлять систему, мониторить логи и проводить аудит безопасности.
    `
  },
  "penetration-testing-guide": {
    id: "penetration-testing-guide",
    title: "Пентестинг корпоративных сетей: методология и инструменты",
    description: "Мой опыт проведения тестирования на проникновение в корпоративных сетях и анализ наиболее эффективных инструментов.",
    date: "2024-01-01",
    readTime: "15 мин",
    tags: ["Pentesting", "Security", "Network", "Kali Linux"],
    image: "/penetration-testing-network-security.png",
    published: true,
    content: `
# Пентестинг корпоративных сетей: методология и инструменты

Тестирование на проникновение (пентестинг) является критически важным компонентом комплексной стратегии кибербезопасности. В этой статье я поделюсь своим опытом проведения пентестинга корпоративных сетей и расскажу о наиболее эффективных инструментах.

## Методология пентестинга

### 1. Планирование и разведка

Первый этап включает в себя:
- Определение целей и границ тестирования
- Сбор информации о целевой организации
- Анализ внешней инфраструктуры

\`\`\`bash
# Пример сбора информации с помощью nmap
nmap -sS -sV -O -p- 192.168.1.0/24

# Сканирование веб-приложений
nikto -h http://target.com

# Поиск поддоменов
gobuster dns -d target.com -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
\`\`\`

## Инструменты для пентестинга

### Сканирование сети

1. **Nmap** - базовое сканирование портов
2. **Masscan** - быстрое сканирование больших сетей
3. **Angry IP Scanner** - GUI инструмент для Windows

## Заключение

Пентестинг - это не просто поиск уязвимостей, а комплексный процесс оценки безопасности. Важно помнить об этических аспектах и всегда получать письменное разрешение перед началом тестирования.
    `
  }
}

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  const staticSlugs = Object.keys(staticPosts)
  const allSlugs = [...slugs, ...staticSlugs]
  
  return allSlugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  let post = getPostById(params.slug)
  let content = ""
  
  if (!post) {
    const staticPost = staticPosts[params.slug as keyof typeof staticPosts]
    if (staticPost) {
      post = staticPost
      const { remark } = await import('remark')
      const html = await import('remark-html')
      const processedContent = await remark()
        .use(html.default)
        .process(staticPost.content)
      content = processedContent.toString()
    }
  } else {
    content = await getPostContent(params.slug)
  }
  
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-20 px-4">
        <div className="mb-8">
          <Link href="/blog">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к блогу
            </Button>
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString("ru-RU")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <ShareButton title={post.title} text={post.description} />
            </div>
          </header>

          {post.image && (
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        <div className="mt-16 pt-8 border-t">
          <div className="text-center">
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"
              >
                ← Все статьи
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
