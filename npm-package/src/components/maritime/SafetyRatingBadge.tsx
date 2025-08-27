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
  rating: SafetyRating | number;
  type?: 'vessel' | 'crew' | 'company';
  showDetails?: boolean;
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

// Convert numeric rating (1-5) to letter grade (A-E)
function convertRating(rating: SafetyRating | number): SafetyRating {
  if (typeof rating === 'string') return rating;
  
  // Convert 1-5 scale to A-E (5=A, 4=B, 3=C, 2=D, 1=E)
  const ratingMap: Record<number, SafetyRating> = {
    5: 'A',
    4: 'B', 
    3: 'C',
    2: 'D',
    1: 'E'
  };
  
  return ratingMap[rating] || 'E';
}

export function SafetyRatingBadge({ 
  rating, 
  type = 'vessel',
  showDetails = false,
  metrics, 
  className = '', 
  showTooltip = true 
}: SafetyRatingBadgeProps) {
  const letterRating = convertRating(rating);
  const config = ratingConfig[letterRating];
  
  if (!config) {
    return <div className="text-red-500">Invalid rating: {rating}</div>;
  }
  
  if (!showDetails) {
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
  
  return (
    <div className={`space-y-2 p-3 border rounded-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">Safety Rating</h4>
          <p className="text-xs text-gray-500 capitalize">{type}</p>
        </div>
        <Badge 
          variant="outline" 
          className={`${config.color} font-semibold`}
        >
          {config.label}
        </Badge>
      </div>
      <p className="text-xs text-gray-600">{config.description}</p>
      
      {metrics && (
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Score:</span>
            <span>{metrics.score}/100</span>
          </div>
          <div className="flex justify-between">
            <span>Incidents:</span>
            <span>{metrics.incidentCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Compliance:</span>
            <span>{metrics.complianceScore}%</span>
          </div>
        </div>
      )}
    </div>
  );
}