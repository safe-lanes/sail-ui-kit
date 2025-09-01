# Popover Component Guide

## Overview
The Popover component provides floating content containers for maritime applications. It supports tooltips, contextual menus, and detailed information displays optimized for TMSA-compliant fleet management interfaces.

## Component Interface

```typescript
interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface PopoverContentProps {
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  alignOffset?: number;
  children: React.ReactNode;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Flexible Positioning**: Automatic positioning with collision detection
- **Responsive Design**: Adapts to screen size and available space
- **Keyboard Navigation**: Full accessibility support
- **Rich Content**: Support for complex layouts and interactive elements

## Basic Usage

```tsx
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'scomp-ui/sail-ui-kit';

function VesselStatusPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#16569e] focus:ring-offset-2">
          <Ship className="h-4 w-4 mr-2" />
          MV Container 1
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#16569e]">MV Container 1</h3>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">IMO:</span>
              <span className="ml-1">9123456</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Flag:</span>
              <span className="ml-1">Panama</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Built:</span>
              <span className="ml-1">2018</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">DWT:</span>
              <span className="ml-1">75,000</span>
            </div>
          </div>
          <div className="pt-2">
            <button className="w-full bg-[#16569e] text-white px-4 py-2 rounded-md text-sm hover:bg-[#134a87] transition-colors">
              View Full Details
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Crew Information Popover

```tsx
interface CrewMember {
  id: string;
  name: string;
  rank: string;
  nationality: string;
  joinDate: string;
  contractEnd: string;
  certifications: string[];
  currentVessel: string;
  status: 'active' | 'leave' | 'standby';
}

function CrewMemberPopover({ crewMember }: { crewMember: CrewMember }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 text-left">
          <div className="h-8 w-8 bg-[#16569e] rounded-full flex items-center justify-center text-white text-sm font-medium">
            {crewMember.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{crewMember.name}</div>
            <div className="text-xs text-gray-500">{crewMember.rank}</div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-6" side="right" align="start">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#16569e]">{crewMember.name}</h3>
              <p className="text-sm text-gray-600">{crewMember.rank}</p>
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              crewMember.status === 'active' 
                ? 'bg-green-100 text-green-800'
                : crewMember.status === 'leave'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {crewMember.status}
            </span>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Nationality:</span>
              <span className="ml-1">{crewMember.nationality}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Current Vessel:</span>
              <span className="ml-1">{crewMember.currentVessel}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Join Date:</span>
              <span className="ml-1">{new Date(crewMember.joinDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Contract End:</span>
              <span className="ml-1">{new Date(crewMember.contractEnd).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Current Certifications</h4>
            <div className="flex flex-wrap gap-1">
              {crewMember.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <button className="flex-1 bg-[#16569e] text-white px-3 py-2 rounded-md text-sm hover:bg-[#134a87] transition-colors">
              View Profile
            </button>
            <button className="flex-1 border border-[#16569e] text-[#16569e] px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
              Start Appraisal
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Vessel Location Popover

```tsx
interface VesselLocation {
  vesselName: string;
  latitude: number;
  longitude: number;
  course: number;
  speed: number;
  destination: string;
  eta: string;
  lastUpdate: string;
}

function VesselLocationPopover({ vessel }: { vessel: VesselLocation }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <div className="h-6 w-6 bg-[#16569e] rounded-full border-2 border-white shadow-lg animate-pulse" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border border-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="top" align="center">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#16569e]">{vessel.vesselName}</h3>
            <div className="flex items-center text-green-600">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
              <span className="text-sm font-medium">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Position:</span>
              <div className="text-xs font-mono mt-1">
                {vessel.latitude.toFixed(4)}°N<br />
                {vessel.longitude.toFixed(4)}°E
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Course/Speed:</span>
              <div className="mt-1">
                {vessel.course}° / {vessel.speed} kts
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Destination:</span>
              <div className="mt-1">{vessel.destination}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">ETA:</span>
              <div className="mt-1">{new Date(vessel.eta).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="text-xs text-gray-500 border-t pt-2">
            Last updated: {new Date(vessel.lastUpdate).toLocaleTimeString()}
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 bg-[#16569e] text-white px-3 py-2 rounded-md text-sm hover:bg-[#134a87] transition-colors">
              Track Vessel
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Certificate Status Popover

```tsx
interface Certificate {
  name: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  renewalRequired: boolean;
}

function CertificateStatusPopover({ certificate }: { certificate: Certificate }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysToExpiry = () => {
    const expiry = new Date(certificate.expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 border border-gray-200">
          <FileText className="h-4 w-4 text-[#16569e]" />
          <span className="text-sm font-medium">{certificate.name}</span>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(certificate.status)}`}>
            {certificate.status}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-[#16569e]">{certificate.name}</h3>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(certificate.status)}`}>
              {certificate.status.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Issue Date:</span>
              <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Expiry Date:</span>
              <span>{new Date(certificate.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Days Remaining:</span>
              <span className={getDaysToExpiry() <= 30 ? 'text-red-600 font-medium' : 'text-gray-900'}>
                {getDaysToExpiry()} days
              </span>
            </div>
          </div>

          {certificate.renewalRequired && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-800">
                    Renewal Required
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    This certificate requires renewal within the next 60 days.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <button className="flex-1 bg-[#16569e] text-white px-3 py-2 rounded-md text-sm hover:bg-[#134a87] transition-colors">
              View Certificate
            </button>
            <button className="flex-1 border border-[#16569e] text-[#16569e] px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
              Renew
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Quick Actions Popover

```tsx
function QuickActionsPopover() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Ship, label: 'Add New Vessel', href: '/fleet/add' },
    { icon: Users, label: 'Register Crew Member', href: '/crew/add' },
    { icon: FileText, label: 'Create Incident Report', href: '/incidents/new' },
    { icon: Calendar, label: 'Schedule Maintenance', href: '/maintenance/schedule' },
    { icon: AlertTriangle, label: 'Emergency Contact', href: '/emergency' },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#16569e] text-white hover:bg-[#134a87] focus:outline-none focus:ring-2 focus:ring-[#16569e] focus:ring-offset-2 transition-colors">
          <Plus className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end" side="bottom">
        <div className="space-y-1">
          <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b border-gray-200">
            Quick Actions
          </div>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                console.log(`Navigate to ${action.href}`);
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <action.icon className="h-4 w-4 text-[#16569e]" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Controlled Popover with Form

```tsx
function IncidentReportPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    severity: '',
    description: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Incident reported:', formData);
    setIsOpen(false);
    setFormData({ severity: '', description: '', location: '' });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Report Incident
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4" align="start">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Incident Report</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Severity Level
            </label>
            <select
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#16569e] focus:ring-[#16569e]"
              required
            >
              <option value="">Select severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#16569e] focus:ring-[#16569e]"
              placeholder="Bridge, Engine Room, Deck..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-[#16569e] focus:ring-[#16569e]"
              placeholder="Brief description of the incident..."
              required
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
            >
              Submit Report
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
```

## Best Practices

1. **Content Hierarchy**: Use clear visual hierarchy in popover content
2. **Positioning**: Let the component handle automatic positioning
3. **Mobile Consideration**: Ensure popovers work well on touch devices
4. **Performance**: Avoid complex content that slows down rendering
5. **Accessibility**: Provide proper keyboard navigation and focus management
6. **Maritime Theme**: Maintain consistent TMSA-compliant styling

## Context Requirements

The Popover component works with:
- **Positioning System**: Automatic collision detection and positioning
- **Focus Management**: Proper focus trapping and restoration
- **Event Handling**: Click outside and escape key handling
- **Theme Context**: Maritime color scheme and styling

## Troubleshooting

### Common Issues

**Popover not positioning correctly**
```tsx
// Ensure proper container setup and avoid overflow hidden
<div className="relative overflow-visible">
  <Popover>
    <PopoverContent side="top" align="start">
      {/* content */}
    </PopoverContent>
  </Popover>
</div>
```

**Touch events not working on mobile**
```tsx
// Use asChild pattern for proper event delegation
<PopoverTrigger asChild>
  <button className="touch-manipulation">
    Trigger
  </button>
</PopoverTrigger>
```

**Content overflow issues**
```tsx
// Set appropriate max dimensions
<PopoverContent className="w-80 max-h-96 overflow-y-auto">
  {/* scrollable content */}
</PopoverContent>
```