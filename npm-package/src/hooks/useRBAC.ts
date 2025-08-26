import { useContext } from 'react';
import { RBACContext } from '../components/rbac/RBACProvider';
import type { RBACContextType } from '../types/rbac';

/**
 * Hook to access RBAC context
 * Provides current user, permissions, and authentication methods
 */
export function useRBAC(): RBACContextType {
  const context = useContext(RBACContext);
  
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  
  return context;
}