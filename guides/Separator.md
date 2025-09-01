# Separator Component Guide

## Overview
The Separator component provides visual division elements for maritime applications. It creates clear sections and hierarchy in TMSA-compliant interfaces for crew appraisals, vessel documentation, and operational dashboards.

## Component Interface

```typescript
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue accents
- **Flexible Orientation**: Horizontal and vertical separators
- **Accessibility**: Proper ARIA attributes for semantic separation
- **Visual Hierarchy**: Clear section divisions for complex forms
- **Responsive Design**: Adapts to different screen sizes

## Basic Usage

```tsx
import { Separator } from 'scomp-ui/sail-ui-kit';

function CrewAppraisalForm() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#16569e] mb-2">
        Crew Performance Appraisal
      </h1>
      <p className="text-gray-600 mb-6">
        Annual performance evaluation for maritime crew members
      </p>
      
      <Separator className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crew Member Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rank/Position
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]">
            <option>Select rank</option>
            <option>Captain</option>
            <option>First Officer</option>
            <option>Chief Engineer</option>
          </select>
        </div>
      </div>
      
      <Separator className="mb-6" />
      
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-[#16569e] mb-4">
            Part A - Leadership Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leadership Skills (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Communication Skills (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-lg font-semibold text-[#16569e] mb-4">
            Part B - Technical Competency
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technical Knowledge (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Safety Awareness (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
```

## Vessel Information Dashboard

```tsx
interface VesselInfo {
  name: string;
  imo: string;
  flag: string;
  built: number;
  dwt: number;
  location: string;
  status: string;
}

function VesselInfoDashboard() {
  const vessel: VesselInfo = {
    name: "MV Container Express",
    imo: "9123456",
    flag: "Panama",
    built: 2018,
    dwt: 75000,
    location: "Singapore",
    status: "Active"
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header Section */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#16569e] mb-2">
            {vessel.name}
          </h1>
          <p className="text-gray-600">
            Container vessel currently operating in Asian waters
          </p>
        </div>
        
        <Separator />
        
        {/* Basic Information */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Vessel Specifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-500">IMO Number</div>
              <div className="text-lg font-semibold text-gray-900">{vessel.imo}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Flag State</div>
              <div className="text-lg font-semibold text-gray-900">{vessel.flag}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Year Built</div>
              <div className="text-lg font-semibold text-gray-900">{vessel.built}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">DWT</div>
              <div className="text-lg font-semibold text-gray-900">{vessel.dwt.toLocaleString()} MT</div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Current Status */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Current Status
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Status: {vessel.status}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Last update: {new Date().toLocaleString()}
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-gray-900">Current Location</div>
            <div className="text-lg text-[#16569e]">{vessel.location}</div>
          </div>
        </div>
        
        <Separator />
        
        {/* Actions */}
        <div className="p-6">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
              Track Vessel
            </button>
            <button className="px-4 py-2 border border-[#16569e] text-[#16569e] rounded-md hover:bg-blue-50 transition-colors">
              View Documents
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Vertical Separator Layout

```tsx
function FleetOperationsLayout() {
  return (
    <div className="h-screen bg-gray-100">
      <div className="h-full flex">
        {/* Left Panel */}
        <div className="w-64 bg-white p-6">
          <h2 className="text-lg font-semibold text-[#16569e] mb-4">
            Fleet Overview
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#16569e]">24</div>
              <div className="text-sm text-gray-600">Active Vessels</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-gray-600">On Schedule</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <div className="text-sm text-gray-600">Delayed</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-gray-600">In Maintenance</div>
            </div>
          </div>
        </div>
        
        <Separator orientation="vertical" className="h-full" />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-[#16569e] mb-6">
            Real-time Fleet Monitoring
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vessel Locations
              </h3>
              <div className="h-64 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[#16569e] mx-auto mb-2" />
                  <div className="text-gray-600">Interactive Map View</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activities
              </h3>
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-[#16569e] rounded-full"></div>
                    <div className="text-sm text-gray-700">
                      MV Container {i + 1} departed from Singapore
                    </div>
                    <div className="text-xs text-gray-500">
                      {i + 1}h ago
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Separator orientation="vertical" className="h-full" />
        
        {/* Right Panel */}
        <div className="w-80 bg-white p-6">
          <h2 className="text-lg font-semibold text-[#16569e] mb-4">
            Alerts & Notifications
          </h2>
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div className="text-sm font-medium text-red-800">
                  Critical Alert
                </div>
              </div>
              <div className="text-sm text-red-700 mt-1">
                MV Tanker 2 reports engine malfunction
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div className="text-sm font-medium text-yellow-800">
                  Schedule Update
                </div>
              </div>
              <div className="text-sm text-yellow-700 mt-1">
                MV Container 3 delayed by 2 hours
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-600" />
                <div className="text-sm font-medium text-blue-800">
                  Information
                </div>
              </div>
              <div className="text-sm text-blue-700 mt-1">
                Weather update for Pacific route
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Certificate Management Sections

```tsx
interface Certificate {
  name: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
}

function CertificateManagementForm() {
  const certificates: Certificate[] = [
    { name: "STCW Certificate", issueDate: "2023-01-15", expiryDate: "2028-01-15", status: "valid" },
    { name: "Medical Certificate", issueDate: "2023-06-01", expiryDate: "2024-06-01", status: "expiring" },
    { name: "Flag State Certificate", issueDate: "2022-03-10", expiryDate: "2024-03-10", status: "valid" }
  ];

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#16569e] mb-6">
        Crew Certification Management
      </h1>
      
      {/* Personal Information */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              defaultValue="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              defaultValue="Filipino"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seaman's Book Number
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              defaultValue="SB123456789"
            />
          </div>
        </div>
      </section>
      
      <Separator className="my-8" />
      
      {/* Current Certificates */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Current Certificates
          </h2>
          <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
            Add Certificate
          </button>
        </div>
        
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium text-gray-900">
                  {cert.name}
                </h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cert.status)}`}>
                  {cert.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Issue Date:</span>
                  <span className="ml-2">{new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Expiry Date:</span>
                  <span className="ml-2">{new Date(cert.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-sm text-[#16569e] hover:underline">
                  View Details
                </button>
                <button className="text-sm text-[#16569e] hover:underline">
                  Renew
                </button>
                <button className="text-sm text-gray-500 hover:underline">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Separator className="my-8" />
      
      {/* Renewal Reminders */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Renewal Reminders
        </h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">
              Upcoming Renewals
            </span>
          </div>
          <p className="text-sm text-yellow-700">
            Your Medical Certificate expires in 45 days. Please initiate the renewal process.
          </p>
          <button className="mt-2 text-sm text-yellow-800 hover:underline">
            Schedule Renewal
          </button>
        </div>
      </section>
    </div>
  );
}
```

## Menu Separators

```tsx
function NavigationMenuWithSeparators() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <nav className="p-4">
        <div className="space-y-1">
          <a href="/fleet" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <Ship className="h-4 w-4" />
            <span>Fleet Management</span>
          </a>
          <a href="/crew" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <Users className="h-4 w-4" />
            <span>Crew Operations</span>
          </a>
          
          <Separator className="my-2" />
          
          <a href="/safety" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <Shield className="h-4 w-4" />
            <span>Safety & Compliance</span>
          </a>
          <a href="/maintenance" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <Settings className="h-4 w-4" />
            <span>Maintenance</span>
          </a>
          
          <Separator className="my-2" />
          
          <a href="/reports" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <BarChart className="h-4 w-4" />
            <span>Reports & Analytics</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <Cog className="h-4 w-4" />
            <span>System Settings</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
```

## Custom Separator Styles

```tsx
function CustomSeparatorStyles() {
  return (
    <div className="space-y-8 p-6">
      {/* Default Separator */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Default Separator</h3>
        <Separator />
      </div>
      
      {/* Maritime Blue Separator */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Maritime Blue Separator</h3>
        <Separator className="bg-[#16569e] h-0.5" />
      </div>
      
      {/* Dashed Separator */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashed Separator</h3>
        <Separator className="border-dashed border-t border-gray-300 bg-transparent h-0" />
      </div>
      
      {/* Thick Separator */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thick Separator</h3>
        <Separator className="bg-gray-300 h-1" />
      </div>
      
      {/* Gradient Separator */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gradient Separator</h3>
        <Separator className="bg-gradient-to-r from-transparent via-[#16569e] to-transparent h-0.5" />
      </div>
    </div>
  );
}
```

## Best Practices

1. **Semantic Use**: Use separators to create logical content divisions
2. **Consistent Spacing**: Maintain consistent margins around separators
3. **Visual Hierarchy**: Use separator thickness to indicate importance
4. **Accessibility**: Ensure separators are properly marked as decorative
5. **Maritime Context**: Use maritime blue theme for important separations
6. **Responsive Design**: Test separator appearance across screen sizes

## Context Requirements

The Separator component works with:
- **Layout Systems**: Integration with form and dashboard layouts
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Proper semantic markup for screen readers
- **Responsive Framework**: Adaptive behavior across devices

## Troubleshooting

### Common Issues

**Separator not visible**
```tsx
// Ensure proper background color and height
<Separator className="bg-gray-200 h-px" />
```

**Vertical separator not working**
```tsx
// Ensure container has proper height for vertical separators
<div className="flex h-64">
  <div className="flex-1">Content 1</div>
  <Separator orientation="vertical" className="mx-4" />
  <div className="flex-1">Content 2</div>
</div>
```

**Accessibility warnings**
```tsx
// Use decorative prop for purely visual separators
<Separator decorative className="my-4" />

// For semantic separators, ensure proper context
<section>
  <h2>Section 1</h2>
  <Separator role="separator" aria-label="End of section 1" />
</section>
```