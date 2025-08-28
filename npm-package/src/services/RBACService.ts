import type { ApiService } from './ApiService';
import type { UserPermissions, PermissionCheck } from '../types/services';
import type { User, Role, Permission } from '../types/rbac';

/**
 * RBAC Service for role-based access control
 * Handles user authentication, role management, and permission checking
 */
export class RBACService {
  private apiService: ApiService;
  private currentUser: User | null = null;
  private userPermissions: UserPermissions | null = null;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /**
   * Login user
   */
  async login(
    username: string,
    password: string
  ): Promise<{ success: boolean; token?: string; user?: User }> {
    try {
      const response = await this.apiService.post<{
        success: boolean;
        token?: string;
        user?: User;
      }>('/auth/login', { username, password });

      if (response.success && response.token && response.user) {
        this.apiService.setAuthToken(response.token);
        this.currentUser = response.user;
        this.userPermissions = this.buildUserPermissions(response.user);

        // Store in localStorage
        localStorage.setItem('sail_auth_token', response.token);
        localStorage.setItem('sail_current_user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      return { success: false };
    }
  }

  /**
   * Logout user
   */
  logout() {
    this.apiService.clearAuthToken();
    this.currentUser = null;
    this.userPermissions = null;

    localStorage.removeItem('sail_auth_token');
    localStorage.removeItem('sail_current_user');
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Get user permissions
   */
  getUserPermissions(): UserPermissions | null {
    return this.userPermissions;
  }

  /**
   * Check if user has permission
   */
  hasPermission(resource: string, action?: string): boolean {
    if (!this.userPermissions) return false;
    return this.userPermissions.can(resource, action);
  }

  /**
   * Check if user has role
   */
  hasRole(roleName: string): boolean {
    if (!this.userPermissions) return false;
    return this.userPermissions.hasRole(roleName);
  }

  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    return this.apiService.get<User[]>('/rbac/users');
  }

  /**
   * Create user
   */
  async createUser(userData: Partial<User>): Promise<User> {
    return this.apiService.post<User>('/rbac/users', userData);
  }

  /**
   * Update user
   */
  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return this.apiService.put<User>(`/rbac/users/${userId}`, userData);
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    return this.apiService.delete(`/rbac/users/${userId}`);
  }

  /**
   * Get all roles
   */
  async getRoles(): Promise<Role[]> {
    return this.apiService.get<Role[]>('/rbac/roles');
  }

  /**
   * Create role
   */
  async createRole(roleData: Partial<Role>): Promise<Role> {
    return this.apiService.post<Role>('/rbac/roles', roleData);
  }

  /**
   * Update role
   */
  async updateRole(roleId: string, roleData: Partial<Role>): Promise<Role> {
    return this.apiService.put<Role>(`/rbac/roles/${roleId}`, roleData);
  }

  /**
   * Delete role
   */
  async deleteRole(roleId: string): Promise<void> {
    return this.apiService.delete(`/rbac/roles/${roleId}`);
  }

  /**
   * Get all permissions
   */
  async getPermissions(): Promise<Permission[]> {
    return this.apiService.get<Permission[]>('/rbac/permissions');
  }

  /**
   * Assign role to user
   */
  async assignRoleToUser(userId: string, roleId: string): Promise<void> {
    return this.apiService.post(`/rbac/users/${userId}/roles`, { roleId });
  }

  /**
   * Remove role from user
   */
  async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    return this.apiService.delete(`/rbac/users/${userId}/roles/${roleId}`);
  }

  /**
   * Build user permissions from user object
   */
  private buildUserPermissions(user: User): UserPermissions {
    const allPermissions = user.roles.reduce((acc: Permission[], role) => {
      return [...acc, ...role.permissions];
    }, []);

    const roleNames = user.roles.map(role => role.name);

    return {
      can: (resource: string, action?: string) => {
        return allPermissions.some(permission => {
          const resourceMatch = permission.resource === resource || permission.resource === '*';
          const actionMatch = !action || permission.action === action || permission.action === '*';
          return resourceMatch && actionMatch;
        });
      },
      hasRole: (roleName: string) => {
        return roleNames.includes(roleName);
      },
      getRoles: () => roleNames,
      getPermissions: () => allPermissions,
    };
  }

  /**
   * Initialize from stored token
   */
  async initializeFromStorage(): Promise<boolean> {
    const token = localStorage.getItem('sail_auth_token');
    const userStr = localStorage.getItem('sail_current_user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        this.apiService.setAuthToken(token);
        this.currentUser = user;
        this.userPermissions = this.buildUserPermissions(user);
        return true;
      } catch {
        this.logout();
        return false;
      }
    }

    return false;
  }
}
