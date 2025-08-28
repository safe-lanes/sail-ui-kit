import React from 'react';

// Permission Definition
export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
}

// Role Definition
export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isActive: boolean;
}

// User Definition (extends layout User)
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  roles: Role[];
  isActive: boolean;
  avatar?: string;
}

// Permission Check Function
export type PermissionCheck = (resource: string, action?: string) => boolean;

// User Permissions Interface
export interface UserPermissions {
  can: PermissionCheck;
  hasRole: (roleName: string) => boolean;
  getRoles: () => string[];
  getPermissions: () => Permission[];
}

// RBAC Context Type
export interface RBACContextType {
  user: User | null;
  permissions: UserPermissions | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkPermission: PermissionCheck;
  hasRole: (roleName: string) => boolean;
}

// Component Props
export interface RBACProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export interface PermissionGuardProps {
  children: React.ReactNode;
  resource: string;
  action?: string;
  fallback?: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
}

export interface RoleBasedAccessProps {
  children: React.ReactNode;
  roles: string[];
  fallback?: React.ReactNode;
}

// RBAC Management Props
export interface UserManagementProps {
  onUserCreate?: (user: Partial<User>) => void;
  onUserUpdate?: (id: string, user: Partial<User>) => void;
  onUserDelete?: (id: string) => void;
}

export interface RoleEditorProps {
  role?: Role;
  onSave?: (role: Role) => void;
  onCancel?: () => void;
}

export interface PermissionMatrixProps {
  roles: Role[];
  permissions: Permission[];
  onPermissionToggle?: (roleId: string, permissionId: string, granted: boolean) => void;
}
