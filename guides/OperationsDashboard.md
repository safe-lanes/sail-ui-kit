# OperationsDashboard Component Guide

## Overview
The OperationsDashboard component provides a comprehensive operational overview for maritime fleet management. It displays real-time vessel status, key performance indicators, safety metrics, and operational data with TMSA-compliant layouts optimized for maritime command centers and fleet operations.

## Component Interface

```typescript
interface OperationsDashboardProps {
  vessels?: VesselData[];
  timeRange?: '1h' | '6h' | '24h' | '7d' | '30d';
  refreshInterval?: number;
  layout?: 'grid' | 'list' | 'compact';
  filters?: DashboardFilters;
  onVesselSelect?: (vesselId: string) => void;
  onAlarmClick?: (alarm: AlarmData) => void;
  className?: string;
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

## Key Features
- **Real-time Monitoring**: Live vessel tracking and status updates
- **Maritime KPIs**: Fleet performance indicators and safety metrics
- **Alert Management**: Critical alarm monitoring and prioritization
- **Multi-vessel View**: Comprehensive fleet overview with filtering
- **Compliance Tracking**: TMSA and regulatory compliance monitoring

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

## Performance Considerations

- **Real-time Updates**: WebSocket integration for live data updates
- **Data Optimization**: Efficient state management for large fleet data
- **Responsive Design**: Adaptive layouts for different screen sizes
- **Chart Performance**: Optimized rendering for time-series data

## Accessibility Features

- **Screen Reader Support**: Proper ARIA labels for dashboard metrics
- **Keyboard Navigation**: Full keyboard accessibility for all controls
- **High Contrast**: WCAG compliant color schemes for maritime environments
- **Alert Management**: Clear visual and audio cues for critical alarms

## Common Patterns

```tsx
// Basic dashboard
<OperationsDashboard
  timeRange="24h"
  refreshInterval={30000}
/>

// Filtered dashboard
<OperationsDashboard
  filters={{ status: 'operational', type: 'container' }}
  layout="compact"
/>

// Event-driven dashboard
<OperationsDashboard
  onVesselSelect={handleVesselClick}
  onAlarmClick={handleAlarmAcknowledge}
/>
```

## Integration with Maritime Systems

The OperationsDashboard component integrates seamlessly with:
- **Fleet Management**: Real-time vessel tracking and operational data
- **Safety Systems**: Incident monitoring and emergency response
- **Navigation Systems**: GPS tracking and route optimization
- **Communication Systems**: Vessel-to-shore communication and alerts
- **Port Management**: Berth allocation and traffic coordination

Use this component to provide comprehensive operational oversight and ensure efficient fleet management across all maritime operations.