# MetricCard Component Guide

## Overview
MetricCard displays key performance indicators (KPIs) and metrics for maritime operations. It provides visual representation of numerical data with trends, comparisons, and contextual information optimized for fleet management dashboards and operational monitoring.

## Component Interface

```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: string | number;
    period?: string;
  };
  icon?: React.ReactNode;
  color?: 'default' | 'green' | 'red' | 'yellow' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'detailed' | 'compact';
  target?: {
    value: number;
    label?: string;
  };
  progress?: number; // 0-100
  className?: string;
  onClick?: () => void;
}
```

## Basic Usage

```jsx
import { MetricCard } from 'scomp-ui';
import { Ship, Users, DollarSign, Clock } from 'lucide-react';

function FleetKPIDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Active Vessels"
        value={24}
        subtitle="Currently operational"
        icon={<Ship className="h-6 w-6" />}
        trend={{
          direction: 'up',
          value: '+2',
          period: 'from last month'
        }}
        color="blue"
      />

      <MetricCard
        title="Total Crew"
        value={380}
        subtitle="Across fleet"
        icon={<Users className="h-6 w-6" />}
        trend={{
          direction: 'stable',
          value: '0',
          period: 'no change'
        }}
        color="green"
      />

      <MetricCard
        title="Monthly Revenue"
        value="$2.4M"
        subtitle="This month"
        icon={<DollarSign className="h-6 w-6" />}
        trend={{
          direction: 'up',
          value: '+12%',
          period: 'vs last month'
        }}
        color="green"
      />

      <MetricCard
        title="Avg Transit Time"
        value={14.5}
        unit="days"
        subtitle="Port to port"
        icon={<Clock className="h-6 w-6" />}
        trend={{
          direction: 'down',
          value: '-0.8',
          period: 'improved efficiency'
        }}
        color="yellow"
      />
    </div>
  );
}
```

## Maritime-Specific Metrics

```jsx
import { 
  Ship, Anchor, Fuel, ShieldCheck, AlertTriangle, 
  MapPin, Calendar, TrendingUp, Activity 
} from 'lucide-react';

function MaritimeMetrics() {
  return (
    <div className="space-y-6">
      {/* Operational Metrics */}
      <div className="space-y-2">
        <h3 className="font-medium">Operational Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Fleet Utilization"
            value={87.5}
            unit="%"
            subtitle="Target: 85%"
            icon={<Activity className="h-5 w-5" />}
            color="green"
            target={{ value: 85, label: 'Target' }}
            progress={87.5}
            trend={{
              direction: 'up',
              value: '+2.1%',
              period: 'this quarter'
            }}
          />

          <MetricCard
            title="Port Turnaround"
            value={18.2}
            unit="hours"
            subtitle="Average time"
            icon={<Anchor className="h-5 w-5" />}
            color="yellow"
            trend={{
              direction: 'down',
              value: '-1.3hrs',
              period: 'improved'
            }}
          />

          <MetricCard
            title="Fuel Efficiency"
            value={12.8}
            unit="MT/day"
            subtitle="Fleet average"
            icon={<Fuel className="h-5 w-5" />}
            color="blue"
            trend={{
              direction: 'down',
              value: '-0.4',
              period: 'optimized'
            }}
          />
        </div>
      </div>

      {/* Safety Metrics */}
      <div className="space-y-2">
        <h3 className="font-medium">Safety Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Days Without Incident"
            value={127}
            subtitle="Fleet record"
            icon={<ShieldCheck className="h-5 w-5" />}
            color="green"
            size="sm"
          />

          <MetricCard
            title="Safety Score"
            value={94.2}
            unit="%"
            subtitle="TMSA average"
            icon={<ShieldCheck className="h-5 w-5" />}
            color="green"
            progress={94.2}
            size="sm"
          />

          <MetricCard
            title="Near Miss Reports"
            value={3}
            subtitle="This month"
            icon={<AlertTriangle className="h-5 w-5" />}
            color="yellow"
            trend={{
              direction: 'down',
              value: '-2',
              period: 'from last month'
            }}
            size="sm"
          />

          <MetricCard
            title="Incidents"
            value={0}
            subtitle="This quarter"
            icon={<AlertTriangle className="h-5 w-5" />}
            color="green"
            size="sm"
          />
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="space-y-2">
        <h3 className="font-medium">Financial Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Operating Cost"
            value="$8,500"
            subtitle="Per day average"
            icon={<DollarSign className="h-5 w-5" />}
            color="red"
            trend={{
              direction: 'up',
              value: '+$200',
              period: 'vs target'
            }}
          />

          <MetricCard
            title="Revenue"
            value="$2.4M"
            subtitle="This month"
            icon={<TrendingUp className="h-5 w-5" />}
            color="green"
            trend={{
              direction: 'up',
              value: '+12%',
              period: 'vs last month'
            }}
          />

          <MetricCard
            title="Profit Margin"
            value={18.5}
            unit="%"
            subtitle="Monthly average"
            icon={<TrendingUp className="h-5 w-5" />}
            color="green"
            progress={18.5}
            target={{ value: 20, label: 'Target: 20%' }}
          />
        </div>
      </div>
    </div>
  );
}
```

## Detailed Metric Card with Progress

```jsx
function DetailedMetricExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricCard
        title="Fuel Consumption"
        value={458.2}
        unit="MT"
        subtitle="This voyage"
        icon={<Fuel className="h-6 w-6" />}
        color="blue"
        variant="detailed"
        size="lg"
        target={{ value: 500, label: 'Budget: 500 MT' }}
        progress={91.6} // 458.2/500 * 100
        trend={{
          direction: 'down',
          value: '-8.4%',
          period: 'under budget'
        }}
      />

      <MetricCard
        title="Cargo Loaded"
        value={75840}
        unit="BBL"
        subtitle="Current voyage"
        icon={<Ship className="h-6 w-6" />}
        color="green"
        variant="detailed"
        size="lg"
        target={{ value: 80000, label: 'Capacity: 80,000 BBL' }}
        progress={94.8} // 75840/80000 * 100
        trend={{
          direction: 'up',
          value: '94.8%',
          period: 'utilization'
        }}
      />
    </div>
  );
}
```

## Compact Metrics Grid

```jsx
function CompactMetricsGrid() {
  const metrics = [
    { title: 'Vessels at Sea', value: 18, icon: Ship, color: 'blue' },
    { title: 'In Port', value: 6, icon: Anchor, color: 'green' },
    { title: 'Maintenance', value: 2, icon: Settings, color: 'yellow' },
    { title: 'Crew Onboard', value: 287, icon: Users, color: 'blue' },
    { title: 'Voyages Complete', value: 142, icon: CheckCircle, color: 'green' },
    { title: 'Pending Orders', value: 8, icon: Clock, color: 'yellow' },
    { title: 'Safety Incidents', value: 0, icon: ShieldCheck, color: 'green' },
    { title: 'Inspections Due', value: 3, icon: Calendar, color: 'red' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={<metric.icon className="h-4 w-4" />}
          color={metric.color}
          variant="compact"
          size="sm"
        />
      ))}
    </div>
  );
}
```

## Real-Time Metrics with Updates

```jsx
function RealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    activVessels: { value: 24, trend: 0 },
    fuelConsumption: { value: 1240.5, trend: -15.2 },
    revenue: { value: 2400000, trend: 120000 },
    safetyScore: { value: 94.2, trend: 0.8 }
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activVessels: {
          value: prev.activVessels.value + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0),
          trend: Math.random() * 2 - 1
        },
        fuelConsumption: {
          value: prev.fuelConsumption.value + (Math.random() * 20 - 10),
          trend: Math.random() * 30 - 15
        },
        revenue: {
          value: prev.revenue.value + (Math.random() * 50000 - 25000),
          trend: Math.random() * 200000 - 100000
        },
        safetyScore: {
          value: Math.max(85, Math.min(100, prev.safetyScore.value + (Math.random() * 2 - 1))),
          trend: Math.random() * 2 - 1
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Real-Time Fleet Metrics</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Updates
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Vessels"
          value={Math.round(metrics.activVessels.value)}
          icon={<Ship className="h-5 w-5" />}
          color="blue"
          trend={{
            direction: metrics.activVessels.trend > 0.5 ? 'up' : metrics.activVessels.trend < -0.5 ? 'down' : 'stable',
            value: metrics.activVessels.trend > 0 ? `+${Math.abs(metrics.activVessels.trend).toFixed(0)}` : metrics.activVessels.trend < 0 ? `-${Math.abs(metrics.activVessels.trend).toFixed(0)}` : '0',
            period: 'real-time'
          }}
        />

        <MetricCard
          title="Fuel Consumption"
          value={metrics.fuelConsumption.value.toFixed(1)}
          unit="MT/day"
          icon={<Fuel className="h-5 w-5" />}
          color={metrics.fuelConsumption.trend < 0 ? 'green' : 'red'}
          trend={{
            direction: metrics.fuelConsumption.trend < -5 ? 'down' : metrics.fuelConsumption.trend > 5 ? 'up' : 'stable',
            value: `${metrics.fuelConsumption.trend > 0 ? '+' : ''}${metrics.fuelConsumption.trend.toFixed(1)}`,
            period: 'vs target'
          }}
        />

        <MetricCard
          title="Daily Revenue"
          value={`$${(metrics.revenue.value / 30 / 1000).toFixed(0)}K`}
          icon={<DollarSign className="h-5 w-5" />}
          color={metrics.revenue.trend > 0 ? 'green' : 'red'}
          trend={{
            direction: metrics.revenue.trend > 10000 ? 'up' : metrics.revenue.trend < -10000 ? 'down' : 'stable',
            value: `${metrics.revenue.trend > 0 ? '+' : ''}${(metrics.revenue.trend / 1000).toFixed(0)}K`,
            period: 'daily avg'
          }}
        />

        <MetricCard
          title="Safety Score"
          value={metrics.safetyScore.value.toFixed(1)}
          unit="%"
          icon={<ShieldCheck className="h-5 w-5" />}
          color="green"
          progress={metrics.safetyScore.value}
          trend={{
            direction: metrics.safetyScore.trend > 0.2 ? 'up' : metrics.safetyScore.trend < -0.2 ? 'down' : 'stable',
            value: `${metrics.safetyScore.trend > 0 ? '+' : ''}${metrics.safetyScore.trend.toFixed(1)}`,
            period: 'this period'
          }}
        />
      </div>
    </div>
  );
}
```

## Interactive Metric Cards

```jsx
function InteractiveMetrics() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [timeframe, setTimeframe] = useState('week');

  const metrics = {
    week: {
      vessels: { value: 24, trend: 2 },
      revenue: { value: '580K', trend: 12 },
      efficiency: { value: 87.5, trend: 3.2 }
    },
    month: {
      vessels: { value: 24, trend: 1 },
      revenue: { value: '2.4M', trend: 8 },
      efficiency: { value: 85.2, trend: 1.8 }
    },
    quarter: {
      vessels: { value: 26, trend: 4 },
      revenue: { value: '7.2M', trend: 15 },
      efficiency: { value: 83.8, trend: 2.5 }
    }
  };

  const currentMetrics = metrics[timeframe];

  return (
    <div className="space-y-6">
      {/* Time Frame Selector */}
      <div className="flex gap-2">
        {['week', 'month', 'quarter'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-3 py-1 rounded text-sm ${
              timeframe === period 
                ? 'bg-[#16569e] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Interactive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Active Vessels"
          value={currentMetrics.vessels.value}
          icon={<Ship className="h-5 w-5" />}
          color="blue"
          trend={{
            direction: currentMetrics.vessels.trend > 0 ? 'up' : 'down',
            value: `${currentMetrics.vessels.trend > 0 ? '+' : ''}${currentMetrics.vessels.trend}`,
            period: `this ${timeframe}`
          }}
          onClick={() => setSelectedMetric('vessels')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        />

        <MetricCard
          title="Revenue"
          value={`$${currentMetrics.revenue.value}`}
          icon={<DollarSign className="h-5 w-5" />}
          color="green"
          trend={{
            direction: currentMetrics.revenue.trend > 0 ? 'up' : 'down',
            value: `${currentMetrics.revenue.trend > 0 ? '+' : ''}${currentMetrics.revenue.trend}%`,
            period: `vs last ${timeframe}`
          }}
          onClick={() => setSelectedMetric('revenue')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        />

        <MetricCard
          title="Fleet Efficiency"
          value={currentMetrics.efficiency.value}
          unit="%"
          icon={<Activity className="h-5 w-5" />}
          color="green"
          progress={currentMetrics.efficiency.value}
          trend={{
            direction: currentMetrics.efficiency.trend > 0 ? 'up' : 'down',
            value: `${currentMetrics.efficiency.trend > 0 ? '+' : ''}${currentMetrics.efficiency.trend}%`,
            period: 'improvement'
          }}
          onClick={() => setSelectedMetric('efficiency')}
          className="cursor-pointer hover:shadow-md transition-shadow"
        />
      </div>

      {/* Detail Panel */}
      {selectedMetric && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">
              {selectedMetric === 'vessels' && 'Vessel Activity Details'}
              {selectedMetric === 'revenue' && 'Revenue Breakdown'}
              {selectedMetric === 'efficiency' && 'Efficiency Analysis'}
            </h4>
            <button 
              onClick={() => setSelectedMetric(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {selectedMetric === 'vessels' && `Detailed breakdown of vessel activity for the selected ${timeframe} period.`}
            {selectedMetric === 'revenue' && `Revenue performance analysis for the selected ${timeframe} period.`}
            {selectedMetric === 'efficiency' && `Fleet efficiency metrics and optimization opportunities for the selected ${timeframe} period.`}
          </p>
        </div>
      )}
    </div>
  );
}
```

## Key Features
- **Flexible Value Display**: Support for numbers, currency, percentages, and custom units
- **Trend Indicators**: Up, down, and stable trend visualization with contextual information
- **Progress Tracking**: Progress bars for target-based metrics
- **Icon Integration**: Full Lucide React icon support
- **Color Coding**: Semantic color options for different metric types
- **Size Variants**: Small, medium, and large sizes for different contexts
- **Interactive Support**: Click handlers for detailed metric views
- **Target Comparison**: Visual comparison against targets and budgets

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Color Scheme
- **Default**: Gray theme for neutral metrics
- **Green**: Positive metrics, achievements, safety
- **Red**: Negative metrics, alerts, over-budget
- **Yellow**: Warning metrics, approaching limits
- **Blue**: Informational metrics, operational data
- **Purple**: Special metrics, custom categories

## Best Practices
1. **Meaningful Metrics**: Display metrics that drive decision-making
2. **Consistent Units**: Use appropriate units and maintain consistency
3. **Trend Context**: Provide meaningful trend comparison periods
4. **Visual Hierarchy**: Use size and color to indicate metric importance
5. **Real-Time Updates**: Update critical metrics in real-time when possible
6. **Target Setting**: Include targets for performance-based metrics
7. **Interactive Details**: Provide drill-down capabilities for complex metrics

## Common Use Cases
- Fleet performance dashboards
- Operational KPI monitoring
- Financial performance tracking
- Safety metrics display
- Efficiency measurements
- Compliance indicators
- Real-time operational data
- Comparative analysis views
- Executive summary reports
- Mobile dashboard widgets