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
  // CRITICAL: These props make bell and gear icons functional
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  notificationCount?: number;
  showNotifications?: boolean;
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

## Functional Bell and Gear Icons Implementation

```jsx
import React, { useState } from 'react';
import { TMSAAppLayout } from 'scomp-ui';
import { Bell, Settings, X, AlertTriangle } from 'lucide-react';

function FunctionalTMSAApp() {
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'weather',
      severity: 'high',
      title: 'Severe Weather Alert',
      message: 'Strong winds forecast for current route',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2', 
      type: 'maintenance',
      severity: 'medium',
      title: 'Engine Maintenance Due',
      message: 'Main engine maintenance due in 48 hours',
      timestamp: new Date(),
      read: false
    }
  ]);

  // CRITICAL: These handlers make the icons functional
  const handleNotificationClick = () => {
    setShowNotificationPanel(true);
    setShowSettingsPanel(false);
  };

  const handleSettingsClick = () => {
    setShowSettingsPanel(true);
    setShowNotificationPanel(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <TMSAAppLayout
        title="Maritime Fleet Management"
        user={currentUser}
        navigation={navigation}
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        // CRITICAL: Pass these props to make bell and gear icons work
        onNotificationClick={handleNotificationClick}
        onSettingsClick={handleSettingsClick}
        notificationCount={unreadCount}
        showNotifications={true}
      >
        <div className="p-6">
          {/* Your page content */}
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
      </TMSAAppLayout>

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowNotificationPanel(false)} 
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowNotificationPanel(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      notification.read ? 'bg-gray-50' : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettingsPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowSettingsPanel(false)} 
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Settings</h2>
                </div>
                <button
                  onClick={() => setShowSettingsPanel(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Settings Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span>Email Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Weather Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Maintenance Reminders</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Display</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <select className="w-full border rounded px-3 py-2">
                        <option>Light</option>
                        <option>Dark</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <select className="w-full border rounded px-3 py-2">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-4 flex gap-3">
                <button 
                  onClick={() => setShowSettingsPanel(false)}
                  className="flex-1 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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