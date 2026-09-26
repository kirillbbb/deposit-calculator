# Deposit Calculator

Fullstack-калькулятор вклада с ежемесячной капитализацией.

## Stack

- Backend: Java 21, Spring Boot, Maven
- Frontend: React, TypeScript, Vite
- Tests: JUnit 5, Vitest
- CI: GitHub Actions

## Features

- Расчёт итоговой суммы и дохода
- Ежемесячная капитализация
- Валидация на frontend и backend
- Финансовые расчёты через BigDecimal
- Обработка API и сетевых ошибок
- Responsive fintech UI
- Автоматические тесты

## API

### POST /api/calculate

Request:

```json
{
  "amount": 100000,
  "months": 12,
  "rate": 8.5
}
```

Response:

```json
{
  "total": 108839.09,
  "profit": 8839.09
}
```

Ограничения:

- сумма: 1 000–10 000 000 ₽
- срок: 1–60 месяцев
- ставка: 1–20%

## Local development

### Требования

- Java 21+
- Maven 3.9+
- Node.js 22+
- npm

### Установка

После клонирования репозитория установите зависимости:

```bash
npm install
npm run install:all
```

Первая команда устанавливает зависимости корневого оркестратора, вторая — frontend.

### Единый запуск

Из корня проекта:

```bash
npm run dev
```

Команда одновременно запускает backend и frontend.

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`

Для остановки обоих процессов нажмите `Ctrl+C`.

Frontend в режиме разработки проксирует запросы `/api` на backend `http://localhost:8080`.

### Тесты

Все тесты:

```bash
npm test
```

Только frontend:

```bash
npm run test:frontend
```

Только backend:

```bash
npm run test:backend
```

### Сборка

Собрать frontend и backend:

```bash
npm run build
```

Отдельно:

```bash
npm run build:frontend
npm run build:backend
```

### Запуск без оркестратора

Backend:

```bash
cd backend
mvn spring-boot:run
```

Frontend в отдельном терминале:

```bash
cd frontend
npm install
npm run dev
```

Проверка backend:

```
http://localhost:8080/api/health
```

Ожидаемый ответ:

```json
{"status":"ok"}
```

## CI

GitHub Actions автоматически запускает backend-тесты и frontend-тесты/сборку при изменениях соответствующей части проекта.
