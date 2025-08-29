# SafetyRatingBadge Component Guide

## Overview
SafetyRatingBadge displays safety performance ratings for vessels, crew members, or operations in maritime applications. It provides visual safety indicators with color coding, scores, and detailed safety metrics optimized for TMSA compliance and safety management systems.

## Component Interface

```typescript
interface SafetyRatingBadgeProps {
  rating: SafetyRating;
  score?: number;
  maxScore?: number;
  showScore?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'detailed' | 'compact';
  metrics?: SafetyMetrics;
  className?: string;
  onClick?: () => void;
}

type SafetyRating = 'excellent' | 'good' | 'satisfactory' | 'needs-improvement' | 'poor' | 'critical';

interface SafetyMetrics {
  incidentRate: number;
  nearMissCount: number;
  daysWithoutIncident: number;
  complianceScore: number;
  lastInspectionDate: string;
  nextInspectionDue: string;
}
```

## Basic Usage

```jsx
import { SafetyRatingBadge } from 'scomp-ui';

function SafetyOverview() {
  return (
    <div className="space-y-4">
      {/* Basic safety ratings */}
      <div className="flex gap-4">
        <SafetyRatingBadge 
          rating="excellent" 
          score={95}
          maxScore={100}
          showScore={true}
          showLabel={true}
        />
        
        <SafetyRatingBadge 
          rating="good" 
          score={82}
          showScore={true}
          showLabel={true}
        />
        
        <SafetyRatingBadge 
          rating="needs-improvement" 
          score={65}
          showScore={true}
          showLabel={true}
        />
        
        <SafetyRatingBadge 
          rating="critical" 
          score={25}
          showScore={true}
          showLabel={true}
        />
      </div>
    </div>
  );
}
```

## Safety Rating Types & Colors

```jsx
function SafetyRatingExamples() {
  const ratings = [
    { 
      rating: 'excellent', 
      score: 95, 
      description: 'Outstanding safety performance, exceeds all standards',
      color: 'Green'
    },
    { 
      rating: 'good', 
      score: 82, 
      description: 'Good safety performance, meets all requirements',
      color: 'Light Green'
    },
    { 
      rating: 'satisfactory', 
      score: 75, 
      description: 'Acceptable safety performance, minor improvements needed',
      color: 'Yellow'
    },
    { 
      rating: 'needs-improvement', 
      score: 65, 
      description: 'Below standard performance, action plan required',
      color: 'Orange'
    },
    { 
      rating: 'poor', 
      score: 45, 
      description: 'Poor safety performance, immediate attention needed',
      color: 'Red'
    },
    { 
      rating: 'critical', 
      score: 25, 
      description: 'Critical safety issues, operations may be suspended',
      color: 'Dark Red'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Safety Rating Scale</h3>
      {ratings.map(({ rating, score, description, color }) => (
        <div key={rating} className="flex items-center gap-4 p-3 border rounded">
          <SafetyRatingBadge 
            rating={rating}
            score={score}
            showScore={true}
            showLabel={true}
            size="md"
          />
          <div className="flex-1">
            <div className="font-medium capitalize">{rating.replace('-', ' ')}</div>
            <div className="text-sm text-gray-600">{description}</div>
            <div className="text-xs text-gray-500">Score Range: {rating === 'excellent' ? '90-100' : rating === 'good' ? '80-89' : rating === 'satisfactory' ? '70-79' : rating === 'needs-improvement' ? '60-69' : rating === 'poor' ? '40-59' : '0-39'}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Detailed Safety Metrics

```jsx
function DetailedSafetyDisplay() {
  const vesselSafetyData = {
    rating: 'good',
    score: 85,
    metrics: {
      incidentRate: 2.1,
      nearMissCount: 5,
      daysWithoutIncident: 127,
      complianceScore: 88,
      lastInspectionDate: '2024-01-15',
      nextInspectionDue: '2024-07-15'
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">MV Atlantic Star - Safety Performance</h3>
        <SafetyRatingBadge 
          rating={vesselSafetyData.rating}
          score={vesselSafetyData.score}
          showScore={true}
          showLabel={true}
          variant="detailed"
          size="lg"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Incident Rate</div>
          <div className="font-medium">{vesselSafetyData.metrics.incidentRate} per 1000 hours</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Near Miss Reports</div>
          <div className="font-medium">{vesselSafetyData.metrics.nearMissCount} this quarter</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Days Without Incident</div>
          <div className="font-medium">{vesselSafetyData.metrics.daysWithoutIncident} days</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Compliance Score</div>
          <div className="font-medium">{vesselSafetyData.metrics.complianceScore}%</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Last Inspection</div>
          <div className="font-medium">{vesselSafetyData.metrics.lastInspectionDate}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Next Inspection</div>
          <div className="font-medium">{vesselSafetyData.metrics.nextInspectionDue}</div>
        </div>
      </div>
    </div>
  );
}
```

## Fleet Safety Dashboard

```jsx
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

function FleetSafetyDashboard() {
  const fleetSafety = [
    {
      vessel: 'MV Atlantic Star',
      rating: 'excellent',
      score: 94,
      incidents: 0,
      daysWithoutIncident: 180,
      lastInspection: '2024-01-15'
    },
    {
      vessel: 'MV Pacific Dawn',
      rating: 'good',
      score: 86,
      incidents: 1,
      daysWithoutIncident: 45,
      lastInspection: '2024-02-10'
    },
    {
      vessel: 'MV Nordic Explorer',
      rating: 'satisfactory',
      score: 73,
      incidents: 2,
      daysWithoutIncident: 22,
      lastInspection: '2024-02-28'
    },
    {
      vessel: 'MV Southern Cross',
      rating: 'needs-improvement',
      score: 62,
      incidents: 4,
      daysWithoutIncident: 8,
      lastInspection: '2024-03-01'
    },
    {
      vessel: 'MV Arctic Wind',
      rating: 'poor',
      score: 41,
      incidents: 7,
      daysWithoutIncident: 3,
      lastInspection: '2024-03-05'
    }
  ];

  const overallFleetScore = Math.round(
    fleetSafety.reduce((sum, vessel) => sum + vessel.score, 0) / fleetSafety.length
  );

  return (
    <div className="space-y-6">
      {/* Fleet Overview */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Fleet Safety Overview</h2>
          <SafetyRatingBadge 
            rating={overallFleetScore >= 90 ? 'excellent' : overallFleetScore >= 80 ? 'good' : overallFleetScore >= 70 ? 'satisfactory' : overallFleetScore >= 60 ? 'needs-improvement' : 'poor'}
            score={overallFleetScore}
            showScore={true}
            showLabel={true}
            size="lg"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <div className="font-medium">
                {fleetSafety.filter(v => ['excellent', 'good'].includes(v.rating)).length}
              </div>
              <div className="text-sm text-gray-600">High Performers</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div>
              <div className="font-medium">
                {fleetSafety.filter(v => v.rating === 'satisfactory').length}
              </div>
              <div className="text-sm text-gray-600">Satisfactory</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-red-600" />
            <div>
              <div className="font-medium">
                {fleetSafety.filter(v => ['needs-improvement', 'poor'].includes(v.rating)).length}
              </div>
              <div className="text-sm text-gray-600">Need Attention</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <div>
              <div className="font-medium">
                {Math.round(fleetSafety.reduce((sum, v) => sum + v.daysWithoutIncident, 0) / fleetSafety.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Days Safe</div>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Vessel Safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fleetSafety.map((vessel) => (
          <div key={vessel.vessel} className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">{vessel.vessel}</h3>
              <SafetyRatingBadge 
                rating={vessel.rating}
                score={vessel.score}
                showScore={true}
                variant="compact"
                size="sm"
              />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Incidents this quarter:</span>
                <span className={vessel.incidents === 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {vessel.incidents}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Days without incident:</span>
                <span className="font-medium">{vessel.daysWithoutIncident}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Last inspection:</span>
                <span className="font-medium">{vessel.lastInspection}</span>
              </div>
            </div>

            {vessel.rating === 'needs-improvement' || vessel.rating === 'poor' && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-800 text-sm">Action plan required</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Crew Safety Ratings

```jsx
function CrewSafetyRatings() {
  const crewSafety = [
    { name: 'Captain James Wilson', rating: 'excellent', score: 96, position: 'Master' },
    { name: 'Chief Officer Sarah Chen', rating: 'good', score: 88, position: 'Chief Officer' },
    { name: 'Engineer Mike Rodriguez', rating: 'good', score: 84, position: 'Chief Engineer' },
    { name: 'Seaman Tom Anderson', rating: 'satisfactory', score: 76, position: 'Able Seaman' },
    { name: 'Officer Lisa Park', rating: 'needs-improvement', score: 68, position: '2nd Officer' }
  ];

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-medium mb-4">Crew Safety Performance</h3>
      
      <div className="space-y-3">
        {crewSafety.map((crew) => (
          <div key={crew.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex-1">
              <div className="font-medium">{crew.name}</div>
              <div className="text-sm text-gray-600">{crew.position}</div>
            </div>
            
            <SafetyRatingBadge 
              rating={crew.rating}
              score={crew.score}
              showScore={true}
              showLabel={true}
              size="sm"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Average crew safety score:</span>
          <SafetyRatingBadge 
            rating="good"
            score={Math.round(crewSafety.reduce((sum, c) => sum + c.score, 0) / crewSafety.length)}
            showScore={true}
            variant="compact"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
```

## Size and Variant Options

```jsx
function SafetyBadgeVariants() {
  return (
    <div className="space-y-6">
      {/* Size variations */}
      <div className="space-y-2">
        <h3 className="font-medium">Size Options</h3>
        <div className="flex items-center gap-4">
          <SafetyRatingBadge rating="excellent" size="sm" showLabel showScore score={95} />
          <SafetyRatingBadge rating="good" size="md" showLabel showScore score={85} />
          <SafetyRatingBadge rating="satisfactory" size="lg" showLabel showScore score={75} />
        </div>
      </div>

      {/* Variant options */}
      <div className="space-y-2">
        <h3 className="font-medium">Variant Options</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm">Default:</span>
            <SafetyRatingBadge rating="good" variant="default" showLabel showScore score={85} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm">Detailed:</span>
            <SafetyRatingBadge rating="excellent" variant="detailed" showLabel showScore score={94} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm">Compact:</span>
            <SafetyRatingBadge rating="needs-improvement" variant="compact" showLabel showScore score={67} />
          </div>
        </div>
      </div>

      {/* Score display options */}
      <div className="space-y-2">
        <h3 className="font-medium">Display Options</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm">Score only:</span>
            <SafetyRatingBadge rating="good" showScore score={85} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm">Label only:</span>
            <SafetyRatingBadge rating="good" showLabel />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm">Both:</span>
            <SafetyRatingBadge rating="good" showLabel showScore score={85} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm">Badge only:</span>
            <SafetyRatingBadge rating="good" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Key Features
- **TMSA Compliance Ready**: Aligned with maritime safety assessment standards
- **Color-Coded Ratings**: Intuitive color scheme for quick safety assessment
- **Score Integration**: Numerical scores alongside visual ratings
- **Multiple Variants**: Default, detailed, and compact display options
- **Size Flexibility**: Small, medium, and large sizes for different contexts
- **Detailed Metrics**: Support for comprehensive safety metrics display
- **Interactive Support**: Click handlers for detailed safety views
- **Accessibility**: Screen reader support and proper contrast ratios

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Safety Rating Thresholds
- **Excellent**: 90-100 points (Dark Green)
- **Good**: 80-89 points (Green)
- **Satisfactory**: 70-79 points (Yellow)
- **Needs Improvement**: 60-69 points (Orange)
- **Poor**: 40-59 points (Red)
- **Critical**: 0-39 points (Dark Red)

## Best Practices
1. **Consistent Scoring**: Use standardized scoring criteria across fleet
2. **Regular Updates**: Update ratings based on recent safety performance
3. **Action Plans**: Link ratings to improvement action plans
4. **Trend Tracking**: Monitor rating changes over time
5. **TMSA Alignment**: Align ratings with TMSA element requirements
6. **Visual Hierarchy**: Use appropriate sizes for context importance
7. **Accessibility**: Ensure color contrast meets accessibility standards

## Common Use Cases
- Fleet safety performance dashboards
- Individual vessel safety monitoring
- Crew safety competency tracking
- TMSA compliance assessments
- Safety audit displays
- Port state control preparation
- Insurance compliance reporting
- Safety management system interfaces
- Risk assessment displays
- Training effectiveness measurement