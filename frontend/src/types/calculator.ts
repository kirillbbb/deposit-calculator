export interface CalculateRequest {
  amount: number;
  months: number;
  rate: number;
}

export interface CalculateResponse {
  total: number;
  profit: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}
