# Sheet Component Guide

## Overview
The Sheet component provides slide-out panels for maritime applications. It creates overlay interfaces for crew details, vessel information, and form dialogs optimized for TMSA-compliant fleet management systems.

## Component Interface

```typescript
interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface SheetContentProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  children: React.ReactNode;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Multiple Positions**: Slide from top, bottom, left, or right
- **Responsive Design**: Adapts to mobile and desktop layouts
- **Overlay Management**: Proper z-index and backdrop handling
- **Accessibility**: Focus management and keyboard navigation

## Basic Usage

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from 'scomp-ui/sail-ui-kit';

function CrewMemberDetails() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="inline-flex items-center px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
          <Users className="h-4 w-4 mr-2" />
          View Crew Member
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-[#16569e]">Crew Member Profile</SheetTitle>
          <SheetDescription>
            Complete crew member information and certification status
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Profile Information */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-[#16569e] rounded-full flex items-center justify-center text-white text-xl font-bold">
              JS
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">John Smith</h3>
              <p className="text-sm text-gray-600">Captain • Employee ID: EMP001</p>
              <p className="text-sm text-gray-500">Joined: January 15, 2020</p>
            </div>
          </div>
          
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <div className="text-sm text-gray-900">Filipino</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Vessel
              </label>
              <div className="text-sm text-gray-900">MV Container 1</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contract Start
              </label>
              <div className="text-sm text-gray-900">March 1, 2024</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contract End
              </label>
              <div className="text-sm text-gray-900">August 31, 2024</div>
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Current Certifications</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">STCW Certificate</div>
                  <div className="text-xs text-gray-500">Expires: Jan 15, 2028</div>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Valid
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">Medical Certificate</div>
                  <div className="text-xs text-gray-500">Expires: Jun 1, 2024</div>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Expiring
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Close
            </button>
          </SheetClose>
          <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
            Edit Profile
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Vessel Information Sheet

```tsx
interface VesselData {
  name: string;
  imo: string;
  type: string;
  flag: string;
  built: number;
  dwt: number;
  location: {
    latitude: number;
    longitude: number;
    port: string;
  };
  status: 'active' | 'maintenance' | 'laid-up';
  crew: number;
  nextPort: string;
  eta: string;
}

function VesselInformationSheet() {
  const vessel: VesselData = {
    name: "MV Container Express",
    imo: "9123456",
    type: "Container Ship",
    flag: "Panama",
    built: 2018,
    dwt: 75000,
    location: {
      latitude: 35.6762,
      longitude: 139.6503,
      port: "Tokyo Bay"
    },
    status: "active",
    crew: 24,
    nextPort: "Singapore",
    eta: "2024-02-15T08:00:00Z"
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#16569e]">{vessel.name}</h3>
              <p className="text-sm text-gray-600">{vessel.type} • {vessel.flag}</p>
            </div>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              {vessel.status}
            </span>
          </div>
        </div>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-[#16569e]">{vessel.name}</SheetTitle>
          <SheetDescription>
            Detailed vessel information and current operational status
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-8">
          {/* Vessel Specifications */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vessel Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">IMO Number</div>
                  <div className="text-base text-gray-900">{vessel.imo}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Vessel Type</div>
                  <div className="text-base text-gray-900">{vessel.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Flag State</div>
                  <div className="text-base text-gray-900">{vessel.flag}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Year Built</div>
                  <div className="text-base text-gray-900">{vessel.built}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Deadweight</div>
                  <div className="text-base text-gray-900">{vessel.dwt.toLocaleString()} MT</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Crew Size</div>
                  <div className="text-base text-gray-900">{vessel.crew} members</div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Current Position */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Position</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-[#16569e]" />
                <span className="font-medium text-[#16569e]">{vessel.location.port}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Latitude:</span>
                  <span className="ml-2 font-mono">{vessel.location.latitude}°N</span>
                </div>
                <div>
                  <span className="text-gray-600">Longitude:</span>
                  <span className="ml-2 font-mono">{vessel.location.longitude}°E</span>
                </div>
              </div>
              <button className="mt-3 text-sm text-[#16569e] hover:underline">
                View on Map
              </button>
            </div>
          </section>
          
          {/* Voyage Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Voyage</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">Next Port</div>
                  <div className="text-lg text-[#16569e]">{vessel.nextPort}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">ETA</div>
                  <div className="text-sm text-gray-600">
                    {new Date(vessel.eta).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(vessel.eta).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Recent Activities */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {[
                { event: "Departed Tokyo Bay", time: "2 hours ago", type: "departure" },
                { event: "Cargo loading completed", time: "6 hours ago", type: "cargo" },
                { event: "Port State Control inspection", time: "1 day ago", type: "inspection" },
                { event: "Crew change completed", time: "2 days ago", type: "crew" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-[#16569e] rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{activity.event}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Alerts & Issues */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Issues</h3>
            <div className="space-y-2">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">All Systems Normal</span>
                </div>
                <div className="text-sm text-green-700 mt-1">
                  No critical issues reported
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <SheetFooter className="space-x-2">
          <SheetClose asChild>
            <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Close
            </button>
          </SheetClose>
          <button className="flex-1 px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
            Track Vessel
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Bottom Sheet for Mobile Forms

```tsx
function IncidentReportBottomSheet() {
  const [formData, setFormData] = useState({
    severity: '',
    location: '',
    description: '',
    reportedBy: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Incident reported:', formData);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors">
          <AlertTriangle className="h-5 w-5 mr-2 inline" />
          Report Emergency Incident
        </button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[90vh]">
        <SheetHeader>
          <SheetTitle className="text-red-600">Emergency Incident Report</SheetTitle>
          <SheetDescription>
            Provide details about the emergency incident for immediate response
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="py-6 space-y-6">
          {/* Severity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity Level *
            </label>
            <select
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
              required
            >
              <option value="">Select severity</option>
              <option value="low">Low - Minor incident</option>
              <option value="medium">Medium - Requires attention</option>
              <option value="high">High - Immediate action needed</option>
              <option value="critical">Critical - Emergency response</option>
            </select>
          </div>
          
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Bridge, Engine Room, Deck, etc."
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Incident Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Describe what happened, any injuries, and immediate actions taken..."
              required
            />
          </div>
          
          {/* Reported By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reported By *
            </label>
            <input
              type="text"
              value={formData.reportedBy}
              onChange={(e) => setFormData({...formData, reportedBy: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Your name and position"
              required
            />
          </div>
          
          {/* Emergency Contacts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-red-800 mb-2">Emergency Contacts</h4>
            <div className="text-sm text-red-700 space-y-1">
              <div>Coast Guard: +1-800-123-4567</div>
              <div>Fleet Emergency: +1-800-987-6543</div>
              <div>Medical Emergency: +1-800-555-0123</div>
            </div>
          </div>
        </form>
        
        <SheetFooter className="space-x-2">
          <SheetClose asChild>
            <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </SheetClose>
          <button
            type="submit"
            form="incident-form"
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Submit Emergency Report
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Left Sidebar Sheet

```tsx
function FleetFiltersSheet() {
  const [filters, setFilters] = useState({
    vesselType: '',
    flag: '',
    status: '',
    ageRange: [0, 20],
    dwtRange: [0, 200000]
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4 mr-2" />
          Filter Fleet
        </button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-[#16569e]">Fleet Filters</SheetTitle>
          <SheetDescription>
            Filter vessels by specifications and operational status
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Vessel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vessel Type
            </label>
            <select
              value={filters.vesselType}
              onChange={(e) => setFilters({...filters, vesselType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="">All Types</option>
              <option value="container">Container Ship</option>
              <option value="tanker">Oil Tanker</option>
              <option value="bulk">Bulk Carrier</option>
              <option value="general">General Cargo</option>
            </select>
          </div>
          
          {/* Flag State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flag State
            </label>
            <select
              value={filters.flag}
              onChange={(e) => setFilters({...filters, flag: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="">All Flags</option>
              <option value="panama">Panama</option>
              <option value="liberia">Liberia</option>
              <option value="marshall">Marshall Islands</option>
              <option value="singapore">Singapore</option>
            </select>
          </div>
          
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operational Status
            </label>
            <div className="space-y-2">
              {['active', 'maintenance', 'laid-up', 'charter'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#16569e] focus:ring-[#16569e]"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Vessel Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vessel Age (Years)
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="30"
                value={filters.ageRange[1]}
                onChange={(e) => setFilters({
                  ...filters, 
                  ageRange: [filters.ageRange[0], parseInt(e.target.value)]
                })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0 years</span>
                <span>{filters.ageRange[1]} years</span>
              </div>
            </div>
          </div>
          
          {/* DWT Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadweight (MT)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min DWT"
                className="px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
              <input
                type="number"
                placeholder="Max DWT"
                className="px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>
          </div>
        </div>
        
        <SheetFooter className="space-x-2">
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Clear All
          </button>
          <SheetClose asChild>
            <button className="flex-1 px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
              Apply Filters
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Top Sheet for Notifications

```tsx
function NotificationSheet() {
  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Engine Malfunction Alert',
      message: 'MV Container 2 reports main engine issues',
      time: '2 minutes ago',
      vessel: 'MV Container 2'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Certificate Expiring',
      message: 'STCW certificate expires in 30 days',
      time: '1 hour ago',
      vessel: 'John Smith - Captain'
    },
    {
      id: 3,
      type: 'info',
      title: 'Port Call Update',
      message: 'ETA updated for Singapore arrival',
      time: '3 hours ago',
      vessel: 'MV Tanker 1'
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-100 border-blue-200 text-blue-800';
      default: return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 text-gray-600 hover:text-[#16569e] transition-colors">
          <Bell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </SheetTrigger>
      
      <SheetContent side="top" className="h-[400px]">
        <SheetHeader>
          <SheetTitle className="text-[#16569e]">Fleet Notifications</SheetTitle>
          <SheetDescription>
            Recent alerts and updates from your fleet operations
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`border rounded-lg p-4 ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <p className="text-sm mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs">{notification.vessel}</span>
                      <span className="text-xs">{notification.time}</span>
                    </div>
                  </div>
                  <button className="text-xs hover:underline ml-4">
                    Mark Read
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full text-sm text-[#16569e] hover:underline">
              View All Notifications
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

## Best Practices

1. **Content Organization**: Structure sheet content with clear headers and sections
2. **Mobile Optimization**: Use bottom sheets for mobile form interactions
3. **Loading States**: Show loading indicators for dynamic content
4. **Keyboard Navigation**: Ensure proper focus management and escape handling
5. **Maritime Context**: Use consistent TMSA-compliant styling and terminology
6. **Performance**: Lazy load sheet content when possible

## Context Requirements

The Sheet component works with:
- **Overlay Management**: Proper z-index and backdrop handling
- **Focus Management**: Trap focus within sheets and restore properly
- **Theme Context**: Maritime color scheme and styling
- **Responsive Framework**: Mobile and desktop layout considerations

## Troubleshooting

### Common Issues

**Sheet not opening on mobile**
```tsx
// Ensure proper touch event handling
<SheetTrigger asChild>
  <button className="touch-manipulation">
    Open Sheet
  </button>
</SheetTrigger>
```

**Content overflow issues**
```tsx
// Use proper scrolling for long content
<SheetContent className="overflow-y-auto">
  <div className="max-h-full">
    {/* content */}
  </div>
</SheetContent>
```

**Focus management problems**
```tsx
// Ensure proper focus restoration
<Sheet onOpenChange={(open) => {
  if (!open) {
    // Focus restoration logic
  }
}}>
  {/* sheet content */}
</Sheet>
```