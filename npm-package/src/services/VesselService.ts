import type { ApiService } from './ApiService';
import type { VesselFilter, VesselPerformance, FleetSummary } from '../types/services';

/**
 * Vessel Service for fleet management
 * Handles vessel data, performance metrics, and fleet operations
 */
export class VesselService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /**
   * Get all vessels with optional filtering
   */
  async getVessels(filters: VesselFilter = {}): Promise<unknown[]> {
    return this.apiService.get<unknown[]>('/vessels', {
      params: filters,
    });
  }

  /**
   * Get vessel by ID
   */
  async getVesselById(id: string): Promise<unknown> {
    return this.apiService.get(`/vessels/${id}`);
  }

  /**
   * Get vessel performance data
   */
  async getVesselPerformance(vesselId?: string): Promise<VesselPerformance[]> {
    const endpoint = vesselId ? `/vessels/${vesselId}/performance` : '/vessels/performance';
    return this.apiService.get<VesselPerformance[]>(endpoint);
  }

  /**
   * Get fleet summary statistics
   */
  async getFleetSummary(): Promise<FleetSummary> {
    return this.apiService.get<FleetSummary>('/vessels/fleet-summary');
  }

  /**
   * Get vessel types
   */
  async getVesselTypes(): Promise<string[]> {
    return this.apiService.get<string[]>('/vessels/types');
  }

  /**
   * Get vessel statuses
   */
  async getVesselStatuses(): Promise<string[]> {
    return this.apiService.get<string[]>('/vessels/statuses');
  }

  /**
   * Update vessel status
   */
  async updateVesselStatus(vesselId: string, status: string, location?: string): Promise<void> {
    return this.apiService.put(`/vessels/${vesselId}/status`, {
      status,
      location,
    });
  }

  /**
   * Get vessel maintenance records
   */
  async getVesselMaintenance(vesselId: string): Promise<unknown[]> {
    return this.apiService.get(`/vessels/${vesselId}/maintenance`);
  }

  /**
   * Get vessel inspections
   */
  async getVesselInspections(vesselId: string): Promise<unknown[]> {
    return this.apiService.get(`/vessels/${vesselId}/inspections`);
  }

  /**
   * Get vessel certificates
   */
  async getVesselCertificates(vesselId: string): Promise<unknown[]> {
    return this.apiService.get(`/vessels/${vesselId}/certificates`);
  }

  /**
   * Get vessel crew
   */
  async getVesselCrew(vesselId: string): Promise<unknown[]> {
    return this.apiService.get(`/vessels/${vesselId}/crew`);
  }

  /**
   * Get vessel voyage data
   */
  async getVesselVoyages(vesselId: string): Promise<unknown[]> {
    return this.apiService.get(`/vessels/${vesselId}/voyages`);
  }

  /**
   * Create vessel record
   */
  async createVessel(vesselData: unknown): Promise<unknown> {
    return this.apiService.post('/vessels', vesselData);
  }

  /**
   * Update vessel record
   */
  async updateVessel(vesselId: string, vesselData: unknown): Promise<unknown> {
    return this.apiService.put(`/vessels/${vesselId}`, vesselData);
  }

  /**
   * Delete vessel record
   */
  async deleteVessel(vesselId: string): Promise<void> {
    return this.apiService.delete(`/vessels/${vesselId}`);
  }
}
