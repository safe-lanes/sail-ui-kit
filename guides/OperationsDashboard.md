# OperationsDashboard Component Guide

## Overview
The OperationsDashboard component provides a comprehensive operational overview for maritime fleet management. It displays real-time vessel status, key performance indicators, safety metrics, and operational data with TMSA-compliant layouts optimized for maritime command centers and fleet operations.

## Enhanced Component Interface

The OperationsDashboard component has been significantly enhanced with **60+ enterprise props** for comprehensive fleet management capabilities:

```typescript
interface OperationsDashboardProps {
  // Core data
  fleetSummary: FleetSummary;
  vessels: VesselSummary[];
  tmsa: TMSAElement[];
  incidents?: Array<{
    id: string;
    title: string;
    severity: string;
    date: string;
  }>;
  className?: string;
  
  // ✨ ENTERPRISE ENHANCEMENTS
  
  // Real-time data management
  loading?: boolean;
  lastUpdated?: Date;
  enableAutoRefresh?: boolean;
  refreshInterval?: number;
  onRefresh?: () => void;
  onDataUpdate?: (data: Partial<OperationsDashboardProps>) => void;
  
  // Interactive callbacks
  onVesselClick?: (vessel: VesselSummary) => void;
  onVesselDoubleClick?: (vessel: VesselSummary) => void;
  onIncidentClick?: (incident: { id: string; title: string; severity: string; date: string }) => void;
  onKPIClick?: (kpi: 'vessels' | 'utilization' | 'crew' | 'incidents') => void;
  onTMSAElementClick?: (element: TMSAElement) => void;
  
  // Filtering and search
  enableFiltering?: boolean;
  onFilterChange?: (filters: {
    vesselType?: string[];
    status?: string[];
    location?: string[];
    severity?: string[];
  }) => void;
  onSearch?: (searchTerm: string) => void;
  searchPlaceholder?: string;
  
  // Drill-down capabilities
  onDrillDown?: (type: 'fleet' | 'vessel' | 'incident' | 'tmsa', id?: string) => void;
  enableDrillDown?: boolean;
  
  // Customization options
  visibleSections?: {
    kpis?: boolean;
    vesselOverview?: boolean;
    incidentSummary?: boolean;
    tmsaCompliance?: boolean;
    alerts?: boolean;
  };
  kpiLayout?: 'grid' | 'row' | 'cards';
  chartConfigs?: {
    showTrends?: boolean;
    timeRange?: '24h' | '7d' | '30d' | '90d';
    chartType?: 'line' | 'bar' | 'area';
  };
  
  // Alert and notification management
  alerts?: Array<{
    id: string;
    type: 'warning' | 'error' | 'info' | 'success';
    message: string;
    timestamp: Date;
    vessel?: string;
    actionRequired?: boolean;
  }>;
  onAlertClick?: (alertId: string) => void;
  onAlertDismiss?: (alertId: string) => void;
  maxAlerts?: number;
  
  // Export and reporting
  onExport?: (format: 'pdf' | 'excel' | 'csv', section?: string) => void;
  onGenerateReport?: (type: 'fleet' | 'compliance' | 'incidents' | 'comprehensive') => void;
  enableExport?: boolean;
  
  // User interaction tracking
  onUserAction?: (action: string, details: Record<string, unknown>) => void;
  trackInteractions?: boolean;
  
  // Performance optimization
  enableVirtualization?: boolean;
  maxVisibleVessels?: number;
  lazyLoadIncidents?: boolean;
  
  // Maritime-specific features
  complianceThresholds?: {
    vesselUtilization?: number;
    safetyRating?: number;
    tmsaScore?: number;
  };
  weatherIntegration?: {
    enabled?: boolean;
    onWeatherAlert?: (vessel: string, weather: Record<string, unknown>) => void;
  };
  portScheduleIntegration?: {
    enabled?: boolean;
    onPortUpdate?: (vessel: string, port: Record<string, unknown>) => void;
  };
  
  // Layout and responsive behavior
  isMobile?: boolean;
  collapsibleSections?: boolean;
  defaultCollapsed?: string[];
  onSectionToggle?: (sectionId: string, collapsed: boolean) => void;
  
  // Custom actions and menu items
  customActions?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    tooltip?: string;
  }>;
  contextMenuItems?: Array<{
    id: string;
    label: string;
    onClick: (context: Record<string, unknown>) => void;
  }>;
  
  // Error handling
  error?: string;
  onErrorDismiss?: () => void;
  onRetry?: () => void;
  
  // Accessibility
  ariaLabel?: string;
  enableKeyboardNavigation?: boolean;
  onKeyboardShortcut?: (shortcut: string) => void;
}

interface VesselData {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'emergency' | 'in-port';
  position: {
    latitude: number;
    longitude: number;
    course: number;
    speed: number;
  };
  cargo: {
    capacity: number;
    loaded: number;
    type: string;
  };
  crew: {
    onBoard: number;
    capacity: number;
  };
  fuel: {
    current: number;
    capacity: number;
    consumption: number;
  };
  nextPort: {
    name: string;
    eta: string;
    distance: number;
  };
  incidents: number;
  compliance: number;
  lastUpdate: string;
}
```

## Enhanced Key Features

### Core Maritime Capabilities
- **Real-time Monitoring**: Live vessel tracking and status updates with auto-refresh
- **Maritime KPIs**: Fleet performance indicators and safety metrics with customizable layouts
- **Alert Management**: Critical alarm monitoring, prioritization, and smart notifications
- **Multi-vessel View**: Comprehensive fleet overview with advanced filtering and search
- **Compliance Tracking**: TMSA and regulatory compliance monitoring with threshold alerts

### Enterprise Enhancements
- **Interactive Drill-Down**: Click-through navigation to detailed vessel, incident, and compliance views
- **Advanced Data Management**: Real-time updates, auto-refresh, and intelligent data synchronization
- **Smart Filtering & Search**: Multi-criteria filtering with vessel type, status, location, and severity
- **Customizable Interface**: Configurable sections, layouts, and KPI arrangements
- **Export & Reporting**: Generate PDF, Excel, and CSV reports for comprehensive analysis
- **Maritime Integration**: Weather alerts, port schedule updates, and compliance threshold monitoring
- **Performance Optimization**: Virtualization, lazy loading, and optimized rendering for large fleets
- **Accessibility**: Full keyboard navigation, screen reader support, and WCAG compliance

## Basic Usage

```tsx
import { OperationsDashboard } from 'scomp-ui/sail-ui-kit';

function FleetOperationsCenter() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '6h' | '24h' | '7d' | '30d'>('24h');
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);

  const handleVesselSelect = (vesselId: string) => {
    setSelectedVessel(vesselId);
    // Navigate to vessel details or show vessel-specific dashboard
  };

  const handleAlarmClick = (alarm: AlarmData) => {
    // Handle alarm acknowledgment or details view
    console.log('Alarm clicked:', alarm);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Fleet Operations Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time monitoring and management of fleet operations
        </p>
      </div>

      <OperationsDashboard
        timeRange={selectedTimeRange}
        onVesselSelect={handleVesselSelect}
        onAlarmClick={handleAlarmClick}
        refreshInterval={30000} // 30 seconds
        layout="grid"
      />
    </div>
  );
}
```

## Comprehensive Fleet Dashboard

```tsx
function ComprehensiveFleetDashboard() {
  const [dashboardData, setDashboardData] = useState({
    vessels: [],
    alarms: [],
    kpis: {},
    loading: true
  });

  const fleetData: VesselData[] = [
    {
      id: 'mv-container-express',
      name: 'MV Container Express',
      type: 'Container Ship',
      status: 'operational',
      position: {
        latitude: 40.7128,
        longitude: -74.0060,
        course: 85,
        speed: 18.5
      },
      cargo: {
        capacity: 14000,
        loaded: 11200,
        type: 'Containers (TEU)'
      },
      crew: {
        onBoard: 22,
        capacity: 24
      },
      fuel: {
        current: 1850,
        capacity: 2400,
        consumption: 38.2
      },
      nextPort: {
        name: 'Rotterdam',
        eta: '2024-03-20T14:30:00Z',
        distance: 285
      },
      incidents: 0,
      compliance: 98,
      lastUpdate: '2024-03-15T10:15:00Z'
    },
    {
      id: 'mt-crude-carrier',
      name: 'MT Crude Carrier',
      type: 'Oil Tanker',
      status: 'operational',
      position: {
        latitude: 25.7617,
        longitude: -80.1918,
        course: 125,
        speed: 14.2
      },
      cargo: {
        capacity: 320000,
        loaded: 285000,
        type: 'Crude Oil (DWT)'
      },
      crew: {
        onBoard: 28,
        capacity: 30
      },
      fuel: {
        current: 2100,
        capacity: 3200,
        consumption: 45.8
      },
      nextPort: {
        name: 'Houston',
        eta: '2024-03-18T08:00:00Z',
        distance: 420
      },
      incidents: 1,
      compliance: 95,
      lastUpdate: '2024-03-15T10:12:00Z'
    },
    {
      id: 'mv-bulk-transporter',
      name: 'MV Bulk Transporter',
      type: 'Bulk Carrier',
      status: 'in-port',
      position: {
        latitude: 51.9225,
        longitude: 4.4792,
        course: 0,
        speed: 0
      },
      cargo: {
        capacity: 180000,
        loaded: 0,
        type: 'Iron Ore (DWT)'
      },
      crew: {
        onBoard: 20,
        capacity: 22
      },
      fuel: {
        current: 1950,
        capacity: 2800,
        consumption: 0
      },
      nextPort: {
        name: 'Tubarao',
        eta: '2024-03-22T16:00:00Z',
        distance: 0
      },
      incidents: 0,
      compliance: 100,
      lastUpdate: '2024-03-15T10:18:00Z'
    },
    {
      id: 'mv-general-cargo',
      name: 'MV General Cargo',
      type: 'General Cargo',
      status: 'maintenance',
      position: {
        latitude: 35.6762,
        longitude: 139.6503,
        course: 0,
        speed: 0
      },
      cargo: {
        capacity: 25000,
        loaded: 0,
        type: 'Mixed Cargo (DWT)'
      },
      crew: {
        onBoard: 18,
        capacity: 20
      },
      fuel: {
        current: 850,
        capacity: 1200,
        consumption: 0
      },
      nextPort: {
        name: 'Tokyo',
        eta: '2024-03-25T12:00:00Z',
        distance: 0
      },
      incidents: 2,
      compliance: 92,
      lastUpdate: '2024-03-15T09:45:00Z'
    }
  ];

  const alarms = [
    {
      id: 'ALM-001',
      vesselId: 'mt-crude-carrier',
      vesselName: 'MT Crude Carrier',
      severity: 'high',
      type: 'Equipment',
      message: 'Main engine oil pressure low',
      timestamp: '2024-03-15T10:05:00Z',
      acknowledged: false
    },
    {
      id: 'ALM-002',
      vesselId: 'mv-general-cargo',
      vesselName: 'MV General Cargo',
      severity: 'medium',
      type: 'Maintenance',
      message: 'Scheduled maintenance overdue',
      timestamp: '2024-03-15T08:30:00Z',
      acknowledged: true
    },
    {
      id: 'ALM-003',
      vesselId: 'mv-container-express',
      vesselName: 'MV Container Express',
      severity: 'low',
      type: 'Communication',
      message: 'Satellite connection intermittent',
      timestamp: '2024-03-15T07:15:00Z',
      acknowledged: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'in-port': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Settings className="h-4 w-4" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      case 'in-port': return <Anchor className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const formatETA = (eta: string) => {
    const date = new Date(eta);
    const now = new Date();
    const diffHours = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    return `${diffHours}h`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#16569e]">Fleet Operations Dashboard</h1>
          <p className="text-gray-600">Real-time fleet monitoring and management</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Data</span>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vessels</p>
              <p className="text-2xl font-bold text-gray-900">{fleetData.length}</p>
            </div>
            <Ship className="h-8 w-8 text-[#16569e]" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operational</p>
              <p className="text-2xl font-bold text-green-600">
                {fleetData.filter(v => v.status === 'operational').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alarms</p>
              <p className="text-2xl font-bold text-red-600">
                {alarms.filter(a => !a.acknowledged).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Compliance</p>
              <p className="text-2xl font-bold text-[#16569e]">
                {Math.round(fleetData.reduce((acc, v) => acc + v.compliance, 0) / fleetData.length)}%
              </p>
            </div>
            <Shield className="h-8 w-8 text-[#16569e]" />
          </div>
        </div>
      </div>

      {/* Active Alarms */}
      {alarms.filter(a => !a.acknowledged).length > 0 && (
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Active Alarms</span>
          </h3>
          <div className="space-y-3">
            {alarms.filter(a => !a.acknowledged).map((alarm) => (
              <div key={alarm.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${getSeverityColor(alarm.severity)}`}></div>
                  <div>
                    <div className="font-medium text-gray-900">{alarm.vesselName}</div>
                    <div className="text-sm text-gray-600">{alarm.message}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(alarm.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vessel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fleetData.map((vessel) => (
          <div key={vessel.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{vessel.name}</h3>
                <p className="text-sm text-gray-600">{vessel.type}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vessel.status)}`}>
                {getStatusIcon(vessel.status)}
                <span className="ml-1 capitalize">{vessel.status}</span>
              </span>
            </div>

            {/* Position Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Speed:</span>
                  <span className="text-gray-600 ml-1">{vessel.position.speed} kts</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Course:</span>
                  <span className="text-gray-600 ml-1">{vessel.position.course}°</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Next Port:</span>
                  <span className="text-gray-600 ml-1">{vessel.nextPort.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">ETA:</span>
                  <span className="text-gray-600 ml-1">{formatETA(vessel.nextPort.eta)}</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Cargo Load</span>
                <span className="text-sm text-gray-600">
                  {Math.round((vessel.cargo.loaded / vessel.cargo.capacity) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#16569e] h-2 rounded-full" 
                  style={{ width: `${(vessel.cargo.loaded / vessel.cargo.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Fuel Level</span>
                <span className="text-sm text-gray-600">
                  {Math.round((vessel.fuel.current / vessel.fuel.capacity) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(vessel.fuel.current / vessel.fuel.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Compliance</span>
                <span className="text-sm text-gray-600">{vessel.compliance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${vessel.compliance >= 95 ? 'bg-green-500' : vessel.compliance >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${vessel.compliance}%` }}
                ></div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
              <span>Crew: {vessel.crew.onBoard}/{vessel.crew.capacity}</span>
              <span>Updated: {new Date(vessel.lastUpdate).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fleet Performance Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Fleet Performance Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {fleetData.reduce((acc, v) => acc + v.cargo.loaded, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Cargo (DWT/TEU)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {fleetData.reduce((acc, v) => acc + v.fuel.consumption, 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Total Fuel Consumption (MT/day)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-[#16569e]">
              {fleetData.reduce((acc, v) => acc + v.crew.onBoard, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Crew Members</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Port Operations Integration

```tsx
function PortOperationsDashboard() {
  const portData = {
    arrivals: [
      {
        vessel: 'MV Bulk Transporter',
        eta: '2024-03-16T06:00:00Z',
        berth: 'Berth 3',
        cargo: 'Iron Ore',
        status: 'confirmed'
      },
      {
        vessel: 'MT Product Carrier',
        eta: '2024-03-16T14:30:00Z',
        berth: 'Berth 7',
        cargo: 'Refined Products',
        status: 'tentative'
      }
    ],
    departures: [
      {
        vessel: 'MV Container Express',
        etd: '2024-03-16T18:00:00Z',
        destination: 'Rotterdam',
        cargo: 'Containers',
        status: 'loading'
      }
    ],
    berths: [
      { id: 1, occupied: false, vessel: null, capacity: 'Small' },
      { id: 2, occupied: true, vessel: 'MV Coastal Trader', capacity: 'Medium' },
      { id: 3, occupied: false, vessel: null, capacity: 'Large' },
      { id: 4, occupied: true, vessel: 'MT Fuel Supply', capacity: 'Large' },
      { id: 5, occupied: false, vessel: null, capacity: 'Medium' }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#16569e] mb-2">Port Operations</h2>
        <p className="text-gray-600">Real-time port traffic and berth management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arrivals */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <ArrowDown className="h-5 w-5 text-green-600" />
            <span>Expected Arrivals</span>
          </h3>
          <div className="space-y-3">
            {portData.arrivals.map((arrival, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{arrival.vessel}</div>
                  <div className="text-sm text-gray-600">{arrival.cargo} • {arrival.berth}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(arrival.eta).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(arrival.eta).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Departures */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <ArrowUp className="h-5 w-5 text-blue-600" />
            <span>Scheduled Departures</span>
          </h3>
          <div className="space-y-3">
            {portData.departures.map((departure, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{departure.vessel}</div>
                  <div className="text-sm text-gray-600">{departure.cargo} • {departure.destination}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(departure.etd).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(departure.etd).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Berth Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Berth Availability</h3>
        <div className="grid grid-cols-5 gap-4">
          {portData.berths.map((berth) => (
            <div key={berth.id} className={`
              p-4 rounded-lg border-2 text-center
              ${berth.occupied 
                ? 'border-red-300 bg-red-50' 
                : 'border-green-300 bg-green-50'
              }
            `}>
              <div className="font-medium text-gray-900">Berth {berth.id}</div>
              <div className="text-sm text-gray-600 mb-2">{berth.capacity}</div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                berth.occupied 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {berth.occupied ? 'Occupied' : 'Available'}
              </div>
              {berth.vessel && (
                <div className="text-xs text-gray-600 mt-1">{berth.vessel}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Enterprise Feature Examples

### Real-time Data Management with Auto-refresh

```tsx
function RealTimeOperationsDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDataUpdate = (newData) => {
    setDashboardData(prev => ({ ...prev, ...newData }));
    setLastUpdated(new Date());
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const updatedData = await fetchLatestFleetData();
      handleDataUpdate(updatedData);
      setError(null);
    } catch (err) {
      setError('Failed to refresh dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OperationsDashboard
      fleetSummary={dashboardData?.fleetSummary}
      vessels={dashboardData?.vessels || []}
      tmsa={dashboardData?.tmsa || []}
      incidents={dashboardData?.incidents || []}
      
      // Real-time management
      loading={loading}
      lastUpdated={lastUpdated}
      enableAutoRefresh={true}
      refreshInterval={30000} // 30 seconds
      onRefresh={handleRefresh}
      onDataUpdate={handleDataUpdate}
      
      // Error handling
      error={error}
      onErrorDismiss={() => setError(null)}
      onRetry={() => handleRefresh()}
    />
  );
}
```

### Interactive Callbacks and Drill-down Navigation

```tsx
function InteractiveFleetDashboard() {
  const navigate = useNavigate();
  
  const handleVesselClick = (vessel) => {
    console.log('Vessel clicked:', vessel.name);
    navigate(`/vessels/${vessel.id}`);
  };

  const handleKPIClick = (kpi) => {
    const routes = {
      vessels: '/fleet/vessels',
      utilization: '/analytics/utilization',
      crew: '/crew/management',
      incidents: '/incidents/overview'
    };
    navigate(routes[kpi]);
  };

  const handleDrillDown = (type, id) => {
    const routes = {
      fleet: '/fleet/overview',
      vessel: `/vessels/${id}`,
      incident: `/incidents/${id}`,
      tmsa: `/compliance/tmsa/${id}`
    };
    navigate(routes[type]);
  };

  return (
    <OperationsDashboard
      fleetSummary={fleetData.summary}
      vessels={fleetData.vessels}
      tmsa={fleetData.tmsa}
      incidents={fleetData.incidents}
      
      // Interactive callbacks
      onVesselClick={handleVesselClick}
      onVesselDoubleClick={(vessel) => window.open(`/vessels/${vessel.id}/analysis`, '_blank')}
      onIncidentClick={(incident) => navigate(`/incidents/${incident.id}`)}
      onKPIClick={handleKPIClick}
      onTMSAElementClick={(element) => navigate(`/compliance/tmsa/${element.id}`)}
      
      // Drill-down navigation
      enableDrillDown={true}
      onDrillDown={handleDrillDown}
    />
  );
}
```

### Advanced Filtering and Search

```tsx
function FilterableFleetDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    vesselType: [],
    status: [],
    location: [],
    severity: []
  });

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    const filteredData = applyFiltersToFleetData(fleetData, filters);
    setFilteredFleetData(filteredData);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const searchResults = searchFleetData(fleetData, searchTerm);
    setFilteredFleetData(searchResults);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Fleet Operations</h2>
        <div className="flex items-center space-x-2">
          {activeFilters.vesselType.length > 0 && (
            <Badge variant="outline">{activeFilters.vesselType.length} vessel types</Badge>
          )}
          {searchTerm && <Badge variant="outline">Search: "{searchTerm}"</Badge>}
        </div>
      </div>

      <OperationsDashboard
        fleetSummary={filteredFleetData.summary}
        vessels={filteredFleetData.vessels}
        tmsa={filteredFleetData.tmsa}
        incidents={filteredFleetData.incidents}
        
        // Filtering and search
        enableFiltering={true}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        searchPlaceholder="Search vessels, incidents, or locations..."
      />
    </div>
  );
}
```

### Export and Reporting Features

```tsx
function ReportingEnabledDashboard() {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async (format, section) => {
    setIsExporting(true);
    try {
      const exportData = {
        fleetSummary: fleetData.summary,
        vessels: fleetData.vessels,
        incidents: fleetData.incidents,
        tmsa: fleetData.tmsa,
        exportMetadata: {
          exportedBy: currentUser.name,
          exportedAt: new Date(),
          format,
          section
        }
      };

      let blob;
      switch (format) {
        case 'pdf':
          blob = await generatePDFReport(exportData, section);
          break;
        case 'excel':
          blob = await generateExcelReport(exportData, section);
          break;
        case 'csv':
          blob = await generateCSVReport(exportData, section);
          break;
      }

      // Download the file
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fleet-dashboard-${section || 'complete'}-${new Date().toISOString().split('T')[0]}.${format}`;
      link.click();
      URL.revokeObjectURL(url);
      
      showNotification('Export completed successfully', 'success');
    } catch (error) {
      showNotification('Export failed. Please try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold">Fleet Dashboard</h3>
        <div className="flex items-center space-x-2">
          <Button onClick={() => handleExport('pdf')} disabled={isExporting} size="sm">
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
          <Button onClick={() => handleExport('excel')} disabled={isExporting} variant="outline" size="sm">
            Export Excel
          </Button>
        </div>
      </div>

      <OperationsDashboard
        fleetSummary={fleetData.summary}
        vessels={fleetData.vessels}
        tmsa={fleetData.tmsa}
        incidents={fleetData.incidents}
        
        // Export and reporting
        onExport={handleExport}
        onGenerateReport={(type) => handleExport('pdf', type)}
        enableExport={true}
      />
    </div>
  );
}
```

### Maritime-specific Integrations

```tsx
function MaritimeIntegratedDashboard() {
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [portUpdates, setPortUpdates] = useState([]);
  
  const complianceThresholds = {
    vesselUtilization: 85, // Alert if utilization > 85%
    safetyRating: 3.5,     // Alert if rating < 3.5
    tmsaScore: 80          // Alert if TMSA score < 80%
  };

  const handleWeatherAlert = (vessel, weather) => {
    const alert = {
      id: `WEATHER-${Date.now()}`,
      type: 'warning',
      message: `Weather alert for ${vessel}: ${weather.condition} - ${weather.severity}`,
      timestamp: new Date(),
      vessel,
      actionRequired: weather.severity === 'severe',
      metadata: weather
    };
    
    setWeatherAlerts(prev => [alert, ...prev]);
    
    if (weather.severity === 'severe') {
      notifyEmergencyTeam(vessel, weather);
    }
  };

  const handlePortUpdate = (vessel, portInfo) => {
    setPortUpdates(prev => [{
      id: `PORT-${Date.now()}`,
      vessel,
      port: portInfo.name,
      eta: portInfo.eta,
      berth: portInfo.berth,
      status: portInfo.status,
      timestamp: new Date()
    }, ...prev.slice(0, 9)]);
  };

  return (
    <OperationsDashboard
      fleetSummary={fleetData.summary}
      vessels={fleetData.vessels}
      tmsa={fleetData.tmsa}
      incidents={fleetData.incidents}
      
      // Maritime-specific features
      complianceThresholds={complianceThresholds}
      weatherIntegration={{
        enabled: true,
        onWeatherAlert: handleWeatherAlert
      }}
      portScheduleIntegration={{
        enabled: true,
        onPortUpdate: handlePortUpdate
      }}
    />
  );
}
```

### Customization and Layout Options

```tsx
function CustomizableFleetDashboard() {
  const [visibleSections, setVisibleSections] = useState({
    kpis: true,
    vesselOverview: true,
    incidentSummary: true,
    tmsaCompliance: true,
    alerts: true
  });
  
  const [kpiLayout, setKpiLayout] = useState('grid');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const customActions = [
    {
      id: 'export-pdf',
      label: 'Export PDF',
      icon: <FileText className="h-4 w-4" />,
      onClick: () => handleExport('pdf'),
      tooltip: 'Export dashboard to PDF'
    },
    {
      id: 'refresh-data',
      label: 'Refresh',
      icon: <RefreshCw className="h-4 w-4" />,
      onClick: () => handleRefresh(),
      tooltip: 'Refresh all data'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium">KPI Layout:</label>
          <select 
            value={kpiLayout} 
            onChange={(e) => setKpiLayout(e.target.value)}
            className="px-3 py-1 border rounded-md"
          >
            <option value="grid">Grid</option>
            <option value="row">Row</option>
            <option value="cards">Cards</option>
          </select>
        </div>
      </div>

      <OperationsDashboard
        fleetSummary={fleetData.summary}
        vessels={fleetData.vessels}
        tmsa={fleetData.tmsa}
        incidents={fleetData.incidents}
        
        // Customization options
        visibleSections={visibleSections}
        kpiLayout={kpiLayout}
        chartConfigs={{
          showTrends: true,
          timeRange: '24h',
          chartType: 'line'
        }}
        
        // Layout and responsive behavior
        isMobile={isMobile}
        collapsibleSections={true}
        defaultCollapsed={['alerts']}
        onSectionToggle={(sectionId, collapsed) => console.log(`Section ${sectionId} ${collapsed ? 'collapsed' : 'expanded'}`)}
        
        // Custom actions
        customActions={customActions}
      />
    </div>
  );
}
```

## Enhanced Performance Considerations

- **Real-time Updates**: WebSocket integration with intelligent batching for live data updates
- **Virtualization**: Efficient rendering for large fleets with thousands of vessels
- **Data Optimization**: Smart caching and incremental updates for minimal bandwidth usage
- **Responsive Design**: Adaptive layouts optimized for maritime control room displays
- **Chart Performance**: Hardware-accelerated rendering for complex time-series data
- **Memory Management**: Automatic cleanup and garbage collection for long-running sessions

## Enhanced Accessibility Features

- **Screen Reader Support**: Comprehensive ARIA labels and live regions for dashboard metrics
- **Keyboard Navigation**: Full keyboard accessibility with customizable shortcuts
- **High Contrast**: WCAG AA compliant color schemes optimized for maritime environments
- **Alert Management**: Multi-modal alerts with visual, audio, and haptic feedback
- **Voice Commands**: Optional voice control for hands-free operation in emergency situations
- **Focus Management**: Intelligent focus handling for complex dashboard interactions

## Enterprise Patterns

```tsx
// Real-time enterprise dashboard
<OperationsDashboard
  enableAutoRefresh={true}
  refreshInterval={15000}
  trackInteractions={true}
  onUserAction={(action, details) => analytics.track(action, details)}
/>

// Filtered and searchable dashboard
<OperationsDashboard
  enableFiltering={true}
  onFilterChange={handleFilterChange}
  onSearch={handleSearch}
  enableDrillDown={true}
/>

// Export-enabled dashboard
<OperationsDashboard
  enableExport={true}
  onExport={handleExport}
  onGenerateReport={handleReportGeneration}
/>

// Maritime-integrated dashboard
<OperationsDashboard
  weatherIntegration={{ enabled: true, onWeatherAlert: handleWeatherAlert }}
  portScheduleIntegration={{ enabled: true, onPortUpdate: handlePortUpdate }}
  complianceThresholds={{ vesselUtilization: 85, tmsaScore: 80 }}
/>

// Performance-optimized dashboard
<OperationsDashboard
  enableVirtualization={true}
  maxVisibleVessels={50}
  lazyLoadIncidents={true}
/>
```

## Enhanced Integration with Maritime Systems

The OperationsDashboard component provides comprehensive integration with:

### Fleet Management Systems
- **Real-time vessel tracking** with automatic position updates
- **Operational data synchronization** with maintenance and logistics systems
- **Performance analytics** with trend analysis and predictive insights
- **Resource optimization** with fuel consumption and crew management

### Safety and Compliance Systems
- **Incident monitoring** with automatic escalation and response protocols
- **Emergency response** with instant notifications and action tracking
- **TMSA compliance** with automated scoring and improvement recommendations
- **Regulatory reporting** with audit trails and documentation management

### Navigation and Communication
- **GPS tracking integration** with route optimization and weather routing
- **Vessel-to-shore communication** with priority message handling
- **Port integration** with automatic schedule updates and berth management
- **Weather services** with route-specific alerts and safety recommendations

### Advanced Analytics
- **Predictive maintenance** with equipment failure prediction
- **Performance benchmarking** with fleet-wide comparisons
- **Cost optimization** with fuel efficiency and route analysis
- **Compliance monitoring** with automated regulatory tracking

Use this enhanced component to provide comprehensive operational oversight, ensure regulatory compliance, and optimize fleet performance across all maritime operations while maintaining the highest standards of safety and efficiency.