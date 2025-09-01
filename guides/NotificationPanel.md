# NotificationPanel Component Guide

## Overview
The NotificationPanel component provides a centralized notification management interface for maritime applications. It displays system alerts, operational updates, and safety notifications with TMSA-compliant styling optimized for maritime command centers and operational control rooms.

## Component Interface

```typescript
interface NotificationPanelProps {
  notifications: NotificationItem[];
  maxVisible?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
  autoClose?: boolean;
  autoCloseDelay?: number;
  showTimestamp?: boolean;
  allowDismiss?: boolean;
  groupByType?: boolean;
  onNotificationClick?: (notification: NotificationItem) => void;
  onNotificationDismiss?: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'emergency';
  title: string;
  message: string;
  timestamp: string;
  source?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  persistent?: boolean;
  actionable?: boolean;
  actions?: NotificationAction[];
  metadata?: {
    vesselId?: string;
    systemId?: string;
    locationId?: string;
    category?: string;
  };
}

interface NotificationAction {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}
```

## Key Features
- **Maritime Alert Management**: Comprehensive notification system for maritime operations
- **Priority Classification**: Intelligent notification prioritization and grouping
- **Real-time Updates**: Live notification feed with smooth animations
- **Action Integration**: Direct action buttons for immediate response
- **Persistent Notifications**: Critical alerts that require acknowledgment

## Basic Usage

```tsx
import { NotificationPanel } from 'scomp-ui/sail-ui-kit';

function MaritimeNotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'NOTIF-001',
      type: 'emergency',
      title: 'Engine Room Fire Alarm',
      message: 'Automatic fire detection system activated in engine room - immediate response required',
      timestamp: new Date().toISOString(),
      source: 'Fire Detection System',
      priority: 'critical',
      persistent: true,
      actionable: true,
      actions: [
        {
          id: 'acknowledge',
          label: 'Acknowledge',
          variant: 'danger',
          onClick: () => console.log('Emergency acknowledged')
        },
        {
          id: 'respond',
          label: 'Emergency Response',
          variant: 'primary',
          onClick: () => console.log('Initiating emergency response')
        }
      ],
      metadata: {
        vesselId: 'mv-container-express',
        systemId: 'fire-detection',
        locationId: 'engine-room'
      }
    },
    {
      id: 'NOTIF-002',
      type: 'warning',
      title: 'Navigation System Alert',
      message: 'GPS signal strength reduced - backup navigation systems active',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      source: 'Navigation System',
      priority: 'high',
      actionable: true,
      actions: [
        {
          id: 'check-system',
          label: 'Check System',
          variant: 'primary',
          onClick: () => console.log('Checking navigation system')
        }
      ]
    },
    {
      id: 'NOTIF-003',
      type: 'info',
      title: 'Port Arrival Update',
      message: 'ETA updated to 14:30 UTC - pilot boarding at 13:45 UTC',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      source: 'Port Operations',
      priority: 'medium'
    }
  ]);

  const handleNotificationDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#16569e] mb-6">
          Maritime Notification Center
        </h1>
        
        <NotificationPanel
          notifications={notifications}
          position="top-right"
          showTimestamp={true}
          allowDismiss={true}
          groupByType={true}
          autoClose={false}
          onNotificationDismiss={handleNotificationDismiss}
          onClearAll={handleClearAll}
        />
      </div>
    </div>
  );
}
```

## Comprehensive Notification Management

```tsx
function ComprehensiveNotificationManagement() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationHistory, setNotificationHistory] = useState<NotificationItem[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    source: 'all',
    timeRange: '24h'
  });

  // Simulate real-time notifications
  useEffect(() => {
    const notificationTypes = [
      {
        type: 'emergency' as const,
        titles: [
          'Fire Alarm Activation',
          'Man Overboard Alert',
          'Collision Warning',
          'Engine Failure Alert'
        ],
        sources: ['Fire System', 'Bridge Alert', 'Radar System', 'Engine Monitor'],
        priority: 'critical' as const
      },
      {
        type: 'warning' as const,
        titles: [
          'Equipment Malfunction',
          'Weather Alert',
          'Navigation Warning',
          'Communication Issue'
        ],
        sources: ['Equipment Monitor', 'Weather System', 'Navigation', 'Radio System'],
        priority: 'high' as const
      },
      {
        type: 'info' as const,
        titles: [
          'Port Update',
          'Cargo Information',
          'Crew Schedule',
          'Maintenance Reminder'
        ],
        sources: ['Port Ops', 'Cargo System', 'Crew Management', 'Maintenance'],
        priority: 'medium' as const
      },
      {
        type: 'success' as const,
        titles: [
          'System Check Complete',
          'Maintenance Completed',
          'Training Finished',
          'Inspection Passed'
        ],
        sources: ['System Monitor', 'Maintenance', 'Training Dept', 'Quality Control'],
        priority: 'low' as const
      }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new notification
        const typeGroup = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const titleIndex = Math.floor(Math.random() * typeGroup.titles.length);
        
        const newNotification: NotificationItem = {
          id: `NOTIF-${Date.now()}`,
          type: typeGroup.type,
          title: typeGroup.titles[titleIndex],
          message: `${typeGroup.titles[titleIndex]} - Automatic system notification at ${new Date().toLocaleTimeString()}`,
          timestamp: new Date().toISOString(),
          source: typeGroup.sources[titleIndex],
          priority: typeGroup.priority,
          persistent: typeGroup.type === 'emergency',
          actionable: typeGroup.type !== 'success',
          actions: typeGroup.type !== 'success' ? [
            {
              id: 'investigate',
              label: 'Investigate',
              variant: 'primary',
              onClick: () => console.log('Investigating notification')
            }
          ] : undefined,
          metadata: {
            vesselId: 'mv-container-express',
            systemId: `system-${Math.floor(Math.random() * 100)}`,
            category: typeGroup.type
          }
        };

        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = (notification: NotificationItem) => {
    console.log('Notification clicked:', notification);
    // Navigate to detailed view or take action
  };

  const handleNotificationDismiss = (id: string) => {
    const dismissed = notifications.find(n => n.id === id);
    if (dismissed) {
      setNotificationHistory(prev => [dismissed, ...prev]);
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleClearAll = () => {
    setNotificationHistory(prev => [...notifications, ...prev]);
    setNotifications([]);
  };

  const getNotificationStats = () => {
    const stats = {
      total: notifications.length,
      critical: notifications.filter(n => n.priority === 'critical').length,
      high: notifications.filter(n => n.priority === 'high').length,
      medium: notifications.filter(n => n.priority === 'medium').length,
      low: notifications.filter(n => n.priority === 'low').length
    };
    return stats;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filters.type !== 'all' && notification.type !== filters.type) return false;
    if (filters.priority !== 'all' && notification.priority !== filters.priority) return false;
    if (filters.source !== 'all' && notification.source !== filters.source) return false;
    return true;
  });

  const stats = getNotificationStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#16569e]">
            Notification Management Center
          </h1>
          <p className="text-gray-600">
            Centralized notification monitoring and management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Updates</span>
        </div>
      </div>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Bell className="h-6 w-6 text-[#16569e]" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">{stats.high}</p>
            </div>
            <AlertCircle className="h-6 w-6 text-orange-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medium</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.medium}</p>
            </div>
            <Info className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Priority</p>
              <p className="text-2xl font-bold text-green-600">{stats.low}</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Types</option>
              <option value="emergency">Emergency</option>
              <option value="warning">Warning</option>
              <option value="info">Information</option>
              <option value="success">Success</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Priority:</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex-1"></div>

          <button
            onClick={handleClearAll}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Active Notifications Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NotificationPanel
            notifications={filteredNotifications}
            position="center"
            showTimestamp={true}
            allowDismiss={true}
            groupByType={false}
            autoClose={false}
            onNotificationClick={handleNotificationClick}
            onNotificationDismiss={handleNotificationDismiss}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Notification History */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent History</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notificationHistory.slice(0, 10).map((notification) => (
              <div key={notification.id} className="p-3 bg-gray-50 rounded-lg opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        notification.type === 'emergency' ? 'bg-red-100 text-red-800' :
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'info' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notification.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Notifications Only */}
      {notifications.some(n => n.type === 'emergency') && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Emergency Notifications</span>
          </h3>
          <div className="space-y-3">
            {notifications
              .filter(n => n.type === 'emergency')
              .map((notification) => (
                <div key={notification.id} className="bg-white border border-red-300 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">
                          Source: {notification.source}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {notification.actions?.map((action) => (
                        <button
                          key={action.id}
                          onClick={action.onClick}
                          className={`px-3 py-1 text-xs rounded-md ${
                            action.variant === 'danger' 
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : action.variant === 'primary'
                              ? 'bg-[#16569e] text-white hover:bg-[#134a87]'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Performance Considerations

- **Virtual Scrolling**: Efficient rendering for large notification lists
- **Real-time Updates**: WebSocket integration for live notifications
- **Memory Management**: Automatic cleanup of old notifications
- **Animation Performance**: Optimized transitions and animations

## Accessibility Features

- **Screen Reader Support**: Proper ARIA announcements for new notifications
- **Keyboard Navigation**: Full keyboard accessibility for all actions
- **High Contrast**: WCAG compliant color schemes for different notification types
- **Sound Alerts**: Configurable audio cues for critical notifications

## Common Patterns

```tsx
// Basic notification panel
<NotificationPanel
  notifications={notifications}
  onNotificationDismiss={handleDismiss}
/>

// Emergency-only notifications
<NotificationPanel
  notifications={emergencyNotifications}
  autoClose={false}
  persistent={true}
/>

// Grouped notifications with actions
<NotificationPanel
  notifications={notifications}
  groupByType={true}
  allowDismiss={true}
  onNotificationClick={handleClick}
/>
```

## Integration with Maritime Systems

The NotificationPanel component integrates seamlessly with:
- **Alarm Management**: Critical safety and operational alerts
- **System Monitoring**: Real-time equipment and system notifications
- **Communication Systems**: Message and update notifications
- **Emergency Response**: Priority alert handling and escalation
- **Operational Workflows**: Process and task notifications

Use this component to provide centralized, prioritized notification management that ensures critical maritime information is communicated effectively to operators and crew.