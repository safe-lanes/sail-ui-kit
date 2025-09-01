# UserRoleAssignment Component

## Overview
The `UserRoleAssignment` component provides a comprehensive interface for managing user role assignments in maritime fleet management systems. It supports dynamic role assignment, hierarchy validation, and compliance with maritime organizational structures.

## Props Interface
```typescript
interface UserRoleAssignmentProps {
  user: User;
  availableRoles: Role[];
  onRoleAssignment: (userId: string, roleIds: string[]) => Promise<void>;
  onRoleRemoval: (userId: string, roleId: string) => Promise<void>;
  readOnly?: boolean;
  showHierarchy?: boolean;
  maxRoles?: number;
  allowSelfAssignment?: boolean;
  className?: string;
  validateAssignment?: (user: User, role: Role) => boolean;
}

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  roles: Role[];
  isActive: boolean;
  certificateNumber?: string;
  vesselAssignments?: string[];
  department?: 'deck' | 'engine' | 'catering' | 'shore';
}

interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isActive: boolean;
  level?: number;
  department?: string;
  requiredCertifications?: string[];
}
```

## Basic Usage
```tsx
import { UserRoleAssignment } from 'scomp-ui/sail-ui-kit';

function CrewManagement() {
  const maritimeUser = {
    id: 'crew_001',
    username: 'officer_johnson',
    email: 'johnson@vessel.com',
    name: 'Officer Sarah Johnson',
    roles: [
      { id: 'second_officer', name: 'Second Officer', isActive: true, permissions: [] }
    ],
    isActive: true,
    certificateNumber: 'OOW-2024-001',
    vesselAssignments: ['mv-atlantic-star'],
    department: 'deck'
  };

  const availableRoles = [
    {
      id: 'master',
      name: 'Master',
      description: 'Ship Master - Ultimate authority',
      level: 1,
      department: 'deck',
      requiredCertifications: ['Master Mariner'],
      isActive: true,
      permissions: []
    },
    {
      id: 'chief_officer',
      name: 'Chief Officer', 
      description: 'First Officer - Second in command',
      level: 2,
      department: 'deck',
      requiredCertifications: ['Chief Mate'],
      isActive: true,
      permissions: []
    },
    {
      id: 'second_officer',
      name: 'Second Officer',
      description: 'Navigation officer',
      level: 3,
      department: 'deck',
      requiredCertifications: ['Officer of the Watch'],
      isActive: true,
      permissions: []
    }
  ];

  const handleRoleAssignment = async (userId: string, roleIds: string[]) => {
    try {
      await updateUserRoles(userId, roleIds);
      showNotification('Roles updated successfully');
    } catch (error) {
      showError('Failed to update roles');
    }
  };

  const validateRoleAssignment = (user: User, role: Role) => {
    // Validate certifications
    if (role.requiredCertifications) {
      return role.requiredCertifications.every(cert => 
        user.certificateNumber?.includes(cert)
      );
    }
    return true;
  };

  return (
    <div className="crew-management">
      <h2>Crew Role Management</h2>
      
      <UserRoleAssignment
        user={maritimeUser}
        availableRoles={availableRoles}
        onRoleAssignment={handleRoleAssignment}
        onRoleRemoval={handleRoleRemoval}
        showHierarchy={true}
        validateAssignment={validateRoleAssignment}
        maxRoles={3}
        className="maritime-role-assignment"
      />
    </div>
  );
}
```

## Advanced Maritime Role Management
```tsx
function AdvancedRoleManagement() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleHistory, setRoleHistory] = useState<RoleChange[]>([]);

  // Define comprehensive maritime roles
  const MARITIME_ROLES = [
    // Deck Department Hierarchy
    {
      id: 'master',
      name: 'Master',
      description: 'Ship Master with ultimate authority',
      level: 1,
      department: 'deck',
      requiredCertifications: ['Master Mariner', 'STCW II/2'],
      isActive: true,
      permissions: []
    },
    {
      id: 'chief_officer',
      name: 'Chief Officer',
      description: 'First Officer responsible for cargo and deck operations',
      level: 2,
      department: 'deck',
      requiredCertifications: ['Chief Mate', 'STCW II/2'],
      isActive: true,
      permissions: []
    },
    {
      id: 'second_officer',
      name: 'Second Officer',
      description: 'Navigation officer and watch keeper',
      level: 3,
      department: 'deck',
      requiredCertifications: ['Officer of the Watch', 'STCW II/1'],
      isActive: true,
      permissions: []
    },

    // Engine Department
    {
      id: 'chief_engineer',
      name: 'Chief Engineer',
      description: 'Head of engine department',
      level: 1,
      department: 'engine',
      requiredCertifications: ['Chief Engineer', 'STCW III/2'],
      isActive: true,
      permissions: []
    },
    {
      id: 'second_engineer',
      name: 'Second Engineer',
      description: 'Assistant engineer officer',
      level: 2,
      department: 'engine',
      requiredCertifications: ['Second Engineer', 'STCW III/2'],
      isActive: true,
      permissions: []
    },

    // Shore Management
    {
      id: 'fleet_manager',
      name: 'Fleet Manager',
      description: 'Shore-based fleet operations management',
      level: 1,
      department: 'shore',
      requiredCertifications: ['Maritime Management'],
      isActive: true,
      permissions: []
    },
    {
      id: 'marine_superintendent',
      name: 'Marine Superintendent',
      description: 'Technical vessel management',
      level: 2,
      department: 'shore',
      requiredCertifications: ['Marine Engineering', 'Maritime Management'],
      isActive: true,
      permissions: []
    }
  ];

  const validateMaritimeRoleAssignment = (user: User, role: Role) => {
    // Check department compatibility
    if (user.department && role.department && 
        user.department !== role.department && 
        role.department !== 'shore') {
      return false;
    }

    // Validate certification requirements
    if (role.requiredCertifications) {
      const userCerts = user.certificateNumber?.split(',') || [];
      return role.requiredCertifications.some(cert => 
        userCerts.some(userCert => userCert.trim().includes(cert))
      );
    }

    // Check role level progression (can't skip levels)
    const currentMaxLevel = Math.min(...user.roles.map(r => r.level || 99));
    if (role.level && role.level < currentMaxLevel - 1) {
      return false;
    }

    return true;
  };

  const handleRoleAssignment = async (userId: string, roleIds: string[]) => {
    try {
      // Validate role hierarchy
      const newRoles = MARITIME_ROLES.filter(role => roleIds.includes(role.id));
      const conflicts = checkRoleConflicts(newRoles);
      
      if (conflicts.length > 0) {
        throw new Error(`Role conflicts detected: ${conflicts.join(', ')}`);
      }

      await updateUserRoles(userId, roleIds);
      
      // Log role change for audit
      const changeRecord = {
        userId,
        previousRoles: selectedUser?.roles.map(r => r.id) || [],
        newRoles: roleIds,
        timestamp: new Date(),
        assignedBy: getCurrentUser().id
      };
      
      setRoleHistory(prev => [...prev, changeRecord]);
      showNotification('Roles updated successfully');
      
    } catch (error) {
      showError(error.message);
    }
  };

  const checkRoleConflicts = (roles: Role[]) => {
    const conflicts = [];
    const departments = new Set(roles.map(r => r.department));
    
    // Check for multiple leadership roles in same department
    const deckLeaders = roles.filter(r => 
      r.department === 'deck' && (r.level || 0) <= 2
    );
    
    if (deckLeaders.length > 1) {
      conflicts.push('Multiple deck leadership roles');
    }

    return conflicts;
  };

  return (
    <div className="advanced-role-management">
      <div className="user-selection">
        <UserSelector onUserSelect={setSelectedUser} />
      </div>

      {selectedUser && (
        <div className="role-assignment-section">
          <UserRoleAssignment
            user={selectedUser}
            availableRoles={MARITIME_ROLES}
            onRoleAssignment={handleRoleAssignment}
            onRoleRemoval={handleRoleRemoval}
            showHierarchy={true}
            validateAssignment={validateMaritimeRoleAssignment}
            maxRoles={4}
            className="maritime-advanced-assignment"
          />

          {/* Role Change History */}
          <div className="role-history">
            <h4>Role Change History</h4>
            <RoleChangeHistory 
              changes={roleHistory.filter(change => change.userId === selectedUser.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

## Bulk Role Assignment
```tsx
function BulkRoleAssignment() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [targetRole, setTargetRole] = useState<Role | null>(null);

  const handleBulkAssignment = async () => {
    if (!targetRole) return;

    const assignments = selectedUsers.map(user => ({
      userId: user.id,
      roleId: targetRole.id,
      validated: validateRoleAssignment(user, targetRole)
    }));

    const validAssignments = assignments.filter(a => a.validated);
    const invalidAssignments = assignments.filter(a => !a.validated);

    if (invalidAssignments.length > 0) {
      showWarning(
        `${invalidAssignments.length} users don't meet requirements for ${targetRole.name}`
      );
    }

    try {
      await Promise.all(
        validAssignments.map(assignment =>
          assignRoleToUser(assignment.userId, assignment.roleId)
        )
      );

      showNotification(
        `Successfully assigned ${targetRole.name} to ${validAssignments.length} users`
      );
    } catch (error) {
      showError('Bulk assignment failed');
    }
  };

  return (
    <div className="bulk-assignment">
      <h3>Bulk Role Assignment</h3>
      
      <UserMultiSelect 
        onUsersSelect={setSelectedUsers}
        selectedUsers={selectedUsers}
      />

      <RoleSelector 
        roles={MARITIME_ROLES}
        onRoleSelect={setTargetRole}
        selectedRole={targetRole}
      />

      <div className="assignment-preview">
        {selectedUsers.map(user => (
          <div key={user.id} className="user-assignment-preview">
            <span>{user.name}</span>
            <span className={validateRoleAssignment(user, targetRole) ? 'valid' : 'invalid'}>
              {validateRoleAssignment(user, targetRole) ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>

      <button 
        onClick={handleBulkAssignment}
        disabled={!targetRole || selectedUsers.length === 0}
      >
        Assign Role to {selectedUsers.length} Users
      </button>
    </div>
  );
}
```

## TMSA Compliance Integration
```tsx
function TMSACompliantRoleAssignment() {
  const TMSA_REQUIRED_ROLES = {
    // TMSA Element 1: Safety Management
    safetyOfficer: {
      required: true,
      minCount: 1,
      maxCount: 2,
      description: 'TMSA requires designated safety officer'
    },
    
    // TMSA Element 2: Bridge Management
    navigationOfficer: {
      required: true,
      minCount: 3,
      maxCount: 5,
      description: 'Adequate navigation watch keeping'
    },

    // TMSA Element 3: Cargo Management
    cargoOfficer: {
      required: true,
      minCount: 1,
      maxCount: 2,
      description: 'Qualified cargo operations personnel'
    }
  };

  const validateTMSACompliance = (users: User[]) => {
    const compliance = {};
    
    Object.entries(TMSA_REQUIRED_ROLES).forEach(([roleType, requirements]) => {
      const userCount = users.filter(user => 
        user.roles.some(role => role.id.includes(roleType))
      ).length;

      compliance[roleType] = {
        current: userCount,
        required: requirements.minCount,
        compliant: userCount >= requirements.minCount && userCount <= requirements.maxCount
      };
    });

    return compliance;
  };

  return (
    <div className="tmsa-compliance">
      <h3>TMSA Compliant Role Assignment</h3>
      
      <TMSAComplianceIndicator compliance={validateTMSACompliance(users)} />
      
      <UserRoleAssignment
        user={selectedUser}
        availableRoles={MARITIME_ROLES}
        onRoleAssignment={handleRoleAssignment}
        onRoleRemoval={handleRoleRemoval}
        validateAssignment={(user, role) => {
          const basicValidation = validateMaritimeRoleAssignment(user, role);
          const complianceCheck = checkTMSACompliance(user, role);
          return basicValidation && complianceCheck;
        }}
      />
    </div>
  );
}
```

## Props Details

### user
- **Type**: `User`
- **Required**: Yes
- **Description**: User object for role assignment
- **Example**: User with current roles and qualifications

### availableRoles
- **Type**: `Role[]`
- **Required**: Yes
- **Description**: List of roles that can be assigned
- **Example**: Maritime organizational roles with hierarchy

### onRoleAssignment
- **Type**: `(userId: string, roleIds: string[]) => Promise<void>`
- **Required**: Yes
- **Description**: Callback for role assignment operations

### onRoleRemoval
- **Type**: `(userId: string, roleId: string) => Promise<void>`
- **Required**: Yes
- **Description**: Callback for role removal operations

### validateAssignment
- **Type**: `(user: User, role: Role) => boolean`
- **Required**: No
- **Description**: Custom validation function for role assignments

### showHierarchy
- **Type**: `boolean`
- **Required**: No
- **Description**: Display role hierarchy information
- **Default**: `false`

### maxRoles
- **Type**: `number`
- **Required**: No
- **Description**: Maximum number of roles per user
- **Default**: Unlimited

## Styling
```css
.maritime-role-assignment {
  border: 1px solid #16569e;
  border-radius: 8px;
  background: #fff;
  padding: 20px;
}

.role-hierarchy {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
}

.role-level-1 {
  font-weight: bold;
  color: #16569e;
  border-left: 4px solid #16569e;
  padding-left: 12px;
}

.role-level-2 {
  font-weight: 600;
  color: #2c5282;
  border-left: 3px solid #2c5282;
  padding-left: 10px;
  margin-left: 8px;
}

.role-level-3 {
  color: #4a5568;
  border-left: 2px solid #4a5568;
  padding-left: 8px;
  margin-left: 16px;
}

.assignment-preview {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px;
  margin: 16px 0;
}

.user-assignment-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.valid {
  color: #38a169;
  font-weight: bold;
}

.invalid {
  color: #e53e3e;
  font-weight: bold;
}
```

## Context Requirements
1. **User Management System**: CRUD operations for users
2. **Role Definition System**: Comprehensive role hierarchy
3. **Certification Tracking**: User qualification validation
4. **Audit Trail**: Role change logging and history

## Common Use Cases
- **Crew Promotion**: Advancing crew members through maritime hierarchy
- **Department Transfer**: Moving crew between deck/engine departments
- **Qualification Updates**: Assigning roles based on new certifications
- **Compliance Management**: Ensuring TMSA role requirements are met
- **Bulk Operations**: Mass role assignments for fleet operations
- **Emergency Assignment**: Temporary role assignments for operational needs

## Troubleshooting

### Role Assignment Fails
- Check user qualification requirements
- Verify role hierarchy constraints
- Ensure department compatibility
- Validate certification prerequisites

### Validation Errors
- Review validateAssignment function logic
- Check role conflict detection
- Verify user data completeness
- Test certification parsing logic

### Performance Issues
- Implement role caching for large user bases
- Optimize validation function complexity
- Use debounced validation for real-time feedback
- Consider pagination for large role lists

### Compliance Issues
- Regular audit of role assignments
- Automated TMSA compliance checking
- Role assignment approval workflows
- Documentation of assignment rationale

This component is essential for maintaining proper crew organization, ensuring qualified personnel are assigned appropriate roles, and meeting maritime compliance requirements for vessel operations.