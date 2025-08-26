import React from 'react';
import { GridApi } from 'ag-grid-enterprise';
import { Button } from '@/components/ui/button';
import { FileDown, FileSpreadsheet, FileText } from 'lucide-react';

interface AgGridTableActionsProps {
  gridApi: GridApi | null;
  filename?: string;
  showExcelExport?: boolean;
  showCsvExport?: boolean;
  showPdfExport?: boolean;
  customActions?: React.ReactNode;
  className?: string;
}

const AgGridTableActions: React.FC<AgGridTableActionsProps> = ({
  gridApi,
  filename = 'export_data',
  showExcelExport = true,
  showCsvExport = true,
  showPdfExport = false,
  customActions,
  className = ''
}) => {
  const handleExcelExport = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        fileName: `${filename}.xlsx`
      });
    }
  };

  const handleCsvExport = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `${filename}.csv`
      });
    }
  };

  const handlePdfExport = () => {
    // PDF export requires additional setup
    console.log('PDF export not implemented yet');
  };

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {showExcelExport && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleExcelExport}
          disabled={!gridApi}
          className="flex items-center gap-1"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export Excel
        </Button>
      )}
      
      {showCsvExport && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleCsvExport}
          disabled={!gridApi}
          className="flex items-center gap-1"
        >
          <FileDown className="w-4 h-4" />
          Export CSV
        </Button>
      )}
      
      {showPdfExport && (
        <Button
          variant="outline"
          size="sm"
          onClick={handlePdfExport}
          disabled={!gridApi}
          className="flex items-center gap-1"
        >
          <FileText className="w-4 h-4" />
          Export PDF
        </Button>
      )}
      
      {customActions}
    </div>
  );
};

export default AgGridTableActions;