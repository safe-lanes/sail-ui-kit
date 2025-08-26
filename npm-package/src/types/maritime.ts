// Maritime specific type definitions

// Vessel Types
export interface VesselStatus {
  name: string;
  vesselType: string;
  status: {
    status: 'active' | 'maintenance' | 'port' | 'inactive';
    location?: string;
    lastUpdate?: string;
  };
  imo?: string;
  flag?: string;
  deadweight?: number;
}

export type VesselType = typeof import('../constants/maritime').VESSEL_TYPES[number];

// Safety Rating
export interface SafetyRating {
  overall: number;
  categories: SafetyMetrics;
}

export interface SafetyMetrics {
  incidents: number;
  nearMisses: number;
  trainingCompliance: number;
  equipmentStatus: number;
}

// TMSA Compliance
export interface TMSAElement {
  id: string;
  name: string;
  code: string;
}

export interface ComplianceStatus {
  element: string;
  status: 'compliant' | 'non-compliant' | 'partial' | 'pending';
  score?: number;
  lastAudit?: string;
  nextAudit?: string;
}

// Crew Competency
export interface CompetencyLevel {
  level: 'excellent' | 'good' | 'satisfactory' | 'needs-improvement' | 'unsatisfactory';
  score: number;
  category: string;
}

// Incident Severity
export interface SeverityLevel {
  level: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
  color?: string;
}

// Maritime Ranks
export type MaritimeRank = 
  | 'Master'
  | 'Chief Officer'
  | 'Chief Engineer'
  | '2nd Officer'
  | '2nd Engineer'
  | '3rd Officer'
  | '3rd Engineer'
  | '4th Engineer'
  | 'Junior Officer'
  | 'Cadet'
  | 'Bosun'
  | 'AB (Able Seaman)'
  | 'OS (Ordinary Seaman)'
  | 'Oiler'
  | 'Wiper'
  | 'Fitter'
  | 'Electrician'
  | 'Cook'
  | 'Steward';

// Incident Types
export type IncidentType = 
  | 'Near Miss'
  | 'Personal Injury'
  | 'Environmental Incident'
  | 'Equipment Failure'
  | 'Navigation Incident'
  | 'Security Incident'
  | 'Fire/Explosion'
  | 'Collision/Contact'
  | 'Grounding'
  | 'Cargo Related'
  | 'Other';