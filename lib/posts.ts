import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export interface Post {
  id: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  image: string
  published: boolean
  content?: string
  excerpt?: string
}

export function getAllPosts(): Post[] {
  // Проверяем, существует ли директория
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Убираем расширение ".md" из имени файла для получения id
      const id = fileName.replace(/\.md$/, '')

      // Читаем markdown файл как строку
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Используем gray-matter для парсинга метаданных поста
      const matterResult = matter(fileContents)

      // Объединяем данные с id
      return {
        id,
        ...(matterResult.data as Omit<Post, 'id'>),
        excerpt: matterResult.content.slice(0, 200) + '...'
      }
    })
    .filter((post) => post.published) // Фильтруем только опубликованные посты
    .sort((a, b) => (a.date < b.date ? 1 : -1)) // Сортируем по дате (новые сначала)

  return allPostsData
}

export function getPostById(id: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Используем gray-matter для парсинга метаданных поста
    const matterResult = matter(fileContents)

    // Объединяем данные с id
    return {
      id,
      ...(matterResult.data as Omit<Post, 'id'>),
      content: matterResult.content
    }
  } catch (error) {
    console.error(`Error reading post ${id}:`, error)
    return null
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export async function getPostContent(id: string): Promise<string> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Используем gray-matter для извлечения метаданных
  const matterResult = matter(fileContents)

  // Используем remark для конвертации markdown в HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return contentHtml
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.tags.includes(tag))
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = allPosts.flatMap((post) => post.tags)
  return [...new Set(tags)] // Убираем дубликаты
}
