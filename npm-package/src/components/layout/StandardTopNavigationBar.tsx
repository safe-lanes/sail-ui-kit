import React from 'react';
import type { StandardTopNavigationBarProps } from '../../types/layout';

/**
 * Standardized Top Navigation Bar for TMSA Modules
 * Features horizontal navigation with module navigator and customizable navigation items
 * Based on the Element Crew Appraisals implementation
 */
export function StandardTopNavigationBar({
  currentModule,
  onModuleChange,
  navigationItems = [],
  activeSection = '',
  logoSrc = '/figmaAssets/group-2.png',
  logoAlt = 'Logo',
  className = '',
}: StandardTopNavigationBarProps) {
  return (
    <header className={`w-full h-[67px] bg-[#F1F1F1] border-b-2 border-[#5DADE2] ${className}`}>
      <div className="flex items-center h-full">
        {/* Logo */}
        <div className="flex items-center ml-4">
          <img className="w-14 h-10" alt={logoAlt} src={logoSrc} />
        </div>

        {/* Navigation Menu */}
        <nav className="flex ml-8">
          {/* Module Navigator */}
          <button
            onClick={() => onModuleChange && onModuleChange(currentModule)}
            className="flex flex-col items-center justify-center w-[100px] h-[65px] bg-[#F1F1F1] border-r border-gray-300 hover:bg-gray-300 cursor-pointer transition-colors"
          >
            <div className="w-6 h-6 mb-1">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <div className="text-[#4f5863] text-[10px] font-normal font-['Mulish',Helvetica]">
              {currentModule}
            </div>
          </button>

          {/* Navigation Items */}
          {navigationItems.map(item => {
            const isActive = activeSection === item.id;
            const bgColor = isActive ? 'bg-[#5DADE2]' : 'bg-[#F1F1F1] hover:bg-gray-300';
            const textColor = isActive ? 'text-white' : 'text-[#4f5863]';
            const iconColor = isActive ? 'white' : '#6B7280';

            return (
              <button
                key={item.id}
                onClick={() => item.onClick?.(item.id)}
                className={`flex flex-col items-center justify-center w-[100px] h-[65px] ${bgColor} cursor-pointer border-r border-gray-300 transition-colors`}
              >
                <div className="w-6 h-6 mb-1">
                  {typeof item.icon === 'function' ? item.icon(iconColor) : item.icon}
                </div>
                <div className={`${textColor} text-[10px] font-normal font-['Mulish',Helvetica]`}>
                  {item.label}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
