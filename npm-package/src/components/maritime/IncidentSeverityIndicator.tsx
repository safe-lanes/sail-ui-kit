import React from 'react';
import { Badge } from '../ui/badge';
import { AlertTriangle, AlertCircle, Info, Zap } from 'lucide-react';

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'near-miss';

interface IncidentSeverityIndicatorProps {
  severity: SeverityLevel;
  incidentType?: string;
  showIcon?: boolean;
  className?: string;
}

const severityConfig = {
  critical: {
    label: 'Critical',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: Zap,
    description: 'Immediate action required - serious injury/damage',
  },
  high: {
    label: 'High',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: AlertTriangle,
    description: 'High priority - significant risk or damage',
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: AlertCircle,
    description: 'Medium priority - moderate risk',
  },
  low: {
    label: 'Low',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Info,
    description: 'Low priority - minor risk or informational',
  },
  'near-miss': {
    label: 'Near Miss',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: Info,
    description: 'No injury/damage but potential for incident',
  },
};

export function IncidentSeverityIndicator({
  severity,
  incidentType,
  showIcon = true,
  className = '',
}: IncidentSeverityIndicatorProps) {
  const config = severityConfig[severity];
  const IconComponent = config.icon;

  return (
    <Badge
      variant="outline"
      className={`${config.color} ${className}`}
      title={`${config.description}${incidentType ? ` - ${incidentType}` : ''}`}
    >
      {showIcon && <IconComponent className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
}
