# NotificationPanel Component Guide

## Overview
The NotificationPanel component provides a centralized notification management interface for maritime applications. It displays system alerts, operational updates, and safety notifications with TMSA-compliant styling optimized for maritime command centers and operational control rooms.

## Enhanced Component Interface

The NotificationPanel component has been significantly enhanced with **80+ enterprise props** for comprehensive notification management capabilities:

```typescript
interface NotificationPanelProps {
  // Core functionality
  notifications: Notification[];
  title?: string;
  showUnreadOnly?: boolean;
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  onClearAll?: () => void;
  maxHeight?: string;
  className?: string;
  
  // ✨ ENTERPRISE ENHANCEMENTS
  
  // Advanced filtering and grouping
  enableAdvancedFiltering?: boolean;
  filterOptions?: Array<{
    id: string;
    label: string;
    predicate: (notification: Notification) => boolean;
  }>;
  groupBy?: 'type' | 'priority' | 'category' | 'date' | 'vessel' | 'none';
  onGroupingChange?: (groupBy: string) => void;
  enableCustomFilters?: boolean;
  
  // Bulk operations
  enableBulkOperations?: boolean;
  onBulkMarkAsRead?: (notificationIds: string[]) => void;
  onBulkDismiss?: (notificationIds: string[]) => void;
  onBulkArchive?: (notificationIds: string[]) => void;
  onBulkExport?: (notificationIds: string[], format: string) => void;
  bulkActionMenuItems?: Array<{
    id: string;
    label: string;
    action: (notificationIds: string[]) => void;
    icon?: React.ReactNode;
  }>;
  
  // Real-time updates and synchronization
  enableRealTimeUpdates?: boolean;
  onRealTimeUpdate?: (notifications: Notification[]) => void;
  updateInterval?: number;
  connectionStatus?: 'connected' | 'disconnected' | 'reconnecting';
  onConnectionStatusChange?: (status: string) => void;
  
  // Pagination and infinite scroll
  enablePagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  enableInfiniteScroll?: boolean;
  
  // Search functionality
  enableSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (searchTerm: string) => void;
  searchableFields?: string[];
  highlightSearchTerms?: boolean;
  
  // Notification templates and customization
  notificationTemplates?: Record<string, {
    title: string;
    messageFormat: string;
    icon?: React.ReactNode;
    priority: string;
  }>;
  customNotificationRenderer?: (notification: Notification) => React.ReactNode;
  enableCustomActions?: boolean;
  
  // Sound and visual alerts
  enableSoundAlerts?: boolean;
  soundConfig?: {
    critical?: string;
    high?: string;
    medium?: string;
    low?: string;
  };
  enableToastNotifications?: boolean;
  toastPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  enableBrowserNotifications?: boolean;
  
  // Archiving and history
  enableArchiving?: boolean;
  onArchive?: (notificationId: string) => void;
  onUnarchive?: (notificationId: string) => void;
  showArchived?: boolean;
  archiveRetentionDays?: number;
  
  // Snooze functionality
  enableSnooze?: boolean;
  onSnooze?: (notificationId: string, duration: number) => void;
  snoozeOptions?: Array<{
    label: string;
    minutes: number;
  }>;
  onSnoozeExpire?: (notificationId: string) => void;
  
  // Priority escalation
  priorityEscalation?: {
    enabled: boolean;
    rules: Array<{
      priority: string;
      timeThreshold: number; // minutes
      escalateTo: string;
      notify: string[];
    }>;
  };
  onPriorityEscalate?: (notificationId: string, newPriority: string) => void;
  
  // Notification routing and assignment
  enableAssignment?: boolean;
  onAssign?: (notificationId: string, assigneeId: string) => void;
  onUnassign?: (notificationId: string) => void;
  availableAssignees?: Array<{
    id: string;
    name: string;
    role: string;
    department?: string;
  }>;
  
  // Analytics and reporting
  onAnalyticsEvent?: (event: string, data: Record<string, unknown>) => void;
  trackUserInteractions?: boolean;
  enableNotificationMetrics?: boolean;
  onExportNotifications?: (format: 'csv' | 'excel' | 'json') => void;
  
  // Performance optimization
  enableVirtualization?: boolean;
  pageSize?: number;
  enableLazyLoading?: boolean;
  onLoadMore?: () => void;
  hasMoreNotifications?: boolean;
  
  // User preferences
  userPreferences?: {
    defaultGrouping?: string;
    defaultFilters?: Record<string, unknown>;
    muteCategories?: string[];
    customSounds?: Record<string, string>;
  };
  onPreferencesChange?: (preferences: Record<string, unknown>) => void;
  enableUserPreferences?: boolean;
  
  // Maritime-specific features
  vesselContext?: {
    currentVessel?: string;
    fleetMode?: boolean;
  };
  emergencyOverride?: boolean;
  onEmergencyAcknowledge?: (notificationId: string) => void;
  complianceNotifications?: boolean;
  maritimeRegulations?: Array<{
    code: string;
    description: string;
    priority: string;
  }>;
  
  // Integration hooks
  onIntegrationAction?: (action: string, notificationId: string, data?: Record<string, unknown>) => void;
  externalSystems?: Array<{
    id: string;
    name: string;
    enabled: boolean;
    actions: string[];
  }>;
  
  // Error handling and retry
  onError?: (error: Error, context: string) => void;
  onRetry?: (notificationId: string) => void;
  enableOfflineMode?: boolean;
  offlineNotifications?: Notification[];
  
  // Accessibility enhancements
  enableScreenReaderSupport?: boolean;
  announceNewNotifications?: boolean;
  keyboardShortcuts?: Record<string, () => void>;
  enableHighContrast?: boolean;
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

## Enhanced Key Features

### Core Maritime Capabilities
- **Maritime Alert Management**: Comprehensive notification system with vessel context and emergency protocols
- **Priority Classification**: Intelligent prioritization with automatic escalation and routing
- **Real-time Updates**: Live notification feed with WebSocket synchronization and connection monitoring
- **Action Integration**: Configurable action buttons with integration hooks for external systems
- **Persistent Notifications**: Critical alerts with acknowledgment tracking and audit trails

### Enterprise Enhancements
- **Advanced Filtering & Grouping**: Multi-criteria filtering with custom predicates and dynamic grouping by type, priority, vessel, or date
- **Bulk Operations**: Mass actions for marking as read, archiving, dismissing, and exporting notifications
- **Sound & Visual Alerts**: Configurable audio alerts, toast notifications, and browser notifications for different priority levels
- **Snooze Functionality**: Flexible snoozing with custom durations and automatic re-notification
- **Assignment & Routing**: Notification assignment to team members with role-based routing and delegation
- **Search & Discovery**: Full-text search across notification content with field-specific searching and term highlighting
- **Analytics & Reporting**: Comprehensive notification metrics with user interaction tracking and export capabilities
- **User Preferences**: Personalized notification settings including muted categories and custom sound configurations
- **Maritime Compliance**: Regulatory notification support with compliance tracking and authority integration
- **Offline Support**: Offline notification queuing with synchronization when connection is restored

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

## Enterprise Feature Examples

### Advanced Filtering and Grouping

```tsx
function AdvancedFilteringNotificationPanel() {
  const [activeFilters, setActiveFilters] = useState(['unread', 'critical']);
  const [groupBy, setGroupBy] = useState('priority');
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    {
      id: 'unread',
      label: 'Unread Only',
      predicate: (notification) => !notification.read
    },
    {
      id: 'critical',
      label: 'Critical Priority',
      predicate: (notification) => notification.priority === 'critical'
    },
    {
      id: 'today',
      label: 'Today',
      predicate: (notification) => {
        const today = new Date().toDateString();
        return new Date(notification.timestamp).toDateString() === today;
      }
    },
    {
      id: 'safety',
      label: 'Safety Related',
      predicate: (notification) => notification.category === 'safety'
    },
    {
      id: 'vessel-specific',
      label: 'Current Vessel',
      predicate: (notification) => notification.vesselId === currentVesselId
    }
  ];

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    // Trigger search across notification title, message, and source
    const filteredNotifications = performSearch(notifications, searchTerm);
    setFilteredNotifications(filteredNotifications);
  };

  const handleGroupingChange = (newGroupBy) => {
    setGroupBy(newGroupBy);
    // Reorganize notifications by new grouping criteria
    const groupedNotifications = groupNotifications(notifications, newGroupBy);
    setGroupedNotifications(groupedNotifications);
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Notification Filters</h3>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Group by:</label>
            <select 
              value={groupBy} 
              onChange={(e) => handleGroupingChange(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="none">No Grouping</option>
              <option value="priority">Priority</option>
              <option value="type">Type</option>
              <option value="category">Category</option>
              <option value="date">Date</option>
              <option value="vessel">Vessel</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map(filter => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilters(prev => 
                  prev.includes(filter.id) 
                    ? prev.filter(f => f !== filter.id)
                    : [...prev, filter.id]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm border ${
                activeFilters.includes(filter.id)
                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <NotificationPanel
        notifications={notifications}
        title="Filtered Notifications"
        
        // Advanced filtering and grouping
        enableAdvancedFiltering={true}
        filterOptions={filterOptions}
        groupBy={groupBy}
        onGroupingChange={handleGroupingChange}
        enableCustomFilters={true}
        
        // Search functionality
        enableSearch={true}
        searchPlaceholder="Search notifications, sources, or content..."
        onSearch={handleSearch}
        searchableFields={['title', 'message', 'source', 'category']}
        highlightSearchTerms={true}
      />
    </div>
  );
}
```

### Bulk Operations and Management

```tsx
function BulkOperationsNotificationPanel() {
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [bulkActionProgress, setBulkActionProgress] = useState(null);

  const bulkActionMenuItems = [
    {
      id: 'mark-read',
      label: 'Mark as Read',
      action: (notificationIds) => handleBulkMarkAsRead(notificationIds),
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: 'archive',
      label: 'Archive',
      action: (notificationIds) => handleBulkArchive(notificationIds),
      icon: <Archive className="h-4 w-4" />
    },
    {
      id: 'assign',
      label: 'Assign to Team Member',
      action: (notificationIds) => showBulkAssignmentModal(notificationIds),
      icon: <UserPlus className="h-4 w-4" />
    },
    {
      id: 'export',
      label: 'Export Selected',
      action: (notificationIds) => handleBulkExport(notificationIds, 'excel'),
      icon: <Download className="h-4 w-4" />
    }
  ];

  const handleBulkMarkAsRead = async (notificationIds) => {
    setBulkActionProgress('Marking notifications as read...');
    try {
      await markNotificationsAsRead(notificationIds);
      setSelectedNotifications([]);
      showNotification('Notifications marked as read', 'success');
    } catch (error) {
      showNotification('Failed to mark notifications as read', 'error');
    } finally {
      setBulkActionProgress(null);
    }
  };

  const handleBulkArchive = async (notificationIds) => {
    setBulkActionProgress('Archiving notifications...');
    try {
      await archiveNotifications(notificationIds);
      setSelectedNotifications([]);
      showNotification(`${notificationIds.length} notifications archived`, 'success');
    } catch (error) {
      showNotification('Failed to archive notifications', 'error');
    } finally {
      setBulkActionProgress(null);
    }
  };

  const handleBulkExport = async (notificationIds, format) => {
    setBulkActionProgress('Exporting notifications...');
    try {
      const exportData = await exportNotifications(notificationIds, format);
      downloadFile(exportData, `notifications-export.${format}`);
      showNotification('Export completed successfully', 'success');
    } catch (error) {
      showNotification('Export failed', 'error');
    } finally {
      setBulkActionProgress(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      {selectedNotifications.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-medium text-blue-900">
                {selectedNotifications.length} notification{selectedNotifications.length !== 1 ? 's' : ''} selected
              </span>
              {bulkActionProgress && (
                <span className="text-sm text-blue-700">{bulkActionProgress}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {bulkActionMenuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => item.action(selectedNotifications)}
                  disabled={!!bulkActionProgress}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-white border border-blue-300 rounded-md hover:bg-blue-50 disabled:opacity-50"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => setSelectedNotifications([])}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      <NotificationPanel
        notifications={notifications}
        title="Notification Management"
        
        // Bulk operations
        enableBulkOperations={true}
        onBulkMarkAsRead={handleBulkMarkAsRead}
        onBulkDismiss={(ids) => handleBulkDismiss(ids)}
        onBulkArchive={handleBulkArchive}
        onBulkExport={handleBulkExport}
        bulkActionMenuItems={bulkActionMenuItems}
      />
    </div>
  );
}
```

### Real-time Updates and Sound Alerts

```tsx
function RealTimeNotificationPanel() {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  const soundConfig = {
    critical: '/sounds/critical-alert.mp3',
    high: '/sounds/warning-beep.mp3',
    medium: '/sounds/notification-chime.mp3',
    low: '/sounds/soft-ping.mp3'
  };

  const handleRealTimeUpdate = (newNotifications) => {
    setLastUpdateTime(new Date());
    
    // Play sound for new high-priority notifications
    const highPriorityNotifications = newNotifications.filter(n => 
      ['critical', 'high'].includes(n.priority) && !n.read
    );
    
    if (soundEnabled && highPriorityNotifications.length > 0) {
      const highestPriority = highPriorityNotifications[0].priority;
      playNotificationSound(soundConfig[highestPriority]);
    }
    
    // Show browser notifications for critical alerts
    if ('Notification' in window && Notification.permission === 'granted') {
      highPriorityNotifications.forEach(notification => {
        if (notification.priority === 'critical') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/icons/maritime-alert.png',
            tag: notification.id
          });
        }
      });
    }
  };

  const handleConnectionStatusChange = (status) => {
    setConnectionStatus(status);
    
    if (status === 'disconnected') {
      showNotification('Connection lost - notifications may be delayed', 'warning');
    } else if (status === 'connected') {
      showNotification('Connection restored', 'success');
    }
  };

  const playNotificationSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.volume = 0.7;
    audio.play().catch(error => {
      console.warn('Could not play notification sound:', error);
    });
  };

  return (
    <div className="space-y-4">
      {/* Connection Status and Controls */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' :
                connectionStatus === 'reconnecting' ? 'bg-yellow-500 animate-pulse' :
                'bg-red-500'
              }`} />
              <span className="text-sm font-medium capitalize">{connectionStatus}</span>
            </div>
            {lastUpdateTime && (
              <span className="text-sm text-gray-600">
                Last update: {lastUpdateTime.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Sound Alerts</span>
            </label>
            
            <button
              onClick={() => requestNotificationPermission()}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Enable Browser Notifications
            </button>
          </div>
        </div>
      </div>

      <NotificationPanel
        notifications={notifications}
        title="Live Notifications"
        
        // Real-time updates and synchronization
        enableRealTimeUpdates={true}
        onRealTimeUpdate={handleRealTimeUpdate}
        updateInterval={5000} // 5 seconds
        connectionStatus={connectionStatus}
        onConnectionStatusChange={handleConnectionStatusChange}
        
        // Sound and visual alerts
        enableSoundAlerts={soundEnabled}
        soundConfig={soundConfig}
        enableToastNotifications={true}
        toastPosition="top-right"
        enableBrowserNotifications={true}
      />
    </div>
  );
}
```

### Assignment and Priority Escalation

```tsx
function AssignmentEscalationNotificationPanel() {
  const [availableAssignees] = useState([
    { id: 'safety-officer', name: 'Sarah Johnson', role: 'Safety Officer', department: 'Safety' },
    { id: 'chief-engineer', name: 'Mike Chen', role: 'Chief Engineer', department: 'Engineering' },
    { id: 'deck-officer', name: 'Alex Rodriguez', role: 'Deck Officer', department: 'Navigation' },
    { id: 'port-agent', name: 'Emma Wilson', role: 'Port Agent', department: 'Operations' }
  ]);

  const priorityEscalationRules = {
    enabled: true,
    rules: [
      {
        priority: 'critical',
        timeThreshold: 5, // 5 minutes
        escalateTo: 'emergency',
        notify: ['safety-officer', 'chief-engineer']
      },
      {
        priority: 'high',
        timeThreshold: 30, // 30 minutes
        escalateTo: 'critical',
        notify: ['safety-officer']
      },
      {
        priority: 'medium',
        timeThreshold: 120, // 2 hours
        escalateTo: 'high',
        notify: ['assigned-user']
      }
    ]
  };

  const handleAssign = async (notificationId, assigneeId) => {
    try {
      await assignNotification(notificationId, assigneeId);
      const assignee = availableAssignees.find(a => a.id === assigneeId);
      
      // Send notification to assigned user
      await sendNotificationToUser(assigneeId, {
        title: 'New Assignment',
        message: `You have been assigned a notification: ${getNotificationTitle(notificationId)}`,
        priority: 'medium'
      });
      
      showNotification(`Assigned to ${assignee.name}`, 'success');
    } catch (error) {
      showNotification('Assignment failed', 'error');
    }
  };

  const handleUnassign = async (notificationId) => {
    try {
      await unassignNotification(notificationId);
      showNotification('Assignment removed', 'success');
    } catch (error) {
      showNotification('Failed to remove assignment', 'error');
    }
  };

  const handlePriorityEscalate = async (notificationId, newPriority) => {
    try {
      await escalateNotificationPriority(notificationId, newPriority);
      
      // Notify stakeholders about escalation
      const notification = getNotificationById(notificationId);
      const escalationRule = priorityEscalationRules.rules.find(r => r.escalateTo === newPriority);
      
      if (escalationRule) {
        await notifyUsers(escalationRule.notify, {
          title: 'Priority Escalation',
          message: `Notification "${notification.title}" has been escalated to ${newPriority} priority`,
          priority: newPriority
        });
      }
      
      showNotification(`Priority escalated to ${newPriority}`, 'warning');
    } catch (error) {
      showNotification('Escalation failed', 'error');
    }
  };

  return (
    <div className="space-y-4">
      {/* Assignment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {availableAssignees.map(assignee => {
          const assignedCount = notifications.filter(n => n.assignedTo === assignee.id).length;
          return (
            <div key={assignee.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{assignee.name}</div>
                  <div className="text-xs text-gray-600">{assignee.role}</div>
                </div>
                <div className="text-lg font-bold text-blue-600">{assignedCount}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Escalation Rules Status */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Priority Escalation Rules</h3>
        <div className="space-y-2">
          {priorityEscalationRules.rules.map((rule, index) => (
            <div key={index} className="text-sm text-yellow-800">
              <span className="font-medium capitalize">{rule.priority}</span> → 
              <span className="font-medium capitalize"> {rule.escalateTo}</span> after {rule.timeThreshold} minutes
            </div>
          ))}
        </div>
      </div>

      <NotificationPanel
        notifications={notifications}
        title="Assigned Notifications"
        
        // Notification routing and assignment
        enableAssignment={true}
        onAssign={handleAssign}
        onUnassign={handleUnassign}
        availableAssignees={availableAssignees}
        
        // Priority escalation
        priorityEscalation={priorityEscalationRules}
        onPriorityEscalate={handlePriorityEscalate}
      />
    </div>
  );
}
```

### Maritime-Specific Features and Emergency Response

```tsx
function MaritimeNotificationPanel() {
  const [currentVessel] = useState('MV Container Express');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [complianceAlerts, setComplianceAlerts] = useState([]);

  const maritimeRegulations = [
    { code: 'SOLAS V/19', description: 'Bridge Communication', priority: 'critical' },
    { code: 'MARPOL I/37', description: 'Oil Pollution Prevention', priority: 'high' },
    { code: 'STCW A-VIII/2', description: 'Watch Keeping Standards', priority: 'medium' },
    { code: 'MLC 2.1', description: 'Crew Accommodation', priority: 'medium' }
  ];

  const vesselContext = {
    currentVessel,
    fleetMode: false
  };

  const handleEmergencyAcknowledge = async (notificationId) => {
    try {
      // Record emergency acknowledgment with timestamp
      await recordEmergencyAcknowledgment(notificationId, {
        acknowledgedBy: currentUser.id,
        acknowledgedAt: new Date(),
        vesselPosition: await getCurrentPosition(),
        emergencyProtocol: 'MARITIME_EMERGENCY_RESPONSE'
      });

      // Notify maritime authorities if required
      const notification = getNotificationById(notificationId);
      if (notification.requiresAuthorityNotification) {
        await notifyMaritimeAuthorities(notification);
      }

      // Update emergency status
      if (notification.type === 'emergency') {
        await updateEmergencyStatus(notificationId, 'acknowledged');
      }

      showNotification('Emergency acknowledged and logged', 'success');
    } catch (error) {
      showNotification('Failed to acknowledge emergency', 'error');
    }
  };

  const handleIntegrationAction = async (action, notificationId, data) => {
    switch (action) {
      case 'log_in_deck_log':
        await addToDeckLog(notificationId, data);
        break;
      case 'create_maintenance_order':
        await createMaintenanceWorkOrder(notificationId, data);
        break;
      case 'notify_port_authority':
        await notifyPortAuthority(notificationId, data);
        break;
      case 'trigger_emergency_drill':
        await triggerEmergencyDrill(notificationId, data);
        break;
    }
  };

  const externalSystems = [
    {
      id: 'ecdis',
      name: 'Electronic Chart Display',
      enabled: true,
      actions: ['plot_position', 'create_waypoint', 'update_route']
    },
    {
      id: 'deck-log',
      name: 'Ship\'s Deck Log',
      enabled: true,
      actions: ['log_entry', 'official_record']
    },
    {
      id: 'maintenance',
      name: 'Maintenance Management',
      enabled: true,
      actions: ['create_work_order', 'schedule_inspection']
    },
    {
      id: 'port-agent',
      name: 'Port Agent System',
      enabled: true,
      actions: ['notify_arrival', 'request_services', 'customs_clearance']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Mode Indicator */}
      {emergencyMode && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-bold text-red-900">EMERGENCY MODE ACTIVE</h3>
              <p className="text-red-800">All notifications are being elevated. Emergency response protocols engaged.</p>
            </div>
          </div>
        </div>
      )}

      {/* Vessel Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-900">Current Vessel Context</h3>
            <p className="text-blue-800">{currentVessel}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEmergencyMode(!emergencyMode)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                emergencyMode 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {emergencyMode ? 'Deactivate Emergency Mode' : 'Emergency Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Alerts */}
      {complianceAlerts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-3">Regulatory Compliance Alerts</h3>
          <div className="space-y-2">
            {complianceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <div>
                  <span className="font-medium">{alert.regulation}</span>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  alert.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  alert.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <NotificationPanel
        notifications={notifications}
        title="Maritime Operations Center"
        
        // Maritime-specific features
        vesselContext={vesselContext}
        emergencyOverride={emergencyMode}
        onEmergencyAcknowledge={handleEmergencyAcknowledge}
        complianceNotifications={true}
        maritimeRegulations={maritimeRegulations}
        
        // Integration hooks
        onIntegrationAction={handleIntegrationAction}
        externalSystems={externalSystems}
        
        // Enhanced notifications for maritime context
        notificationTemplates={{
          'engine-alarm': {
            title: 'Engine Room Alert',
            messageFormat: 'Engine {system} alarm: {description}',
            icon: <Settings className="h-4 w-4" />,
            priority: 'critical'
          },
          'navigation-warning': {
            title: 'Navigation Alert',
            messageFormat: 'Navigation system {type}: {message}',
            icon: <Navigation className="h-4 w-4" />,
            priority: 'high'
          },
          'port-update': {
            title: 'Port Operations',
            messageFormat: 'Port {port}: {update}',
            icon: <Anchor className="h-4 w-4" />,
            priority: 'medium'
          }
        }}
      />
    </div>
  );
}
```

## Enhanced Performance Considerations

- **Virtual Scrolling**: Advanced virtualization for handling thousands of notifications efficiently
- **Real-time Optimization**: Intelligent batching and debouncing for WebSocket updates
- **Memory Management**: Smart caching with automatic cleanup of archived notifications
- **Animation Performance**: Hardware-accelerated transitions with reduced layout thrashing
- **Search Indexing**: Client-side search indexing for instant results across large datasets
- **Lazy Loading**: Progressive loading of notification details and attachments

## Enhanced Accessibility Features

- **Screen Reader Support**: Comprehensive ARIA live regions with detailed notification announcements
- **Keyboard Navigation**: Full keyboard accessibility with customizable shortcuts and focus management
- **High Contrast**: Maritime-optimized color schemes with WCAG AAA compliance
- **Sound Alerts**: Configurable audio cues with spatial audio for directional awareness
- **Voice Commands**: Optional voice control for hands-free notification management
- **Haptic Feedback**: Touch device vibration patterns for different notification priorities

## Enterprise Patterns

```tsx
// Real-time notification panel with sound alerts
<NotificationPanel
  enableRealTimeUpdates={true}
  updateInterval={5000}
  enableSoundAlerts={true}
  soundConfig={customSoundConfig}
  enableBrowserNotifications={true}
/>

// Bulk operations enabled panel
<NotificationPanel
  enableBulkOperations={true}
  bulkActionMenuItems={customBulkActions}
  onBulkMarkAsRead={handleBulkRead}
  onBulkArchive={handleBulkArchive}
  onBulkExport={handleBulkExport}
/>

// Advanced filtering and search
<NotificationPanel
  enableAdvancedFiltering={true}
  enableSearch={true}
  searchableFields={['title', 'message', 'source']}
  filterOptions={customFilters}
  groupBy="priority"
  highlightSearchTerms={true}
/>

// Maritime-specific configuration
<NotificationPanel
  vesselContext={{ currentVessel: 'MV Example', fleetMode: true }}
  emergencyOverride={emergencyMode}
  complianceNotifications={true}
  maritimeRegulations={regulationList}
  onEmergencyAcknowledge={handleEmergencyResponse}
/>

// Assignment and escalation system
<NotificationPanel
  enableAssignment={true}
  availableAssignees={teamMembers}
  priorityEscalation={escalationRules}
  onAssign={handleAssignment}
  onPriorityEscalate={handleEscalation}
/>
```

## Enhanced Integration with Maritime Systems

The enhanced NotificationPanel component provides comprehensive integration with:

### Maritime Safety Systems
- **Alarm Management**: Integration with fire detection, collision avoidance, and safety monitoring systems
- **Emergency Response**: Automated emergency protocol activation with authority notification
- **Man Overboard Systems**: Integration with MOB detection and response coordination
- **Bridge Alert Management**: BNWAS and navigation alert integration with watch keeping systems

### Operational Systems
- **Engine Room Monitoring**: Real-time alerts from machinery and propulsion systems
- **Cargo Management**: Loading, discharge, and cargo monitoring notifications
- **Navigation Systems**: ECDIS, radar, and GPS alert integration with route monitoring
- **Communication Systems**: VHF, satellite, and internal communication alerts

### Regulatory Compliance
- **Port State Control**: Automated PSC preparation and compliance notifications
- **Flag State Requirements**: Flag administration notification and reporting integration
- **Environmental Compliance**: MARPOL and environmental regulation alert management
- **Crew Certification**: STCW compliance and training requirement notifications

### Fleet Management Integration
- **Shore-based Operations**: Fleet coordination and shore support notifications
- **Maintenance Management**: Predictive maintenance and inspection scheduling alerts
- **Crew Management**: Watch schedules, training, and certification notifications
- **Performance Monitoring**: Fuel efficiency, route optimization, and KPI alerts

Use this enhanced component to provide comprehensive, intelligent notification management that ensures critical maritime information is communicated effectively while supporting regulatory compliance and operational efficiency across all maritime operations.