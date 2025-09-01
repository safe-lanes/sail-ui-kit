# CrewCompetencyBadge Component Guide

## Overview
The CrewCompetencyBadge component displays crew member competency levels and certifications for maritime applications. It provides visual indicators for skill levels, certification status, and compliance requirements with TMSA-compliant styling optimized for fleet management interfaces.

## Component Interface

```typescript
interface CrewCompetencyBadgeProps {
  competency: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certified?: boolean;
  expiryDate?: string;
  urgency?: 'none' | 'warning' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  onClick?: () => void;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Competency Levels**: Clear visual hierarchy for skill progression
- **Certification Status**: Integrated certification tracking and expiry warnings
- **Urgency Indicators**: Critical certification renewal alerts
- **Multiple Variants**: Flexible display options for different contexts

## Basic Usage

```tsx
import { CrewCompetencyBadge } from 'scomp-ui/sail-ui-kit';

function CrewSkillsOverview() {
  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Captain James Morrison - Competency Profile
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CrewCompetencyBadge
          competency="Navigation"
          level="expert"
          certified={true}
          expiryDate="2025-06-15"
          urgency="none"
        />
        
        <CrewCompetencyBadge
          competency="Bridge Resource Management"
          level="advanced"
          certified={true}
          expiryDate="2024-12-30"
          urgency="warning"
        />
        
        <CrewCompetencyBadge
          competency="ECDIS Operation"
          level="expert"
          certified={true}
          expiryDate="2024-09-22"
          urgency="critical"
        />
        
        <CrewCompetencyBadge
          competency="Cargo Operations"
          level="intermediate"
          certified={false}
          urgency="none"
        />
      </div>
    </div>
  );
}
```

## Crew Training Dashboard

```tsx
interface CrewMember {
  id: string;
  name: string;
  rank: string;
  competencies: {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    certified: boolean;
    expiryDate?: string;
    lastAssessment?: string;
  }[];
}

function CrewTrainingDashboard() {
  const crewMembers: CrewMember[] = [
    {
      id: '1',
      name: 'Captain James Morrison',
      rank: 'Master',
      competencies: [
        {
          name: 'Navigation & Watchkeeping',
          level: 'expert',
          certified: true,
          expiryDate: '2025-03-15',
          lastAssessment: '2024-01-10'
        },
        {
          name: 'Ship Handling',
          level: 'expert',
          certified: true,
          expiryDate: '2024-11-30',
          lastAssessment: '2024-01-08'
        },
        {
          name: 'Maritime Law',
          level: 'advanced',
          certified: true,
          expiryDate: '2024-08-15',
          lastAssessment: '2023-12-20'
        },
        {
          name: 'Crisis Management',
          level: 'expert',
          certified: true,
          expiryDate: '2025-01-20',
          lastAssessment: '2024-01-15'
        }
      ]
    },
    {
      id: '2',
      name: 'Chief Engineer Sarah Chen',
      rank: 'Chief Engineer',
      competencies: [
        {
          name: 'Engine Room Management',
          level: 'expert',
          certified: true,
          expiryDate: '2025-02-28',
          lastAssessment: '2024-01-05'
        },
        {
          name: 'Electrical Systems',
          level: 'advanced',
          certified: true,
          expiryDate: '2024-09-10',
          lastAssessment: '2023-11-15'
        },
        {
          name: 'Fuel System Management',
          level: 'expert',
          certified: true,
          expiryDate: '2024-12-05',
          lastAssessment: '2024-01-03'
        },
        {
          name: 'Environmental Compliance',
          level: 'intermediate',
          certified: false,
          lastAssessment: '2023-10-22'
        }
      ]
    },
    {
      id: '3',
      name: 'Second Officer Mike Rodriguez',
      rank: 'Second Officer',
      competencies: [
        {
          name: 'Navigation',
          level: 'advanced',
          certified: true,
          expiryDate: '2024-10-15',
          lastAssessment: '2023-12-10'
        },
        {
          name: 'ECDIS Operation',
          level: 'intermediate',
          certified: true,
          expiryDate: '2024-07-20',
          lastAssessment: '2023-11-05'
        },
        {
          name: 'Cargo Operations',
          level: 'intermediate',
          certified: false,
          lastAssessment: '2023-09-15'
        },
        {
          name: 'Radio Communications',
          level: 'advanced',
          certified: true,
          expiryDate: '2025-04-10',
          lastAssessment: '2024-01-12'
        }
      ]
    }
  ];

  const getUrgency = (certified: boolean, expiryDate?: string) => {
    if (!certified) return 'none';
    if (!expiryDate) return 'none';
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 30) return 'critical';
    if (daysUntilExpiry < 90) return 'warning';
    return 'none';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#16569e] mb-2">
          Crew Competency Dashboard
        </h3>
        <p className="text-gray-600">
          Monitor certification status and competency levels across all crew members
        </p>
      </div>

      <div className="space-y-8">
        {crewMembers.map((member) => (
          <div key={member.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-600">{member.rank}</p>
              </div>
              <div className="text-sm text-gray-500">
                {member.competencies.filter(c => c.certified).length} of {member.competencies.length} certified
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {member.competencies.map((competency, index) => (
                <CrewCompetencyBadge
                  key={index}
                  competency={competency.name}
                  level={competency.level}
                  certified={competency.certified}
                  expiryDate={competency.expiryDate}
                  urgency={getUrgency(competency.certified, competency.expiryDate)}
                  variant="detailed"
                  className="hover:shadow-md transition-shadow cursor-pointer"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-600 rounded-full"></div>
            <span className="font-medium text-green-800">Current</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Certification valid for 90+ days
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-yellow-600 rounded-full"></div>
            <span className="font-medium text-yellow-800">Renewal Due</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            Expires within 30-90 days
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-red-600 rounded-full"></div>
            <span className="font-medium text-red-800">Critical</span>
          </div>
          <p className="text-sm text-red-700 mt-1">
            Expires within 30 days
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-gray-600 rounded-full"></div>
            <span className="font-medium text-gray-800">Not Certified</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">
            Training required
          </p>
        </div>
      </div>
    </div>
  );
}
```

## Competency Matrix View

```tsx
function CompetencyMatrixView() {
  const competencyData = [
    {
      category: 'Navigation & Bridge Management',
      competencies: [
        { name: 'ECDIS Operation', required: ['Officer', 'Chief Officer', 'Master'] },
        { name: 'Radar & ARPA', required: ['Officer', 'Chief Officer', 'Master'] },
        { name: 'Bridge Resource Management', required: ['Chief Officer', 'Master'] },
        { name: 'Ship Handling', required: ['Chief Officer', 'Master'] },
        { name: 'Navigation Planning', required: ['Officer', 'Chief Officer', 'Master'] }
      ]
    },
    {
      category: 'Safety & Emergency Response',
      competencies: [
        { name: 'Fire Fighting', required: ['All Crew'] },
        { name: 'First Aid', required: ['Officers', 'Medical Officer'] },
        { name: 'Survival Craft', required: ['Officers'] },
        { name: 'Crisis Management', required: ['Master', 'Chief Officer'] },
        { name: 'Search & Rescue', required: ['Officers'] }
      ]
    },
    {
      category: 'Cargo & Operations',
      competencies: [
        { name: 'Cargo Operations', required: ['Deck Officers', 'Chief Officer'] },
        { name: 'Dangerous Goods', required: ['Chief Officer', 'Master'] },
        { name: 'Container Securing', required: ['Deck Crew', 'Officers'] },
        { name: 'Load Planning', required: ['Chief Officer'] },
        { name: 'Port Operations', required: ['Officers'] }
      ]
    },
    {
      category: 'Engineering',
      competencies: [
        { name: 'Engine Room Management', required: ['Engineers'] },
        { name: 'Electrical Systems', required: ['Engineers', 'Electrician'] },
        { name: 'Fuel Management', required: ['Engineers'] },
        { name: 'Maintenance Planning', required: ['Chief Engineer'] },
        { name: 'Environmental Compliance', required: ['Chief Engineer'] }
      ]
    }
  ];

  const crewRoles = ['Master', 'Chief Officer', 'Second Officer', 'Third Officer', 'Chief Engineer', 'Second Engineer', 'Bosun', 'AB Seaman'];

  const getRandomLevel = () => {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    return levels[Math.floor(Math.random() * levels.length)] as 'beginner' | 'intermediate' | 'advanced' | 'expert';
  };

  const getRandomCertification = () => {
    return Math.random() > 0.3;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#16569e] mb-2">
          Fleet Competency Matrix
        </h3>
        <p className="text-gray-600">
          Overview of competency requirements and current status across all roles
        </p>
      </div>

      <div className="space-y-8">
        {competencyData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {category.category}
            </h4>
            
            <div className="space-y-4">
              {category.competencies.map((competency, compIndex) => (
                <div key={compIndex} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">
                      {competency.name}
                    </h5>
                    <div className="text-xs text-gray-500">
                      Required for: {competency.required.join(', ')}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                    {crewRoles.map((role, roleIndex) => {
                      const isRequired = competency.required.some(req => 
                        req === 'All Crew' || 
                        req === role || 
                        (req === 'Officers' && role.includes('Officer')) ||
                        (req === 'Engineers' && role.includes('Engineer')) ||
                        (req === 'Deck Officers' && (role.includes('Officer') && !role.includes('Engineer'))) ||
                        (req === 'Deck Crew' && (role.includes('Seaman') || role.includes('Bosun')))
                      );
                      
                      if (!isRequired) {
                        return (
                          <div key={roleIndex} className="text-center p-2">
                            <div className="text-xs text-gray-400 mb-1">{role}</div>
                            <div className="h-8 flex items-center justify-center">
                              <span className="text-xs text-gray-400">N/A</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={roleIndex} className="text-center">
                          <div className="text-xs text-gray-600 mb-1">{role}</div>
                          <CrewCompetencyBadge
                            competency=""
                            level={getRandomLevel()}
                            certified={getRandomCertification()}
                            size="sm"
                            variant="compact"
                            className="w-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-blue-800">
              Competency Matrix Guide
            </h5>
            <p className="text-sm text-blue-700 mt-1">
              This matrix shows required competencies for each role and current crew certification status. 
              Red badges indicate urgent renewal requirements, yellow badges show upcoming renewals, 
              and green badges are current certifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Individual Development Plan

```tsx
function IndividualDevelopmentPlan() {
  const developmentPlan = {
    crewMember: {
      name: 'Third Officer Alex Thompson',
      rank: 'Third Officer',
      department: 'Navigation',
      joinDate: '2023-06-15',
      nextReview: '2024-06-15'
    },
    currentCompetencies: [
      {
        name: 'Basic Navigation',
        level: 'advanced',
        certified: true,
        expiryDate: '2025-08-15',
        targetLevel: 'expert'
      },
      {
        name: 'ECDIS Operation',
        level: 'intermediate',
        certified: true,
        expiryDate: '2024-11-30',
        targetLevel: 'advanced'
      },
      {
        name: 'Bridge Resource Management',
        level: 'beginner',
        certified: false,
        targetLevel: 'intermediate'
      },
      {
        name: 'Cargo Operations',
        level: 'beginner',
        certified: false,
        targetLevel: 'advanced'
      },
      {
        name: 'Ship Handling',
        level: 'beginner',
        certified: false,
        targetLevel: 'intermediate'
      }
    ],
    trainingPlan: [
      {
        competency: 'Bridge Resource Management',
        priority: 'high',
        targetDate: '2024-08-15',
        method: 'Simulator Training',
        duration: '40 hours'
      },
      {
        competency: 'Cargo Operations',
        priority: 'medium',
        targetDate: '2024-12-01',
        method: 'On-board Training',
        duration: '80 hours'
      },
      {
        competency: 'Ship Handling',
        priority: 'medium',
        targetDate: '2025-03-01',
        method: 'Simulator + Mentoring',
        duration: '60 hours'
      }
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      case 'beginner': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#16569e] mb-2">
              Individual Development Plan
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Name:</strong> {developmentPlan.crewMember.name}</p>
              <p><strong>Rank:</strong> {developmentPlan.crewMember.rank}</p>
              <p><strong>Department:</strong> {developmentPlan.crewMember.department}</p>
              <p><strong>Service Start:</strong> {new Date(developmentPlan.crewMember.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Next Review</div>
            <div className="font-medium text-[#16569e]">
              {new Date(developmentPlan.crewMember.nextReview).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Current Competencies */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Current Competency Status
        </h4>
        
        <div className="space-y-4">
          {developmentPlan.currentCompetencies.map((competency, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">{competency.name}</h5>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(competency.level)}`}>
                    Current: {competency.level}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(competency.targetLevel)}`}>
                    Target: {competency.targetLevel}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <CrewCompetencyBadge
                  competency=""
                  level={competency.level}
                  certified={competency.certified}
                  expiryDate={competency.expiryDate}
                  size="sm"
                  variant="compact"
                />
                <div className="text-xs text-gray-500">
                  {competency.certified && competency.expiryDate && (
                    <>Expires: {new Date(competency.expiryDate).toLocaleDateString()}</>
                  )}
                  {!competency.certified && 'Certification Required'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Plan */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Upcoming Training Plan
        </h4>
        
        <div className="space-y-4">
          {developmentPlan.trainingPlan.map((training, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">{training.competency}</h5>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(training.priority)}`}>
                  {training.priority} Priority
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Target Date:</span>
                  <div className="text-gray-600">{new Date(training.targetDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Method:</span>
                  <div className="text-gray-600">{training.method}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <div className="text-gray-600">{training.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Target className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-blue-800">
              Development Goals
            </h5>
            <p className="text-sm text-blue-700 mt-1">
              This development plan aims to advance competency levels toward promotion to Second Officer. 
              Priority training focuses on bridge management and operational responsibilities required for advancement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Badge Rendering**: Optimize for large crew rosters with virtualization
- **Certification Tracking**: Real-time updates for expiry status
- **Data Caching**: Cache competency data for faster loading
- **Responsive Design**: Ensure readability across all device sizes

## Accessibility Features

- **Color Coding**: Multiple indicators beyond color for accessibility
- **Screen Readers**: Proper ARIA labels for competency levels
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: WCAG compliant color combinations

## Common Patterns

```tsx
// Single competency indicator
<CrewCompetencyBadge
  competency="Navigation"
  level="expert"
  certified={true}
  expiryDate="2025-06-15"
/>

// Compact crew list display
<CrewCompetencyBadge
  competency="ECDIS"
  level="advanced"
  variant="compact"
  size="sm"
/>

// Detailed training overview
<CrewCompetencyBadge
  competency="Bridge Resource Management"
  level="intermediate"
  certified={true}
  expiryDate="2024-08-15"
  urgency="warning"
  variant="detailed"
  onClick={() => showTrainingDetails()}
/>
```

## Integration with Maritime Systems

The CrewCompetencyBadge component integrates seamlessly with:
- **Crew Management**: Personnel competency tracking and development
- **Training Systems**: Learning management and certification tracking
- **Compliance Monitoring**: Regulatory requirement verification
- **Performance Reviews**: Competency assessment and progression
- **Resource Planning**: Crew deployment based on certification status

Use this component to maintain clear visibility of crew competency levels and ensure compliance with maritime training requirements.