// Maritime Components Library
// Shared components for SAIL Phase 2 Maritime ERP

// Core Maritime Components
export { VesselStatusIndicator } from "./VesselStatusIndicator";
export type { VesselStatus } from "./VesselStatusIndicator";

export { SafetyRatingBadge } from "./SafetyRatingBadge";
export type { SafetyRating, SafetyMetrics } from "./SafetyRatingBadge";

export { TMSAComplianceIndicator } from "./TMSAComplianceIndicator";
export type { TMSAElement, ComplianceStatus } from "./TMSAComplianceIndicator";

// Maritime Forms
export { IncidentReportForm } from "./IncidentReportForm";

// Dashboards
export { OperationsDashboard } from "./OperationsDashboard";

// Maritime Component Library Version
export const MARITIME_COMPONENTS_VERSION = "1.0.0";

// Shared Enums and Constants
export const VESSEL_TYPES = [
  "Oil Tanker",
  "Chemical Tanker", 
  "LPG Tanker",
  "LNG Tanker",
  "Container",
  "Bulk Carrier",
  "General Cargo",
  "RoRo",
  "Passenger",
  "Offshore",
  "Other"
] as const;

export const MARITIME_RANKS = {
  SENIOR_OFFICERS: [
    "Master",
    "Chief Officer", 
    "Chief Engineer",
    "2nd Officer",
    "2nd Engineer"
  ],
  JUNIOR_OFFICERS: [
    "3rd Officer",
    "3rd Engineer",
    "4th Engineer",
    "Junior Officer",
    "Cadet"
  ],
  RATINGS: [
    "Bosun",
    "AB (Able Seaman)",
    "OS (Ordinary Seaman)",
    "Oiler", 
    "Wiper",
    "Fitter",
    "Electrician",
    "Cook",
    "Steward"
  ]
} as const;

export const TMSA_ELEMENTS = [
  { id: "EL1", name: "Element 1 - Management & Leadership", code: "EL1" },
  { id: "EL2", name: "Element 2 - Shore HR Management", code: "EL2" },
  { id: "EL3", name: "Element 3 - Crewing Management", code: "EL3" },
  { id: "EL4", name: "Element 4 - Technical Management", code: "EL4" },
  { id: "EL5", name: "Element 5 - Navigation", code: "EL5" },
  { id: "EL6", name: "Element 6 - Cargo Operations", code: "EL6" },
  { id: "EL6A", name: "Element 6A - Mooring Operations", code: "EL6A" },
  { id: "EL7", name: "Element 7 - Management of Change", code: "EL7" },
  { id: "EL8", name: "Element 8 - Incident Investigation", code: "EL8" },
  { id: "EL9", name: "Element 9 - Safety", code: "EL9" },
  { id: "EL10", name: "Element 10 - Environment & Energy Management", code: "EL10" },
  { id: "EL11", name: "Element 11 - Emergency Management", code: "EL11" },
  { id: "EL12", name: "Element 12 - Audits & Inspections", code: "EL12" },
  { id: "EL13", name: "Element 13 - Security & Cyber Security", code: "EL13" }
] as const;

export const INCIDENT_TYPES = [
  "Near Miss",
  "Personal Injury",
  "Environmental Incident", 
  "Equipment Failure",
  "Navigation Incident",
  "Security Incident",
  "Fire/Explosion",
  "Collision/Contact",
  "Grounding",
  "Cargo Related",
  "Other"
] as const;

export const SEVERITY_LEVELS = {
  LOW: { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  MEDIUM: { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  HIGH: { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  CRITICAL: { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" }
} as const;