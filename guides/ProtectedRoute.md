# ProtectedRoute Component

## Overview
The `ProtectedRoute` component provides route-level access control for maritime fleet management applications. It integrates with routing systems to restrict navigation based on user permissions and roles, ensuring secure access to different application sections.

## Props Interface
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: string;
  permissions?: string[];
  roles?: string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
  onAccessDenied?: () => void;
  loading?: React.ReactNode;
  user?: User;
  strict?: boolean;
}

interface RouteGuardConfig {
  path: string;
  component: React.ComponentType;
  permissions?: string[];
  roles?: string[];
  requireAll?: boolean;
  redirectTo?: string;
  metadata?: {
    title: string;
    description: string;
    department?: 'deck' | 'engine' | 'shore';
    criticality?: 'low' | 'medium' | 'high' | 'critical';
  };
}
```

## Basic Usage
```tsx
import { ProtectedRoute } from 'scomp-ui/sail-ui-kit';
import { Route, Switch } from 'wouter';

function MaritimeAppRouting() {
  const currentUser = useMaritimeUser();

  return (
    <div className="maritime-app">
      <Switch>
        {/* Public routes */}
        <Route path="/login" component={LoginPage} />
        <Route path="/public" component={PublicDashboard} />

        {/* Protected deck operations - Officers only */}
        <Route path="/bridge">
          <ProtectedRoute 
            roles={['master', 'chief_officer', 'second_officer']}
            user={currentUser}
            fallback={<UnauthorizedAccess department="Bridge Operations" />}
          >
            <BridgeOperations />
          </ProtectedRoute>
        </Route>

        {/* Engine room access - Engineers only */}
        <Route path="/engine">
          <ProtectedRoute 
            roles={['chief_engineer', 'second_engineer', 'third_engineer']}
            user={currentUser}
            redirectTo="/dashboard"
          >
            <EngineRoomManagement />
          </ProtectedRoute>
        </Route>

        {/* Master-only emergency procedures */}
        <Route path="/emergency">
          <ProtectedRoute 
            roles={['master']}
            user={currentUser}
            strict={true}
            onAccessDenied={() => logSecurityEvent('Emergency access denied')}
            fallback={<CriticalAccessDenied />}
          >
            <EmergencyProcedures />
          </ProtectedRoute>
        </Route>

        {/* Fleet management - Shore personnel */}
        <Route path="/fleet">
          <ProtectedRoute 
            permissions={['fleet_management', 'shore_operations']}
            requireAll={false}
            user={currentUser}
          >
            <FleetManagementDashboard />
          </ProtectedRoute>
        </Route>

        {/* Default protected dashboard */}
        <Route>
          <ProtectedRoute 
            permissions={['dashboard_access']}
            user={currentUser}
            redirectTo="/login"
          >
            <MainDashboard />
          </ProtectedRoute>
        </Route>
      </Switch>
    </div>
  );
}
```

## Advanced Route Configuration
```tsx
// Define comprehensive maritime route structure
const MARITIME_ROUTES: RouteGuardConfig[] = [
  // Bridge and Navigation
  {
    path: '/bridge/navigation',
    component: NavigationConsole,
    roles: ['master', 'chief_officer', 'second_officer'],
    metadata: {
      title: 'Navigation Console',
      description: 'Real-time navigation and course planning',
      department: 'deck',
      criticality: 'critical'
    }
  },
  {
    path: '/bridge/autopilot',
    component: AutopilotControls,
    permissions: ['autopilot_control'],
    roles: ['master', 'chief_officer'],
    requireAll: false,
    metadata: {
      title: 'Autopilot Controls',
      description: 'Automated navigation system controls',
      department: 'deck',
      criticality: 'high'
    }
  },

  // Engine Room Operations
  {
    path: '/engine/main-engine',
    component: MainEngineControls,
    roles: ['chief_engineer', 'second_engineer'],
    metadata: {
      title: 'Main Engine Controls',
      description: 'Primary propulsion system management',
      department: 'engine',
      criticality: 'critical'
    }
  },
  {
    path: '/engine/auxiliary',
    component: AuxiliarySystemsPanel,
    permissions: ['auxiliary_systems'],
    metadata: {
      title: 'Auxiliary Systems',
      description: 'Supporting engine room systems',
      department: 'engine',
      criticality: 'medium'
    }
  },

  // Cargo Operations
  {
    path: '/cargo/loading',
    component: CargoLoadingInterface,
    roles: ['master', 'chief_officer', 'cargo_officer'],
    permissions: ['cargo_operations'],
    requireAll: false,
    metadata: {
      title: 'Cargo Loading',
      description: 'Cargo loading and ballast operations',
      department: 'deck',
      criticality: 'high'
    }
  },

  // Safety and Emergency
  {
    path: '/safety/emergency',
    component: EmergencyManagement,
    roles: ['master'],
    strict: true,
    metadata: {
      title: 'Emergency Management',
      description: 'Critical emergency procedures and protocols',
      department: 'deck',
      criticality: 'critical'
    }
  },

  // Shore Operations
  {
    path: '/shore/fleet-overview',
    component: FleetOverviewDashboard,
    permissions: ['fleet_overview', 'shore_management'],
    requireAll: false,
    metadata: {
      title: 'Fleet Overview',
      description: 'Comprehensive fleet status and operations',
      department: 'shore',
      criticality: 'medium'
    }
  },

  // Compliance and Auditing
  {
    path: '/compliance/tmsa',
    component: TMSACompliancePanel,
    permissions: ['compliance_review', 'tmsa_access'],
    roles: ['master', 'marine_superintendent', 'safety_officer'],
    requireAll: false,
    redirectTo: '/dashboard',
    metadata: {
      title: 'TMSA Compliance',
      description: 'Tanker Management and Self Assessment',
      department: 'shore',
      criticality: 'high'
    }
  }
];

function DynamicRouteGuards() {
  const currentUser = useMaritimeUser();
  const { navigate } = useLocation();

  const renderProtectedRoute = (routeConfig: RouteGuardConfig) => {
    const {
      path,
      component: Component,
      permissions,
      roles,
      requireAll,
      redirectTo,
      metadata
    } = routeConfig;

    return (
      <Route key={path} path={path}>
        <ProtectedRoute
          permissions={permissions}
          roles={roles}
          requireAll={requireAll}
          user={currentUser}
          redirectTo={redirectTo || '/dashboard'}
          onAccessDenied={() => {
            logSecurityEvent('Route access denied', {
              path,
              user: currentUser?.id,
              department: metadata?.department,
              criticality: metadata?.criticality
            });
          }}
          fallback={
            <AccessDeniedPage 
              title={metadata?.title}
              description={metadata?.description}
              requiredRoles={roles}
              requiredPermissions={permissions}
            />
          }
        >
          <Component />
        </ProtectedRoute>
      </Route>
    );
  };

  return (
    <Switch>
      {MARITIME_ROUTES.map(renderProtectedRoute)}
      
      {/* Fallback route */}
      <Route>
        <ProtectedRoute 
          permissions={['basic_access']}
          user={currentUser}
          redirectTo="/login"
        >
          <DefaultDashboard />
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}
```

## Integration with Maritime Workflows
```tsx
function MaritimeWorkflowRouting() {
  const currentUser = useMaritimeUser();
  const { vesselStatus, emergencyStatus } = useVesselContext();

  // Dynamic route protection based on vessel state
  const getRoutePermissions = (basePath: string) => {
    if (emergencyStatus === 'active') {
      // Emergency mode - restrict to essential personnel
      return {
        permissions: ['emergency_access'],
        roles: ['master', 'chief_officer', 'safety_officer'],
        strict: true
      };
    }

    if (vesselStatus === 'at_anchor') {
      // At anchor - allow maintenance access
      return {
        permissions: ['maintenance_access', 'normal_operations'],
        requireAll: false
      };
    }

    if (vesselStatus === 'underway') {
      // Underway - navigation focus
      return {
        permissions: ['navigation_access', 'watchkeeping'],
        roles: ['master', 'chief_officer', 'second_officer', 'third_officer'],
        requireAll: false
      };
    }

    return {
      permissions: ['basic_access']
    };
  };

  return (
    <div className="maritime-workflow-routing">
      <Switch>
        {/* Bridge operations - context-sensitive */}
        <Route path="/bridge">
          <ProtectedRoute 
            {...getRoutePermissions('/bridge')}
            user={currentUser}
            fallback={<VesselStateRestriction currentState={vesselStatus} />}
          >
            <BridgeInterface />
          </ProtectedRoute>
        </Route>

        {/* Maintenance - only when safe */}
        <Route path="/maintenance">
          <ProtectedRoute 
            permissions={['maintenance_access']}
            roles={['chief_engineer', 'second_engineer']}
            user={currentUser}
            fallback={
              vesselStatus === 'underway' ? 
                <MaintenanceRestricted reason="Vessel underway" /> :
                <UnauthorizedAccess />
            }
          >
            <MaintenancePanel />
          </ProtectedRoute>
        </Route>

        {/* Port operations */}
        <Route path="/port">
          <ProtectedRoute 
            permissions={['port_operations']}
            user={currentUser}
            fallback={
              vesselStatus !== 'in_port' ?
                <PortOperationsUnavailable currentStatus={vesselStatus} /> :
                <UnauthorizedAccess />
            }
          >
            <PortOperationsInterface />
          </ProtectedRoute>
        </Route>
      </Switch>
    </div>
  );
}
```

## Role-Based Route Groups
```tsx
function RoleBasedRouteGroups() {
  const currentUser = useMaritimeUser();

  // Define route groups by maritime role
  const ROLE_ROUTE_GROUPS = {
    master: [
      '/bridge/all',
      '/emergency/all',
      '/crew/management',
      '/vessel/override',
      '/compliance/full'
    ],
    chief_officer: [
      '/bridge/navigation',
      '/cargo/operations',
      '/crew/watchkeeping',
      '/safety/procedures'
    ],
    chief_engineer: [
      '/engine/all',
      '/maintenance/planning',
      '/safety/technical',
      '/compliance/technical'
    ],
    fleet_manager: [
      '/fleet/overview',
      '/performance/analytics',
      '/compliance/reporting',
      '/crew/assignments'
    ],
    marine_superintendent: [
      '/technical/management',
      '/maintenance/oversight',
      '/compliance/auditing',
      '/vessel/inspections'
    ]
  };

  const getUserAccessibleRoutes = (user: User) => {
    const accessibleRoutes = new Set<string>();
    
    user.roles.forEach(role => {
      const roleRoutes = ROLE_ROUTE_GROUPS[role.id] || [];
      roleRoutes.forEach(route => accessibleRoutes.add(route));
    });

    return Array.from(accessibleRoutes);
  };

  const accessibleRoutes = getUserAccessibleRoutes(currentUser);

  return (
    <div className="role-based-routing">
      <NavigationMenu 
        availableRoutes={accessibleRoutes}
        currentUser={currentUser}
      />

      <Switch>
        {/* Master-level routes */}
        <Route path="/bridge/all">
          <ProtectedRoute roles={['master']} user={currentUser}>
            <CompleteBridgeInterface />
          </ProtectedRoute>
        </Route>

        <Route path="/emergency/all">
          <ProtectedRoute 
            roles={['master']} 
            user={currentUser}
            onAccessDenied={() => logCriticalAccessAttempt(currentUser.id)}
          >
            <EmergencyCommandCenter />
          </ProtectedRoute>
        </Route>

        {/* Chief Officer routes */}
        <Route path="/cargo/operations">
          <ProtectedRoute 
            roles={['master', 'chief_officer', 'cargo_officer']}
            user={currentUser}
          >
            <CargoOperationsCenter />
          </ProtectedRoute>
        </Route>

        {/* Engineer routes */}
        <Route path="/engine/all">
          <ProtectedRoute 
            roles={['chief_engineer', 'second_engineer']}
            user={currentUser}
          >
            <EngineRoomInterface />
          </ProtectedRoute>
        </Route>

        {/* Shore management routes */}
        <Route path="/fleet/overview">
          <ProtectedRoute 
            roles={['fleet_manager', 'marine_superintendent']}
            user={currentUser}
          >
            <FleetOverviewDashboard />
          </ProtectedRoute>
        </Route>
      </Switch>
    </div>
  );
}
```

## Props Details

### permission
- **Type**: `string`
- **Required**: No
- **Description**: Single permission required for access
- **Example**: `"navigation_control"`

### permissions
- **Type**: `string[]`
- **Required**: No
- **Description**: Array of permissions for access control
- **Example**: `["deck_operations", "cargo_management"]`

### roles
- **Type**: `string[]`
- **Required**: No
- **Description**: Array of roles granted access
- **Example**: `["master", "chief_officer"]`

### requireAll
- **Type**: `boolean`
- **Required**: No
- **Description**: Require ALL permissions/roles vs ANY
- **Default**: `false`

### redirectTo
- **Type**: `string`
- **Required**: No
- **Description**: Redirect path when access denied
- **Example**: `"/login"` or `"/dashboard"`

### fallback
- **Type**: `React.ReactNode`
- **Required**: No
- **Description**: Component to render when access denied
- **Alternative**: Use redirectTo for navigation

### strict
- **Type**: `boolean`
- **Required**: No
- **Description**: Enable strict permission checking
- **Default**: `false`

## Styling
```css
.maritime-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

.access-denied-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px;
  text-align: center;
}

.critical-access-denied {
  border: 2px solid #e53e3e;
  background: #fed7d7;
  border-radius: 8px;
  padding: 24px;
  margin: 20px;
}

.vessel-state-restriction {
  background: #fef5e7;
  border: 1px solid #f6ad55;
  border-radius: 6px;
  padding: 16px;
  margin: 16px;
  color: #744210;
}

.role-based-routing {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.navigation-menu {
  background: #16569e;
  color: white;
  padding: 20px;
}

.route-content {
  padding: 24px;
  overflow-y: auto;
}
```

## Context Requirements
1. **Router Integration**: Compatible with wouter, React Router, or similar
2. **User Context**: Access to current user and authentication state
3. **Permission System**: Defined permissions and role hierarchy
4. **Navigation State**: Current route and navigation capabilities

## Common Use Cases
- **Bridge Access Control**: Restrict navigation controls to qualified officers
- **Engine Room Security**: Limit engine operations to certified engineers
- **Emergency Procedures**: Critical functions accessible only to authorized personnel
- **Cargo Operations**: Secure cargo and ballast management interfaces
- **Shore Management**: Fleet oversight restricted to shore-based personnel
- **Compliance Access**: Regulatory and audit functions for authorized users

## Troubleshooting

### Route Access Issues
- Verify user permissions and roles
- Check route path configuration
- Ensure proper user context provider
- Validate router integration

### Redirect Loops
- Check fallback vs. redirectTo configuration
- Verify default route accessibility
- Ensure login route is publicly accessible
- Review route hierarchy and dependencies

### Performance Problems
- Optimize permission checking logic
- Cache user permissions
- Implement route preloading for authorized paths
- Consider lazy loading for protected components

### Security Concerns
- Implement server-side route validation
- Log all access attempts and denials
- Regular audit of route permissions
- Monitor for unauthorized access patterns

This component ensures that maritime applications maintain proper access control at the routing level, preventing unauthorized access to critical vessel operations and maintaining compliance with maritime security protocols.