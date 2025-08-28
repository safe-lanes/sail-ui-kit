import React from 'react';
import type { StandardLeftSidebarProps } from '../../types/layout';

/**
 * Standardized Left Sidebar for TMSA Modules
 * Features a compact vertical sidebar with customizable sections
 * Based on the Element Crew Appraisals implementation
 */
export function StandardLeftSidebar({ 
  topSection,
  bottomSection,
  width = 67,
  topOffset = 66,
  className = '',
  hidden = 'hidden md:block' // Default responsive behavior - hide on mobile, show on tablet+
}: StandardLeftSidebarProps) {
  const sidebarHeight = `calc(100vh - ${topOffset}px)`;

  return (
    <aside 
      className={`${hidden} absolute left-0 ${className}`}
      style={{ 
        width: `${width}px`,
        top: `${topOffset}px`,
        height: sidebarHeight
      }}
    >
      {/* Top Section */}
      {topSection && (
        <div className="w-full h-[79px] flex flex-col items-center justify-center bg-[#52baf3]">
          <div className="w-6 h-6 mb-1">
            {topSection.icon}
          </div>
          <div className="text-white text-[10px] font-normal font-['Roboto',Helvetica]">
            {topSection.label}
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div 
        className="w-full bg-[#16569e]"
        style={{ 
          height: topSection ? 'calc(100% - 79px)' : '100%' 
        }}
      >
        {bottomSection && (
          <div className="p-2">
            {bottomSection}
          </div>
        )}
      </div>
    </aside>
  );
}