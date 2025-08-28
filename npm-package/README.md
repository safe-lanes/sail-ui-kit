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
npm install sail-ui-kit@1.0.6
```

## Important: CSS Setup Required

**The package now includes complete Tailwind CSS styling (81KB with 4,145 utilities).** You must import the CSS file for components to display correctly:

```jsx
import 'sail-ui-kit/dist/index.css';
```

**Before CSS import:** Components appear as plain HTML with no styling
**After CSS import:** Components display with proper maritime styling (blue theme, hover effects, responsive design)

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
import 'sail-ui-kit/dist/index.css';

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
import 'sail-ui-kit/dist/index.css';

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
import 'sail-ui-kit/dist/index.css';

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
import 'sail-ui-kit/dist/index.css';

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

- **📱 Responsive Design**: Three-breakpoint system (Mobile: default, Tablet: md:768px-1024px, Desktop: lg:1024px+) with adaptive layouts
- **🔄 Functional Stepper Navigation**: Click-to-navigate between form sections with perfectly aligned connecting lines
- **🎨 Maritime Theme**: Professional blue color scheme (#16569e) with consistent styling across all components
- **🖼️ Popup Modal Design**: Full-screen popup with proper overlay, shadows, and card-based content
- **📝 Complete Form Templates**: Ready-to-use Seafarer Information and Appraisal Period sections
- **📊 Interactive Tables**: Built-in FormTable component with add/edit/delete functionality and comment system
- **💾 Auto-save Support**: Built-in save draft and submit functionality with proper button styling
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🔧 TypeScript**: Complete type safety and IntelliSense support
- **🎯 Maritime-Specific Fields**: Pre-built fields for ranks, vessels, nationalities, and appraisal types

### Quick Start - Complete Crew Appraisal Form Example

```tsx
import React from 'react';
import { ExampleSAILForm, Button } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

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
import 'sail-ui-kit/dist/index.css';

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

#### FormTable (New Component)
Advanced interactive table component for dynamic data entry across maritime applications.

**Features:**
- Configurable columns (text, select, number, readonly)
- Add/delete rows dynamically
- Inline editing with auto-save
- Expandable comment system
- Action buttons (comment, delete)
- Empty state messaging
- Responsive design with horizontal scroll
- Maritime styling consistency

**Props:**
- `title?: string` - Table title with add button
- `columns: TableColumn[]` - Column configuration array
- `data: TableRow[]` - Current table data
- `onDataChange: (data: TableRow[]) => void` - Data change handler
- `addButtonText?: string` - Custom add button text
- `showActions?: boolean` - Show/hide action columns
- `showComments?: boolean` - Enable comment functionality
- `emptyMessage?: string` - Custom empty state message

### SAILTable (Legacy - Use FormTable Instead)
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

## FormTable Component - Dynamic Data Tables

The FormTable component provides standardized table functionality for dynamic data entry across all maritime applications. It's built based on the Crew Appraisal Form structure and designed for maximum flexibility.

### Basic FormTable Usage

```tsx
import React, { useState } from 'react';
import { FormTable, TableColumn, TableRow } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

function TrainingRecordsTable() {
  const [trainingData, setTrainingData] = useState<TableRow[]>([
    { id: '1', training: 'Bridge Resource Management', evaluation: '4-meets-expectations' }
  ]);

  const columns: TableColumn[] = [
    { id: 'sno', header: 'S.No', type: 'readonly', width: '60px' },
    { id: 'training', header: 'Training', type: 'text', placeholder: 'Enter training name' },
    { 
      id: 'evaluation', 
      header: 'Evaluation', 
      type: 'select',
      placeholder: 'Select Rating',
      options: [
        { value: '5-exceeded-expectations', label: '5- Exceeded Expectations' },
        { value: '4-meets-expectations', label: '4- Meets Expectations' },
        { value: '3-somewhat-meets-expectations', label: '3- Somewhat Meets Expectations' },
        { value: '2-below-expectations', label: '2- Below Expectations' },
        { value: '1-significantly-below-expectations', label: '1- Significantly Below Expectations' }
      ]
    }
  ];

  return (
    <FormTable
      title="B1. Trainings conducted prior joining vessel (To Assess Effectiveness)"
      columns={columns}
      data={trainingData}
      onDataChange={setTrainingData}
      addButtonText="Add Training"
      emptyMessage="No trainings added yet. Click 'Add Training' to get started."
      showActions={true}
      showComments={true}
    />
  );
}
```

### Advanced FormTable - 5 Column Assessment

```tsx
function CompetenceAssessmentTable() {
  const [assessmentData, setAssessmentData] = useState<TableRow[]>([]);

  const columns: TableColumn[] = [
    { id: 'sno', header: 'S.No', type: 'readonly', width: '60px' },
    { id: 'criteria', header: 'Assessment Criteria', type: 'text', placeholder: 'Enter criteria' },
    { id: 'weight', header: 'Weight %', type: 'number', placeholder: '0', width: '100px' },
    { 
      id: 'effectiveness', 
      header: 'Effectiveness', 
      type: 'select',
      placeholder: 'Select Rating',
      options: [
        { value: '5-exceeds-expectations', label: '5- Exceeds Expectations' },
        { value: '4-meets-expectations', label: '4- Meets Expectations' },
        { value: '3-somewhat-meets-expectations', label: '3- Somewhat Meets Expectations' },
        { value: '2-below-expectations', label: '2- Below Expectations' },
        { value: '1-significantly-below-expectations', label: '1- Significantly Below Expectations' }
      ]
    },
    { id: 'score', header: 'Score', type: 'number', placeholder: '0-100', width: '80px' }
  ];

  return (
    <FormTable
      title="Part C: Competence Assessment (Professional Knowledge & Skills)"
      columns={columns}
      data={assessmentData}
      onDataChange={setAssessmentData}
      addButtonText="Add Criteria"
      emptyMessage="No assessment criteria added yet."
      showActions={true}
      showComments={true}
    />
  );
}
```

### FormTable Flexibility Features

**Use Cases Across SAIL Phase 2:**
- **Crew Management**: Training records, certifications, appraisals
- **Safety Management**: Incident logs, inspection checklists, audit findings
- **Technical Management**: Maintenance schedules, equipment records
- **Operations**: Port calls, cargo manifests, compliance tracking
- **Admin**: User management, configuration tables

**Responsive Design:**
- **Desktop**: Full table layout with all columns visible
- **Tablet**: Horizontal scroll for wide tables
- **Mobile**: Condensed view with horizontal scroll

**Integration with SAIL Forms:**
- Use within SAIL Form sections for structured data entry
- Consistent maritime styling with #16569e color scheme
- Auto-saves data through parent form handlers

## SAIL Phase 2 Responsive Design Standards

All components in sail-ui-kit follow a standardized three-breakpoint responsive system designed specifically for maritime applications:

### Breakpoint System
- **Mobile**: Default (0px-767px) - Compact layouts, stacked navigation, horizontal scrolling tables
- **Tablet**: md: (768px-1023px) - Medium layouts, condensed navigation, partial table visibility  
- **Desktop**: lg: (1024px+) - Full layouts, complete navigation with text, full table layouts

### SAIL Form Responsive Behavior
```css
/* Mobile (default) */
.sail-form-stepper {
  /* Horizontal compact layout, max-height 80px */
  flex-direction: row;
  max-height: 5rem;
  overflow-x: auto;
}

/* Tablet (md:) */
@media (min-width: 768px) {
  .sail-form-stepper {
    /* Vertical circles only, 80px width */
    flex-direction: column;
    width: 5rem;
    max-height: none;
  }
}

/* Desktop (lg:) */
@media (min-width: 1024px) {
  .sail-form-stepper {
    /* Full stepper with text and connecting lines */
    width: 20rem;
  }
  .stepper-connecting-line {
    margin-left: calc(0.5rem + 1.5rem); /* Perfect alignment */
  }
}
```

### FormTable Responsive Behavior
```css
/* All screen sizes */
.form-table {
  /* Horizontal scroll for wide tables */
  overflow-x: auto;
  min-width: 600px;
}

/* Mobile optimization */
@media (max-width: 767px) {
  .form-table-actions {
    /* Compact action buttons */
    gap: 0.25rem;
  }
}
```

### Color Standards
- **Primary Maritime Blue**: #16569e (headers, active states, borders)
- **Secondary Blue**: #5DADE2 (action buttons, save buttons)
- **Success Green**: #20c43f (submit buttons, success states)
- **Text Colors**: #4f5863 (body text), #6b7280 (secondary text)

### Layout Standards
- **Container Padding**: p-4 (16px) on mobile, p-6 (24px) on desktop
- **Modal Spacing**: p-[4px] container with rounded-xl cards
- **Grid Systems**: 1 column mobile, 2-3 columns tablet, 3-6 columns desktop
- **Form Spacing**: space-y-4 for form groups, space-y-2 for individual fields

### Ready-to-Use Example Component

The package includes `ExampleSAILForm` which provides a complete implementation:

```tsx
import { ExampleSAILForm, Button } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

// Complete crew appraisal form with:
// - Part A: Seafarer's Information (all fields)  
// - Part B: Training and Target tables
// - Functional stepper navigation
// - Proper maritime styling (blue theme)
// - Save and Submit functionality

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button 
        variant="secondary" 
        onClick={() => setIsOpen(true)}
      >
        Open Crew Appraisal Form
      </Button>

      <ExampleSAILForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={(data) => console.log('Saved:', data)}
        onSubmit={(data) => console.log('Submitted:', data)}
      />
    </div>
  );
}
```

## Component Categories & Usage Examples

This package contains 5 main component categories with comprehensive usage examples below.

### 🎨 UI Components (Shadcn/ui Library)

Complete set of modern UI primitives for building maritime applications.

#### Core Form Components
```jsx
import { 
  Button, 
  Input, 
  Label, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  RadioGroup,
  RadioGroupItem
} from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

function FormExample() {
  return (
    <div className="space-y-4 p-6">
      {/* Input Field */}
      <div className="space-y-2">
        <Label htmlFor="vessel-name">Vessel Name</Label>
        <Input 
          id="vessel-name" 
          placeholder="Enter vessel name" 
          className="max-w-sm"
        />
      </div>

      {/* Select Dropdown */}
      <div className="space-y-2">
        <Label>Vessel Type</Label>
        <Select>
          <SelectTrigger className="max-w-sm">
            <SelectValue placeholder="Select vessel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oil-tanker">Oil Tanker</SelectItem>
            <SelectItem value="container">Container Ship</SelectItem>
            <SelectItem value="bulk-carrier">Bulk Carrier</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="active-status" />
        <Label htmlFor="active-status">Currently Active</Label>
      </div>

      {/* Radio Group */}
      <div className="space-y-2">
        <Label>Priority Level</Label>
        <RadioGroup defaultValue="medium">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high">High</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <Button variant="default">Save Changes</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  );
}
```

#### Layout & Display Components
```jsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
  Progress
} from 'sail-ui-kit';

function LayoutExample() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {/* Card Component */}
      <Card>
        <CardHeader>
          <CardTitle>Vessel Information</CardTitle>
          <CardDescription>
            Current vessel status and details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/vessel-avatar.png" />
              <AvatarFallback>MV</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">MV Atlantic Star</p>
              <p className="text-sm text-gray-500">Oil Tanker</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cargo Capacity</span>
              <span>85%</span>
            </div>
            <Progress value={85} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

#### Interactive Components
```jsx
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from 'sail-ui-kit';

function InteractiveExample() {
  return (
    <div className="space-y-4 p-6">
      {/* Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Vessel Details</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vessel Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected vessel.
            </DialogDescription>
          </DialogHeader>
          <div>Vessel content goes here...</div>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="crew">Crew</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>Vessel overview information...</p>
        </TabsContent>
        <TabsContent value="crew">
          <p>Crew management details...</p>
        </TabsContent>
        <TabsContent value="maintenance">
          <p>Maintenance schedules...</p>
        </TabsContent>
      </Tabs>

      {/* Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover for info</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Additional vessel information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit Vessel</DropdownMenuItem>
          <DropdownMenuItem>View Reports</DropdownMenuItem>
          <DropdownMenuItem>Export Data</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
```

### ⚓ Maritime Components

Specialized components for maritime industry applications.

```jsx
import { 
  VesselStatusIndicator,
  SafetyRatingBadge,
  TMSAComplianceIndicator,
  CrewCompetencyBadge,
  IncidentSeverityIndicator,
  IncidentReportForm,
  OperationsDashboard
} from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

function MaritimeExample() {
  return (
    <div className="space-y-6 p-6">
      {/* Vessel Status Indicators */}
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
        
        <VesselStatusIndicator 
          vessel={{
            name: "MV Pacific Dawn",
            vesselType: "Container Ship",
            status: { status: "at-sea", location: "North Atlantic" }
          }}
          size="md"
          showDetails={true}
        />
        
        <VesselStatusIndicator 
          vessel={{
            name: "MV Nordic Wind",
            vesselType: "Bulk Carrier",
            status: { status: "maintenance", location: "Dry Dock 3" }
          }}
          size="md"
          showDetails={true}
        />
      </div>

      {/* Safety Rating Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Safety Ratings</h3>
        <div className="flex space-x-4">
          <SafetyRatingBadge 
            rating={5}
            type="vessel"
            showDetails={true}
          />
          <SafetyRatingBadge 
            rating={4}
            type="crew"
            showDetails={false}
          />
          <SafetyRatingBadge 
            rating="A"
            type="company"
            showDetails={true}
            metrics={{
              rating: "A",
              score: 95,
              incidentCount: 2,
              lastIncident: "2024-01-15",
              complianceScore: 98
            }}
          />
        </div>
      </div>

      {/* TMSA Compliance Indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">TMSA Compliance</h3>
        <div className="grid grid-cols-2 gap-4">
          <TMSAComplianceIndicator 
            element="EL4"
            status="compliant"
            score={95}
          />
          <TMSAComplianceIndicator 
            element="EL9"
            status="partial"
            score={78}
          />
          <TMSAComplianceIndicator 
            element="EL12"
            status="non-compliant"
            score={45}
          />
          <TMSAComplianceIndicator 
            element="EL6"
            status="not-assessed"
          />
        </div>
      </div>

      {/* Crew Competency Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Crew Competencies</h3>
        <div className="flex space-x-2">
          <CrewCompetencyBadge level="expert" skill="Navigation" />
          <CrewCompetencyBadge level="intermediate" skill="Engine Maintenance" />
          <CrewCompetencyBadge level="beginner" skill="Cargo Operations" />
        </div>
      </div>

      {/* Incident Severity Indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Incidents</h3>
        <div className="space-y-2">
          <IncidentSeverityIndicator 
            severity="low" 
            description="Minor equipment malfunction" 
          />
          <IncidentSeverityIndicator 
            severity="medium" 
            description="Deck safety violation" 
          />
          <IncidentSeverityIndicator 
            severity="high" 
            description="Engine room alarm" 
          />
        </div>
      </div>

      {/* Operations Dashboard */}
      <OperationsDashboard 
        vessels={[
          { id: "1", name: "MV Atlantic Star", status: "active" },
          { id: "2", name: "MV Pacific Dawn", status: "at-sea" }
        ]}
        showMetrics={true}
      />
    </div>
  );
}
```

### 📋 Forms Components

Advanced form components for maritime data collection and TMSA assessments.

```jsx
import { 
  SAILForm,
  SAILFormField,
  SAILFormGrid,
  SAILFormSection,
  SAILTable,
  ExampleSAILForm 
} from 'sail-ui-kit';
import { useForm } from 'react-hook-form';
import 'sail-ui-kit/dist/index.css';

function FormsExample() {
  const form = useForm({
    defaultValues: {
      vesselName: '',
      vesselType: '',
      captain: '',
      crew: '',
      departurePort: '',
      arrivalPort: '',
      cargoType: '',
      priority: 'medium',
      activeStatus: false,
      remarks: ''
    }
  });

  // SAIL Form with Multiple Sections
  const formSections = [
    {
      id: 'vessel-info',
      title: 'Vessel Information',
      letter: 'A',
      description: 'Basic vessel details and specifications',
      isVisible: true,
      content: (
        <SAILFormGrid columns={2} gap={4}>
          <SAILFormField
            control={form.control}
            name="vesselName"
            label="Vessel Name"
            type="text"
            placeholder="Enter vessel name"
            required={true}
          />
          <SAILFormField
            control={form.control}
            name="vesselType"
            label="Vessel Type"
            type="select"
            options={[
              { value: 'oil-tanker', label: 'Oil Tanker' },
              { value: 'container', label: 'Container Ship' },
              { value: 'bulk-carrier', label: 'Bulk Carrier' },
              { value: 'lng-tanker', label: 'LNG Tanker' }
            ]}
            required={true}
          />
          <SAILFormField
            control={form.control}
            name="captain"
            label="Captain Name"
            type="text"
            placeholder="Enter captain name"
            required={true}
          />
          <SAILFormField
            control={form.control}
            name="crew"
            label="Crew Count"
            type="number"
            placeholder="Number of crew members"
          />
        </SAILFormGrid>
      )
    },
    {
      id: 'voyage-details',
      title: 'Voyage Details',
      letter: 'B',
      description: 'Route and cargo information',
      isVisible: true,
      content: (
        <div className="space-y-4">
          <SAILFormGrid columns={2} gap={4}>
            <SAILFormField
              control={form.control}
              name="departurePort"
              label="Departure Port"
              type="text"
              placeholder="Port of departure"
              required={true}
            />
            <SAILFormField
              control={form.control}
              name="arrivalPort"
              label="Arrival Port"
              type="text"
              placeholder="Destination port"
              required={true}
            />
            <SAILFormField
              control={form.control}
              name="cargoType"
              label="Cargo Type"
              type="select"
              options={[
                { value: 'crude-oil', label: 'Crude Oil' },
                { value: 'refined-products', label: 'Refined Products' },
                { value: 'chemicals', label: 'Chemicals' },
                { value: 'lng', label: 'LNG' },
                { value: 'containers', label: 'Containers' }
              ]}
            />
            <SAILFormField
              control={form.control}
              name="priority"
              label="Priority Level"
              type="radio"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' }
              ]}
            />
          </SAILFormGrid>
          
          <SAILFormField
            control={form.control}
            name="remarks"
            label="Additional Remarks"
            type="textarea"
            placeholder="Enter any additional information..."
            rows={4}
          />
        </div>
      )
    },
    {
      id: 'compliance-check',
      title: 'Compliance Verification',
      letter: 'C',
      description: 'TMSA compliance and safety checks',
      isVisible: true,
      content: (
        <div className="space-y-4">
          <SAILFormField
            control={form.control}
            name="activeStatus"
            label="Vessel currently active and operational"
            type="checkbox"
          />
          
          {/* Compliance Table */}
          <SAILTable
            headers={[
              'TMSA Element',
              'Status',
              'Last Assessment',
              'Score',
              'Actions'
            ]}
            data={[
              ['EL1 - Management', 'Compliant', '2024-01-15', '95%', 'View Details'],
              ['EL4 - Technical', 'Partial', '2024-02-20', '78%', 'Review'],
              ['EL9 - Safety', 'Non-Compliant', '2024-01-10', '45%', 'Action Required']
            ]}
            actions={{
              edit: true,
              delete: false,
              view: true
            }}
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Complete SAIL Form */}
      <SAILForm
        title="Vessel Registration & Compliance Form"
        sections={formSections}
        isOpen={true}
        onClose={() => console.log('Form closed')}
        onSave={() => console.log('Form saved')}
        onSubmit={form.handleSubmit((data) => console.log('Form submitted:', data))}
        showSaveButton={true}
        showSubmitButton={true}
        saveButtonText="Save Draft"
        submitButtonText="Submit for Review"
        initialSection="vessel-info"
      />

      {/* Individual Form Components */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Individual Form Fields</h3>
        
        <Form {...form}>
          <form className="space-y-4">
            {/* Single Field Example */}
            <SAILFormField
              control={form.control}
              name="vesselName"
              label="Vessel Name"
              type="text"
              placeholder="Enter vessel name"
              required={true}
              className="max-w-sm"
            />

            {/* Grid Layout Example */}
            <SAILFormGrid columns={3} gap={4}>
              <SAILFormField
                control={form.control}
                name="vesselType"
                label="Vessel Type"
                type="select"
                options={[
                  { value: 'tanker', label: 'Tanker' },
                  { value: 'container', label: 'Container' }
                ]}
              />
              <SAILFormField
                control={form.control}
                name="captain"
                label="Captain"
                type="text"
                placeholder="Captain name"
              />
              <SAILFormField
                control={form.control}
                name="crew"
                label="Crew Size"
                type="number"
                placeholder="Number"
              />
            </SAILFormGrid>

            {/* Form Section with Custom Layout */}
            <SAILFormSection
              title="Contact Information"
              description="Emergency contacts and communication details"
            >
              <SAILFormGrid columns={2} gap={6}>
                <SAILFormField
                  control={form.control}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="contact@vessel.com"
                />
                <SAILFormField
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  type="text"
                  placeholder="+1 234 567 8900"
                />
              </SAILFormGrid>
            </SAILFormSection>
          </form>
        </Form>
      </Card>

      {/* Example SAIL Form (Complete Implementation) */}
      <ExampleSAILForm
        title="TMSA Assessment Form - EL4 Technical Management"
        moduleCode="EL4"
        onFormSubmit={(data) => console.log('Assessment submitted:', data)}
        initialData={{
          vesselId: 'MV-001',
          assessmentDate: new Date().toISOString().split('T')[0],
          assessor: 'John Smith'
        }}
      />
    </div>
  );
}

// Advanced SAIL Table Usage
function SAILTableExample() {
  const maintenanceData = [
    {
      id: 1,
      equipment: 'Main Engine',
      lastService: '2024-01-15',
      nextService: '2024-07-15',
      status: 'Good',
      priority: 'Medium'
    },
    {
      id: 2,
      equipment: 'Navigation System',
      lastService: '2024-02-20',
      nextService: '2024-08-20',
      status: 'Needs Attention',
      priority: 'High'
    }
  ];

  return (
    <SAILTable
      headers={[
        'Equipment',
        'Last Service',
        'Next Service',
        'Status',
        'Priority',
        'Actions'
      ]}
      data={maintenanceData.map(item => [
        item.equipment,
        item.lastService,
        item.nextService,
        item.status,
        item.priority,
        'Edit | View'
      ])}
      actions={{
        edit: true,
        delete: true,
        view: true,
        custom: [
          {
            label: 'Schedule Service',
            onClick: (rowIndex) => console.log(`Schedule service for row ${rowIndex}`)
          }
        ]
      }}
      searchable={true}
      sortable={true}
      pagination={true}
      pageSize={10}
    />
  );
}
```

### 📊 Dashboard Components

Maritime dashboard cards for fleet operations and monitoring.

```jsx
import { 
  MetricCard,
  StatusCard,
  FleetStatusCard,
  ComplianceCard,
  CrewCard,
  IncidentCard
} from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

function DashboardExample() {
  // Sample data for demonstration
  const fleetVessels = [
    {
      id: 'mv-001',
      name: 'MV Atlantic Star',
      type: 'Oil Tanker',
      status: 'active',
      location: 'North Sea',
      crew: 25,
      lastInspection: '2024-01-15',
      safetyRating: 4.5
    },
    {
      id: 'mv-002',
      name: 'MV Pacific Dawn',
      type: 'Container Ship',
      status: 'in-port',
      location: 'Port of Rotterdam',
      crew: 23,
      lastInspection: '2024-02-10',
      safetyRating: 4.8
    },
    {
      id: 'mv-003',
      name: 'MV Northern Light',
      type: 'Chemical Tanker',
      status: 'maintenance',
      location: 'Dry Dock 3',
      crew: 25,
      lastInspection: '2024-01-05',
      safetyRating: 4.0
    },
    {
      id: 'mv-004',
      name: 'MV Ocean Explorer',
      type: 'LNG Tanker',
      status: 'emergency',
      location: 'Mediterranean',
      crew: 28,
      lastInspection: '2024-01-20',
      safetyRating: 3.5
    }
  ];

  const crewMembers = [
    {
      id: 'crew-001',
      name: 'Captain John Smith',
      rank: 'Master',
      vessel: 'MV Atlantic Star',
      status: 'onboard',
      certificationStatus: 'valid',
      nextRotation: '2024-06-01'
    },
    {
      id: 'crew-002',
      name: 'Chief Engineer Maria Rodriguez',
      rank: 'Chief Engineer',
      vessel: 'MV Pacific Dawn',
      status: 'shore-leave',
      certificationStatus: 'expiring',
      nextRotation: '2024-05-15'
    },
    {
      id: 'crew-003',
      name: 'Officer David Chen',
      rank: '2nd Officer',
      vessel: 'MV Northern Light',
      status: 'training',
      certificationStatus: 'valid',
      nextRotation: '2024-07-10'
    }
  ];

  const tmsaElements = [
    {
      id: 'el1',
      code: 'EL1',
      name: 'Management & Leadership',
      status: 'compliant',
      score: 95,
      lastAssessment: '2024-01-15'
    },
    {
      id: 'el4',
      code: 'EL4',
      name: 'Technical Management',
      status: 'partial',
      score: 78,
      lastAssessment: '2024-02-01'
    },
    {
      id: 'el9',
      code: 'EL9',
      name: 'Safety',
      status: 'non-compliant',
      score: 45,
      lastAssessment: '2024-01-20'
    },
    {
      id: 'el12',
      code: 'EL12',
      name: 'Audits & Inspections',
      status: 'not-assessed'
    }
  ];

  const incidents = [
    {
      id: 'inc-001',
      title: 'Engine Room Oil Leak',
      description: 'Minor oil leak detected in engine room during routine inspection',
      severity: 'medium',
      type: 'technical',
      vessel: 'MV Atlantic Star',
      reportedBy: 'Chief Engineer',
      reportedAt: '2024-01-20T08:30:00Z',
      status: 'investigating'
    },
    {
      id: 'inc-002',
      title: 'Navigation Equipment Malfunction',
      description: 'GPS system showing intermittent failures',
      severity: 'high',
      type: 'operational',
      vessel: 'MV Pacific Dawn',
      reportedBy: '2nd Officer',
      reportedAt: '2024-01-19T14:15:00Z',
      status: 'resolved'
    },
    {
      id: 'inc-003',
      title: 'Safety Drill Non-Compliance',
      description: 'Weekly safety drill not conducted as scheduled',
      severity: 'low',
      type: 'safety',
      vessel: 'MV Northern Light',
      reportedBy: 'Safety Officer',
      reportedAt: '2024-01-18T10:00:00Z',
      status: 'closed'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Maritime Operations Dashboard</h1>
      
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Fleet Status"
          value={fleetVessels.length}
          subtitle="1 in port"
          icon="🚢"
          trend={{
            value: 5.2,
            label: "from last month",
            direction: "up"
          }}
          status="success"
          onClick={() => console.log('View fleet details')}
        />
        
        <MetricCard
          title="Incidents"
          value={incidents.length}
          subtitle="Past month (1 critical)"
          icon="⚠"
          trend={{
            value: 12.5,
            label: "from last month",
            direction: "down"
          }}
          status="warning"
          onClick={() => console.log('View incidents')}
        />
        
        <MetricCard
          title="TMSA Compliance"
          value="78%"
          subtitle="19 elements compliant"
          icon="📋"
          progress={78}
          status="info"
          onClick={() => console.log('View compliance')}
        />
        
        <MetricCard
          title="Crew"
          value={crewMembers.length}
          subtitle="Total crew members"
          icon="👥"
          status="neutral"
          onClick={() => console.log('View crew')}
        />
      </div>

      {/* Detailed Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Fleet Status Card */}
        <FleetStatusCard
          vessels={fleetVessels}
          title="Fleet Status Overview"
          showDetails={true}
          onVesselClick={(vessel) => console.log('Selected vessel:', vessel)}
        />

        {/* TMSA Compliance Card */}
        <ComplianceCard
          title="TMSA Compliance Status"
          elements={tmsaElements}
          overallScore={78}
          showElementDetails={true}
          onElementClick={(element) => console.log('Selected element:', element)}
        />

        {/* Crew Management Card */}
        <CrewCard
          title="Crew Management"
          crewMembers={crewMembers}
          showMemberDetails={true}
          onMemberClick={(member) => console.log('Selected crew member:', member)}
        />

        {/* Incident Card */}
        <IncidentCard
          title="Recent Incidents"
          incidents={incidents}
          timeframe="Past month"
          showIncidentDetails={true}
          onIncidentClick={(incident) => console.log('Selected incident:', incident)}
        />

        {/* Status Card - Custom Items */}
        <StatusCard
          title="Equipment Status"
          items={[
            {
              id: 'engine-1',
              name: 'Main Engine',
              status: 'active',
              details: { type: 'Diesel', power: '12,000 HP' }
            },
            {
              id: 'nav-1',
              name: 'Navigation System',
              status: 'warning',
              details: { type: 'GPS/ECDIS', lastUpdate: '2024-01-15' }
            },
            {
              id: 'comm-1',
              name: 'Communication System',
              status: 'maintenance',
              details: { type: 'GMDSS', scheduled: '2024-01-25' }
            }
          ]}
          maxDisplayed={3}
          showCounts={true}
          onItemClick={(item) => console.log('Selected equipment:', item)}
          onViewAll={() => console.log('View all equipment')}
        />

        {/* Additional Metric Cards */}
        <div className="space-y-4">
          <MetricCard
            title="Fuel Efficiency"
            value="12.5"
            subtitle="MT/day average"
            icon="⛽"
            trend={{
              value: 3.2,
              label: "improvement",
              direction: "up"
            }}
            status="success"
            size="sm"
          />
          
          <MetricCard
            title="Port Calls"
            value="8"
            subtitle="This month"
            icon="⚓"
            status="info"
            size="sm"
          />
        </div>
      </div>

      {/* Full Width Dashboard */}
      <div className="grid grid-cols-1 gap-6">
        <StatusCard
          title="Vessel Operations Overview"
          items={fleetVessels.map(vessel => ({
            id: vessel.id,
            name: vessel.name,
            status: vessel.status === 'active' ? 'active' : 
                   vessel.status === 'in-port' ? 'inactive' : 
                   vessel.status === 'maintenance' ? 'maintenance' : 'emergency',
            details: {
              type: vessel.type,
              location: vessel.location,
              crew: `${vessel.crew} crew`,
              safety: `${vessel.safetyRating}/5.0`
            }
          }))}
          showCounts={true}
          maxDisplayed={6}
          onItemClick={(item) => console.log('Selected vessel operation:', item)}
        />
      </div>
    </div>
  );
}
```

### 💬 Feedback Components

Comprehensive feedback and notification system for maritime operations.

```jsx
import {
  AlertNotification,
  StatusIndicator,
  AnimatedStatusIndicator,
  NotificationPanel,
  FeedbackModal,
  ProgressIndicator,
  LinearProgress
} from 'sail-ui-kit';
import { useState } from 'react';
import 'sail-ui-kit/dist/index.css';

function FeedbackExample() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-001',
      type: 'warning',
      title: 'Engine Maintenance Due',
      message: 'MV Atlantic Star main engine scheduled maintenance is overdue by 3 days',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      priority: 'high',
      category: 'maintenance',
      vessel: 'MV Atlantic Star',
      actions: [
        {
          label: 'Schedule Now',
          onClick: (notif) => console.log('Scheduling maintenance for:', notif.vessel)
        },
        {
          label: 'View Details',
          onClick: (notif) => console.log('Viewing details for:', notif.id)
        }
      ]
    },
    {
      id: 'notif-002',
      type: 'error',
      title: 'Critical Safety Violation',
      message: 'Fire drill not conducted on schedule - immediate attention required',
      timestamp: '2024-01-20T08:15:00Z',
      read: false,
      priority: 'critical',
      category: 'safety',
      vessel: 'MV Pacific Dawn',
      actions: [
        {
          label: 'Investigate',
          onClick: (notif) => console.log('Investigating:', notif.id)
        }
      ]
    },
    {
      id: 'notif-003',
      type: 'success',
      title: 'TMSA Compliance Improved',
      message: 'EL4 Technical Management score increased from 75% to 89%',
      timestamp: '2024-01-19T16:45:00Z',
      read: true,
      priority: 'medium',
      category: 'compliance',
      vessel: 'MV Northern Light'
    },
    {
      id: 'notif-004',
      type: 'info',
      title: 'Crew Rotation Scheduled',
      message: 'Captain rotation scheduled for MV Ocean Explorer on March 1st',
      timestamp: '2024-01-19T14:20:00Z',
      read: false,
      priority: 'low',
      category: 'operational',
      vessel: 'MV Ocean Explorer'
    }
  ]);

  const progressSteps = [
    {
      id: 'inspection-prep',
      label: 'Preparation',
      status: 'completed',
      description: 'Document review and checklist preparation',
      timestamp: '2024-01-15T09:00:00Z'
    },
    {
      id: 'inspection-exec',
      label: 'Inspection',
      status: 'completed',
      description: 'On-site vessel inspection',
      timestamp: '2024-01-16T10:30:00Z'
    },
    {
      id: 'report-draft',
      label: 'Report Draft',
      status: 'current',
      description: 'Drafting inspection report',
      timestamp: '2024-01-17T14:00:00Z'
    },
    {
      id: 'review',
      label: 'Review',
      status: 'pending',
      description: 'Management review and approval'
    },
    {
      id: 'submission',
      label: 'Submission',
      status: 'pending',
      description: 'Submit to regulatory authorities'
    }
  ];

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    // Here you would typically send the feedback to your backend
    alert('Thank you for your feedback! We will review it shortly.');
  };

  const handleNotificationRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Maritime Feedback & Notifications</h1>

      {/* Alert Notifications */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Alert Notifications</h2>
        
        <AlertNotification
          type="error"
          title="Critical Engine Failure"
          message="Main engine failure detected on MV Atlantic Star. Immediate attention required."
          priority="critical"
          vessel="MV Atlantic Star"
          timestamp="2024-01-20T08:30:00Z"
          dismissible={true}
          onDismiss={() => console.log('Alert dismissed')}
          actions={[
            {
              label: 'Emergency Response',
              onClick: () => console.log('Emergency response initiated'),
              variant: 'destructive'
            },
            {
              label: 'View Details',
              onClick: () => console.log('Viewing details'),
              variant: 'secondary'
            }
          ]}
        />

        <AlertNotification
          type="warning"
          title="Maintenance Overdue"
          message="Scheduled maintenance for navigation systems is overdue by 5 days."
          priority="high"
          vessel="MV Pacific Dawn"
          timestamp="2024-01-19T15:45:00Z"
          dismissible={true}
          actions={[
            {
              label: 'Schedule Now',
              onClick: () => console.log('Scheduling maintenance')
            }
          ]}
        />

        <AlertNotification
          type="success"
          title="Safety Drill Completed"
          message="Weekly safety drill completed successfully with 100% crew participation."
          priority="low"
          vessel="MV Northern Light"
          timestamp="2024-01-19T11:30:00Z"
          dismissible={true}
        />

        <AlertNotification
          type="info"
          title="Weather Advisory"
          message="Heavy weather expected in North Atlantic. Route optimization recommended."
          priority="medium"
          timestamp="2024-01-20T06:00:00Z"
          dismissible={true}
          actions={[
            {
              label: 'View Route',
              onClick: () => console.log('Viewing route options')
            },
            {
              label: 'Weather Forecast',
              onClick: () => console.log('Opening weather forecast')
            }
          ]}
        />
      </div>

      {/* Status Indicators */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Status Indicators</h2>
        
        <div className="flex flex-wrap gap-4">
          <StatusIndicator status="operational" />
          <StatusIndicator status="degraded" label="Partial Systems" />
          <StatusIndicator status="maintenance" showDot={true} />
          <StatusIndicator status="offline" size="lg" />
          <StatusIndicator 
            status="emergency" 
            label="Critical Alert" 
            onClick={() => console.log('Emergency status clicked')}
          />
        </div>

        {/* Animated Status Indicators */}
        <div className="flex flex-wrap gap-4">
          <AnimatedStatusIndicator 
            status="operational" 
            isLive={true}
            pulseAnimation={true}
            label="Live Status"
          />
          <AnimatedStatusIndicator 
            status="degraded" 
            isLive={true}
            label="System Degraded"
          />
          <AnimatedStatusIndicator 
            status="emergency" 
            isLive={true}
            pulseAnimation={true}
            label="Emergency Active"
          />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Progress Indicators</h2>
        
        {/* Vessel Inspection Progress */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Vessel Inspection Progress</h3>
          <ProgressIndicator
            steps={progressSteps}
            showProgress={true}
            showTimestamps={true}
            orientation="horizontal"
          />
        </div>

        {/* Vertical Progress */}
        <div className="bg-white p-6 rounded-lg border max-w-md">
          <h3 className="text-lg font-medium mb-4">Maintenance Workflow</h3>
          <ProgressIndicator
            steps={[
              {
                id: 'req',
                label: 'Request',
                status: 'completed',
                description: 'Maintenance request submitted'
              },
              {
                id: 'sched',
                label: 'Schedule',
                status: 'completed',
                description: 'Maintenance scheduled'
              },
              {
                id: 'exec',
                label: 'Execute',
                status: 'current',
                description: 'Maintenance in progress'
              },
              {
                id: 'verify',
                label: 'Verify',
                status: 'pending',
                description: 'Quality verification',
                optional: true
              }
            ]}
            orientation="vertical"
            size="md"
          />
        </div>

        {/* Linear Progress Examples */}
        <div className="space-y-4">
          <LinearProgress
            label="Fuel Consumption"
            value={750}
            max={1000}
            showPercentage={true}
            showValue={true}
            color="blue"
          />
          
          <LinearProgress
            label="Safety Score"
            value={89}
            max={100}
            showPercentage={true}
            color="green"
          />
          
          <LinearProgress
            label="Compliance Progress"
            value={12}
            max={15}
            showValue={true}
            color="yellow"
            size="lg"
          />
        </div>
      </div>

      {/* Notification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Notification Panel</h2>
          <NotificationPanel
            notifications={notifications}
            title="Fleet Notifications"
            onNotificationClick={(notif) => console.log('Notification clicked:', notif)}
            onMarkAsRead={handleNotificationRead}
            onMarkAllAsRead={() => {
              setNotifications(prev => 
                prev.map(notif => ({ ...notif, read: true }))
              );
            }}
            onDismiss={handleNotificationDismiss}
            onClearAll={() => setNotifications([])}
            maxHeight="500px"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Feedback System</h2>
          
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-gray-600 mb-4">
              Help us improve the maritime ERP system by providing feedback on features, 
              reporting bugs, or suggesting enhancements.
            </p>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Feedback
            </button>
          </div>

          {/* System Status Overview */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Fleet Management</span>
                <StatusIndicator status="operational" showDot={true} />
              </div>
              <div className="flex items-center justify-between">
                <span>TMSA Compliance</span>
                <StatusIndicator status="degraded" showDot={true} />
              </div>
              <div className="flex items-center justify-between">
                <span>Crew Management</span>
                <StatusIndicator status="operational" showDot={true} />
              </div>
              <div className="flex items-center justify-between">
                <span>Incident Reporting</span>
                <StatusIndicator status="maintenance" showDot={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
        title="Send Feedback - Maritime ERP"
        userEmail="captain@maritime.com"
        currentVessel="MV Atlantic Star"
        currentModule="EL4 - Technical Management"
        allowRating={true}
      />
    </div>
  );
}
```

### 🏗️ Layout Components

Complete layout system for TMSA applications.

```jsx
import { 
  TMSAAppLayout,
  TopNavigationBar,
  LeftSidebar,
  ModuleNavigator,
  StandardTopNavigationBar,
  StandardLeftSidebar
} from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

function LayoutExample() {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
      isActive: true
    },
    {
      id: 'vessels',
      label: 'Vessels',
      path: '/vessels',
      icon: '🚢',
      count: 12
    },
    {
      id: 'crew',
      label: 'Crew Management',
      path: '/crew',
      icon: '👥',
      count: 45
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      path: '/maintenance',
      icon: '🔧',
      count: 8
    },
    {
      id: 'reports',
      label: 'Reports',
      path: '/reports',
      icon: '📋'
    }
  ];

  // Complete TMSA App Layout
  return (
    <TMSAAppLayout
      moduleName="Fleet Management"
      moduleCode="EL4"
      currentModule="technical"
      menuItems={menuItems}
      user={{
        name: "John Smith",
        role: "Fleet Manager",
        avatar: "/user-avatar.png"
      }}
      notifications={[
        { id: 1, message: "New maintenance alert", type: "warning" },
        { id: 2, message: "Vessel inspection due", type: "info" }
      ]}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold">Fleet Management Dashboard</h1>
        <p>Your content goes here...</p>
      </div>
    </TMSAAppLayout>
  );
}

// Individual Layout Components
function IndividualLayoutComponents() {
  return (
    <div className="h-screen">
      {/* Top Navigation */}
      <TopNavigationBar 
        moduleName="Technical Management"
        currentUser={{
          name: "Jane Doe",
          role: "Technical Manager"
        }}
        modules={[
          { code: "EL1", name: "Management", path: "/el1" },
          { code: "EL4", name: "Technical", path: "/el4", active: true },
          { code: "EL9", name: "Safety", path: "/el9" }
        ]}
        notifications={3}
      />

      <div className="flex h-full">
        {/* Left Sidebar */}
        <LeftSidebar 
          items={menuItems}
          compactMode={false}
          showSearch={true}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2>Main Application Content</h2>
        </main>
      </div>
    </div>
  );
}

// Module Navigator
function ModuleNavigatorExample() {
  const tmsaModules = [
    { code: "EL1", name: "Management & Leadership", path: "/el1" },
    { code: "EL2", name: "Shore HR Management", path: "/el2" },
    { code: "EL3", name: "Crewing Management", path: "/el3" },
    { code: "EL4", name: "Technical Management", path: "/el4" },
    { code: "EL5", name: "Navigation", path: "/el5" }
  ];

  return (
    <ModuleNavigator 
      modules={tmsaModules}
      currentModule="EL4"
      onModuleChange={(moduleCode) => {
        console.log(`Switching to module: ${moduleCode}`);
      }}
      layout="grid" // or "list"
      showDescriptions={true}
    />
  );
}
```

### 🔐 RBAC Components

Role-based access control and user management.

```jsx
import { 
  RBACProvider,
  ProtectedRoute,
  PermissionGuard,
  UserManagement,
  RoleEditor,
  PermissionMatrix,
  RBACDashboard,
  RoleBasedAccess,
  useRBAC,
  usePermissions
} from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css';

// Main RBAC Setup
function RBACExample() {
  return (
    <RBACProvider 
      apiEndpoint="/api/auth"
      onAuthChange={(user) => console.log('Auth changed:', user)}
    >
      <RBACApplication />
    </RBACProvider>
  );
}

function RBACApplication() {
  const { user, login, logout, loading } = useRBAC();
  const { can, hasRole, hasAnyRole } = usePermissions();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* User Info */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Welcome, {user.name}</h1>
          <p className="text-sm text-gray-600">Role: {user.role}</p>
        </div>
        <Button onClick={logout}>Logout</Button>
      </div>

      {/* Protected Routes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Access Control Examples</h2>
        
        {/* Component-level Permission Guards */}
        <PermissionGuard resource="vessels" action="create">
          <Button>Create New Vessel</Button>
        </PermissionGuard>

        <PermissionGuard resource="users" action="manage">
          <Button variant="secondary">Manage Users</Button>
        </PermissionGuard>

        <PermissionGuard permission="admin.system">
          <Button variant="destructive">System Administration</Button>
        </PermissionGuard>

        {/* Conditional Rendering based on Permissions */}
        {can('vessels', 'update') && (
          <div className="p-4 border rounded">
            <h3>Vessel Management</h3>
            <p>You can update vessel information.</p>
          </div>
        )}

        {hasRole('fleet-manager') && (
          <div className="p-4 border rounded bg-blue-50">
            <h3>Fleet Manager Dashboard</h3>
            <p>Special content for fleet managers.</p>
          </div>
        )}

        {hasAnyRole(['admin', 'super-admin']) && (
          <div className="p-4 border rounded bg-red-50">
            <h3>Administrative Functions</h3>
            <p>High-level administrative content.</p>
          </div>
        )}
      </div>

      {/* Admin Components */}
      {can('users', 'manage') && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          
          <UserManagement 
            onUserCreated={(user) => console.log('User created:', user)}
            onUserUpdated={(user) => console.log('User updated:', user)}
            onUserDeleted={(userId) => console.log('User deleted:', userId)}
            showBulkActions={true}
          />
        </div>
      )}

      {can('roles', 'manage') && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Role Management</h2>
          
          <RoleEditor 
            onRoleCreated={(role) => console.log('Role created:', role)}
            onRoleUpdated={(role) => console.log('Role updated:', role)}
            showPermissionMatrix={true}
          />
          
          <PermissionMatrix 
            editable={can('permissions', 'manage')}
            onPermissionChanged={(changes) => console.log('Permissions changed:', changes)}
          />
        </div>
      )}

      {/* RBAC Dashboard */}
      {hasRole('admin') && (
        <RBACDashboard 
          showUserStats={true}
          showRoleDistribution={true}
          showRecentActivity={true}
        />
      )}
    </div>
  );
}

// Login Form
function LoginForm() {
  const { login } = useRBAC();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({...prev, username: e.target.value}))}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({...prev, password: e.target.value}))}
              required
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Route Protection
function ProtectedRouteExample() {
  return (
    <ProtectedRoute 
      permission="vessels.read"
      fallback={<div>Access denied. You need vessel read permissions.</div>}
    >
      <VesselDashboard />
    </ProtectedRoute>
  );
}
```

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

### ✅ CSS Fixed in Version 1.0.5

**Important:** Always import the CSS file in your application entry point or main component:

```jsx
import 'sail-ui-kit/dist/index.css';
```

**What's included in the CSS:**
- **Full Tailwind CSS utilities** (4,145 lines, 81KB)
- **Maritime color variables** for consistent theming
- **Component styling** for buttons, forms, and maritime-specific components
- **Responsive breakpoints** for mobile and desktop
- **Maritime theme colors:** Primary blue (#5DADE2), Navy (#16569e), and professional grays

**Version History:**
- **v1.0.4 and earlier:** Basic CSS (320 lines) - components appeared unstyled
- **v1.0.5:** Complete Tailwind CSS included - properly styled maritime components

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