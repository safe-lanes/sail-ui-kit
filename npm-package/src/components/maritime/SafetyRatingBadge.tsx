import React from 'react';
import { Badge } from '../ui/badge';

export type SafetyRating = 'A' | 'B' | 'C' | 'D' | 'E';

export interface SafetyMetrics {
  rating: SafetyRating;
  score: number;
  incidentCount: number;
  lastIncident?: string;
  complianceScore: number;
}

interface SafetyRatingBadgeProps {
  rating: SafetyRating;
  metrics?: SafetyMetrics;
  className?: string;
  showTooltip?: boolean;
}

const ratingConfig = {
  'A': {
    label: 'A - Excellent',
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Exceptional safety performance'
  },
  'B': {
    label: 'B - Good',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Good safety performance'
  },
  'C': {
    label: 'C - Average',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Average safety performance'
  },
  'D': {
    label: 'D - Below Average',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Below average safety performance'
  },
  'E': {
    label: 'E - Poor',
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Poor safety performance - requires attention'
  }
};

export function SafetyRatingBadge({ 
  rating, 
  metrics, 
  className = '', 
  showTooltip = true 
}: SafetyRatingBadgeProps) {
  const config = ratingConfig[rating];
  
  return (
    <div className="relative inline-block">
      <Badge 
        variant="outline" 
        className={`${config.color} font-semibold ${className}`}
        title={showTooltip ? config.description : undefined}
      >
        {config.label}
      </Badge>
      
      {metrics && showTooltip && (
        <div className="absolute z-10 invisible group-hover:visible bg-black text-white text-xs rounded p-2 -top-8 left-0 whitespace-nowrap">
          <div>Score: {metrics.score}/100</div>
          <div>Incidents: {metrics.incidentCount}</div>
          <div>Compliance: {metrics.complianceScore}%</div>
        </div>
      )}
    </div>
  );
}