// RBAC Components - Role-Based Access Control
// Authentication and authorization components

// RBAC Management Components
export { UserManagement } from './UserManagement';
export { RoleEditor } from './RoleEditor';
export { PermissionMatrix } from './PermissionMatrix';
export { RBACDashboard } from './RBACDashboard';

// Permission Components
export { PermissionGuard } from './PermissionGuard';
export { ProtectedRoute } from './ProtectedRoute';
export { RoleBasedAccess } from './RoleBasedAccess';

// User Assignment Components
export { UserRoleAssignment } from './UserRoleAssignment';
export { PermissionForm } from './PermissionForm';
export { RoleForm } from './RoleForm';

// RBAC Provider
export { RBACProvider, useRBAC } from './RBACProvider';

// Types
export type {
  Permission,
  Role,
  User,
  RBACContextType,
  PermissionCheck,
  UserPermissions,
} from '../../types/rbac';
