import { useState } from 'react';
import type { CalculateRequest } from '../types/calculator';
import {
  LIMITS,
  validateCalculateRequest,
  type ValidationErrors,
} from '../utils/validation';

interface CalculatorFormProps {
  isLoading: boolean;
  onSubmit: (request: CalculateRequest) => void;
}

interface FormValues {
  amount: string;
  months: string;
  rate: string;
}

const initialValues: FormValues = {
  amount: '100000',
  months: '12',
  rate: '8.5',
};

export function CalculatorForm({
  isLoading,
  onSubmit,
}: CalculatorFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request: CalculateRequest = {
      amount: Number(values.amount),
      months: Number(values.months),
      rate: Number(values.rate),
    };

    const validationErrors = validateCalculateRequest(request);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(request);
  };

  return (
    <form className="calculator-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="amount">Сумма вклада</label>
        <div className="input-wrap">
          <input
            id="amount"
            type="number"
            min={LIMITS.amount.min}
            max={LIMITS.amount.max}
            step="1"
            value={values.amount}
            onChange={(event) => updateValue('amount', event.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby="amount-hint amount-error"
          />
          <span>₽</span>
        </div>
        <span id="amount-hint" className="field-hint">
          От 1 000 до 10 000 000 ₽
        </span>
        {errors.amount && (
          <span id="amount-error" className="field-error">
            {errors.amount}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="months">Срок</label>
        <div className="input-wrap">
          <input
            id="months"
            type="number"
            min={LIMITS.months.min}
            max={LIMITS.months.max}
            step="1"
            value={values.months}
            onChange={(event) => updateValue('months', event.target.value)}
            aria-invalid={Boolean(errors.months)}
            aria-describedby="months-hint months-error"
          />
          <span>мес.</span>
        </div>
        <span id="months-hint" className="field-hint">
          От 1 до 60 месяцев
        </span>
        {errors.months && (
          <span id="months-error" className="field-error">
            {errors.months}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="rate">Годовая ставка</label>
        <div className="input-wrap">
          <input
            id="rate"
            type="number"
            min={LIMITS.rate.min}
            max={LIMITS.rate.max}
            step="0.1"
            value={values.rate}
            onChange={(event) => updateValue('rate', event.target.value)}
            aria-invalid={Boolean(errors.rate)}
            aria-describedby="rate-hint rate-error"
          />
          <span>%</span>
        </div>
        <span id="rate-hint" className="field-hint">
          От 1% до 20%
        </span>
        {errors.rate && (
          <span id="rate-error" className="field-error">
            {errors.rate}
          </span>
        )}
      </div>

      <button className="submit-button" type="submit" disabled={isLoading}>
        {isLoading ? 'Рассчитываем...' : 'Рассчитать доход'}
      </button>
    </form>
  );
}
