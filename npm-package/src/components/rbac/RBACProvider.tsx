import React, { createContext, useContext } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface RBACContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPermission: (permission: string | string[]) => boolean;
  hasRole: (role: string | string[]) => boolean;
  login: (credentials: Record<string, unknown>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

interface RBACProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
  onLogin?: (credentials: Record<string, unknown>) => Promise<User>;
  onLogout?: () => void;
  
  // Enhanced authentication props
  tokenStorageKey?: string;
  sessionTimeoutMs?: number;
  onSessionTimeout?: () => void;
  onAuthError?: (error: Error) => void;
  
  // Permission management
  permissionCacheKey?: string;
  refreshPermissions?: () => Promise<string[]>;
  onPermissionDenied?: (permission: string) => void;
  
  // Role management
  roleHierarchy?: Record<string, string[]>;
  allowRoleInheritance?: boolean;
  
  // Security features
  autoLogoutOnInactivity?: boolean;
  inactivityTimeoutMs?: number;
  enforcePasswordPolicy?: boolean;
  requireMFA?: boolean;
  
  // Debugging and monitoring
  enableAuditLog?: boolean;
  onUserAction?: (action: string, details?: Record<string, unknown>) => void;
}

export function RBACProvider({
  children,
  initialUser = null,
  onLogin,
  onLogout,
}: RBACProviderProps) {
  const [user, setUser] = React.useState<User | null>(initialUser);
  const [loading, setLoading] = React.useState(false);

  const isAuthenticated = !!user;

  const hasPermission = React.useCallback(
    (permission: string | string[]): boolean => {
      if (!user) return false;

      const permissions = Array.isArray(permission) ? permission : [permission];
      return permissions.some((p: string) => user.permissions.indexOf(p) !== -1);
    },
    [user]
  );

  const hasRole = React.useCallback(
    (role: string | string[]): boolean => {
      if (!user) return false;

      const roles = Array.isArray(role) ? role : [role];
      return roles.some((r: string) => user.roles.indexOf(r) !== -1);
    },
    [user]
  );

  const login = async (credentials: Record<string, unknown>) => {
    setLoading(true);
    try {
      if (onLogin) {
        const userData = await onLogin(credentials);
        setUser(userData);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (onLogout) {
      onLogout();
    }
  };

  const value: RBACContextType = {
    user,
    isAuthenticated,
    hasPermission,
    hasRole,
    login,
    logout,
    loading,
  };

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
}

export function useRBAC(): RBACContextType {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
}
