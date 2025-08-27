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
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

interface RBACProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
  onLogin?: (credentials: any) => Promise<User>;
  onLogout?: () => void;
}

export function RBACProvider({ 
  children, 
  initialUser = null,
  onLogin,
  onLogout 
}: RBACProviderProps) {
  const [user, setUser] = React.useState<User | null>(initialUser);
  const [loading, setLoading] = React.useState(false);

  const isAuthenticated = !!user;

  const hasPermission = React.useCallback((permission: string | string[]): boolean => {
    if (!user) return false;
    
    const permissions = Array.isArray(permission) ? permission : [permission];
    return permissions.some(p => user.permissions.includes(p));
  }, [user]);

  const hasRole = React.useCallback((role: string | string[]): boolean => {
    if (!user) return false;
    
    const roles = Array.isArray(role) ? role : [role];
    return roles.some(r => user.roles.includes(r));
  }, [user]);

  const login = async (credentials: any) => {
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
    loading
  };

  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC(): RBACContextType {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
}