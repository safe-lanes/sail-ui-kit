# IncidentCard Component Guide

## Overview
The IncidentCard component displays incident information and status for maritime safety management. It provides comprehensive incident tracking with visual indicators for severity, status, and follow-up actions with TMSA-compliant styling optimized for safety management systems.

## Component Interface

```typescript
interface IncidentCardProps {
  incident: IncidentData;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'summary' | 'detailed' | 'timeline';
  showActions?: boolean;
  showInvestigation?: boolean;
  onDetailsClick?: (id: string) => void;
  onStatusUpdate?: (id: string, status: string) => void;
  onAssignInvestigator?: (id: string) => void;
  className?: string;
}

interface IncidentData {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  status: 'reported' | 'investigating' | 'analysis' | 'corrective-action' | 'closed';
  location: string;
  dateTime: string;
  reportedBy: CrewMember;
  investigator?: Investigator;
  vessel: VesselInfo;
  involvedPersonnel: CrewMember[];
  witnesses: CrewMember[];
  equipmentInvolved: string[];
  immediateActions: string;
  rootCause?: string;
  correctiveActions?: ActionItem[];
  preventiveActions?: ActionItem[];
  lessons?: string;
  attachments: Attachment[];
  timeline: TimelineEvent[];
  followUpRequired: boolean;
  regulatoryNotification: boolean;
}
```

## Key Features
- **Incident Classification**: Comprehensive incident type and severity tracking
- **Investigation Management**: Investigation workflow and assignment tracking
- **Timeline Visualization**: Chronological incident progression display
- **Action Tracking**: Corrective and preventive action monitoring
- **Regulatory Compliance**: Automated notification and reporting features

## Basic Usage

```tsx
import { IncidentCard } from 'scomp-ui/sail-ui-kit';

function IncidentManagementDashboard() {
  const incident = {
    id: 'INC-2024-001',
    title: 'Slip and Fall on Main Deck',
    description: 'Crew member slipped on wet deck during routine maintenance operations',
    type: 'personal-injury',
    severity: 'medium',
    status: 'investigating',
    location: 'Main Deck - Port Side',
    dateTime: '2024-03-15T14:30:00Z',
    reportedBy: {
      id: 'CREW-001',
      name: 'John Smith',
      rank: 'Second Officer'
    },
    investigator: {
      id: 'INV-001',
      name: 'Sarah Johnson',
      title: 'Safety Officer'
    },
    vessel: {
      id: 'mv-container-express',
      name: 'MV Container Express'
    },
    involvedPersonnel: [
      {
        id: 'CREW-002',
        name: 'Mike Wilson',
        rank: 'AB Seaman'
      }
    ],
    immediateActions: 'Medical attention provided, area cordoned off, anti-slip mats installed',
    timeline: [
      {
        timestamp: '2024-03-15T14:30:00Z',
        event: 'Incident occurred',
        user: 'System'
      },
      {
        timestamp: '2024-03-15T14:45:00Z',
        event: 'Incident reported',
        user: 'John Smith'
      }
    ]
  };

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Recent Safety Incidents
      </h3>
      
      <IncidentCard
        incident={incident}
        variant="detailed"
        showActions={true}
        showInvestigation={true}
        onDetailsClick={(id) => console.log('Show incident details:', id)}
        onStatusUpdate={(id, status) => console.log('Update status:', id, status)}
        onAssignInvestigator={(id) => console.log('Assign investigator:', id)}
      />
    </div>
  );
}
```

## Comprehensive Incident Dashboard

```tsx
function ComprehensiveIncidentDashboard() {
  const incidents: IncidentData[] = [
    {
      id: 'INC-2024-001',
      title: 'Engine Room Fire Alarm Activation',
      description: 'Automatic fire detection system activated in engine room due to overheating auxiliary generator',
      type: 'fire-safety',
      severity: 'critical',
      status: 'corrective-action',
      location: 'Engine Room - Auxiliary Generator Area',
      dateTime: '2024-03-15T08:15:00Z',
      reportedBy: {
        id: 'CREW-001',
        name: 'Chief Engineer Davis',
        rank: 'Chief Engineer'
      },
      investigator: {
        id: 'INV-001',
        name: 'Captain Morrison',
        title: 'Master'
      },
      vessel: {
        id: 'mv-container-express',
        name: 'MV Container Express'
      },
      involvedPersonnel: [
        { id: 'CREW-002', name: 'Second Engineer Thompson', rank: 'Second Engineer' },
        { id: 'CREW-003', name: 'Electrician Rodriguez', rank: 'Electrician' }
      ],
      witnesses: [
        { id: 'CREW-004', name: 'Third Engineer Chen', rank: 'Third Engineer' }
      ],
      equipmentInvolved: ['Auxiliary Generator #2', 'Fire Detection System', 'CO2 Suppression System'],
      immediateActions: 'Generator shut down immediately, area evacuated, CO2 system armed but not discharged, manual fire watch established',
      rootCause: 'Auxiliary generator bearing failure due to overdue maintenance',
      correctiveActions: [
        {
          id: 'CA-001',
          description: 'Replace auxiliary generator bearings',
          assignedTo: 'Chief Engineer Davis',
          dueDate: '2024-03-20',
          status: 'in-progress'
        },
        {
          id: 'CA-002',
          description: 'Recalibrate fire detection sensors',
          assignedTo: 'Electrician Rodriguez',
          dueDate: '2024-03-18',
          status: 'completed'
        }
      ],
      preventiveActions: [
        {
          id: 'PA-001',
          description: 'Implement weekly bearing temperature monitoring',
          assignedTo: 'Engine Room Team',
          dueDate: '2024-04-01',
          status: 'pending'
        }
      ],
      lessons: 'Importance of preventive maintenance schedules and early warning system monitoring',
      attachments: [
        { id: '1', name: 'Fire Alarm Log.pdf', type: 'document', size: '245KB' },
        { id: '2', name: 'Generator Photos.jpg', type: 'image', size: '1.2MB' }
      ],
      timeline: [
        {
          timestamp: '2024-03-15T08:15:00Z',
          event: 'Fire alarm activated',
          user: 'System',
          details: 'Automatic detection system triggered'
        },
        {
          timestamp: '2024-03-15T08:16:00Z',
          event: 'Generator emergency shutdown',
          user: 'Chief Engineer Davis',
          details: 'Manual emergency stop activated'
        },
        {
          timestamp: '2024-03-15T08:20:00Z',
          event: 'Incident reported to bridge',
          user: 'Chief Engineer Davis',
          details: 'Captain notified of situation'
        },
        {
          timestamp: '2024-03-15T09:30:00Z',
          event: 'Investigation initiated',
          user: 'Captain Morrison',
          details: 'Formal investigation started'
        },
        {
          timestamp: '2024-03-16T14:00:00Z',
          event: 'Root cause identified',
          user: 'Captain Morrison',
          details: 'Bearing failure confirmed as primary cause'
        }
      ],
      followUpRequired: true,
      regulatoryNotification: true
    },
    {
      id: 'INC-2024-002',
      title: 'Cargo Loading Equipment Malfunction',
      description: 'Cargo crane hydraulic system failure during container loading operations',
      type: 'equipment-failure',
      severity: 'high',
      status: 'analysis',
      location: 'Cargo Hold #2 - Starboard Crane',
      dateTime: '2024-03-14T15:45:00Z',
      reportedBy: {
        id: 'CREW-005',
        name: 'Chief Officer Smith',
        rank: 'Chief Officer'
      },
      investigator: {
        id: 'INV-002',
        name: 'Chief Engineer Davis',
        title: 'Chief Engineer'
      },
      vessel: {
        id: 'mv-container-express',
        name: 'MV Container Express'
      },
      involvedPersonnel: [
        { id: 'CREW-006', name: 'Crane Operator Martinez', rank: 'Crane Operator' },
        { id: 'CREW-007', name: 'Deck Foreman Lee', rank: 'Bosun' }
      ],
      witnesses: [
        { id: 'CREW-008', name: 'AB Seaman Johnson', rank: 'AB Seaman' },
        { id: 'CREW-009', name: 'Stevedore Wilson', rank: 'Contractor' }
      ],
      equipmentInvolved: ['Starboard Cargo Crane', 'Hydraulic Power Unit', 'Load Block Assembly'],
      immediateActions: 'Crane operations suspended, area secured, manual rigging equipment deployed to continue loading',
      rootCause: 'Hydraulic seal failure in main lift cylinder',
      correctiveActions: [
        {
          id: 'CA-003',
          description: 'Replace hydraulic seals and test system',
          assignedTo: 'Third Engineer Wilson',
          dueDate: '2024-03-19',
          status: 'pending'
        }
      ],
      preventiveActions: [
        {
          id: 'PA-002',
          description: 'Implement monthly hydraulic system pressure testing',
          assignedTo: 'Engineering Department',
          dueDate: '2024-04-15',
          status: 'pending'
        }
      ],
      attachments: [
        { id: '3', name: 'Hydraulic System Diagram.pdf', type: 'document', size: '892KB' },
        { id: '4', name: 'Crane Inspection Report.pdf', type: 'document', size: '567KB' }
      ],
      timeline: [
        {
          timestamp: '2024-03-14T15:45:00Z',
          event: 'Hydraulic failure detected',
          user: 'Crane Operator Martinez',
          details: 'Loss of hydraulic pressure during lift operation'
        },
        {
          timestamp: '2024-03-14T15:50:00Z',
          event: 'Operations suspended',
          user: 'Chief Officer Smith',
          details: 'All crane operations halted for safety'
        },
        {
          timestamp: '2024-03-14T16:15:00Z',
          event: 'Investigation assigned',
          user: 'Captain Morrison',
          details: 'Chief Engineer assigned as lead investigator'
        }
      ],
      followUpRequired: true,
      regulatoryNotification: false
    },
    {
      id: 'INC-2024-003',
      title: 'Near Miss - Collision with Small Craft',
      description: 'Close approach with fishing vessel during port approach, evasive action taken',
      type: 'near-miss',
      severity: 'medium',
      status: 'closed',
      location: 'Port Approach Channel',
      dateTime: '2024-03-12T11:20:00Z',
      reportedBy: {
        id: 'CREW-010',
        name: 'Second Officer Chen',
        rank: 'Second Officer'
      },
      investigator: {
        id: 'INV-003',
        name: 'Chief Officer Smith',
        title: 'Chief Officer'
      },
      vessel: {
        id: 'mv-container-express',
        name: 'MV Container Express'
      },
      involvedPersonnel: [
        { id: 'CREW-011', name: 'Helmsman Rodriguez', rank: 'AB Seaman' }
      ],
      witnesses: [
        { id: 'CREW-012', name: 'Lookout Thompson', rank: 'Ordinary Seaman' }
      ],
      equipmentInvolved: ['Navigation Equipment', 'VHF Radio', 'Engine Telegraph'],
      immediateActions: 'Hard starboard helm, engine astern, VHF warning broadcast, incident logged in bridge log',
      rootCause: 'Fishing vessel failed to monitor VHF and maintain proper lookout',
      correctiveActions: [
        {
          id: 'CA-004',
          description: 'Report to Port Authority',
          assignedTo: 'Captain Morrison',
          dueDate: '2024-03-13',
          status: 'completed'
        }
      ],
      preventiveActions: [
        {
          id: 'PA-003',
          description: 'Enhanced lookout procedures in fishing areas',
          assignedTo: 'Navigation Department',
          dueDate: '2024-03-20',
          status: 'completed'
        }
      ],
      lessons: 'Importance of early detection and communication with small craft in congested waters',
      attachments: [
        { id: '5', name: 'Bridge Navigation Log.pdf', type: 'document', size: '123KB' },
        { id: '6', name: 'Radar Plot.jpg', type: 'image', size: '445KB' }
      ],
      timeline: [
        {
          timestamp: '2024-03-12T11:20:00Z',
          event: 'Close approach detected',
          user: 'Second Officer Chen',
          details: 'Fishing vessel at 500m, crossing from starboard'
        },
        {
          timestamp: '2024-03-12T11:21:00Z',
          event: 'Evasive action taken',
          user: 'Second Officer Chen',
          details: 'Hard starboard, engine astern'
        },
        {
          timestamp: '2024-03-12T11:25:00Z',
          event: 'Situation resolved',
          user: 'Second Officer Chen',
          details: 'Safe distance restored, normal navigation resumed'
        },
        {
          timestamp: '2024-03-13T09:00:00Z',
          event: 'Investigation completed',
          user: 'Chief Officer Smith',
          details: 'Findings documented and preventive actions identified'
        }
      ],
      followUpRequired: false,
      regulatoryNotification: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'bg-red-600 text-white';
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'analysis': return 'bg-purple-100 text-purple-800';
      case 'corrective-action': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'personal-injury': return <Heart className="h-5 w-5" />;
      case 'fire-safety': return <Flame className="h-5 w-5" />;
      case 'equipment-failure': return <Wrench className="h-5 w-5" />;
      case 'near-miss': return <AlertTriangle className="h-5 w-5" />;
      case 'environmental': return <Droplets className="h-5 w-5" />;
      case 'security': return <Shield className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeElapsed = (dateString: string) => {
    const now = new Date();
    const incidentDate = new Date(dateString);
    const diffHours = Math.round((now.getTime() - incidentDate.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Safety Incident Management
        </h1>
        <p className="text-gray-600">
          Comprehensive incident tracking and investigation management
        </p>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
            </div>
            <FileText className="h-6 w-6 text-[#16569e]" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Cases</p>
              <p className="text-2xl font-bold text-yellow-600">
                {incidents.filter(i => i.status !== 'closed').length}
              </p>
            </div>
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical/Emergency</p>
              <p className="text-2xl font-bold text-red-600">
                {incidents.filter(i => ['critical', 'emergency'].includes(i.severity)).length}
              </p>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Investigation</p>
              <p className="text-2xl font-bold text-purple-600">
                {incidents.filter(i => ['investigating', 'analysis'].includes(i.status)).length}
              </p>
            </div>
            <Search className="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Regulatory Reports</p>
              <p className="text-2xl font-bold text-blue-600">
                {incidents.filter(i => i.regulatoryNotification).length}
              </p>
            </div>
            <FileCheck className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Incident Cards */}
      <div className="space-y-6">
        {incidents.map((incident) => (
          <div key={incident.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-[#16569e]">
                    {getTypeIcon(incident.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{incident.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{incident.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{getTimeElapsed(incident.dateTime)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>Reported by {incident.reportedBy.name}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{incident.id}</div>
                <div className="text-xs text-gray-500">{formatDate(incident.dateTime)}</div>
              </div>
            </div>

            {/* Investigation Info */}
            {incident.investigator && (
              <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Investigation</span>
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  Assigned to: {incident.investigator.name} ({incident.investigator.title})
                </p>
                {incident.rootCause && (
                  <p className="text-sm text-purple-700 mt-1">
                    <strong>Root Cause:</strong> {incident.rootCause}
                  </p>
                )}
              </div>
            )}

            {/* Actions Progress */}
            {incident.correctiveActions && incident.correctiveActions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Corrective Actions</h4>
                <div className="space-y-2">
                  {incident.correctiveActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{action.description}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        action.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : action.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {action.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Immediate Actions:</span>
                <p className="text-sm text-gray-600 mt-1">{incident.immediateActions}</p>
              </div>
              {incident.involvedPersonnel.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Involved Personnel:</span>
                  <div className="text-sm text-gray-600 mt-1">
                    {incident.involvedPersonnel.map(person => person.name).join(', ')}
                  </div>
                </div>
              )}
              {incident.equipmentInvolved.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Equipment Involved:</span>
                  <div className="text-sm text-gray-600 mt-1">
                    {incident.equipmentInvolved.join(', ')}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {incident.regulatoryNotification && (
                  <span className="flex items-center space-x-1">
                    <FileCheck className="h-3 w-3" />
                    <span>Regulatory Notification</span>
                  </span>
                )}
                {incident.followUpRequired && (
                  <span className="flex items-center space-x-1">
                    <ArrowRight className="h-3 w-3" />
                    <span>Follow-up Required</span>
                  </span>
                )}
                {incident.attachments.length > 0 && (
                  <span className="flex items-center space-x-1">
                    <Paperclip className="h-3 w-3" />
                    <span>{incident.attachments.length} attachments</span>
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  View Details
                </button>
                {incident.status !== 'closed' && (
                  <button className="px-3 py-1 text-xs bg-[#16569e] text-white rounded-md hover:bg-[#134a87]">
                    Update Status
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Investigation Activity</h3>
        <div className="space-y-4">
          {incidents
            .flatMap(incident => 
              incident.timeline.map(event => ({
                ...event,
                incidentId: incident.id,
                incidentTitle: incident.title
              }))
            )
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10)
            .map((event, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-[#16569e] rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{event.event}</span>
                    <span className="text-xs text-gray-500">({event.incidentId})</span>
                  </div>
                  <p className="text-sm text-gray-600">{event.incidentTitle}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">By {event.user}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{formatDate(event.timestamp)}</span>
                  </div>
                  {event.details && (
                    <p className="text-xs text-gray-500 mt-1">{event.details}</p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Data Virtualization**: Efficient rendering for large incident lists
- **Real-time Updates**: WebSocket integration for status changes
- **Search & Filter**: Fast incident search and filtering capabilities
- **Timeline Optimization**: Efficient timeline rendering and updates

## Accessibility Features

- **Screen Reader Support**: Proper ARIA labels for incident information
- **Keyboard Navigation**: Full keyboard accessibility for all actions
- **Color Accessibility**: Multiple indicators beyond color coding
- **High Contrast**: WCAG compliant severity and status indicators

## Common Patterns

```tsx
// Basic incident summary
<IncidentCard
  incident={incidentData}
  variant="summary"
  size="md"
/>

// Detailed investigation view
<IncidentCard
  incident={incidentData}
  variant="detailed"
  showInvestigation={true}
  showActions={true}
/>

// Timeline visualization
<IncidentCard
  incident={incidentData}
  variant="timeline"
  onStatusUpdate={handleStatusUpdate}
/>
```

## Integration with Maritime Systems

The IncidentCard component integrates seamlessly with:
- **Safety Management**: ISM and TMSA safety management systems
- **Investigation Workflows**: Systematic incident investigation processes
- **Regulatory Reporting**: Automated submission to maritime authorities
- **Training Systems**: Incident-based learning and safety training
- **Quality Management**: Continuous improvement and lesson learned tracking

Use this component to ensure comprehensive incident documentation and maintain compliance with maritime safety regulations while driving continuous improvement in safety performance.