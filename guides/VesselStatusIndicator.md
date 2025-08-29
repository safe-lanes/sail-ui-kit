# VesselStatusIndicator Component Guide

## Overview
VesselStatusIndicator provides visual status representation for vessels in maritime applications. It displays operational status with color-coded indicators, icons, and detailed status information optimized for fleet management dashboards.

## Component Interface

```typescript
interface VesselStatusIndicatorProps {
  status: VesselStatus;
  vesselName?: string;
  showLabel?: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dot' | 'badge' | 'card';
  className?: string;
  onClick?: () => void;
}

type VesselStatus = 
  | 'operational' 
  | 'maintenance' 
  | 'dry-dock' 
  | 'transit' 
  | 'loading' 
  | 'discharging' 
  | 'anchored' 
  | 'emergency' 
  | 'offline';
```

## Basic Usage

```jsx
import { VesselStatusIndicator } from 'scomp-ui';

function FleetOverview() {
  return (
    <div className="space-y-4">
      {/* Basic status indicators */}
      <div className="flex gap-4">
        <VesselStatusIndicator 
          status="operational" 
          vesselName="MV Atlantic Star"
          showLabel={true}
          showIcon={true}
        />
        
        <VesselStatusIndicator 
          status="maintenance" 
          vesselName="MV Pacific Dawn"
          showLabel={true}
        />
        
        <VesselStatusIndicator 
          status="emergency" 
          vesselName="MV Nordic Explorer"
          showLabel={true}
          showIcon={true}
        />
      </div>
    </div>
  );
}
```

## Status Types & Colors

```jsx
function StatusExamples() {
  const statuses = [
    { status: 'operational', description: 'Normal operations, vessel active' },
    { status: 'maintenance', description: 'Scheduled maintenance in progress' },
    { status: 'dry-dock', description: 'Vessel in dry dock for major repairs' },
    { status: 'transit', description: 'En route between ports' },
    { status: 'loading', description: 'Loading cargo operations' },
    { status: 'discharging', description: 'Discharging cargo operations' },
    { status: 'anchored', description: 'Anchored, waiting for berth' },
    { status: 'emergency', description: 'Emergency situation requiring attention' },
    { status: 'offline', description: 'No communication or status unknown' }
  ];

  return (
    <div className="space-y-3">
      {statuses.map(({ status, description }) => (
        <div key={status} className="flex items-center gap-4">
          <VesselStatusIndicator 
            status={status}
            size="md"
            showIcon={true}
          />
          <div>
            <div className="font-medium capitalize">{status.replace('-', ' ')}</div>
            <div className="text-sm text-gray-600">{description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Different Variants

```jsx
function StatusVariants() {
  return (
    <div className="space-y-6">
      {/* Dot variant - minimal indicator */}
      <div className="space-y-2">
        <h3 className="font-medium">Dot Variant</h3>
        <div className="flex gap-3">
          <VesselStatusIndicator 
            status="operational" 
            variant="dot" 
            size="sm"
          />
          <VesselStatusIndicator 
            status="maintenance" 
            variant="dot" 
            size="md"
          />
          <VesselStatusIndicator 
            status="emergency" 
            variant="dot" 
            size="lg"
          />
        </div>
      </div>

      {/* Badge variant - compact with text */}
      <div className="space-y-2">
        <h3 className="font-medium">Badge Variant</h3>
        <div className="flex gap-3">
          <VesselStatusIndicator 
            status="operational" 
            variant="badge" 
            showLabel={true}
          />
          <VesselStatusIndicator 
            status="transit" 
            variant="badge" 
            showLabel={true}
          />
          <VesselStatusIndicator 
            status="loading" 
            variant="badge" 
            showLabel={true}
          />
        </div>
      </div>

      {/* Card variant - detailed display */}
      <div className="space-y-2">
        <h3 className="font-medium">Card Variant</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VesselStatusIndicator 
            status="operational" 
            variant="card" 
            vesselName="MV Atlantic Star"
            showLabel={true}
            showIcon={true}
          />
          <VesselStatusIndicator 
            status="maintenance" 
            variant="card" 
            vesselName="MV Pacific Dawn"
            showLabel={true}
            showIcon={true}
          />
          <VesselStatusIndicator 
            status="emergency" 
            variant="card" 
            vesselName="MV Nordic Explorer"
            showLabel={true}
            showIcon={true}
          />
        </div>
      </div>
    </div>
  );
}
```

## Fleet Status Dashboard

```jsx
import { Ship, MapPin, Clock, AlertTriangle } from 'lucide-react';

function FleetStatusDashboard() {
  const vessels = [
    {
      id: '1',
      name: 'MV Atlantic Star',
      status: 'operational',
      location: 'Port of Rotterdam',
      eta: '2024-03-15 14:30',
      cargo: 'Container'
    },
    {
      id: '2',
      name: 'MV Pacific Dawn',
      status: 'maintenance',
      location: 'Singapore Shipyard',
      eta: null,
      cargo: 'Bulk Carrier'
    },
    {
      id: '3',
      name: 'MV Nordic Explorer',
      status: 'transit',
      location: 'English Channel',
      eta: '2024-03-16 08:00',
      cargo: 'Tanker'
    },
    {
      id: '4',
      name: 'MV Southern Cross',
      status: 'loading',
      location: 'Port of Hamburg',
      eta: null,
      cargo: 'Container'
    },
    {
      id: '5',
      name: 'MV Arctic Wind',
      status: 'emergency',
      location: 'North Sea',
      eta: 'Unknown',
      cargo: 'Tanker'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Fleet Status Overview</h2>
        <div className="flex gap-2">
          <VesselStatusIndicator status="operational" variant="badge" showLabel />
          <VesselStatusIndicator status="maintenance" variant="badge" showLabel />
          <VesselStatusIndicator status="transit" variant="badge" showLabel />
          <VesselStatusIndicator status="emergency" variant="badge" showLabel />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vessels.map((vessel) => (
          <div key={vessel.id} className="bg-white border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-[#16569e]" />
                <h3 className="font-medium">{vessel.name}</h3>
              </div>
              <VesselStatusIndicator 
                status={vessel.status}
                variant="badge"
                showLabel={true}
                size="sm"
              />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{vessel.location}</span>
              </div>
              
              {vessel.eta && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">ETA: {vessel.eta}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Type:</span>
                <span className="text-gray-600">{vessel.cargo}</span>
              </div>
            </div>

            {vessel.status === 'emergency' && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-red-800 text-sm">Requires immediate attention</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Interactive Status Updates

```jsx
function InteractiveStatusDemo() {
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [vessels, setVessels] = useState([
    { id: '1', name: 'MV Atlantic Star', status: 'operational' },
    { id: '2', name: 'MV Pacific Dawn', status: 'maintenance' },
    { id: '3', name: 'MV Nordic Explorer', status: 'transit' }
  ]);

  const handleStatusClick = (vessel) => {
    setSelectedVessel(vessel);
  };

  const updateVesselStatus = (vesselId, newStatus) => {
    setVessels(prev => prev.map(v => 
      v.id === vesselId ? { ...v, status: newStatus } : v
    ));
    setSelectedVessel(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Interactive Fleet Status</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vessels.map((vessel) => (
          <div key={vessel.id} className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">{vessel.name}</h4>
            <VesselStatusIndicator 
              status={vessel.status}
              variant="card"
              showLabel={true}
              showIcon={true}
              onClick={() => handleStatusClick(vessel)}
              className="cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>

      {selectedVessel && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <h4 className="font-medium mb-3">
            Update Status for {selectedVessel.name}
          </h4>
          <div className="flex gap-2 flex-wrap">
            {['operational', 'maintenance', 'transit', 'loading', 'emergency'].map((status) => (
              <button
                key={status}
                onClick={() => updateVesselStatus(selectedVessel.id, status)}
                className="px-3 py-1 border rounded hover:bg-white transition-colors"
              >
                <VesselStatusIndicator 
                  status={status}
                  variant="badge"
                  showLabel={true}
                  size="sm"
                />
              </button>
            ))}
          </div>
          <button 
            onClick={() => setSelectedVessel(null)}
            className="mt-3 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
```

## Status Legend

```jsx
function StatusLegend() {
  const statusDefinitions = [
    { 
      status: 'operational', 
      color: 'green',
      meaning: 'Vessel is actively operating normally',
      actions: ['Continue monitoring', 'Track performance metrics']
    },
    { 
      status: 'maintenance', 
      color: 'yellow',
      meaning: 'Scheduled or planned maintenance in progress',
      actions: ['Monitor maintenance progress', 'Update completion timeline']
    },
    { 
      status: 'emergency', 
      color: 'red',
      meaning: 'Critical situation requiring immediate attention',
      actions: ['Immediate response required', 'Contact vessel/authorities']
    },
    { 
      status: 'transit', 
      color: 'blue',
      meaning: 'Vessel en route between locations',
      actions: ['Track location', 'Monitor ETA', 'Weather updates']
    },
    { 
      status: 'offline', 
      color: 'gray',
      meaning: 'No communication or unknown status',
      actions: ['Attempt contact', 'Check last known position']
    }
  ];

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-medium mb-4">Status Legend</h3>
      <div className="space-y-4">
        {statusDefinitions.map(({ status, meaning, actions }) => (
          <div key={status} className="flex gap-4">
            <VesselStatusIndicator 
              status={status}
              variant="badge"
              showLabel={true}
              size="sm"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">{meaning}</p>
              <ul className="text-xs text-gray-600 list-disc list-inside">
                {actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Key Features
- **Visual Status Representation**: Color-coded indicators for quick status identification
- **Multiple Variants**: Dot, badge, and card layouts for different use cases
- **Size Options**: Small, medium, and large sizes for various contexts
- **Interactive Support**: Click handlers for status updates and detailed views
- **Maritime Focus**: Status types specifically designed for vessel operations
- **Accessibility**: Screen reader support and keyboard navigation
- **Responsive Design**: Adapts to different screen sizes and layouts

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Status Color Mapping
- **Operational**: Green (#22c55e) - Normal operations
- **Maintenance**: Yellow (#eab308) - Scheduled maintenance
- **Dry-dock**: Orange (#f97316) - Major repairs
- **Transit**: Blue (#3b82f6) - En route
- **Loading/Discharging**: Purple (#8b5cf6) - Cargo operations
- **Anchored**: Cyan (#06b6d4) - Waiting/anchored
- **Emergency**: Red (#ef4444) - Critical attention needed
- **Offline**: Gray (#6b7280) - Communication lost

## Best Practices
1. **Consistent Usage**: Use same variant across similar contexts
2. **Clear Labels**: Include vessel names when space permits
3. **Status Updates**: Implement real-time status updates where possible
4. **Emergency Prioritization**: Highlight emergency status prominently
5. **Responsive Design**: Test appearance across different screen sizes
6. **Legend Provision**: Include status legend for user reference
7. **Interactive Feedback**: Provide visual feedback for clickable indicators

## Common Use Cases
- Fleet dashboard status overview
- Individual vessel monitoring
- Port management systems
- Navigation and tracking displays
- Maintenance scheduling interfaces
- Emergency response dashboards
- Operational control centers
- Mobile fleet management apps
- Compliance monitoring systems
- Historical status tracking