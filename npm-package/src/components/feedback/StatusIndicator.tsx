import React from 'react';
import { Badge } from '../ui/badge';

export type StatusLevel = 'operational' | 'degraded' | 'maintenance' | 'offline' | 'emergency';

export interface StatusIndicatorProps {
  status: StatusLevel;
  label?: string;
  showDot?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const statusConfig = {
  operational: {
    color: 'bg-green-100 text-green-800 border-green-200',
    dot: 'bg-green-500',
    label: 'Operational',
    icon: '●'
  },
  degraded: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dot: 'bg-yellow-500',
    label: 'Degraded',
    icon: '⚠'
  },
  maintenance: {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    dot: 'bg-blue-500',
    label: 'Maintenance',
    icon: '🔧'
  },
  offline: {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    dot: 'bg-gray-500',
    label: 'Offline',
    icon: '○'
  },
  emergency: {
    color: 'bg-red-100 text-red-800 border-red-200',
    dot: 'bg-red-500',
    label: 'Emergency',
    icon: '🚨'
  }
};

const sizeConfig = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5'
};

const dotSizeConfig = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3'
};

export function StatusIndicator({
  status,
  label,
  showDot = false,
  size = 'md',
  className = '',
  onClick
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <Badge
      variant="outline"
      className={`${config.color} ${sizeConfig[size]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-1.5">
        {showDot ? (
          <div className={`${config.dot} ${dotSizeConfig[size]} rounded-full flex-shrink-0`} />
        ) : (
          <span className="flex-shrink-0">{config.icon}</span>
        )}
        <span>{displayLabel}</span>
      </div>
    </Badge>
  );
}

// Animated Status Indicator for live updates
export interface AnimatedStatusIndicatorProps extends StatusIndicatorProps {
  isLive?: boolean;
  pulseAnimation?: boolean;
}

export function AnimatedStatusIndicator({
  isLive = false,
  pulseAnimation = false,
  ...props
}: AnimatedStatusIndicatorProps) {
  const config = statusConfig[props.status];
  
  return (
    <div className="relative">
      <StatusIndicator {...props} />
      {isLive && (
        <div className="absolute -top-1 -right-1">
          <div className={`h-3 w-3 ${config.dot} rounded-full ${pulseAnimation ? 'animate-pulse' : ''}`}>
            <div className={`h-3 w-3 ${config.dot} rounded-full animate-ping absolute`} />
          </div>
        </div>
      )}
    </div>
  );
}