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
    "nav.tools": "Инструменты",
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

    // Tools Section
    "tools.title": "IT Инструменты",
    "tools.description": "Полезные инструменты для системных администраторов и IT-специалистов",
    "tools.search.placeholder": "Поиск инструментов...",
    "tools.results": "Найдено",
    "tools.noResults": "Инструменты не найдены. Попробуйте изменить поисковый запрос.",
    "tools.firewall.title": "Генератор правил фаервола",
    "tools.firewall.description": "Создавайте правила для iptables и nftables с удобным интерфейсом",
    "tools.firewall.badge": "Firewall",
    "tools.firewall.table": "Таблица",
    "tools.firewall.chain": "Цепочка",
    "tools.firewall.rule": "Правило",
    "tools.firewall.action": "Действие",
    "tools.firewall.protocol": "Протокол",
    "tools.firewall.all": "Все",
    "tools.firewall.source": "Источник (IP/Сеть)",
    "tools.firewall.destination": "Назначение (IP/Сеть)",
    "tools.firewall.sourcePort": "Порт источника",
    "tools.firewall.destinationPort": "Порт назначения",
    "tools.firewall.interface": "Интерфейс",
    "tools.firewall.comment": "Комментарий",
    "tools.firewall.commentPlaceholder": "Описание правила",
    "tools.firewall.addRule": "Добавить правило",
    "tools.firewall.copy": "Копировать",
    "tools.firewall.fullScript": "Полный скрипт",
    "tools.firewall.copyScript": "Копировать скрипт",
    "tools.firewall.cheatsheet.title": "Памятка:",
    "tools.firewall.cheatsheet.iptables": "iptables -A INPUT -p tcp --dport 80 -j ACCEPT",
    "tools.firewall.cheatsheet.nftables": "nft add rule filter INPUT tcp dport 80 accept",
    "tools.firewall.cheatsheet.common": "Общие команды",
    "tools.firewall.cheatsheet.commonDesc": "Просмотр: iptables -L или nft list ruleset | Сохранение: iptables-save или nft list ruleset > rules.nft",
  },
  en: {
    // Navigation
    "nav.tools": "Tools",
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

    // Tools Section
    "tools.title": "IT Tools",
    "tools.description": "Useful tools for system administrators and IT professionals",
    "tools.search.placeholder": "Search tools...",
    "tools.results": "Found",
    "tools.noResults": "No tools found. Try changing your search query.",
    "tools.firewall.title": "Firewall Rules Generator",
    "tools.firewall.description": "Create iptables and nftables rules with an easy-to-use interface",
    "tools.firewall.badge": "Firewall",
    "tools.firewall.table": "Table",
    "tools.firewall.chain": "Chain",
    "tools.firewall.rule": "Rule",
    "tools.firewall.action": "Action",
    "tools.firewall.protocol": "Protocol",
    "tools.firewall.all": "All",
    "tools.firewall.source": "Source (IP/Network)",
    "tools.firewall.destination": "Destination (IP/Network)",
    "tools.firewall.sourcePort": "Source Port",
    "tools.firewall.destinationPort": "Destination Port",
    "tools.firewall.interface": "Interface",
    "tools.firewall.comment": "Comment",
    "tools.firewall.commentPlaceholder": "Rule description",
    "tools.firewall.addRule": "Add Rule",
    "tools.firewall.copy": "Copy",
    "tools.firewall.fullScript": "Full Script",
    "tools.firewall.copyScript": "Copy Script",
    "tools.firewall.cheatsheet.title": "Cheat Sheet:",
    "tools.firewall.cheatsheet.iptables": "iptables -A INPUT -p tcp --dport 80 -j ACCEPT",
    "tools.firewall.cheatsheet.nftables": "nft add rule filter INPUT tcp dport 80 accept",
    "tools.firewall.cheatsheet.common": "Common Commands",
    "tools.firewall.cheatsheet.commonDesc": "View: iptables -L or nft list ruleset | Save: iptables-save or nft list ruleset > rules.nft",
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
