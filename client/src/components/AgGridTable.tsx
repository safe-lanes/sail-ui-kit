import React, { useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
  ColDef, 
  GridApi, 
  GridOptions, 
  GridReadyEvent,
  LicenseManager,
  ModuleRegistry
} from 'ag-grid-enterprise';
import { AllCommunityModule } from 'ag-grid-community';
import { 
  SetFilterModule, 
  MenuModule, 
  ColumnsToolPanelModule, 
  FiltersToolPanelModule, 
  StatusBarModule,
  SideBarModule 
} from 'ag-grid-enterprise';

// Register AG Grid modules
ModuleRegistry.registerModules([
  AllCommunityModule, 
  SetFilterModule, 
  MenuModule, 
  ColumnsToolPanelModule, 
  FiltersToolPanelModule,
  StatusBarModule,
  SideBarModule
]);

// Import AG Grid styles (legacy theme compatibility)
import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-alpine.css';

// Set AG Grid license key
const licenseKey = import.meta.env.VITE_AG_GRID_LICENSE_KEY || import.meta.env.AG_GRID_LICENSE_KEY;
if (licenseKey) {
  LicenseManager.setLicenseKey(licenseKey);
}

interface AgGridTableProps {
  rowData: any[];
  columnDefs: ColDef[];
  onGridReady?: (event: GridReadyEvent) => void;
  context?: any;
  height?: string | number;
  width?: string | number;
  className?: string;
  loading?: boolean;
  enableExport?: boolean;
  enableSideBar?: boolean;
  enableStatusBar?: boolean;
  enableRowGrouping?: boolean;
  enablePivoting?: boolean;
  enableAdvancedFilter?: boolean;
  rowSelection?: 'single' | 'multiple' | false;
  theme?: 'alpine' | 'balham' | 'material' | 'legacy';
  gridOptions?: Partial<GridOptions>;
  autoHeight?: boolean;
  maxHeight?: string | number;
  minHeight?: string | number;
  pagination?: boolean;
  paginationPageSize?: number;
  animateRows?: boolean;
  enableRangeSelection?: boolean;
  enableCharts?: boolean;
  suppressRowClickSelection?: boolean;
}

const AgGridTable: React.FC<AgGridTableProps> = ({
  rowData,
  columnDefs,
  onGridReady,
  context,
  height = '500px',
  width = '100%',
  className = '',
  loading = false,
  enableExport = true,
  enableSideBar = true,
  enableStatusBar = true,
  enableRowGrouping = false,
  enablePivoting = true,
  enableAdvancedFilter = false,
  rowSelection = false,
  theme = 'alpine',
  gridOptions = {},
  autoHeight = false,
  maxHeight = '600px',
  minHeight = '200px',
  pagination = false,
  paginationPageSize = 20,
  animateRows = false,
  enableRangeSelection = false,
  enableCharts = false,
  suppressRowClickSelection = false
}) => {
  const [containerHeight, setContainerHeight] = React.useState(height);

  const defaultGridOptions: GridOptions = useMemo(() => ({
    // Row Selection
    rowSelection: rowSelection === false ? undefined : rowSelection,
    suppressRowClickSelection: suppressRowClickSelection || rowSelection === false,
    
    // Column Configuration
    suppressMenuHide: true,
    suppressMovableColumns: false,
    resizable: true,
    sortable: true,
    filter: true,
    
    // Floating Filters - Disabled for cleaner look
    floatingFilter: false,
    
    // Row Configuration
    rowHeight: 48,
    headerHeight: 48,
    
    // Pagination
    pagination: pagination,
    paginationPageSize: paginationPageSize,
    
    // Features
    enableRangeSelection: enableRangeSelection,
    enableCharts: enableCharts,
    enableAdvancedFilter: enableAdvancedFilter,
    
    // Side Bar
    sideBar: enableSideBar ? {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        }
      ],
      defaultToolPanel: 'columns'
    } : false,
    
    // Status Bar
    statusBar: enableStatusBar ? {
      statusPanels: [
        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
        { statusPanel: 'agFilteredRowCountComponent' },
      ]
    } : undefined,
    
    // Row Grouping
    groupDefaultExpanded: 1,
    suppressAggFuncInHeader: true,
    animateRows: animateRows,
    
    // Export
    defaultExcelExportParams: {
      fileName: 'export.xlsx'
    },
    defaultCsvExportParams: {
      fileName: 'export.csv'
    },
    
    ...gridOptions
  }), [
    rowSelection,
    enableSideBar,
    enableStatusBar,
    enableAdvancedFilter,
    gridOptions
  ]);

  // Auto height calculation
  useEffect(() => {
    if (autoHeight && rowData.length > 0) {
      const headerHeight = 48;
      const rowHeight = 48;
      const totalRowsHeight = rowData.length * rowHeight;
      const calculatedHeight = headerHeight + totalRowsHeight + 20; // 20px padding
      
      const minHeightPx = typeof minHeight === 'string' ? parseInt(minHeight) : minHeight;
      let finalHeight = Math.max(minHeightPx || 200, calculatedHeight);
      
      if (maxHeight) {
        const maxHeightPx = typeof maxHeight === 'string' ? parseInt(maxHeight) : maxHeight;
        finalHeight = Math.min(finalHeight, maxHeightPx);
      }
      
      setContainerHeight(`${finalHeight}px`);
    }
  }, [rowData.length, autoHeight, maxHeight, minHeight]);

  const themeClass = `ag-theme-${theme}`;
  const needsScroll = autoHeight && maxHeight && containerHeight === maxHeight;

  return (
    <div className={`${className} ag-grid-container`}>
      <div 
        className={`${themeClass} ${needsScroll ? 'needs-scroll' : 'no-scroll'}`}
        style={{ 
          width, 
          height: autoHeight ? containerHeight : height 
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={defaultGridOptions}
          onGridReady={onGridReady}
          context={context}
        />
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .ag-grid-container .ag-theme-alpine .ag-header {
          background-color: #52baf3 !important;
          border-bottom: 1px solid #52baf3 !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-header-cell {
          background-color: #52baf3 !important;
          color: white !important;
          font-size: 12px !important;
          font-weight: normal !important;
          border-right: none !important;
          border-bottom: 1px solid #52baf3 !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-header-cell-label {
          color: white !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-header-icon {
          color: white !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon {
          color: white !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-filter {
          color: white !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-menu {
          color: white !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-desc,
        .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-asc {
          color: white !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-row:hover {
          background-color: #f9fafb !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-cell {
          border-right: none !important;
          padding: 8px 16px !important;
          font-size: 13px !important;
          color: #4f5863 !important;
        }
        
        .ag-grid-container .ag-theme-alpine {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .ag-grid-container .ag-theme-alpine.no-scroll .ag-body-viewport {
          overflow-y: hidden !important;
        }
        
        .ag-grid-container .ag-theme-alpine.needs-scroll .ag-body-viewport {
          overflow-y: auto !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-row {
          border-bottom: 1px solid #e5e7eb !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-row:last-child {
          border-bottom: none !important;
        }
        
        /* Sidebar Columns & Filters Customization */
        .ag-grid-container .ag-theme-alpine .ag-side-bar {
          background-color: white !important;
          border-left: 1px solid #e5e7eb !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-side-buttons {
          background-color: white !important;
          top: 42px !important; /* Move below the blue header */
          border: none !important;
          padding: 0 !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-side-button {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          padding: 8px 4px !important;
          margin: 0 !important;
          font-size: 13px !important;
          color: #4f5863 !important;
          font-weight: normal !important;
          text-align: center !important;
          width: 100% !important;
          border-radius: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 4px !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-side-button:hover {
          background-color: #f9fafb !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-side-button.ag-selected {
          background-color: #f9fafb !important;
          color: #4f5863 !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-side-button .ag-icon {
          color: #4f5863 !important;
          font-size: 16px !important;
        }
        
        .ag-grid-container .ag-theme-alpine .ag-tool-panel-wrapper {
          background-color: white !important;
          border: none !important;
        }
      `}} />
    </div>
  );
};

export default AgGridTable;