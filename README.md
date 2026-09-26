# Deposit Calculator

Fullstack-калькулятор вклада с ежемесячной капитализацией.

## Stack

- Backend: Java 21, Spring Boot, Maven
- Frontend: React, TypeScript, Vite
- Tests: JUnit 5, Vitest
- CI: GitHub Actions

## Features

- Расчёт итоговой суммы и дохода
- Валидация на frontend и backend
- Финансовые расчёты через BigDecimal
- Обработка API и сетевых ошибок
- Responsive fintech UI
- Автоматические тесты и CI

## API

`POST /api/calculate`

```json
{
  "amount": 100000,
  "months": 12,
  "rate": 8.5
}
```

```json
{
  "total": 108800.00,
  "profit": 8800.00
}
```

Ограничения: сумма 1 000–10 000 000 ₽, срок 1–60 месяцев, ставка 1–20%.

## Local development

Backend запускается на `http://localhost:8080`, frontend — через Vite на `http://localhost:5173`.

Для production frontend использует `VITE_API_URL`, backend — `FRONTEND_URL`.

## Deployment

Production links will be added after deployment.
