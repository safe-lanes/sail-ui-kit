import React from 'react';
import { PermissionGuard } from './PermissionGuard';

interface ProtectedRouteProps {
  permissions: string | string[];
  requireAll?: boolean;
  userPermissions: string[];
  unauthorizedComponent?: React.ReactNode;
  children: React.ReactNode;
}

export function ProtectedRoute({ 
  permissions, 
  requireAll = false, 
  userPermissions, 
  unauthorizedComponent,
  children 
}: ProtectedRouteProps) {
  const defaultUnauthorized = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    </div>
  );

  return (
    <PermissionGuard
      permissions={permissions}
      requireAll={requireAll}
      userPermissions={userPermissions}
      fallback={unauthorizedComponent || defaultUnauthorized}
    >
      {children}
    </PermissionGuard>
  );
}