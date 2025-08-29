# Badge Component Guide

## Overview
Badge provides visual indicators for status, counts, labels, and categories in maritime applications. It supports various sizes, colors, and styles optimized for vessel status, crew certifications, safety ratings, and operational indicators with professional maritime theming.

## Component Interface

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}
```

## Basic Usage

```jsx
import { Badge } from 'scomp-ui';

function BasicBadgeExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge variant="default">Operational</Badge>
        <Badge variant="success">Compliant</Badge>
        <Badge variant="warning">Maintenance</Badge>
        <Badge variant="destructive">Critical</Badge>
        <Badge variant="info">In Transit</Badge>
        <Badge variant="outline">Pending</Badge>
      </div>

      <div className="flex items-center gap-3">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </div>
  );
}
```

## Vessel Status Badges

```jsx
import { Ship, Anchor, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

function VesselStatusBadges() {
  const vesselStatuses = [
    { id: '1', name: 'MV Atlantic Star', status: 'operational', location: 'Rotterdam' },
    { id: '2', name: 'MV Pacific Dawn', status: 'maintenance', location: 'Singapore' },
    { id: '3', name: 'MV Nordic Explorer', status: 'transit', location: 'English Channel' },
    { id: '4', name: 'MV Southern Cross', status: 'loading', location: 'Hamburg' },
    { id: '5', name: 'MV Arctic Wind', status: 'emergency', location: 'North Sea' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      operational: { variant: 'success', icon: CheckCircle, label: 'Operational' },
      maintenance: { variant: 'warning', icon: Settings, label: 'Maintenance' },
      transit: { variant: 'info', icon: Ship, label: 'In Transit' },
      loading: { variant: 'default', icon: Anchor, label: 'Loading' },
      emergency: { variant: 'destructive', icon: AlertTriangle, label: 'Emergency' }
    };

    const config = statusConfig[status] || statusConfig.operational;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <config.icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Fleet Status Overview</h3>
      
      <div className="space-y-3">
        {vesselStatuses.map((vessel) => (
          <div key={vessel.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">{vessel.name}</h4>
              <p className="text-sm text-gray-600">{vessel.location}</p>
            </div>
            {getStatusBadge(vessel.status)}
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Fleet Summary</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">3 Operational</Badge>
          <Badge variant="warning">1 Maintenance</Badge>
          <Badge variant="info">1 Transit</Badge>
          <Badge variant="destructive">1 Emergency</Badge>
        </div>
      </div>
    </div>
  );
}
```

## Crew Certification Badges

```jsx
import { Award, Calendar, AlertTriangle, Clock } from 'lucide-react';

function CrewCertificationBadges() {
  const crewMembers = [
    {
      id: '1',
      name: 'Captain James Wilson',
      rank: 'Master',
      certifications: [
        { name: 'STCW Basic Safety', status: 'valid', expiry: '2025-06-15' },
        { name: 'Ship Security Officer', status: 'valid', expiry: '2024-12-20' },
        { name: 'Medical Certificate', status: 'expiring', expiry: '2024-04-10' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Chen',
      rank: 'Chief Officer',
      certifications: [
        { name: 'STCW Basic Safety', status: 'valid', expiry: '2025-08-22' },
        { name: 'Bridge Resource Management', status: 'expired', expiry: '2024-02-15' },
        { name: 'Medical Certificate', status: 'valid', expiry: '2024-11-30' }
      ]
    }
  ];

  const getCertificationBadge = (certification) => {
    const { status } = certification;
    const badgeConfig = {
      valid: { variant: 'success', icon: CheckCircle, text: 'Valid' },
      expiring: { variant: 'warning', icon: Clock, text: 'Expiring Soon' },
      expired: { variant: 'destructive', icon: AlertTriangle, text: 'Expired' },
      pending: { variant: 'info', icon: Calendar, text: 'Pending' }
    };

    const config = badgeConfig[status] || badgeConfig.valid;
    
    return (
      <Badge variant={config.variant} size="sm" className="flex items-center gap-1">
        <config.icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Crew Certification Status</h3>
      
      {crewMembers.map((member) => (
        <div key={member.id} className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.rank}</p>
            </div>
            <Badge variant="outline">{member.certifications.length} Certs</Badge>
          </div>
          
          <div className="space-y-2">
            {member.certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">{cert.name}</span>
                  <p className="text-xs text-gray-600">Expires: {cert.expiry}</p>
                </div>
                {getCertificationBadge(cert)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Count and Notification Badges

```jsx
function CountNotificationBadges() {
  const [notifications, setNotifications] = useState({
    messages: 5,
    alerts: 2,
    inspections: 1,
    maintenance: 8,
    documents: 12
  });

  const clearNotification = (type) => {
    setNotifications(prev => ({ ...prev, [type]: 0 }));
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Notification Badges</h3>
      
      {/* Navigation with count badges */}
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-medium mb-3">Dashboard Navigation</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <span>Messages</span>
            <Badge variant="destructive" removable onRemove={() => clearNotification('messages')}>
              {notifications.messages}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <span>Safety Alerts</span>
            <Badge variant="warning" removable onRemove={() => clearNotification('alerts')}>
              {notifications.alerts}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <span>Pending Inspections</span>
            <Badge variant="info">
              {notifications.inspections}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <span>Maintenance Tasks</span>
            <Badge variant="warning">
              {notifications.maintenance}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <span>Documents to Review</span>
            <Badge variant="outline">
              {notifications.documents}
            </Badge>
          </div>
        </div>
      </div>

      {/* Priority indicators */}
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-medium mb-3">Priority Tasks</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Engine Room Inspection</span>
            <div className="flex gap-2">
              <Badge variant="destructive" size="sm">High Priority</Badge>
              <Badge variant="outline" size="sm">Due Today</Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Fuel Tank Cleaning</span>
            <div className="flex gap-2">
              <Badge variant="warning" size="sm">Medium Priority</Badge>
              <Badge variant="outline" size="sm">Due Mar 20</Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Inventory Count</span>
            <div className="flex gap-2">
              <Badge variant="success" size="sm">Low Priority</Badge>
              <Badge variant="outline" size="sm">Due Mar 25</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## TMSA Compliance Badges

```jsx
function TMSAComplianceBadges() {
  const tmsaElements = [
    { code: 'EL1', name: 'Management & Leadership', score: 92, status: 'compliant' },
    { code: 'EL2', name: 'Shore HR Management', score: 88, status: 'compliant' },
    { code: 'EL3', name: 'Crewing Management', score: 76, status: 'partial' },
    { code: 'EL4', name: 'Technical Management', score: 84, status: 'compliant' },
    { code: 'EL5', name: 'Navigation', score: 72, status: 'partial' },
    { code: 'EL6', name: 'Cargo Operations', score: 58, status: 'non-compliant' },
    { code: 'EL7', name: 'Management of Change', score: 0, status: 'not-assessed' }
  ];

  const getComplianceBadge = (element) => {
    const { status, score } = element;
    const badgeConfig = {
      compliant: { variant: 'success', text: `Compliant (${score}%)` },
      partial: { variant: 'warning', text: `Partial (${score}%)` },
      'non-compliant': { variant: 'destructive', text: `Non-Compliant (${score}%)` },
      'not-assessed': { variant: 'outline', text: 'Not Assessed' }
    };

    const config = badgeConfig[status] || badgeConfig['not-assessed'];
    
    return (
      <Badge variant={config.variant} size="sm">
        {config.text}
      </Badge>
    );
  };

  const overallScore = Math.round(
    tmsaElements.filter(e => e.status !== 'not-assessed')
      .reduce((sum, e) => sum + e.score, 0) / 
    tmsaElements.filter(e => e.status !== 'not-assessed').length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">TMSA Compliance Status</h3>
        <Badge variant={overallScore >= 85 ? 'success' : overallScore >= 70 ? 'warning' : 'destructive'} size="lg">
          Overall: {overallScore}%
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tmsaElements.map((element) => (
          <div key={element.code} className="bg-white border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" size="sm">{element.code}</Badge>
                </div>
                <h4 className="font-medium text-sm mb-2">{element.name}</h4>
              </div>
            </div>
            {getComplianceBadge(element)}
          </div>
        ))}
      </div>

      {/* Compliance Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Assessment Summary</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            {tmsaElements.filter(e => e.status === 'compliant').length} Compliant
          </Badge>
          <Badge variant="warning">
            {tmsaElements.filter(e => e.status === 'partial').length} Partial
          </Badge>
          <Badge variant="destructive">
            {tmsaElements.filter(e => e.status === 'non-compliant').length} Non-Compliant
          </Badge>
          <Badge variant="outline">
            {tmsaElements.filter(e => e.status === 'not-assessed').length} Not Assessed
          </Badge>
        </div>
      </div>
    </div>
  );
}
```

## Interactive and Removable Badges

```jsx
function InteractiveRemovableBadges() {
  const [selectedFilters, setSelectedFilters] = useState(['operational', 'tanker']);
  const [selectedPorts, setSelectedPorts] = useState(['rotterdam', 'hamburg', 'singapore']);
  const [crewSkills, setCrewSkills] = useState(['navigation', 'cargo-handling', 'maintenance', 'safety']);

  const removeFilter = (filter) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  const removePort = (port) => {
    setSelectedPorts(prev => prev.filter(p => p !== port));
  };

  const removeSkill = (skill) => {
    setCrewSkills(prev => prev.filter(s => s !== skill));
  };

  const filterLabels = {
    operational: 'Operational',
    maintenance: 'Maintenance',
    transit: 'In Transit',
    tanker: 'Tanker',
    container: 'Container Ship',
    bulk: 'Bulk Carrier'
  };

  const portLabels = {
    rotterdam: 'Rotterdam',
    hamburg: 'Hamburg',
    singapore: 'Singapore',
    antwerp: 'Antwerp',
    felixstowe: 'Felixstowe'
  };

  const skillLabels = {
    navigation: 'Navigation',
    'cargo-handling': 'Cargo Handling',
    maintenance: 'Maintenance',
    safety: 'Safety Training',
    leadership: 'Leadership',
    communication: 'Communication'
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Interactive Filter Badges</h3>
      
      {/* Active Filters */}
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-medium mb-3">Active Vessel Filters</h4>
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="info" 
              removable 
              onRemove={() => removeFilter(filter)}
            >
              {filterLabels[filter]}
            </Badge>
          ))}
          {selectedFilters.length === 0 && (
            <span className="text-gray-500 text-sm">No filters applied</span>
          )}
        </div>
      </div>

      {/* Selected Ports */}
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-medium mb-3">Selected Ports of Call</h4>
        <div className="flex flex-wrap gap-2">
          {selectedPorts.map((port) => (
            <Badge 
              key={port} 
              variant="outline" 
              removable 
              onRemove={() => removePort(port)}
            >
              {portLabels[port]}
            </Badge>
          ))}
          {selectedPorts.length === 0 && (
            <span className="text-gray-500 text-sm">No ports selected</span>
          )}
        </div>
      </div>

      {/* Crew Skills */}
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-medium mb-3">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {crewSkills.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              removable 
              onRemove={() => removeSkill(skill)}
              className="flex items-center gap-2"
            >
              <Award className="h-3 w-3" />
              {skillLabels[skill]}
            </Badge>
          ))}
          {crewSkills.length === 0 && (
            <span className="text-gray-500 text-sm">No skills specified</span>
          )}
        </div>
      </div>

      {/* Clear All Actions */}
      <div className="flex gap-2">
        <button 
          onClick={() => setSelectedFilters([])}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
          disabled={selectedFilters.length === 0}
        >
          Clear Filters
        </button>
        <button 
          onClick={() => setSelectedPorts([])}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
          disabled={selectedPorts.length === 0}
        >
          Clear Ports
        </button>
        <button 
          onClick={() => setCrewSkills([])}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
          disabled={crewSkills.length === 0}
        >
          Clear Skills
        </button>
      </div>
    </div>
  );
}
```

## Key Features
- **Maritime Status Indicators**: Color-coded badges for vessel and operational status
- **Certification Tracking**: Visual indicators for crew certifications and compliance
- **Count Display**: Numerical badges for notifications and counters
- **Interactive Elements**: Removable badges with click handlers
- **Icon Integration**: Support for Lucide React icons
- **Multiple Variants**: Success, warning, error, info, and outline styles
- **Size Options**: Small, medium, and large size variants
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Badge Variant Guidelines
- **Success**: Valid certifications, operational status, compliant ratings
- **Warning**: Expiring certificates, maintenance status, partial compliance
- **Destructive**: Expired documents, critical alerts, non-compliant status
- **Info**: Transit status, informational labels, neutral indicators
- **Outline**: Counts, categories, optional information
- **Secondary**: Skills, tags, classifications

## Best Practices
1. **Consistent Color Usage**: Use variant colors consistently across the application
2. **Meaningful Icons**: Include relevant icons for quick visual identification
3. **Clear Labels**: Use concise, descriptive text
4. **Interactive Feedback**: Provide hover states for clickable badges
5. **Removal Confirmation**: Consider confirmation for important removable badges
6. **Responsive Design**: Ensure badges work well on mobile devices
7. **Accessibility**: Include proper labels for screen readers

## Common Use Cases
- Vessel operational status indicators
- Crew certification status displays
- TMSA compliance tracking
- Notification counters
- Filter and tag management
- Priority and urgency indicators
- Category and classification labels
- Action item counters
- Progress and completion status
- Document and certificate validity