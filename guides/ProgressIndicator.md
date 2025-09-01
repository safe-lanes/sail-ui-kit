# ProgressIndicator Component Guide

## Overview
The ProgressIndicator component provides visual progress tracking for maritime operations and processes. It displays completion status, milestone tracking, and operational progress with TMSA-compliant styling optimized for maritime workflows and process monitoring.

## Component Interface

```typescript
interface ProgressIndicatorProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'linear' | 'circular' | 'stepped' | 'milestone';
  showLabel?: boolean;
  showPercentage?: boolean;
  showValue?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  animated?: boolean;
  steps?: ProgressStep[];
  milestones?: Milestone[];
  label?: string;
  description?: string;
  className?: string;
}

interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  optional?: boolean;
  estimatedTime?: string;
}

interface Milestone {
  id: string;
  label: string;
  value: number; // percentage where milestone occurs
  status: 'pending' | 'reached' | 'overdue';
  timestamp?: string;
}
```

## Key Features
- **Maritime Process Tracking**: Specialized progress indicators for maritime operations
- **Multiple Variants**: Linear, circular, stepped, and milestone progress displays
- **Real-time Updates**: Smooth animations for live progress tracking
- **Step Validation**: Progress validation with error states and recovery
- **Milestone Tracking**: Key checkpoint monitoring with time stamps

## Basic Usage

```tsx
import { ProgressIndicator } from 'scomp-ui/sail-ui-kit';

function MaritimeProgressTracking() {
  const [cargoProgress, setCargoProgress] = useState(65);
  const [fuelProgress, setFuelProgress] = useState(30);
  const [maintenanceProgress, setMaintenanceProgress] = useState(85);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCargoProgress(prev => Math.min(100, prev + Math.random() * 2));
      setFuelProgress(prev => Math.min(100, prev + Math.random() * 1.5));
      setMaintenanceProgress(prev => Math.min(100, prev + Math.random() * 0.5));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Operations Progress Tracking
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Cargo Loading</h4>
          <ProgressIndicator
            value={cargoProgress}
            variant="circular"
            size="lg"
            color="primary"
            showPercentage={true}
            animated={true}
            label="Container Loading"
            description={`${Math.round(cargoProgress * 14)} of 1,400 TEU`}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Fuel Transfer</h4>
          <ProgressIndicator
            value={fuelProgress}
            variant="linear"
            size="lg"
            color="warning"
            showPercentage={true}
            showValue={true}
            animated={true}
            label="Bunker Fuel"
            description={`${Math.round(fuelProgress * 20)} of 2,000 MT`}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Maintenance</h4>
          <ProgressIndicator
            value={maintenanceProgress}
            variant="circular"
            size="lg"
            color="success"
            showPercentage={true}
            animated={true}
            label="Engine Service"
            description="Scheduled maintenance checklist"
          />
        </div>
      </div>
    </div>
  );
}
```

## Comprehensive Process Monitoring

```tsx
function ComprehensiveProcessMonitoring() {
  const [activeProcesses, setActiveProcesses] = useState([
    {
      id: 'cargo-loading',
      name: 'Cargo Loading Operations',
      progress: 67,
      status: 'active',
      startTime: '2024-03-15T08:00:00Z',
      estimatedCompletion: '2024-03-15T18:00:00Z',
      steps: [
        {
          id: 'preparation',
          label: 'Pre-loading Preparation',
          description: 'Safety checks and equipment verification',
          status: 'completed' as const,
          estimatedTime: '30 minutes'
        },
        {
          id: 'documentation',
          label: 'Documentation Review',
          description: 'Cargo manifest and customs clearance',
          status: 'completed' as const,
          estimatedTime: '45 minutes'
        },
        {
          id: 'loading',
          label: 'Container Loading',
          description: 'Loading containers using ship cranes',
          status: 'active' as const,
          estimatedTime: '8 hours'
        },
        {
          id: 'securing',
          label: 'Cargo Securing',
          description: 'Lashing and securing loaded containers',
          status: 'pending' as const,
          estimatedTime: '2 hours'
        },
        {
          id: 'inspection',
          label: 'Final Inspection',
          description: 'Load distribution and safety inspection',
          status: 'pending' as const,
          estimatedTime: '1 hour'
        }
      ],
      milestones: [
        {
          id: 'quarter',
          label: '25% Complete',
          value: 25,
          status: 'reached' as const,
          timestamp: '2024-03-15T10:30:00Z'
        },
        {
          id: 'half',
          label: '50% Complete',
          value: 50,
          status: 'reached' as const,
          timestamp: '2024-03-15T13:15:00Z'
        },
        {
          id: 'three-quarter',
          label: '75% Complete',
          value: 75,
          status: 'pending' as const
        },
        {
          id: 'complete',
          label: 'Loading Complete',
          value: 100,
          status: 'pending' as const
        }
      ]
    },
    {
      id: 'fuel-transfer',
      name: 'Fuel Transfer Operations',
      progress: 43,
      status: 'active',
      startTime: '2024-03-15T06:00:00Z',
      estimatedCompletion: '2024-03-15T14:00:00Z',
      steps: [
        {
          id: 'connection',
          label: 'Fuel Line Connection',
          description: 'Connect fuel transfer lines and test',
          status: 'completed' as const,
          estimatedTime: '1 hour'
        },
        {
          id: 'sampling',
          label: 'Fuel Quality Sampling',
          description: 'Test fuel quality and specifications',
          status: 'completed' as const,
          estimatedTime: '30 minutes'
        },
        {
          id: 'transfer',
          label: 'Fuel Transfer',
          description: 'Transfer fuel to vessel tanks',
          status: 'active' as const,
          estimatedTime: '6 hours'
        },
        {
          id: 'measurement',
          label: 'Tank Measurement',
          description: 'Verify fuel quantities received',
          status: 'pending' as const,
          estimatedTime: '30 minutes'
        }
      ],
      milestones: [
        {
          id: 'start',
          label: 'Transfer Started',
          value: 10,
          status: 'reached' as const,
          timestamp: '2024-03-15T07:00:00Z'
        },
        {
          id: 'half',
          label: 'Half Complete',
          value: 50,
          status: 'pending' as const
        },
        {
          id: 'complete',
          label: 'Transfer Complete',
          value: 100,
          status: 'pending' as const
        }
      ]
    },
    {
      id: 'maintenance',
      name: 'Engine Maintenance',
      progress: 88,
      status: 'active',
      startTime: '2024-03-15T02:00:00Z',
      estimatedCompletion: '2024-03-15T12:00:00Z',
      steps: [
        {
          id: 'shutdown',
          label: 'Engine Shutdown',
          description: 'Safe shutdown and isolation',
          status: 'completed' as const,
          estimatedTime: '30 minutes'
        },
        {
          id: 'inspection',
          label: 'Visual Inspection',
          description: 'External and internal inspection',
          status: 'completed' as const,
          estimatedTime: '2 hours'
        },
        {
          id: 'oil-change',
          label: 'Oil Change',
          description: 'Drain and replace engine oil',
          status: 'completed' as const,
          estimatedTime: '3 hours'
        },
        {
          id: 'filter-replacement',
          label: 'Filter Replacement',
          description: 'Replace oil and fuel filters',
          status: 'completed' as const,
          estimatedTime: '2 hours'
        },
        {
          id: 'testing',
          label: 'System Testing',
          description: 'Test engine startup and operation',
          status: 'active' as const,
          estimatedTime: '2 hours'
        },
        {
          id: 'documentation',
          label: 'Documentation',
          description: 'Complete maintenance records',
          status: 'pending' as const,
          estimatedTime: '30 minutes'
        }
      ],
      milestones: [
        {
          id: 'inspection-complete',
          label: 'Inspection Complete',
          value: 30,
          status: 'reached' as const,
          timestamp: '2024-03-15T04:30:00Z'
        },
        {
          id: 'maintenance-complete',
          label: 'Maintenance Complete',
          value: 80,
          status: 'reached' as const,
          timestamp: '2024-03-15T09:00:00Z'
        },
        {
          id: 'testing-complete',
          label: 'Testing Complete',
          value: 95,
          status: 'pending' as const
        }
      ]
    }
  ]);

  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'error';
    if (progress < 50) return 'warning';
    if (progress < 75) return 'primary';
    return 'success';
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffHours = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    return `${diffHours}h`;
  };

  const getTimeElapsed = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const diffHours = Math.round((now.getTime() - start.getTime()) / (1000 * 60 * 60));
    return `${diffHours}h elapsed`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Maritime Operations Progress Monitor
        </h1>
        <p className="text-gray-600">
          Real-time tracking of critical maritime operations and processes
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeProcesses.map((process) => (
          <div key={process.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{process.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                process.status === 'active' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {process.status}
              </span>
            </div>

            <div className="mb-4">
              <ProgressIndicator
                value={process.progress}
                variant="circular"
                size="lg"
                color={getProgressColor(process.progress) as any}
                showPercentage={true}
                animated={true}
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {formatDuration(process.startTime, process.estimatedCompletion)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Elapsed:</span>
                <span className="font-medium">{getTimeElapsed(process.startTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ETA:</span>
                <span className="font-medium">
                  {new Date(process.estimatedCompletion).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Process Views */}
      <div className="space-y-8">
        {activeProcesses.map((process) => (
          <div key={process.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{process.name}</h3>
              <div className="flex items-center space-x-4">
                <ProgressIndicator
                  value={process.progress}
                  variant="linear"
                  size="md"
                  color={getProgressColor(process.progress) as any}
                  showPercentage={true}
                  animated={true}
                  className="w-32"
                />
              </div>
            </div>

            {/* Steps Progress */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-4">Process Steps</h4>
              <ProgressIndicator
                value={process.progress}
                variant="stepped"
                size="md"
                steps={process.steps}
                animated={true}
              />
            </div>

            {/* Milestones */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Key Milestones</h4>
              <ProgressIndicator
                value={process.progress}
                variant="milestone"
                size="md"
                milestones={process.milestones}
                animated={true}
              />
            </div>

            {/* Additional Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Started:</span>
                  <div className="text-gray-600">
                    {new Date(process.startTime).toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Estimated Completion:</span>
                  <div className="text-gray-600">
                    {new Date(process.estimatedCompletion).toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Current Step:</span>
                  <div className="text-gray-600">
                    {process.steps.find(step => step.status === 'active')?.label || 'Completing...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Operations Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Recently Completed Operations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Safety Inspection</h4>
              <ProgressIndicator
                value={100}
                variant="circular"
                size="sm"
                color="success"
                showPercentage={false}
                animated={false}
              />
            </div>
            <p className="text-sm text-gray-600">Completed 2 hours ago</p>
            <p className="text-xs text-green-600">All systems passed inspection</p>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Navigation Check</h4>
              <ProgressIndicator
                value={100}
                variant="circular"
                size="sm"
                color="success"
                showPercentage={false}
                animated={false}
              />
            </div>
            <p className="text-sm text-gray-600">Completed 4 hours ago</p>
            <p className="text-xs text-green-600">All navigation systems operational</p>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Crew Training</h4>
              <ProgressIndicator
                value={100}
                variant="circular"
                size="sm"
                color="success"
                showPercentage={false}
                animated={false}
              />
            </div>
            <p className="text-sm text-gray-600">Completed yesterday</p>
            <p className="text-xs text-green-600">Emergency procedures training</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Animation Optimization**: Smooth animations with hardware acceleration
- **Real-time Updates**: Efficient state management for live progress tracking
- **Large Dataset Handling**: Optimized rendering for multiple progress indicators
- **Memory Management**: Cleanup of animation timers and event listeners

## Accessibility Features

- **Screen Reader Support**: Progress announcements and status updates
- **Keyboard Navigation**: Accessible interactive progress elements
- **High Contrast**: WCAG compliant color schemes for progress states
- **Progress Communication**: Clear labeling and description of progress states

## Common Patterns

```tsx
// Basic linear progress
<ProgressIndicator
  value={progress}
  variant="linear"
  showPercentage={true}
/>

// Circular progress with animation
<ProgressIndicator
  value={progress}
  variant="circular"
  size="lg"
  animated={true}
  color="primary"
/>

// Stepped progress with validation
<ProgressIndicator
  value={progress}
  variant="stepped"
  steps={processSteps}
  animated={true}
/>

// Milestone tracking
<ProgressIndicator
  value={progress}
  variant="milestone"
  milestones={keyMilestones}
  showValue={true}
/>
```

## Integration with Maritime Systems

The ProgressIndicator component integrates seamlessly with:
- **Operational Workflows**: Real-time tracking of maritime operations
- **Maintenance Systems**: Progress monitoring for maintenance procedures
- **Cargo Operations**: Loading, unloading, and transfer progress tracking
- **Safety Procedures**: Step-by-step safety protocol completion
- **Training Systems**: Training module and certification progress

Use this component to provide clear, visual feedback on the progress of critical maritime operations and ensure efficient process completion.