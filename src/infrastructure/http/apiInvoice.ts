const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ApiResponse<T> {
  statusCode: number;
  status: 'success' | 'error';
  message: string;
  data?: T;
}

export const httpClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${BASE_URL}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || result.status === 'error') {
    throw new Error(result.message || 'Ocurrio un error en la comunicacion con el servidor');
  }

  return result.data as T;
};