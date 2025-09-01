# TopNavigationBar Component

## Overview
The `TopNavigationBar` component provides a consistent header navigation interface for maritime TMSA applications. It features module navigation, user management, notifications, and quick actions, designed specifically for fleet management and maritime operations.

## Props Interface
```typescript
interface TopNavigationBarProps {
  moduleName: string;
  currentModule?: string;
  onModuleChange?: (module: string) => void;
  user?: User;
  showNotifications?: boolean;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  className?: string;
  customActions?: React.ReactNode;
  notificationCount?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  department?: string;
  vesselAssignment?: string;
  rank?: string;
}

interface ModuleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
}
```

## Basic Usage
```tsx
import { TopNavigationBar } from 'scomp-ui/sail-ui-kit';

function MaritimeApplication() {
  const maritimeUser = {
    id: 'capt_001',
    name: 'Captain Sarah Mitchell',
    email: 'sarah.mitchell@maritimefleet.com',
    role: 'Master',
    department: 'Bridge Operations',
    vesselAssignment: 'MV Atlantic Explorer',
    rank: 'Master Mariner',
    avatar: '/avatars/captain-mitchell.jpg'
  };

  const handleModuleChange = (module: string) => {
    console.log(`Switching to TMSA module: ${module}`);
    // Navigate to different TMSA module (Safety, Bridge, Cargo, etc.)
    navigate(`/${module}`);
  };

  const handleNotificationClick = () => {
    console.log('Opening maritime notifications');
    setShowNotificationPanel(true);
  };

  const handleSettingsClick = () => {
    console.log('Opening application settings');
    setShowSettingsModal(true);
  };

  const handleLogout = () => {
    console.log('Logging out maritime user');
    confirmLogout();
  };

  return (
    <div className="maritime-app">
      <TopNavigationBar
        moduleName="Fleet Safety Management"
        currentModule="safety"
        onModuleChange={handleModuleChange}
        user={maritimeUser}
        showNotifications={true}
        onNotificationClick={handleNotificationClick}
        onSettingsClick={handleSettingsClick}
        onLogout={handleLogout}
        notificationCount={5}
        className="maritime-nav"
      />
      
      {/* Main application content */}
      <main className="main-content">
        <SafetyManagementDashboard />
      </main>
    </div>
  );
}
```

## Advanced TMSA Module Integration
```tsx
function TMSAModuleNavigation() {
  const [activeModule, setActiveModule] = useState('bridge');
  const [notifications, setNotifications] = useState([]);

  // Define all TMSA modules with maritime-specific configuration
  const tmsaModules = [
    {
      id: 'safety',
      name: 'Safety Management',
      description: 'TMSA Element 1 - Safety Management System',
      icon: <Shield className="h-4 w-4" />,
      available: true
    },
    {
      id: 'bridge',
      name: 'Bridge Management',
      description: 'TMSA Element 2 - Bridge Operations',
      icon: <Navigation className="h-4 w-4" />,
      available: true
    },
    {
      id: 'cargo',
      name: 'Cargo Management',
      description: 'TMSA Element 3 - Cargo and Ballast Operations',
      icon: <Package className="h-4 w-4" />,
      available: true
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      description: 'TMSA Element 4 - Ship Maintenance',
      icon: <Wrench className="h-4 w-4" />,
      available: true
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'TMSA Element 5 - Navigation Systems',
      icon: <Compass className="h-4 w-4" />,
      available: true
    },
    {
      id: 'communications',
      name: 'Communications',
      description: 'TMSA Element 6 - Communication Systems',
      icon: <Radio className="h-4 w-4" />,
      available: currentUser.role === 'Master' || currentUser.role === 'Chief Officer'
    }
  ];

  const currentModuleInfo = tmsaModules.find(m => m.id === activeModule);

  const handleModuleSwitch = (moduleId: string) => {
    const module = tmsaModules.find(m => m.id === moduleId);
    if (module && module.available) {
      setActiveModule(moduleId);
      // Log module access for compliance
      logModuleAccess(currentUser.id, moduleId);
    }
  };

  // Maritime-specific notifications
  const maritimeNotifications = [
    {
      id: 'weather_alert',
      type: 'weather',
      severity: 'high',
      message: 'Severe weather warning for current route',
      timestamp: new Date()
    },
    {
      id: 'maintenance_due',
      type: 'maintenance',
      severity: 'medium',
      message: 'Engine maintenance due in 48 hours',
      timestamp: new Date()
    },
    {
      id: 'crew_cert',
      type: 'certification',
      severity: 'medium',
      message: '2 crew certifications expiring this month',
      timestamp: new Date()
    }
  ];

  const customActions = (
    <div className="flex items-center gap-2">
      {/* Emergency Alert Button */}
      <button 
        className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700"
        onClick={() => triggerEmergencyAlert()}
      >
        Emergency
      </button>
      
      {/* Vessel Status Indicator */}
      <div className="flex items-center gap-2 px-2 py-1 bg-green-100 rounded text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-green-800">Operational</span>
      </div>
    </div>
  );

  return (
    <div className="tmsa-application">
      <TopNavigationBar
        moduleName={currentModuleInfo?.name || 'TMSA Module'}
        currentModule={activeModule}
        onModuleChange={handleModuleSwitch}
        user={currentUser}
        showNotifications={true}
        onNotificationClick={() => showNotificationDetails(maritimeNotifications)}
        onSettingsClick={() => openTMSASettings()}
        onLogout={handleSecureLogout}
        notificationCount={maritimeNotifications.length}
        customActions={customActions}
        className="tmsa-navigation"
      />

      {/* Module-specific content */}
      <div className="module-content">
        <TMSAModuleRenderer moduleId={activeModule} />
      </div>
    </div>
  );
}
```

## Fleet Management Integration
```tsx
function FleetManagementNavigation() {
  const [fleetContext, setFleetContext] = useState({
    activeVessels: 12,
    totalCrew: 156,
    alertCount: 8,
    complianceScore: 94
  });

  const fleetUser = {
    id: 'fleet_mgr_001',
    name: 'Admiral James Rodriguez',
    email: 'j.rodriguez@maritimefleet.com',
    role: 'Fleet Manager',
    department: 'Fleet Operations',
    rank: 'Fleet Admiral'
  };

  // Fleet-specific custom actions
  const fleetActions = (
    <div className="flex items-center gap-3">
      {/* Fleet Status Summary */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Ship className="h-4 w-4 text-blue-600" />
          <span className="font-medium">{fleetContext.activeVessels}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-green-600" />
          <span className="font-medium">{fleetContext.totalCrew}</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <span className="font-medium">{fleetContext.alertCount}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">
            Quick Actions
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => createNewVoyage()}>
            <Ship className="h-4 w-4 mr-2" />
            New Voyage
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => scheduleInspection()}>
            <FileText className="h-4 w-4 mr-2" />
            Schedule Inspection
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => generateReport()}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <TopNavigationBar
      moduleName="Maritime Fleet Command Center"
      currentModule="fleet"
      user={fleetUser}
      showNotifications={true}
      onNotificationClick={() => openFleetNotifications()}
      onSettingsClick={() => openFleetSettings()}
      onLogout={() => secureFleetLogout()}
      notificationCount={fleetContext.alertCount}
      customActions={fleetActions}
      className="fleet-command-nav"
    />
  );
}
```

## Mobile-Responsive Navigation
```tsx
function ResponsiveMaritimeNavigation() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simplified mobile actions
  const mobileActions = isMobile ? (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  ) : null;

  return (
    <>
      <TopNavigationBar
        moduleName={isMobile ? 'Maritime' : 'Maritime Operations Center'}
        currentModule="operations"
        user={currentUser}
        showNotifications={!isMobile}
        onNotificationClick={() => isMobile ? openMobileNotifications() : openNotifications()}
        onSettingsClick={() => isMobile ? openMobileSettings() : openSettings()}
        customActions={mobileActions}
        className={`responsive-nav ${isMobile ? 'mobile' : 'desktop'}`}
      />

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <MobileMenuOverlay
          user={currentUser}
          onClose={() => setMobileMenuOpen(false)}
          notifications={notifications}
        />
      )}
    </>
  );
}
```

## Real-time Status Integration
```tsx
function LiveStatusNavigation() {
  const [vesselStatus, setVesselStatus] = useState('underway');
  const [emergencyStatus, setEmergencyStatus] = useState(null);
  const [weatherAlert, setWeatherAlert] = useState(null);

  // Real-time status indicators
  const statusIndicators = (
    <div className="flex items-center gap-3">
      {/* Vessel Status */}
      <div className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${
        vesselStatus === 'emergency' ? 'bg-red-100 text-red-800' :
        vesselStatus === 'anchored' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          vesselStatus === 'emergency' ? 'bg-red-500' :
          vesselStatus === 'anchored' ? 'bg-yellow-500' :
          'bg-green-500'
        }`}></div>
        <span className="capitalize">{vesselStatus}</span>
      </div>

      {/* Weather Alert */}
      {weatherAlert && (
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
          <Cloud className="h-3 w-3" />
          <span>{weatherAlert.severity}</span>
        </div>
      )}

      {/* Current Time/Position */}
      <div className="text-xs text-gray-600">
        <div>UTC: {new Date().toUTCString().slice(17, 25)}</div>
        <div>Pos: 34°N 118°W</div>
      </div>
    </div>
  );

  return (
    <TopNavigationBar
      moduleName="Bridge Operations"
      currentModule="bridge"
      user={currentUser}
      showNotifications={true}
      onNotificationClick={() => openBridgeNotifications()}
      customActions={statusIndicators}
      className={`bridge-nav ${emergencyStatus ? 'emergency-mode' : ''}`}
    />
  );
}
```

## Props Details

### moduleName
- **Type**: `string`
- **Required**: Yes
- **Description**: Display name for the current module or application section
- **Example**: `"Fleet Safety Management"`, `"Bridge Operations"`

### currentModule
- **Type**: `string`
- **Required**: No
- **Description**: Identifier for the active module for highlighting
- **Example**: `"safety"`, `"bridge"`, `"cargo"`

### onModuleChange
- **Type**: `(module: string) => void`
- **Required**: No
- **Description**: Callback triggered when user switches modules
- **Usage**: Handle navigation between different TMSA modules

### user
- **Type**: `User`
- **Required**: No
- **Description**: Current user information for display and permissions
- **Example**: Maritime user with rank, vessel assignment, and department

### showNotifications
- **Type**: `boolean`
- **Required**: No
- **Description**: Control visibility of notification bell
- **Default**: `true`

### notificationCount
- **Type**: `number`
- **Required**: No
- **Description**: Number to display in notification badge
- **Example**: Count of unread alerts, warnings, or messages

### customActions
- **Type**: `React.ReactNode`
- **Required**: No
- **Description**: Additional action buttons or status indicators
- **Example**: Emergency buttons, status displays, quick actions

## Styling
```css
.maritime-nav {
  background: linear-gradient(90deg, #16569e 0%, #1e6bb8 100%);
  border-bottom: 2px solid #144a87;
  box-shadow: 0 2px 4px rgba(22, 86, 158, 0.1);
}

.tmsa-navigation {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95);
}

.fleet-command-nav {
  background: #1a202c;
  color: white;
}

.fleet-command-nav .user-menu {
  border: 1px solid #4a5568;
}

.bridge-nav.emergency-mode {
  background: #e53e3e;
  animation: emergency-pulse 2s infinite;
}

@keyframes emergency-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.responsive-nav.mobile {
  padding: 8px 16px;
}

.responsive-nav.mobile .module-title {
  font-size: 16px;
}

@media (max-width: 640px) {
  .maritime-nav .user-info {
    display: none;
  }
  
  .maritime-nav .notification-count {
    transform: scale(0.8);
  }
}
```

## Context Requirements
1. **User Authentication**: Current user session and profile data
2. **Module System**: Available modules and permissions
3. **Notification System**: Real-time alert and message management
4. **Router Integration**: Navigation between application sections

## Common Use Cases
- **TMSA Module Navigation**: Switching between different TMSA elements
- **Fleet Command Centers**: Centralized fleet management interfaces
- **Bridge Operations**: Real-time vessel operation headers
- **Shore Management**: Office-based maritime management systems
- **Mobile Maritime Apps**: Touch-friendly navigation for tablets
- **Emergency Interfaces**: Critical operation mode indicators

## Troubleshooting

### Navigation Issues
- Verify onModuleChange callback is properly implemented
- Check module availability and user permissions
- Ensure router integration is correctly configured
- Validate module identifier consistency

### User Menu Problems
- Confirm user object structure matches interface
- Check avatar image loading and fallback handling
- Verify logout callback implementation
- Ensure proper authentication context

### Notification Failures
- Validate notification count updates
- Check notification click handler implementation
- Ensure proper notification data structure
- Verify real-time update mechanisms

### Responsive Layout Issues
- Test on various screen sizes and devices
- Check mobile menu overlay functionality
- Verify touch interactions work properly
- Ensure critical functions remain accessible on mobile

This navigation component serves as the primary interface header for maritime applications, providing consistent navigation, user management, and status information while adapting to different operational contexts and device capabilities.