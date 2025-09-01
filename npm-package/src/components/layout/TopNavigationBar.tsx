import React from 'react';
import { ModuleNavigator } from './ModuleNavigator';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Bell, Settings, LogOut, User, Search, HelpCircle } from 'lucide-react';
import type { TopNavigationBarProps } from '../../types/layout';

/**
 * Standardized Top Navigation Bar
 * Contains module navigator, notifications, and user menu
 * Now supports all notification, profile, and settings functionality
 */
export function TopNavigationBar({
  moduleName,
  currentModule,
  onModuleChange,
  user,

  // Notification props
  showNotifications = true,
  notificationCount = 0,
  notifications = [],
  onNotificationClick,
  onNotificationRead,
  onNotificationAction,

  // Action callbacks
  onSettingsClick,
  onProfileClick,
  onUserSettingsClick,
  onLogout,

  // UI customization
  showSearch = false,
  onSearchClick,
  showHelp = false,
  onHelpClick,
  customActions,

  // Styling
  className = '',
  height = 'h-16',
  backgroundColor = 'bg-white',
}: TopNavigationBarProps) {
  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  const displayCount = notificationCount || unreadCount;

  // Format notification timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Get severity color for notifications
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <header
      className={`${height} ${backgroundColor} border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-50 ${className}`}
    >
      {/* Left Section - Module Navigator */}
      <div className="flex items-center gap-4">
        <ModuleNavigator
          currentModule={currentModule || moduleName}
          onModuleChange={onModuleChange || (() => {})}
        />

        {/* Current Module Title */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-lg font-semibold text-gray-900">{moduleName}</h1>
        </div>
      </div>

      {/* Right Section - Actions and User Menu */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {showSearch && (
          <Button variant="ghost" size="sm" onClick={onSearchClick}>
            <Search className="h-5 w-5" />
          </Button>
        )}

        {/* Help */}
        {showHelp && (
          <Button variant="ghost" size="sm" onClick={onHelpClick}>
            <HelpCircle className="h-5 w-5" />
          </Button>
        )}

        {/* Custom Actions */}
        {customActions}

        {/* Notifications with Popover */}
        {showNotifications && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onNotificationClick} className="relative">
                <Bell className="h-5 w-5" />
                {displayCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                  >
                    {displayCount > 99 ? '99+' : displayCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="border-b p-4">
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  {displayCount > 0
                    ? `${displayCount} unread notifications`
                    : 'No new notifications'}
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 10).map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        if (onNotificationRead) onNotificationRead(notification.id);
                        if (notification.actionUrl && onNotificationAction) {
                          onNotificationAction(notification.id, notification.actionUrl);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(notification.severity)}`}
                            >
                              {notification.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {notification.message}
                          </p>
                          {notification.actionRequired && (
                            <p className="text-xs text-orange-600 mt-1">Action Required</p>
                          )}
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-1" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Settings */}
        <Button variant="ghost" size="sm" onClick={onSettingsClick}>
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Menu with Enhanced Functionality */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'user@sail.com'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.role || 'Maritime Officer'}
                </p>
                {user?.vessel && (
                  <p className="text-xs leading-none text-muted-foreground">
                    Vessel: {user.vessel}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onUserSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
