# OperationsDashboard Component

Enterprise-grade maritime operations dashboard with **60+ enhanced props** for comprehensive vessel monitoring, real-time analytics, and operational excellence.

## Quick Reference

### Basic Usage

```tsx
import { OperationsDashboard } from 'scomp-ui/sail-ui-kit';

<OperationsDashboard
  vessels={vesselData}
  onVesselSelect={handleVesselDetails}
  className="w-full h-screen"
/>;
```

### Enterprise Configuration

```tsx
<OperationsDashboard
  // Real-time data management
  enableRealTimeUpdates={true}
  dataSource="websocket"
  updateInterval={5000}
  onDataUpdate={handleDataUpdate}
  // Interactive capabilities
  enableInteractiveCallbacks={true}
  onVesselSelect={handleVesselSelection}
  onMetricClick={handleMetricDrillDown}
  // Advanced filtering
  enableFiltering={true}
  customFilters={customFilterConfig}
  onFilterChange={handleFilterChange}
  // Performance optimization
  enableVirtualization={true}
  enableDataCaching={true}
  performanceMode="optimized"
  // Maritime features
  showPerformanceMetrics={true}
  maritimeRegulations={complianceRules}
  emergencyProtocols={emergencyConfig}
/>
```

## Key Features

### 🚢 Real-time Vessel Monitoring

- Live position tracking with AIS integration
- Engine performance and fuel consumption monitoring
- Weather and sea condition overlay
- Route optimization and ETA calculations

### 📊 Interactive Analytics

- Drill-down capabilities for detailed analysis
- Customizable KPI dashboards
- Performance benchmarking across fleet
- Predictive maintenance indicators

### ⚡ Enterprise Performance

- Virtualized rendering for large fleets
- Intelligent data caching and synchronization
- WebSocket integration for real-time updates
- Optimized for 500+ concurrent vessels

### 🎛️ Advanced Configuration

- Customizable dashboard layouts
- Role-based access controls
- Multi-language support for global operations
- Exportable reports and analytics

## Core Props

| Prop                         | Type                           | Default | Description                      |
| ---------------------------- | ------------------------------ | ------- | -------------------------------- |
| `vessels`                    | `VesselData[]`                 | `[]`    | Array of vessel data objects     |
| `onVesselSelect`             | `(vessel: VesselData) => void` | -       | Callback when vessel is selected |
| `enableRealTimeUpdates`      | `boolean`                      | `false` | Enable live data updates         |
| `enableInteractiveCallbacks` | `boolean`                      | `false` | Enable interactive drill-down    |
| `showPerformanceMetrics`     | `boolean`                      | `true`  | Display performance indicators   |
| `enableDrillDown`            | `boolean`                      | `false` | Enable detailed analytics        |

## Enhanced Props (60+ Total)

### Data Management

- `dataSource`: WebSocket, REST API, or static data configuration
- `updateInterval`: Real-time update frequency control
- `enableDataCaching`: Intelligent caching for performance
- `onDataUpdate`: Custom data synchronization handlers

### Interactive Features

- `enableInteractiveCallbacks`: Full interactive mode activation
- `onMetricClick`: KPI drill-down callback handlers
- `onAlertClick`: Alert management integration
- `customInteractions`: Define custom interaction behaviors

### Filtering & Search

- `enableFiltering`: Advanced filtering capabilities
- `customFilters`: Define custom filter predicates
- `enableSearch`: Global search functionality
- `searchPlaceholder`: Customizable search interface

### Performance & Optimization

- `enableVirtualization`: Large dataset rendering optimization
- `performanceMode`: Performance optimization strategies
- `maxConcurrentUpdates`: Limit concurrent data operations
- `enableDataCompression`: Data compression for efficiency

[📖 **View Complete Documentation with All Props**](../../../../guides/OperationsDashboard.md)

## Maritime Integration

### Compliance Monitoring

```tsx
<OperationsDashboard
  maritimeRegulations={{
    solas: true,
    marpol: true,
    stcw: true,
  }}
  complianceMonitoring={true}
  onComplianceAlert={handleComplianceIssue}
/>
```

### Emergency Response

```tsx
<OperationsDashboard
  emergencyProtocols={emergencyConfig}
  enableEmergencyMode={true}
  onEmergencyAlert={handleEmergency}
  autoNotifyAuthorities={true}
/>
```

### Fleet Management

```tsx
<OperationsDashboard
  enableFleetView={true}
  fleetGrouping="by-route"
  crossVesselAnalytics={true}
  fleetBenchmarking={true}
/>
```

## Installation

```bash
npm install scomp-ui/sail-ui-kit
```

## TypeScript Support

Full TypeScript definitions included:

```tsx
import { OperationsDashboard, VesselData, DashboardConfig } from 'scomp-ui/sail-ui-kit';

const config: DashboardConfig = {
  enableRealTime: true,
  updateInterval: 5000,
  performanceMode: 'optimized',
};
```

## Examples

- [Basic Maritime Dashboard](../../../../guides/OperationsDashboard.md#basic-usage)
- [Real-time Fleet Monitoring](../../../../guides/OperationsDashboard.md#real-time-data-management)
- [Interactive Analytics](../../../../guides/OperationsDashboard.md#interactive-callbacks-and-drill-down)
- [Performance Optimization](../../../../guides/OperationsDashboard.md#performance-considerations)

## Support

- [Complete Documentation](../../../../guides/OperationsDashboard.md)
- [API Reference](../../../../guides/OperationsDashboard.md#enhanced-component-interface)
- [Integration Examples](../../../../guides/OperationsDashboard.md#enterprise-feature-examples)
