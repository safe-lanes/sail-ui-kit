import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '../ui/sidebar';
import { Badge } from '../ui/badge';
import { Ship, Anchor, Settings } from 'lucide-react';
import type { LeftSidebarProps, MenuItem } from '../../types/layout';

/**
 * Standardized Left Sidebar
 * Provides module-specific navigation menu with enhanced interactivity
 */
export function LeftSidebar({
  menuItems,
  moduleName,
  footer,
  className = '',

  // Interaction callbacks
  onMenuItemClick,
  onQuickActionClick,

  // Quick actions configuration
  quickActions = [
    {
      id: 'operations',
      label: 'Operations',
      icon: <Anchor className="h-4 w-4" />,
      tooltip: 'Maritime Operations',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      tooltip: 'Module Settings',
    },
  ],

  // Header customization
  headerContent,
  showModuleIcon = true,
  moduleIcon = <Ship className="h-5 w-5 text-white" />,

  // Behavior props (for future implementation)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collapsible: _collapsible = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultCollapsed: _defaultCollapsed = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onToggle: _onToggle,

  // Section configuration
  showQuickActions = true,
  customSections = [],
}: LeftSidebarProps) {
  // Handle menu item click
  const handleMenuItemClick = (item: MenuItem) => {
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
    // Default behavior: navigate to path
    if (item.path && !onMenuItemClick) {
      window.location.href = item.path;
    }
  };

  // Handle quick action click
  const handleQuickActionClick = (
    actionId: string,
    action: {
      id: string;
      label: string;
      icon: React.ReactNode;
      tooltip?: string;
      onClick?: () => void;
    }
  ) => {
    if (action.onClick) {
      action.onClick();
    } else if (onQuickActionClick) {
      onQuickActionClick(actionId);
    }
  };

  return (
    <Sidebar className={className}>
      {/* Sidebar Header */}
      <SidebarHeader className="p-4">
        {headerContent ? (
          headerContent
        ) : (
          <div className="flex items-center gap-3">
            {showModuleIcon && (
              <div className="w-8 h-8 bg-[#5DADE2] rounded-lg flex items-center justify-center">
                {moduleIcon}
              </div>
            )}
            <div>
              <h2 className="font-semibold text-sm">{moduleName}</h2>
              <p className="text-xs text-muted-foreground">TMSA Module</p>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild={!onMenuItemClick}
                    isActive={item.isActive}
                    tooltip={item.tooltip}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {onMenuItemClick ? (
                      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={item.badge.variant || 'secondary'}
                            className="ml-auto h-5"
                          >
                            {item.badge.text}
                          </Badge>
                        )}
                        {item.count !== undefined && (
                          <Badge variant="secondary" className="ml-auto h-5 min-w-5 justify-center">
                            {item.count}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <a href={item.path} className="flex items-center gap-3 px-3 py-2">
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={item.badge.variant || 'secondary'}
                            className="ml-auto h-5"
                          >
                            {item.badge.text}
                          </Badge>
                        )}
                        {item.count !== undefined && (
                          <Badge variant="secondary" className="ml-auto h-5 min-w-5 justify-center">
                            {item.count}
                          </Badge>
                        )}
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Quick Actions */}
        {showQuickActions && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.map(action => (
                  <SidebarMenuItem key={action.id}>
                    <SidebarMenuButton
                      tooltip={action.tooltip}
                      onClick={() => handleQuickActionClick(action.id, action)}
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Custom Sections */}
        {customSections.map((section, index) => (
          <div key={section.id}>
            {index > 0 && <SidebarSeparator />}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>{section.content}</SidebarGroupContent>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4">
        {footer ? (
          footer
        ) : (
          <div className="text-xs text-muted-foreground text-center">
            <p>SAIL Phase 2</p>
            <p>Maritime ERP v1.0</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
