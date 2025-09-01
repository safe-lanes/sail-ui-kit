import React from 'react';

// Module Definition
export interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
  available: boolean;
  tmsaElement?: string;
}

// Menu Item for Sidebar
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  count?: number;
  tooltip?: string;
}

// Notification interface
export interface Notification {
  id: string;
  type: 'weather' | 'maintenance' | 'crew' | 'compliance' | 'safety' | 'general';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
  actionUrl?: string;
}

// User Information
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  vessel?: string;
  permissions?: string[];
  preferences?: Record<string, unknown>;
}

// Component Props
export interface TMSAAppLayoutProps {
  children: React.ReactNode;
  moduleName: string;
  menuItems: MenuItem[];
  currentModule?: string;
  onModuleChange?: (moduleId: string) => void;
  user?: User;
  className?: string;
  
  // Notification props
  showNotifications?: boolean;
  notificationCount?: number;
  notifications?: Notification[];
  onNotificationClick?: () => void;
  onNotificationRead?: (notificationId: string) => void;
  onNotificationAction?: (notificationId: string, actionUrl?: string) => void;
  
  // Settings and profile props
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onUserSettingsClick?: () => void;
  onLogout?: () => void;
  
  // Sidebar configuration
  sidebarDefaultOpen?: boolean;
  sidebarCollapsible?: boolean;
  onSidebarToggle?: (open: boolean) => void;
  
  // Layout customization
  headerHeight?: string;
  maxContentWidth?: string;
  contentPadding?: string;
}

export interface TopNavigationBarProps {
  moduleName: string;
  currentModule?: string;
  onModuleChange?: (moduleId: string) => void;
  user?: User;
  
  // Notification props
  showNotifications?: boolean;
  notificationCount?: number;
  notifications?: Notification[];
  onNotificationClick?: () => void;
  onNotificationRead?: (notificationId: string) => void;
  onNotificationAction?: (notificationId: string, actionUrl?: string) => void;
  
  // Action callbacks
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onUserSettingsClick?: () => void;
  onLogout?: () => void;
  
  // UI customization
  showSearch?: boolean;
  onSearchClick?: () => void;
  showHelp?: boolean;
  onHelpClick?: () => void;
  customActions?: React.ReactNode;
  
  // Styling
  className?: string;
  height?: string;
  backgroundColor?: string;
}

export interface LeftSidebarProps {
  menuItems: MenuItem[];
  moduleName: string;
  footer?: React.ReactNode;
  className?: string;
  
  // Interaction callbacks
  onMenuItemClick?: (item: MenuItem) => void;
  onQuickActionClick?: (actionId: string) => void;
  
  // Quick actions configuration
  quickActions?: {
    id: string;
    label: string;
    icon: React.ReactNode;
    tooltip?: string;
    onClick?: () => void;
  }[];
  
  // Header customization
  headerContent?: React.ReactNode;
  showModuleIcon?: boolean;
  moduleIcon?: React.ReactNode;
  
  // Behavior props
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  
  // Section configuration
  showQuickActions?: boolean;
  customSections?: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
}

export interface ModuleNavigatorProps {
  currentModule: string;
  onModuleChange: (moduleId: string) => void;
  availableModules?: Module[];
}

export interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

// Navigation Item for StandardTopNavigationBar
export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode | ((color: string) => React.ReactNode);
  onClick?: (id: string) => void;
}

// Sidebar Section for StandardLeftSidebar
export interface SidebarSection {
  icon: React.ReactNode;
  label: string;
}

// Standard Top Navigation Bar Props
export interface StandardTopNavigationBarProps {
  currentModule: string;
  onModuleChange: (moduleId: string) => void;
  navigationItems?: NavigationItem[];
  activeSection?: string;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
}

// Standard Left Sidebar Props
export interface StandardLeftSidebarProps {
  topSection?: SidebarSection;
  bottomSection?: React.ReactNode;
  width?: number;
  topOffset?: number;
  className?: string;
  hidden?: string; // CSS classes for responsive behavior
}
