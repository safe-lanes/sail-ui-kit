import React from 'react';
import { ModuleNavigator } from './ModuleNavigator';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Bell, Settings, LogOut, User } from 'lucide-react';
import type { TopNavigationBarProps } from '../../types/layout';

/**
 * Standardized Top Navigation Bar
 * Contains module navigator, notifications, and user menu
 */
export function TopNavigationBar({ 
  moduleName, 
  currentModule,
  onModuleChange,
  user,
  showNotifications = true,
  onNotificationClick,
  onSettingsClick,
  onLogout
}: TopNavigationBarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left Section - Module Navigator */}
      <div className="flex items-center gap-4">
        <ModuleNavigator 
          currentModule={currentModule || moduleName}
          onModuleChange={onModuleChange || (() => {})}
        />
        
        {/* Current Module Title */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-lg font-semibold text-gray-900">
            {moduleName}
          </h1>
        </div>
      </div>

      {/* Right Section - Actions and User Menu */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        {showNotifications && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onNotificationClick}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
        )}

        {/* Settings */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'user@sail.com'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.role || 'Maritime Officer'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
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