import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export type StatusType = 'active' | 'inactive' | 'maintenance' | 'emergency' | 'warning' | 'good';

export interface StatusItem {
  id: string;
  name: string;
  status: StatusType;
  details?: Record<string, any>;
}

export interface StatusCardProps {
  title: string;
  items: StatusItem[];
  icon?: React.ReactNode | string;
  maxDisplayed?: number;
  onItemClick?: (item: StatusItem) => void;
  onViewAll?: () => void;
  className?: string;
  showCounts?: boolean;
}

const statusConfig = {
  active: { color: 'bg-green-100 text-green-800 border-green-200', icon: '●', label: 'Active' },
  inactive: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '●', label: 'Inactive' },
  maintenance: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '⚠',
    label: 'Maintenance',
  },
  emergency: { color: 'bg-red-100 text-red-800 border-red-200', icon: '🚨', label: 'Emergency' },
  warning: {
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '⚠',
    label: 'Warning',
  },
  good: { color: 'bg-green-100 text-green-800 border-green-200', icon: '✓', label: 'Good' },
};

export function StatusCard({
  title,
  items,
  icon,
  maxDisplayed = 5,
  onItemClick,
  onViewAll,
  className = '',
  showCounts = true,
}: StatusCardProps) {
  const displayedItems = items.slice(0, maxDisplayed);
  const statusCounts = items.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<StatusType, number>
  );

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {icon && <div className="text-lg">{typeof icon === 'string' ? icon : icon}</div>}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Status Counts */}
        {showCounts && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusCounts).map(([status, count]: [string, number]) => (
              <Badge
                key={status}
                variant="outline"
                className={statusConfig[status as StatusType]?.color}
              >
                {statusConfig[status as StatusType]?.icon} {count}{' '}
                {statusConfig[status as StatusType]?.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Status Items */}
        <div className="space-y-2">
          {displayedItems.map(item => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-2 rounded-lg border ${onItemClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              onClick={() => onItemClick?.(item)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm">{statusConfig[item.status]?.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  {item.details &&
                    Object.entries(item.details)
                      .slice(0, 2)
                      .map(([key, value]: [string, any]) => (
                        <p key={key} className="text-xs text-gray-500">
                          {key}: {String(value)}
                        </p>
                      ))}
                </div>
              </div>
              <Badge variant="outline" className={statusConfig[item.status]?.color}>
                {statusConfig[item.status]?.label}
              </Badge>
            </div>
          ))}
        </div>

        {/* View All Link */}
        {items.length > maxDisplayed && onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            View all {items.length} items →
          </button>
        )}
      </CardContent>
    </Card>
  );
}
