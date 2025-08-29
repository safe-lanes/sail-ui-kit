import React, { useState } from 'react';
import { FilterIcon, SearchIcon, PlusIcon } from "lucide-react";

// Filter Types for the demo
interface FilterConfig {
  id: string;
  type: 'search' | 'select' | 'date' | 'dateRange' | 'number';
  placeholder?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
  width?: string;
}

// Demo Column Configuration
interface ColumnConfig {
  field: string;
  headerName: string;
  width?: number;
}

// Main Table Screen Props for the demo
interface SCOMPMainTableScreenProps {
  // Navigation Configuration
  currentModule?: string;
  navigationItems?: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    isActive?: boolean;
  }>;
  
  // Sidebar Configuration  
  sidebarItems?: Array<{
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
  }>;
  
  // Main Content Configuration
  screenTitle: string;
  showFilters?: boolean;
  filters?: FilterConfig[];
  
  // Table Configuration
  sampleData?: any[];
  columnDefs?: ColumnConfig[];
  
  // Actions
  primaryAction?: {
    label: string;
    icon?: React.ReactNode;
  };
  
  // Layout Options
  className?: string;
  previewMode?: boolean; // For when used in showcase/preview context
}

export function SCOMPMainTableScreen({
  currentModule = "Element Audits",
  navigationItems = [],
  sidebarItems = [],
  screenTitle,
  showFilters = true,
  filters = [],
  sampleData = [],
  columnDefs = [],
  primaryAction,
  className = '',
  previewMode = false
}: SCOMPMainTableScreenProps) {
  
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  
  // Default navigation items if none provided
  const defaultNavItems = [
    { id: 'audits', label: 'Element Audits', icon: <div className="w-4 h-4 bg-blue-400 rounded"></div>, isActive: true },
    { id: 'appraisals', label: 'Appraisal', icon: <div className="w-4 h-4 bg-teal-400 rounded"></div>, isActive: false },
    { id: 'vetting', label: 'Vetting', icon: <div className="w-4 h-4 bg-purple-400 rounded"></div>, isActive: false },
    { id: 'psc', label: 'Port State Control', icon: <div className="w-4 h-4 bg-orange-400 rounded"></div>, isActive: false },
    { id: 'element13', label: 'Element 13', icon: <div className="w-4 h-4 bg-green-400 rounded"></div>, isActive: false }
  ];
  
  // Default sidebar items if none provided  
  const defaultSidebarItems = [
    { icon: <div className="w-4 h-4 bg-blue-300 rounded"></div>, label: 'List View', isActive: true },
    { icon: <div className="w-4 h-4 bg-gray-300 rounded"></div>, label: 'Reports', isActive: false },
    { icon: <div className="w-4 h-4 bg-gray-300 rounded"></div>, label: 'Settings', isActive: false }
  ];

  const navItemsToShow = navigationItems.length > 0 ? navigationItems : defaultNavItems;
  const sidebarItemsToShow = sidebarItems.length > 0 ? sidebarItems : defaultSidebarItems;
  
  const renderFilter = (filter: FilterConfig, index: number) => {
    const value = filterValues[filter.id] || '';
    
    switch (filter.type) {
      case 'search':
        return (
          <div key={filter.id} className="flex flex-col gap-1">
            {filter.label && <label className="text-sm font-medium text-gray-700">{filter.label}</label>}
            <div className="relative">
              <input
                type="text"
                placeholder={filter.placeholder}
                className={`bg-white border border-gray-300 rounded-md px-3 py-2 pl-8 text-sm ${filter.width || 'min-w-[180px]'}`}
                value={value}
                onChange={(e) => setFilterValues({...filterValues, [filter.id]: e.target.value})}
              />
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        );
        
      case 'select':
        return (
          <div key={filter.id} className="flex flex-col gap-1">
            {filter.label && <label className="text-sm font-medium text-gray-700">{filter.label}</label>}
            <select 
              className={`bg-white border border-gray-300 rounded-md px-3 py-2 text-sm ${filter.width || 'min-w-[180px]'}`}
              value={value}
              onChange={(e) => setFilterValues({...filterValues, [filter.id]: e.target.value})}
            >
              <option value="">{filter.placeholder || 'Select...'}</option>
              {filter.options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        );
        
      case 'date':
        return (
          <div key={filter.id} className="flex flex-col gap-1">
            {filter.label && <label className="text-sm font-medium text-gray-700">{filter.label}</label>}
            <input
              type="date"
              className={`bg-white border border-gray-300 rounded-md px-3 py-2 text-sm ${filter.width || 'min-w-[180px]'}`}
              value={value}
              onChange={(e) => setFilterValues({...filterValues, [filter.id]: e.target.value})}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`w-full h-[600px] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden ${previewMode ? 'mb-8' : ''} ${className}`}>
      {/* Top Navigation */}
      <header className="w-full h-[67px] bg-[#F1F1F1] border-b-2 border-[#5DADE2]">
        <div className="flex items-center h-full">
          {/* Logo */}
          <div className="flex items-center ml-4">
            <div className="w-14 h-10 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
              LOGO
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex ml-8">
            {/* Module Navigator */}
            <button className="flex flex-col items-center justify-center w-[100px] h-[65px] bg-[#F1F1F1] border-r border-gray-300 hover:bg-gray-300 cursor-pointer transition-colors">
              <div className="w-6 h-6 mb-1">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div className="text-[#4f5863] text-[10px] font-normal">
                {currentModule}
              </div>
            </button>

            {/* Navigation Items */}
            {navItemsToShow.map(item => {
              const bgColor = item.isActive ? 'bg-[#5DADE2]' : 'bg-[#F1F1F1] hover:bg-gray-300';
              const textColor = item.isActive ? 'text-white' : 'text-[#4f5863]';

              return (
                <button
                  key={item.id}
                  className={`flex flex-col items-center justify-center w-[100px] h-[65px] ${bgColor} cursor-pointer border-r border-gray-300 transition-colors`}
                >
                  <div className="w-6 h-6 mb-1">{item.icon}</div>
                  <div className={`${textColor} text-[10px] font-normal`}>
                    {item.label}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      
      {/* Left Sidebar */}
      <aside className={`${previewMode ? 'relative' : 'absolute left-0'} w-[67px] bg-[#16569e] float-left`} style={{ top: previewMode ? '0' : '67px', height: 'calc(600px - 67px)' }}>
        {/* Top Section */}
        <div className="w-full h-[79px] flex flex-col items-center justify-center bg-[#52baf3]">
          <div className="w-6 h-6 mb-1">{sidebarItemsToShow[0]?.icon}</div>
          <div className="text-white text-[10px] font-normal">
            {sidebarItemsToShow[0]?.label}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-2 space-y-3">
          {sidebarItemsToShow.slice(1).map((item, index) => (
            <div key={index} className="flex flex-col items-center p-2 hover:bg-blue-800 rounded cursor-pointer transition-colors">
              <div className="w-4 h-4 mb-1">{item.icon}</div>
              <div className="text-white text-[8px] text-center">{item.label}</div>
            </div>
          ))}
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className={`${previewMode ? 'ml-0' : 'ml-[67px]'} p-6 ${previewMode ? 'overflow-hidden' : ''}`} style={{ height: 'calc(600px - 67px)', overflow: previewMode ? 'hidden' : 'auto' }}>
        {/* Screen Title and Primary Action */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">{screenTitle}</h1>
          {primaryAction && (
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#5DADE2] text-white rounded-md hover:bg-[#4A9BD1] transition-colors text-sm">
              {primaryAction.icon}
              {primaryAction.label}
            </button>
          )}
        </div>
        
        {/* Filters Row */}
        {showFilters && filters.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FilterIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
              {filters.map(renderFilter)}
            </div>
            
            <div className="flex justify-end">
              <button 
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setFilterValues({})}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
        
        {/* AG Grid Table Placeholder */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Data Table (AG Grid)</span>
              <span className="text-xs text-gray-500">
                {sampleData.length} records
              </span>
            </div>
          </div>
          
          {/* Table Header */}
          {columnDefs.length > 0 && (
            <div className="grid gap-4 p-4 border-b bg-gray-50" style={{ gridTemplateColumns: `repeat(${columnDefs.length}, 1fr)` }}>
              {columnDefs.map((col, idx) => (
                <div key={idx} className="text-sm font-medium text-gray-700">
                  {col.headerName}
                </div>
              ))}
            </div>
          )}
          
          {/* Table Data */}
          <div className="min-h-[200px]">
            {sampleData.length > 0 && columnDefs.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {sampleData.slice(0, 5).map((row, idx) => (
                  <div key={idx} className="grid gap-4 p-4 hover:bg-gray-50" style={{ gridTemplateColumns: `repeat(${columnDefs.length}, 1fr)` }}>
                    {columnDefs.map((col, colIdx) => (
                      <div key={colIdx} className="text-sm text-gray-600">
                        {row[col.field] || '-'}
                      </div>
                    ))}
                  </div>
                ))}
                {sampleData.length > 5 && (
                  <div className="p-4 text-center text-xs text-gray-400">
                    ... and {sampleData.length - 5} more records
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <p className="font-medium">AG Grid Enterprise Table</p>
                <p className="text-xs text-gray-400 mt-2">
                  Configurable data table with advanced features like filtering, sorting, grouping, and export
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}