import { useRBAC } from './useRBAC';
import type { UserPermissions } from '../types/rbac';

/**
 * Hook to access user permissions
 * Provides permission checking functions
 */
export function usePermissions(): UserPermissions & {
  loading: boolean;
  isAuthenticated: boolean;
} {
  const { user, loading, hasPermission, hasRole } = useRBAC();
  
  return {
    can: hasPermission || (() => false),
    hasRole: hasRole || (() => false),
    getRoles: () => user?.roles || [],
    getPermissions: () => [],
    loading,
    isAuthenticated: !!user
  };
}