// Service layer type definitions

// API Service Types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
}

// RBAC Service Types
export interface UserPermissions {
  can: (resource: string, action?: string) => boolean;
  hasRole: (roleName: string) => boolean;
  getRoles: () => string[];
  getPermissions: () => unknown[];
}

export interface PermissionCheck {
  resource: string;
  action?: string;
  conditions?: Record<string, unknown>;
}

// Personnel Service Types
export interface PersonnelFilter {
  rank?: string;
  vessel?: string;
  nationality?: string;
  status?: string;
  search?: string;
}

export interface PersonnelSearchResult {
  id: string;
  name: string;
  rank: string;
  vessel: string;
  status: string;
  avatar?: string;
}

// Vessel Service Types
export interface VesselFilter {
  vesselType?: string;
  status?: string;
  flag?: string;
  search?: string;
}

export interface VesselPerformance {
  vesselId: string;
  name: string;
  efficiency: number;
  safetyScore: number;
  complianceScore: number;
  lastUpdate: string;
}

export interface FleetSummary {
  totalVessels: number;
  activeVessels: number;
  averageEfficiency: number;
  averageSafetyScore: number;
  averageComplianceScore: number;
}

// Service Error Types
export interface ServiceError extends Error {
  code: string;
  statusCode?: number;
}
