import React from 'react';
import { Link } from 'wouter';
import { ModuleNavigator } from '@/components/ModuleNavigator';

interface StandardNavigationBarProps {
  currentModule: string;
  onModuleChange: (moduleId: string) => void;
  activeSection?: string;
}

export const StandardNavigationBar: React.FC<StandardNavigationBarProps> = ({
  currentModule,
  onModuleChange,
  activeSection = ''
}) => {
  const navigationItems = [
    {
      id: 'appraisals',
      label: 'Appraisals',
      href: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="white"/>
          <path d="M14 2V8H20" fill="white"/>
          <path d="M16 11H8V13H16V11Z" fill="#5DADE2"/>
          <path d="M16 15H8V17H16V15Z" fill="#5DADE2"/>
        </svg>
      )
    },
    {
      id: 'admin',
      label: 'Admin',
      href: '/admin',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L15.09 8.26L23 9L17 14.74L18.18 22.02L12 19L5.82 22.02L7 14.74L1 9L8.91 8.26L12 1Z" fill="#6B7280"/>
        </svg>
      )
    },
    {
      id: 'rbac',
      label: 'RBAC',
      href: '/rbac',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM12 17C10.33 17 8.9 16.2 8.17 15" fill="#6B7280"/>
        </svg>
      )
    },
    {
      id: 'components',
      label: 'Components',
      href: '/components',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" fill="#6B7280"/>
          <rect x="14" y="3" width="7" height="7" rx="1" fill="#6B7280"/>
          <rect x="3" y="14" width="7" height="7" rx="1" fill="#6B7280"/>
          <rect x="14" y="14" width="7" height="7" rx="1" fill="#6B7280"/>
        </svg>
      )
    }
  ];

  return (
    <header className="w-full h-[67px] bg-[#F1F1F1] border-b-2 border-[#5DADE2]">
      <div className="flex items-center h-full">
        {/* Logo */}
        <div className="flex items-center ml-4">
          <img
            className="w-14 h-10"
            alt="Logo"
            src="/figmaAssets/group-2.png"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex ml-8">
          {/* Module Navigator */}
          <div className="flex flex-col items-center justify-center w-[100px] h-[65px] bg-[#F1F1F1] border-r border-gray-300">
            <ModuleNavigator 
              currentModule={currentModule} 
              onModuleChange={onModuleChange}
            />
          </div>

          {/* Navigation Items - Always Show All */}
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            const bgColor = isActive ? 'bg-[#5DADE2]' : 'bg-[#F1F1F1] hover:bg-gray-300';
            const textColor = isActive ? 'text-white' : 'text-[#4f5863]';
            const iconFill = isActive ? 'white' : '#6B7280';

            return (
              <Link key={item.id} href={item.href}>
                <div className={`flex flex-col items-center justify-center w-[100px] h-[65px] ${bgColor} cursor-pointer border-r border-gray-300 transition-colors`}>
                  <div className="w-6 h-6 mb-1">
                    {React.cloneElement(item.icon, {
                      children: React.Children.map(item.icon.props.children, (child: any) => {
                        if (React.isValidElement(child)) {
                          return React.cloneElement(child, { fill: iconFill });
                        }
                        return child;
                      })
                    })}
                  </div>
                  <div className={`${textColor} text-[10px] font-normal font-['Mulish',Helvetica]`}>
                    {item.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};