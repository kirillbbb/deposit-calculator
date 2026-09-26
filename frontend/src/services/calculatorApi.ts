import type {
  ApiError,
  CalculateRequest,
  CalculateResponse,
} from '../types/calculator';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export async function calculateDeposit(
  payload: CalculateRequest,
): Promise<CalculateResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiRequestError('Не удалось подключиться к серверу');
  }

  let data: CalculateResponse | ApiError | null = null;

  try {
    data = await response.json();
  } catch {
    if (!response.ok) {
      throw new ApiRequestError('Сервер вернул некорректный ответ');
    }
  }

  if (!response.ok) {
    const error = data as ApiError | null;
    throw new ApiRequestError(
      error?.message || 'Не удалось выполнить расчёт',
      error?.errors,
    );
  }

  return data as CalculateResponse;
}
