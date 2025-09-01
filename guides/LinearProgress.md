# LinearProgress Component Guide

## Overview
The LinearProgress component provides streamlined linear progress visualization for maritime applications. It displays horizontal progress bars with smooth animations and maritime-specific styling, optimized for operational dashboards and process monitoring with TMSA-compliant design.

## Component Interface

```typescript
interface LinearProgressProps {
  value: number; // 0-100
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'striped' | 'gradient' | 'segmented' | 'buffer';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'info';
  showLabel?: boolean;
  showPercentage?: boolean;
  showValue?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  buffer?: number; // For buffer variant (0-100)
  segments?: ProgressSegment[];
  label?: string;
  description?: string;
  threshold?: {
    warning?: number;
    critical?: number;
  };
  className?: string;
}

interface ProgressSegment {
  label: string;
  value: number;
  color: string;
  description?: string;
}
```

## Key Features
- **Maritime Operations Focus**: Optimized for maritime operational monitoring
- **Multiple Variants**: Default, striped, gradient, segmented, and buffer progress styles
- **Threshold Indicators**: Warning and critical level visualization
- **Segment Support**: Multi-segment progress for complex operations
- **Real-time Animation**: Smooth progress transitions and updates

## Basic Usage

```tsx
import { LinearProgress } from 'scomp-ui/sail-ui-kit';

function MaritimeLinearProgress() {
  const [cargoProgress, setCargoProgress] = useState(45);
  const [fuelLevel, setFuelLevel] = useState(75);
  const [maintenanceProgress, setMaintenanceProgress] = useState(30);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCargoProgress(prev => Math.min(100, prev + Math.random() * 3));
      setFuelLevel(prev => Math.max(0, prev - Math.random() * 0.5));
      setMaintenanceProgress(prev => Math.min(100, prev + Math.random() * 2));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Linear Progress Indicators
      </h3>
      
      <div className="space-y-6">
        {/* Cargo Loading Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Cargo Loading Operations</h4>
          
          <div className="space-y-4">
            <LinearProgress
              value={cargoProgress}
              variant="default"
              size="lg"
              color="primary"
              showLabel={true}
              showPercentage={true}
              animated={true}
              label="Container Loading Progress"
              description={`${Math.round(cargoProgress * 14)} of 1,400 TEU loaded`}
            />

            <LinearProgress
              value={85}
              variant="striped"
              size="md"
              color="success"
              showLabel={true}
              showPercentage={true}
              animated={true}
              label="Port Side Loading"
              description="Bay 1-6 completed"
            />

            <LinearProgress
              value={25}
              variant="gradient"
              size="md"
              color="warning"
              showLabel={true}
              showPercentage={true}
              animated={true}
              label="Starboard Side Loading"
              description="Bay 7-12 in progress"
            />
          </div>
        </div>

        {/* Fuel and Resources */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Fuel and Resource Levels</h4>
          
          <div className="space-y-4">
            <LinearProgress
              value={fuelLevel}
              variant="default"
              size="lg"
              color={fuelLevel > 50 ? 'success' : fuelLevel > 25 ? 'warning' : 'error'}
              showLabel={true}
              showPercentage={true}
              showValue={true}
              label="Main Fuel Tank"
              description={`${Math.round(fuelLevel * 20)} of 2,000 MT remaining`}
              threshold={{
                warning: 25,
                critical: 10
              }}
            />

            <LinearProgress
              value={92}
              variant="buffer"
              size="md"
              color="info"
              buffer={95}
              showLabel={true}
              showPercentage={true}
              label="Fresh Water Tank"
              description="Supply adequate for 15 days"
            />

            <LinearProgress
              value={67}
              variant="segmented"
              size="md"
              segments={[
                { label: 'Engine Oil', value: 25, color: 'blue', description: 'Engine lubrication' },
                { label: 'Hydraulic', value: 20, color: 'green', description: 'Hydraulic systems' },
                { label: 'Gear Oil', value: 15, color: 'yellow', description: 'Transmission' },
                { label: 'Reserved', value: 7, color: 'gray', description: 'Emergency reserve' }
              ]}
              showLabel={true}
              label="Lubrication Oil Inventory"
            />
          </div>
        </div>

        {/* Maintenance Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Maintenance Activities</h4>
          
          <div className="space-y-4">
            <LinearProgress
              value={maintenanceProgress}
              variant="striped"
              size="lg"
              color="info"
              showLabel={true}
              showPercentage={true}
              animated={true}
              label="Engine Overhaul Progress"
              description="Phase 2 of 4 - Oil system maintenance"
            />

            <LinearProgress
              value={100}
              variant="gradient"
              size="md"
              color="success"
              showLabel={true}
              showPercentage={true}
              label="Safety Equipment Inspection"
              description="All 48 life jackets inspected and certified"
            />

            <LinearProgress
              indeterminate={true}
              variant="striped"
              size="md"
              color="primary"
              animated={true}
              label="System Diagnostics"
              description="Running automated diagnostic tests..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Comprehensive Operations Dashboard

```tsx
function ComprehensiveOperationsDashboard() {
  const [operationalData, setOperationalData] = useState({
    voyage: {
      progress: 62,
      distanceCovered: 1240,
      totalDistance: 2000,
      eta: '2024-03-18T14:30:00Z'
    },
    cargo: {
      loaded: 78,
      capacity: 14000,
      distribution: [
        { label: 'Containers', value: 45, color: '#16569e', description: '630 TEU' },
        { label: 'Bulk Cargo', value: 20, color: '#059669', description: '280 tons' },
        { label: 'Vehicles', value: 13, color: '#dc2626', description: '85 units' }
      ]
    },
    systems: {
      engine: { status: 95, efficiency: 88, temperature: 87 },
      navigation: { gps: 100, radar: 98, communications: 92 },
      safety: { fireSystem: 100, alarms: 98, lighting: 94 }
    },
    crew: {
      onboard: 22,
      capacity: 24,
      training: 85,
      certifications: 92
    }
  });

  const [maintenanceSchedule, setMaintenanceSchedule] = useState([
    {
      task: 'Main Engine Service',
      progress: 75,
      priority: 'high',
      dueDate: '2024-03-20',
      estimatedHours: 8,
      completedHours: 6
    },
    {
      task: 'Navigation Equipment Calibration',
      progress: 40,
      priority: 'medium',
      dueDate: '2024-03-25',
      estimatedHours: 4,
      completedHours: 1.6
    },
    {
      task: 'Safety Equipment Inspection',
      progress: 100,
      priority: 'high',
      dueDate: '2024-03-15',
      estimatedHours: 6,
      completedHours: 6
    },
    {
      task: 'Hull Cleaning',
      progress: 20,
      priority: 'low',
      dueDate: '2024-04-01',
      estimatedHours: 12,
      completedHours: 2.4
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOperationalData(prev => ({
        ...prev,
        voyage: {
          ...prev.voyage,
          progress: Math.min(100, prev.voyage.progress + Math.random() * 0.5),
          distanceCovered: Math.min(prev.voyage.totalDistance, prev.voyage.distanceCovered + Math.random() * 5)
        },
        cargo: {
          ...prev.cargo,
          loaded: Math.min(100, prev.cargo.loaded + Math.random() * 0.3)
        },
        systems: {
          engine: {
            ...prev.systems.engine,
            temperature: 85 + Math.random() * 4,
            efficiency: 86 + Math.random() * 4
          },
          navigation: {
            ...prev.systems.navigation,
            communications: 90 + Math.random() * 8
          },
          safety: {
            ...prev.systems.safety,
            lighting: 92 + Math.random() * 6
          }
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getProgressColor = (value: number, thresholds = { warning: 50, critical: 25 }) => {
    if (value <= thresholds.critical) return 'error';
    if (value <= thresholds.warning) return 'warning';
    if (value >= 90) return 'success';
    return 'primary';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'neutral';
    }
  };

  const formatETA = (eta: string) => {
    const etaDate = new Date(eta);
    const now = new Date();
    const diffHours = Math.round((etaDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    return `${diffHours}h remaining`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Maritime Operations Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time monitoring of voyage progress and operational metrics
        </p>
      </div>

      {/* Voyage Progress */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Voyage Progress</h3>
        
        <div className="space-y-6">
          <LinearProgress
            value={operationalData.voyage.progress}
            variant="gradient"
            size="xl"
            color="primary"
            showLabel={true}
            showPercentage={true}
            showValue={true}
            animated={true}
            label="Route Completion"
            description={`${Math.round(operationalData.voyage.distanceCovered)} of ${operationalData.voyage.totalDistance} nautical miles • ${formatETA(operationalData.voyage.eta)}`}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#16569e]">{Math.round(operationalData.voyage.distanceCovered)}</div>
              <div className="text-gray-600">Distance Covered (nm)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{operationalData.voyage.totalDistance - Math.round(operationalData.voyage.distanceCovered)}</div>
              <div className="text-gray-600">Remaining (nm)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">18.5</div>
              <div className="text-gray-600">Current Speed (kts)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{new Date(operationalData.voyage.eta).toLocaleDateString()}</div>
              <div className="text-gray-600">Estimated Arrival</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cargo Operations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Cargo Operations</h3>
        
        <div className="space-y-6">
          <LinearProgress
            value={operationalData.cargo.loaded}
            variant="striped"
            size="lg"
            color="success"
            showLabel={true}
            showPercentage={true}
            animated={true}
            label="Overall Cargo Capacity"
            description={`${Math.round(operationalData.cargo.loaded * operationalData.cargo.capacity / 100).toLocaleString()} of ${operationalData.cargo.capacity.toLocaleString()} TEU capacity utilized`}
          />

          <LinearProgress
            value={operationalData.cargo.distribution.reduce((acc, item) => acc + item.value, 0)}
            variant="segmented"
            size="lg"
            segments={operationalData.cargo.distribution}
            showLabel={true}
            label="Cargo Distribution by Type"
            description="Current load distribution across cargo categories"
          />
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Engine Systems</h4>
            <div className="space-y-3">
              <LinearProgress
                value={operationalData.systems.engine.status}
                variant="default"
                size="md"
                color={getProgressColor(operationalData.systems.engine.status, { warning: 85, critical: 70 })}
                showLabel={true}
                showPercentage={true}
                label="System Status"
                threshold={{ warning: 85, critical: 70 }}
              />
              <LinearProgress
                value={operationalData.systems.engine.efficiency}
                variant="gradient"
                size="md"
                color={getProgressColor(operationalData.systems.engine.efficiency, { warning: 80, critical: 60 })}
                showLabel={true}
                showPercentage={true}
                label="Fuel Efficiency"
              />
              <LinearProgress
                value={operationalData.systems.engine.temperature}
                variant="buffer"
                size="md"
                color={operationalData.systems.engine.temperature > 90 ? 'warning' : 'success'}
                buffer={95}
                showLabel={true}
                showValue={true}
                label="Operating Temperature"
                description={`${operationalData.systems.engine.temperature}°C / 95°C max`}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Navigation Systems</h4>
            <div className="space-y-3">
              <LinearProgress
                value={operationalData.systems.navigation.gps}
                variant="default"
                size="md"
                color="success"
                showLabel={true}
                showPercentage={true}
                label="GPS Signal Strength"
              />
              <LinearProgress
                value={operationalData.systems.navigation.radar}
                variant="striped"
                size="md"
                color="success"
                showLabel={true}
                showPercentage={true}
                label="Radar System"
              />
              <LinearProgress
                value={operationalData.systems.navigation.communications}
                variant="gradient"
                size="md"
                color={getProgressColor(operationalData.systems.navigation.communications, { warning: 80, critical: 60 })}
                showLabel={true}
                showPercentage={true}
                label="Communication"
                animated={true}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Safety Systems</h4>
            <div className="space-y-3">
              <LinearProgress
                value={operationalData.systems.safety.fireSystem}
                variant="default"
                size="md"
                color="success"
                showLabel={true}
                showPercentage={true}
                label="Fire Suppression"
              />
              <LinearProgress
                value={operationalData.systems.safety.alarms}
                variant="buffer"
                size="md"
                color="success"
                buffer={100}
                showLabel={true}
                showPercentage={true}
                label="Alarm Systems"
              />
              <LinearProgress
                value={operationalData.systems.safety.lighting}
                variant="gradient"
                size="md"
                color={getProgressColor(operationalData.systems.safety.lighting, { warning: 85, critical: 70 })}
                showLabel={true}
                showPercentage={true}
                label="Emergency Lighting"
                animated={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Maintenance Schedule</h3>
        
        <div className="space-y-4">
          {maintenanceSchedule.map((task, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{task.task}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.priority} priority
                  </span>
                  <span className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <LinearProgress
                value={task.progress}
                variant={task.progress === 100 ? 'gradient' : 'striped'}
                size="md"
                color={task.progress === 100 ? 'success' : getPriorityColor(task.priority)}
                showLabel={true}
                showPercentage={true}
                animated={task.progress < 100}
                label={`${task.completedHours} of ${task.estimatedHours} hours completed`}
                description={task.progress === 100 ? 'Task completed successfully' : `${task.estimatedHours - task.completedHours} hours remaining`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Crew Status */}
      <div className="bg-[#16569e] text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">Crew Status Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <LinearProgress
              value={(operationalData.crew.onboard / operationalData.crew.capacity) * 100}
              variant="gradient"
              size="lg"
              color="neutral"
              showLabel={true}
              showValue={true}
              label="Crew Capacity"
              description={`${operationalData.crew.onboard} of ${operationalData.crew.capacity} crew members onboard`}
              className="[&>*]:!bg-white/20 [&>*>*]:!bg-white"
            />
          </div>
          
          <div className="space-y-4">
            <LinearProgress
              value={operationalData.crew.training}
              variant="striped"
              size="md"
              color="neutral"
              showLabel={true}
              showPercentage={true}
              label="Training Completion"
              className="[&>*]:!bg-white/20 [&>*>*]:!bg-white"
            />
            
            <LinearProgress
              value={operationalData.crew.certifications}
              variant="default"
              size="md"
              color="neutral"
              showLabel={true}
              showPercentage={true}
              label="Certification Status"
              className="[&>*]:!bg-white/20 [&>*>*]:!bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Smooth Animations**: Hardware-accelerated CSS transitions for fluid progress updates
- **Efficient Rendering**: Optimized for multiple simultaneous progress bars
- **Memory Management**: Cleanup of animation timers and event listeners
- **Responsive Design**: Adaptive sizing for different screen configurations

## Accessibility Features

- **Screen Reader Support**: Proper ARIA attributes for progress values
- **Keyboard Navigation**: Accessible interactive progress elements
- **High Contrast**: WCAG compliant color schemes for progress states
- **Value Communication**: Clear labeling and description of progress values

## Common Patterns

```tsx
// Basic linear progress
<LinearProgress
  value={75}
  showPercentage={true}
  label="Loading Progress"
/>

// Animated striped progress
<LinearProgress
  value={60}
  variant="striped"
  animated={true}
  color="primary"
/>

// Buffer progress (e.g., video loading)
<LinearProgress
  value={40}
  variant="buffer"
  buffer={70}
  color="info"
/>

// Segmented progress
<LinearProgress
  value={80}
  variant="segmented"
  segments={segments}
  showLabel={true}
/>

// Indeterminate progress
<LinearProgress
  indeterminate={true}
  variant="striped"
  animated={true}
  label="Processing..."
/>
```

## Integration with Maritime Systems

The LinearProgress component integrates seamlessly with:
- **Operational Dashboards**: Real-time progress visualization for maritime operations
- **Cargo Management**: Loading, unloading, and transfer progress tracking
- **Maintenance Systems**: Task completion and maintenance schedule monitoring
- **Resource Management**: Fuel, water, and supply level monitoring
- **Safety Systems**: Emergency procedure and safety protocol completion

Use this component to provide clear, linear progress visualization that enhances operational awareness and process monitoring in maritime applications.