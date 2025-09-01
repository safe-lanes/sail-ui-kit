# StatusIndicator Component Guide

## Overview
The StatusIndicator component provides clear visual status communication for maritime applications. It displays operational states, system health, and process status with TMSA-compliant styling optimized for quick status identification in maritime control systems.

## Component Interface

```typescript
interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'loading';
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dot' | 'badge' | 'full' | 'minimal';
  showPulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

## Key Features
- **Maritime Status Colors**: Industry-standard color coding for maritime operations
- **Multiple Variants**: Flexible display options for different contexts
- **Real-time Indicators**: Pulse animations for active status changes
- **Icon Integration**: Custom icons for specific maritime systems
- **Accessibility**: Screen reader support and keyboard navigation

## Basic Usage

```tsx
import { StatusIndicator } from 'scomp-ui/sail-ui-kit';

function VesselSystemStatus() {
  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Vessel System Status
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Engine</span>
            <StatusIndicator
              status="success"
              variant="dot"
              size="md"
              showPulse={true}
            />
          </div>
          <div className="text-2xl font-bold text-green-600">Normal</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Navigation</span>
            <StatusIndicator
              status="warning"
              variant="badge"
              label="GPS Limited"
              size="sm"
            />
          </div>
          <div className="text-2xl font-bold text-yellow-600">Caution</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Communication</span>
            <StatusIndicator
              status="error"
              variant="full"
              label="Radio Failure"
              description="VHF system offline"
              size="md"
            />
          </div>
          <div className="text-2xl font-bold text-red-600">Alert</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Cargo</span>
            <StatusIndicator
              status="info"
              variant="minimal"
              label="Loading"
              size="md"
            />
          </div>
          <div className="text-2xl font-bold text-blue-600">Active</div>
        </div>
      </div>
    </div>
  );
}
```

## Comprehensive System Monitor

```tsx
function ComprehensiveSystemMonitor() {
  const systemStatus = [
    {
      category: 'Propulsion',
      systems: [
        {
          name: 'Main Engine',
          status: 'success' as const,
          label: 'Operational',
          description: 'Running at 85% capacity',
          metrics: { temperature: 87, pressure: 65, rpm: 750 }
        },
        {
          name: 'Auxiliary Engine #1',
          status: 'success' as const,
          label: 'Standby',
          description: 'Ready for operation',
          metrics: { temperature: 45, pressure: 0, rpm: 0 }
        },
        {
          name: 'Auxiliary Engine #2',
          status: 'warning' as const,
          label: 'Maintenance Due',
          description: 'Service required within 48 hours',
          metrics: { temperature: 52, pressure: 0, rpm: 0 }
        },
        {
          name: 'Bow Thruster',
          status: 'error' as const,
          label: 'Hydraulic Failure',
          description: 'System offline - repair required',
          metrics: { temperature: 35, pressure: 0, rpm: 0 }
        }
      ]
    },
    {
      category: 'Navigation',
      systems: [
        {
          name: 'GPS Primary',
          status: 'success' as const,
          label: 'Active',
          description: '12 satellites locked',
          metrics: { accuracy: '±2m', satellites: 12, signal: 95 }
        },
        {
          name: 'GPS Secondary',
          status: 'success' as const,
          label: 'Backup',
          description: '10 satellites available',
          metrics: { accuracy: '±3m', satellites: 10, signal: 88 }
        },
        {
          name: 'Radar #1',
          status: 'success' as const,
          label: 'Operational',
          description: '36nm range active',
          metrics: { range: 36, targets: 15, interference: 'Low' }
        },
        {
          name: 'Radar #2',
          status: 'warning' as const,
          label: 'Reduced Range',
          description: 'Weather interference detected',
          metrics: { range: 18, targets: 8, interference: 'High' }
        },
        {
          name: 'ECDIS',
          status: 'success' as const,
          label: 'Active',
          description: 'Chart updates current',
          metrics: { chartDate: '2024-03-01', updates: 'Current', corrections: 0 }
        },
        {
          name: 'AIS',
          status: 'error' as const,
          label: 'Transmitter Failed',
          description: 'Not broadcasting position',
          metrics: { receiving: 'OK', transmitting: 'Failed', range: 25 }
        }
      ]
    },
    {
      category: 'Safety Systems',
      systems: [
        {
          name: 'Fire Detection',
          status: 'success' as const,
          label: 'All Zones Clear',
          description: '48 sensors operational',
          metrics: { zones: 48, active: 0, maintenance: 2 }
        },
        {
          name: 'CO2 Suppression',
          status: 'success' as const,
          label: 'Armed',
          description: 'System ready for deployment',
          metrics: { pressure: '95%', bottles: 12, valves: 'Closed' }
        },
        {
          name: 'Emergency Lighting',
          status: 'warning' as const,
          label: 'Battery Low',
          description: '3 fixtures need battery replacement',
          metrics: { operational: 45, failed: 3, battery: '75%' }
        },
        {
          name: 'Life Rafts',
          status: 'info' as const,
          label: 'Inspection Due',
          description: 'Annual inspection scheduled',
          metrics: { rafts: 4, capacity: 120, lastInspection: '2023-03-15' }
        }
      ]
    },
    {
      category: 'Communication',
      systems: [
        {
          name: 'VHF Radio',
          status: 'success' as const,
          label: 'All Channels',
          description: 'Transmitting and receiving',
          metrics: { channels: 88, quality: 'Excellent', power: '25W' }
        },
        {
          name: 'Satellite Phone',
          status: 'success' as const,
          label: 'Connected',
          description: 'Strong signal strength',
          metrics: { signal: '4 bars', provider: 'Inmarsat', data: 'Available' }
        },
        {
          name: 'Internet',
          status: 'warning' as const,
          label: 'Limited Bandwidth',
          description: 'Weather affecting satellite link',
          metrics: { speed: '256 kbps', latency: '800ms', usage: '75%' }
        },
        {
          name: 'Emergency Beacon',
          status: 'success' as const,
          label: 'Ready',
          description: 'Battery at 98%',
          metrics: { battery: '98%', lastTest: '2024-03-01', gps: 'Locked' }
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getSystemCategoryIcon = (category: string) => {
    switch (category) {
      case 'Propulsion': return <Zap className="h-5 w-5" />;
      case 'Navigation': return <Navigation className="h-5 w-5" />;
      case 'Safety Systems': return <Shield className="h-5 w-5" />;
      case 'Communication': return <Radio className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Vessel System Status Monitor
        </h1>
        <p className="text-gray-600">
          Real-time monitoring of all critical vessel systems and equipment
        </p>
      </div>

      {/* Overall Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operational</p>
              <p className="text-2xl font-bold text-green-600">
                {systemStatus.reduce((acc, cat) => 
                  acc + cat.systems.filter(sys => sys.status === 'success').length, 0
                )}
              </p>
            </div>
            <StatusIndicator status="success" variant="dot" size="lg" showPulse={true} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">
                {systemStatus.reduce((acc, cat) => 
                  acc + cat.systems.filter(sys => sys.status === 'warning').length, 0
                )}
              </p>
            </div>
            <StatusIndicator status="warning" variant="dot" size="lg" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failures</p>
              <p className="text-2xl font-bold text-red-600">
                {systemStatus.reduce((acc, cat) => 
                  acc + cat.systems.filter(sys => sys.status === 'error').length, 0
                )}
              </p>
            </div>
            <StatusIndicator status="error" variant="dot" size="lg" showPulse={true} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-blue-600">
                {systemStatus.reduce((acc, cat) => 
                  acc + cat.systems.filter(sys => sys.status === 'info').length, 0
                )}
              </p>
            </div>
            <StatusIndicator status="info" variant="dot" size="lg" />
          </div>
        </div>
      </div>

      {/* Detailed System Status */}
      <div className="space-y-8">
        {systemStatus.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-[#16569e] rounded-lg flex items-center justify-center text-white">
                {getSystemCategoryIcon(category.category)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
              <div className="flex space-x-2">
                <StatusIndicator
                  status="success"
                  variant="badge"
                  label={`${category.systems.filter(s => s.status === 'success').length} OK`}
                  size="sm"
                />
                {category.systems.filter(s => s.status === 'warning').length > 0 && (
                  <StatusIndicator
                    status="warning"
                    variant="badge"
                    label={`${category.systems.filter(s => s.status === 'warning').length} Warning`}
                    size="sm"
                  />
                )}
                {category.systems.filter(s => s.status === 'error').length > 0 && (
                  <StatusIndicator
                    status="error"
                    variant="badge"
                    label={`${category.systems.filter(s => s.status === 'error').length} Failed`}
                    size="sm"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.systems.map((system, systemIndex) => (
                <div key={systemIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{system.name}</h4>
                    <StatusIndicator
                      status={system.status}
                      variant="full"
                      label={system.label}
                      description={system.description}
                      size="sm"
                      icon={getStatusIcon(system.status)}
                      showPulse={system.status === 'error'}
                    />
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{system.description}</p>

                  <div className="space-y-2 text-xs">
                    {Object.entries(system.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* System Alerts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Active System Alerts</span>
        </h3>
        
        <div className="space-y-3">
          {systemStatus
            .flatMap(cat => cat.systems.filter(sys => sys.status === 'error' || sys.status === 'warning'))
            .map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <StatusIndicator
                    status={system.status}
                    variant="dot"
                    size="md"
                    showPulse={system.status === 'error'}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{system.name}</div>
                    <div className="text-sm text-gray-600">{system.description}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                    Acknowledge
                  </button>
                  <button className="px-3 py-1 text-xs bg-[#16569e] text-white rounded-md hover:bg-[#134a87]">
                    Details
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
```

## Status Dashboard with Trends

```tsx
function StatusDashboardWithTrends() {
  const [timeRange, setTimeRange] = useState('24h');
  
  const statusTrends = {
    '24h': [
      { time: '00:00', operational: 18, warning: 2, error: 1 },
      { time: '04:00', operational: 19, warning: 1, error: 1 },
      { time: '08:00', operational: 20, warning: 1, error: 0 },
      { time: '12:00', operational: 19, warning: 2, error: 0 },
      { time: '16:00', operational: 18, warning: 2, error: 1 },
      { time: '20:00', operational: 19, warning: 1, error: 1 }
    ]
  };

  const currentStatus = {
    operational: 19,
    warning: 1,
    error: 1,
    maintenance: 2
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#16569e] mb-2">
          System Status Dashboard
        </h2>
        <p className="text-gray-600">
          Real-time system health monitoring with historical trends
        </p>
      </div>

      {/* Current Status Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current System Status</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <StatusIndicator
              status="success"
              variant="dot"
              size="lg"
              showPulse={true}
              className="mx-auto mb-2"
            />
            <div className="text-2xl font-bold text-green-600">{currentStatus.operational}</div>
            <div className="text-sm text-gray-600">Operational</div>
          </div>

          <div className="text-center">
            <StatusIndicator
              status="warning"
              variant="dot"
              size="lg"
              className="mx-auto mb-2"
            />
            <div className="text-2xl font-bold text-yellow-600">{currentStatus.warning}</div>
            <div className="text-sm text-gray-600">Warning</div>
          </div>

          <div className="text-center">
            <StatusIndicator
              status="error"
              variant="dot"
              size="lg"
              showPulse={true}
              className="mx-auto mb-2"
            />
            <div className="text-2xl font-bold text-red-600">{currentStatus.error}</div>
            <div className="text-sm text-gray-600">Error</div>
          </div>

          <div className="text-center">
            <StatusIndicator
              status="info"
              variant="dot"
              size="lg"
              className="mx-auto mb-2"
            />
            <div className="text-2xl font-bold text-blue-600">{currentStatus.maintenance}</div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Indicators</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <StatusIndicator status="success" variant="dot" size="md" showPulse={true} />
              <div>
                <div className="font-medium text-gray-900">Operational</div>
                <div className="text-sm text-gray-600">System functioning normally</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <StatusIndicator status="warning" variant="dot" size="md" />
              <div>
                <div className="font-medium text-gray-900">Warning</div>
                <div className="text-sm text-gray-600">Attention required, monitoring closely</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <StatusIndicator status="error" variant="dot" size="md" showPulse={true} />
              <div>
                <div className="font-medium text-gray-900">Error</div>
                <div className="text-sm text-gray-600">System failure, immediate action required</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <StatusIndicator status="info" variant="dot" size="md" />
              <div>
                <div className="font-medium text-gray-900">Maintenance</div>
                <div className="text-sm text-gray-600">Scheduled maintenance or inspection due</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#16569e] text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm">Refresh All</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="text-sm">Alerts</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Configure</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            <Download className="h-4 w-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Real-time Updates**: Efficient status change animations and transitions
- **Color Accessibility**: Multiple visual indicators beyond color coding
- **Responsive Design**: Adaptive sizing for different screen configurations
- **Animation Performance**: Optimized pulse and transition animations

## Accessibility Features

- **Screen Reader Support**: Proper ARIA labels for status information
- **Keyboard Navigation**: Full keyboard accessibility for interactive elements
- **High Contrast**: WCAG compliant color schemes for maritime environments
- **Status Announcements**: Dynamic content announcements for status changes

## Common Patterns

```tsx
// Basic status dot
<StatusIndicator
  status="success"
  variant="dot"
  size="md"
/>

// Badge with label
<StatusIndicator
  status="warning"
  variant="badge"
  label="GPS Limited"
  size="sm"
/>

// Full status with description
<StatusIndicator
  status="error"
  variant="full"
  label="System Failure"
  description="Immediate attention required"
  size="lg"
  showPulse={true}
/>

// Custom icon with status
<StatusIndicator
  status="info"
  icon={<Settings className="h-4 w-4" />}
  label="Maintenance"
/>
```

## Integration with Maritime Systems

The StatusIndicator component integrates seamlessly with:
- **System Monitoring**: Real-time equipment and system health tracking
- **Alarm Management**: Visual status indication for critical alerts
- **Dashboard Displays**: Comprehensive status overview interfaces
- **Control Systems**: Status feedback for operational controls
- **Safety Systems**: Visual confirmation of safety system status

Use this component to provide clear, immediate visual feedback about system states and operational status across all maritime applications.