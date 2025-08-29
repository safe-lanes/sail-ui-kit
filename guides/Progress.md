# Progress Component Guide

## Overview
Progress provides visual progress indicators for maritime operations including voyage progress, loading operations, maintenance completion, and system processes. It supports linear and circular variants with maritime-specific styling and real-time progress tracking.

## Component Interface

```typescript
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number; // Default 100
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
  striped?: boolean;
}

interface CircularProgressProps {
  value: number; // 0-100
  size?: number; // Diameter in pixels
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  label?: string;
  className?: string;
}
```

## Basic Usage

```jsx
import { Progress, CircularProgress } from 'scomp-ui';

function BasicProgressExample() {
  const [voyageProgress] = useState(65);
  const [fuelLevel] = useState(40);
  const [safetyScore] = useState(94);

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Basic Progress Indicators</h3>
      
      {/* Linear progress bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Voyage Progress</span>
            <span className="text-sm text-gray-600">{voyageProgress}%</span>
          </div>
          <Progress value={voyageProgress} variant="default" showValue />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Fuel Level</span>
            <span className="text-sm text-gray-600">{fuelLevel}%</span>
          </div>
          <Progress 
            value={fuelLevel} 
            variant={fuelLevel < 20 ? 'danger' : fuelLevel < 50 ? 'warning' : 'success'} 
            showValue 
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Safety Score</span>
            <span className="text-sm text-gray-600">{safetyScore}%</span>
          </div>
          <Progress value={safetyScore} variant="success" showValue />
        </div>
      </div>

      {/* Circular progress */}
      <div className="flex gap-6">
        <div className="text-center">
          <CircularProgress value={voyageProgress} size={80} showValue />
          <p className="text-sm mt-2">Voyage</p>
        </div>
        <div className="text-center">
          <CircularProgress 
            value={fuelLevel} 
            size={80} 
            variant={fuelLevel < 20 ? 'danger' : 'warning'} 
            showValue 
          />
          <p className="text-sm mt-2">Fuel</p>
        </div>
        <div className="text-center">
          <CircularProgress value={safetyScore} size={80} variant="success" showValue />
          <p className="text-sm mt-2">Safety</p>
        </div>
      </div>
    </div>
  );
}
```

## Real-Time Voyage Progress

```jsx
import { MapPin, Clock, Ship, Fuel } from 'lucide-react';

function RealTimeVoyageProgress() {
  const [voyageData, setVoyageData] = useState({
    distanceCompleted: 1420,
    totalDistance: 2180,
    timeElapsed: 156, // hours
    estimatedTotal: 240, // hours
    averageSpeed: 14.2,
    fuelConsumed: 285,
    estimatedFuelTotal: 440
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVoyageData(prev => ({
        ...prev,
        distanceCompleted: Math.min(prev.distanceCompleted + Math.random() * 5, prev.totalDistance),
        timeElapsed: prev.timeElapsed + 0.1,
        fuelConsumed: prev.fuelConsumed + Math.random() * 0.2
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const distanceProgress = (voyageData.distanceCompleted / voyageData.totalDistance) * 100;
  const timeProgress = (voyageData.timeElapsed / voyageData.estimatedTotal) * 100;
  const fuelProgress = (voyageData.fuelConsumed / voyageData.estimatedFuelTotal) * 100;

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">MV Atlantic Star - Current Voyage</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Updates
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Distance Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium">Distance</h4>
          </div>
          
          <div className="text-center">
            <CircularProgress 
              value={distanceProgress} 
              size={120} 
              variant="default" 
              showValue
              label="Distance"
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Completed:</span>
              <span className="font-medium">{voyageData.distanceCompleted.toFixed(0)} NM</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span className="font-medium">{(voyageData.totalDistance - voyageData.distanceCompleted).toFixed(0)} NM</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-medium">{voyageData.totalDistance} NM</span>
            </div>
          </div>
        </div>

        {/* Time Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            <h4 className="font-medium">Time</h4>
          </div>
          
          <div className="text-center">
            <CircularProgress 
              value={timeProgress} 
              size={120} 
              variant="success" 
              showValue
              label="Time"
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Elapsed:</span>
              <span className="font-medium">{(voyageData.timeElapsed / 24).toFixed(1)} days</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span className="font-medium">{((voyageData.estimatedTotal - voyageData.timeElapsed) / 24).toFixed(1)} days</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Speed:</span>
              <span className="font-medium">{voyageData.averageSpeed.toFixed(1)} kts</span>
            </div>
          </div>
        </div>

        {/* Fuel Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-orange-600" />
            <h4 className="font-medium">Fuel</h4>
          </div>
          
          <div className="text-center">
            <CircularProgress 
              value={fuelProgress} 
              size={120} 
              variant={fuelProgress > 90 ? 'danger' : fuelProgress > 75 ? 'warning' : 'success'} 
              showValue
              label="Fuel"
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Consumed:</span>
              <span className="font-medium">{voyageData.fuelConsumed.toFixed(1)} MT</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span className="font-medium">{(voyageData.estimatedFuelTotal - voyageData.fuelConsumed).toFixed(1)} MT</span>
            </div>
            <div className="flex justify-between">
              <span>Efficiency:</span>
              <span className="font-medium">{(voyageData.fuelConsumed / (voyageData.timeElapsed / 24)).toFixed(1)} MT/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall voyage progress bar */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Overall Voyage Progress</span>
          <span className="text-sm text-gray-600">{distanceProgress.toFixed(1)}% Complete</span>
        </div>
        <Progress 
          value={distanceProgress} 
          variant="default" 
          size="lg" 
          animated 
          className="h-3"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Rotterdam</span>
          <span>Hamburg</span>
        </div>
      </div>
    </div>
  );
}
```

## Cargo Loading Operations

```jsx
function CargoLoadingProgress() {
  const [loadingOperations, setLoadingOperations] = useState([
    { id: 1, container: 'TCLU-1234567', status: 'completed', progress: 100, bay: 'Bay 1', tier: 'Tier 3' },
    { id: 2, container: 'MSKU-2345678', status: 'loading', progress: 75, bay: 'Bay 2', tier: 'Tier 2' },
    { id: 3, container: 'GESU-3456789', status: 'loading', progress: 45, bay: 'Bay 1', tier: 'Tier 4' },
    { id: 4, container: 'HLBU-4567890', status: 'pending', progress: 0, bay: 'Bay 3', tier: 'Tier 1' },
    { id: 5, container: 'OOLU-5678901', status: 'pending', progress: 0, bay: 'Bay 3', tier: 'Tier 2' }
  ]);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingOperations(prev => prev.map(op => {
        if (op.status === 'loading' && op.progress < 100) {
          const newProgress = Math.min(op.progress + Math.random() * 10, 100);
          return {
            ...op,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'loading'
          };
        }
        return op;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalContainers = loadingOperations.length;
  const completedContainers = loadingOperations.filter(op => op.status === 'completed').length;
  const overallProgress = (completedContainers / totalContainers) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Container Loading Progress</h3>
          <div className="text-sm text-gray-600">
            {completedContainers} of {totalContainers} containers loaded
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress 
              value={overallProgress} 
              variant="default" 
              size="lg" 
              animated 
              striped
            />
          </div>
          
          <CircularProgress 
            value={overallProgress} 
            size={80} 
            variant="default" 
            showValue
          />
        </div>
      </div>

      {/* Individual Container Progress */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-medium mb-4">Container Details</h4>
        <div className="space-y-4">
          {loadingOperations.map((operation) => (
            <div key={operation.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-medium">{operation.container}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    {operation.bay} • {operation.tier}
                  </span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  operation.status === 'completed' ? 'bg-green-100 text-green-800' :
                  operation.status === 'loading' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {operation.status.charAt(0).toUpperCase() + operation.status.slice(1)}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress 
                    value={operation.progress} 
                    variant={
                      operation.status === 'completed' ? 'success' :
                      operation.status === 'loading' ? 'default' : 'warning'
                    }
                    animated={operation.status === 'loading'}
                    striped={operation.status === 'loading'}
                  />
                </div>
                <div className="text-sm font-medium w-12 text-right">
                  {operation.progress.toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Maintenance Progress Tracking

```jsx
import { Wrench, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

function MaintenanceProgressTracking() {
  const [maintenanceTasks, setMaintenanceTasks] = useState([
    { 
      id: 1, 
      task: 'Engine Overhaul', 
      progress: 100, 
      status: 'completed',
      priority: 'high',
      estimatedHours: 48,
      actualHours: 52
    },
    { 
      id: 2, 
      task: 'Hull Inspection', 
      progress: 65, 
      status: 'in-progress',
      priority: 'high',
      estimatedHours: 24,
      actualHours: 16
    },
    { 
      id: 3, 
      task: 'Safety Equipment Check', 
      progress: 30, 
      status: 'in-progress',
      priority: 'medium',
      estimatedHours: 16,
      actualHours: 5
    },
    { 
      id: 4, 
      task: 'Navigation System Update', 
      progress: 0, 
      status: 'scheduled',
      priority: 'medium',
      estimatedHours: 8,
      actualHours: 0
    },
    { 
      id: 5, 
      task: 'Lifeboat Maintenance', 
      progress: 0, 
      status: 'scheduled',
      priority: 'low',
      estimatedHours: 12,
      actualHours: 0
    }
  ]);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return null;
    }
  };

  const getProgressVariant = (status, progress) => {
    if (status === 'completed') return 'success';
    if (status === 'overdue') return 'danger';
    if (progress > 75) return 'success';
    if (progress > 50) return 'default';
    if (progress > 25) return 'warning';
    return 'danger';
  };

  const totalTasks = maintenanceTasks.length;
  const completedTasks = maintenanceTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = maintenanceTasks.filter(task => task.status === 'in-progress').length;
  const overallProgress = maintenanceTasks.reduce((sum, task) => sum + task.progress, 0) / totalTasks;

  return (
    <div className="space-y-6">
      {/* Maintenance Overview */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="h-6 w-6 text-[#16569e]" />
          <h3 className="text-lg font-medium">Scheduled Maintenance Progress</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <CircularProgress value={overallProgress} size={80} variant="default" showValue />
            <p className="text-sm mt-2">Overall</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
            <div className="text-sm text-blue-600">In Progress</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{totalTasks - completedTasks - inProgressTasks}</div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
        </div>

        <div className="space-y-1 mb-2">
          <div className="flex justify-between text-sm">
            <span>Overall Maintenance Progress</span>
            <span>{overallProgress.toFixed(1)}%</span>
          </div>
        </div>
        <Progress value={overallProgress} variant="default" size="lg" animated />
      </div>

      {/* Individual Task Progress */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-medium mb-4">Task Details</h4>
        <div className="space-y-4">
          {maintenanceTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getPriorityIcon(task.priority)}
                  <div>
                    <span className="font-medium">{task.task}</span>
                    <div className="text-sm text-gray-600">
                      Est: {task.estimatedHours}h • Actual: {task.actualHours}h
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress 
                    value={task.progress} 
                    variant={getProgressVariant(task.status, task.progress)}
                    animated={task.status === 'in-progress'}
                    striped={task.status === 'in-progress'}
                  />
                </div>
                <div className="text-sm font-medium w-12 text-right">
                  {task.progress}%
                </div>
              </div>

              {task.actualHours > task.estimatedHours && (
                <div className="mt-2 text-xs text-orange-600">
                  ⚠ Over estimated time by {(task.actualHours - task.estimatedHours)} hours
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Progress Sizes and Variants

```jsx
function ProgressSizesAndVariants() {
  const progressData = [
    { label: 'Small Progress', value: 75, variant: 'default', size: 'sm' },
    { label: 'Medium Progress', value: 60, variant: 'success', size: 'md' },
    { label: 'Large Progress', value: 40, variant: 'warning', size: 'lg' }
  ];

  return (
    <div className="space-y-8">
      <h3 className="font-medium">Progress Sizes and Variants</h3>
      
      {/* Linear Progress Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm">Linear Progress Sizes</h4>
        {progressData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm text-gray-600">{item.value}%</span>
            </div>
            <Progress 
              value={item.value} 
              variant={item.variant} 
              size={item.size}
              showValue 
            />
          </div>
        ))}
      </div>

      {/* Circular Progress Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm">Circular Progress Sizes</h4>
        <div className="flex gap-8">
          <div className="text-center">
            <CircularProgress value={75} size={60} variant="default" showValue />
            <p className="text-sm mt-2">Small (60px)</p>
          </div>
          <div className="text-center">
            <CircularProgress value={60} size={100} variant="success" showValue />
            <p className="text-sm mt-2">Medium (100px)</p>
          </div>
          <div className="text-center">
            <CircularProgress value={40} size={140} variant="warning" showValue />
            <p className="text-sm mt-2">Large (140px)</p>
          </div>
        </div>
      </div>

      {/* Progress Variants */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm">Progress Variants</h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium mb-2 block">Default</span>
            <Progress value={70} variant="default" />
          </div>
          <div>
            <span className="text-sm font-medium mb-2 block">Success</span>
            <Progress value={85} variant="success" />
          </div>
          <div>
            <span className="text-sm font-medium mb-2 block">Warning</span>
            <Progress value={45} variant="warning" />
          </div>
          <div>
            <span className="text-sm font-medium mb-2 block">Danger</span>
            <Progress value={15} variant="danger" />
          </div>
        </div>
      </div>

      {/* Animated and Striped */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm">Animation Options</h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium mb-2 block">Animated</span>
            <Progress value={60} variant="default" animated />
          </div>
          <div>
            <span className="text-sm font-medium mb-2 block">Striped</span>
            <Progress value={70} variant="success" striped />
          </div>
          <div>
            <span className="text-sm font-medium mb-2 block">Animated + Striped</span>
            <Progress value={50} variant="warning" animated striped />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Key Features
- **Real-Time Updates**: Dynamic progress tracking for live operations
- **Multiple Variants**: Linear and circular progress indicators
- **Color Coding**: Success, warning, danger, and default color schemes
- **Animation Support**: Smooth animations and striped patterns
- **Maritime Context**: Optimized for voyage, cargo, and maintenance tracking
- **Size Options**: Small, medium, and large size variants
- **Value Display**: Optional percentage and label display
- **Responsive Design**: Adapts to different screen sizes and containers

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Progress Variant Guidelines
- **Default**: General progress indicators, voyage tracking
- **Success**: Completed operations, high performance metrics
- **Warning**: Caution levels, approaching limits
- **Danger**: Critical levels, emergency situations

## Best Practices
1. **Appropriate Variants**: Use colors that match the context and urgency
2. **Real-Time Updates**: Update progress values smoothly for live operations
3. **Clear Labels**: Provide descriptive labels and percentage values
4. **Animation Usage**: Use animations for active/loading states
5. **Responsive Sizing**: Choose appropriate sizes for different contexts
6. **Accessibility**: Ensure sufficient color contrast and screen reader support
7. **Performance**: Optimize updates for real-time applications

## Common Use Cases
- Voyage progress tracking
- Cargo loading/unloading operations
- Fuel consumption monitoring
- Maintenance task completion
- Safety compliance scoring
- File upload/download progress
- System process indicators
- Training progress tracking
- Certificate validity timelines
- Equipment operational status