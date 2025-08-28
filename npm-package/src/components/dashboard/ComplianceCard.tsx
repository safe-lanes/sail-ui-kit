import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export interface TMSAElementStatus {
  id: string;
  code: string;
  name: string;
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-assessed';
  score?: number;
  lastAssessment?: string;
}

export interface ComplianceCardProps {
  title?: string;
  elements: TMSAElementStatus[];
  overallScore?: number;
  showElementDetails?: boolean;
  onElementClick?: (element: TMSAElementStatus) => void;
  className?: string;
}

const statusConfig = {
  compliant: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '✓',
    label: 'Compliant',
  },
  partial: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '⚠',
    label: 'Partial',
  },
  'non-compliant': {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '✗',
    label: 'Non-Compliant',
  },
  'not-assessed': {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '?',
    label: 'Not Assessed',
  },
};

export function ComplianceCard({
  title = 'TMSA Compliance',
  elements,
  overallScore,
  showElementDetails = false,
  onElementClick,
  className = '',
}: ComplianceCardProps) {
  const compliantCount = elements.filter(e => e.status === 'compliant').length;
  const partialCount = elements.filter(e => e.status === 'partial').length;
  const nonCompliantCount = elements.filter(e => e.status === 'non-compliant').length;
  const notAssessedCount = elements.filter(e => e.status === 'not-assessed').length;

  const calculatedScore =
    overallScore ||
    (elements.length > 0 ? Math.round((compliantCount / elements.length) * 100) : 0);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-lg">📋</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Score */}
          <div>
            <div className={`text-2xl font-bold ${getScoreColor(calculatedScore)}`}>
              {calculatedScore}%
            </div>
            <p className="text-xs text-gray-500">
              {compliantCount} of {elements.length} elements compliant
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <Progress value={calculatedScore} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Compliance Progress</span>
              <span>{calculatedScore}%</span>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="flex flex-wrap gap-2">
            {compliantCount > 0 && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                ✓ {compliantCount} Compliant
              </Badge>
            )}
            {partialCount > 0 && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                ⚠ {partialCount} Partial
              </Badge>
            )}
            {nonCompliantCount > 0 && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                ✗ {nonCompliantCount} Non-Compliant
              </Badge>
            )}
            {notAssessedCount > 0 && (
              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                ? {notAssessedCount} Not Assessed
              </Badge>
            )}
          </div>

          {/* Element Details */}
          {showElementDetails && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Element Status
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {elements.map(element => (
                  <div
                    key={element.id}
                    className={`flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 ${
                      onElementClick ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => onElementClick?.(element)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{statusConfig[element.status]?.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{element.code}</p>
                        <p className="text-xs text-gray-500 truncate max-w-32">{element.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={statusConfig[element.status]?.color}>
                        {statusConfig[element.status]?.label}
                      </Badge>
                      {element.score && (
                        <p className="text-xs text-gray-500 mt-1">{element.score}%</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
