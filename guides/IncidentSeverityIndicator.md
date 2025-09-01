# IncidentSeverityIndicator Component Guide

## Overview
The IncidentSeverityIndicator component provides visual severity classification for maritime incidents and safety events. It displays clear, color-coded indicators for incident priority levels with TMSA-compliant styling optimized for emergency response and safety management systems.

## Component Interface

```typescript
interface IncidentSeverityIndicatorProps {
  severity: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showLabel?: boolean;
  className?: string;
  onClick?: () => void;
}
```

## Key Features
- **Maritime Safety Standards**: TMSA and ISM Code compliant severity classification
- **Emergency Color Coding**: Internationally recognized maritime safety colors
- **Multiple Variants**: Flexible display options for different interface contexts
- **Accessibility**: Screen reader support with severity announcements
- **Integration Ready**: Compatible with incident management systems

## Basic Usage

```tsx
import { IncidentSeverityIndicator } from 'scomp-ui/sail-ui-kit';

function IncidentAlert() {
  return (
    <div className="space-y-4 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Current Vessel Incidents
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
          <div>
            <h4 className="font-medium text-red-900">Engine Room Fire Alarm</h4>
            <p className="text-sm text-red-700">Automatic detection system activated</p>
          </div>
          <IncidentSeverityIndicator severity="emergency" size="lg" />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg">
          <div>
            <h4 className="font-medium text-orange-900">Navigation Equipment Malfunction</h4>
            <p className="text-sm text-orange-700">GPS signal intermittent</p>
          </div>
          <IncidentSeverityIndicator severity="high" size="md" />
        </div>
        
        <div className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
          <div>
            <h4 className="font-medium text-yellow-900">Minor Deck Equipment Issue</h4>
            <p className="text-sm text-yellow-700">Winch motor overheating</p>
          </div>
          <IncidentSeverityIndicator severity="medium" size="md" />
        </div>
      </div>
    </div>
  );
}
```

## Incident Management Dashboard

```tsx
interface IncidentRecord {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  reportedAt: string;
  reportedBy: string;
  location: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  category: string;
  estimatedImpact: string;
}

function IncidentManagementDashboard() {
  const incidents: IncidentRecord[] = [
    {
      id: 'INC-2024-001',
      title: 'Man Overboard Drill Failure',
      description: 'Life ring deployment mechanism jammed during safety drill',
      severity: 'critical',
      reportedAt: '2024-03-15T14:30:00Z',
      reportedBy: 'Safety Officer Johnson',
      location: 'Port Side Deck, Frame 45',
      status: 'investigating',
      category: 'Safety Equipment',
      estimatedImpact: 'High - Critical safety equipment failure'
    },
    {
      id: 'INC-2024-002',
      title: 'Cargo Hold Ventilation Failure',
      description: 'Ventilation fan #3 stopped working, affecting cargo hold temperature control',
      severity: 'high',
      reportedAt: '2024-03-15T09:15:00Z',
      reportedBy: 'Chief Officer Smith',
      location: 'Cargo Hold #3',
      status: 'open',
      category: 'Cargo Operations',
      estimatedImpact: 'Medium - Cargo quality may be affected'
    },
    {
      id: 'INC-2024-003',
      title: 'Bridge Communication Static',
      description: 'VHF radio experiencing interference on channel 16',
      severity: 'medium',
      reportedAt: '2024-03-15T06:45:00Z',
      reportedBy: 'Second Officer Chen',
      location: 'Bridge - Radio Room',
      status: 'investigating',
      category: 'Communication',
      estimatedImpact: 'Low - Backup communication available'
    },
    {
      id: 'INC-2024-004',
      title: 'Galley Equipment Malfunction',
      description: 'Main oven thermostat reading incorrectly',
      severity: 'low',
      reportedAt: '2024-03-14T18:20:00Z',
      reportedBy: 'Chief Cook Martinez',
      location: 'Galley - Main Kitchen',
      status: 'resolved',
      category: 'Hotel Services',
      estimatedImpact: 'Minimal - Alternative cooking methods available'
    },
    {
      id: 'INC-2024-005',
      title: 'Engine Room Oil Leak',
      description: 'Minor hydraulic oil leak detected near main engine',
      severity: 'medium',
      reportedAt: '2024-03-14T22:10:00Z',
      reportedBy: 'Third Engineer Davis',
      location: 'Engine Room - Main Engine Area',
      status: 'resolved',
      category: 'Engineering',
      estimatedImpact: 'Low - Contained and repaired'
    },
    {
      id: 'INC-2024-006',
      title: 'Fire Detection System Alert',
      description: 'False alarm triggered in accommodation area',
      severity: 'high',
      reportedAt: '2024-03-14T03:30:00Z',
      reportedBy: 'Watch Officer Rodriguez',
      location: 'Accommodation - Deck 5',
      status: 'closed',
      category: 'Fire Safety',
      estimatedImpact: 'None - False alarm confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Safety Equipment': return Shield;
      case 'Cargo Operations': return Package;
      case 'Communication': return Radio;
      case 'Hotel Services': return Utensils;
      case 'Engineering': return Wrench;
      case 'Fire Safety': return Flame;
      default: return AlertTriangle;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#16569e] mb-2">
          Incident Management Dashboard
        </h3>
        <p className="text-gray-600">
          Track and manage safety incidents across all vessel operations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <IncidentSeverityIndicator severity="emergency" size="sm" variant="minimal" />
            <span className="font-medium text-red-800">Emergency</span>
          </div>
          <div className="text-2xl font-bold text-red-900 mt-1">0</div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <IncidentSeverityIndicator severity="critical" size="sm" variant="minimal" />
            <span className="font-medium text-red-800">Critical</span>
          </div>
          <div className="text-2xl font-bold text-red-900 mt-1">
            {incidents.filter(i => i.severity === 'critical').length}
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <IncidentSeverityIndicator severity="high" size="sm" variant="minimal" />
            <span className="font-medium text-orange-800">High</span>
          </div>
          <div className="text-2xl font-bold text-orange-900 mt-1">
            {incidents.filter(i => i.severity === 'high').length}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <IncidentSeverityIndicator severity="medium" size="sm" variant="minimal" />
            <span className="font-medium text-yellow-800">Medium</span>
          </div>
          <div className="text-2xl font-bold text-yellow-900 mt-1">
            {incidents.filter(i => i.severity === 'medium').length}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <IncidentSeverityIndicator severity="low" size="sm" variant="minimal" />
            <span className="font-medium text-green-800">Low</span>
          </div>
          <div className="text-2xl font-bold text-green-900 mt-1">
            {incidents.filter(i => i.severity === 'low').length}
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {incidents.map((incident) => {
          const IconComponent = getCategoryIcon(incident.category);
          return (
            <div key={incident.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <IncidentSeverityIndicator 
                    severity={incident.severity} 
                    size="md" 
                    variant="detailed" 
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {incident.title}
                      </h4>
                      <span className="text-sm font-mono text-gray-500">
                        {incident.id}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{incident.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Reported By:</span>
                        <div className="text-gray-600">{incident.reportedBy}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Location:</span>
                        <div className="text-gray-600">{incident.location}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Category:</span>
                        <div className="flex items-center space-x-1">
                          <IconComponent className="h-4 w-4 text-[#16569e]" />
                          <span className="text-gray-600">{incident.category}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Reported:</span>
                        <div className="text-gray-600">{formatDate(incident.reportedAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(incident.status)}`}>
                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Estimated Impact:</span>
                  <span className="text-gray-600 ml-2">{incident.estimatedImpact}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-blue-800">
              Incident Classification Guidelines
            </h5>
            <div className="text-sm text-blue-700 mt-1 space-y-1">
              <p><strong>Emergency:</strong> Immediate threat to life, vessel, or environment</p>
              <p><strong>Critical:</strong> Significant safety impact, equipment failure affecting operations</p>
              <p><strong>High:</strong> Potential safety concern, operational impact likely</p>
              <p><strong>Medium:</strong> Minor safety concern, limited operational impact</p>
              <p><strong>Low:</strong> Minimal impact, routine maintenance or minor issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Emergency Response Integration

```tsx
function EmergencyResponseDashboard() {
  const emergencyProcedures = [
    {
      trigger: 'emergency',
      title: 'Emergency Response Procedures',
      procedures: [
        'Activate General Alarm',
        'Muster all crew at emergency stations',
        'Contact Coast Guard/Maritime Authorities',
        'Deploy emergency equipment as required',
        'Execute emergency action plan'
      ]
    },
    {
      trigger: 'critical',
      title: 'Critical Incident Response',
      procedures: [
        'Alert Bridge and Engine Room',
        'Assess immediate safety risks',
        'Implement containment measures',
        'Notify company emergency contact',
        'Document incident details'
      ]
    },
    {
      trigger: 'high',
      title: 'High Priority Response',
      procedures: [
        'Notify duty officer immediately',
        'Assess potential escalation risks',
        'Implement preventive measures',
        'Monitor situation closely',
        'Report to management'
      ]
    }
  ];

  const activeEmergencies = [
    {
      id: 'EMG-001',
      title: 'Fire Detection Activation',
      severity: 'critical' as const,
      location: 'Engine Room',
      timeActive: '00:15:32',
      responseTeam: 'Emergency Response Team Alpha',
      status: 'responding'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-red-600 mb-2">
          Emergency Response Center
        </h3>
        <p className="text-gray-600">
          Active incident monitoring and emergency response coordination
        </p>
      </div>

      {/* Active Emergencies */}
      {activeEmergencies.length > 0 && (
        <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
          <h4 className="text-lg font-semibold text-red-800 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Active Emergency Incidents</span>
          </h4>
          
          <div className="space-y-4">
            {activeEmergencies.map((emergency) => (
              <div key={emergency.id} className="bg-white border border-red-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <IncidentSeverityIndicator 
                      severity={emergency.severity} 
                      size="lg"
                      variant="detailed"
                    />
                    <div>
                      <h5 className="font-semibold text-gray-900">{emergency.title}</h5>
                      <p className="text-sm text-gray-600">{emergency.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-mono font-bold text-red-600">
                      {emergency.timeActive}
                    </div>
                    <div className="text-xs text-gray-500">Active Time</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Response Team:</span>
                    <div className="text-gray-600">{emergency.responseTeam}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 ml-2">
                      {emergency.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response Procedures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {emergencyProcedures.map((procedure, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <IncidentSeverityIndicator 
                severity={procedure.trigger as any} 
                size="md" 
                variant="compact"
              />
              <h4 className="font-semibold text-gray-900">{procedure.title}</h4>
            </div>
            
            <div className="space-y-2">
              {procedure.procedures.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#16569e] text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {stepIndex + 1}
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-red-800">
              Emergency Contact Information
            </h5>
            <div className="text-sm text-red-700 mt-1 space-y-1">
              <p><strong>Coast Guard Emergency:</strong> VHF Channel 16 / +1-800-424-8802</p>
              <p><strong>Company Emergency Line:</strong> +1-555-EMERGENCY (24/7)</p>
              <p><strong>Medical Emergency:</strong> Medico Radio / +39-06-59298900</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Severity Classification System

```tsx
function SeverityClassificationGuide() {
  const severityLevels = [
    {
      level: 'emergency',
      title: 'Emergency',
      description: 'Immediate threat to life, vessel, or environment requiring immediate response',
      examples: [
        'Fire, explosion, or serious flooding',
        'Man overboard situation',
        'Collision or grounding',
        'Medical emergency requiring evacuation',
        'Pollution incident'
      ],
      responseTime: 'Immediate',
      notification: 'All relevant authorities, company emergency contact',
      color: 'red'
    },
    {
      level: 'critical',
      title: 'Critical',
      description: 'Significant safety impact or equipment failure affecting vessel operations',
      examples: [
        'Main engine failure',
        'Navigation equipment total failure',
        'Steering gear malfunction',
        'Fire detection system failure',
        'Critical safety equipment failure'
      ],
      responseTime: 'Within 15 minutes',
      notification: 'Bridge, Engine Room, Company',
      color: 'red'
    },
    {
      level: 'high',
      title: 'High',
      description: 'Potential safety concern with likely operational impact',
      examples: [
        'Partial navigation equipment failure',
        'Non-critical machinery malfunction',
        'Weather-related operational concerns',
        'Security threats or suspicious activity',
        'Cargo loading/discharge issues'
      ],
      responseTime: 'Within 1 hour',
      notification: 'Department head, Duty officer',
      color: 'orange'
    },
    {
      level: 'medium',
      title: 'Medium',
      description: 'Minor safety concern with limited operational impact',
      examples: [
        'Equipment requiring increased monitoring',
        'Minor maintenance issues',
        'Administrative compliance concerns',
        'Crew welfare issues',
        'Supply or logistical challenges'
      ],
      responseTime: 'Within 4 hours',
      notification: 'Relevant department',
      color: 'yellow'
    },
    {
      level: 'low',
      title: 'Low',
      description: 'Minimal impact, routine maintenance or minor issues',
      examples: [
        'Routine equipment maintenance',
        'Minor galley or accommodation issues',
        'Documentation discrepancies',
        'Training requirements',
        'Routine operational observations'
      ],
      responseTime: 'Next business day',
      notification: 'Appropriate personnel',
      color: 'green'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#16569e] mb-2">
          Incident Severity Classification System
        </h3>
        <p className="text-gray-600">
          Standardized severity levels for consistent incident management
        </p>
      </div>

      <div className="space-y-6">
        {severityLevels.map((level, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-4 mb-4">
              <IncidentSeverityIndicator 
                severity={level.level as any} 
                size="lg" 
                variant="detailed"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {level.title} Priority
                </h4>
                <p className="text-gray-700 mb-4">{level.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Examples:</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {level.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start space-x-2">
                          <span className="text-gray-400">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-900">Response Time:</span>
                      <div className="text-sm text-gray-600">{level.responseTime}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Notification Required:</span>
                      <div className="text-sm text-gray-600">{level.notification}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-blue-800">
              Classification Guidelines
            </h5>
            <p className="text-sm text-blue-700 mt-1">
              When in doubt about severity classification, always err on the side of caution and 
              select a higher severity level. This ensures appropriate response protocols are 
              followed and maintains safety standards according to ISM and TMSA requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Real-time Updates**: Efficient re-rendering for severity changes
- **Color Accessibility**: Multiple indicators beyond color coding
- **Responsive Design**: Maintains visibility across all screen sizes
- **Emergency Optimization**: Prioritized rendering for critical incidents

## Accessibility Features

- **Screen Reader Support**: Severity level announcements
- **High Contrast**: WCAG compliant emergency color schemes
- **Keyboard Navigation**: Full keyboard accessibility
- **Multiple Indicators**: Icons and text support color indicators

## Common Patterns

```tsx
// Basic severity indicator
<IncidentSeverityIndicator severity="high" />

// Detailed emergency display
<IncidentSeverityIndicator 
  severity="emergency" 
  size="lg" 
  variant="detailed" 
  showLabel={true}
/>

// Compact list display
<IncidentSeverityIndicator 
  severity="medium" 
  size="sm" 
  variant="compact"
/>

// Interactive incident button
<IncidentSeverityIndicator 
  severity="critical" 
  onClick={() => showIncidentDetails()}
  className="cursor-pointer hover:scale-105"
/>
```

## Integration with Maritime Systems

The IncidentSeverityIndicator component integrates seamlessly with:
- **Emergency Response**: Real-time incident classification and response
- **Safety Management**: ISM and TMSA compliance tracking
- **Risk Assessment**: Incident severity analysis and trending
- **Reporting Systems**: Regulatory and company incident reporting
- **Communication Systems**: Emergency notification and alerting

Use this component to ensure consistent incident classification and appropriate emergency response across all maritime operations.