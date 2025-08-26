// Shared Vessel Service for fleet management across modules
import { sharedApiService } from "./ApiService";
import type { 
  Vessel, 
  InsertVessel,
  Organization
} from "@shared/schema";

export interface VesselFilter {
  organizationId?: number;
  vesselType?: string;
  flag?: string;
  status?: "Active" | "Inactive" | "Sold";
  yearBuiltFrom?: number;
  yearBuiltTo?: number;
  deadweightFrom?: number;
  deadweightTo?: number;
}

export interface VesselPerformance {
  vesselId: number;
  vesselName: string;
  operationalDays: number;
  maintenanceDays: number;
  portDays: number;
  totalIncidents: number;
  safetyRating: number;
  complianceScore: number;
  fuelEfficiency: number;
  lastInspectionDate?: string;
  nextInspectionDue?: string;
}

export interface FleetSummary {
  totalVessels: number;
  activeVessels: number;
  inPort: number;
  underMaintenance: number;
  averageAge: number;
  totalDeadweight: number;
  byType: Record<string, number>;
  byFlag: Record<string, number>;
}

/**
 * Shared Vessel Service for fleet management
 * Used across Technical (Element 4), Navigation (Element 5), and other vessel-related modules
 */
export class VesselService {

  // ==================== VESSEL CRUD OPERATIONS ====================

  /**
   * Get all vessels with optional filtering
   */
  async getVessels(filter?: VesselFilter): Promise<Vessel[]> {
    const params = filter ? `?${new URLSearchParams(filter as any)}` : "";
    return sharedApiService.get<Vessel[]>(`/vessels${params}`);
  }

  /**
   * Get vessel by ID
   */
  async getVessel(id: number): Promise<Vessel | null> {
    try {
      return await sharedApiService.get<Vessel>(`/vessels/${id}`);
    } catch (error) {
      console.error(`Failed to fetch vessel ${id}:`, error);
      return null;
    }
  }

  /**
   * Get vessel by IMO number
   */
  async getVesselByIMO(imoNumber: string): Promise<Vessel | null> {
    try {
      return await sharedApiService.get<Vessel>(`/vessels/imo/${imoNumber}`);
    } catch (error) {
      console.error(`Failed to fetch vessel with IMO ${imoNumber}:`, error);
      return null;
    }
  }

  /**
   * Create new vessel
   */
  async createVessel(vessel: InsertVessel): Promise<Vessel> {
    return sharedApiService.post<Vessel>("/vessels", vessel);
  }

  /**
   * Update vessel
   */
  async updateVessel(id: number, updates: Partial<InsertVessel>): Promise<Vessel> {
    return sharedApiService.put<Vessel>(`/vessels/${id}`, updates);
  }

  /**
   * Delete vessel
   */
  async deleteVessel(id: number): Promise<boolean> {
    const result = await sharedApiService.delete<{ success: boolean }>(`/vessels/${id}`);
    return result.success;
  }

  // ==================== FLEET MANAGEMENT ====================

  /**
   * Get fleet summary statistics
   */
  async getFleetSummary(organizationId?: number): Promise<FleetSummary> {
    const params = organizationId ? `?organizationId=${organizationId}` : "";
    return sharedApiService.get<FleetSummary>(`/vessels/fleet/summary${params}`);
  }

  /**
   * Get vessels by organization
   */
  async getVesselsByOrganization(organizationId: number): Promise<Vessel[]> {
    return this.getVessels({ organizationId });
  }

  /**
   * Get vessels by type
   */
  async getVesselsByType(vesselType: string): Promise<Vessel[]> {
    return this.getVessels({ vesselType });
  }

  /**
   * Get active vessels
   */
  async getActiveVessels(): Promise<Vessel[]> {
    return this.getVessels({ status: "Active" });
  }

  // ==================== VESSEL PERFORMANCE ====================

  /**
   * Get vessel performance metrics
   */
  async getVesselPerformance(vesselId: number, startDate?: string, endDate?: string): Promise<VesselPerformance> {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    
    return sharedApiService.get<VesselPerformance>(`/vessels/${vesselId}/performance?${params}`);
  }

  /**
   * Get fleet performance overview
   */
  async getFleetPerformance(organizationId?: number): Promise<VesselPerformance[]> {
    const params = organizationId ? `?organizationId=${organizationId}` : "";
    return sharedApiService.get<VesselPerformance[]>(`/vessels/fleet/performance${params}`);
  }

  // ==================== MAINTENANCE AND INSPECTIONS ====================

  /**
   * Get vessel maintenance status
   */
  async getMaintenanceStatus(vesselId: number): Promise<{
    vesselId: number;
    vesselName: string;
    maintenanceSchedule: Array<{
      id: string;
      type: string;
      description: string;
      dueDate: string;
      status: "overdue" | "due_soon" | "scheduled" | "completed";
      priority: "critical" | "high" | "medium" | "low";
    }>;
    lastDrydock?: string;
    nextDrydockDue?: string;
  }> {
    return sharedApiService.get(`/vessels/${vesselId}/maintenance`);
  }

  /**
   * Get inspection history
   */
  async getInspectionHistory(vesselId: number): Promise<Array<{
    id: string;
    type: string;
    inspectionDate: string;
    inspector: string;
    authority: string;
    result: "passed" | "passed_with_deficiencies" | "failed";
    deficiencies: number;
    recommendations: number;
    nextInspectionDue?: string;
  }>> {
    return sharedApiService.get(`/vessels/${vesselId}/inspections`);
  }

  // ==================== CERTIFICATES AND COMPLIANCE ====================

  /**
   * Get vessel certificates
   */
  async getVesselCertificates(vesselId: number): Promise<Array<{
    id: string;
    name: string;
    type: string;
    issueDate: string;
    expiryDate: string;
    issuingAuthority: string;
    status: "valid" | "expiring_soon" | "expired" | "suspended";
    daysUntilExpiry: number;
  }>> {
    return sharedApiService.get(`/vessels/${vesselId}/certificates`);
  }

  /**
   * Get expiring certificates across fleet
   */
  async getExpiringCertificates(daysAhead: number = 30, organizationId?: number): Promise<Array<{
    vesselId: number;
    vesselName: string;
    certificate: {
      id: string;
      name: string;
      expiryDate: string;
      daysUntilExpiry: number;
    };
  }>> {
    const params = new URLSearchParams({ daysAhead: daysAhead.toString() });
    if (organizationId) params.append("organizationId", organizationId.toString());
    
    return sharedApiService.get(`/vessels/fleet/expiring-certificates?${params}`);
  }

  // ==================== VOYAGE AND POSITION ====================

  /**
   * Get vessel current position
   */
  async getVesselPosition(vesselId: number): Promise<{
    vesselId: number;
    vesselName: string;
    latitude: number;
    longitude: number;
    heading: number;
    speed: number;
    lastUpdate: string;
    port?: string;
    eta?: string;
    destination?: string;
  }> {
    return sharedApiService.get(`/vessels/${vesselId}/position`);
  }

  /**
   * Get voyage history
   */
  async getVoyageHistory(vesselId: number, limit: number = 10): Promise<Array<{
    id: string;
    voyageNumber: string;
    departurePort: string;
    arrivalPort: string;
    departureDate: string;
    arrivalDate: string;
    cargoType?: string;
    cargoQuantity?: number;
    distanceSailed: number;
    fuelConsumed: number;
  }>> {
    return sharedApiService.get(`/vessels/${vesselId}/voyages?limit=${limit}`);
  }

  // ==================== ANALYTICS AND REPORTING ====================

  /**
   * Get vessel utilization report
   */
  async getUtilizationReport(startDate: string, endDate: string, organizationId?: number): Promise<{
    period: { startDate: string; endDate: string };
    vessels: Array<{
      vesselId: number;
      vesselName: string;
      operationalDays: number;
      portDays: number;
      maintenanceDays: number;
      utilizationPercentage: number;
      revenueEarned?: number;
    }>;
    fleetUtilization: number;
  }> {
    const params = new URLSearchParams({ startDate, endDate });
    if (organizationId) params.append("organizationId", organizationId.toString());
    
    return sharedApiService.get(`/vessels/fleet/utilization?${params}`);
  }

  /**
   * Get fuel efficiency report
   */
  async getFuelEfficiencyReport(vesselId?: number, period?: string): Promise<{
    vessels: Array<{
      vesselId: number;
      vesselName: string;
      avgConsumption: number;
      distance: number;
      efficiency: number;
      benchmark: number;
      variance: number;
    }>;
    fleetAverage: number;
    industryBenchmark: number;
  }> {
    const params = new URLSearchParams();
    if (vesselId) params.append("vesselId", vesselId.toString());
    if (period) params.append("period", period);
    
    return sharedApiService.get(`/vessels/fuel-efficiency?${params}`);
  }
}

// Singleton instance
export const vesselService = new VesselService();