import React from 'react';

interface PermissionGuardProps {
  permissions: string | string[];
  requireAll?: boolean;
  userPermissions: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ 
  permissions, 
  requireAll = false, 
  userPermissions, 
  fallback = null,
  children 
}: PermissionGuardProps) {
  const permissionArray = Array.isArray(permissions) ? permissions : [permissions];
  
  const hasAccess = requireAll
    ? permissionArray.every(permission => userPermissions.includes(permission))
    : permissionArray.some(permission => userPermissions.includes(permission));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}