// Shared API Service for common operations across modules
import { apiRequest } from "@/lib/queryClient";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

/**
 * Shared API Service for standardized HTTP operations
 * Used across all TMSA modules for consistent data access
 */
export class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = "/api", defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...options?.headers },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Generic POST request using apiRequest for consistency
   */
  async post<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    return apiRequest("POST", endpoint, data) as Promise<T>;
  }

  /**
   * Generic PUT request using apiRequest for consistency
   */
  async put<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    return apiRequest("PUT", endpoint, data) as Promise<T>;
  }

  /**
   * Generic PATCH request using apiRequest for consistency
   */
  async patch<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    return apiRequest("PATCH", endpoint, data) as Promise<T>;
  }

  /**
   * Generic DELETE request using apiRequest for consistency
   */
  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return apiRequest("DELETE", endpoint) as Promise<T>;
  }

  /**
   * Paginated GET request
   */
  async getPaginated<T>(
    endpoint: string, 
    page: number = 1, 
    limit: number = 10,
    options?: ApiRequestOptions
  ): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...options?.params
    });
    
    return this.get<PaginatedResponse<T>>(`${endpoint}?${params}`);
  }

  /**
   * Upload file
   */
  async uploadFile(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type - let browser set it with boundary
      headers: { ...this.defaultHeaders, 'Content-Type': undefined } as any
    });

    if (!response.ok) {
      throw new Error(`Upload Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Download file
   */
  async downloadFile(endpoint: string, filename?: string): Promise<Blob> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.defaultHeaders,
    });

    if (!response.ok) {
      throw new Error(`Download Error: ${response.status} ${response.statusText}`);
    }

    return response.blob();
  }

  /**
   * Batch operations
   */
  async batch<T>(operations: Array<{
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    endpoint: string;
    data?: any;
  }>): Promise<T[]> {
    const promises = operations.map(op => {
      switch (op.method) {
        case 'GET':
          return this.get(op.endpoint);
        case 'POST':
          return this.post(op.endpoint, op.data);
        case 'PUT':
          return this.put(op.endpoint, op.data);
        case 'PATCH':
          return this.patch(op.endpoint, op.data);
        case 'DELETE':
          return this.delete(op.endpoint);
        default:
          throw new Error(`Unsupported method: ${op.method}`);
      }
    });

    return Promise.all(promises) as Promise<T[]>;
  }
}

// Singleton instance for shared usage
export const sharedApiService = new ApiService();