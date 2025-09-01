import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';

export interface TableColumn {
  id: string;
  header: string;
  type: 'text' | 'select' | 'number' | 'readonly';
  placeholder?: string;
  options?: { value: string; label: string }[];
  width?: string;
}

export interface FormTableRow {
  id: string;
  [key: string]: unknown;
}

export interface FormTableProps {
  title?: string;
  columns: TableColumn[];
  data: FormTableRow[];
  onDataChange: (data: FormTableRow[]) => void;
  addButtonText?: string;
  showActions?: boolean;
  showComments?: boolean;
  emptyMessage?: string;
  className?: string;

  // Enhanced table props
  onRowAdd?: (row: FormTableRow) => void;
  onRowUpdate?: (rowId: string, field: string, value: unknown) => void;
  onRowDelete?: (rowId: string) => void;
  onRowReorder?: (fromIndex: number, toIndex: number) => void;

  // Validation and errors
  validationRules?: Record<string, (value: unknown) => string | null>;
  errors?: Record<string, Record<string, string>>;
  onValidationError?: (rowId: string, field: string, error: string) => void;

  // Bulk operations
  enableBulkActions?: boolean;
  onBulkDelete?: (rowIds: string[]) => void;
  onBulkUpdate?: (rowIds: string[], updates: Record<string, unknown>) => void;

  // Import/Export
  enableImport?: boolean;
  enableExport?: boolean;
  onImport?: (data: FormTableRow[]) => void;
  onExport?: () => FormTableRow[];

  // Table behavior
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  pagination?: {
    enabled: boolean;
    pageSize: number;
    showSizeSelector?: boolean;
  };

  // UI customization
  maxHeight?: string;
  stickyHeader?: boolean;
  showRowNumbers?: boolean;
  alternateRowColors?: boolean;

  // Comments enhancement
  onCommentAdd?: (rowId: string, comment: string) => void;
  onCommentUpdate?: (rowId: string, comment: string) => void;
  onCommentDelete?: (rowId: string) => void;
  commentThreads?: Record<string, { id: string; text: string; author: string; timestamp: Date }[]>;
}

export const FormTable: React.FC<FormTableProps> = ({
  title,
  columns,
  data,
  onDataChange,
  addButtonText = 'Add Row',
  showActions = true,
  showComments = true,
  emptyMessage = 'No items added yet.',
  className = '',
}) => {
  const [comments, setComments] = useState<Record<string, string>>({});
  const [editingComment, setEditingComment] = useState<string | null>(null);

  const addRow = () => {
    const newRow: FormTableRow = {
      id: Date.now().toString(),
      ...columns.reduce((acc, col) => ({ ...acc, [col.id]: '' }), {}),
    };
    onDataChange([...data, newRow]);
  };

  const updateRow = (id: string, field: string, value: string) => {
    const updatedData = data.map(row => (row.id === id ? { ...row, [field]: value } : row));
    onDataChange(updatedData);
  };

  const deleteRow = (id: string) => {
    const updatedData = data.filter(row => row.id !== id);
    onDataChange(updatedData);
    // Also remove any associated comment
    if (comments[id] !== undefined) {
      const newComments = { ...comments };
      delete newComments[id];
      setComments(newComments);
    }
  };

  const toggleComment = (id: string) => {
    if (comments[id] !== undefined) {
      const newComments = { ...comments };
      delete newComments[id];
      setComments(newComments);
    } else {
      setComments(prev => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const updateComment = (id: string, value: string) => {
    setComments(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const deleteComment = (id: string) => {
    const newComments = { ...comments };
    delete newComments[id];
    setComments(newComments);
    setEditingComment(null);
  };

  const renderCell = (row: FormTableRow, column: TableColumn, index: number) => {
    const value = row[column.id] || '';

    switch (column.type) {
      case 'readonly':
        return (
          <span className="text-[#4f5863] text-[13px] font-normal">
            {String(value) || `${index + 1}.`}
          </span>
        );

      case 'select':
        return (
          <Select
            value={String(value)}
            onValueChange={newValue => updateRow(row.id, column.id, newValue)}
          >
            <SelectTrigger className="border-0 bg-transparent p-0 focus-visible:ring-0 text-[#4f5863] text-[13px] font-normal h-6">
              <SelectValue placeholder={column.placeholder || 'Select...'} />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'number':
        return (
          <Input
            type="number"
            value={String(value)}
            onChange={e => updateRow(row.id, column.id, e.target.value)}
            placeholder={column.placeholder}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 text-[#4f5863] text-[13px] font-normal h-6"
          />
        );

      default: // 'text'
        return (
          <Input
            value={String(value)}
            onChange={e => updateRow(row.id, column.id, e.target.value)}
            placeholder={column.placeholder}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 text-[#4f5863] text-[13px] font-normal h-6"
          />
        );
    }
  };

  return (
    <div className={className}>
      {/* Header */}
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-[16px] text-[#16569e]">{title}</h3>
          <Button
            type="button"
            onClick={addRow}
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            {addButtonText}
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                {columns.map(column => (
                  <th
                    key={column.id}
                    className="text-gray-600 text-xs font-normal py-2 px-4 text-left"
                    style={column.width ? { width: column.width } : {}}
                  >
                    {column.header}
                  </th>
                ))}
                {showActions && (
                  <th className="text-gray-600 text-xs font-normal py-2 px-4 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row, index) => (
                <React.Fragment key={row.id}>
                  <tr className="border-b border-gray-200 bg-white hover:bg-gray-50">
                    {columns.map(column => (
                      <td key={column.id} className="py-2 px-4">
                        {renderCell(row, column, index)}
                      </td>
                    ))}
                    {showActions && (
                      <td className="py-2 px-4">
                        <div className="flex gap-2 justify-center">
                          {showComments && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleComment(row.id)}
                            >
                              <MessageSquare className="h-[18px] w-[18px] text-gray-500" />
                            </Button>
                          )}

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteRow(row.id)}
                          >
                            <Trash2 className="h-[18px] w-[18px] text-gray-500" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>

                  {/* Comment Row */}
                  {showComments && comments[row.id] !== undefined && (
                    <tr>
                      <td></td>
                      <td colSpan={columns.length + (showActions ? 0 : -1)} className="p-3">
                        {editingComment === row.id ? (
                          <Textarea
                            value={comments[row.id]}
                            onChange={e => updateComment(row.id, e.target.value)}
                            onBlur={() => setEditingComment(null)}
                            placeholder="Comment: Add your observations here..."
                            className="text-blue-600 italic border-blue-200"
                            rows={2}
                            autoFocus
                          />
                        ) : (
                          <div className="flex justify-between items-start">
                            <div
                              className="flex-1 text-blue-600 italic cursor-pointer p-2 rounded hover:bg-gray-50"
                              onClick={() => setEditingComment(row.id)}
                            >
                              {comments[row.id] || 'Click to add comment...'}
                            </div>
                            <div className="ml-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteComment(row.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {/* Empty State */}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + (showActions ? 1 : 0)}
                    className="p-8 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormTable;
