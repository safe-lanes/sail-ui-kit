# PermissionGuard Component Guide

## Overview
The PermissionGuard component provides role-based access control (RBAC) for maritime applications. It conditionally renders content based on user permissions and roles, ensuring secure access to sensitive features.

## Component Interface

```typescript
interface PermissionGuardProps {
  permissions?: string[]; // Required permissions
  roles?: string[]; // Required roles  
  requireAll?: boolean; // true = AND logic, false = OR logic (default: false)
  fallback?: React.ReactNode; // Content to show when access denied
  children: React.ReactNode; // Protected content
  user?: User; // Current user context
  onAccessDenied?: () => void; // Callback for denied access
}

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  rank?: string;
  vesselAssignments?: string[];
}
```

## Basic Usage

```jsx
import { PermissionGuard } from 'scomp-ui';

function VesselManagement() {
  return (
    <div>
      <h1>Fleet Management</h1>
      
      {/* Only show to users with 'vessel:create' permission */}
      <PermissionGuard permissions={['vessel:create']}>
        <button>Add New Vessel</button>
      </PermissionGuard>

      {/* Only show to Fleet Managers or Masters */}
      <PermissionGuard roles={['fleet_manager', 'master']}>
        <div className="admin-panel">
          <h2>Administrative Functions</h2>
          <button>Generate Reports</button>
        </div>
      </PermissionGuard>
    </div>
  );
}
```

## Advanced Usage with Multiple Permissions

```jsx
import { PermissionGuard } from 'scomp-ui';

function CrewManagement() {
  const currentUser = {
    id: '123',
    name: 'John Smith',
    email: 'john@maritime.com',
    roles: ['chief_officer', 'crew_manager'],
    permissions: ['crew:read', 'crew:create', 'reports:generate'],
    rank: 'Chief Officer',
    vesselAssignments: ['mv-atlantic-star']
  };

  return (
    <div>
      {/* Require ANY of the specified permissions (OR logic) */}
      <PermissionGuard 
        permissions={['crew:read', 'crew:manage']}
        requireAll={false}
        user={currentUser}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Status</th>
            </tr>
          </thead>
          {/* Crew table content */}
        </table>
      </PermissionGuard>

      {/* Require ALL permissions (AND logic) */}
      <PermissionGuard 
        permissions={['crew:create', 'reports:generate']}
        requireAll={true}
        user={currentUser}
        fallback={<p>Insufficient permissions to add crew members</p>}
      >
        <button>Add Crew Member</button>
      </PermissionGuard>

      {/* Multiple roles with fallback */}
      <PermissionGuard 
        roles={['master', 'fleet_manager']}
        user={currentUser}
        fallback={
          <div className="text-gray-500 p-4 border rounded">
            <p>Access restricted to Masters and Fleet Managers only</p>
          </div>
        }
        onAccessDenied={() => console.log('Access denied logged')}
      >
        <div className="sensitive-operations">
          <h3>Critical Operations</h3>
          <button>Emergency Protocols</button>
          <button>Route Override</button>
        </div>
      </PermissionGuard>
    </div>
  );
}
```

## Usage with RBACProvider Context

```jsx
import { RBACProvider, PermissionGuard } from 'scomp-ui';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch user data from authentication service
    fetchCurrentUser().then(setCurrentUser);
  }, []);

  return (
    <RBACProvider user={currentUser}>
      <div className="app">
        <Navigation />
        
        {/* Guards now automatically use user from context */}
        <PermissionGuard permissions={['dashboard:view']}>
          <Dashboard />
        </PermissionGuard>

        <PermissionGuard 
          roles={['admin', 'fleet_manager']}
          fallback={<UnauthorizedPage />}
        >
          <AdminPanel />
        </PermissionGuard>
      </div>
    </RBACProvider>
  );
}
```

## Common Maritime Permission Patterns

```jsx
// Maritime-specific permission examples
function MaritimePermissions() {
  return (
    <div>
      {/* Vessel Operations */}
      <PermissionGuard permissions={['vessel:navigate']}>
        <NavigationControls />
      </PermissionGuard>

      {/* Safety & Compliance */}
      <PermissionGuard 
        permissions={['safety:manage', 'compliance:audit']}
        requireAll={true}
      >
        <SafetyAuditPanel />
      </PermissionGuard>

      {/* Crew Management */}
      <PermissionGuard roles={['master', 'chief_officer']}>
        <CrewScheduling />
      </PermissionGuard>

      {/* Port Operations */}
      <PermissionGuard permissions={['port:operations']}>
        <PortManagement />
      </PermissionGuard>

      {/* Emergency Procedures */}
      <PermissionGuard 
        roles={['master']}
        fallback={<p>Master authorization required</p>}
      >
        <EmergencyProtocols />
      </PermissionGuard>
    </div>
  );
}
```

## Role Hierarchy Examples

```jsx
// Define role hierarchy for maritime operations
const maritimeRoles = {
  'master': {
    permissions: ['*'], // Full access
    description: 'Ship Master - Ultimate authority'
  },
  'chief_officer': {
    permissions: ['navigation:*', 'crew:manage', 'safety:*'],
    description: 'Chief Officer - Second in command'
  },
  'second_officer': {
    permissions: ['navigation:read', 'crew:read', 'watch:manage'],
    description: 'Second Officer - Watch keeping'
  },
  'fleet_manager': {
    permissions: ['fleet:*', 'reports:*', 'vessel:*'],
    description: 'Shore-based fleet management'
  },
  'port_agent': {
    permissions: ['port:operations', 'cargo:manage', 'documentation:*'],
    description: 'Port operations and documentation'
  }
};

// Usage with role-based content
<PermissionGuard roles={['master', 'chief_officer']}>
  <BridgeControls />
</PermissionGuard>
```

## Context Requirements
- **Optional RBACProvider**: Can use RBACProvider for global user context
- **User prop**: Pass user directly if not using provider
- **No form context needed**: Independent of form systems

## Best Practices
1. **Granular Permissions**: Use specific permissions like 'crew:create' vs broad 'admin'
2. **Meaningful Fallbacks**: Provide clear explanations when access is denied
3. **Role Hierarchies**: Implement clear role structures matching maritime organization
4. **Audit Logging**: Use onAccessDenied callback for security audit trails
5. **Progressive Enhancement**: Show appropriate content based on permission levels

## Security Considerations
- Always validate permissions server-side as well
- PermissionGuard is for UI/UX only, not actual security enforcement
- Use HTTPS and secure authentication for production deployments
- Implement proper session management and token validation

## Common Use Cases
- Navigation and bridge control access
- Crew management by rank/role
- Safety and compliance features
- Emergency procedure authorization
- Fleet management operations
- Port and cargo operations
- Administrative and reporting functions