# NotificationPanel Component

Advanced notification management system with **80+ enhanced props** for maritime operations, featuring filtering, bulk operations, real-time updates, and emergency response protocols.

## Quick Reference

### Basic Usage
```tsx
import { NotificationPanel } from 'scomp-ui/sail-ui-kit';

<NotificationPanel
  notifications={notificationData}
  onMarkAsRead={handleMarkAsRead}
  onNotificationClick={handleNotificationClick}
/>
```

### Enterprise Configuration
```tsx
<NotificationPanel
  // Advanced filtering
  enableFiltering={true}
  customFilters={filterPredicates}
  onFilterChange={handleFilterUpdate}
  
  // Bulk operations
  enableBulkOperations={true}
  onBulkMarkAsRead={handleBulkRead}
  onBulkDelete={handleBulkDelete}
  
  // Real-time updates
  enableRealTimeUpdates={true}
  onWebSocketConnect={handleWSConnection}
  connectionMonitoring={true}
  
  // Sound and alerts
  enableSoundAlerts={true}
  soundSettings={audioConfig}
  visualAlerts={visualConfig}
  
  // Priority escalation
  showPriorityEscalation={true}
  escalationRules={priorityRules}
  onEscalate={handleEscalation}
/>
```

## Key Features

### 🔍 Advanced Filtering
- Dynamic filter predicates and conditions
- Real-time search across all notification fields
- Saved filter presets for quick access
- Maritime-specific filter categories

### 📦 Bulk Operations
- Multi-selection with progress tracking
- Batch operations for read/unread/delete
- Bulk assignment and routing capabilities
- Error handling and retry mechanisms

### ⚡ Real-time Updates
- WebSocket integration with connection monitoring
- Live notification streaming and synchronization
- Connection status indicators and recovery
- Optimistic updates with conflict resolution

### 🔊 Sound & Visual Alerts
- Maritime-appropriate audio alerts
- Visual indicators for different priority levels
- Customizable alert thresholds and conditions
- Integration with ship's announcement systems

## Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `notifications` | `NotificationData[]` | `[]` | Array of notification objects |
| `onMarkAsRead` | `(id: string) => void` | - | Mark single notification as read |
| `onNotificationClick` | `(notification: NotificationData) => void` | - | Handle notification click |
| `enableFiltering` | `boolean` | `false` | Enable advanced filtering |
| `enableBulkOperations` | `boolean` | `false` | Enable bulk operations |
| `enableRealTimeUpdates` | `boolean` | `false` | Enable real-time updates |
| `enableSoundAlerts` | `boolean` | `false` | Enable audio notifications |

## Enhanced Props (80+ Total)

### Filtering and Search
- `customFilters`: Define custom filter predicates
- `savedFilters`: User-saved filter configurations
- `onFilterChange`: Filter change event handlers
- `enableGlobalSearch`: Global search capabilities

### Bulk Operations
- `enableBulkOperations`: Bulk operation activation
- `onBulkMarkAsRead`: Batch read status updates
- `onBulkDelete`: Batch deletion handlers
- `bulkOperationProgress`: Progress tracking for bulk operations

### Real-time Features
- `enableRealTimeUpdates`: Live update activation
- `webSocketUrl`: WebSocket connection configuration
- `onWebSocketConnect`: Connection event handlers
- `connectionMonitoring`: Connection health monitoring

### Sound and Alerts
- `enableSoundAlerts`: Audio notification system
- `soundSettings`: Audio configuration and volume
- `visualAlerts`: Visual alert customization
- `alertThresholds`: Custom alert trigger conditions

[📖 **View Complete Documentation with All Props**](../../../../guides/NotificationPanel.md)

## Maritime Integration

### Emergency Response
```tsx
<NotificationPanel
  enableEmergencyMode={true}
  emergencyProtocols={{
    autoEscalate: true,
    notifyBridge: true,
    soundGeneralAlarm: true
  }}
  onEmergencyAlert={handleEmergencyResponse}
/>
```

### Fleet Communication
```tsx
<NotificationPanel
  enableFleetCommunication={true}
  fleetSettings={{
    crossVesselNotifications: true,
    shoreBasedAlerts: true,
    weatherWarnings: true
  }}
/>
```

### Priority Management
```tsx
<NotificationPanel
  showPriorityEscalation={true}
  escalationRules={{
    'critical': { escalateAfter: 300, notifyRoles: ['captain', 'chief-officer'] },
    'high': { escalateAfter: 900, notifyRoles: ['officer-on-watch'] }
  }}
/>
```

## Advanced Features

### Smart Filtering
```tsx
<NotificationPanel
  customFilters={[
    {
      id: 'safety-critical',
      name: 'Safety Critical',
      predicate: (notification) => 
        notification.category === 'safety' && notification.priority === 'critical'
    },
    {
      id: 'engine-alerts',
      name: 'Engine Alerts',
      predicate: (notification) => 
        notification.source === 'engine-room' && notification.type === 'alert'
    }
  ]}
  enableFilterPresets={true}
/>
```

### Bulk Operations
```tsx
<NotificationPanel
  enableBulkOperations={true}
  onBulkAssign={handleBulkAssignment}
  onBulkRoute={handleBulkRouting}
  bulkOperationProgress={operationProgress}
  enableProgressTracking={true}
/>
```

### Real-time Synchronization
```tsx
<NotificationPanel
  enableRealTimeUpdates={true}
  webSocketUrl="wss://maritime-alerts.com/notifications"
  connectionMonitoring={true}
  onConnectionStatusChange={handleConnectionStatus}
  enableOfflineMode={true}
/>
```

## Installation

```bash
npm install scomp-ui/sail-ui-kit
```

## TypeScript Support

Full TypeScript definitions included:

```tsx
import { 
  NotificationPanel, 
  NotificationData, 
  FilterPredicate,
  EscalationRule 
} from 'scomp-ui/sail-ui-kit';

const notifications: NotificationData[] = [
  {
    id: 'alert-001',
    title: 'Engine Temperature High',
    category: 'machinery',
    priority: 'high',
    timestamp: new Date()
  }
];
```

## Examples

- [Basic Notification Panel](../../../../guides/NotificationPanel.md#basic-usage)
- [Advanced Filtering](../../../../guides/NotificationPanel.md#advanced-filtering-and-grouping)
- [Bulk Operations](../../../../guides/NotificationPanel.md#bulk-operations-and-management)
- [Real-time Integration](../../../../guides/NotificationPanel.md#real-time-updates-and-sound-alerts)

## Support

- [Complete Documentation](../../../../guides/NotificationPanel.md)
- [API Reference](../../../../guides/NotificationPanel.md#enhanced-component-interface)
- [Integration Examples](../../../../guides/NotificationPanel.md#enterprise-feature-examples)