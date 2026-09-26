import { useState } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { CalculationResult } from './components/CalculationResult';
import { ApiRequestError, calculateDeposit } from './services/calculatorApi';
import type { CalculateRequest, CalculateResponse } from './types/calculator';
import './styles.css';

function App() {
  const [result, setResult] = useState<CalculateResponse | null>(null);
  const [lastRequest, setLastRequest] = useState<CalculateRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async (request: CalculateRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const calculation = await calculateDeposit(request);
      setResult(calculation);
      setLastRequest(request);
    } catch (requestError) {
      setError(
        requestError instanceof ApiRequestError
          ? requestError.message
          : 'Не удалось выполнить расчёт',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="background-glow background-glow-left" />
      <div className="background-glow background-glow-right" />

      <section className="calculator-card">
        <header className="header">
          <div className="brand-mark" aria-hidden="true">
            ₽
          </div>
          <div>
            <p className="eyebrow">FINANCE TOOLS</p>
            <h1>Калькулятор вклада</h1>
          </div>
        </header>

        <p className="description">
          Рассчитайте итоговую сумму и доход по вкладу с ежемесячной
          капитализацией процентов.
        </p>

        <CalculatorForm isLoading={isLoading} onSubmit={handleCalculate} />

        {error && (
          <div className="error-message" role="alert">
            <span aria-hidden="true">!</span>
            <p>{error}</p>
          </div>
        )}

        {result && lastRequest && (
          <CalculationResult request={lastRequest} result={result} />
        )}

        <p className="disclaimer">
          Расчёт является справочным и выполнен по указанным параметрам.
        </p>
      </section>
    </main>
  );
}

export default App;
