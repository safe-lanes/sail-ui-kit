import React from 'react';
import { Badge } from '../ui/badge';

export type CompetencyLevel =
  | 'expert'
  | 'proficient'
  | 'competent'
  | 'developing'
  | 'novice'
  | 'not-assessed';

interface CrewCompetencyBadgeProps {
  level: CompetencyLevel;
  skill?: string;
  assessment?: {
    score: number;
    assessor: string;
    date: string;
  };
  className?: string;
}

const competencyConfig = {
  expert: {
    label: 'Expert',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Exceptional skill level with ability to mentor others',
  },
  proficient: {
    label: 'Proficient',
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'High skill level with consistent performance',
  },
  competent: {
    label: 'Competent',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Adequate skill level meeting job requirements',
  },
  developing: {
    label: 'Developing',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Growing skill level requiring some supervision',
  },
  novice: {
    label: 'Novice',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Basic skill level requiring close supervision',
  },
  'not-assessed': {
    label: 'Not Assessed',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    description: 'Competency not yet evaluated',
  },
};

export function CrewCompetencyBadge({
  level,
  skill,
  assessment,
  className = '',
}: CrewCompetencyBadgeProps) {
  const config = competencyConfig[level];

  return (
    <div className="group relative inline-block">
      <Badge
        variant="outline"
        className={`${config.color} ${className}`}
        title={config.description}
      >
        {config.label}
        {skill && <span className="ml-1 text-xs">({skill})</span>}
      </Badge>

      {assessment && (
        <div className="absolute z-10 invisible group-hover:visible bg-black text-white text-xs rounded p-2 -top-16 left-0 whitespace-nowrap">
          <div>Score: {assessment.score}/100</div>
          <div>Assessor: {assessment.assessor}</div>
          <div>Date: {new Date(assessment.date).toLocaleDateString()}</div>
        </div>
      )}
    </div>
  );
}
