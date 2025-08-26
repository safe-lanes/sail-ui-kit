// Shared Services Library for SAIL Phase 2 Maritime ERP
// Export all shared services for use across TMSA modules

export { ApiService, sharedApiService } from "./ApiService";
export type { ApiResponse, PaginatedResponse, ApiRequestOptions } from "./ApiService";

export { RBACService, rbacService } from "./RBACService";
export type { UserPermissions, PermissionCheck } from "./RBACService";

export { PersonnelService, personnelService } from "./PersonnelService";
export type { PersonnelFilter, PersonnelSearchResult } from "./PersonnelService";

export { VesselService, vesselService } from "./VesselService";
export type { VesselFilter, VesselPerformance, FleetSummary } from "./VesselService";

// Import all service instances
import { sharedApiService } from "./ApiService";
import { rbacService } from "./RBACService"; 
import { personnelService } from "./PersonnelService";
import { vesselService } from "./VesselService";

// Service Registry for module integration
export const SHARED_SERVICES = {
  api: sharedApiService,
  rbac: rbacService,
  personnel: personnelService,
  vessel: vesselService
} as const;

// Service version
export const SHARED_SERVICES_VERSION = "1.0.0";

// Common error handling
export class ServiceError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;

  constructor(message: string, code: string = "UNKNOWN_ERROR", statusCode?: number) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

// Common data transformation utilities
export const DataTransformers = {
  /**
   * Transform API date strings to local date format
   */
  formatDate: (dateString: string, locale: string = "en-US"): string => {
    try {
      return new Date(dateString).toLocaleDateString(locale);
    } catch {
      return dateString;
    }
  },

  /**
   * Transform API datetime strings to local datetime format
   */
  formatDateTime: (dateTimeString: string, locale: string = "en-US"): string => {
    try {
      return new Date(dateTimeString).toLocaleString(locale);
    } catch {
      return dateTimeString;
    }
  },

  /**
   * Format numbers with appropriate locale formatting
   */
  formatNumber: (value: number, locale: string = "en-US", options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(locale, options).format(value);
  },

  /**
   * Format currency values
   */
  formatCurrency: (value: number, currency: string = "USD", locale: string = "en-US"): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency
    }).format(value);
  },

  /**
   * Calculate percentage
   */
  formatPercentage: (value: number, decimals: number = 1): string => {
    return `${(value * 100).toFixed(decimals)}%`;
  },

  /**
   * Format vessel deadweight/tonnage
   */
  formatTonnage: (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M MT`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K MT`;
    }
    return `${value} MT`;
  }
};

// Common validation utilities
export const Validators = {
  /**
   * Validate IMO number format (7 digits)
   */
  isValidIMO: (imo: string): boolean => {
    return /^\d{7}$/.test(imo);
  },

  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Validate phone number (international format)
   */
  isValidPhone: (phone: string): boolean => {
    return /^[\+]?[\d\s\-\(\)]{7,15}$/.test(phone);
  },

  /**
   * Validate crew member ID format (YYYY-MM-DD or custom format)
   */
  isValidCrewMemberID: (id: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}(-\d+)?$/.test(id);
  }
};

// Module integration helpers
export const ModuleIntegration = {
  /**
   * Check if a module is available
   */
  isModuleAvailable: async (moduleCode: string): Promise<boolean> => {
    try {
      const modules = await SHARED_SERVICES.api.get<Array<{ code: string; isActive: boolean }>>("/modules");
      return modules.some((module: { code: string; isActive: boolean }) => module.code === moduleCode && module.isActive);
    } catch {
      return false;
    }
  },

  /**
   * Get module configuration
   */
  getModuleConfig: async (moduleCode: string): Promise<any> => {
    return SHARED_SERVICES.api.get(`/modules/${moduleCode}/config`);
  },

  /**
   * Send data to another module
   */
  sendToModule: async (targetModule: string, endpoint: string, data: any): Promise<any> => {
    return SHARED_SERVICES.api.post(`/modules/${targetModule}${endpoint}`, data);
  }
};