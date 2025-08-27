import React from 'react';
import { Badge } from '../ui/badge';

export type VesselStatus = 
  | 'active'
  | 'at-sea' 
  | 'in-port' 
  | 'anchored' 
  | 'dry-dock' 
  | 'maintenance' 
  | 'offline'
  | 'emergency';

interface Vessel {
  name: string;
  vesselType: string;
  status: { status: VesselStatus; location?: string };
}

interface VesselStatusIndicatorProps {
  vessel: Vessel;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
  // Legacy props for backward compatibility
  status?: VesselStatus;
  showIcon?: boolean;
}

const statusConfig = {
  'active': {
    label: 'Active',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '✅'
  },
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
  vessel,
  size = 'md',
  showDetails = false,
  className = '',
  // Legacy props
  status,
  showIcon = true 
}: VesselStatusIndicatorProps) {
  // Handle both new and legacy prop formats
  const vesselStatus = vessel?.status?.status || status;
  const vesselName = vessel?.name;
  const vesselType = vessel?.vesselType;
  const location = vessel?.status?.location;
  
  if (!vesselStatus) {
    return <div className="text-red-500">Invalid vessel status</div>;
  }
  
  const config = statusConfig[vesselStatus];
  
  if (!config) {
    return <div className="text-red-500">Unknown status: {vesselStatus}</div>;
  }
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5', 
    lg: 'text-base px-4 py-2'
  };
  
  if (!showDetails) {
    return (
      <Badge 
        variant="outline" 
        className={`${config.color} ${sizeClasses[size]} ${className}`}
      >
        {showIcon && <span className="mr-1">{config.icon}</span>}
        {config.label}
      </Badge>
    );
  }
  
  return (
    <div className={`space-y-2 p-3 border rounded-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          {vesselName && <h4 className="font-medium text-sm">{vesselName}</h4>}
          {vesselType && <p className="text-xs text-gray-500">{vesselType}</p>}
        </div>
        <Badge 
          variant="outline" 
          className={`${config.color} ${sizeClasses[size]}`}
        >
          <span className="mr-1">{config.icon}</span>
          {config.label}
        </Badge>
      </div>
      {location && (
        <p className="text-xs text-gray-600">📍 {location}</p>
      )}
    </div>
  );
}