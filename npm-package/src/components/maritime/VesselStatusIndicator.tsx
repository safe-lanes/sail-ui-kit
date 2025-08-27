import React from 'react';
import { Badge } from '../ui/badge';

export type VesselStatus = 
  | 'at-sea' 
  | 'in-port' 
  | 'anchored' 
  | 'dry-dock' 
  | 'maintenance' 
  | 'offline'
  | 'emergency';

interface VesselStatusIndicatorProps {
  status: VesselStatus;
  className?: string;
  showIcon?: boolean;
}

const statusConfig = {
  'at-sea': {
    label: 'At Sea',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: '🌊'
  },
  'in-port': {
    label: 'In Port',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '⚓'
  },
  'anchored': {
    label: 'Anchored',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '⚓'
  },
  'dry-dock': {
    label: 'Dry Dock',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '🔧'
  },
  'maintenance': {
    label: 'Maintenance',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: '🔧'
  },
  'offline': {
    label: 'Offline',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '📴'
  },
  'emergency': {
    label: 'Emergency',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '🚨'
  }
};

export function VesselStatusIndicator({ 
  status, 
  className = '', 
  showIcon = true 
}: VesselStatusIndicatorProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.color} ${className}`}
    >
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </Badge>
  );
}