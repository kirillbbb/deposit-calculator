import type { CalculateRequest, CalculateResponse } from '../types/calculator';
import { formatCurrency } from '../utils/format';

interface CalculationResultProps {
  request: CalculateRequest;
  result: CalculateResponse;
}

export function CalculationResult({
  request,
  result,
}: CalculationResultProps) {
  return (
    <section className="result" aria-live="polite">
      <div className="result-heading">
        <span className="result-label">Результат расчёта</span>
        <span className="result-rate">{request.rate}% годовых</span>
      </div>

      <div className="result-main">
        <span>Итоговая сумма</span>
        <strong>{formatCurrency(result.total)}</strong>
      </div>

      <div className="result-row">
        <span>Начальная сумма</span>
        <span>{formatCurrency(request.amount)}</span>
      </div>

      <div className="result-row result-profit">
        <span>Доход</span>
        <strong>+{formatCurrency(result.profit)}</strong>
      </div>
    </section>
  );
}
