import React from 'react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export type ComplianceStatus = 'compliant' | 'partial' | 'non-compliant' | 'not-assessed';

export interface TMSAElement {
  id: string;
  name: string;
  code: string;
  status: ComplianceStatus;
  score?: number;
  lastAssessment?: string;
  nextAssessment?: string;
}

interface TMSAComplianceIndicatorProps {
  element: TMSAElement;
  showProgress?: boolean;
  compact?: boolean;
  className?: string;
}

const statusConfig = {
  'compliant': {
    label: 'Compliant',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '✓'
  },
  'partial': {
    label: 'Partial Compliance',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '⚠'
  },
  'non-compliant': {
    label: 'Non-Compliant',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '✗'
  },
  'not-assessed': {
    label: 'Not Assessed',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '?'
  }
};

export function TMSAComplianceIndicator({ 
  element, 
  showProgress = true, 
  compact = false,
  className = '' 
}: TMSAComplianceIndicatorProps) {
  const config = statusConfig[element.status];
  
  if (compact) {
    return (
      <Badge 
        variant="outline" 
        className={`${config.color} ${className}`}
      >
        <span className="mr-1">{config.icon}</span>
        {element.code}
      </Badge>
    );
  }
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">{element.name}</h4>
          <p className="text-xs text-gray-500">{element.code}</p>
        </div>
        <Badge 
          variant="outline" 
          className={config.color}
        >
          <span className="mr-1">{config.icon}</span>
          {config.label}
        </Badge>
      </div>
      
      {showProgress && element.score !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Compliance Score</span>
            <span>{element.score}%</span>
          </div>
          <Progress value={element.score} className="h-2" />
        </div>
      )}
      
      {element.lastAssessment && (
        <p className="text-xs text-gray-500">
          Last assessed: {new Date(element.lastAssessment).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}