import { useState, useEffect, useCallback } from 'react';
import { SHARED_SERVICES } from '../services';
import type { ApiRequestOptions } from '../types/services';

/**
 * Hook for API requests with loading states
 */
export function useApi<T = any>(
  endpoint: string,
  options?: ApiRequestOptions & { immediate?: boolean }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (customOptions?: ApiRequestOptions) => {
    setLoading(true);
    setError(null);

    try {
      const result = await SHARED_SERVICES.api.get<T>(endpoint, {
        ...options,
        ...customOptions
      });
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  useEffect(() => {
    if (options?.immediate !== false) {
      execute();
    }
  }, [execute, options?.immediate]);

  const post = useCallback(async (data: any, customOptions?: ApiRequestOptions) => {
    setLoading(true);
    setError(null);

    try {
      const result = await SHARED_SERVICES.api.post<T>(endpoint, data, {
        ...options,
        ...customOptions
      });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  const put = useCallback(async (data: any, customOptions?: ApiRequestOptions) => {
    setLoading(true);
    setError(null);

    try {
      const result = await SHARED_SERVICES.api.put<T>(endpoint, data, {
        ...options,
        ...customOptions
      });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  const del = useCallback(async (customOptions?: ApiRequestOptions) => {
    setLoading(true);
    setError(null);

    try {
      const result = await SHARED_SERVICES.api.delete<T>(endpoint, {
        ...options,
        ...customOptions
      });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  return {
    data,
    loading,
    error,
    execute,
    post,
    put,
    delete: del,
    refetch: execute
  };
}