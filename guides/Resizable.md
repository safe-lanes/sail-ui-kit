# Resizable Component Guide

## Overview
The Resizable component provides interactive panels with draggable borders for maritime applications. It enables flexible layouts for fleet dashboards, crew management interfaces, and multi-panel TMSA-compliant systems.

## Component Interface

```typescript
interface ResizableProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

interface ResizablePanelProps {
  className?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  onResize?: (size: number) => void;
  children: React.ReactNode;
}

interface ResizableHandleProps {
  className?: string;
  withHandle?: boolean;
  disabled?: boolean;
}
```

## Key Features
- **Maritime Layouts**: Optimized for fleet management dashboard layouts
- **Flexible Sizing**: Percentage-based and pixel-based sizing options
- **Collapsible Panels**: Support for collapsing panels to save space
- **Persistent State**: Remember panel sizes across sessions
- **Touch Support**: Mobile-friendly resize handles

## Basic Usage

```tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from 'scomp-ui/sail-ui-kit';

function FleetDashboardLayout() {
  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Sidebar Panel */}
        <ResizablePanel 
          defaultSize={25} 
          minSize={20} 
          maxSize={40}
          className="bg-[#16569e] text-white"
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Fleet Navigation</h2>
            <nav className="space-y-2">
              <a href="/fleet" className="block py-2 px-3 rounded hover:bg-blue-600">
                Vessel Registry
              </a>
              <a href="/crew" className="block py-2 px-3 rounded hover:bg-blue-600">
                Crew Management
              </a>
              <a href="/operations" className="block py-2 px-3 rounded hover:bg-blue-600">
                Operations
              </a>
              <a href="/safety" className="block py-2 px-3 rounded hover:bg-blue-600">
                Safety & Compliance
              </a>
            </nav>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle className="w-2 bg-gray-200 hover:bg-gray-300" />
        
        {/* Main Content Panel */}
        <ResizablePanel defaultSize={75} minSize={60}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Header Panel */}
            <ResizablePanel 
              defaultSize={15} 
              minSize={10} 
              maxSize={20}
              className="bg-white border-b border-gray-200"
            >
              <div className="p-4">
                <h1 className="text-2xl font-bold text-[#16569e]">Fleet Management Dashboard</h1>
                <p className="text-gray-600">Real-time fleet operations overview</p>
              </div>
            </ResizablePanel>
            
            <ResizableHandle className="h-2 bg-gray-100 hover:bg-gray-200" />
            
            {/* Content Panel */}
            <ResizablePanel defaultSize={85} className="bg-gray-50">
              <div className="p-6 h-full overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Dashboard Content */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Active Vessels</h3>
                    <div className="text-3xl font-bold text-[#16569e]">24</div>
                    <p className="text-gray-600">Currently at sea</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Crew Members</h3>
                    <div className="text-3xl font-bold text-[#16569e]">486</div>
                    <p className="text-gray-600">Active crew</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Safety Score</h3>
                    <div className="text-3xl font-bold text-green-600">95%</div>
                    <p className="text-gray-600">TMSA compliance</p>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## Crew Appraisal Interface Layout

```tsx
function CrewAppraisalLayout() {
  const [leftPanelSize, setLeftPanelSize] = useState(30);
  const [rightPanelSize, setRightPanelSize] = useState(25);

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        {/* Crew List Panel */}
        <ResizablePanel 
          defaultSize={leftPanelSize}
          minSize={25}
          maxSize={50}
          onResize={setLeftPanelSize}
          className="bg-white border-r border-gray-200"
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#16569e]">Crew Members</h2>
              <button className="text-sm text-[#16569e] hover:underline">
                Add New
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search crew members..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>
            
            <div className="flex-1 overflow-auto space-y-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div 
                  key={i}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="font-medium text-gray-900">John Smith {i + 1}</div>
                  <div className="text-sm text-gray-600">Captain • MV Container {i + 1}</div>
                  <div className="text-xs text-gray-500 mt-1">Last appraisal: 2024-01-15</div>
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Appraisal Form */}
        <ResizablePanel defaultSize={45} minSize={40}>
          <div className="p-6 h-full overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#16569e] mb-2">Crew Performance Appraisal</h1>
              <p className="text-gray-600">John Smith • Captain • MV Container 1</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Part A - Leadership Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Leadership Skills (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Communication (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Part B - Technical Competency</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technical Skills (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Information Panel */}
        <ResizablePanel 
          defaultSize={rightPanelSize}
          minSize={20}
          maxSize={35}
          onResize={setRightPanelSize}
          collapsible
          className="bg-gray-50 border-l border-gray-200"
        >
          <div className="p-4 h-full overflow-auto">
            <h3 className="text-lg font-semibold text-[#16569e] mb-4">Appraisal History</h3>
            
            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded p-3">
                <div className="font-medium text-gray-900">Annual Review 2023</div>
                <div className="text-sm text-gray-600">Score: 4.2/5.0</div>
                <div className="text-xs text-gray-500">Completed: Dec 15, 2023</div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded p-3">
                <div className="font-medium text-gray-900">Mid-Year Review 2023</div>
                <div className="text-sm text-gray-600">Score: 4.0/5.0</div>
                <div className="text-xs text-gray-500">Completed: Jun 30, 2023</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Current Certifications</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>STCW Certificate</span>
                  <span className="text-green-600">Valid</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Medical Certificate</span>
                  <span className="text-yellow-600">Expiring Soon</span>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## Vessel Operations Split View

```tsx
function VesselOperationsSplitView() {
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="vertical">
        {/* Map Panel */}
        <ResizablePanel 
          defaultSize={60}
          minSize={30}
          collapsible
          collapsedSize={5}
          className="bg-blue-100 relative"
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-[#16569e] mb-2">
                <MapPin className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-[#16569e]">Vessel Tracking Map</h3>
              <p className="text-gray-600">Interactive fleet location display</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsMapCollapsed(!isMapCollapsed)}
            className="absolute top-4 right-4 bg-white shadow-md rounded p-2 hover:bg-gray-50"
          >
            {isMapCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
        </ResizablePanel>

        <ResizableHandle withHandle className="h-2 bg-gray-200 hover:bg-gray-300" />

        {/* Data Panel */}
        <ResizablePanel defaultSize={40} minSize={25}>
          <ResizablePanelGroup direction="horizontal">
            {/* Vessel List */}
            <ResizablePanel defaultSize={50} className="bg-white">
              <div className="p-4 h-full">
                <h3 className="text-lg font-semibold text-[#16569e] mb-4">Active Vessels</h3>
                <div className="overflow-auto h-full">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Vessel</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Speed</th>
                        <th className="text-left py-2">ETA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }, (_, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2">MV Container {i + 1}</td>
                          <td className="py-2">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="py-2">14.2 kts</td>
                          <td className="py-2">Jan 25, 08:00</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Details Panel */}
            <ResizablePanel defaultSize={50} className="bg-gray-50">
              <div className="p-4 h-full">
                <h3 className="text-lg font-semibold text-[#16569e] mb-4">Vessel Details</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">MV Container 1</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>IMO: 9123456</div>
                      <div>Flag: Panama</div>
                      <div>GT: 75,000</div>
                      <div>Built: 2018</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Current Position</h4>
                    <div className="text-sm space-y-1">
                      <div>Lat: 35.6762°N</div>
                      <div>Long: 139.6503°E</div>
                      <div>Course: 085°</div>
                      <div>Speed: 14.2 knots</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Next Port</h4>
                    <div className="text-sm">
                      <div className="font-medium">Tokyo, Japan</div>
                      <div>ETA: Jan 25, 2024 08:00 UTC</div>
                      <div>Distance: 120 nm</div>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## Collapsible Sidebar Example

```tsx
function CollapsibleSidebarLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={sidebarCollapsed ? 5 : 20}
          minSize={5}
          maxSize={30}
          collapsible
          collapsedSize={5}
          onCollapse={() => setSidebarCollapsed(true)}
          onExpand={() => setSidebarCollapsed(false)}
          className="bg-[#16569e] text-white"
        >
          <div className="p-4 h-full">
            <div className="flex items-center justify-between mb-6">
              {!sidebarCollapsed && (
                <h2 className="text-lg font-semibold">Maritime Control</h2>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-white hover:bg-blue-600 p-1 rounded"
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            </div>
            
            <nav className="space-y-2">
              <SidebarItem 
                icon={Ship} 
                label="Fleet Management" 
                collapsed={sidebarCollapsed}
                href="/fleet"
              />
              <SidebarItem 
                icon={Users} 
                label="Crew Operations" 
                collapsed={sidebarCollapsed}
                href="/crew"
              />
              <SidebarItem 
                icon={Shield} 
                label="Safety & Compliance" 
                collapsed={sidebarCollapsed}
                href="/safety"
              />
              <SidebarItem 
                icon={BarChart} 
                label="Reports" 
                collapsed={sidebarCollapsed}
                href="/reports"
              />
            </nav>
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-gray-300" />

        <ResizablePanel defaultSize={80}>
          <div className="p-6 h-full bg-gray-50">
            <h1 className="text-2xl font-bold text-[#16569e] mb-6">
              Main Content Area
            </h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">
                This is the main content area that adjusts when the sidebar is collapsed or expanded.
                The resizable layout provides a flexible interface for maritime operations.
              </p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, collapsed, href }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  collapsed: boolean;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors"
      title={collapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </a>
  );
}
```

## Persistent Layout State

```tsx
function PersistentResizableLayout() {
  // Load saved sizes from localStorage
  const [leftPanelSize, setLeftPanelSize] = useState(() => {
    const saved = localStorage.getItem('fleet-layout-left');
    return saved ? parseInt(saved, 10) : 25;
  });

  const [rightPanelSize, setRightPanelSize] = useState(() => {
    const saved = localStorage.getItem('fleet-layout-right');
    return saved ? parseInt(saved, 10) : 30;
  });

  // Save sizes to localStorage
  const handleLeftResize = (size: number) => {
    setLeftPanelSize(size);
    localStorage.setItem('fleet-layout-left', size.toString());
  };

  const handleRightResize = (size: number) => {
    setRightPanelSize(size);
    localStorage.setItem('fleet-layout-right', size.toString());
  };

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={leftPanelSize}
          minSize={20}
          maxSize={40}
          onResize={handleLeftResize}
          className="bg-white border-r border-gray-200"
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-[#16569e] mb-4">Navigation</h2>
            <p className="text-sm text-gray-600">
              Panel size: {leftPanelSize}% (saved automatically)
            </p>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={100 - leftPanelSize - rightPanelSize}>
          <div className="p-6 h-full bg-gray-50">
            <h1 className="text-xl font-bold text-[#16569e]">Main Content</h1>
            <p className="text-gray-600 mt-2">
              The layout remembers your preferred panel sizes and restores them when you return.
            </p>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={rightPanelSize}
          minSize={25}
          maxSize={50}
          onResize={handleRightResize}
          className="bg-white border-l border-gray-200"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-[#16569e] mb-4">Details</h3>
            <p className="text-sm text-gray-600">
              Panel size: {rightPanelSize}% (saved automatically)
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## Best Practices

1. **Sensible Defaults**: Set appropriate default sizes for maritime workflows
2. **Minimum Sizes**: Ensure panels maintain usability at minimum sizes
3. **Persistent State**: Save and restore panel sizes for better user experience
4. **Mobile Consideration**: Consider stack layouts for mobile devices
5. **Visual Feedback**: Provide clear resize handle indicators
6. **Performance**: Avoid expensive operations during resize events

## Context Requirements

The Resizable component works with:
- **Layout Systems**: Integration with responsive grid systems
- **State Management**: Panel size persistence and state management
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Keyboard navigation for resize handles

## Troubleshooting

### Common Issues

**Panels not resizing correctly**
```tsx
// Ensure proper container height
<div className="h-screen"> {/* or h-full with parent height */}
  <ResizablePanelGroup direction="horizontal">
    {/* panels */}
  </ResizablePanelGroup>
</div>
```

**Handle not visible**
```tsx
// Ensure handle has proper styling
<ResizableHandle 
  withHandle 
  className="w-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
/>
```

**Performance issues during resize**
```tsx
// Debounce expensive operations
const debouncedOnResize = useMemo(
  () => debounce((size: number) => {
    // expensive operation
  }, 100),
  []
);

<ResizablePanel onResize={debouncedOnResize}>
  {/* panel content */}
</ResizablePanel>
```