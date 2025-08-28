// RBAC constants and default permissions

export const DEFAULT_PERMISSIONS = {
  // User Management
  USER_CREATE: { resource: 'users', action: 'create' },
  USER_READ: { resource: 'users', action: 'read' },
  USER_UPDATE: { resource: 'users', action: 'update' },
  USER_DELETE: { resource: 'users', action: 'delete' },

  // Role Management
  ROLE_CREATE: { resource: 'roles', action: 'create' },
  ROLE_READ: { resource: 'roles', action: 'read' },
  ROLE_UPDATE: { resource: 'roles', action: 'update' },
  ROLE_DELETE: { resource: 'roles', action: 'delete' },

  // Permission Management
  PERMISSION_CREATE: { resource: 'permissions', action: 'create' },
  PERMISSION_READ: { resource: 'permissions', action: 'read' },
  PERMISSION_UPDATE: { resource: 'permissions', action: 'update' },
  PERMISSION_DELETE: { resource: 'permissions', action: 'delete' },

  // Vessel Management
  VESSEL_CREATE: { resource: 'vessels', action: 'create' },
  VESSEL_READ: { resource: 'vessels', action: 'read' },
  VESSEL_UPDATE: { resource: 'vessels', action: 'update' },
  VESSEL_DELETE: { resource: 'vessels', action: 'delete' },

  // Personnel Management
  PERSONNEL_CREATE: { resource: 'personnel', action: 'create' },
  PERSONNEL_READ: { resource: 'personnel', action: 'read' },
  PERSONNEL_UPDATE: { resource: 'personnel', action: 'update' },
  PERSONNEL_DELETE: { resource: 'personnel', action: 'delete' },

  // TMSA Elements
  TMSA_EL1_ACCESS: { resource: 'tmsa-el1', action: 'access' },
  TMSA_EL2_ACCESS: { resource: 'tmsa-el2', action: 'access' },
  TMSA_EL3_ACCESS: { resource: 'tmsa-el3', action: 'access' },
  TMSA_EL4_ACCESS: { resource: 'tmsa-el4', action: 'access' },
  TMSA_EL5_ACCESS: { resource: 'tmsa-el5', action: 'access' },
  TMSA_EL6_ACCESS: { resource: 'tmsa-el6', action: 'access' },
  TMSA_EL7_ACCESS: { resource: 'tmsa-el7', action: 'access' },
  TMSA_EL8_ACCESS: { resource: 'tmsa-el8', action: 'access' },
  TMSA_EL9_ACCESS: { resource: 'tmsa-el9', action: 'access' },
  TMSA_EL10_ACCESS: { resource: 'tmsa-el10', action: 'access' },
  TMSA_EL11_ACCESS: { resource: 'tmsa-el11', action: 'access' },
  TMSA_EL12_ACCESS: { resource: 'tmsa-el12', action: 'access' },
  TMSA_EL13_ACCESS: { resource: 'tmsa-el13', action: 'access' },

  // Reports and Analytics
  REPORTS_VIEW: { resource: 'reports', action: 'view' },
  ANALYTICS_VIEW: { resource: 'analytics', action: 'view' },

  // System Administration
  SYSTEM_CONFIG: { resource: 'system', action: 'configure' },
  SYSTEM_BACKUP: { resource: 'system', action: 'backup' },
  SYSTEM_AUDIT: { resource: 'system', action: 'audit' },
} as const;

export const DEFAULT_ROLES = {
  SUPER_ADMIN: {
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    permissions: Object.values(DEFAULT_PERMISSIONS),
  },

  FLEET_MANAGER: {
    name: 'Fleet Manager',
    description: 'Manages vessels and fleet operations',
    permissions: [
      DEFAULT_PERMISSIONS.VESSEL_READ,
      DEFAULT_PERMISSIONS.VESSEL_UPDATE,
      DEFAULT_PERMISSIONS.PERSONNEL_READ,
      DEFAULT_PERMISSIONS.PERSONNEL_UPDATE,
      DEFAULT_PERMISSIONS.REPORTS_VIEW,
      DEFAULT_PERMISSIONS.ANALYTICS_VIEW,
      ...Object.values(DEFAULT_PERMISSIONS).filter(p => p.resource.startsWith('tmsa-')),
    ],
  },

  CREWING_MANAGER: {
    name: 'Crewing Manager',
    description: 'Manages crew members and assignments',
    permissions: [
      DEFAULT_PERMISSIONS.PERSONNEL_CREATE,
      DEFAULT_PERMISSIONS.PERSONNEL_READ,
      DEFAULT_PERMISSIONS.PERSONNEL_UPDATE,
      DEFAULT_PERMISSIONS.VESSEL_READ,
      DEFAULT_PERMISSIONS.TMSA_EL3_ACCESS,
      DEFAULT_PERMISSIONS.REPORTS_VIEW,
    ],
  },

  TECHNICAL_MANAGER: {
    name: 'Technical Manager',
    description: 'Manages technical operations and maintenance',
    permissions: [
      DEFAULT_PERMISSIONS.VESSEL_READ,
      DEFAULT_PERMISSIONS.VESSEL_UPDATE,
      DEFAULT_PERMISSIONS.TMSA_EL4_ACCESS,
      DEFAULT_PERMISSIONS.REPORTS_VIEW,
      DEFAULT_PERMISSIONS.ANALYTICS_VIEW,
    ],
  },

  SAFETY_OFFICER: {
    name: 'Safety Officer',
    description: 'Manages safety compliance and incidents',
    permissions: [
      DEFAULT_PERMISSIONS.VESSEL_READ,
      DEFAULT_PERMISSIONS.PERSONNEL_READ,
      DEFAULT_PERMISSIONS.TMSA_EL8_ACCESS,
      DEFAULT_PERMISSIONS.TMSA_EL9_ACCESS,
      DEFAULT_PERMISSIONS.REPORTS_VIEW,
    ],
  },

  MARITIME_OFFICER: {
    name: 'Maritime Officer',
    description: 'General maritime operations access',
    permissions: [
      DEFAULT_PERMISSIONS.VESSEL_READ,
      DEFAULT_PERMISSIONS.PERSONNEL_READ,
      DEFAULT_PERMISSIONS.REPORTS_VIEW,
    ],
  },
} as const;

export const PERMISSION_CATEGORIES = {
  USER_MANAGEMENT: 'User Management',
  VESSEL_OPERATIONS: 'Vessel Operations',
  PERSONNEL_MANAGEMENT: 'Personnel Management',
  TMSA_COMPLIANCE: 'TMSA Compliance',
  REPORTING: 'Reporting & Analytics',
  SYSTEM_ADMIN: 'System Administration',
} as const;
