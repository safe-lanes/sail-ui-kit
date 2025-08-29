import React from 'react';
import { StandardTopNavigationBar } from './StandardTopNavigationBar';
import { StandardLeftSidebar } from './StandardLeftSidebar';
import type { NavigationItem, SidebarSection } from '../../types/layout';

// Filter Types
export interface FilterConfig {
  id: string;
  type: 'search' | 'select' | 'date' | 'dateRange' | 'number';
  placeholder?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
  width?: string;
  value?: any;
  onChange?: (value: any) => void;
}

// AG Grid Column Configuration
export interface ColumnConfig {
  field: string;
  headerName: string;
  width?: number;
  filter?: string;
  sortable?: boolean;
  resizable?: boolean;
  cellRenderer?: any;
  cellStyle?: any;
}

// Main Table Screen Props
export interface SCOMPMainTableScreenProps {
  // Navigation Configuration
  currentModule: string;
  onModuleChange: (moduleId: string) => void;
  navigationItems?: NavigationItem[];
  activeSection?: string;
  
  // Sidebar Configuration  
  sidebarTopSection?: SidebarSection;
  sidebarBottomSection?: React.ReactNode;
  sidebarWidth?: number;
  
  // Main Content Configuration
  screenTitle: string;
  showFilters?: boolean;
  filters?: FilterConfig[];
  onFiltersChange?: (filters: any) => void;
  onClearFilters?: () => void;
  
  // Table Configuration
  rowData?: any[];
  columnDefs?: ColumnConfig[];
  onGridReady?: (params: any) => void;
  tableHeight?: string;
  enableSideBar?: boolean;
  enableStatusBar?: boolean;
  loading?: boolean;
  
  // Actions
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  
  // Layout Options
  className?: string;
  contentClassName?: string;
}

export function SCOMPMainTableScreen({
  // Navigation
  currentModule,
  onModuleChange,
  navigationItems = [],
  activeSection = '',
  
  // Sidebar
  sidebarTopSection,
  sidebarBottomSection,
  sidebarWidth = 67,
  
  // Main Content
  screenTitle,
  showFilters = true,
  filters = [],
  onFiltersChange,
  onClearFilters,
  
  // Table
  rowData = [],
  columnDefs = [],
  onGridReady,
  tableHeight = 'calc(100vh - 280px)',
  enableSideBar = true,
  enableStatusBar = true,
  loading = false,
  
  // Actions
  primaryAction,
  
  // Layout
  className = '',
  contentClassName = ''
}: SCOMPMainTableScreenProps) {
  
  const renderFilter = (filter: FilterConfig) => {
    const commonProps = {
      key: filter.id,
      placeholder: filter.placeholder,
      className: `bg-white border border-gray-300 rounded-md px-3 py-2 text-sm ${filter.width || 'min-w-[180px]'}`,
      value: filter.value || '',
      onChange: (e: any) => {
        const value = e.target ? e.target.value : e;
        filter.onChange?.(value);
        onFiltersChange?.({ [filter.id]: value });
      }
    };

    switch (filter.type) {
      case 'search':
        return (
          <div key={filter.id} className="flex flex-col gap-1">
            {filter.label && <label className="text-sm font-medium text-gray-700">{filter.label}</label>}
            <div className="relative">
              <input
                type="text"
                {...commonProps}
                className={`${commonProps.className} pl-8`}
              />
              <svg className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        );
        
      case 'select':
        return (
          <div key={filter.id} className="flex flex-col gap-1">
            {filter.label && <label className="text-sm font-medium text-gray-700">{filter.label}</label>}
            <select {...commonProps}>
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
              {...commonProps}
            />
          </div>
        );
        
      case 'number':
        return (
          <div key={filter.id} className="flex flex-col gap-1">
            {filter.label && <label className="text-sm font-medium text-gray-700">{filter.label}</label>}
            <input
              type="number"
              {...commonProps}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`w-full h-screen bg-gray-50 ${className}`}>
      {/* Top Navigation */}
      <StandardTopNavigationBar
        currentModule={currentModule}
        onModuleChange={onModuleChange}
        navigationItems={navigationItems}
        activeSection={activeSection}
      />
      
      {/* Left Sidebar */}
      <StandardLeftSidebar
        topSection={sidebarTopSection}
        bottomSection={sidebarBottomSection}
        width={sidebarWidth}
        topOffset={67}
      />
      
      {/* Main Content Area */}
      <main 
        className={`${contentClassName}`}
        style={{
          marginLeft: `${sidebarWidth}px`,
          marginTop: '67px',
          height: 'calc(100vh - 67px)',
          overflow: 'auto'
        }}
      >
        <div className="p-6">
          {/* Screen Title and Primary Action */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{screenTitle}</h1>
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5DADE2] text-white rounded-md hover:bg-[#4A9BD1] transition-colors"
              >
                {primaryAction.icon}
                {primaryAction.label}
              </button>
            )}
          </div>
          
          {/* Filters Row */}
          {showFilters && filters.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Filters</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                {filters.map(renderFilter)}
              </div>
              
              {onClearFilters && (
                <div className="flex justify-end">
                  <button
                    onClick={onClearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* AG Grid Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5DADE2]"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : (
              <div
                className="ag-theme-alpine"
                style={{ height: tableHeight, width: '100%' }}
              >
                {/* AG Grid placeholder - This would be replaced with actual AgGridReact in implementation */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">AG Grid Table</span>
                    <span className="text-xs text-gray-500">
                      {rowData.length} records
                    </span>
                  </div>
                </div>
                
                <div className="p-8 text-center text-gray-500">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {columnDefs.slice(0, 4).map((col, idx) => (
                      <div key={idx} className="text-sm font-medium text-gray-700 border-b pb-2">
                        {col.headerName}
                      </div>
                    ))}
                  </div>
                  
                  {rowData.length > 0 ? (
                    <div className="space-y-2">
                      {rowData.slice(0, 3).map((row, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 py-2 text-sm text-gray-600 border-b">
                          {columnDefs.slice(0, 4).map((col, colIdx) => (
                            <div key={colIdx}>{row[col.field] || '-'}</div>
                          ))}
                        </div>
                      ))}
                      {rowData.length > 3 && (
                        <div className="text-xs text-gray-400 pt-2">
                          ... and {rowData.length - 3} more records
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-8">
                      <p>No data available</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Table will display here with AG Grid Enterprise features
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}