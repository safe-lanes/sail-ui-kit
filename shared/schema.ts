
import { mysqlTable, text, int, boolean, timestamp, decimal } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const forms = mysqlTable("forms", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  rankGroup: text("rank_group").notNull(),
  versionNo: text("version_no").notNull(),
  versionDate: text("version_date").notNull(),
  configuration: text("configuration"), // JSON string for form configuration
});

export const rankGroups = mysqlTable("rank_groups", {
  id: int("id").primaryKey().autoincrement(),
  formId: int("form_id").notNull().references(() => forms.id),
  name: text("name").notNull(),
  ranks: text("ranks").notNull(), // JSON string for MySQL compatibility
});

export const availableRanks = mysqlTable("available_ranks", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Senior Officers, Junior Officers, Ratings, etc.
});

export const crewMembers = mysqlTable("crew_members", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name"),
  rank: text("rank").notNull(),
  nationality: text("nationality").notNull(),
  vessel: text("vessel").notNull(),
  vesselType: text("vessel_type").notNull(),
  signOnDate: text("sign_on_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appraisalResults = mysqlTable("appraisal_results", {
  id: int("id").primaryKey().autoincrement(),
  crewMemberId: text("crew_member_id").notNull().references(() => crewMembers.id),
  formId: int("form_id").notNull().references(() => forms.id),
  appraisalType: text("appraisal_type").notNull(),
  appraisalDate: text("appraisal_date").notNull(),
  appraisalData: text("appraisal_data").notNull(), // JSON string
  competenceRating: text("competence_rating"),
  behavioralRating: text("behavioral_rating"),
  overallRating: text("overall_rating"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  submittedBy: text("submitted_by").notNull(),
  status: text("status").notNull().default("draft"), // draft, submitted, approved
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFormSchema = createInsertSchema(forms).pick({
  name: true,
  rankGroup: true,
  versionNo: true,
  versionDate: true,
  configuration: true,
});

export const insertRankGroupSchema = createInsertSchema(rankGroups).pick({
  formId: true,
  name: true,
  ranks: true,
});

export const insertAvailableRankSchema = createInsertSchema(availableRanks).pick({
  name: true,
  category: true,
});

export const insertCrewMemberSchema = createInsertSchema(crewMembers).pick({
  id: true,
  firstName: true,
  middleName: true,
  lastName: true,
  rank: true,
  nationality: true,
  vessel: true,
  vesselType: true,
  signOnDate: true,
});

export const insertAppraisalResultSchema = createInsertSchema(appraisalResults).pick({
  crewMemberId: true,
  formId: true,
  appraisalType: true,
  appraisalDate: true,
  appraisalData: true,
  competenceRating: true,
  behavioralRating: true,
  overallRating: true,
  submittedBy: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertForm = z.infer<typeof insertFormSchema>;
export type Form = typeof forms.$inferSelect;
export type InsertRankGroup = z.infer<typeof insertRankGroupSchema>;
export type RankGroup = typeof rankGroups.$inferSelect;
export type InsertAvailableRank = z.infer<typeof insertAvailableRankSchema>;
export type AvailableRank = typeof availableRanks.$inferSelect;
export type InsertCrewMember = z.infer<typeof insertCrewMemberSchema>;
export type CrewMember = typeof crewMembers.$inferSelect;
export type InsertAppraisalResult = z.infer<typeof insertAppraisalResultSchema>;
export type AppraisalResult = typeof appraisalResults.$inferSelect;

// ==================== SHARED RBAC SYSTEM ====================

// Modules table - defines available TMSA modules
export const modules = mysqlTable("modules", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull().unique(), // "Element 1 - Management & Leadership"
  code: text("code").notNull().unique(), // "EL1_MGMT_LEADERSHIP"
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Roles table - configurable by Super Admins  
export const roles = mysqlTable("roles", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull().unique(),
  code: text("code").notNull().unique(), // "SHORE_SUPER_ADMIN", "VESSEL_MASTER"
  description: text("description"),
  level: text("level").notNull(), // "Super Admin", "Admin", "User", "Guest"
  category: text("category").notNull(), // "Shore", "Vessel"
  department: text("department"), // "Technical", "Marine", "Crewing", null for cross-department
  parentRoleId: int("parent_role_id"), // For hierarchical roles - will add reference later
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Permissions table - granular permissions
export const permissions = mysqlTable("permissions", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull().unique(),
  code: text("code").notNull().unique(), // "TECHNICAL_INCIDENTS_EDIT", "CREWING_VIEW_ALL"
  description: text("description"),
  moduleId: int("module_id").references(() => modules.id), // Which module this applies to
  resource: text("resource").notNull(), // "incidents", "crew_members", "forms"
  action: text("action").notNull(), // "create", "read", "update", "delete", "approve"
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Role-Permission mapping (many-to-many)
export const rolePermissions = mysqlTable("role_permissions", {
  id: int("id").primaryKey().autoincrement(),
  roleId: int("role_id").notNull().references(() => roles.id),
  permissionId: int("permission_id").notNull().references(() => permissions.id),
  grantedAt: timestamp("granted_at").defaultNow(),
  grantedBy: int("granted_by").references(() => users.id),
});

// User-Role mapping (many-to-many) - users can have multiple roles
export const userRoles = mysqlTable("user_roles", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  roleId: int("role_id").notNull().references(() => roles.id),
  assignedAt: timestamp("assigned_at").defaultNow(),
  assignedBy: int("assigned_by").references(() => users.id),
  expiresAt: timestamp("expires_at"), // Optional expiration for temporary roles
  isActive: boolean("is_active").notNull().default(true),
});

// ==================== SHARED MARITIME ENTITIES ====================

// Organizations/Companies
export const organizations = mysqlTable("organizations", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "Ship Management", "Owner", "Charterer"
  code: text("code").unique(), // Company code
  address: text("address"),
  contactInfo: text("contact_info"), // JSON string
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Vessels/Fleet
export const vessels = mysqlTable("vessels", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  imoNumber: text("imo_number").unique(),
  vesselType: text("vessel_type").notNull(), // "Oil Tanker", "Container", "Bulk", etc.
  flag: text("flag"),
  deadweight: decimal("deadweight", { precision: 10, scale: 2 }),
  grossTonnage: decimal("gross_tonnage", { precision: 10, scale: 2 }),
  yearBuilt: int("year_built"),
  organizationId: int("organization_id").references(() => organizations.id),
  status: text("status").notNull().default("Active"), // "Active", "Inactive", "Sold"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Departments (Shore-based)
export const departments = mysqlTable("departments", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(), // "TECH", "MARINE", "CREW", "ADMIN"
  description: text("description"),
  organizationId: int("organization_id").references(() => organizations.id),
  headUserId: int("head_user_id").references(() => users.id), // Department head
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Enhanced Users table extension (we'll extend the existing one)
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().references(() => users.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique(),
  phoneNumber: text("phone_number"),
  employeeId: text("employee_id").unique(),
  departmentId: int("department_id").references(() => departments.id),
  organizationId: int("organization_id").references(() => organizations.id),
  currentVesselId: int("current_vessel_id").references(() => vessels.id), // For ship personnel
  jobTitle: text("job_title"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==================== INSERT SCHEMAS FOR RBAC ====================

export const insertModuleSchema = createInsertSchema(modules).pick({
  name: true,
  code: true,
  description: true,
  isActive: true,
});

export const insertRoleSchema = createInsertSchema(roles).pick({
  name: true,
  code: true,
  description: true,
  level: true,
  category: true,
  department: true,
  parentRoleId: true,
  isActive: true,
});

export const insertPermissionSchema = createInsertSchema(permissions).pick({
  name: true,
  code: true,
  description: true,
  moduleId: true,
  resource: true,
  action: true,
  isActive: true,
});

export const insertRolePermissionSchema = createInsertSchema(rolePermissions).pick({
  roleId: true,
  permissionId: true,
  grantedBy: true,
});

export const insertUserRoleSchema = createInsertSchema(userRoles).pick({
  userId: true,
  roleId: true,
  assignedBy: true,
  expiresAt: true,
  isActive: true,
});

export const insertOrganizationSchema = createInsertSchema(organizations).pick({
  name: true,
  type: true,
  code: true,
  address: true,
  contactInfo: true,
  isActive: true,
});

export const insertVesselSchema = createInsertSchema(vessels).pick({
  name: true,
  imoNumber: true,
  vesselType: true,
  flag: true,
  deadweight: true,
  grossTonnage: true,
  yearBuilt: true,
  organizationId: true,
  status: true,
});

export const insertDepartmentSchema = createInsertSchema(departments).pick({
  name: true,
  code: true,
  description: true,
  organizationId: true,
  headUserId: true,
  isActive: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  userId: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  employeeId: true,
  departmentId: true,
  organizationId: true,
  currentVesselId: true,
  jobTitle: true,
  isActive: true,
});

// ==================== TYPE DEFINITIONS ====================

export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modules.$inferSelect;
export type InsertRole = z.infer<typeof insertRoleSchema>;
export type Role = typeof roles.$inferSelect;
export type InsertPermission = z.infer<typeof insertPermissionSchema>;
export type Permission = typeof permissions.$inferSelect;
export type InsertRolePermission = z.infer<typeof insertRolePermissionSchema>;
export type RolePermission = typeof rolePermissions.$inferSelect;
export type InsertUserRole = z.infer<typeof insertUserRoleSchema>;
export type UserRole = typeof userRoles.$inferSelect;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type Organization = typeof organizations.$inferSelect;
export type InsertVessel = z.infer<typeof insertVesselSchema>;
export type Vessel = typeof vessels.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = typeof departments.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
