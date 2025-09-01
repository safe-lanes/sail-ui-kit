import React from 'react';
import { SidebarProvider } from '../ui/sidebar';
import { TopNavigationBar } from './TopNavigationBar';
import { LeftSidebar } from './LeftSidebar';
import type { TMSAAppLayoutProps } from '../../types/layout';

/**
 * Complete TMSA Application Layout
 * Provides consistent top navigation and left sidebar across all TMSA modules
 * Now supports all notification, profile, and settings functionality
 */
export function TMSAAppLayout({
  children,
  moduleName,
  menuItems,
  currentModule,
  onModuleChange,
  user,
  className = '',

  // Notification props
  showNotifications = true,
  notificationCount,
  notifications,
  onNotificationClick,
  onNotificationRead,
  onNotificationAction,

  // Settings and profile props
  onSettingsClick,
  onProfileClick,
  onUserSettingsClick,
  onLogout,

  // Sidebar configuration
  sidebarDefaultOpen = true,
  sidebarCollapsible = true,
  onSidebarToggle,

  // Layout customization
  headerHeight = '4rem',
  maxContentWidth = '7xl',
  contentPadding = '6',
}: TMSAAppLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Top Navigation Bar - Now passes through all props */}
      <TopNavigationBar
        moduleName={moduleName}
        currentModule={currentModule}
        onModuleChange={onModuleChange}
        user={user}
        height={headerHeight}
        // Notification props
        showNotifications={showNotifications}
        notificationCount={notificationCount}
        notifications={notifications}
        onNotificationClick={onNotificationClick}
        onNotificationRead={onNotificationRead}
        onNotificationAction={onNotificationAction}
        // Action callbacks
        onSettingsClick={onSettingsClick}
        onProfileClick={onProfileClick}
        onUserSettingsClick={onUserSettingsClick}
        onLogout={onLogout}
      />

      {/* Main Layout with Sidebar */}
      <SidebarProvider defaultOpen={sidebarDefaultOpen} onOpenChange={onSidebarToggle}>
        <div className={`flex min-h-[calc(100vh-${headerHeight})]`}>
          {/* Left Sidebar - Enhanced with new props */}
          <LeftSidebar
            menuItems={menuItems}
            moduleName={moduleName}
            collapsible={sidebarCollapsible}
          />

          {/* Main Content Area - Customizable */}
          <main className={`flex-1 p-${contentPadding} overflow-y-auto`}>
            <div className={`mx-auto max-w-${maxContentWidth}`}>{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default TMSAAppLayout;
