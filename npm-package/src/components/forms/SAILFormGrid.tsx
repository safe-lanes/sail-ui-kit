import React from 'react';

export interface SAILFormGridProps {
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: 2 | 3 | 4 | 6 | 8;
  className?: string;
  children: React.ReactNode;
}

export const SAILFormGrid: React.FC<SAILFormGridProps> = ({
  columns = 3,
  gap = 4,
  className = '',
  children,
}) => {
  const getGridCols = (cols: number) => {
    switch (cols) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      case 6: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getGapClass = (gapSize: number) => {
    switch (gapSize) {
      case 2: return 'gap-2';
      case 3: return 'gap-3';
      case 4: return 'gap-4';
      case 6: return 'gap-6';
      case 8: return 'gap-8';
      default: return 'gap-4';
    }
  };

  return (
    <div className={`grid ${getGridCols(columns)} ${getGapClass(gap)} ${className}`}>
      {children}
    </div>
  );
};

export interface SAILFormSectionProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export const SAILFormSection: React.FC<SAILFormSectionProps> = ({
  title,
  description,
  className = '',
  children,
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="border-b border-gray-200 pb-3">
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export interface SAILFormActionsProps {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right';
  className?: string;
}

export const SAILFormActions: React.FC<SAILFormActionsProps> = ({
  children,
  position = 'right',
  className = '',
}) => {
  const getJustification = (pos: string) => {
    switch (pos) {
      case 'left': return 'justify-start';
      case 'center': return 'justify-center';
      case 'right': return 'justify-end';
      default: return 'justify-end';
    }
  };

  return (
    <div className={`flex ${getJustification(position)} gap-4 mt-6 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default SAILFormGrid;