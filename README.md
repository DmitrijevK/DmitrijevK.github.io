# Portfolio Website

Персональный сайт-портфолио системного администратора и сетевого инженера.

## 🚀 Деплой на GitHub Pages

### Вариант 1: Деплой в текущий репозиторий

1. **Включите GitHub Pages** в настройках репозитория:
   - Перейдите в Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. **Настройте GitHub Actions**:
   - Перейдите в Settings → Actions → General
   - Включите "Allow GitHub Actions to create and approve pull requests"

3. **Запушьте изменения**:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

### Вариант 2: Деплой в DmitrijevK.github.io

Если хотите деплоить в отдельный репозиторий `DmitrijevK.github.io`:

1. **Создайте репозиторий** `DmitrijevK.github.io`
2. **Раскомментируйте строку** в `.github/workflows/deploy.yml`:
   ```yaml
   external_repository: DmitrijevK/DmitrijevK.github.io
   ```
3. **Настройте права доступа** в репозитории `DmitrijevK.github.io`:
   - Settings → Actions → General → Workflow permissions
   - Включите "Read and write permissions"

### Ручной деплой

1. **Соберите проект**:
   ```bash
   npm run build
   ```

2. **Загрузите папку `out`** в ветку `gh-pages` или в репозиторий `DmitrijevK.github.io`

## 🛠 Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## 📁 Структура проекта

- `app/` - Основные страницы (Next.js App Router)
- `components/` - React компоненты
- `config/` - Конфигурация сайта
- `public/` - Статические файлы
- `styles/` - CSS стили

## ⚙️ Конфигурация

Основные настройки находятся в `config/site-config.ts`:
- Персональная информация
- GitHub профиль
- Социальные сети
- Контактные данные

## 🌐 Сайт будет доступен по адресу

- **Вариант 1**: `https://dmitrijevk.github.io/portfolio2.1/`
- **Вариант 2**: `https://dmitrijevk.github.io/`
