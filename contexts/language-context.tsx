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
    
    // Password Generator
    "tools.password.generated": "Сгенерированный пароль",
    "tools.password.placeholder": "Нажмите 'Сгенерировать' для создания пароля",
    "tools.password.strength.label": "Надёжность",
    "tools.password.strength.weak": "Слабый",
    "tools.password.strength.medium": "Средний",
    "tools.password.strength.strong": "Сильный",
    "tools.password.strength.veryStrong": "Очень сильный",
    "tools.password.length": "Длина",
    "tools.password.options": "Настройки",
    "tools.password.characterTypes": "Типы символов",
    "tools.password.uppercase": "Заглавные буквы",
    "tools.password.lowercase": "Строчные буквы",
    "tools.password.numbers": "Цифры",
    "tools.password.symbols": "Специальные символы",
    "tools.password.advanced": "Дополнительные настройки",
    "tools.password.excludeSimilar": "Исключить похожие символы",
    "tools.password.excludeSimilarDesc": "Исключить 0, O, 1, l, I для лучшей читаемости",
    "tools.password.generate": "Сгенерировать пароль",
    "tools.password.tips.title": "Советы по безопасности:",
    "tools.password.tips.length": "Используйте пароли длиной не менее 12 символов",
    "tools.password.tips.complexity": "Используйте комбинацию букв, цифр и символов",
    "tools.password.tips.unique": "Не используйте один пароль для нескольких аккаунтов",
    "tools.password.tips.manager": "Используйте менеджер паролей для безопасного хранения",
    
    // IP Network Info
    "tools.ipInfo.title": "IP / Информация о сети",
    "tools.ipInfo.placeholder": "Введите IP-адрес или оставьте пустым для вашего IP",
    "tools.ipInfo.search": "Поиск",
    "tools.ipInfo.myIP": "Мой IP",
    "tools.ipInfo.currentIP": "Текущий IP",
    "tools.ipInfo.error": "Ошибка при получении информации об IP",
    "tools.ipInfo.basicInfo": "Основная информация",
    "tools.ipInfo.ipAddress": "IP-адрес",
    "tools.ipInfo.status": "Статус",
    "tools.ipInfo.location": "Местоположение",
    "tools.ipInfo.country": "Страна",
    "tools.ipInfo.region": "Регион",
    "tools.ipInfo.city": "Город",
    "tools.ipInfo.zip": "Почтовый индекс",
    "tools.ipInfo.coordinates": "Координаты",
    "tools.ipInfo.timezone": "Часовой пояс",
    "tools.ipInfo.networkInfo": "Сетевая информация",
    "tools.ipInfo.isp": "Провайдер (ISP)",
    "tools.ipInfo.organization": "Организация",
    "tools.ipInfo.asn": "ASN",
    "tools.ipInfo.apiInfo.title": "Информация об API",
    "tools.ipInfo.apiInfo.description": "Используется бесплатный API ip-api.com для получения информации об IP-адресах.",
    "tools.ipInfo.apiInfo.limit": "Лимит: 45 запросов в минуту",
    
    // SSL Checker
    "tools.ssl.title": "SSL Checker",
    "tools.ssl.placeholder": "Введите домен (например: example.com)",
    "tools.ssl.check": "Проверить",
    "tools.ssl.domainRequired": "Введите домен для проверки",
    "tools.ssl.error": "Ошибка при проверке SSL сертификата",
    "tools.ssl.status": "Статус сертификата",
    "tools.ssl.domain": "Домен",
    "tools.ssl.daysRemaining": "Осталось дней",
    "tools.ssl.days": "дней",
    "tools.ssl.valid": "Валидный",
    "tools.ssl.invalid": "Невалидный",
    "tools.ssl.expired": "Истек",
    "tools.ssl.expiringSoon": "Скоро истечет",
    "tools.ssl.certificateDetails": "Детали сертификата",
    "tools.ssl.issuer": "Издатель",
    "tools.ssl.subject": "Субъект",
    "tools.ssl.validFrom": "Действителен с",
    "tools.ssl.validTo": "Действителен до",
    "tools.ssl.serialNumber": "Серийный номер",
    "tools.ssl.chain": "Цепочка сертификатов",
    "tools.ssl.security": "Безопасность",
    "tools.ssl.sni": "SNI (Server Name Indication)",
    "tools.ssl.enabled": "Включено",
    "tools.ssl.disabled": "Выключено",
    "tools.ssl.tlsVersions": "Версии TLS",
    "tools.ssl.cipher": "Шифры",
    "tools.ssl.noChainData": "Данные о цепочке недоступны",
    "tools.ssl.browserCheck": "Проверка через браузер",
    "tools.ssl.notAvailable": "Недоступно",
    "tools.ssl.connectionFailed": "Не удалось подключиться к домену",
    "tools.ssl.info.title": "Информация",
    "tools.ssl.info.description": "Проверка SSL сертификата через SSL Labs API и браузерные методы.",
    
    // Base64 / Hash Tool
    "tools.base64.input": "Входные данные",
    "tools.base64.inputPlaceholder": "Введите текст для кодирования или декодирования...",
    "tools.base64.clear": "Очистить",
    "tools.base64.encode": "Base64 Encode",
    "tools.base64.decode": "Base64 Decode",
    "tools.base64.encodePlaceholder": "Закодированный текст появится здесь...",
    "tools.base64.decodePlaceholder": "Декодированный текст появится здесь...",
    "tools.base64.hashPlaceholder": "Хеш появится здесь...",
    "tools.base64.copy": "Копировать",
    "tools.base64.copied": "Скопировано!",

    // Docker Compose Generator
    "tools.compose.title": "Docker Compose Генератор",
    "tools.compose.service": "Сервис",
    "tools.compose.containerName": "Имя контейнера",
    "tools.compose.ports": "Порты (host:container, по строке)",
    "tools.compose.volumes": "Тома (host:container, по строке)",
    "tools.compose.env": "Переменные окружения (KEY=value, по строке)",
    "tools.compose.copy": "Копировать YAML",
    "tools.compose.copied": "Скопировано!",
    "tools.compose.reset": "Сбросить",
    "tools.compose.helpTab": "Памятка",
    "tools.compose.help1": "Добавляйте/правьте порты и тома построчно — YAML обновляется сразу.",
    "tools.compose.help2": "Используйте именованные тома (например, pgdata:/var/lib/postgresql/data) для сохранения данных.",
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
    
    // Password Generator
    "tools.password.generated": "Generated Password",
    "tools.password.placeholder": "Click 'Generate' to create a password",
    "tools.password.strength.label": "Strength",
    "tools.password.strength.weak": "Weak",
    "tools.password.strength.medium": "Medium",
    "tools.password.strength.strong": "Strong",
    "tools.password.strength.veryStrong": "Very Strong",
    "tools.password.length": "Length",
    "tools.password.options": "Options",
    "tools.password.characterTypes": "Character Types",
    "tools.password.uppercase": "Uppercase Letters",
    "tools.password.lowercase": "Lowercase Letters",
    "tools.password.numbers": "Numbers",
    "tools.password.symbols": "Special Symbols",
    "tools.password.advanced": "Advanced Options",
    "tools.password.excludeSimilar": "Exclude Similar Characters",
    "tools.password.excludeSimilarDesc": "Exclude 0, O, 1, l, I for better readability",
    "tools.password.generate": "Generate Password",
    "tools.password.tips.title": "Security Tips:",
    "tools.password.tips.length": "Use passwords at least 12 characters long",
    "tools.password.tips.complexity": "Use a combination of letters, numbers, and symbols",
    "tools.password.tips.unique": "Don't reuse passwords across multiple accounts",
    "tools.password.tips.manager": "Use a password manager for secure storage",
    
    // IP Network Info
    "tools.ipInfo.title": "IP / Network Info",
    "tools.ipInfo.placeholder": "Enter IP address or leave empty for your IP",
    "tools.ipInfo.search": "Search",
    "tools.ipInfo.myIP": "My IP",
    "tools.ipInfo.currentIP": "Current IP",
    "tools.ipInfo.error": "Error fetching IP information",
    "tools.ipInfo.basicInfo": "Basic Information",
    "tools.ipInfo.ipAddress": "IP Address",
    "tools.ipInfo.status": "Status",
    "tools.ipInfo.location": "Location",
    "tools.ipInfo.country": "Country",
    "tools.ipInfo.region": "Region",
    "tools.ipInfo.city": "City",
    "tools.ipInfo.zip": "ZIP Code",
    "tools.ipInfo.coordinates": "Coordinates",
    "tools.ipInfo.timezone": "Timezone",
    "tools.ipInfo.networkInfo": "Network Information",
    "tools.ipInfo.isp": "ISP",
    "tools.ipInfo.organization": "Organization",
    "tools.ipInfo.asn": "ASN",
    "tools.ipInfo.apiInfo.title": "API Information",
    "tools.ipInfo.apiInfo.description": "Using free ip-api.com API to fetch IP address information.",
    "tools.ipInfo.apiInfo.limit": "Limit: 45 requests per minute",
    
    // SSL Checker
    "tools.ssl.title": "SSL Checker",
    "tools.ssl.placeholder": "Enter domain (e.g., example.com)",
    "tools.ssl.check": "Check",
    "tools.ssl.domainRequired": "Enter domain to check",
    "tools.ssl.error": "Error checking SSL certificate",
    "tools.ssl.status": "Certificate Status",
    "tools.ssl.domain": "Domain",
    "tools.ssl.daysRemaining": "Days Remaining",
    "tools.ssl.days": "days",
    "tools.ssl.valid": "Valid",
    "tools.ssl.invalid": "Invalid",
    "tools.ssl.expired": "Expired",
    "tools.ssl.expiringSoon": "Expiring Soon",
    "tools.ssl.certificateDetails": "Certificate Details",
    "tools.ssl.issuer": "Issuer",
    "tools.ssl.subject": "Subject",
    "tools.ssl.validFrom": "Valid From",
    "tools.ssl.validTo": "Valid To",
    "tools.ssl.serialNumber": "Serial Number",
    "tools.ssl.chain": "Certificate Chain",
    "tools.ssl.security": "Security",
    "tools.ssl.sni": "SNI (Server Name Indication)",
    "tools.ssl.enabled": "Enabled",
    "tools.ssl.disabled": "Disabled",
    "tools.ssl.tlsVersions": "TLS Versions",
    "tools.ssl.cipher": "Ciphers",
    "tools.ssl.noChainData": "Chain data not available",
    "tools.ssl.browserCheck": "Browser check",
    "tools.ssl.notAvailable": "Not available",
    "tools.ssl.connectionFailed": "Failed to connect to domain",
    "tools.ssl.info.title": "Information",
    "tools.ssl.info.description": "SSL certificate checking via SSL Labs API and browser methods.",
    
    // Base64 / Hash Tool
    "tools.base64.input": "Input",
    "tools.base64.inputPlaceholder": "Enter text to encode or decode...",
    "tools.base64.clear": "Clear",
    "tools.base64.encode": "Base64 Encode",
    "tools.base64.decode": "Base64 Decode",
    "tools.base64.encodePlaceholder": "Encoded text will appear here...",
    "tools.base64.decodePlaceholder": "Decoded text will appear here...",
    "tools.base64.hashPlaceholder": "Hash will appear here...",
    "tools.base64.copy": "Copy",
    "tools.base64.copied": "Copied!",

    // Docker Compose Generator
    "tools.compose.title": "Docker Compose Generator",
    "tools.compose.service": "Service",
    "tools.compose.containerName": "Container name",
    "tools.compose.ports": "Ports (host:container per line)",
    "tools.compose.volumes": "Volumes (host:container per line)",
    "tools.compose.env": "Environment variables (KEY=value per line)",
    "tools.compose.copy": "Copy YAML",
    "tools.compose.copied": "Copied!",
    "tools.compose.reset": "Reset",
    "tools.compose.helpTab": "Help",
    "tools.compose.help1": "Add or adjust ports/volumes per line, YAML updates instantly.",
    "tools.compose.help2": "Use named volumes (e.g. pgdata:/var/lib/postgresql/data) to persist data.",
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
