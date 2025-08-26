// Shared Personnel Service for both Shore and Ship personnel
import { sharedApiService } from "./ApiService";
import type { 
  CrewMember, 
  InsertCrewMember,
  UserProfile,
  InsertUserProfile,
  Department,
  Organization
} from "@shared/schema";

export interface PersonnelFilter {
  department?: string;
  organization?: string;
  vessel?: string;
  rank?: string;
  nationality?: string;
  status?: "active" | "inactive" | "on_leave";
  personnelType?: "shore" | "ship";
}

export interface PersonnelSearchResult {
  crewMembers: CrewMember[];
  userProfiles: UserProfile[];
  total: number;
}

/**
 * Shared Personnel Service for managing both shore and ship personnel
 * Used across Crewing (Element 3) and Shore HR (Element 2) modules
 */
export class PersonnelService {
  
  // ==================== CREW MEMBERS (Ship Personnel) ====================

  /**
   * Get all crew members with optional filtering
   */
  async getCrewMembers(filter?: PersonnelFilter): Promise<CrewMember[]> {
    const params = filter ? `?${new URLSearchParams(filter as any)}` : "";
    return sharedApiService.get<CrewMember[]>(`/personnel/crew-members${params}`);
  }

  /**
   * Get crew member by ID
   */
  async getCrewMember(id: string): Promise<CrewMember | null> {
    try {
      return await sharedApiService.get<CrewMember>(`/personnel/crew-members/${id}`);
    } catch (error) {
      console.error(`Failed to fetch crew member ${id}:`, error);
      return null;
    }
  }

  /**
   * Create new crew member
   */
  async createCrewMember(crewMember: InsertCrewMember): Promise<CrewMember> {
    return sharedApiService.post<CrewMember>("/personnel/crew-members", crewMember);
  }

  /**
   * Update crew member
   */
  async updateCrewMember(id: string, updates: Partial<InsertCrewMember>): Promise<CrewMember> {
    return sharedApiService.put<CrewMember>(`/personnel/crew-members/${id}`, updates);
  }

  /**
   * Delete crew member
   */
  async deleteCrewMember(id: string): Promise<boolean> {
    const result = await sharedApiService.delete<{ success: boolean }>(`/personnel/crew-members/${id}`);
    return result.success;
  }

  /**
   * Get crew members by vessel
   */
  async getCrewByVessel(vesselName: string): Promise<CrewMember[]> {
    return this.getCrewMembers({ vessel: vesselName });
  }

  /**
   * Get crew members by rank
   */
  async getCrewByRank(rank: string): Promise<CrewMember[]> {
    return this.getCrewMembers({ rank });
  }

  // ==================== USER PROFILES (Shore Personnel) ====================

  /**
   * Get all user profiles (shore personnel)
   */
  async getUserProfiles(filter?: PersonnelFilter): Promise<UserProfile[]> {
    const params = filter ? `?${new URLSearchParams(filter as any)}` : "";
    return sharedApiService.get<UserProfile[]>(`/personnel/user-profiles${params}`);
  }

  /**
   * Get user profile by user ID
   */
  async getUserProfile(userId: number): Promise<UserProfile | null> {
    try {
      return await sharedApiService.get<UserProfile>(`/personnel/user-profiles/user/${userId}`);
    } catch (error) {
      console.error(`Failed to fetch user profile for user ${userId}:`, error);
      return null;
    }
  }

  /**
   * Create user profile
   */
  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    return sharedApiService.post<UserProfile>("/personnel/user-profiles", profile);
  }

  /**
   * Update user profile
   */
  async updateUserProfile(profileId: number, updates: Partial<InsertUserProfile>): Promise<UserProfile> {
    return sharedApiService.put<UserProfile>(`/personnel/user-profiles/${profileId}`, updates);
  }

  /**
   * Delete user profile
   */
  async deleteUserProfile(profileId: number): Promise<boolean> {
    const result = await sharedApiService.delete<{ success: boolean }>(`/personnel/user-profiles/${profileId}`);
    return result.success;
  }

  // ==================== SEARCH AND INTEGRATION ====================

  /**
   * Search across both crew members and user profiles
   */
  async searchPersonnel(query: string, filter?: PersonnelFilter): Promise<PersonnelSearchResult> {
    const params = new URLSearchParams({ query, ...filter as any });
    return sharedApiService.get<PersonnelSearchResult>(`/personnel/search?${params}`);
  }

  /**
   * Get personnel by department (shore personnel)
   */
  async getPersonnelByDepartment(departmentId: number): Promise<UserProfile[]> {
    return this.getUserProfiles({ department: departmentId.toString() });
  }

  /**
   * Get personnel by organization
   */
  async getPersonnelByOrganization(organizationId: number): Promise<{
    crewMembers: CrewMember[];
    userProfiles: UserProfile[];
  }> {
    const [crewMembers, userProfiles] = await Promise.all([
      this.getCrewMembers({ organization: organizationId.toString() }),
      this.getUserProfiles({ organization: organizationId.toString() })
    ]);

    return { crewMembers, userProfiles };
  }

  // ==================== DEPARTMENTS AND ORGANIZATIONS ====================

  /**
   * Get all departments
   */
  async getDepartments(): Promise<Department[]> {
    return sharedApiService.get<Department[]>("/personnel/departments");
  }

  /**
   * Get all organizations
   */
  async getOrganizations(): Promise<Organization[]> {
    return sharedApiService.get<Organization[]>("/personnel/organizations");
  }

  // ==================== ANALYTICS AND REPORTING ====================

  /**
   * Get personnel statistics
   */
  async getPersonnelStats(): Promise<{
    totalCrew: number;
    totalShorePersonnel: number;
    byDepartment: Record<string, number>;
    byVessel: Record<string, number>;
    byRank: Record<string, number>;
    byNationality: Record<string, number>;
  }> {
    return sharedApiService.get("/personnel/stats");
  }

  /**
   * Get crew turnover data
   */
  async getCrewTurnover(startDate?: string, endDate?: string): Promise<{
    signOns: number;
    signOffs: number;
    turnoverRate: number;
    byVessel: Record<string, { signOns: number; signOffs: number; rate: number }>;
  }> {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    
    return sharedApiService.get(`/personnel/turnover?${params}`);
  }

  /**
   * Get training compliance for personnel
   */
  async getTrainingCompliance(personnelType?: "crew" | "shore"): Promise<{
    compliant: number;
    nonCompliant: number;
    expiringSoon: number;
    details: Array<{
      personnelId: string;
      name: string;
      position: string;
      complianceStatus: "compliant" | "non_compliant" | "expiring_soon";
      expiringCertificates: string[];
    }>;
  }> {
    const params = personnelType ? `?type=${personnelType}` : "";
    return sharedApiService.get(`/personnel/training-compliance${params}`);
  }
}

// Singleton instance
export const personnelService = new PersonnelService();