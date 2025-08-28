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
  children,
}: PermissionGuardProps) {
  const permissionArray = Array.isArray(permissions) ? permissions : [permissions];

  const hasAccess = requireAll
    ? permissionArray.every((permission: string) => userPermissions.indexOf(permission) !== -1)
    : permissionArray.some((permission: string) => userPermissions.indexOf(permission) !== -1);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
