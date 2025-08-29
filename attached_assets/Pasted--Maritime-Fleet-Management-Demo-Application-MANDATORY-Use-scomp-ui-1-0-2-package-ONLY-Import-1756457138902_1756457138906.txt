# Maritime Fleet Management Demo Application

**MANDATORY: Use `scomp-ui@1.0.2` package ONLY. Import `'scomp-ui/dist/index.css'` first line. NEVER create buttons, inputs, forms, tables, cards, layouts, or auth from scratch. Use existing: TMSAAppLayout, Button, Card, FormTable, SAILForm, VesselStatusIndicator, SafetyRatingBadge, SCOMPMainTableScreen, RBACProvider, PermissionGuard. Use services: SHARED_SERVICES.api, SHARED_SERVICES.vessel, SHARED_SERVICES.personnel. Maritime blue theme (#16569e) included.**

## Project Overview
Create a comprehensive maritime fleet management application that demonstrates all scomp-ui package features. Build a React app that showcases RBAC authentication, maritime components, forms, dashboards, and layout systems.

## Application Structure

### 1. Authentication & RBAC System
- Wrap entire app with RBACProvider
- Create login page with username/password (use mock authentication for demo)
- Implement three user roles with different permissions:
  - **Captain**: Can view vessels, crew, create incident reports
  - **Fleet Manager**: All Captain permissions + manage vessels, approve maintenance
  - **Admin**: All permissions + user management, system settings
- Use PermissionGuard to show/hide features based on user role

### 2. Main Application Layout
- Use TMSAAppLayout as the main wrapper
- Create navigation menu with these sections:
  - Dashboard (home page with metrics)
  - Fleet Management (vessel list and details)
  - Crew Management (crew list and appraisals)
  - Maintenance (maintenance requests and schedules)
  - Reports & Analytics
  - Admin Panel (only for admin users)

### 3. Dashboard Page (Home)
Use dashboard components to create an overview screen:
- MetricCard components showing: Total Vessels, Active Crew, Pending Maintenance, TMSA Score
- FleetStatusCard with sample vessel data (4-5 vessels with different statuses)
- IncidentCard showing recent incidents
- ComplianceCard with TMSA elements (EL1, EL4, EL9, EL12)
- NotificationPanel with maritime-specific notifications

### 4. Fleet Management Page
- Use SCOMPMainTableScreen for vessel listing
- Include VesselStatusIndicator components for each vessel
- Add filters: vessel type, status, location
- Create vessel detail modal using maritime components:
  - SafetyRatingBadge
  - TMSAComplianceIndicator
  - Basic vessel information cards

### 5. Crew Management Page
- Crew list table using FormTable component
- Implement crew appraisal form using SAILForm with these sections:
  - Part A: Seafarer Information (name, rank, nationality, vessel)
  - Part B: Training Records (using FormTable with training name, evaluation rating)
  - Part C: Performance Assessment (using FormTable with criteria, ratings)
- Use CrewCompetencyBadge for skill visualization

### 6. Maintenance Module
- Maintenance request form using SAILForm
- Equipment status cards using StatusCard component
- Progress tracking with ProgressIndicator component
- Maintenance schedule table using FormTable

### 7. Sample Data Structure
Create realistic mock data for:

```javascript
// Vessels
const sampleVessels = [
  { id: "MV-001", name: "MV Atlantic Star", type: "Oil Tanker", status: "active", location: "Port of Rotterdam", crew: 25 },
  { id: "MV-002", name: "MV Pacific Dawn", type: "Container Ship", status: "maintenance", location: "Dry Dock 3", crew: 23 },
  { id: "MV-003", name: "MV Northern Light", type: "Chemical Tanker", status: "at-sea", location: "North Atlantic", crew: 27 },
  { id: "MV-004", name: "MV Ocean Explorer", type: "LNG Tanker", status: "in-port", location: "Singapore", crew: 28 }
];

// Crew Members
const sampleCrew = [
  { id: "CREW001", name: "John Smith", rank: "Master", vessel: "MV Atlantic Star", status: "onboard" },
  { id: "CREW002", name: "Maria Rodriguez", rank: "Chief Engineer", vessel: "MV Pacific Dawn", status: "shore-leave" },
  { id: "CREW003", name: "David Chen", rank: "2nd Officer", vessel: "MV Northern Light", status: "onboard" }
];

// User Roles for Testing
const testUsers = [
  { username: "captain", password: "demo123", role: "captain", name: "Captain Smith" },
  { username: "manager", password: "demo123", role: "fleet-manager", name: "Fleet Manager Jones" },
  { username: "admin", password: "demo123", role: "admin", name: "Admin User" }
];
```

## Implementation Requirements

### Phase 1: Basic Setup (Start Here)
1. Create React project with scomp-ui package
2. Import CSS and set up basic routing (React Router)
3. Implement RBACProvider with mock authentication
4. Create login page and main layout structure

### Phase 2: Core Features
1. Build dashboard with metric cards and status displays
2. Create fleet management page with vessel table
3. Implement basic crew management functionality
4. Add navigation between pages

### Phase 3: Advanced Features
1. Add SAIL forms for crew appraisals and maintenance requests
2. Implement FormTable components for dynamic data entry
3. Add permission-based feature visibility
4. Create admin panel for user management

### Phase 4: Polish & Integration
1. Add feedback components (notifications, alerts)
2. Implement progress indicators for workflows
3. Add maritime-specific styling and icons
4. Test all user roles and permissions

## Technical Notes
- Use React functional components with hooks
- Implement React Router for navigation
- Store authentication state in context/localStorage
- Use mock data - no backend required for demo
- Ensure responsive design works on mobile/desktop
- Add loading states and error handling

## Success Criteria
The completed application should demonstrate:
- All major scomp-ui components in action
- RBAC system with role-based access control
- Maritime-themed styling and user experience  
- Form creation and data table functionality
- Dashboard and analytics visualization
- Complete user workflow from login to task completion

Focus on creating a realistic maritime application that showcases the package capabilities rather than just component examples.