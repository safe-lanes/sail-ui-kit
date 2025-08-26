import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { ICellRendererParams } from 'ag-grid-enterprise';

// Rating Badge Cell Renderer
export const RatingBadgeCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const { value } = props;
  
  if (!value || value === "N/A") {
    return (
      <Badge className="rounded-md px-2.5 py-1 font-bold bg-gray-400 text-white min-w-[48px] text-center">
        N/A
      </Badge>
    );
  }

  const numValue = parseFloat(value);
  const formattedValue = numValue.toFixed(1);
  let bgColor = '';
  let textColor = '';

  if (numValue >= 4.0) {
    bgColor = 'bg-[#c3f2cb]';
    textColor = 'text-[#286e34]';
  } else if (numValue >= 3.0) {
    bgColor = 'bg-[#ffeaa7]';
    textColor = 'text-[#814c02]';
  } else if (numValue >= 2.0) {
    bgColor = 'bg-[#f9ecef]';
    textColor = 'text-[#811f1a]';
  } else {
    bgColor = 'bg-red-600';
    textColor = 'text-white';
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Badge className={`rounded-md px-2.5 py-1 font-bold ${bgColor} ${textColor} min-w-[48px] text-center`}>
        {formattedValue}
      </Badge>
    </div>
  );
};

// Actions Cell Renderer
export const ActionsCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const { data, context } = props;
  
  const handleView = () => {
    // Handle view action
    console.log('View crew member:', data);
  };

  const handleEdit = () => {
    if (context && context.onEdit) {
      context.onEdit(data);
    }
  };

  const handleDelete = () => {
    // Handle delete action
    console.log('Delete crew member:', data);
  };

  return (
    <div className="flex gap-2 justify-center items-center h-full">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleView}
      >
        <EyeIcon className="h-[18px] w-[18px] text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleEdit}
      >
        <EditIcon className="h-[18px] w-[18px] text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleDelete}
      >
        <Trash2Icon className="h-[18px] w-[18px] text-gray-500" />
      </Button>
    </div>
  );
};

// Name Cell Renderer (combines first, middle, last name)
export const NameCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const { data } = props;
  
  if (!data || !data.name) {
    return <span>-</span>;
  }

  const fullName = `${data.name.first} ${data.name.middle || ''} ${data.name.last || ''}`.trim();
  
  return (
    <span className="text-[#4f5863] text-[13px] font-normal">
      {fullName}
    </span>
  );
};