import type { CalculateRequest } from '../types/calculator';

export const LIMITS = {
  amount: { min: 1000, max: 10_000_000 },
  months: { min: 1, max: 60 },
  rate: { min: 1, max: 20 },
} as const;

export type ValidationErrors = Partial<
  Record<keyof CalculateRequest, string>
>;

export function validateCalculateRequest(
  request: CalculateRequest,
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (
    !Number.isFinite(request.amount) ||
    request.amount < LIMITS.amount.min ||
    request.amount > LIMITS.amount.max
  ) {
    errors.amount = 'От 1 000 до 10 000 000 ₽';
  }

  if (
    !Number.isInteger(request.months) ||
    request.months < LIMITS.months.min ||
    request.months > LIMITS.months.max
  ) {
    errors.months = 'От 1 до 60 месяцев';
  }

  if (
    !Number.isFinite(request.rate) ||
    request.rate < LIMITS.rate.min ||
    request.rate > LIMITS.rate.max
  ) {
    errors.rate = 'От 1% до 20%';
  }

  return errors;
}
