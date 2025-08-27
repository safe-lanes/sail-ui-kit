import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode | string;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  progress?: number;
  className?: string;
  onClick?: () => void;
}

const statusColors = {
  success: 'text-green-600 bg-green-50 border-green-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
  error: 'text-red-600 bg-red-50 border-red-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
  neutral: 'text-gray-600 bg-gray-50 border-gray-200'
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  status = 'neutral',
  progress,
  className = '',
  onClick
}: MetricCardProps) {
  const cardClasses = `${statusColors[status]} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`;

  return (
    <Card className={cardClasses} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-lg">
            {typeof icon === 'string' ? icon : icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold text-gray-900">
            {value}
          </div>
          {trend && (
            <Badge variant={trend.direction === 'up' ? 'default' : trend.direction === 'down' ? 'destructive' : 'secondary'}>
              {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'} {trend.value}%
            </Badge>
          )}
        </div>
        
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
        
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {progress}% complete
            </p>
          </div>
        )}
        
        {trend?.label && (
          <p className="text-xs text-gray-500 mt-1">
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}