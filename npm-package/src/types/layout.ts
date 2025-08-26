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

// User Information
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
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
}

export interface TopNavigationBarProps {
  moduleName: string;
  currentModule?: string;
  onModuleChange?: (moduleId: string) => void;
  user?: User;
  showNotifications?: boolean;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

export interface LeftSidebarProps {
  menuItems: MenuItem[];
  moduleName: string;
  footer?: React.ReactNode;
  className?: string;
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