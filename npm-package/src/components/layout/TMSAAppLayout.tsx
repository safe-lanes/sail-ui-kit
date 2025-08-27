import React from 'react';
import { SidebarProvider } from '../ui/sidebar';
import { TopNavigationBar } from './TopNavigationBar';
import { LeftSidebar } from './LeftSidebar';
import type { TMSAAppLayoutProps } from '../../types/layout';

/**
 * Complete TMSA Application Layout
 * Provides consistent top navigation and left sidebar across all TMSA modules
 */
export function TMSAAppLayout({ 
  children, 
  moduleName, 
  menuItems, 
  currentModule,
  onModuleChange,
  user,
  className = ""
}: TMSAAppLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Top Navigation Bar */}
      <TopNavigationBar 
        moduleName={moduleName}
        currentModule={currentModule}
        onModuleChange={onModuleChange}
        user={user}
      />
      
      {/* Main Layout with Sidebar */}
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-[calc(100vh-4rem)]">
          {/* Left Sidebar */}
          <LeftSidebar 
            menuItems={menuItems}
            moduleName={moduleName}
          />
          
          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default TMSAAppLayout;