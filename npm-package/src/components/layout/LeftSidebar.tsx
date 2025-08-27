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
  SidebarSeparator
} from '../ui/sidebar';
import { Badge } from '../ui/badge';
import { Ship, Anchor, Settings } from 'lucide-react';
import type { LeftSidebarProps } from '../../types/layout';

/**
 * Standardized Left Sidebar
 * Provides module-specific navigation menu
 */
export function LeftSidebar({ 
  menuItems, 
  moduleName,
  footer,
  className = ""
}: LeftSidebarProps) {
  return (
    <Sidebar className={className}>
      {/* Sidebar Header */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#5DADE2] rounded-lg flex items-center justify-center">
            <Ship className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">{moduleName}</h2>
            <p className="text-xs text-muted-foreground">TMSA Module</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item: any) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={item.isActive}
                    tooltip={item.tooltip}
                  >
                    <a 
                      href={item.path} 
                      className="flex items-center gap-3 px-3 py-2"
                    >
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
                        <Badge 
                          variant="secondary"
                          className="ml-auto h-5 min-w-5 justify-center"
                        >
                          {item.count}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Maritime Operations">
                  <Anchor className="h-4 w-4" />
                  <span>Operations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Module Settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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