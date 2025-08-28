import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Plus, Trash2, MessageSquare } from 'lucide-react';

export interface SAILFormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const SAILFormField: React.FC<SAILFormFieldProps> = ({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  options = [],
  rows = 3,
  className = '',
  required = false,
  disabled = false,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-xs text-gray-500 tracking-wide">
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            {type === 'textarea' ? (
              <Textarea
                {...field}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                className="bg-[#ffffff]"
              />
            ) : type === 'select' ? (
              <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                <SelectTrigger className="bg-[#ffffff]">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === 'radio' ? (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                disabled={disabled}
                className="flex flex-wrap gap-4"
              >
                {options.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                    <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : type === 'checkbox' ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                  id={name}
                />
                <Label htmlFor={name}>{placeholder}</Label>
              </div>
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className="bg-[#ffffff]"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export interface SAILTableColumn {
  key: string;
  label: string;
  type?: 'text' | 'select' | 'date' | 'textarea';
  options?: { value: string; label: string }[];
  width?: string;
  required?: boolean;
}

export interface SAILTableProps {
  title?: string;
  data: Record<string, unknown>[];
  columns: SAILTableColumn[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: unknown) => void;
  onDelete: (id: string) => void;
  addButtonText?: string;
  className?: string;
  enableComments?: boolean;
  commentField?: string;
  onCommentUpdate?: (id: string, comment: string) => void;
}

export const SAILTable: React.FC<SAILTableProps> = ({
  title,
  data,
  columns,
  onAdd,
  onUpdate,
  onDelete,
  addButtonText = 'Add Item',
  className = '',
  enableComments = false,
  commentField = 'comment',
  onCommentUpdate,
}) => {
  const [editingComment, setEditingComment] = React.useState<string | null>(null);

  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h4 className="font-semibold text-gray-800">{title}</h4>}

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 bg-white text-sm">
              <thead className="bg-[#52baf3]">
                <tr>
                  {columns.map(column => (
                    <th
                      key={column.key}
                      className="px-3 py-3 text-left text-xs font-medium text-white tracking-wider"
                      style={{ width: column.width }}
                    >
                      {column.label} {column.required && <span className="text-yellow-300">*</span>}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-center text-xs font-medium text-white tracking-wider w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((row, index) => (
                  <React.Fragment key={row.id || index}>
                    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {columns.map(column => (
                        <td key={column.key} className="px-3 py-3">
                          {column.type === 'select' ? (
                            <Select
                              value={row[column.key] || ''}
                              onValueChange={value => onUpdate(row.id, column.key, value)}
                            >
                              <SelectTrigger className="w-full text-xs">
                                <SelectValue placeholder={`Select ${column.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {column.options?.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : column.type === 'textarea' ? (
                            <Textarea
                              value={row[column.key] || ''}
                              onChange={e => onUpdate(row.id, column.key, e.target.value)}
                              rows={2}
                              className="text-xs"
                            />
                          ) : (
                            <Input
                              type={column.type || 'text'}
                              value={row[column.key] || ''}
                              onChange={e => onUpdate(row.id, column.key, e.target.value)}
                              className="text-xs"
                            />
                          )}
                        </td>
                      ))}
                      <td className="px-3 py-3">
                        <div className="flex justify-center gap-2">
                          {enableComments && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                setEditingComment(editingComment === row.id ? null : row.id)
                              }
                            >
                              <MessageSquare className="h-[18px] w-[18px] text-blue-500" />
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onDelete(row.id)}
                          >
                            <Trash2 className="h-[18px] w-[18px] text-gray-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {enableComments && editingComment === row.id && (
                      <tr>
                        <td colSpan={columns.length + 1} className="px-3 py-3 bg-gray-50">
                          <Textarea
                            value={row[commentField] || ''}
                            onChange={e => {
                              onUpdate(row.id, commentField, e.target.value);
                              onCommentUpdate?.(row.id, e.target.value);
                            }}
                            onBlur={() => setEditingComment(null)}
                            placeholder="Add your comment here..."
                            rows={2}
                            className="text-blue-600 italic border-blue-200"
                            autoFocus
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onAdd}
        className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 py-6"
      >
        <Plus className="h-4 w-4 mr-2" />
        {addButtonText}
      </Button>
    </div>
  );
};

export { SAILFormField as default };
