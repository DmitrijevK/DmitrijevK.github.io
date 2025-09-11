"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "ru" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ru: {
    // Navigation
    "nav.about": "Обо мне",
    "nav.repositories": "Репозитории",
    "nav.blog": "Блог",
    "nav.contact": "Контакты",

    // Hero Section
    "hero.title": "System Engineer",
    "hero.description": "Создаю надежные системы. Оптимизирую сети. Автоматизирую будущее.",
    "hero.skills.network": "Сетевые технологии",
    "hero.skills.system": "Системное администрирование",
    "hero.skills.security": "Кибербезопасность",
    "hero.cta.projects": "Посмотреть проекты",
    "hero.cta.contact": "Связаться",

    // About Section
    "about.title": "Обо мне",
    "about.description": "Опытный системный администратор с глубокими знаниями в области сетевых технологий",
    "about.skills": "Навыки",
    "about.experience": "Опыт работы",

    // Repository Section
    "repos.title": "Последние развертывания из GitHub CLI",
    "repos.description": "Проекты с открытым исходным кодом и инструменты автоматизации, которые я создал",
    "repos.settings": "Настройки репозиториев",
    "repos.username": "GitHub Username",
    "repos.username.help": "Введите ваш GitHub username для загрузки репозиториев",
    "repos.save": "Сохранить",

    // Blog Section
    "blog.title": "Последние статьи",
    "blog.description": "Делюсь знаниями и опытом в области системного администрирования",
    "blog.readMore": "Читать далее",

    // Career Section
    "career.title": "Карьерный путь",
    "career.description": "Мой профессиональный опыт в области IT и системного администрирования",
    "career.types.work": "Работа",
    "career.types.education": "Образование",
    "career.types.certification": "Сертификация",
    "career.stats.years": "Лет опыта",
    "career.stats.projects": "Проектов",
    "career.stats.technologies": "Технологий",
    "career.stats.satisfaction": "Довольных клиентов",

    // Contact Section
    "contact.title": "Связаться со мной",
    "contact.description": "Готов обсудить новые проекты и возможности сотрудничества",
    "contact.email": "Email",
    "contact.telegram": "Telegram",
    "contact.linkedin": "LinkedIn",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.repositories": "Repositories",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "System Engineer",
    "hero.description": "Building resilient systems. Optimizing networks. Automating the future.",
    "hero.skills.network": "Network Engineering",
    "hero.skills.system": "System Administration",
    "hero.skills.security": "Cybersecurity",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Get in Touch",

    // About Section
    "about.title": "About me",
    "about.description": "Experienced system administrator with deep knowledge in network technologies",
    "about.skills": "Skills",
    "about.experience": "Experience",

    // Repository Section
    "repos.title": "Latest Deployments from GitHub CLI",
    "repos.description": "Open source projects and automation tools I've built",
    "repos.settings": "Repository Settings",
    "repos.username": "GitHub Username",
    "repos.username.help": "Enter your GitHub username to load repositories",
    "repos.save": "Save",

    // Blog Section
    "blog.title": "Latest Articles",
    "blog.description": "Sharing knowledge and experience in system administration",
    "blog.readMore": "Read more",

    // Career Section
    "career.title": "Career Path",
    "career.description": "My professional experience in IT and system administration",
    "career.types.work": "Work",
    "career.types.education": "Education",
    "career.types.certification": "Certification",
    "career.stats.years": "Years Experience",
    "career.stats.projects": "Projects",
    "career.stats.technologies": "Technologies",
    "career.stats.satisfaction": "Client Satisfaction",

    // Contact Section
    "contact.title": "Get in touch",
    "contact.description": "Ready to discuss new projects and collaboration opportunities",
    "contact.email": "Email",
    "contact.telegram": "Telegram",
    "contact.linkedin": "LinkedIn",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
