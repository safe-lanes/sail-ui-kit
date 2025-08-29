# FleetStatusCard Component Guide

## Overview
FleetStatusCard provides comprehensive fleet overview with vessel status summaries, operational metrics, and visual indicators. It displays aggregated fleet information including vessel counts, status distribution, and key performance indicators optimized for maritime fleet management dashboards.

## Component Interface

```typescript
interface FleetStatusCardProps {
  fleetData: FleetVesselStatus[];
  title?: string;
  showSummary?: boolean;
  showChart?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'detailed' | 'compact';
  onVesselClick?: (vessel: FleetVesselStatus) => void;
  className?: string;
}

interface FleetVesselStatus {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'transit' | 'loading' | 'emergency' | 'offline';
  location: string;
  lastUpdate: string;
  captain?: string;
  nextPort?: string;
  eta?: string;
}
```

## Basic Usage

```jsx
import { FleetStatusCard } from 'scomp-ui';

function FleetDashboard() {
  const fleetData = [
    {
      id: '1',
      name: 'MV Atlantic Star',
      type: 'Container Ship',
      status: 'operational',
      location: 'Port of Rotterdam',
      lastUpdate: '2024-03-15T10:30:00Z',
      captain: 'Captain James Wilson',
      nextPort: 'Hamburg',
      eta: '2024-03-17T14:00:00Z'
    },
    {
      id: '2',
      name: 'MV Pacific Dawn',
      type: 'Bulk Carrier',
      status: 'maintenance',
      location: 'Singapore Shipyard',
      lastUpdate: '2024-03-15T09:45:00Z',
      captain: 'Captain Sarah Chen'
    },
    {
      id: '3',
      name: 'MV Nordic Explorer',
      type: 'Tanker',
      status: 'transit',
      location: 'English Channel',
      lastUpdate: '2024-03-15T11:15:00Z',
      captain: 'Captain Mike Rodriguez',
      nextPort: 'Le Havre',
      eta: '2024-03-16T08:00:00Z'
    },
    {
      id: '4',
      name: 'MV Southern Cross',
      type: 'Container Ship',
      status: 'loading',
      location: 'Port of Hamburg',
      lastUpdate: '2024-03-15T10:00:00Z',
      captain: 'Captain Lisa Park'
    },
    {
      id: '5',
      name: 'MV Arctic Wind',
      type: 'Tanker',
      status: 'emergency',
      location: 'North Sea',
      lastUpdate: '2024-03-15T11:45:00Z',
      captain: 'Captain Tom Anderson'
    }
  ];

  return (
    <div className="space-y-6">
      <FleetStatusCard
        fleetData={fleetData}
        title="Fleet Overview"
        showSummary={true}
        showChart={true}
        variant="detailed"
        size="lg"
        onVesselClick={(vessel) => console.log('Vessel clicked:', vessel)}
      />
    </div>
  );
}
```

## Detailed Fleet Status with Charts

```jsx
import { Ship, MapPin, Clock, User, AlertTriangle } from 'lucide-react';

function DetailedFleetStatus() {
  const fleetData = [
    // ... fleet data array
  ];

  const getStatusSummary = (data) => {
    const summary = data.reduce((acc, vessel) => {
      acc[vessel.status] = (acc[vessel.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total: data.length,
      operational: summary.operational || 0,
      maintenance: summary.maintenance || 0,
      transit: summary.transit || 0,
      loading: summary.loading || 0,
      emergency: summary.emergency || 0,
      offline: summary.offline || 0
    };
  };

  const statusSummary = getStatusSummary(fleetData);

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Fleet Status Dashboard</h2>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="text-blue-800 font-bold text-lg">{statusSummary.total}</div>
          <div className="text-blue-600 text-sm">Total Vessels</div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-green-800 font-bold text-lg">{statusSummary.operational}</div>
          <div className="text-green-600 text-sm">Operational</div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="text-purple-800 font-bold text-lg">{statusSummary.transit}</div>
          <div className="text-purple-600 text-sm">In Transit</div>
        </div>
        
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
          <div className="text-cyan-800 font-bold text-lg">{statusSummary.loading}</div>
          <div className="text-cyan-600 text-sm">Loading</div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="text-yellow-800 font-bold text-lg">{statusSummary.maintenance}</div>
          <div className="text-yellow-600 text-sm">Maintenance</div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="text-red-800 font-bold text-lg">{statusSummary.emergency}</div>
          <div className="text-red-600 text-sm">Emergency</div>
        </div>
      </div>

      {/* Fleet List */}
      <div className="space-y-3">
        <h3 className="font-medium">Vessel Details</h3>
        {fleetData.map((vessel) => (
          <div key={vessel.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Ship className="h-5 w-5 text-[#16569e]" />
                  <h4 className="font-medium">{vessel.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    vessel.status === 'operational' ? 'bg-green-100 text-green-800' :
                    vessel.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    vessel.status === 'transit' ? 'bg-purple-100 text-purple-800' :
                    vessel.status === 'loading' ? 'bg-cyan-100 text-cyan-800' :
                    vessel.status === 'emergency' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {vessel.status.charAt(0).toUpperCase() + vessel.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Ship className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{vessel.type}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{vessel.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{vessel.captain}</span>
                  </div>
                  
                  {vessel.eta && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        ETA: {new Date(vessel.eta).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {vessel.status === 'emergency' && (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Compact Fleet Overview

```jsx
function CompactFleetOverview() {
  const fleetSummary = {
    total: 25,
    operational: 18,
    maintenance: 3,
    transit: 2,
    loading: 1,
    emergency: 1,
    offline: 0
  };

  const utilizationRate = (fleetSummary.operational / fleetSummary.total * 100).toFixed(1);

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Fleet Status</h3>
        <div className="text-sm text-gray-600">{fleetSummary.total} vessels</div>
      </div>

      {/* Status Distribution */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span>Operational</span>
          <span className="font-medium text-green-600">{fleetSummary.operational}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>In Transit</span>
          <span className="font-medium text-purple-600">{fleetSummary.transit}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Maintenance</span>
          <span className="font-medium text-yellow-600">{fleetSummary.maintenance}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Loading</span>
          <span className="font-medium text-cyan-600">{fleetSummary.loading}</span>
        </div>
        
        {fleetSummary.emergency > 0 && (
          <div className="flex justify-between text-sm">
            <span>Emergency</span>
            <span className="font-medium text-red-600">{fleetSummary.emergency}</span>
          </div>
        )}
      </div>

      {/* Utilization Rate */}
      <div className="border-t pt-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Fleet Utilization</span>
          <span className="font-medium">{utilizationRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full" 
            style={{ width: `${utilizationRate}%` }}
          ></div>
        </div>
      </div>

      {/* Emergency Alert */}
      {fleetSummary.emergency > 0 && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <span className="text-red-800 text-sm">
            {fleetSummary.emergency} vessel(s) require immediate attention
          </span>
        </div>
      )}
    </div>
  );
}
```

## Fleet Performance Metrics

```jsx
function FleetPerformanceCard() {
  const performanceData = {
    totalVoyages: 142,
    completedOnTime: 128,
    averageSpeed: 14.2,
    fuelEfficiency: 12.8,
    safetyScore: 94.2,
    revenueThisMonth: 2400000,
    operatingCosts: 1680000
  };

  const onTimePercentage = (performanceData.completedOnTime / performanceData.totalVoyages * 100).toFixed(1);
  const profitMargin = ((performanceData.revenueThisMonth - performanceData.operatingCosts) / performanceData.revenueThisMonth * 100).toFixed(1);

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-medium mb-4">Fleet Performance</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{onTimePercentage}%</div>
          <div className="text-sm text-gray-600">On-Time Delivery</div>
          <div className="text-xs text-gray-500">{performanceData.completedOnTime}/{performanceData.totalVoyages}</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{performanceData.averageSpeed}</div>
          <div className="text-sm text-gray-600">Avg Speed (knots)</div>
          <div className="text-xs text-gray-500">Fleet average</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{performanceData.fuelEfficiency}</div>
          <div className="text-sm text-gray-600">Fuel Efficiency</div>
          <div className="text-xs text-gray-500">MT/day</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{performanceData.safetyScore}</div>
          <div className="text-sm text-gray-600">Safety Score</div>
          <div className="text-xs text-gray-500">TMSA average</div>
        </div>
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-green-800 font-bold">${(performanceData.revenueThisMonth / 1000000).toFixed(1)}M</div>
            <div className="text-green-600 text-sm">Monthly Revenue</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3">
            <div className="text-red-800 font-bold">${(performanceData.operatingCosts / 1000000).toFixed(1)}M</div>
            <div className="text-red-600 text-sm">Operating Costs</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-blue-800 font-bold">{profitMargin}%</div>
            <div className="text-blue-600 text-sm">Profit Margin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Real-Time Fleet Monitoring

```jsx
function RealTimeFleetMonitoring() {
  const [fleetStatus, setFleetStatus] = useState({
    operational: 18,
    transit: 4,
    maintenance: 2,
    loading: 1,
    emergency: 0
  });

  const [alerts, setAlerts] = useState([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status changes
      if (Math.random() > 0.9) {
        const statusChange = Math.random();
        setFleetStatus(prev => {
          const newStatus = { ...prev };
          if (statusChange > 0.8) {
            // Emergency alert
            newStatus.emergency = Math.min(newStatus.emergency + 1, 3);
            newStatus.operational = Math.max(newStatus.operational - 1, 0);
            setAlerts(prevAlerts => [...prevAlerts, {
              id: Date.now(),
              type: 'emergency',
              message: 'Vessel requires immediate attention',
              timestamp: new Date().toISOString()
            }]);
          } else if (statusChange > 0.6) {
            // Vessel transit
            newStatus.transit = Math.min(newStatus.transit + 1, 8);
            newStatus.operational = Math.max(newStatus.operational - 1, 0);
          }
          return newStatus;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalVessels = Object.values(fleetStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Real-Time Fleet Status</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="text-center p-3 bg-green-50 rounded">
            <div className="text-lg font-bold text-green-600">{fleetStatus.operational}</div>
            <div className="text-sm text-green-600">Operational</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded">
            <div className="text-lg font-bold text-purple-600">{fleetStatus.transit}</div>
            <div className="text-sm text-purple-600">Transit</div>
          </div>
          
          <div className="text-center p-3 bg-cyan-50 rounded">
            <div className="text-lg font-bold text-cyan-600">{fleetStatus.loading}</div>
            <div className="text-sm text-cyan-600">Loading</div>
          </div>
          
          <div className="text-center p-3 bg-yellow-50 rounded">
            <div className="text-lg font-bold text-yellow-600">{fleetStatus.maintenance}</div>
            <div className="text-sm text-yellow-600">Maintenance</div>
          </div>
          
          <div className="text-center p-3 bg-red-50 rounded">
            <div className="text-lg font-bold text-red-600">{fleetStatus.emergency}</div>
            <div className="text-sm text-red-600">Emergency</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            Fleet Utilization: {((fleetStatus.operational + fleetStatus.transit + fleetStatus.loading) / totalVessels * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Live Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-medium mb-3">Live Alerts</h4>
          <div className="space-y-2">
            {alerts.slice(-3).map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-2 bg-red-50 border border-red-200 rounded">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div className="flex-1">
                  <div className="text-sm text-red-800">{alert.message}</div>
                  <div className="text-xs text-red-600">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Key Features
- **Comprehensive Fleet View**: Display all vessels with current status and details
- **Status Aggregation**: Automatic counting and summarization of vessel statuses
- **Performance Metrics**: Fleet-wide KPIs and efficiency measurements
- **Real-Time Updates**: Live status monitoring with automatic updates
- **Emergency Alerts**: Highlighted emergency status with immediate notifications
- **Interactive Elements**: Click handlers for vessel details and drill-down views
- **Responsive Design**: Adaptable layout for different screen sizes
- **Visual Status Indicators**: Color-coded status representation

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Status Color Mapping
- **Operational**: Green - Normal operations
- **Transit**: Purple - En route between ports
- **Loading**: Cyan - Cargo operations
- **Maintenance**: Yellow - Under maintenance
- **Emergency**: Red - Requires immediate attention
- **Offline**: Gray - Communication lost

## Best Practices
1. **Real-Time Data**: Update fleet status in real-time when possible
2. **Emergency Priority**: Highlight emergency vessels prominently
3. **Status Clarity**: Use clear, consistent status definitions
4. **Performance Tracking**: Include relevant fleet performance metrics
5. **Responsive Design**: Ensure usability across all device sizes
6. **Interactive Details**: Provide vessel-specific detail views
7. **Alert Management**: Implement proper alert notifications for critical status

## Common Use Cases
- Fleet management dashboards
- Operations control centers
- Executive fleet summaries
- Port management systems
- Emergency response coordination
- Performance monitoring displays
- Mobile fleet apps
- Stakeholder reporting
- Compliance tracking
- Resource allocation planning