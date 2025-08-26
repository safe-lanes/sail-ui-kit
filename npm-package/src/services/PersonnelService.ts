import type { ApiService } from './ApiService';
import type { PersonnelFilter, PersonnelSearchResult } from '../types/services';

/**
 * Personnel Service for crew and staff management
 * Handles personnel data across different vessels and roles
 */
export class PersonnelService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /**
   * Search personnel with filters
   */
  async searchPersonnel(filters: PersonnelFilter = {}): Promise<PersonnelSearchResult[]> {
    return this.apiService.get<PersonnelSearchResult[]>('/personnel/search', {
      params: filters
    });
  }

  /**
   * Get personnel by ID
   */
  async getPersonnelById(id: string): Promise<PersonnelSearchResult> {
    return this.apiService.get<PersonnelSearchResult>(`/personnel/${id}`);
  }

  /**
   * Get personnel by vessel
   */
  async getPersonnelByVessel(vesselId: string): Promise<PersonnelSearchResult[]> {
    return this.apiService.get<PersonnelSearchResult[]>(`/personnel/vessel/${vesselId}`);
  }

  /**
   * Get personnel by rank
   */
  async getPersonnelByRank(rank: string): Promise<PersonnelSearchResult[]> {
    return this.apiService.get<PersonnelSearchResult[]>('/personnel/search', {
      params: { rank }
    });
  }

  /**
   * Get available ranks
   */
  async getAvailableRanks(): Promise<string[]> {
    return this.apiService.get<string[]>('/personnel/ranks');
  }

  /**
   * Get personnel statistics
   */
  async getPersonnelStats(): Promise<{
    totalPersonnel: number;
    activePersonnel: number;
    personnelByRank: Record<string, number>;
    personnelByVessel: Record<string, number>;
    personnelByNationality: Record<string, number>;
  }> {
    return this.apiService.get('/personnel/stats');
  }

  /**
   * Create personnel record
   */
  async createPersonnel(personnelData: Partial<PersonnelSearchResult>): Promise<PersonnelSearchResult> {
    return this.apiService.post<PersonnelSearchResult>('/personnel', personnelData);
  }

  /**
   * Update personnel record
   */
  async updatePersonnel(id: string, personnelData: Partial<PersonnelSearchResult>): Promise<PersonnelSearchResult> {
    return this.apiService.put<PersonnelSearchResult>(`/personnel/${id}`, personnelData);
  }

  /**
   * Delete personnel record
   */
  async deletePersonnel(id: string): Promise<void> {
    return this.apiService.delete(`/personnel/${id}`);
  }

  /**
   * Get personnel training records
   */
  async getPersonnelTraining(personnelId: string): Promise<any[]> {
    return this.apiService.get(`/personnel/${personnelId}/training`);
  }

  /**
   * Get personnel certificates
   */
  async getPersonnelCertificates(personnelId: string): Promise<any[]> {
    return this.apiService.get(`/personnel/${personnelId}/certificates`);
  }

  /**
   * Get personnel appraisal history
   */
  async getPersonnelAppraisals(personnelId: string): Promise<any[]> {
    return this.apiService.get(`/personnel/${personnelId}/appraisals`);
  }
}