import React, { useState } from 'react';
import { FilterIcon, SearchIcon, PlusIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [showFiltersState, setShowFilters] = useState(showFilters);
  
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
          <div key={filter.id} className="relative">
            <Input
              className="h-8 pl-10 text-[#8798ad] text-xs w-full"
              placeholder={filter.placeholder || 'Search'}
              value={value}
              onChange={(e) => setFilterValues({...filterValues, [filter.id]: e.target.value})}
            />
            <SearchIcon className="w-4 h-4 absolute left-3 top-2 text-[#8798ad]" />
          </div>
        );
        
      case 'select':
        return (
          <Select key={filter.id} value={value} onValueChange={(value) => setFilterValues({...filterValues, [filter.id]: value})}>
            <SelectTrigger className="h-8 bg-white text-[#8a8a8a] text-xs w-full">
              <SelectValue placeholder={filter.placeholder || 'Select'} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'date':
        return (
          <Input
            key={filter.id}
            type="date"
            className="h-8 bg-white text-[#8a8a8a] text-xs w-full"
            value={value}
            onChange={(e) => setFilterValues({...filterValues, [filter.id]: e.target.value})}
          />
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
          {/* Logo positioned above left sidebar */}
          <div className="w-[67px] flex items-center justify-center">
            <img 
              src="/figmaAssets/sail-logo.png" 
              alt="SAIL Logo" 
              className="w-12 h-8 object-contain"
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex ml-2">
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
        {/* Screen Title and Filters Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="font-['Mulish',Helvetica] font-bold text-black text-lg sm:text-xl lg:text-[22px] px-2 sm:px-4">
            {screenTitle}
          </h1>
          <div className="flex items-center gap-3">
            {primaryAction && (
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#5DADE2] text-white rounded-md hover:bg-[#4A9BD1] transition-colors text-sm">
                {primaryAction.icon}
                {primaryAction.label}
              </button>
            )}
            {filters.length > 0 && (
              <Button
                variant="outline"
                className="h-10 border-[#e1e8ed] text-[#16569e] flex items-center gap-2 px-4 self-start sm:self-auto"
                onClick={() => setShowFilters(!showFiltersState)}
              >
                <FilterIcon className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Filters */}
        {showFiltersState && filters.length > 0 && (
          <div className="mb-6">
            <div className="flex items-end gap-3 px-2 sm:px-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
                {filters.map(renderFilter)}
              </div>
              <div className="self-start sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-[#8798ad] hover:text-gray-700 border-[#e1e8ed] text-xs"
                  onClick={() => setFilterValues({})}
                >
                  Clear Filters
                </Button>
              </div>
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