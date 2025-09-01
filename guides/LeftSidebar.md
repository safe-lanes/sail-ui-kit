# LeftSidebar Component

## Overview
The `LeftSidebar` component provides a standardized navigation sidebar for TMSA maritime applications. It offers module-specific navigation menus, quick actions, and collapsible functionality designed for efficient maritime fleet management workflows.

## Props Interface
```typescript
interface LeftSidebarProps {
  menuItems: MenuItem[];
  moduleName: string;
  footer?: React.ReactNode;
  className?: string;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  showQuickActions?: boolean;
  customHeader?: React.ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  isActive?: boolean;
  tooltip?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  count?: number;
  children?: MenuItem[];
  onClick?: () => void;
  disabled?: boolean;
}
```

## Basic Usage
```tsx
import { LeftSidebar } from 'scomp-ui/sail-ui-kit';
import { Ship, Users, FileText, AlertTriangle, BarChart3, Settings } from 'lucide-react';

function MaritimeApplicationSidebar() {
  const fleetMenuItems = [
    {
      id: 'dashboard',
      label: 'Fleet Dashboard',
      path: '/dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      isActive: true,
      tooltip: 'Overview of fleet operations'
    },
    {
      id: 'vessels',
      label: 'Vessel Management',
      path: '/vessels',
      icon: <Ship className="h-4 w-4" />,
      count: 12,
      tooltip: 'Manage fleet vessels'
    },
    {
      id: 'crew',
      label: 'Crew Management',
      path: '/crew',
      icon: <Users className="h-4 w-4" />,
      badge: {
        text: 'New',
        variant: 'secondary'
      },
      tooltip: 'Manage crew assignments'
    },
    {
      id: 'compliance',
      label: 'TMSA Compliance',
      path: '/compliance',
      icon: <FileText className="h-4 w-4" />,
      tooltip: 'TMSA compliance monitoring'
    },
    {
      id: 'incidents',
      label: 'Incident Reports',
      path: '/incidents',
      icon: <AlertTriangle className="h-4 w-4" />,
      count: 3,
      tooltip: 'Safety incident tracking'
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings className="h-4 w-4" />,
      tooltip: 'Application settings'
    }
  ];

  const sidebarFooter = (
    <div className="p-4 border-t">
      <div className="text-xs text-muted-foreground text-center">
        TMSA Compliance System
        <br />
        Version 2.1.0
      </div>
    </div>
  );

  return (
    <div className="maritime-app-layout">
      <LeftSidebar
        menuItems={fleetMenuItems}
        moduleName="Fleet Management"
        footer={sidebarFooter}
        showQuickActions={true}
        className="maritime-sidebar"
      />
      
      {/* Main content area */}
      <main className="main-content">
        <FleetDashboardContent />
      </main>
    </div>
  );
}
```

## TMSA Module-Specific Sidebars
```tsx
function TMSAModuleSidebars() {
  // Safety Management Module
  const safetyMenuItems = [
    {
      id: 'safety-dashboard',
      label: 'Safety Dashboard',
      path: '/safety/dashboard',
      icon: <Shield className="h-4 w-4" />,
      isActive: true
    },
    {
      id: 'safety-procedures',
      label: 'Safety Procedures',
      path: '/safety/procedures',
      icon: <FileText className="h-4 w-4" />,
      children: [
        {
          id: 'emergency-procedures',
          label: 'Emergency Procedures',
          path: '/safety/procedures/emergency',
          icon: <AlertCircle className="h-4 w-4" />
        },
        {
          id: 'routine-procedures',
          label: 'Routine Procedures',
          path: '/safety/procedures/routine',
          icon: <CheckCircle className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'risk-assessments',
      label: 'Risk Assessments',
      path: '/safety/risk-assessments',
      icon: <AlertTriangle className="h-4 w-4" />,
      badge: { text: 'Pending', variant: 'destructive' }
    },
    {
      id: 'safety-training',
      label: 'Safety Training',
      path: '/safety/training',
      icon: <BookOpen className="h-4 w-4" />,
      count: 8
    },
    {
      id: 'incident-management',
      label: 'Incident Management',
      path: '/safety/incidents',
      icon: <FileX className="h-4 w-4" />,
      tooltip: 'Report and track safety incidents'
    }
  ];

  // Bridge Management Module
  const bridgeMenuItems = [
    {
      id: 'bridge-dashboard',
      label: 'Bridge Dashboard',
      path: '/bridge/dashboard',
      icon: <Navigation className="h-4 w-4" />,
      isActive: true
    },
    {
      id: 'navigation-equipment',
      label: 'Navigation Equipment',
      path: '/bridge/equipment',
      icon: <Radar className="h-4 w-4" />,
      children: [
        {
          id: 'gps-systems',
          label: 'GPS Systems',
          path: '/bridge/equipment/gps',
          icon: <MapPin className="h-4 w-4" />
        },
        {
          id: 'radar-systems',
          label: 'Radar Systems',
          path: '/bridge/equipment/radar',
          icon: <Radar className="h-4 w-4" />
        },
        {
          id: 'communication',
          label: 'Communication',
          path: '/bridge/equipment/comm',
          icon: <Radio className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'bridge-procedures',
      label: 'Bridge Procedures',
      path: '/bridge/procedures',
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 'watchkeeping',
      label: 'Watch Keeping',
      path: '/bridge/watchkeeping',
      icon: <Clock className="h-4 w-4" />,
      count: 4,
      tooltip: 'Current watch schedules'
    },
    {
      id: 'voyage-planning',
      label: 'Voyage Planning',
      path: '/bridge/voyage-planning',
      icon: <Map className="h-4 w-4" />
    }
  ];

  // Cargo Management Module
  const cargoMenuItems = [
    {
      id: 'cargo-dashboard',
      label: 'Cargo Dashboard',
      path: '/cargo/dashboard',
      icon: <Package className="h-4 w-4" />,
      isActive: true
    },
    {
      id: 'cargo-operations',
      label: 'Cargo Operations',
      path: '/cargo/operations',
      icon: <Truck className="h-4 w-4" />,
      children: [
        {
          id: 'loading-operations',
          label: 'Loading Operations',
          path: '/cargo/operations/loading',
          icon: <ArrowUp className="h-4 w-4" />
        },
        {
          id: 'discharge-operations',
          label: 'Discharge Operations',
          path: '/cargo/operations/discharge',
          icon: <ArrowDown className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'ballast-management',
      label: 'Ballast Management',
      path: '/cargo/ballast',
      icon: <Droplets className="h-4 w-4" />
    },
    {
      id: 'cargo-documentation',
      label: 'Documentation',
      path: '/cargo/documentation',
      icon: <FileText className="h-4 w-4" />,
      count: 15
    }
  ];

  return (
    <div className="tmsa-modules">
      {/* Safety Management Sidebar */}
      <LeftSidebar
        menuItems={safetyMenuItems}
        moduleName="Safety Management"
        className="safety-module-sidebar"
        showQuickActions={true}
      />

      {/* Bridge Management Sidebar */}
      <LeftSidebar
        menuItems={bridgeMenuItems}
        moduleName="Bridge Management"
        className="bridge-module-sidebar"
        showQuickActions={true}
      />

      {/* Cargo Management Sidebar */}
      <LeftSidebar
        menuItems={cargoMenuItems}
        moduleName="Cargo Management"
        className="cargo-module-sidebar"
        showQuickActions={true}
      />
    </div>
  );
}
```

## Advanced Sidebar with Hierarchical Navigation
```tsx
function AdvancedMaritimeSidebar() {
  const [expandedItems, setExpandedItems] = useState(new Set(['fleet-operations']));

  const comprehensiveMenuItems = [
    {
      id: 'dashboard',
      label: 'Command Center',
      path: '/dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      isActive: true,
      tooltip: 'Fleet command overview'
    },
    {
      id: 'fleet-operations',
      label: 'Fleet Operations',
      path: '/fleet',
      icon: <Ship className="h-4 w-4" />,
      children: [
        {
          id: 'vessel-tracking',
          label: 'Vessel Tracking',
          path: '/fleet/tracking',
          icon: <MapPin className="h-4 w-4" />,
          count: 12
        },
        {
          id: 'voyage-management',
          label: 'Voyage Management',
          path: '/fleet/voyages',
          icon: <Route className="h-4 w-4" />,
          badge: { text: 'Active', variant: 'default' }
        },
        {
          id: 'port-operations',
          label: 'Port Operations',
          path: '/fleet/ports',
          icon: <Anchor className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'crew-management',
      label: 'Crew Management',
      path: '/crew',
      icon: <Users className="h-4 w-4" />,
      children: [
        {
          id: 'crew-roster',
          label: 'Crew Roster',
          path: '/crew/roster',
          icon: <UserCheck className="h-4 w-4" />,
          count: 156
        },
        {
          id: 'crew-scheduling',
          label: 'Scheduling',
          path: '/crew/scheduling',
          icon: <Calendar className="h-4 w-4" />
        },
        {
          id: 'crew-training',
          label: 'Training Records',
          path: '/crew/training',
          icon: <BookOpen className="h-4 w-4" />,
          badge: { text: 'Due', variant: 'destructive' }
        },
        {
          id: 'crew-certifications',
          label: 'Certifications',
          path: '/crew/certifications',
          icon: <Award className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'safety-compliance',
      label: 'Safety & Compliance',
      path: '/safety',
      icon: <Shield className="h-4 w-4" />,
      children: [
        {
          id: 'tmsa-compliance',
          label: 'TMSA Compliance',
          path: '/safety/tmsa',
          icon: <CheckCircle className="h-4 w-4" />,
          tooltip: 'Tanker Management Self Assessment'
        },
        {
          id: 'incident-reports',
          label: 'Incident Reports',
          path: '/safety/incidents',
          icon: <AlertTriangle className="h-4 w-4" />,
          count: 3
        },
        {
          id: 'audit-management',
          label: 'Audit Management',
          path: '/safety/audits',
          icon: <FileSearch className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      path: '/maintenance',
      icon: <Wrench className="h-4 w-4" />,
      children: [
        {
          id: 'planned-maintenance',
          label: 'Planned Maintenance',
          path: '/maintenance/planned',
          icon: <Calendar className="h-4 w-4" />
        },
        {
          id: 'work-orders',
          label: 'Work Orders',
          path: '/maintenance/work-orders',
          icon: <ClipboardList className="h-4 w-4" />,
          count: 8
        },
        {
          id: 'spare-parts',
          label: 'Spare Parts',
          path: '/maintenance/parts',
          icon: <Package className="h-4 w-4" />
        }
      ]
    }
  ];

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(item.id)) {
          newSet.delete(item.id);
        } else {
          newSet.add(item.id);
        }
        return newSet;
      });
    } else {
      // Navigate to the item
      navigate(item.path);
    }
  };

  const customHeader = (
    <div className="p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Ship className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-sm">Maritime Fleet</h2>
          <p className="text-xs text-muted-foreground">Command & Control</p>
        </div>
      </div>
    </div>
  );

  return (
    <LeftSidebar
      menuItems={comprehensiveMenuItems}
      moduleName="Fleet Command"
      customHeader={customHeader}
      showQuickActions={true}
      className="advanced-maritime-sidebar"
    />
  );
}
```

## Responsive Sidebar Behavior
```tsx
function ResponsiveMaritimeSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simplified menu for mobile
  const mobileMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      isActive: true
    },
    {
      id: 'vessels',
      label: 'Vessels',
      path: '/vessels',
      icon: <Ship className="h-4 w-4" />,
      count: 12
    },
    {
      id: 'crew',
      label: 'Crew',
      path: '/crew',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'alerts',
      label: 'Alerts',
      path: '/alerts',
      icon: <AlertCircle className="h-4 w-4" />,
      badge: { text: '!', variant: 'destructive' }
    }
  ];

  return (
    <div className={`responsive-layout ${isMobile ? 'mobile' : 'desktop'}`}>
      <LeftSidebar
        menuItems={isMobile ? mobileMenuItems : fullMenuItems}
        moduleName={isMobile ? 'Fleet' : 'Fleet Management'}
        collapsed={sidebarCollapsed}
        onCollapseChange={setSidebarCollapsed}
        showQuickActions={!isMobile}
        className={`responsive-sidebar ${isMobile ? 'mobile-sidebar' : 'desktop-sidebar'}`}
      />

      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        <ResponsiveContent />
      </main>
    </div>
  );
}
```

## Quick Actions Integration
```tsx
function SidebarWithQuickActions() {
  const maritimeQuickActions = [
    {
      id: 'emergency-alert',
      label: 'Emergency Alert',
      icon: <AlertTriangle className="h-4 w-4" />,
      onClick: () => triggerEmergencyAlert(),
      className: 'emergency-action'
    },
    {
      id: 'weather-update',
      label: 'Weather Update',
      icon: <Cloud className="h-4 w-4" />,
      onClick: () => checkWeatherUpdate()
    },
    {
      id: 'crew-muster',
      label: 'Crew Muster',
      icon: <Users className="h-4 w-4" />,
      onClick: () => initiateMuster()
    },
    {
      id: 'port-services',
      label: 'Port Services',
      icon: <Anchor className="h-4 w-4" />,
      onClick: () => contactPortServices()
    }
  ];

  const quickActionsSection = (
    <div className="quick-actions-section">
      <h4 className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</h4>
      <div className="space-y-1">
        {maritimeQuickActions.map(action => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${action.className || ''}`}
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <LeftSidebar
      menuItems={menuItems}
      moduleName="Bridge Operations"
      footer={quickActionsSection}
      showQuickActions={true}
      className="bridge-operations-sidebar"
    />
  );
}
```

## Props Details

### menuItems
- **Type**: `MenuItem[]`
- **Required**: Yes
- **Description**: Array of navigation menu items with hierarchical support
- **Example**: Maritime navigation with fleet, crew, and safety sections

### moduleName
- **Type**: `string`
- **Required**: Yes
- **Description**: Display name for the current module or application section
- **Example**: `"Fleet Management"`, `"Safety Management"`

### footer
- **Type**: `React.ReactNode`
- **Required**: No
- **Description**: Custom content to display at the bottom of the sidebar
- **Example**: Version info, quick actions, or status indicators

### collapsed
- **Type**: `boolean`
- **Required**: No
- **Description**: Control sidebar collapsed state
- **Default**: Managed internally by SidebarProvider

### showQuickActions
- **Type**: `boolean`
- **Required**: No
- **Description**: Enable built-in quick actions section
- **Default**: `true`

### customHeader
- **Type**: `React.ReactNode`
- **Required**: No
- **Description**: Replace default header with custom content
- **Example**: Custom branding, status indicators, or controls

## Styling
```css
.maritime-sidebar {
  --sidebar-width: 280px;
  --sidebar-width-collapsed: 60px;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-right: 1px solid #e2e8f0;
}

.safety-module-sidebar {
  --module-accent: #ef4444;
}

.bridge-module-sidebar {
  --module-accent: #3b82f6;
}

.cargo-module-sidebar {
  --module-accent: #f59e0b;
}

.advanced-maritime-sidebar .sidebar-header {
  background: linear-gradient(135deg, #16569e 0%, #1e6bb8 100%);
  color: white;
}

.emergency-action {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.emergency-action:hover {
  background: #fecaca;
}

.responsive-sidebar.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.responsive-sidebar.mobile-sidebar.open {
  transform: translateX(0);
}

.main-content.sidebar-collapsed {
  margin-left: var(--sidebar-width-collapsed);
}

.main-content.sidebar-expanded {
  margin-left: var(--sidebar-width);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
```

## Context Requirements
1. **SidebarProvider**: Must be wrapped in SidebarProvider for state management
2. **Router Integration**: Navigation handling for menu items
3. **User Context**: Access control for menu items based on user permissions
4. **Theme Provider**: Consistent styling across the application

## Common Use Cases
- **TMSA Module Navigation**: Specific navigation for each TMSA element
- **Fleet Management Interfaces**: Comprehensive fleet operation navigation
- **Bridge Operations**: Real-time navigation for bridge personnel
- **Shore Management**: Office-based maritime management navigation
- **Emergency Procedures**: Quick access to critical maritime functions
- **Mobile Maritime Apps**: Touch-friendly navigation for tablets

## Troubleshooting

### Menu Item Navigation Issues
- Verify router integration and path configurations
- Check onClick handlers for menu items
- Ensure proper navigation state management
- Validate menu item structure and properties

### Sidebar State Problems
- Confirm SidebarProvider is properly wrapping the component
- Check collapsed state management
- Verify responsive behavior on different screen sizes
- Ensure proper CSS custom properties are defined

### Performance Issues
- Implement virtualization for very large menu lists
- Use React.memo for menu items that don't change frequently
- Optimize icon rendering for better performance
- Consider lazy loading for complex menu hierarchies

### Accessibility Concerns
- Ensure proper ARIA labels for navigation items
- Implement keyboard navigation support
- Verify screen reader compatibility
- Test focus management for collapsed/expanded states

This sidebar component provides a robust, flexible navigation solution for maritime applications, supporting complex hierarchical navigation, responsive behavior, and integration with TMSA compliance requirements while maintaining excellent usability across different device types and operational contexts.