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

### 1. Клонирование

```bash
git clone https://github.com/kirillbbb/deposit-calculator.git
cd deposit-calculator
```

### 2. Запуск backend

В отдельном терминале:

```bash
cd backend
mvn clean test
mvn spring-boot:run
```

Backend будет доступен на:

```
http://localhost:8080
```

Проверка:

```
http://localhost:8080/api/health
```

Ожидаемый ответ:

```json
{"status":"ok"}
```

### 3. Запуск frontend

В другом терминале:

```bash
cd frontend
npm install
npm test
npm run dev
```

Frontend будет доступен на:

```
http://localhost:5173
```

Frontend в режиме разработки проксирует запросы `/api` на backend `http://localhost:8080`.

### 4. Использование

Откройте:

```
http://localhost:5173
```

Введите сумму, срок и годовую ставку и нажмите «Рассчитать».

## Проверка проекта

Backend:

```bash
cd backend
mvn test
```

Frontend:

```bash
cd frontend
npm test
npm run build
```

GitHub Actions также автоматически запускает backend-тесты и frontend-тесты/сборку при изменениях соответствующей части проекта.
