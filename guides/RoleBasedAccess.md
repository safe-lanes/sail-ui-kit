# RoleBasedAccess Component

## Overview
The `RoleBasedAccess` component provides role-based content rendering for maritime fleet management applications. It controls access to UI elements based on user roles, implementing hierarchical permission systems common in maritime operations.

## Props Interface
```typescript
interface RoleBasedAccessProps {
  children: React.ReactNode;
  roles: string[];
  fallback?: React.ReactNode;
  requireAll?: boolean;
  user?: User;
  onAccessDenied?: () => void;
  className?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  roles: Role[];
  isActive: boolean;
  avatar?: string;
}

interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isActive: boolean;
}
```

## Basic Usage
```tsx
import { RoleBasedAccess } from 'scomp-ui/sail-ui-kit';

function VesselOperationsPanel() {
  const maritimeUser = {
    id: 'usr_001',
    username: 'captain_smith',
    email: 'captain@maritimefleet.com',
    name: 'Captain John Smith',
    roles: [
      { id: 'master', name: 'Master', isActive: true, permissions: [] },
      { id: 'navigator', name: 'Navigator', isActive: true, permissions: [] }
    ],
    isActive: true
  };

  return (
    <div className="vessel-operations">
      {/* Bridge Controls - Masters and Chief Officers only */}
      <RoleBasedAccess 
        roles={['master', 'chief_officer']}
        user={maritimeUser}
      >
        <div className="bridge-controls">
          <h3>Bridge Navigation Controls</h3>
          <button>Autopilot Override</button>
          <button>Course Adjustment</button>
        </div>
      </RoleBasedAccess>

      {/* Engine Room Access - Engineers only */}
      <RoleBasedAccess 
        roles={['chief_engineer', 'second_engineer']}
        user={maritimeUser}
        fallback={<div>Engine room access restricted</div>}
      >
        <EngineControls />
      </RoleBasedAccess>

      {/* Emergency Procedures - Senior Officers */}
      <RoleBasedAccess 
        roles={['master', 'chief_officer', 'chief_engineer']}
        user={maritimeUser}
        requireAll={false}
      >
        <EmergencyProcedures />
      </RoleBasedAccess>
    </div>
  );
}
```

## Maritime Role Hierarchy
```tsx
// Define comprehensive maritime role structure
const MARITIME_ROLE_HIERARCHY = {
  // Deck Department
  master: {
    name: 'Master/Captain',
    level: 1,
    department: 'deck',
    description: 'Ultimate authority and responsibility for vessel'
  },
  chief_officer: {
    name: 'Chief Officer',
    level: 2,
    department: 'deck', 
    description: 'Second in command, cargo operations'
  },
  second_officer: {
    name: 'Second Officer',
    level: 3,
    department: 'deck',
    description: 'Navigation officer, watch keeping'
  },
  third_officer: {
    name: 'Third Officer',
    level: 4,
    department: 'deck',
    description: 'Junior navigation officer'
  },

  // Engine Department
  chief_engineer: {
    name: 'Chief Engineer',
    level: 1,
    department: 'engine',
    description: 'Responsible for all mechanical systems'
  },
  second_engineer: {
    name: 'Second Engineer',
    level: 2,
    department: 'engine',
    description: 'Assistant to Chief Engineer'
  },
  third_engineer: {
    name: 'Third Engineer',
    level: 3,
    department: 'engine',
    description: 'Watch keeping engineer'
  },

  // Shore Management
  fleet_manager: {
    name: 'Fleet Manager',
    level: 1,
    department: 'shore',
    description: 'Shore-based fleet operations management'
  },
  marine_superintendent: {
    name: 'Marine Superintendent',
    level: 2,
    department: 'shore',
    description: 'Technical vessel management'
  },
  port_agent: {
    name: 'Port Agent',
    level: 3,
    department: 'shore',
    description: 'Port operations coordination'
  }
};

function FleetManagementDashboard() {
  return (
    <div className="fleet-dashboard">
      {/* Senior Command - Master level access */}
      <RoleBasedAccess roles={['master']}>
        <div className="command-center">
          <h2>Command Center</h2>
          <CriticalOperations />
          <EmergencyOverride />
        </div>
      </RoleBasedAccess>

      {/* Officer Level - Multiple roles */}
      <RoleBasedAccess 
        roles={['master', 'chief_officer', 'chief_engineer']}
        requireAll={false}
      >
        <OfficerOperations />
      </RoleBasedAccess>

      {/* Shore Management */}
      <RoleBasedAccess 
        roles={['fleet_manager', 'marine_superintendent']}
        fallback={<div>Shore management access required</div>}
      >
        <ShoreOperations />
      </RoleBasedAccess>

      {/* Department Specific Access */}
      <div className="department-sections">
        <RoleBasedAccess roles={['master', 'chief_officer', 'second_officer', 'third_officer']}>
          <DeckOperations />
        </RoleBasedAccess>

        <RoleBasedAccess roles={['chief_engineer', 'second_engineer', 'third_engineer']}>
          <EngineOperations />
        </RoleBasedAccess>
      </div>
    </div>
  );
}
```

## Advanced Role Combinations
```tsx
function ComplexAccessControl() {
  const currentUser = useMaritimeUser();

  return (
    <div className="complex-access">
      {/* Require specific role combination - All required */}
      <RoleBasedAccess 
        roles={['master', 'safety_officer']}
        requireAll={true}
        user={currentUser}
        fallback={
          <div className="access-denied">
            <h4>Restricted Access</h4>
            <p>Requires both Master and Safety Officer roles</p>
          </div>
        }
        onAccessDenied={() => {
          auditLog('Critical safety access denied', currentUser.id);
        }}
      >
        <CriticalSafetyControls />
      </RoleBasedAccess>

      {/* Any senior officer role */}
      <RoleBasedAccess 
        roles={['master', 'chief_officer', 'chief_engineer']}
        requireAll={false}
        user={currentUser}
      >
        <SeniorOfficerPanel />
      </RoleBasedAccess>

      {/* Watch keeping officers */}
      <RoleBasedAccess 
        roles={['second_officer', 'third_officer', 'officer_of_watch']}
        user={currentUser}
      >
        <WatchKeepingInterface />
      </RoleBasedAccess>

      {/* Shore vs. Sea roles */}
      <RoleBasedAccess 
        roles={['fleet_manager', 'marine_superintendent', 'port_agent']}
        user={currentUser}
        className="shore-operations"
      >
        <ShoreBasedOperations />
      </RoleBasedAccess>
    </div>
  );
}
```

## Integration with RBAC Provider
```tsx
import { RBACProvider, RoleBasedAccess, useRBAC } from 'scomp-ui/sail-ui-kit';

function MaritimeApplication() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <RBACProvider initialUser={currentUser}>
      <div className="maritime-app">
        <Navigation />
        
        {/* Uses user from RBAC context automatically */}
        <RoleBasedAccess roles={['master', 'chief_officer']}>
          <BridgeInterface />
        </RoleBasedAccess>

        <RoleBasedAccess 
          roles={['fleet_manager']}
          fallback={<RestrictedFleetView />}
        >
          <ComprehensiveFleetDashboard />
        </RoleBasedAccess>
      </div>
    </RBACProvider>
  );
}

// Hook-based role checking
function NavigationPanel() {
  const { user, hasRole } = useRBAC();

  return (
    <div className="navigation-panel">
      {hasRole('navigator') && <NavigationTools />}
      
      <RoleBasedAccess roles={['master', 'chief_officer']}>
        <AdvancedNavigation />
      </RoleBasedAccess>
    </div>
  );
}
```

## Compliance and Audit Integration
```tsx
function TMSAComplianceAccess() {
  return (
    <div className="tmsa-compliance">
      {/* TMSA Element 1: Safety Management */}
      <RoleBasedAccess 
        roles={['master', 'safety_officer', 'marine_superintendent']}
        onAccessDenied={() => {
          auditLog('TMSA Safety Management access attempt denied');
        }}
      >
        <SafetyManagementPanel />
      </RoleBasedAccess>

      {/* TMSA Element 2: Bridge Management */}
      <RoleBasedAccess roles={['master', 'chief_officer', 'navigator']}>
        <BridgeManagementTools />
      </RoleBasedAccess>

      {/* TMSA Element 3: Cargo/Ballast Management */}
      <RoleBasedAccess 
        roles={['master', 'chief_officer', 'cargo_officer']}
        fallback={<CargoOperationsReadOnly />}
      >
        <CargoManagementControls />
      </RoleBasedAccess>

      {/* Fleet Performance Monitoring */}
      <RoleBasedAccess 
        roles={['fleet_manager', 'marine_superintendent']}
        className="performance-monitoring"
      >
        <FleetPerformanceAnalytics />
      </RoleBasedAccess>
    </div>
  );
}
```

## Props Details

### roles
- **Type**: `string[]`
- **Required**: Yes
- **Description**: Array of role names that are granted access
- **Example**: `['master', 'chief_officer']`

### requireAll
- **Type**: `boolean`
- **Required**: No
- **Description**: If true, user must have ALL specified roles; if false, ANY role grants access
- **Default**: `false`

### user
- **Type**: `User`
- **Required**: No (uses RBAC context if not provided)
- **Description**: User object containing role information

### fallback
- **Type**: `React.ReactNode`
- **Required**: No
- **Description**: Content to display when access is denied
- **Default**: `null`

### onAccessDenied
- **Type**: `() => void`
- **Required**: No
- **Description**: Callback triggered when access is denied
- **Example**: Audit logging, analytics, user notifications

## Styling
```css
.shore-operations {
  border: 2px solid #16569e;
  border-radius: 8px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 16px;
}

.access-denied {
  padding: 20px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  color: #856404;
  text-align: center;
}

.performance-monitoring {
  background: rgba(22, 86, 158, 0.05);
  border-left: 4px solid #16569e;
  padding: 16px;
}
```

## Context Requirements
1. **User Context**: User object with roles array
2. **Role System**: Consistent role naming across application
3. **RBAC Provider**: Optional but recommended for global state

## Common Use Cases
- **Bridge Operations**: Control access to navigation and vessel control systems
- **Engine Room Management**: Restrict engine controls to qualified engineers
- **Cargo Operations**: Limit cargo management to authorized officers
- **Safety Compliance**: Ensure safety procedures are managed by qualified personnel
- **Fleet Management**: Provide different views for shore vs. vessel personnel
- **Emergency Procedures**: Critical operations requiring senior officer authorization

## Troubleshooting

### Access Always Denied
- Verify user has correct roles assigned
- Check role name spelling and case sensitivity
- Ensure user object is properly formatted

### Roles Not Recognized
- Confirm role names match exactly between user and component
- Check that user.roles array is populated
- Verify role objects have correct structure

### Performance Issues
- Consider memoizing role checks for frequently rendered components
- Cache user role data at application level
- Use React.memo for RoleBasedAccess in lists

### Audit Trail
- Implement comprehensive logging for access attempts
- Track denied access for security monitoring
- Regular review of role assignments for compliance

This component is crucial for implementing proper role-based security in maritime applications, ensuring that vessel operations, safety procedures, and administrative functions are only accessible to appropriately qualified personnel.