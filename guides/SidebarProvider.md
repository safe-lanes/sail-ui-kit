# SidebarProvider Component

## Overview
The `SidebarProvider` component provides state management and context for sidebar functionality in maritime fleet management applications. It handles sidebar open/closed states, mobile responsiveness, keyboard shortcuts, and persistence across sessions.

## Props Interface
```typescript
interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

interface SidebarContextProps {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}
```

## Basic Usage
```tsx
import { SidebarProvider, Sidebar, SidebarInset } from 'scomp-ui/sail-ui-kit';

function MaritimeApplicationLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider 
      defaultOpen={true}
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
    >
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar>
          <MaritimeNavigation />
        </Sidebar>

        {/* Main content area */}
        <SidebarInset>
          <main className="flex-1 p-6">
            <FleetManagementDashboard />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Advanced Fleet Management Layout
```tsx
function AdvancedFleetLayout() {
  const [sidebarState, setSidebarState] = useState({
    open: true,
    persistent: true
  });

  // Restore sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('maritime-sidebar-state');
    if (savedState) {
      setSidebarState(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  const handleSidebarChange = (open: boolean) => {
    const newState = { ...sidebarState, open };
    setSidebarState(newState);
    localStorage.setItem('maritime-sidebar-state', JSON.stringify(newState));
  };

  return (
    <SidebarProvider
      defaultOpen={sidebarState.open}
      onOpenChange={handleSidebarChange}
      className="maritime-layout-provider"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <TopNavigationBar
          moduleName="Fleet Command Center"
          user={currentUser}
        />

        {/* Main Layout */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Fleet Navigation Sidebar */}
          <Sidebar 
            side="left" 
            variant="sidebar" 
            collapsible="icon"
            className="fleet-navigation-sidebar"
          >
            <FleetNavigationMenu />
          </Sidebar>

          {/* Main Content Area */}
          <SidebarInset className="fleet-main-content">
            <div className="p-6 space-y-6">
              <FleetOverviewDashboard />
              <VesselTrackingInterface />
              <CrewManagementPanel />
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
```

## Multi-Sidebar TMSA Layout
```tsx
function TMSAMultiSidebarLayout() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="tmsa-multi-sidebar-layout">
      {/* Left Sidebar Provider */}
      <SidebarProvider
        defaultOpen={leftSidebarOpen}
        onOpenChange={setLeftSidebarOpen}
      >
        <div className="flex min-h-screen">
          {/* Main Navigation Sidebar */}
          <Sidebar 
            side="left"
            variant="sidebar"
            collapsible="offcanvas"
            className="tmsa-main-navigation"
          >
            <TMSAMainNavigation />
          </Sidebar>

          {/* Content Area with Right Sidebar */}
          <SidebarInset className="flex-1">
            <SidebarProvider
              defaultOpen={rightSidebarOpen}
              onOpenChange={setRightSidebarOpen}
            >
              <div className="flex h-full">
                {/* Main Content */}
                <main className="flex-1 p-6">
                  <TMSAComplianceContent />
                </main>

                {/* Right Sidebar for Quick Actions */}
                <Sidebar 
                  side="right"
                  variant="floating"
                  collapsible="offcanvas"
                  className="tmsa-quick-actions"
                >
                  <QuickActionsPanel />
                </Sidebar>
              </div>
            </SidebarProvider>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
```

## Responsive Maritime Dashboard
```tsx
function ResponsiveMaritimeDashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarSettings, setSidebarSettings] = useState({
    defaultOpen: true,
    collapsible: 'offcanvas' as const,
    variant: 'sidebar' as const
  });

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Adjust sidebar behavior for mobile
      setSidebarSettings({
        defaultOpen: !mobile,
        collapsible: mobile ? 'offcanvas' : 'icon',
        variant: mobile ? 'floating' : 'sidebar'
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <SidebarProvider
      defaultOpen={sidebarSettings.defaultOpen}
      className={`responsive-maritime-provider ${isMobile ? 'mobile' : 'desktop'}`}
    >
      <div className="min-h-screen flex">
        <Sidebar 
          variant={sidebarSettings.variant}
          collapsible={sidebarSettings.collapsible}
          className="maritime-responsive-sidebar"
        >
          {isMobile ? <MobileMaritimeNavigation /> : <DesktopMaritimeNavigation />}
        </Sidebar>

        <SidebarInset className="flex-1">
          <ResponsiveMaritimeContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Context Integration and Custom Hooks
```tsx
import { useSidebar } from 'scomp-ui/sail-ui-kit';

function SidebarControlButton() {
  const { toggleSidebar, state, isMobile } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={`sidebar-toggle ${state === 'expanded' ? 'expanded' : 'collapsed'}`}
      aria-label={`${state === 'expanded' ? 'Collapse' : 'Expand'} sidebar`}
    >
      {state === 'expanded' ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
      {!isMobile && (
        <span className="ml-2 text-sm">
          {state === 'expanded' ? 'Collapse' : 'Expand'}
        </span>
      )}
    </button>
  );
}

function MaritimeStatusIndicator() {
  const { state, isMobile } = useSidebar();
  const [vesselStatus, setVesselStatus] = useState('operational');

  return (
    <div className={`status-indicator ${state === 'collapsed' ? 'compact' : 'full'}`}>
      {state === 'expanded' && !isMobile ? (
        <div className="flex items-center gap-2 p-3">
          <div className={`w-3 h-3 rounded-full ${
            vesselStatus === 'operational' ? 'bg-green-500' :
            vesselStatus === 'caution' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm font-medium">
            Vessel Status: {vesselStatus.charAt(0).toUpperCase() + vesselStatus.slice(1)}
          </span>
        </div>
      ) : (
        <div className="flex justify-center p-2">
          <div className={`w-2 h-2 rounded-full ${
            vesselStatus === 'operational' ? 'bg-green-500' :
            vesselStatus === 'caution' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
        </div>
      )}
    </div>
  );
}
```

## Keyboard Shortcuts Integration
```tsx
function KeyboardShortcutAwareSidebar() {
  const [shortcutHelpVisible, setShortcutHelpVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show keyboard shortcuts help
      if (event.key === '?' && event.shiftKey) {
        event.preventDefault();
        setShortcutHelpVisible(true);
      }

      // Quick navigation shortcuts
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            navigate('/dashboard');
            break;
          case '2':
            event.preventDefault();
            navigate('/fleet');
            break;
          case '3':
            event.preventDefault();
            navigate('/crew');
            break;
          case '4':
            event.preventDefault();
            navigate('/safety');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex">
        <Sidebar className="keyboard-aware-sidebar">
          <MaritimeNavigationWithShortcuts />
          
          {/* Keyboard shortcuts hint */}
          <div className="sidebar-footer p-3 border-t">
            <button
              onClick={() => setShortcutHelpVisible(true)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Keyboard shortcuts (?)
            </button>
          </div>
        </Sidebar>

        <SidebarInset>
          <MainContent />
        </SidebarInset>
      </div>

      {/* Keyboard shortcuts modal */}
      {shortcutHelpVisible && (
        <KeyboardShortcutsModal onClose={() => setShortcutHelpVisible(false)} />
      )}
    </SidebarProvider>
  );
}
```

## Emergency Mode Layout
```tsx
function EmergencyModeLayout() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [emergencyType, setEmergencyType] = useState(null);

  useEffect(() => {
    // Listen for emergency alerts
    const handleEmergencyAlert = (event) => {
      setEmergencyMode(true);
      setEmergencyType(event.detail.type);
    };

    window.addEventListener('emergency-alert', handleEmergencyAlert);
    return () => window.removeEventListener('emergency-alert', handleEmergencyAlert);
  }, []);

  return (
    <SidebarProvider
      defaultOpen={true}
      className={`emergency-layout ${emergencyMode ? 'emergency-active' : ''}`}
    >
      <div className={`min-h-screen flex ${emergencyMode ? 'emergency-mode' : ''}`}>
        {emergencyMode && (
          <div className="emergency-banner">
            <div className="emergency-alert">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="font-bold text-red-900">
                EMERGENCY ALERT: {emergencyType?.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        <Sidebar className="emergency-sidebar">
          {emergencyMode ? (
            <EmergencyNavigationMenu emergencyType={emergencyType} />
          ) : (
            <StandardMaritimeNavigation />
          )}
        </Sidebar>

        <SidebarInset>
          {emergencyMode ? (
            <EmergencyResponseInterface emergencyType={emergencyType} />
          ) : (
            <StandardDashboard />
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Props Details

### defaultOpen
- **Type**: `boolean`
- **Required**: No
- **Description**: Initial sidebar open state
- **Default**: `true`

### open
- **Type**: `boolean`
- **Required**: No
- **Description**: Controlled sidebar open state
- **Usage**: Use with onOpenChange for controlled mode

### onOpenChange
- **Type**: `(open: boolean) => void`
- **Required**: No
- **Description**: Callback when sidebar open state changes
- **Usage**: Handle sidebar state changes, persistence

### className
- **Type**: `string`
- **Required**: No
- **Description**: Additional CSS classes for the provider container

### style
- **Type**: `React.CSSProperties`
- **Required**: No
- **Description**: Inline styles for the provider container

## Context Methods (useSidebar Hook)

### state
- **Type**: `'expanded' | 'collapsed'`
- **Description**: Current sidebar state for styling

### toggleSidebar
- **Type**: `() => void`
- **Description**: Function to toggle sidebar open/closed state

### isMobile
- **Type**: `boolean`
- **Description**: Whether the current viewport is mobile size

### openMobile
- **Type**: `boolean`
- **Description**: Mobile-specific sidebar open state

## Styling
```css
.maritime-layout-provider {
  --sidebar-width: 280px;
  --sidebar-width-icon: 60px;
  --sidebar-width-mobile: 240px;
  font-family: 'Inter', sans-serif;
}

.fleet-navigation-sidebar[data-state="collapsed"] {
  --sidebar-width: var(--sidebar-width-icon);
}

.tmsa-multi-sidebar-layout {
  --left-sidebar-width: 280px;
  --right-sidebar-width: 320px;
}

.responsive-maritime-provider.mobile {
  --sidebar-width: var(--sidebar-width-mobile);
}

.emergency-layout.emergency-active {
  --emergency-red: #dc2626;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

.emergency-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--emergency-red);
  color: white;
  padding: 8px 16px;
  text-align: center;
  animation: emergency-pulse 2s infinite;
}

@keyframes emergency-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.keyboard-aware-sidebar .sidebar-footer {
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

@media (max-width: 768px) {
  .maritime-layout-provider {
    --sidebar-width: 100vw;
  }
}
```

## Context Requirements
1. **No External Dependencies**: Self-contained state management
2. **CSS Custom Properties**: Requires CSS variables support
3. **Event Listeners**: Uses window event listeners for keyboard shortcuts
4. **Local Storage**: Optional for state persistence

## Common Use Cases
- **Maritime Application Layouts**: Primary layout structure for fleet management
- **TMSA Compliance Interfaces**: Multi-panel compliance dashboards
- **Bridge Operations**: Real-time navigation and control interfaces
- **Fleet Command Centers**: Comprehensive fleet monitoring layouts
- **Emergency Response**: Critical operation mode interfaces
- **Mobile Maritime Apps**: Responsive layouts for ship-board tablets

## Troubleshooting

### Sidebar State Issues
- Verify SidebarProvider wraps all sidebar components
- Check that useSidebar is called within provider context
- Ensure proper CSS custom properties are defined
- Validate responsive breakpoint handling

### Mobile Responsiveness Problems
- Test sidebar behavior on actual mobile devices
- Verify touch interactions work properly
- Check that mobile sidebar overlays correctly
- Ensure proper z-index stacking

### Performance Concerns
- Minimize re-renders by memoizing context values
- Optimize event listener management
- Consider lazy loading sidebar content
- Use CSS transforms for smooth animations

### Keyboard Shortcut Conflicts
- Ensure shortcuts don't conflict with browser defaults
- Test accessibility with screen readers
- Verify focus management during sidebar toggle
- Implement proper ARIA attributes

This provider component serves as the foundation for sidebar functionality in maritime applications, offering robust state management, responsive behavior, and integration capabilities while maintaining excellent performance and accessibility standards.