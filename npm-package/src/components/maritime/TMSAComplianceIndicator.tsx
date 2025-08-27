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
  // New simplified props format (from README)
  element?: string;
  status?: ComplianceStatus;
  score?: number;
  // Original complex props format for backward compatibility
  elementData?: TMSAElement;
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

const TMSA_ELEMENT_NAMES: Record<string, string> = {
  'EL1': 'Management & Leadership',
  'EL2': 'Shore HR Management', 
  'EL3': 'Crewing Management',
  'EL4': 'Technical Management',
  'EL5': 'Navigation',
  'EL6': 'Cargo Operations',
  'EL6A': 'Mooring Operations',
  'EL7': 'Management of Change',
  'EL8': 'Incident Investigation',
  'EL9': 'Safety',
  'EL10': 'Environment & Energy Management',
  'EL11': 'Emergency Management',
  'EL12': 'Audits & Inspections',
  'EL13': 'Security & Cyber Security'
};

export function TMSAComplianceIndicator({ 
  // New props format
  element: elementCode,
  status: elementStatus,
  score: elementScore,
  // Legacy props format
  elementData, 
  showProgress = true, 
  compact = false,
  className = '' 
}: TMSAComplianceIndicatorProps) {
  // Handle both new and legacy prop formats
  const element = elementData || {
    id: elementCode || 'Unknown',
    name: elementCode ? TMSA_ELEMENT_NAMES[elementCode] || elementCode : 'Unknown Element',
    code: elementCode || 'Unknown',
    status: elementStatus || 'not-assessed',
    score: elementScore
  };
  
  const config = statusConfig[element.status];
  
  if (!config) {
    return <div className="text-red-500">Invalid status: {element.status}</div>;
  }
  
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
    <div className={`space-y-2 p-3 border rounded-lg ${className}`}>
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
      
      {elementData?.lastAssessment && (
        <p className="text-xs text-gray-500">
          Last assessed: {new Date(elementData.lastAssessment).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}