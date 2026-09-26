# Deposit Calculator

Fullstack deposit calculator built with Java and React.

## Stack

- Java 21 + Spring Boot
- React + TypeScript + Vite

## Features

- Deposit calculation with monthly capitalization
- Input validation
- Financial calculations with BigDecimal
- Responsive fintech-style UI
- API and automated tests

## API

`POST /api/calculate`

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
  "total": 108800.00,
  "profit": 8800.00
}
```

## Run locally

Backend and frontend instructions will be added with implementation.

## Deployment

Production links will be added after deployment.
