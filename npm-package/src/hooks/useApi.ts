import { useState, useEffect, useCallback } from 'react';
import type { ApiRequestOptions } from '../types/services';

/**
 * Hook for API requests with loading states
 * Note: Service implementation is commented out until SHARED_SERVICES is available
 */
export function useApi<T = unknown>(
  endpoint: string,
  options?: ApiRequestOptions & { immediate?: boolean }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        // const result = await SHARED_SERVICES.api.get<T>(endpoint, {
        //   ...options,
        //   ...customOptions
        // });
        const result = {} as T; // Placeholder until service implementation
        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  useEffect(() => {
    if (options?.immediate !== false) {
      execute();
    }
  }, [execute, options?.immediate]);

  const post = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        // const result = await SHARED_SERVICES.api.post<T>(endpoint, data, {
        //   ...options,
        //   ...customOptions
        // });
        const result = {} as T; // Placeholder until service implementation
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  const put = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        // const result = await SHARED_SERVICES.api.put<T>(endpoint, data, {
        //   ...options,
        //   ...customOptions
        // });
        const result = {} as T; // Placeholder until service implementation
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  const del = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        // const result = await SHARED_SERVICES.api.delete<T>(endpoint, {
        //   ...options,
        //   ...customOptions
        // });
        const result = {} as T; // Placeholder until service implementation
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, options]
  );

  return {
    data,
    loading,
    error,
    execute,
    post,
    put,
    delete: del,
    refetch: execute,
  };
}
