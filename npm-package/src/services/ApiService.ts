import type { PaginatedResponse, ApiRequestOptions } from '../types/services';

/**
 * API Service for making HTTP requests
 * Handles authentication, error handling, and response formatting
 */
export class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authentication token
   */
  clearAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options?.headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Make a PUT request
   */
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...this.defaultHeaders,
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = unknown>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders,
        ...options?.headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  /**
   * Get paginated data
   */
  async getPaginated<T = unknown>(
    endpoint: string,
    page: number = 1,
    limit: number = 10,
    options?: ApiRequestOptions
  ): Promise<PaginatedResponse<T>> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      ...options?.params,
    };

    return this.get<PaginatedResponse<T>>(endpoint, { ...options, params });
  }
}
