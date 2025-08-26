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
  const { permissions, loading, user } = useRBAC();
  
  return {
    can: permissions?.can || (() => false),
    hasRole: permissions?.hasRole || (() => false),
    getRoles: permissions?.getRoles || (() => []),
    getPermissions: permissions?.getPermissions || (() => []),
    loading,
    isAuthenticated: !!user
  };
}