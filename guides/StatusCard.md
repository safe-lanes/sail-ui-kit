# StatusCard Component Guide

## Overview
The StatusCard component displays fleet or vessel status information with visual indicators, progress bars, and action buttons. It's designed for maritime dashboard interfaces with consistent styling.

## Component Interface

```typescript
interface StatusCardProps {
  title: string;
  status: 'operational' | 'maintenance' | 'critical' | 'offline';
  value?: string | number;
  subtitle?: string;
  progress?: number; // 0-100
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
  showProgress?: boolean;
  icon?: React.ReactNode;
}
```

## Status Types & Colors
- `operational`: Green (#22c55e) - Normal operations
- `maintenance`: Yellow (#eab308) - Scheduled maintenance
- `critical`: Red (#ef4444) - Urgent attention needed
- `offline`: Gray (#6b7280) - Not operational

## Basic Usage

```jsx
import { StatusCard } from 'scomp-ui';

function FleetDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatusCard
        title="Active Vessels"
        status="operational"
        value="24"
        subtitle="Currently at sea"
        progress={85}
        trend="up"
        trendValue="+2 from last week"
        actionLabel="View Details"
        onActionClick={() => console.log('View vessels')}
        showProgress={true}
      />

      <StatusCard
        title="MV Atlantic Star"
        status="maintenance"
        value="In Port"
        subtitle="Southampton, UK"
        progress={65}
        trend="stable"
        actionLabel="Schedule"
        onActionClick={() => console.log('Open schedule')}
      />

      <StatusCard
        title="Critical Alerts"
        status="critical"
        value="3"
        subtitle="Require immediate attention"
        trend="down"
        trendValue="-1 from yesterday"
        actionLabel="Review"
        onActionClick={() => console.log('Review alerts')}
      />
    </div>
  );
}
```

## Advanced Usage with Custom Icons

```jsx
import { StatusCard } from 'scomp-ui';
import { Ship, AlertTriangle, Settings } from 'lucide-react';

function AdvancedDashboard() {
  return (
    <div className="space-y-6">
      <StatusCard
        title="Fleet Utilization"
        status="operational"
        value="92%"
        subtitle="Above target"
        progress={92}
        trend="up"
        trendValue="+5% vs target"
        icon={<Ship className="h-5 w-5" />}
        actionLabel="Optimize"
        onActionClick={() => {}}
        className="border-2 border-green-200"
      />

      <StatusCard
        title="System Health"
        status="maintenance"
        value="Warning"
        subtitle="Minor issues detected"
        progress={78}
        icon={<Settings className="h-5 w-5" />}
        actionLabel="Diagnose"
        onActionClick={() => {}}
      />

      <StatusCard
        title="Safety Compliance"
        status="critical"
        value="85%"
        subtitle="Below required 95%"
        progress={85}
        trend="down"
        trendValue="-3% this month"
        icon={<AlertTriangle className="h-5 w-5" />}
        actionLabel="Review"
        onActionClick={() => {}}
      />
    </div>
  );
}
```

## Minimal Usage

```jsx
// Simple status display without progress or actions
<StatusCard
  title="Port Status"
  status="operational"
  value="Open"
  subtitle="Normal operations"
/>
```

## Key Features
- **Visual Status Indicators**: Color-coded status with consistent maritime color scheme
- **Progress Tracking**: Optional progress bars for completion percentages
- **Trend Analysis**: Up/down/stable indicators with custom trend values
- **Action Integration**: Built-in action buttons with click handlers
- **Flexible Content**: Support for custom icons and additional styling
- **Responsive Design**: Mobile-friendly layout that adapts to screen size

## Context Requirements
- **No form context needed** - StatusCard is self-contained
- **No external providers required** - Works independently

## Best Practices
1. **Consistent Status Usage**: Use standard status types for consistent UX
2. **Meaningful Trends**: Include trend values that provide actionable insights
3. **Clear Actions**: Use descriptive action labels that indicate next steps
4. **Progress Clarity**: Only show progress when it adds meaningful information
5. **Maritime Context**: Leverage for vessel status, fleet metrics, and operational KPIs

## Common Use Cases
- Fleet overview dashboards
- Individual vessel status monitoring  
- Operational metrics display
- Compliance tracking
- Performance indicator summaries
- Alert and notification panels