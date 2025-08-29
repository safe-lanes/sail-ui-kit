// Shared Services Library for SAIL Phase 2 Maritime ERP
// Export all shared services for use across TMSA modules

export { ApiService } from './ApiService';
export type { ApiResponse, PaginatedResponse, ApiRequestOptions } from '../types/services';

export { RBACService } from './RBACService';
// Note: Skip UserPermissions, PermissionCheck types to avoid conflicts with RBAC components
// export type { UserPermissions, PermissionCheck } from '../types/services';

export { PersonnelService } from './PersonnelService';
export type { PersonnelFilter, PersonnelSearchResult } from '../types/services';

export { VesselService } from './VesselService';
export type { VesselFilter, VesselPerformance, FleetSummary } from '../types/services';

// Service instances (mentioned in README)
// Note: Commented out to avoid class instantiation errors during build
// These can be instantiated by consuming applications as needed
// const apiService = new ApiService();
// const rbacService = new RBACService(apiService);
// const personnelService = new PersonnelService(apiService);
// const vesselService = new VesselService(apiService);

// Service Registry for module integration (mentioned in README)
// Note: Commented out to avoid instantiation errors - applications should create their own instances
// export const SHARED_SERVICES = {
//   api: apiService,
//   rbac: rbacService,
//   personnel: personnelService,
//   vessel: vesselService
// } as const;

// Import service classes for factory function
import { ApiService } from './ApiService';
import { RBACService } from './RBACService';
import { PersonnelService } from './PersonnelService';
import { VesselService } from './VesselService';

// Export service factory functions instead
export const createSharedServices = () => {
  const apiService = new ApiService();
  const rbacService = new RBACService(apiService);
  const personnelService = new PersonnelService(apiService);
  const vesselService = new VesselService(apiService);

  return {
    api: apiService,
    rbac: rbacService,
    personnel: personnelService,
    vessel: vesselService,
  } as const;
};

// Export a simple SHARED_SERVICES constant for backward compatibility (mentioned in README)
export const SHARED_SERVICES = {
  // Note: Applications should use createSharedServices() to get actual instances
  // These are placeholders for type compatibility
  api: {} as ApiService,
  rbac: {} as RBACService,
  personnel: {} as PersonnelService,
  vessel: {} as VesselService,
} as const;

// Service version
export const SHARED_SERVICES_VERSION = '1.0.0';

// Common error handling
export class ServiceError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', statusCode?: number) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

// Common data transformation utilities
export const DataTransformers = {
  formatDate: (dateString: string, locale: string = 'en-US'): string => {
    try {
      return new Date(dateString).toLocaleDateString(locale);
    } catch {
      return dateString;
    }
  },

  formatDateTime: (dateTimeString: string, locale: string = 'en-US'): string => {
    try {
      return new Date(dateTimeString).toLocaleString(locale);
    } catch {
      return dateTimeString;
    }
  },

  formatNumber: (
    value: number,
    locale: string = 'en-US',
    options?: Intl.NumberFormatOptions
  ): string => {
    return new Intl.NumberFormat(locale, options).format(value);
  },

  formatCurrency: (value: number, currency: string = 'USD', locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  },

  formatPercentage: (value: number, decimals: number = 1): string => {
    return `${(value * 100).toFixed(decimals)}%`;
  },

  formatTonnage: (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M MT`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K MT`;
    }
    return `${value} MT`;
  },
};

// Common validation utilities
export const Validators = {
  isValidIMO: (imo: string): boolean => {
    return /^\d{7}$/.test(imo);
  },

  isValidEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone: (phone: string): boolean => {
    return /^[+]?[\d\s\-()]{7,15}$/.test(phone);
  },

  isValidCrewMemberID: (id: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}(-\d+)?$/.test(id);
  },
};

// Module integration helpers
export const ModuleIntegration = {
  isModuleAvailable: async (): Promise<boolean> => {
    // const modules = await SHARED_SERVICES.api.get<Array<{ code: string; isActive: boolean }>>("/modules");
    // return modules.some((module: { code: string; isActive: boolean }) => module.code === moduleCode && module.isActive);
    return false; // Placeholder until services are implemented
  },

  getModuleConfig: async (): Promise<Record<string, unknown>> => {
    // return SHARED_SERVICES.api.get(`/modules/${moduleCode}/config`);
    return {}; // Placeholder until services are implemented
  },

  sendToModule: async (): Promise<Record<string, unknown>> => {
    // return SHARED_SERVICES.api.post(`/modules/${targetModule}${endpoint}`, data);
    return {}; // Placeholder until services are implemented
  },
};
