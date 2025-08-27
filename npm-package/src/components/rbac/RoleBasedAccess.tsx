import React from 'react';

interface RoleBasedAccessProps {
  roles: string | string[];
  requireAll?: boolean;
  userRoles: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleBasedAccess({ 
  roles, 
  requireAll = false, 
  userRoles, 
  fallback = null,
  children 
}: RoleBasedAccessProps) {
  const roleArray = Array.isArray(roles) ? roles : [roles];
  
  const hasAccess = requireAll
    ? roleArray.every((role: string) => userRoles.indexOf(role) !== -1)
    : roleArray.some((role: string) => userRoles.indexOf(role) !== -1);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}