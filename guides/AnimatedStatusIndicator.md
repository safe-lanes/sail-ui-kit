# AnimatedStatusIndicator Component Guide

## Overview
The AnimatedStatusIndicator component provides dynamic visual status communication with smooth animations for maritime applications. It displays operational states with motion graphics and transitions, optimized for real-time system monitoring and status changes with TMSA-compliant styling.

## Component Interface

```typescript
interface AnimatedStatusIndicatorProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'loading' | 'progress';
  progress?: number; // 0-100 for progress status
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'pulse' | 'spin' | 'bounce' | 'wave' | 'breathing' | 'gradient';
  animationSpeed?: 'slow' | 'normal' | 'fast';
  showValue?: boolean;
  icon?: React.ReactNode;
  onAnimationComplete?: () => void;
  className?: string;
}
```

## Key Features
- **Dynamic Animations**: Multiple animation patterns for different status types
- **Progress Visualization**: Animated progress indicators with smooth transitions
- **Maritime-Specific**: Specialized animations for maritime operational states
- **Performance Optimized**: Efficient animations with hardware acceleration
- **Status Transitions**: Smooth transitions between different status states

## Basic Usage

```tsx
import { AnimatedStatusIndicator } from 'scomp-ui/sail-ui-kit';

function DynamicSystemStatus() {
  const [engineStatus, setEngineStatus] = useState('loading');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate system startup
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setEngineStatus('success');
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Dynamic System Status
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <AnimatedStatusIndicator
            status="success"
            variant="pulse"
            size="lg"
            label="Engine"
            description="Running normally"
            animationSpeed="normal"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <AnimatedStatusIndicator
            status="warning"
            variant="breathing"
            size="lg"
            label="Navigation"
            description="GPS signal weak"
            animationSpeed="slow"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <AnimatedStatusIndicator
            status="error"
            variant="bounce"
            size="lg"
            label="Communication"
            description="Radio system failure"
            animationSpeed="fast"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <AnimatedStatusIndicator
            status="progress"
            variant="wave"
            size="lg"
            progress={loadingProgress}
            label="Startup"
            description={`${loadingProgress}% complete`}
            showValue={true}
          />
        </div>
      </div>
    </div>
  );
}
```

## Real-time Monitoring Dashboard

```tsx
function RealTimeMonitoringDashboard() {
  const [systemMetrics, setSystemMetrics] = useState({
    engine: { status: 'success', rpm: 750, temp: 87, load: 85 },
    navigation: { status: 'success', gps: 12, radar: 'active', speed: 18.5 },
    safety: { status: 'warning', alarms: 1, sensors: 48, temperature: 42 },
    communication: { status: 'success', signal: 95, bandwidth: 85, latency: 120 }
  });

  const [operationalData, setOperationalData] = useState({
    cargoLoading: { progress: 67, status: 'loading', rate: 125 },
    fuelTransfer: { progress: 0, status: 'standby', rate: 0 },
    ballastOperations: { progress: 45, status: 'loading', rate: 200 },
    maintenance: { progress: 30, status: 'in-progress', items: 5 }
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        engine: {
          ...prev.engine,
          rpm: 745 + Math.random() * 10,
          temp: 85 + Math.random() * 4,
          load: 82 + Math.random() * 6
        },
        navigation: {
          ...prev.navigation,
          speed: 18 + Math.random() * 1,
          gps: Math.floor(10 + Math.random() * 4)
        }
      }));

      setOperationalData(prev => ({
        ...prev,
        cargoLoading: {
          ...prev.cargoLoading,
          progress: Math.min(100, prev.cargoLoading.progress + Math.random() * 2)
        },
        ballastOperations: {
          ...prev.ballastOperations,
          progress: Math.min(100, prev.ballastOperations.progress + Math.random() * 1.5)
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getAnimationVariant = (status: string, hasProgress: boolean = false) => {
    if (hasProgress) return 'wave';
    switch (status) {
      case 'success': return 'pulse';
      case 'warning': return 'breathing';
      case 'error': return 'bounce';
      case 'loading': return 'spin';
      default: return 'pulse';
    }
  };

  const formatValue = (value: number, unit: string) => {
    return `${Math.round(value * 10) / 10}${unit}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Real-Time Operations Monitor
        </h1>
        <p className="text-gray-600">
          Live system status with dynamic animations and real-time updates
        </p>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-center mb-4">
            <AnimatedStatusIndicator
              status={systemMetrics.engine.status as any}
              variant={getAnimationVariant(systemMetrics.engine.status)}
              size="xl"
              animationSpeed="normal"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Engine System</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">RPM:</span>
              <span className="font-medium">{formatValue(systemMetrics.engine.rpm, '')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Temperature:</span>
              <span className="font-medium">{formatValue(systemMetrics.engine.temp, '°C')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Load:</span>
              <span className="font-medium">{formatValue(systemMetrics.engine.load, '%')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-center mb-4">
            <AnimatedStatusIndicator
              status={systemMetrics.navigation.status as any}
              variant={getAnimationVariant(systemMetrics.navigation.status)}
              size="xl"
              animationSpeed="normal"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Navigation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">GPS Satellites:</span>
              <span className="font-medium">{systemMetrics.navigation.gps}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Speed:</span>
              <span className="font-medium">{formatValue(systemMetrics.navigation.speed, ' kts')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Radar:</span>
              <span className="font-medium capitalize">{systemMetrics.navigation.radar}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-center mb-4">
            <AnimatedStatusIndicator
              status={systemMetrics.safety.status as any}
              variant={getAnimationVariant(systemMetrics.safety.status)}
              size="xl"
              animationSpeed="slow"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Safety Systems</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Alarms:</span>
              <span className="font-medium">{systemMetrics.safety.alarms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sensors:</span>
              <span className="font-medium">{systemMetrics.safety.sensors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Temperature:</span>
              <span className="font-medium">{formatValue(systemMetrics.safety.temperature, '°C')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-center mb-4">
            <AnimatedStatusIndicator
              status={systemMetrics.communication.status as any}
              variant={getAnimationVariant(systemMetrics.communication.status)}
              size="xl"
              animationSpeed="normal"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Communication</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Signal:</span>
              <span className="font-medium">{formatValue(systemMetrics.communication.signal, '%')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bandwidth:</span>
              <span className="font-medium">{formatValue(systemMetrics.communication.bandwidth, '%')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Latency:</span>
              <span className="font-medium">{formatValue(systemMetrics.communication.latency, 'ms')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Progress */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Operations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <AnimatedStatusIndicator
              status="progress"
              variant="wave"
              size="lg"
              progress={operationalData.cargoLoading.progress}
              showValue={true}
              animationSpeed="normal"
            />
            <h4 className="font-medium text-gray-900 mt-3">Cargo Loading</h4>
            <p className="text-sm text-gray-600">{Math.round(operationalData.cargoLoading.progress)}% Complete</p>
            <p className="text-xs text-gray-500">Rate: {operationalData.cargoLoading.rate} TEU/hr</p>
          </div>

          <div className="text-center">
            <AnimatedStatusIndicator
              status="neutral"
              variant="pulse"
              size="lg"
              progress={0}
              animationSpeed="slow"
            />
            <h4 className="font-medium text-gray-900 mt-3">Fuel Transfer</h4>
            <p className="text-sm text-gray-600">Standby</p>
            <p className="text-xs text-gray-500">Ready for operation</p>
          </div>

          <div className="text-center">
            <AnimatedStatusIndicator
              status="progress"
              variant="gradient"
              size="lg"
              progress={operationalData.ballastOperations.progress}
              showValue={true}
              animationSpeed="normal"
            />
            <h4 className="font-medium text-gray-900 mt-3">Ballast Operations</h4>
            <p className="text-sm text-gray-600">{Math.round(operationalData.ballastOperations.progress)}% Complete</p>
            <p className="text-xs text-gray-500">Rate: {operationalData.ballastOperations.rate} m³/hr</p>
          </div>

          <div className="text-center">
            <AnimatedStatusIndicator
              status="info"
              variant="breathing"
              size="lg"
              progress={operationalData.maintenance.progress}
              showValue={true}
              animationSpeed="slow"
            />
            <h4 className="font-medium text-gray-900 mt-3">Maintenance</h4>
            <p className="text-sm text-gray-600">{Math.round(operationalData.maintenance.progress)}% Complete</p>
            <p className="text-xs text-gray-500">{operationalData.maintenance.items} items remaining</p>
          </div>
        </div>
      </div>

      {/* Emergency Status Panel */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center space-x-2">
          <AnimatedStatusIndicator
            status="error"
            variant="bounce"
            size="md"
            animationSpeed="fast"
          />
          <span>Emergency Systems Status</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-red-200 rounded-lg p-4 text-center">
            <AnimatedStatusIndicator
              status="success"
              variant="pulse"
              size="md"
              animationSpeed="normal"
            />
            <h4 className="font-medium text-gray-900 mt-2">Fire Suppression</h4>
            <p className="text-sm text-green-600">Armed & Ready</p>
          </div>

          <div className="bg-white border border-red-200 rounded-lg p-4 text-center">
            <AnimatedStatusIndicator
              status="warning"
              variant="breathing"
              size="md"
              animationSpeed="slow"
            />
            <h4 className="font-medium text-gray-900 mt-2">Emergency Lighting</h4>
            <p className="text-sm text-yellow-600">3 Units Need Service</p>
          </div>

          <div className="bg-white border border-red-200 rounded-lg p-4 text-center">
            <AnimatedStatusIndicator
              status="success"
              variant="pulse"
              size="md"
              animationSpeed="normal"
            />
            <h4 className="font-medium text-gray-900 mt-2">Life Rafts</h4>
            <p className="text-sm text-green-600">All Stations Ready</p>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-[#16569e] text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">System Performance Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <AnimatedStatusIndicator
              status="success"
              variant="gradient"
              size="md"
              animationSpeed="slow"
            />
            <div className="text-2xl font-bold mt-2">98.5%</div>
            <div className="text-sm opacity-90">System Uptime</div>
          </div>
          <div className="text-center">
            <AnimatedStatusIndicator
              status="info"
              variant="wave"
              size="md"
              animationSpeed="normal"
            />
            <div className="text-2xl font-bold mt-2">2.3</div>
            <div className="text-sm opacity-90">Avg Response Time (s)</div>
          </div>
          <div className="text-center">
            <AnimatedStatusIndicator
              status="warning"
              variant="breathing"
              size="md"
              animationSpeed="slow"
            />
            <div className="text-2xl font-bold mt-2">15</div>
            <div className="text-sm opacity-90">Alerts This Week</div>
          </div>
          <div className="text-center">
            <AnimatedStatusIndicator
              status="success"
              variant="pulse"
              size="md"
              animationSpeed="normal"
            />
            <div className="text-2xl font-bold mt-2">100%</div>
            <div className="text-sm opacity-90">Safety Compliance</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Animation Performance Monitor

```tsx
function AnimationPerformanceMonitor() {
  const [animationStats, setAnimationStats] = useState({
    activeAnimations: 12,
    frameRate: 60,
    cpuUsage: 15,
    memoryUsage: 45
  });

  const [animationSettings, setAnimationSettings] = useState({
    enableAnimations: true,
    quality: 'high',
    batteryOptimized: false
  });

  const animationTypes = [
    { name: 'Pulse', variant: 'pulse', count: 4, performance: 'excellent' },
    { name: 'Wave', variant: 'wave', count: 3, performance: 'good' },
    { name: 'Breathing', variant: 'breathing', count: 2, performance: 'excellent' },
    { name: 'Bounce', variant: 'bounce', count: 2, performance: 'fair' },
    { name: 'Gradient', variant: 'gradient', count: 1, performance: 'good' }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#16569e] mb-2">
          Animation Performance Monitor
        </h2>
        <p className="text-gray-600">
          Monitor and optimize animation performance across the system
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <AnimatedStatusIndicator
            status="success"
            variant="pulse"
            size="lg"
            animationSpeed="normal"
          />
          <h3 className="font-semibold text-gray-900 mt-3">Frame Rate</h3>
          <div className="text-2xl font-bold text-green-600">{animationStats.frameRate} FPS</div>
          <p className="text-sm text-gray-600">Target: 60 FPS</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <AnimatedStatusIndicator
            status="info"
            variant="wave"
            size="lg"
            progress={animationStats.cpuUsage}
            showValue={true}
            animationSpeed="normal"
          />
          <h3 className="font-semibold text-gray-900 mt-3">CPU Usage</h3>
          <div className="text-2xl font-bold text-blue-600">{animationStats.cpuUsage}%</div>
          <p className="text-sm text-gray-600">Animation overhead</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <AnimatedStatusIndicator
            status="warning"
            variant="breathing"
            size="lg"
            progress={animationStats.memoryUsage}
            showValue={true}
            animationSpeed="slow"
          />
          <h3 className="font-semibold text-gray-900 mt-3">Memory</h3>
          <div className="text-2xl font-bold text-yellow-600">{animationStats.memoryUsage}%</div>
          <p className="text-sm text-gray-600">Graphics memory</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <AnimatedStatusIndicator
            status="neutral"
            variant="spin"
            size="lg"
            animationSpeed="normal"
          />
          <h3 className="font-semibold text-gray-900 mt-3">Active</h3>
          <div className="text-2xl font-bold text-gray-900">{animationStats.activeAnimations}</div>
          <p className="text-sm text-gray-600">Running animations</p>
        </div>
      </div>

      {/* Animation Types Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Animation Type Performance</h3>
        
        <div className="space-y-4">
          {animationTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <AnimatedStatusIndicator
                  status="info"
                  variant={type.variant as any}
                  size="md"
                  animationSpeed="normal"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  <p className="text-sm text-gray-600">{type.count} active instances</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${getPerformanceColor(type.performance)}`}>
                  {type.performance.charAt(0).toUpperCase() + type.performance.slice(1)}
                </div>
                <div className="text-xs text-gray-500">Performance rating</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Animation Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Enable Animations</h4>
              <p className="text-sm text-gray-600">Toggle all system animations</p>
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={animationSettings.enableAnimations}
                onChange={(e) => setAnimationSettings(prev => ({
                  ...prev,
                  enableAnimations: e.target.checked
                }))}
                className="rounded text-[#16569e] focus:ring-[#16569e]"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Animation Quality</h4>
              <p className="text-sm text-gray-600">Balance performance and visual quality</p>
            </div>
            <select
              value={animationSettings.quality}
              onChange={(e) => setAnimationSettings(prev => ({
                ...prev,
                quality: e.target.value
              }))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Battery Optimization</h4>
              <p className="text-sm text-gray-600">Reduce animations to save power</p>
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={animationSettings.batteryOptimized}
                onChange={(e) => setAnimationSettings(prev => ({
                  ...prev,
                  batteryOptimized: e.target.checked
                }))}
                className="rounded text-[#16569e] focus:ring-[#16569e]"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Hardware Acceleration**: CSS transforms and GPU acceleration for smooth animations
- **Animation Optimization**: Efficient keyframe animations with minimal reflow
- **Memory Management**: Cleanup of animation timers and event listeners
- **Battery Awareness**: Reduced animation modes for power conservation

## Accessibility Features

- **Reduced Motion**: Respect for user's motion preferences
- **Screen Reader Support**: Non-visual status communication
- **Keyboard Navigation**: Accessible interactive animations
- **High Contrast**: Maintaining visibility across all animation states

## Common Patterns

```tsx
// Basic animated status
<AnimatedStatusIndicator
  status="success"
  variant="pulse"
  size="md"
/>

// Progress with animation
<AnimatedStatusIndicator
  status="progress"
  variant="wave"
  progress={75}
  showValue={true}
/>

// Custom animation speed
<AnimatedStatusIndicator
  status="error"
  variant="bounce"
  animationSpeed="fast"
/>

// Gradient animation
<AnimatedStatusIndicator
  status="info"
  variant="gradient"
  size="lg"
  label="Processing"
/>
```

## Integration with Maritime Systems

The AnimatedStatusIndicator component integrates seamlessly with:
- **Real-time Monitoring**: Dynamic status updates with smooth transitions
- **Process Visualization**: Progress tracking for operational procedures
- **Alert Systems**: Attention-grabbing animations for critical alerts
- **Dashboard Displays**: Enhanced visual feedback for system states
- **Control Interfaces**: Animated feedback for user interactions

Use this component to provide engaging, informative visual feedback that enhances user awareness of system states and operational progress in maritime applications.