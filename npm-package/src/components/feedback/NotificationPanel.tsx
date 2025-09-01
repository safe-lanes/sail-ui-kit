import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Bell, X, CheckCheck, AlertTriangle, Info, XCircle } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category?: 'system' | 'safety' | 'maintenance' | 'operational' | 'compliance';
  vessel?: string;
  actions?: Array<{
    label: string;
    onClick: (notification: Notification) => void;
  }>;
}

export interface NotificationPanelProps {
  notifications: Notification[];
  title?: string;
  showUnreadOnly?: boolean;
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (notificationId: string) => void;
  onClearAll?: () => void;
  maxHeight?: string;
  className?: string;
  
  // ✨ ENTERPRISE ENHANCEMENTS
  
  // Advanced filtering and grouping
  enableGrouping?: boolean;
  groupBy?: 'category' | 'priority' | 'vessel' | 'date' | 'type';
  onGroupingChange?: (groupBy: string) => void;
  enableAdvancedFiltering?: boolean;
  filterOptions?: {
    categories?: string[];
    priorities?: string[];
    types?: string[];
    vessels?: string[];
    dateRange?: { start: Date; end: Date };
  };
  onFilterChange?: (filters: Record<string, unknown>) => void;
  
  // Bulk operations
  enableBulkActions?: boolean;
  selectedNotifications?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onBulkMarkAsRead?: (notificationIds: string[]) => void;
  onBulkDismiss?: (notificationIds: string[]) => void;
  onBulkArchive?: (notificationIds: string[]) => void;
  bulkActions?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick: (notificationIds: string[]) => void;
  }>;
  
  // Real-time updates
  enableRealTime?: boolean;
  onNewNotification?: (notification: Notification) => void;
  onNotificationUpdate?: (notificationId: string, updates: Partial<Notification>) => void;
  websocketConnection?: boolean;
  autoRefreshInterval?: number;
  
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

const typeConfig = {
  info: { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  success: { icon: CheckCheck, color: 'text-green-600', bgColor: 'bg-green-50' },
  warning: { icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  error: { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
};

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
  medium: { color: 'bg-blue-100 text-blue-800', label: 'Medium' },
  high: { color: 'bg-orange-100 text-orange-800', label: 'High' },
  critical: { color: 'bg-red-100 text-red-800', label: 'Critical' },
};

const categoryConfig = {
  system: { icon: '⚙', label: 'System' },
  safety: { icon: '🦺', label: 'Safety' },
  maintenance: { icon: '🔧', label: 'Maintenance' },
  operational: { icon: '🚢', label: 'Operational' },
  compliance: { icon: '📋', label: 'Compliance' },
};

export function NotificationPanel({
  notifications,
  title = 'Notifications',
  showUnreadOnly = false,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  maxHeight = '400px',
  className = '',
}: NotificationPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (showUnreadOnly && notification.read) return false;

    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'critical':
        return notification.priority === 'critical';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    onNotificationClick?.(notification);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              {title}
            </CardTitle>
            {unreadCount > 0 && (
              <Badge variant="outline" className="bg-red-100 text-red-800">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {onMarkAllAsRead && unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs">
                Mark all read
              </Button>
            )}
            {onClearAll && (
              <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs">
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
            className="h-7 px-2 text-xs"
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
            className="h-7 px-2 text-xs"
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === 'critical' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('critical')}
            className="h-7 px-2 text-xs"
          >
            Critical ({criticalCount})
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-full" style={{ maxHeight }}>
          {filteredNotifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">No notifications to display</div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map(notification => {
                const TypeIcon = typeConfig[notification.type].icon;

                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer relative ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div className="absolute top-4 left-2 h-2 w-2 bg-blue-600 rounded-full" />
                    )}

                    {/* Dismiss Button */}
                    {onDismiss && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-50 hover:opacity-100"
                        onClick={e => {
                          e.stopPropagation();
                          onDismiss(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}

                    <div className="flex items-start space-x-3 pr-8">
                      <TypeIcon
                        className={`h-4 w-4 mt-1 ${typeConfig[notification.type].color} flex-shrink-0`}
                      />

                      <div className="flex-1 space-y-2">
                        {/* Header */}
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h4
                            className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}
                          >
                            {notification.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className={priorityConfig[notification.priority].color}
                          >
                            {priorityConfig[notification.priority].label}
                          </Badge>
                          {notification.category && (
                            <Badge variant="outline" className="text-xs">
                              {categoryConfig[notification.category]?.icon}{' '}
                              {categoryConfig[notification.category]?.label}
                            </Badge>
                          )}
                        </div>

                        {/* Message */}
                        <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>

                        {/* Metadata */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            {notification.vessel && (
                              <span className="flex items-center">🚢 {notification.vessel}</span>
                            )}
                            <span>{new Date(notification.timestamp).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        {notification.actions && notification.actions.length > 0 && (
                          <div className="flex items-center space-x-2 pt-2">
                            {notification.actions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={e => {
                                  e.stopPropagation();
                                  action.onClick(notification);
                                }}
                                className="h-7 px-2 text-xs"
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
