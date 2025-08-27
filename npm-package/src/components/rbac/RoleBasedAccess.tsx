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
    ? roleArray.every(role => userRoles.includes(role))
    : roleArray.some(role => userRoles.includes(role));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}