# TMSAAppLayout Component Guide

## Overview
TMSAAppLayout provides a complete maritime application layout with navigation, header, sidebar, and content areas. It includes built-in support for TMSA (Tanker Management and Self Assessment) compliance features and maritime-specific navigation patterns.

## Component Interface

```typescript
interface TMSAAppLayoutProps {
  children: React.ReactNode;
  title: string;
  user?: User;
  navigation: NavigationItem[];
  currentPath?: string;
  onNavigate?: (path: string) => void;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  permissions?: string[];
  badge?: string | number;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  vessel?: string;
}
```

## Basic Usage

```jsx
import { TMSAAppLayout } from 'scomp-ui';
import { Ship, Users, FileText, Settings, BarChart3 } from 'lucide-react';

function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentUser = {
    name: 'Captain James Wilson',
    email: 'j.wilson@maritime.com',
    role: 'Master',
    vessel: 'MV Atlantic Star'
  };

  const navigation = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 'fleet',
      label: 'Fleet Management',
      path: '/fleet',
      icon: <Ship className="h-5 w-5" />,
      children: [
        { id: 'vessels', label: 'Vessels', path: '/fleet/vessels' },
        { id: 'maintenance', label: 'Maintenance', path: '/fleet/maintenance' },
        { id: 'routes', label: 'Routes', path: '/fleet/routes' }
      ]
    },
    {
      id: 'crew',
      label: 'Crew Management',
      path: '/crew',
      icon: <Users className="h-5 w-5" />,
      badge: '3'
    },
    {
      id: 'compliance',
      label: 'TMSA Compliance',
      path: '/compliance',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <TMSAAppLayout
      title="Maritime Fleet Management"
      user={currentUser}
      navigation={navigation}
      currentPath={currentPath}
      onNavigate={setCurrentPath}
      showSidebar={true}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
    >
      <div className="p-6">
        {/* Your page content based on currentPath */}
        {currentPath === '/dashboard' && <DashboardPage />}
        {currentPath === '/fleet' && <FleetManagementPage />}
        {currentPath === '/crew' && <CrewManagementPage />}
        {currentPath === '/compliance' && <TMSACompliancePage />}
      </div>
    </TMSAAppLayout>
  );
}
```

## Advanced Usage with Header Actions

```jsx
import { TMSAAppLayout } from 'scomp-ui';
import { Bell, Search, Plus, MessageSquare } from 'lucide-react';

function AdvancedApp() {
  const headerActions = (
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search vessels, crew..."
          className="pl-10 pr-4 py-2 border rounded-lg w-64"
        />
      </div>

      {/* Quick Actions */}
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Plus className="h-5 w-5" />
      </button>

      {/* Messages */}
      <button className="p-2 hover:bg-gray-100 rounded-lg relative">
        <MessageSquare className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          2
        </span>
      </button>

      {/* Notifications */}
      <button className="p-2 hover:bg-gray-100 rounded-lg relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          5
        </span>
      </button>
    </div>
  );

  const footer = (
    <div className="text-center text-sm text-gray-500 py-4">
      © 2024 Maritime Solutions Ltd. TMSA Compliant System v2.1
    </div>
  );

  return (
    <TMSAAppLayout
      title="Advanced Fleet Management"
      user={currentUser}
      navigation={navigation}
      headerActions={headerActions}
      footer={footer}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    >
      <Routes />
    </TMSAAppLayout>
  );
}
```

## TMSA-Specific Navigation

```jsx
// TMSA compliance focused navigation structure
const tmsaNavigation = [
  {
    id: 'vessel-management',
    label: 'Vessel Management',
    path: '/tmsa/vessels',
    icon: <Ship className="h-5 w-5" />,
    children: [
      { id: 'vessel-inspections', label: 'Inspections', path: '/tmsa/vessels/inspections' },
      { id: 'vessel-maintenance', label: 'Maintenance', path: '/tmsa/vessels/maintenance' },
      { id: 'vessel-certificates', label: 'Certificates', path: '/tmsa/vessels/certificates' }
    ]
  },
  {
    id: 'safety-management',
    label: 'Safety Management',
    path: '/tmsa/safety',
    icon: <Shield className="h-5 w-5" />,
    children: [
      { id: 'safety-procedures', label: 'Procedures', path: '/tmsa/safety/procedures' },
      { id: 'incident-reporting', label: 'Incidents', path: '/tmsa/safety/incidents' },
      { id: 'risk-assessment', label: 'Risk Assessment', path: '/tmsa/safety/risk' }
    ]
  },
  {
    id: 'crew-competence',
    label: 'Crew & Competence',
    path: '/tmsa/crew',
    icon: <Users className="h-5 w-5" />,
    badge: 'Update Required',
    children: [
      { id: 'crew-training', label: 'Training Records', path: '/tmsa/crew/training' },
      { id: 'crew-certificates', label: 'Certificates', path: '/tmsa/crew/certificates' },
      { id: 'crew-appraisals', label: 'Performance Appraisals', path: '/tmsa/crew/appraisals' }
    ]
  }
];
```

## Responsive Behavior

```jsx
function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <TMSAAppLayout
      title="Responsive Maritime App"
      navigation={navigation}
      showSidebar={!isMobile || !sidebarCollapsed}
      sidebarCollapsed={isMobile ? false : sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      className={isMobile ? 'mobile-layout' : ''}
    >
      <div className={`content ${isMobile ? 'mobile-content' : ''}`}>
        {/* Responsive content */}
      </div>
    </TMSAAppLayout>
  );
}
```

## Integration with Router

```jsx
import { useLocation, useNavigate } from 'wouter';
import { TMSAAppLayout } from 'scomp-ui';

function RouterIntegratedApp() {
  const [location] = useLocation();
  const navigate = useNavigate();

  return (
    <TMSAAppLayout
      title="Fleet Management System"
      navigation={navigation}
      currentPath={location}
      onNavigate={navigate}
    >
      <Routes>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/fleet/*" component={FleetRoutes} />
        <Route path="/crew" component={CrewManagement} />
        <Route path="/compliance/*" component={TMSACompliance} />
      </Routes>
    </TMSAAppLayout>
  );
}
```

## Key Features
- **TMSA Compliance Ready**: Built-in support for maritime compliance workflows
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Hierarchical Navigation**: Multi-level menu support with icons and badges
- **User Context**: Integrated user profile and vessel assignment display
- **Customizable Header**: Support for search, notifications, and quick actions
- **Icon Integration**: Full Lucide React icon support with maritime-specific examples
- **Theme Support**: Maritime blue theme (#16569e) with professional styling

## Context Requirements
- **No form context needed**: Layout is independent of form systems
- **Optional user context**: Can integrate with authentication providers
- **Navigation state**: Manages its own navigation state or accepts external control

## Best Practices
1. **Consistent Navigation**: Use clear, maritime-focused navigation labels
2. **Icon Usage**: Leverage Lucide React icons for professional appearance
3. **Permission Integration**: Combine with PermissionGuard for role-based navigation
4. **Mobile Optimization**: Test sidebar behavior on mobile devices
5. **Badge Updates**: Use navigation badges for pending actions or alerts
6. **TMSA Alignment**: Structure navigation to support TMSA assessment categories

## Common Use Cases
- Complete maritime application shells
- TMSA compliance dashboards
- Fleet management interfaces
- Crew management systems
- Vessel operation centers
- Shore-based monitoring applications
- Multi-tenant maritime platforms