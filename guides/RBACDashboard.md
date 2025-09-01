# RBACDashboard Component

## Overview
The `RBACDashboard` component provides a comprehensive administrative interface for managing roles, permissions, and user assignments in maritime fleet management systems. It offers real-time monitoring of access control configurations and compliance status.

## Props Interface
```typescript
interface RBACDashboardProps {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  onUserUpdate?: (user: User) => Promise<void>;
  onRoleUpdate?: (role: Role) => Promise<void>;
  onPermissionUpdate?: (permission: Permission) => Promise<void>;
  showMetrics?: boolean;
  showAuditLog?: boolean;
  refreshInterval?: number;
  className?: string;
  complianceStandards?: ComplianceStandard[];
}

interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  requiredRoles: string[];
  validationRules: ValidationRule[];
}

interface ValidationRule {
  type: 'role_count' | 'certification' | 'hierarchy' | 'department';
  rule: string;
  message: string;
}
```

## Basic Usage
```tsx
import { RBACDashboard } from 'scomp-ui/sail-ui-kit';

function AdministrationPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  // Maritime compliance standards
  const complianceStandards = [
    {
      id: 'tmsa',
      name: 'TMSA Compliance',
      description: 'Tanker Management and Self Assessment compliance',
      requiredRoles: ['master', 'chief_officer', 'safety_officer'],
      validationRules: [
        {
          type: 'role_count',
          rule: 'master >= 1',
          message: 'At least one Master required per vessel'
        },
        {
          type: 'certification',
          rule: 'safety_officer.certificates includes STCW',
          message: 'Safety officer must have STCW certification'
        }
      ]
    },
    {
      id: 'ism',
      name: 'ISM Code Compliance',
      description: 'International Safety Management compliance',
      requiredRoles: ['designated_person', 'company_security_officer'],
      validationRules: [
        {
          type: 'role_count',
          rule: 'designated_person >= 1',
          message: 'Designated Person Ashore required'
        }
      ]
    }
  ];

  const handleUserUpdate = async (user: User) => {
    try {
      await updateUser(user);
      setUsers(prev => prev.map(u => u.id === user.id ? user : u));
      showNotification('User updated successfully');
    } catch (error) {
      showError('Failed to update user');
    }
  };

  const handleRoleUpdate = async (role: Role) => {
    try {
      await updateRole(role);
      setRoles(prev => prev.map(r => r.id === role.id ? role : r));
      showNotification('Role updated successfully');
    } catch (error) {
      showError('Failed to update role');
    }
  };

  return (
    <div className="administration-panel">
      <h1>Maritime RBAC Administration</h1>
      
      <RBACDashboard
        users={users}
        roles={roles}
        permissions={permissions}
        onUserUpdate={handleUserUpdate}
        onRoleUpdate={handleRoleUpdate}
        onPermissionUpdate={handlePermissionUpdate}
        showMetrics={true}
        showAuditLog={true}
        refreshInterval={30000} // 30 seconds
        complianceStandards={complianceStandards}
        className="maritime-rbac-dashboard"
      />
    </div>
  );
}
```

## Advanced Maritime Dashboard
```tsx
function AdvancedMaritimeRBACDashboard() {
  const [dashboardData, setDashboardData] = useState({
    metrics: null,
    auditLog: [],
    complianceStatus: null,
    alerts: []
  });

  // Maritime-specific metrics
  const calculateMaritimeMetrics = (users: User[], roles: Role[]) => {
    const deckOfficers = users.filter(u => 
      u.roles.some(r => r.department === 'deck')
    ).length;
    
    const engineOfficers = users.filter(u => 
      u.roles.some(r => r.department === 'engine')
    ).length;
    
    const shorePersonnel = users.filter(u => 
      u.roles.some(r => r.department === 'shore')
    ).length;

    const certificatedOfficers = users.filter(u => 
      u.certificateNumber && u.certificateNumber.length > 0
    ).length;

    const activeVessels = new Set(
      users.flatMap(u => u.vesselAssignments || [])
    ).size;

    return {
      totalUsers: users.length,
      deckOfficers,
      engineOfficers,
      shorePersonnel,
      certificatedOfficers,
      activeVessels,
      complianceScore: calculateComplianceScore(users, roles)
    };
  };

  const calculateComplianceScore = (users: User[], roles: Role[]) => {
    // TMSA compliance scoring
    const requiredRoles = ['master', 'chief_officer', 'chief_engineer', 'safety_officer'];
    const fulfillmentScore = requiredRoles.map(roleId => {
      const usersWithRole = users.filter(u => 
        u.roles.some(r => r.id === roleId)
      ).length;
      return usersWithRole >= 1 ? 1 : 0;
    }).reduce((sum, score) => sum + score, 0);

    return (fulfillmentScore / requiredRoles.length) * 100;
  };

  const maritimeComplianceStandards = [
    {
      id: 'tmsa',
      name: 'TMSA (Tanker Management and Self Assessment)',
      description: 'Oil industry self-assessment program',
      requiredRoles: ['master', 'chief_officer', 'chief_engineer', 'safety_officer'],
      validationRules: [
        {
          type: 'role_count',
          rule: 'master >= 1 per vessel',
          message: 'Each vessel must have a qualified Master'
        },
        {
          type: 'certification',
          rule: 'officers must have valid STCW',
          message: 'All officers require valid STCW certificates'
        },
        {
          type: 'hierarchy',
          rule: 'clear command structure',
          message: 'Must maintain clear chain of command'
        }
      ]
    },
    {
      id: 'ism',
      name: 'ISM Code',
      description: 'International Safety Management Code',
      requiredRoles: ['designated_person', 'company_security_officer'],
      validationRules: [
        {
          type: 'role_count',
          rule: 'designated_person >= 1 per company',
          message: 'Company must have Designated Person Ashore'
        }
      ]
    },
    {
      id: 'marpol',
      name: 'MARPOL Compliance',
      description: 'Marine Pollution Prevention',
      requiredRoles: ['environmental_officer', 'master'],
      validationRules: [
        {
          type: 'certification',
          rule: 'environmental_officer certified',
          message: 'Environmental officer must be certified'
        }
      ]
    }
  ];

  return (
    <div className="advanced-maritime-dashboard">
      <div className="dashboard-header">
        <h1>Maritime Fleet RBAC Dashboard</h1>
        <div className="compliance-indicators">
          <ComplianceIndicator 
            standard="TMSA" 
            score={dashboardData.metrics?.complianceScore || 0}
          />
          <FleetStatusOverview 
            activeVessels={dashboardData.metrics?.activeVessels || 0}
            totalOfficers={dashboardData.metrics?.deckOfficers + dashboardData.metrics?.engineOfficers || 0}
          />
        </div>
      </div>

      <RBACDashboard
        users={users}
        roles={roles}
        permissions={permissions}
        onUserUpdate={handleUserUpdate}
        onRoleUpdate={handleRoleUpdate}
        onPermissionUpdate={handlePermissionUpdate}
        showMetrics={true}
        showAuditLog={true}
        complianceStandards={maritimeComplianceStandards}
        refreshInterval={15000}
        className="maritime-advanced-dashboard"
      />

      {/* Custom Maritime Metrics */}
      <div className="maritime-metrics">
        <MetricCard 
          title="Deck Officers" 
          value={dashboardData.metrics?.deckOfficers || 0}
          icon="helm"
        />
        <MetricCard 
          title="Engine Officers" 
          value={dashboardData.metrics?.engineOfficers || 0}
          icon="cog"
        />
        <MetricCard 
          title="Shore Personnel" 
          value={dashboardData.metrics?.shorePersonnel || 0}
          icon="building"
        />
        <MetricCard 
          title="Certified Officers" 
          value={dashboardData.metrics?.certificatedOfficers || 0}
          icon="certificate"
        />
      </div>

      {/* Real-time Alerts */}
      <AlertPanel alerts={dashboardData.alerts} />
    </div>
  );
}
```

## User Management Integration
```tsx
function UserManagementDashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userOperations, setUserOperations] = useState({
    creating: false,
    updating: false,
    deleting: false
  });

  const handleCreateUser = async (userData: Partial<User>) => {
    setUserOperations(prev => ({ ...prev, creating: true }));
    try {
      const newUser = await createUser({
        ...userData,
        id: generateUserId(),
        isActive: true,
        roles: []
      });
      
      setUsers(prev => [...prev, newUser]);
      showNotification('User created successfully');
    } catch (error) {
      showError('Failed to create user');
    } finally {
      setUserOperations(prev => ({ ...prev, creating: false }));
    }
  };

  const handleBulkUserOperations = async (userIds: string[], operation: string) => {
    try {
      switch (operation) {
        case 'activate':
          await Promise.all(userIds.map(id => updateUserStatus(id, true)));
          break;
        case 'deactivate':
          await Promise.all(userIds.map(id => updateUserStatus(id, false)));
          break;
        case 'export':
          await exportUserData(userIds);
          break;
      }
      showNotification(`Bulk ${operation} completed successfully`);
    } catch (error) {
      showError(`Bulk ${operation} failed`);
    }
  };

  return (
    <div className="user-management-dashboard">
      <RBACDashboard
        users={users}
        roles={roles}
        permissions={permissions}
        onUserUpdate={handleUserUpdate}
        onRoleUpdate={handleRoleUpdate}
        onPermissionUpdate={handlePermissionUpdate}
        showMetrics={true}
        showAuditLog={true}
      />

      {/* User Creation Modal */}
      <UserCreationModal 
        isOpen={userOperations.creating}
        onClose={() => setUserOperations(prev => ({ ...prev, creating: false }))}
        onSubmit={handleCreateUser}
        availableRoles={roles}
      />

      {/* Bulk Operations Panel */}
      <BulkOperationsPanel 
        selectedUsers={selectedUsers}
        onBulkOperation={handleBulkUserOperations}
      />

      {/* User Detail Panel */}
      {selectedUser && (
        <UserDetailPanel 
          user={selectedUser}
          onUpdate={handleUserUpdate}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
```

## Audit and Compliance Monitoring
```tsx
function AuditComplianceDashboard() {
  const [auditData, setAuditData] = useState({
    recentChanges: [],
    complianceViolations: [],
    accessAttempts: [],
    systemHealth: {}
  });

  const complianceMonitoring = {
    tmsa: {
      elements: [
        { id: 1, name: 'Safety Management', status: 'compliant' },
        { id: 2, name: 'Bridge Management', status: 'warning' },
        { id: 3, name: 'Cargo Management', status: 'compliant' },
        { id: 4, name: 'Maintenance', status: 'non-compliant' }
      ]
    },
    stcw: {
      certifications: [
        { type: 'Officer of the Watch', expiring: 3, expired: 0 },
        { type: 'Chief Mate', expiring: 1, expired: 0 },
        { type: 'Master Mariner', expiring: 0, expired: 1 }
      ]
    }
  };

  const auditReports = [
    {
      id: 'audit_001',
      type: 'Role Assignment',
      timestamp: new Date(),
      user: 'admin_001',
      action: 'Assigned Master role to user_123',
      severity: 'info'
    },
    {
      id: 'audit_002',
      type: 'Permission Denied',
      timestamp: new Date(),
      user: 'user_456',
      action: 'Attempted to access engine controls',
      severity: 'warning'
    },
    {
      id: 'audit_003',
      type: 'Compliance Violation',
      timestamp: new Date(),
      user: 'system',
      action: 'TMSA Element 4 non-compliance detected',
      severity: 'critical'
    }
  ];

  return (
    <div className="audit-compliance-dashboard">
      <div className="compliance-overview">
        <h2>Maritime Compliance Status</h2>
        
        <div className="tmsa-compliance">
          <h3>TMSA Elements</h3>
          <ComplianceElementGrid elements={complianceMonitoring.tmsa.elements} />
        </div>

        <div className="certification-status">
          <h3>STCW Certifications</h3>
          <CertificationStatusPanel 
            certifications={complianceMonitoring.stcw.certifications}
          />
        </div>
      </div>

      <RBACDashboard
        users={users}
        roles={roles}
        permissions={permissions}
        onUserUpdate={handleUserUpdate}
        onRoleUpdate={handleRoleUpdate}
        onPermissionUpdate={handlePermissionUpdate}
        showMetrics={true}
        showAuditLog={true}
        complianceStandards={maritimeComplianceStandards}
      />

      {/* Audit Log Panel */}
      <div className="audit-log-panel">
        <h3>Security Audit Log</h3>
        <AuditLogTable 
          entries={auditReports}
          onExport={exportAuditLog}
          filters={['info', 'warning', 'critical']}
        />
      </div>

      {/* Real-time Alerts */}
      <div className="compliance-alerts">
        <AlertSystem 
          violations={auditData.complianceViolations}
          onAcknowledge={acknowledgeViolation}
        />
      </div>
    </div>
  );
}
```

## Props Details

### users
- **Type**: `User[]`
- **Required**: Yes
- **Description**: Array of users in the system
- **Example**: Users with maritime roles and certifications

### roles
- **Type**: `Role[]`
- **Required**: Yes
- **Description**: Available roles in the system
- **Example**: Maritime organizational hierarchy

### permissions
- **Type**: `Permission[]`
- **Required**: Yes
- **Description**: System permissions and capabilities

### showMetrics
- **Type**: `boolean`
- **Required**: No
- **Description**: Display metrics dashboard
- **Default**: `true`

### showAuditLog
- **Type**: `boolean`
- **Required**: No
- **Description**: Display audit log panel
- **Default**: `true`

### complianceStandards
- **Type**: `ComplianceStandard[]`
- **Required**: No
- **Description**: Maritime compliance standards to monitor

### refreshInterval
- **Type**: `number`
- **Required**: No
- **Description**: Auto-refresh interval in milliseconds
- **Default**: `60000` (1 minute)

## Styling
```css
.maritime-rbac-dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  background: #f8fafc;
}

.dashboard-header {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.compliance-indicators {
  display: flex;
  gap: 16px;
  align-items: center;
}

.maritime-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.metric-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.compliance-overview {
  background: white;
  border: 1px solid #16569e;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.audit-log-panel {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.compliance-alerts {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

.alert-critical {
  border-left: 4px solid #e53e3e;
  background: #fed7d7;
}

.alert-warning {
  border-left: 4px solid #f6ad55;
  background: #feebc8;
}

.alert-info {
  border-left: 4px solid #16569e;
  background: #bee3f8;
}
```

## Context Requirements
1. **Authentication System**: User session management
2. **Permission System**: Comprehensive permission definitions
3. **Audit System**: Activity logging and monitoring
4. **Compliance Framework**: Maritime regulation tracking

## Common Use Cases
- **Fleet Management**: Centralized crew and role management
- **Compliance Monitoring**: TMSA, ISM, STCW compliance tracking
- **Security Administration**: Access control and audit management
- **Organizational Management**: Maritime hierarchy and department structure
- **Certification Tracking**: Officer qualification and renewal monitoring
- **Emergency Response**: Rapid role assignments and access control

## Troubleshooting

### Dashboard Performance Issues
- Implement data pagination for large user bases
- Use virtualization for long lists
- Optimize refresh intervals based on system load
- Cache frequently accessed data

### Compliance Calculation Errors
- Verify compliance standard definitions
- Check validation rule logic
- Ensure data consistency across systems
- Regular compliance rule updates

### Audit Log Problems
- Check audit event capture configuration
- Verify log storage and retention policies
- Monitor audit system performance
- Implement log rotation and archival

### Real-time Updates
- Verify WebSocket connections for live updates
- Check refresh interval configurations
- Monitor server-side event emission
- Implement fallback polling mechanisms

This dashboard component serves as the central command center for maritime RBAC operations, providing administrators with comprehensive tools for managing crew access, monitoring compliance, and maintaining security across fleet operations.