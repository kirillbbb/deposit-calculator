import { describe, expect, it } from 'vitest';
import { validateCalculateRequest } from './validation';

describe('validateCalculateRequest', () => {
  it('accepts valid values', () => {
    expect(
      validateCalculateRequest({
        amount: 100000,
        months: 12,
        rate: 8.5,
      }),
    ).toEqual({});
  });

  it('rejects values outside backend limits', () => {
    expect(
      validateCalculateRequest({
        amount: 999,
        months: 61,
        rate: 21,
      }),
    ).toEqual({
      amount: 'От 1 000 до 10 000 000 ₽',
      months: 'От 1 до 60 месяцев',
      rate: 'От 1% до 20%',
    });
  });

  it('rejects non-finite and non-integer values', () => {
    expect(
      validateCalculateRequest({
        amount: Number.NaN,
        months: 1.5,
        rate: Number.POSITIVE_INFINITY,
      }),
    ).toEqual({
      amount: 'От 1 000 до 10 000 000 ₽',
      months: 'От 1 до 60 месяцев',
      rate: 'От 1% до 20%',
    });
  });
});
