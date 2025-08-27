# sail-ui-kit

Maritime UI Components and Shared Foundation for SAIL Phase 2 TMSA Modules

## Overview

`sail-ui-kit` is a comprehensive NPM package that provides all the necessary components, services, and utilities for building TMSA (Tanker Management Self Assessment) modules in the SAIL Phase 2 maritime ERP system. It serves as the shared foundation across all microfrontend applications.

## Features

### 🚢 Complete Maritime UI Library
- **Standard UI Components**: All shadcn/ui components (buttons, inputs, cards, dialogs, etc.)
- **Maritime-Specific Components**: Vessel status indicators, safety badges, TMSA compliance indicators
- **Consistent Styling**: Maritime-themed design with professional blue color scheme
- **Responsive Design**: Mobile-friendly components and layouts

### 🔐 RBAC System
- **Role-Based Access Control**: Complete permission and role management
- **Authentication**: User login/logout with token management  
- **Permission Guards**: Protect routes and components based on permissions
- **RBAC Management UI**: Admin interfaces for managing users, roles, and permissions

### 🔄 Shared Services
- **API Service**: Centralized HTTP client with authentication
- **Personnel Service**: Crew and staff management across vessels
- **Vessel Service**: Fleet management and vessel operations
- **Data Transformers**: Common utilities for formatting dates, numbers, currencies

### 📱 Complete Layout System
- **TMSAAppLayout**: Complete application wrapper with navigation
- **Top Navigation**: Module switcher, notifications, user menu
- **Left Sidebar**: Module-specific navigation with maritime styling
- **Responsive Design**: Mobile and desktop optimized

## Installation

```bash
npm install sail-ui-kit
```

## Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

## Quick Start

### 1. Basic TMSA Module Setup

```jsx
import React from 'react';
import { 
  TMSAAppLayout, 
  Button, 
  Card, 
  CardContent,
  usePermissions 
} from 'sail-ui-kit';

function TechnicalModule() {
  const { can } = usePermissions();

  const menuItems = [
    {
      id: 'maintenance',
      label: 'Maintenance',
      path: '/maintenance',
      icon: <WrenchIcon />,
      isActive: true
    },
    {
      id: 'inspections', 
      label: 'Inspections',
      path: '/inspections',
      icon: <ClipboardIcon />,
      count: 5
    }
  ];

  return (
    <TMSAAppLayout
      moduleName="Technical Management"
      menuItems={menuItems}
      currentModule="technical"
    >
      <Card>
        <CardContent>
          <h2>Technical Module Dashboard</h2>
          {can('vessels', 'update') && (
            <Button className="bg-[#5DADE2]">
              Update Vessel Status
            </Button>
          )}
        </CardContent>
      </Card>
    </TMSAAppLayout>
  );
}
```

### 2. Using Maritime Components

```jsx
import { 
  VesselStatusIndicator,
  SafetyRatingBadge,
  TMSAComplianceIndicator 
} from 'sail-ui-kit';

function MaritimeComponents() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <VesselStatusIndicator 
        vessel={{
          name: "MV Atlantic Star",
          vesselType: "Oil Tanker",
          status: { status: "active", location: "Port of Rotterdam" }
        }}
        size="md"
        showDetails={true}
      />
      
      <SafetyRatingBadge 
        rating={4}
        type="vessel"
        showDetails={true}
      />
      
      <TMSAComplianceIndicator 
        element="EL4"
        status="compliant"
        score={95}
      />
    </div>
  );
}
```

### 3. Using Services

```jsx
import { useApi, SHARED_SERVICES } from 'sail-ui-kit';

function VesselList() {
  const { data: vessels, loading } = useApi('/vessels');
  
  const handleUpdateStatus = async (vesselId, status) => {
    await SHARED_SERVICES.vessel.updateVesselStatus(vesselId, status);
  };

  if (loading) return <div>Loading vessels...</div>;

  return (
    <div>
      {vessels?.map(vessel => (
        <div key={vessel.id}>
          {vessel.name} - {vessel.status}
        </div>
      ))}
    </div>
  );
}
```

### 4. Using RBAC

```jsx
import { 
  RBACProvider, 
  ProtectedRoute, 
  PermissionGuard,
  useRBAC 
} from 'sail-ui-kit';

function App() {
  return (
    <RBACProvider>
      <TMSAAppLayout moduleName="Fleet Management" menuItems={[]}>
        <ProtectedRoute permission="vessels.read">
          <VesselDashboard />
        </ProtectedRoute>
        
        <PermissionGuard resource="vessels" action="create">
          <Button>Create New Vessel</Button>
        </PermissionGuard>
      </TMSAAppLayout>
    </RBACProvider>
  );
}

function LoginForm() {
  const { login } = useRBAC();
  
  const handleLogin = async (username, password) => {
    const result = await login(username, password);
    if (result.success) {
      // Navigate to dashboard
    }
  };
}
```

## SAIL Form Components

The package includes a standardized "SAIL Form" system based on the Crew Appraisal Form pattern, designed for reuse across different maritime applications.

### Features

- **📱 Responsive Design**: Optimized for both desktop and mobile devices with adaptive modal sizing
- **🔄 Functional Stepper Navigation**: Click-to-navigate between form sections with visual feedback
- **🎨 Maritime Theme**: Professional blue color scheme (#4A90E2) matching maritime industry standards
- **🖼️ Popup Modal Design**: Full-screen popup with proper overlay, shadows, and card-based content
- **📝 Complete Form Templates**: Ready-to-use Seafarer Information and Appraisal Period sections
- **📊 Interactive Tables**: Built-in training and target setting tables with add/edit/delete functionality
- **💾 Auto-save Support**: Built-in save draft and submit functionality with proper button styling
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🔧 TypeScript**: Complete type safety and IntelliSense support
- **🎯 Maritime-Specific Fields**: Pre-built fields for ranks, vessels, nationalities, and appraisal types

### Quick Start - Complete Crew Appraisal Form Example

```tsx
import React from 'react';
import { ExampleSAILForm } from 'sail-ui-kit';
import { useForm } from 'react-hook-form';

const MyCrewAppraisalForm = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleSave = (data) => {
    console.log('Saving form data:', data);
  };
  
  const handleSubmit = (data) => {
    console.log('Submitting form:', data);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Crew Appraisal Form
      </Button>
      
      <ExampleSAILForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
```

### Custom SAIL Form Implementation

```tsx
import { SAILForm, Label, Input, Select, Button } from 'sail-ui-kit';

const CustomMaritimeForm = () => {
  const sections = [
    {
      id: 'seafarer-info',
      title: "Part A: Seafarer's Information",
      description: 'Enter details as applicable',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Seafarer's Name</Label>
              <Input className="bg-white border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Rank</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select rank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="chief-officer">Chief Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Nationality</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select nationality..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="british">British</SelectItem>
                  <SelectItem value="filipino">Filipino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <SAILForm
      title="Crew Appraisal Form"
      sections={sections}
      isOpen={true}
      onClose={() => console.log('Close')}
      onSave={() => console.log('Save')}
      onSubmit={() => console.log('Submit')}
      saveButtonText="Save Draft"
      submitButtonText="Submit"
    />
  );
};
```

### SAIL Form Components

#### SAILForm
Main form container with functional stepper navigation and proper popup modal styling.

**Props:**
- `title: string` - Form title shown in header
- `sections: SAILFormSection[]` - Array of form sections with clickable navigation
- `isOpen: boolean` - Controls form visibility
- `onClose: () => void` - Close handler
- `onSave?: () => void` - Save draft handler (triggers blue button)
- `onSubmit?: () => void` - Submit handler (triggers green button)
- `showSaveButton?: boolean` - Show/hide save button (default: true)
- `showSubmitButton?: boolean` - Show/hide submit button (default: true)
- `saveButtonText?: string` - Custom save button text (default: "Save Draft")
- `submitButtonText?: string` - Custom submit button text (default: "Submit")
- `initialSection?: string` - Initial section to show
- `className?: string` - Additional CSS classes

**Visual Features:**
- Semi-transparent black overlay background
- Rounded modal with shadow effects
- Left sidebar stepper with connecting lines
- Active section highlighting in maritime blue (#4A90E2)
- White content cards with proper spacing
- Hover effects on clickable sections

#### SAILFormField
Standardized form field with consistent styling and validation.

**Supported Types:**
- `text`, `email`, `password`, `number`, `date`
- `textarea` with configurable rows
- `select` with options array
- `radio` with options array
- `checkbox`

#### SAILFormGrid
Responsive grid layout for form fields.

**Props:**
- `columns?: 1 | 2 | 3 | 4 | 6` - Number of columns
- `gap?: 2 | 3 | 4 | 6 | 8` - Grid gap size

#### SAILTable
Interactive table for data entry with add/edit/delete functionality.

**Features:**
- Configurable columns with different input types
- Row actions (add, edit, delete)
- Optional comment system
- Responsive design

#### SAILFormSectionComponent
Section wrapper with optional title and description.

### Advanced SAIL Form Usage

```tsx
// Complete Section B Implementation with Training and Target Tables
const sectionBContent = (
  <div className="space-y-8">
    {/* B1. Trainings Section */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#4A90E2]">
          B1. Trainings conducted prior joining vessel (To Assess Effectiveness)
        </h3>
        <Button variant="outline" className="text-[#4A90E2] border-[#4A90E2]">
          + Add Training
        </Button>
      </div>
      
      {/* Table Header */}
      <div className="bg-gray-50 border border-gray-200 rounded-t">
        <div className="grid grid-cols-4 gap-4 p-3 text-sm font-medium text-gray-700">
          <div>S.No</div>
          <div>Training</div>
          <div>Evaluation</div>
          <div>Actions</div>
        </div>
      </div>
      
      {/* Empty State */}
      <div className="border border-gray-200 border-t-0 rounded-b bg-white p-8 text-center">
        <p className="text-gray-500">No trainings added yet. Click "Add Training" to get started.</p>
      </div>
    </div>

    {/* B2. Target Setting Section */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[#4A90E2]">B2. Target Setting</h3>
        <Button variant="outline" className="text-[#4A90E2] border-[#4A90E2]">
          + Add Target
        </Button>
      </div>
      
      {/* Table with same structure as above */}
    </div>
    
    {/* Action Buttons */}
    <div className="flex justify-end gap-3 mt-8">
      <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-6">
        Save
      </Button>
      <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
        Submit
      </Button>
    </div>
  </div>
);

// Multiple sections with functional navigation
const sections = [
  {
    id: 'seafarer-info',
    title: "Part A: Seafarer's Information",
    description: 'Enter details as applicable',
    content: sectionAContent
  },
  {
    id: 'appraisal-start-info', 
    title: 'Part B: Information at Start of Appraisal Period',
    description: 'Add below at the start of the Appraisal Period except the Evaluation which must be completed at the end of the Appraisal Period',
    content: sectionBContent
  }
];
```

### Ready-to-Use Example Component

The package includes `ExampleSAILForm` which provides a complete implementation:

```tsx
import { ExampleSAILForm } from 'sail-ui-kit';

// Complete crew appraisal form with:
// - Part A: Seafarer's Information (all fields)
// - Part B: Training and Target tables
// - Functional stepper navigation
// - Proper styling and validation
// - Save and Submit functionality

<ExampleSAILForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSave={(data) => console.log('Saved:', data)}
  onSubmit={(data) => console.log('Submitted:', data)}
/>
```

## Available Components

### UI Components
- **Forms**: Button, Input, Select, Checkbox, RadioGroup, Slider, Switch, Label, Textarea
- **Layout**: Card, Avatar, Separator, Skeleton, Tabs, Dialog, Sheet, Sidebar
- **Feedback**: Badge, Alert, Progress, Tooltip, Popover, Toast
- **Navigation**: DropdownMenu, NavigationMenu, Breadcrumb

### Maritime Components
- **VesselStatusIndicator**: Shows vessel operational status
- **SafetyRatingBadge**: Displays safety compliance scores  
- **TMSAComplianceIndicator**: TMSA element compliance status
- **CrewCompetencyBadge**: Crew skill and performance indicators
- **IncidentSeverityIndicator**: Incident classification and severity

### Layout Components  
- **TMSAAppLayout**: Complete app wrapper with navigation
- **TopNavigationBar**: Module switcher and user menu
- **LeftSidebar**: Module-specific navigation menu
- **ModuleNavigator**: Switch between TMSA modules

### RBAC Components
- **RBACProvider**: Authentication and permission context
- **ProtectedRoute**: Route-level permission protection
- **PermissionGuard**: Component-level permission protection
- **UserManagement**: Admin UI for user management
- **RoleEditor**: Admin UI for role configuration

## Services

### SHARED_SERVICES
```jsx
import { SHARED_SERVICES } from 'sail-ui-kit';

// API requests
await SHARED_SERVICES.api.get('/vessels');
await SHARED_SERVICES.api.post('/crew-members', data);

// Personnel management
await SHARED_SERVICES.personnel.searchPersonnel({ rank: 'Master' });
await SHARED_SERVICES.personnel.getPersonnelByVessel('vessel-123');

// Vessel operations
await SHARED_SERVICES.vessel.getVessels({ vesselType: 'Oil Tanker' });
await SHARED_SERVICES.vessel.getFleetSummary();

// RBAC operations
await SHARED_SERVICES.rbac.login(username, password);
await SHARED_SERVICES.rbac.hasPermission('vessels', 'update');
```

## Hooks

```jsx
import { 
  useRBAC, 
  usePermissions, 
  useApi, 
  useLocalStorage 
} from 'sail-ui-kit';

// RBAC and permissions
const { user, login, logout } = useRBAC();
const { can, hasRole, isAuthenticated } = usePermissions();

// API requests with loading states
const { data, loading, error, post } = useApi('/api/vessels');

// Local storage with sync
const [settings, setSettings] = useLocalStorage('app-settings', {});
```

## Constants

```jsx
import { 
  VESSEL_TYPES,
  MARITIME_RANKS, 
  TMSA_ELEMENTS,
  DEFAULT_PERMISSIONS 
} from 'sail-ui-kit';

// Maritime constants
console.log(VESSEL_TYPES); // ['Oil Tanker', 'Container', ...]
console.log(MARITIME_RANKS.SENIOR_OFFICERS); // ['Master', 'Chief Officer', ...]
console.log(TMSA_ELEMENTS); // [{ id: 'EL1', name: '...', code: 'EL1' }, ...]

// RBAC constants  
console.log(DEFAULT_PERMISSIONS.VESSEL_READ); // { resource: 'vessels', action: 'read' }
```

## Styling

The package includes complete CSS styling with:
- **Maritime color palette** with professional blues and grays
- **Responsive design** for mobile and desktop
- **Dark mode support** 
- **Form styling** with gray backgrounds and white inputs
- **Status indicators** with appropriate colors
- **Typography** using Mulish font family

To use the styles, import the CSS file:

```jsx
import 'sail-ui-kit/dist/styles/index.css';
```

## TypeScript Support

The package is fully typed with TypeScript definitions included. All components, services, and utilities have proper type definitions for excellent developer experience.

## TMSA Module Integration

This package is designed for the 13 TMSA elements:

1. **EL1** - Management & Leadership
2. **EL2** - Shore HR Management  
3. **EL3** - Crewing Management
4. **EL4** - Technical Management
5. **EL5** - Navigation
6. **EL6** - Cargo Operations
7. **EL6A** - Mooring Operations
8. **EL7** - Management of Change
9. **EL8** - Incident Investigation
10. **EL9** - Safety
11. **EL10** - Environment & Energy Management
12. **EL11** - Emergency Management
13. **EL12** - Audits & Inspections
14. **EL13** - Security & Cyber Security

Each module can use this foundation to maintain consistency across the maritime ERP system.

## License

MIT License

## Support

For questions and support, please contact the SAIL Phase 2 development team.