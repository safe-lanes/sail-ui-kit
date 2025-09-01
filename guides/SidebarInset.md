# SidebarInset Component

## Overview
The `SidebarInset` component provides a main content area that automatically adjusts to sidebar state changes in maritime fleet management applications. It serves as the primary container for application content alongside sidebar navigation.

## Props Interface
```typescript
interface SidebarInsetProps {
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage
```tsx
import { SidebarProvider, Sidebar, SidebarInset } from 'scomp-ui/sail-ui-kit';

function MaritimeApplicationLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <MaritimeNavigation />
        </Sidebar>

        <SidebarInset className="maritime-main-content">
          <main className="p-6">
            <FleetManagementDashboard />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Fleet Management Dashboard Layout
```tsx
function FleetManagementLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex bg-gray-50">
        {/* Fleet Navigation Sidebar */}
        <Sidebar variant="sidebar" collapsible="icon">
          <FleetNavigationMenu />
        </Sidebar>

        {/* Main Dashboard Content */}
        <SidebarInset className="flex-1 fleet-dashboard-content">
          <div className="h-full flex flex-col">
            {/* Dashboard Header */}
            <header className="bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Fleet Command Center</h1>
                  <p className="text-gray-600">Monitor and manage your maritime fleet operations</p>
                </div>
                <div className="flex items-center gap-4">
                  <FleetStatusIndicator />
                  <QuickActionButtons />
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <main className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard title="Active Vessels" value="12" icon={<Ship />} />
                  <MetricCard title="Total Crew" value="156" icon={<Users />} />
                  <MetricCard title="Voyages" value="8" icon={<Navigation />} />
                  <MetricCard title="Compliance" value="94%" icon={<Shield />} />
                </div>

                {/* Fleet Overview */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <FleetTrackingMap />
                  </div>
                  <div>
                    <RecentActivityFeed />
                  </div>
                </div>

                {/* Operations Table */}
                <div className="bg-white rounded-lg shadow">
                  <VesselOperationsTable />
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## TMSA Compliance Interface
```tsx
function TMSAComplianceInterface() {
  const [selectedElement, setSelectedElement] = useState('safety');

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex">
        {/* TMSA Navigation */}
        <Sidebar variant="sidebar" collapsible="icon" className="tmsa-sidebar">
          <TMSAElementNavigation 
            selectedElement={selectedElement}
            onElementSelect={setSelectedElement}
          />
        </Sidebar>

        {/* TMSA Content Area */}
        <SidebarInset className="tmsa-compliance-content">
          <div className="h-full flex flex-col">
            {/* TMSA Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">TMSA Element {getElementNumber(selectedElement)}</h1>
                  <p className="text-blue-100">{getElementName(selectedElement)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <ComplianceScore element={selectedElement} />
                  <TMSAStatusBadge element={selectedElement} />
                </div>
              </div>
            </div>

            {/* TMSA Content */}
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Element Overview */}
                <div className="bg-white rounded-lg shadow p-6">
                  <TMSAElementOverview element={selectedElement} />
                </div>

                {/* Assessment Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Assessment Criteria</h3>
                    <TMSAAssessmentCriteria element={selectedElement} />
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Evidence & Documentation</h3>
                    <TMSADocumentationPanel element={selectedElement} />
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Action Items</h3>
                  <TMSAActionItems element={selectedElement} />
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Bridge Operations Interface
```tsx
function BridgeOperationsInterface() {
  const [operationalMode, setOperationalMode] = useState('navigation');

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex bg-blue-900">
        {/* Bridge Controls Sidebar */}
        <Sidebar variant="sidebar" collapsible="icon" className="bridge-sidebar">
          <BridgeControlsNavigation 
            operationalMode={operationalMode}
            onModeChange={setOperationalMode}
          />
        </Sidebar>

        {/* Bridge Main Interface */}
        <SidebarInset className="bridge-main-interface">
          <div className="h-full flex flex-col text-white">
            {/* Bridge Status Bar */}
            <div className="bg-blue-800 px-6 py-3 border-b border-blue-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <VesselStatusIndicator />
                  <NavigationStatus />
                  <WeatherConditions />
                </div>
                <div className="flex items-center gap-4">
                  <CurrentTime />
                  <EmergencyButton />
                </div>
              </div>
            </div>

            {/* Bridge Interface Content */}
            <main className="flex-1 p-4 overflow-hidden">
              <div className="h-full grid grid-cols-12 gap-4">
                {/* Primary Display */}
                <div className="col-span-8">
                  {operationalMode === 'navigation' && <NavigationDisplay />}
                  {operationalMode === 'radar' && <RadarDisplay />}
                  {operationalMode === 'chart' && <ElectronicChart />}
                  {operationalMode === 'weather' && <WeatherRouting />}
                </div>

                {/* Secondary Controls */}
                <div className="col-span-4 space-y-4">
                  <BridgeInstruments />
                  <CommunicationsPanel />
                  <AlarmPanel />
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Responsive Content Layout
```tsx
function ResponsiveMaritimeContent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex">
        <Sidebar 
          variant={isMobile ? 'floating' : 'sidebar'}
          collapsible={isMobile ? 'offcanvas' : 'icon'}
        >
          <ResponsiveNavigationMenu />
        </Sidebar>

        <SidebarInset className={`responsive-content ${isMobile ? 'mobile' : 'desktop'}`}>
          <div className="h-full flex flex-col">
            {/* Mobile Header */}
            {isMobile && (
              <div className="bg-white border-b px-4 py-3">
                <MobileHeader />
              </div>
            )}

            {/* Content Area */}
            <main className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
              {isMobile ? <MobileContentLayout /> : <DesktopContentLayout />}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Multi-Panel Layout with Secondary Sidebar
```tsx
function MultiPanelMaritimeLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex">
        {/* Primary Navigation */}
        <Sidebar variant="sidebar" collapsible="icon">
          <PrimaryNavigationMenu />
        </Sidebar>

        {/* Main Content with Secondary Sidebar */}
        <SidebarInset className="flex-1">
          <SidebarProvider defaultOpen={false}>
            <div className="h-full flex">
              {/* Main Content */}
              <main className="flex-1 p-6">
                <div className="space-y-6">
                  <PageHeader />
                  <MainContentArea />
                </div>
              </main>

              {/* Secondary Sidebar (Right) */}
              <Sidebar 
                side="right" 
                variant="floating" 
                collapsible="offcanvas"
                className="secondary-sidebar"
              >
                <QuickActionsPanel />
                <NotificationsPanel />
                <LiveDataFeed />
              </Sidebar>
            </div>
          </SidebarProvider>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Advanced Content Management
```tsx
function AdvancedContentManagement() {
  const [contentLayout, setContentLayout] = useState('standard');
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <SidebarProvider defaultOpen={!fullscreen}>
      <div className="min-h-screen flex">
        {!fullscreen && (
          <Sidebar variant="sidebar" collapsible="icon">
            <NavigationMenu />
          </Sidebar>
        )}

        <SidebarInset className={`advanced-content ${fullscreen ? 'fullscreen' : ''}`}>
          <div className="h-full flex flex-col">
            {/* Content Controls */}
            <div className="bg-white border-b px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ContentLayoutSelector 
                    layout={contentLayout}
                    onLayoutChange={setContentLayout}
                  />
                  <ViewOptionsMenu />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFullscreen(!fullscreen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    {fullscreen ? <Minimize2 /> : <Maximize2 />}
                  </button>
                  <ExportButton />
                  <PrintButton />
                </div>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <main className="flex-1 overflow-hidden">
              {contentLayout === 'standard' && <StandardContentView />}
              {contentLayout === 'split' && <SplitContentView />}
              {contentLayout === 'grid' && <GridContentView />}
              {contentLayout === 'timeline' && <TimelineContentView />}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Props Details

### className
- **Type**: `string`
- **Required**: No
- **Description**: Additional CSS classes for styling the content area

### children
- **Type**: `React.ReactNode`
- **Required**: Yes
- **Description**: Content to be rendered in the inset area

## Styling
```css
.maritime-main-content {
  background: #f8fafc;
  transition: margin-left 0.2s ease-in-out;
}

.fleet-dashboard-content {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.tmsa-compliance-content {
  background: #fff;
}

.bridge-main-interface {
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
}

.responsive-content.mobile {
  margin-left: 0;
  padding: 0;
}

.responsive-content.desktop {
  margin-left: var(--sidebar-width);
}

.secondary-sidebar {
  width: 300px;
  border-left: 1px solid #e2e8f0;
}

.advanced-content.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .maritime-main-content {
    margin-left: 0;
    width: 100%;
  }
}

/* Sidebar state adjustments */
.sidebar-inset {
  transition: all 0.2s ease-in-out;
}

/* Inset variant specific */
.sidebar[data-variant="inset"] ~ .sidebar-inset {
  margin: 8px;
  margin-left: calc(var(--sidebar-width) + 16px);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Floating variant adjustments */
.sidebar[data-variant="floating"] ~ .sidebar-inset {
  margin-left: calc(var(--sidebar-width) + 32px);
}

/* Collapsed state */
.sidebar[data-state="collapsed"] ~ .sidebar-inset {
  margin-left: calc(var(--sidebar-width-icon) + 16px);
}
```

## Context Requirements
1. **SidebarProvider**: Must be used within SidebarProvider context
2. **CSS Custom Properties**: Requires sidebar width variables
3. **Responsive Framework**: Benefits from responsive grid and layout utilities

## Common Use Cases
- **Dashboard Layouts**: Main content area for maritime dashboards
- **TMSA Compliance Interfaces**: Compliance assessment and documentation screens
- **Bridge Operations**: Real-time operational interfaces and controls
- **Fleet Management**: Comprehensive fleet monitoring and control panels
- **Data Analysis**: Analytics and reporting interfaces
- **Multi-Panel Layouts**: Complex interfaces with primary and secondary content areas

## Troubleshooting

### Content Overflow Issues
- Ensure proper height constraints on container elements
- Use `overflow-y-auto` for scrollable content areas
- Test content behavior when sidebar state changes
- Verify responsive behavior on smaller screens

### Layout Shifting Problems
- Check that transition animations are properly defined
- Verify margin calculations match sidebar width variables
- Test layout stability during sidebar collapse/expand
- Ensure content doesn't jump during state transitions

### Responsive Behavior Issues
- Test layout on various screen sizes and devices
- Verify mobile-specific styling overrides work correctly
- Check that content remains accessible when sidebar is hidden
- Ensure touch interactions work properly on mobile devices

### Performance Concerns
- Minimize re-renders during sidebar state changes
- Use CSS transforms instead of layout changes where possible
- Optimize content rendering for large datasets
- Consider lazy loading for complex dashboard components

This component serves as the primary content container in maritime applications, providing a flexible, responsive area that adapts to sidebar state changes while maintaining excellent usability and performance across different operational contexts and device types.