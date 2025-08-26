// Role-Based Access Control Service
import { sharedApiService } from "./ApiService";
import type { 
  Role, 
  Permission, 
  UserRole, 
  Module,
  InsertRole,
  InsertPermission,
  InsertUserRole
} from "@shared/schema";

export interface UserPermissions {
  userId: number;
  roles: Role[];
  permissions: Permission[];
  modules: Module[];
}

export interface PermissionCheck {
  hasPermission: boolean;
  reason?: string;
}

/**
 * RBAC Service for managing roles, permissions, and access control
 * Centralized service used across all TMSA modules
 */
export class RBACService {
  private userPermissionsCache = new Map<number, UserPermissions>();
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes
  private lastCacheUpdate = new Map<number, number>();

  /**
   * Get user's complete permissions
   */
  async getUserPermissions(userId: number, forceRefresh: boolean = false): Promise<UserPermissions> {
    const now = Date.now();
    const lastUpdate = this.lastCacheUpdate.get(userId) || 0;
    
    if (!forceRefresh && this.userPermissionsCache.has(userId) && (now - lastUpdate) < this.cacheExpiry) {
      return this.userPermissionsCache.get(userId)!;
    }

    try {
      const permissions = await sharedApiService.get<UserPermissions>(`/rbac/users/${userId}/permissions`);
      this.userPermissionsCache.set(userId, permissions);
      this.lastCacheUpdate.set(userId, now);
      return permissions;
    } catch (error) {
      console.error(`Failed to fetch permissions for user ${userId}:`, error);
      // Return empty permissions on error
      return {
        userId,
        roles: [],
        permissions: [],
        modules: []
      };
    }
  }

  /**
   * Check if user has specific permission
   */
  async hasPermission(
    userId: number, 
    resource: string, 
    action: string, 
    moduleId?: string
  ): Promise<PermissionCheck> {
    const userPermissions = await this.getUserPermissions(userId);
    
    // Check if user has the specific permission
    const hasDirectPermission = userPermissions.permissions.some(permission => {
      const moduleMatch = !moduleId || permission.moduleId?.toString() === moduleId;
      return permission.resource === resource && 
             permission.action === action && 
             permission.isActive &&
             moduleMatch;
    });

    if (hasDirectPermission) {
      return { hasPermission: true };
    }

    // Check for wildcard permissions
    const hasWildcardPermission = userPermissions.permissions.some(permission => {
      const moduleMatch = !moduleId || permission.moduleId?.toString() === moduleId;
      return (permission.resource === "*" || permission.action === "*") && 
             permission.isActive &&
             moduleMatch;
    });

    if (hasWildcardPermission) {
      return { hasPermission: true };
    }

    return { 
      hasPermission: false, 
      reason: `User lacks permission for ${action} on ${resource}` 
    };
  }

  /**
   * Check if user has role
   */
  async hasRole(userId: number, roleCode: string): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);
    return userPermissions.roles.some(role => role.code === roleCode && role.isActive);
  }

  /**
   * Check if user can access module
   */
  async canAccessModule(userId: number, moduleCode: string): Promise<PermissionCheck> {
    const userPermissions = await this.getUserPermissions(userId);
    
    // Check if user has any permissions for this module
    const modulePermissions = userPermissions.permissions.filter(permission => 
      userPermissions.modules.some(module => 
        module.id === permission.moduleId && 
        module.code === moduleCode &&
        module.isActive
      )
    );

    if (modulePermissions.length > 0) {
      return { hasPermission: true };
    }

    return { 
      hasPermission: false, 
      reason: `User lacks access to module ${moduleCode}` 
    };
  }

  /**
   * Get user's available modules
   */
  async getUserModules(userId: number): Promise<Module[]> {
    const userPermissions = await this.getUserPermissions(userId);
    return userPermissions.modules.filter(module => module.isActive);
  }

  /**
   * Clear user permissions cache
   */
  clearUserCache(userId: number): void {
    this.userPermissionsCache.delete(userId);
    this.lastCacheUpdate.delete(userId);
  }

  /**
   * Clear all caches
   */
  clearAllCaches(): void {
    this.userPermissionsCache.clear();
    this.lastCacheUpdate.clear();
  }

  // ==================== ADMIN OPERATIONS ====================

  /**
   * Get all roles (admin only)
   */
  async getRoles(): Promise<Role[]> {
    return sharedApiService.get<Role[]>("/rbac/roles");
  }

  /**
   * Create new role (admin only)
   */
  async createRole(role: InsertRole): Promise<Role> {
    const newRole = await sharedApiService.post<Role>("/rbac/roles", role);
    this.clearAllCaches(); // Clear cache as permissions may have changed
    return newRole;
  }

  /**
   * Update role (admin only)
   */
  async updateRole(roleId: number, role: Partial<InsertRole>): Promise<Role> {
    const updatedRole = await sharedApiService.put<Role>(`/rbac/roles/${roleId}`, role);
    this.clearAllCaches();
    return updatedRole;
  }

  /**
   * Delete role (admin only)
   */
  async deleteRole(roleId: number): Promise<boolean> {
    const result = await sharedApiService.delete<{ success: boolean }>(`/rbac/roles/${roleId}`);
    this.clearAllCaches();
    return result.success;
  }

  /**
   * Get all permissions (admin only)
   */
  async getPermissions(): Promise<Permission[]> {
    return sharedApiService.get<Permission[]>("/rbac/permissions");
  }

  /**
   * Create new permission (admin only)
   */
  async createPermission(permission: InsertPermission): Promise<Permission> {
    const newPermission = await sharedApiService.post<Permission>("/rbac/permissions", permission);
    this.clearAllCaches();
    return newPermission;
  }

  /**
   * Assign role to user (admin only)
   */
  async assignUserRole(userRole: InsertUserRole): Promise<UserRole> {
    const assignment = await sharedApiService.post<UserRole>("/rbac/user-roles", userRole);
    this.clearUserCache(userRole.userId);
    return assignment;
  }

  /**
   * Remove role from user (admin only)
   */
  async removeUserRole(userRoleId: number): Promise<boolean> {
    const result = await sharedApiService.delete<{ success: boolean; userId?: number }>(`/rbac/user-roles/${userRoleId}`);
    if (result.userId) {
      this.clearUserCache(result.userId);
    }
    return result.success;
  }

  /**
   * Get available modules
   */
  async getModules(): Promise<Module[]> {
    return sharedApiService.get<Module[]>("/rbac/modules");
  }
}

// Singleton instance
export const rbacService = new RBACService();