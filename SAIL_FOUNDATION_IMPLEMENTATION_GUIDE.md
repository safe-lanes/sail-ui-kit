# sail-ui-kit Implementation Guide

## Overview

The `sail-ui-kit` package provides standardized navigation components and a complete UI foundation for SAIL Phase 2 TMSA modules. It ensures consistent UI/UX across all maritime applications while maintaining flexibility for module-specific customization.

## Package Information

- **Package Name**: `sail-ui-kit`
- **Version**: `1.0.6`
- **License**: MIT
- **Author**: SAIL Phase 2 Team
- **NPM**: https://www.npmjs.com/package/sail-ui-kit

## Installation

```bash
npm install sail-ui-kit
```

### **CRITICAL: CSS Import Required**

**You MUST import the CSS file for components to display correctly:**

```javascript
// Add this import to your main application file (App.js, index.js, etc.)
import "sail-ui-kit/dist/index.css";
```

**Without this CSS import, components will render as unstyled HTML elements.**

### Peer Dependencies

Ensure your project has the following peer dependencies installed:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

## Available Components

### 1. SAIL Form Components

A comprehensive form system designed specifically for maritime applications, featuring popup modals with functional stepper navigation and card-based content areas.

#### Features
- **📱 Responsive Design**: Optimized for both desktop and mobile devices with adaptive modal sizing
- **🔄 Functional Stepper Navigation**: Click-to-navigate between form sections with visual feedback
- **🎨 Maritime Theme**: Professional blue color scheme (#16569e) matching maritime industry standards
- **🖼️ Popup Modal Design**: Full-screen popup with proper overlay, shadows, and card-based content
- **📝 Complete Form Templates**: Ready-to-use Seafarer Information and Appraisal Period sections
- **📊 Interactive Tables**: Built-in FormTable component with add/edit/delete functionality and comment system
- **💾 Auto-save Support**: Built-in save draft and submit functionality with proper button styling
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🔧 TypeScript**: Complete type safety and IntelliSense support
- **🎯 Maritime-Specific Fields**: Pre-built fields for ranks, vessels, nationalities, and appraisal types

#### FormTable Component (NEW in v1.0.6)

The FormTable component provides standardized table functionality for dynamic data entry across all maritime applications.

**Key Features:**
- Configurable columns (text, select, number, readonly)
- Add/delete rows dynamically
- Inline editing with auto-save
- Expandable comment system
- Action buttons (comment, delete)
- Empty state messaging
- Responsive design with horizontal scroll
- Maritime styling consistency

**Basic Usage:**
```tsx
import { FormTable, TableColumn, TableRow } from 'sail-ui-kit';

const columns: TableColumn[] = [
  { id: 'sno', header: 'S.No', type: 'readonly', width: '60px' },
  { id: 'training', header: 'Training', type: 'text', placeholder: 'Enter training name' },
  { 
    id: 'evaluation', 
    header: 'Evaluation', 
    type: 'select',
    options: [
      { value: '5-exceeded', label: '5- Exceeded Expectations' },
      { value: '4-meets', label: '4- Meets Expectations' }
    ]
  }
];

<FormTable
  title="Training Records"
  columns={columns}
  data={trainingData}
  onDataChange={setTrainingData}
  addButtonText="Add Training"
  showActions={true}
  showComments={true}
/>
```

#### Props Interface
```typescript
interface SAILFormProps {
  title: string;                        // Form title shown in header
  sections: SAILFormSection[];          // Array of form sections with clickable navigation
  isOpen: boolean;                      // Controls form visibility
  onClose: () => void;                  // Close handler
  onSave?: () => void;                  // Save draft handler (triggers blue button)
  onSubmit?: () => void;                // Submit handler (triggers green button)
  showSaveButton?: boolean;             // Show/hide save button (default: true)
  showSubmitButton?: boolean;           // Show/hide submit button (default: true)
  saveButtonText?: string;              // Custom save button text (default: "Save Draft")
  submitButtonText?: string;            // Custom submit button text (default: "Submit")
  initialSection?: string;              // Initial section to show
  className?: string;                   // Additional CSS classes
}

interface SAILFormSection {
  id: string;                          // Unique section identifier
  title: string;                       // Section title (e.g., "Part A: Seafarer's Information")
  letter?: string;                     // Section letter (auto-generated if not provided)
  description?: string;                // Section description
  isVisible?: boolean;                 // Section visibility (default: true)
  isCompleted?: boolean;               // Completion status (affects styling)
  content: React.ReactNode;            // Section content
}
```

#### Usage Example - Ready-to-Use Form
```tsx
import React from 'react';
import { ExampleSAILForm } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling

const CrewAppraisalPage = () => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  
  const handleSave = (data) => {
    console.log('Saving form data:', data);
    // Implement save logic
  };
  
  const handleSubmit = (data) => {
    console.log('Submitting form:', data);
    setIsFormOpen(false);
    // Implement submit logic
  };

  return (
    <div>
      <Button onClick={() => setIsFormOpen(true)}>
        New Crew Appraisal
      </Button>
      
      {/* Complete crew appraisal form with functional navigation */}
      <ExampleSAILForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
```

#### Usage Example - Custom Form Implementation
```tsx
import React from 'react';
import { SAILForm, Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling

const CustomMaritimeForm = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          
          <div className="flex justify-end mt-8">
            <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-6">
              Save
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'training-records', 
      title: 'Part B: Training & Target Setting',
      description: 'Manage training history and development targets',
      content: (
        <div className="space-y-8">
          {/* B1. Training Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#4A90E2]">
                B1. Trainings conducted prior joining vessel (To Assess Effectiveness)
              </h3>
              <Button variant="outline" className="text-[#4A90E2] border-[#4A90E2]">
                + Add Training
              </Button>
            </div>
            
            {/* Table Structure */}
            <div className="bg-gray-50 border border-gray-200 rounded-t">
              <div className="grid grid-cols-4 gap-4 p-3 text-sm font-medium text-gray-700">
                <div>S.No</div>
                <div>Training</div>
                <div>Evaluation</div>
                <div>Actions</div>
              </div>
            </div>
            
            <div className="border border-gray-200 border-t-0 rounded-b bg-white p-8 text-center">
              <p className="text-gray-500">No trainings added yet. Click "Add Training" to get started.</p>
            </div>
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
      )
    }
  ];

  return (
    <SAILForm
      title="Crew Appraisal Form"
      sections={sections}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={() => console.log('Save')}
      onSubmit={() => console.log('Submit')}
      saveButtonText="Save Draft"
      submitButtonText="Submit"
    />
  );
};
```

#### Available SAIL Form Components

**ExampleSAILForm**: Ready-to-use complete crew appraisal form
- Pre-built Section A: Seafarer's Information with all maritime fields
- Pre-built Section B: Training and Target Setting with interactive tables
- Functional stepper navigation between sections
- Proper styling and validation

**SAILForm**: Main form container with popup modal and stepper navigation
**SAILFormField**: Standardized form field components  
**SAILFormGrid**: Responsive grid layout for form fields
**SAILFormSectionComponent**: Section wrapper components
**SAILTable**: Interactive tables with CRUD functionality
**SAILFormActions**: Action button containers

### 2. StandardTopNavigationBar

A horizontal navigation bar with module navigator and customizable navigation items.

#### Features
- Horizontal navigation layout
- Module navigator dropdown
- Customizable navigation items with icons
- Active section highlighting
- Responsive design
- Blue header styling (#F1F1F1 with #5DADE2 border)

#### Props Interface
```typescript
interface StandardTopNavigationBarProps {
  currentModule: string;                    // Current active module identifier
  onModuleChange: (moduleId: string) => void; // Module change handler
  navigationItems?: NavigationItem[];       // Optional navigation items
  activeSection?: string;                   // Currently active section ID
  logoSrc?: string;                        // Custom logo source
  logoAlt?: string;                        // Logo alt text
  className?: string;                      // Additional CSS classes
}

interface NavigationItem {
  id: string;                              // Unique identifier
  label: string;                           // Display text
  icon: React.ReactNode | ((color: string) => React.ReactNode); // Icon or icon function
  onClick?: (id: string) => void;          // Click handler
}
```

#### Usage Example
```tsx
import React from 'react';
import { StandardTopNavigationBar, type NavigationItem } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling
import { Users, FileText, Settings, BarChart } from 'lucide-react';

// Define navigation items for your module
const navigationItems: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (color) => <BarChart size={16} color={color} />,
    onClick: (id) => navigate(`/${id}`)
  },
  {
    id: 'crew',
    label: 'Crew',
    icon: (color) => <Users size={16} color={color} />,
    onClick: (id) => navigate(`/${id}`)
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (color) => <FileText size={16} color={color} />,
    onClick: (id) => navigate(`/${id}`)
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (color) => <Settings size={16} color={color} />,
    onClick: (id) => navigate(`/${id}`)
  }
];

function App() {
  const [currentModule, setCurrentModule] = useState('crew-appraisals');
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div>
      <StandardTopNavigationBar
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        navigationItems={navigationItems}
        activeSection={activeSection}
        logoSrc="/your-logo.png"
        logoAlt="Your Company Logo"
      />
      {/* Your page content */}
    </div>
  );
}
```

### 3. StandardLeftSidebar

A compact vertical sidebar with customizable top and bottom sections.

#### Features
- Compact 67px width design
- Blue top section (#52baf3) with icon and label
- Dark blue bottom section (#16569e) for content
- Responsive behavior (hidden on mobile, visible on lg+ screens)
- Configurable dimensions and positioning
- Custom content areas

#### Props Interface
```typescript
interface StandardLeftSidebarProps {
  topSection?: SidebarSection;             // Optional top section configuration
  bottomSection?: React.ReactNode;        // Optional bottom section content
  width?: number;                         // Sidebar width in pixels (default: 67)
  topOffset?: number;                     // Top offset in pixels (default: 66)
  className?: string;                     // Additional CSS classes
  hidden?: string;                        // Responsive visibility classes (default: 'lg:block hidden')
}

interface SidebarSection {
  icon: React.ReactNode;                  // Icon for the section
  label: string;                          // Label text
}
```

#### Usage Example
```tsx
import React from 'react';
import { StandardLeftSidebar } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling
import { Filter, Users } from 'lucide-react';

function App() {
  const topSection = {
    icon: <Users size={16} color="white" />,
    label: "All"
  };

  const bottomContent = (
    <div className="p-2 space-y-2">
      <button className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        <Filter size={16} className="mx-auto" />
      </button>
      <div className="text-white text-xs text-center">
        Filters
      </div>
    </div>
  );

  return (
    <div>
      <StandardLeftSidebar
        topSection={topSection}
        bottomSection={bottomContent}
        width={67}
        topOffset={66}
      />
      {/* Your main content */}
    </div>
  );
}
```

### 4. SCOMPMainTableScreen

A comprehensive full-screen table layout component with integrated navigation, dynamic filtering, and AG Grid Enterprise support. Designed for data-heavy maritime applications like crew management, inspections, audits, and compliance tracking.

#### Features
- **Full-screen Layout**: Complete screen layout with integrated top navigation and left sidebar
- **Dynamic Filtering**: Configurable filters (search, select, date) with toggle show/hide functionality
- **AG Grid Integration**: Enterprise-grade data table with advanced features
- **Responsive Design**: Flex-based column sizing and mobile-optimized layout
- **Actions Column**: Pinned actions column with view/edit/delete buttons
- **Multi-Module Support**: Configurable navigation for different TMSA modules
- **Maritime Theming**: Consistent colors (#5DADE2, #52baf3, #16569e) across all components
- **Filter Popup Transparency Fix**: Solid white backgrounds for clear readability
- **TypeScript Support**: Fully typed props and configuration interfaces

#### Props Interface
```typescript
export interface SCOMPMainTableScreenProps {
  // Navigation Configuration
  currentModule?: string;
  navigationItems?: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    isActive?: boolean;
  }>;
  
  // Sidebar Configuration  
  sidebarItems?: Array<{
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
  }>;
  
  // Main Content Configuration
  screenTitle: string;
  showFilters?: boolean;
  filters?: FilterConfig[];
  
  // Table Configuration - AG Grid ColDef compatible
  sampleData?: any[];
  columnDefs?: Array<{
    field: string;
    headerName: string;
    width?: number;
    flex?: number;           // Responsive sizing
    minWidth?: number;       // Minimum width before scroll
    filter?: string | boolean;
    sortable?: boolean;
    resizable?: boolean;
    pinned?: 'left' | 'right';  // Pin columns
    cellRenderer?: any;      // Custom cell renderers
    cellStyle?: any;
  }>;
  
  // Actions
  primaryAction?: {
    label: string;
    icon?: React.ReactNode;
  };
  
  // Layout Options
  className?: string;
  previewMode?: boolean;
}

export interface FilterConfig {
  id: string;
  type: 'search' | 'select' | 'date' | 'dateRange' | 'number';
  placeholder?: string;
  label?: string;
  options?: Array<{ value: string; label: string }>;
  width?: string;
}
```

#### Usage Example - Basic Implementation
```tsx
import React from 'react';
import { SCOMPMainTableScreen, ActionsCellRenderer } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling
import { Users, FileText, Settings, PlusIcon } from 'lucide-react';

const CrewManagementScreen = () => {
  const navigationItems = [
    { id: 'crew', label: 'Crew List', icon: <Users size={16} />, isActive: true },
    { id: 'appraisals', label: 'Appraisals', icon: <FileText size={16} />, isActive: false },
    { id: 'reports', label: 'Reports', icon: <FileText size={16} />, isActive: false },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} />, isActive: false }
  ];

  const filters = [
    { id: 'search', type: 'search', placeholder: 'Search crew members...', label: 'Search' },
    { 
      id: 'rank', 
      type: 'select', 
      placeholder: 'Select rank...', 
      label: 'Rank',
      options: [
        { value: 'master', label: 'Master' },
        { value: 'chief-officer', label: 'Chief Officer' },
        { value: 'able-seaman', label: 'Able Seaman' }
      ]
    },
    { id: 'dateFrom', type: 'date', label: 'From Date' }
  ];

  const columnDefs = [
    { 
      field: 'id', 
      headerName: 'Crew ID', 
      flex: 1, 
      minWidth: 120,
      filter: 'agTextColumnFilter', 
      sortable: true 
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 2, 
      minWidth: 160,
      filter: 'agTextColumnFilter', 
      sortable: true 
    },
    { 
      field: 'rank', 
      headerName: 'Rank', 
      flex: 1, 
      minWidth: 130,
      filter: 'agSetColumnFilter', 
      sortable: true 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filter: false,
      resizable: false,
      pinned: 'right',  // Always visible during horizontal scroll
      cellRenderer: ActionsCellRenderer  // Built-in actions component
    }
  ];

  const sampleData = [
    { id: 'CREW001', name: 'James Wilson', rank: 'Master' },
    { id: 'CREW002', name: 'Maria Rodriguez', rank: 'Chief Officer' },
    { id: 'CREW003', name: 'Ahmed Al-Rashid', rank: 'Able Seaman' }
  ];

  return (
    <SCOMPMainTableScreen
      currentModule="Crew Management"
      navigationItems={navigationItems}
      screenTitle="Crew Management"
      showFilters={true}
      filters={filters}
      columnDefs={columnDefs}
      sampleData={sampleData}
      primaryAction={{
        label: 'Add New Crew',
        icon: <PlusIcon size={16} />
      }}
    />
  );
};
```

#### Advanced Usage - Custom Module Configuration
```tsx
import { SCOMPMainTableScreen } from 'sail-ui-kit';
import { Shield, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const PortStateControlScreen = () => {
  const customNavigationItems = [
    { id: 'inspections', label: 'Inspections', icon: <Shield size={16} />, isActive: true },
    { id: 'certificates', label: 'Certificates', icon: <CheckCircle size={16} />, isActive: false },
    { id: 'deficiencies', label: 'Deficiencies', icon: <AlertTriangle size={16} />, isActive: false },
    { id: 'reports', label: 'Reports', icon: <FileText size={16} />, isActive: false }
  ];

  const advancedFilters = [
    { id: 'search', type: 'search', placeholder: 'Search inspections...', label: 'Search' },
    { 
      id: 'port', 
      type: 'select', 
      placeholder: 'Select port...', 
      label: 'Port',
      options: [
        { value: 'hamburg', label: 'Hamburg' },
        { value: 'rotterdam', label: 'Rotterdam' },
        { value: 'singapore', label: 'Singapore' }
      ]
    },
    { 
      id: 'status', 
      type: 'select', 
      placeholder: 'Select status...', 
      label: 'Status',
      options: [
        { value: 'passed', label: 'Passed' },
        { value: 'deficiencies', label: 'Deficiencies Found' },
        { value: 'detained', label: 'Detained' }
      ]
    },
    { id: 'dateFrom', type: 'date', label: 'From Date' },
    { id: 'dateTo', type: 'date', label: 'To Date' }
  ];

  const columnDefs = [
    { field: 'inspectionId', headerName: 'Inspection ID', flex: 1.5, minWidth: 140, filter: 'agTextColumnFilter', sortable: true },
    { field: 'vessel', headerName: 'Vessel', flex: 2, minWidth: 160, filter: 'agTextColumnFilter', sortable: true },
    { field: 'port', headerName: 'Port', flex: 1, minWidth: 120, filter: 'agSetColumnFilter', sortable: true },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      minWidth: 120,
      filter: 'agSetColumnFilter', 
      sortable: true,
      cellRenderer: (params: any) => {
        const status = params.value;
        const colorClass = status === 'Passed' ? 'bg-green-100 text-green-800' : 
                          status === 'Deficiencies' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800';
        return `<span class="inline-flex px-2 py-1 rounded-full text-xs font-medium ${colorClass}">${status}</span>`;
      }
    },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 110, filter: 'agDateColumnFilter', sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filter: false,
      resizable: false,
      pinned: 'right',
      cellRenderer: ActionsCellRenderer
    }
  ];

  return (
    <SCOMPMainTableScreen
      currentModule="Port State Control"
      navigationItems={customNavigationItems}
      screenTitle="Port State Control Inspections"
      showFilters={true}
      filters={advancedFilters}
      columnDefs={columnDefs}
      sampleData={inspectionData}
      primaryAction={{
        label: 'New Inspection',
        icon: <PlusIcon size={16} />
      }}
    />
  );
};
```

#### ActionsCellRenderer Component
The built-in ActionsCellRenderer provides standard view/edit/delete buttons:

```tsx
// Built-in component - no import needed, included with SCOMPMainTableScreen
{
  field: 'actions',
  headerName: 'Actions',
  width: 120,
  sortable: false,
  filter: false,
  resizable: false,
  pinned: 'right',
  cellRenderer: ActionsCellRenderer  // Provides view/edit/delete buttons
}
```

#### Recent Improvements (Latest Version)
- **✅ Filter Popup Transparency Fix**: AG Grid filter dialogs now have solid white backgrounds with clear text readability
- **✅ Actions Column Pinning**: Actions column stays visible on the right during horizontal scrolling
- **✅ Responsive Column Sizing**: Flex-based column widths eliminate white space and improve mobile responsiveness
- **✅ Dialog Close Button**: Proper state management for modal close functionality in Component Showcase
- **✅ ActionsCellRenderer**: React component for consistent view/edit/delete buttons across all tables
- **✅ Filter Toggle**: Smooth show/hide filters with state persistence

#### AG Grid Integration Requirements
To use SCOMPMainTableScreen with actual AG Grid functionality, ensure you have:

```bash
# Install AG Grid Enterprise
npm install ag-grid-enterprise ag-grid-react
```

```tsx
// In your implementation file
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

// Replace the table placeholder with actual AgGridReact component
<AgGridReact
  rowData={sampleData}
  columnDefs={columnDefs}
  defaultColDef={{
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true
  }}
  sideBar={{
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: null
  }}
  className="ag-theme-alpine"
/>
```

#### CSS Requirements for Filter Popup Fix
Include this CSS in your application for proper filter popup styling:

```css
/* AG Grid Filter Popup Styling */
.ag-theme-alpine .ag-filter-wrapper,
.ag-theme-alpine .ag-popup,
.ag-theme-alpine .ag-filter-panel {
  background-color: white !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  z-index: 1000 !important;
}

.ag-theme-alpine .ag-set-filter-item {
  background-color: white !important;
  color: #374151 !important;
}

.ag-theme-alpine .ag-set-filter-item:hover {
  background-color: #f3f4f6 !important;
}
```

## Implementation Guidelines

### 1. Project Setup

#### Step 1: Install the Package
```bash
npm install sail-ui-kit
```

#### Step 2: Import CSS (REQUIRED)
```tsx
// Add this to your main App.js, index.js, or root component
import 'sail-ui-kit/dist/index.css';
```

#### Step 3: Import Components
```tsx
import { 
  StandardTopNavigationBar, 
  StandardLeftSidebar,
  SCOMPMainTableScreen,
  ActionsCellRenderer,
  SAILForm,
  ExampleSAILForm,
  Button,
  Input,
  Select,
  // ... other components
  type NavigationItem,
  type SidebarSection,
  type SAILFormProps,
  type SAILFormSection,
  type SCOMPMainTableScreenProps,
  type FilterConfig
} from 'sail-ui-kit';

// CSS import (if not in root component)
import 'sail-ui-kit/dist/index.css';
```

#### Step 4: Configure Tailwind CSS
Ensure your `tailwind.config.js` includes the necessary color configurations:

```javascript
module.exports = {
  // ... other config
  theme: {
    extend: {
      colors: {
        'sail-blue': '#52baf3',
        'sail-dark-blue': '#16569e',
        'sail-border': '#5DADE2',
        'sail-gray': '#F1F1F1'
      }
    }
  }
}
```

### 2. Layout Structure

The recommended layout structure for TMSA modules:

```tsx
function TMSAModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <StandardTopNavigationBar
        currentModule="your-module"
        onModuleChange={handleModuleChange}
        navigationItems={navigationItems}
        activeSection={activeSection}
      />
      
      {/* Main Content Area */}
      <div className="relative">
        {/* Left Sidebar */}
        <StandardLeftSidebar
          topSection={sidebarTopSection}
          bottomSection={sidebarBottomContent}
        />
        
        {/* Main Content */}
        <main className="lg:ml-[67px] pt-4 px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 3. Module Configuration

Each TMSA module should define its navigation structure:

```tsx
// config/navigation.ts
import { NavigationItem } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling
import { Icons } from './icons';

export const MODULE_NAVIGATION: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (color) => <Icons.Dashboard color={color} />,
    onClick: (id) => navigate(`/${id}`)
  },
  {
    id: 'data-entry',
    label: 'Data Entry',
    icon: (color) => <Icons.Edit color={color} />,
    onClick: (id) => navigate(`/${id}`)
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (color) => <Icons.Reports color={color} />,
    onClick: (id) => navigate(`/${id}`)
  }
];

export const SIDEBAR_CONFIG = {
  topSection: {
    icon: <Icons.Module color="white" />,
    label: "All"
  }
};
```

### 4. State Management

Recommended state management pattern:

```tsx
function useNavigationState() {
  const [currentModule, setCurrentModule] = useState('your-module');
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const handleModuleChange = useCallback((moduleId: string) => {
    setCurrentModule(moduleId);
    // Navigate to module or handle module change
  }, []);
  
  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    // Navigate to section or handle section change
  }, []);
  
  return {
    currentModule,
    activeSection,
    handleModuleChange,
    handleSectionChange
  };
}
```

## Best Practices

### 1. SAIL Form Guidelines

#### Form Structure
- Use descriptive section titles following maritime conventions (e.g., "Part A: Seafarer's Information")
- Implement logical section progression from basic to detailed information
- Keep sections focused on specific functional areas
- Use consistent field groupings within sections

#### Visual Design
- Follow the maritime color scheme (#4A90E2 for active elements)
- Use white content cards on gray backgrounds for proper visual hierarchy
- Maintain consistent spacing and typography across sections
- Implement proper hover states and visual feedback

#### Data Management
- Implement proper form validation using React Hook Form and Zod
- Use meaningful field names that match your data model
- Handle save and submit operations appropriately
- Provide clear feedback for user actions

#### Accessibility
- Ensure all form fields have proper labels
- Implement keyboard navigation for the stepper
- Use semantic HTML structure within form content
- Provide clear error messages and validation feedback

### 2. Icon Guidelines
- Use consistent icon libraries (recommend `lucide-react`)
- Icons should be 16px for navigation items
- Support both static icons and color-function icons
- Ensure icons are accessible with proper ARIA labels

### 3. Navigation Items
- Keep navigation item labels concise (1-2 words)
- Use descriptive IDs that match your routing structure
- Implement proper click handlers that integrate with your routing solution
- Maximum of 6-8 navigation items for optimal UX

### 4. Responsive Design
- The sidebar automatically hides on mobile (`lg:block hidden`)
- Ensure your main content has proper margins (`lg:ml-[67px]`)
- Test navigation on mobile devices
- Consider touch-friendly interaction patterns

### 5. Accessibility
- Provide meaningful alt text for logos
- Ensure proper ARIA labels for interactive elements
- Maintain keyboard navigation support
- Use semantic HTML structure

### 6. Performance
- Lazy load icons when possible
- Optimize images (logos) for web delivery
- Use React.memo for navigation components if needed
- Minimize re-renders with proper key props

## Troubleshooting

### Common Issues

#### 1. Components Render Without Styling

**Problem**: Components appear as plain HTML without maritime styling, similar to the screenshot you showed.

**Solution**: You must import the CSS file. Add this to your main application file:

```javascript
import 'sail-ui-kit/dist/index.css';
```

**Example**: In your `App.js` or `index.js`:
```javascript
import React from 'react';
import { Button, ExampleSAILForm } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // THIS IS REQUIRED

function App() {
  return (
    <div>
      <Button>This button will now have proper styling</Button>
    </div>
  );
}
```

#### 2. TypeScript Import Errors

**Problem**: TypeScript cannot find module 'sail-ui-kit'.

**Solution**: Ensure you have the correct package name and version:
```bash
npm uninstall @sail/foundation  # Remove old package if present
npm install sail-ui-kit@latest  # Install correct package
```

#### 3. Missing Components or Types

**Problem**: Cannot import specific components or types.

**Solution**: Check the component is exported from the main package:
```javascript
// ✅ Correct
import { Button, ExampleSAILForm } from 'sail-ui-kit';

// ❌ Incorrect (old package name)
import { Button } from '@sail/foundation';
```

### Agent Instructions for TMSA Module Development

When creating new TMSA modules, always:

1. **Install Package**: `npm install sail-ui-kit`
2. **Import CSS**: Add `import 'sail-ui-kit/dist/index.css';` to main component
3. **Use Components**: Import from `sail-ui-kit` package
4. **Follow Maritime Styling**: Use blue color scheme (#5DADE2, #4A90E2)
5. **Test Styling**: Verify components render with proper maritime styling

## Module Integration Examples

### Example 1: Maritime Form Integration
```tsx
import React from 'react';
import { 
  StandardTopNavigationBar, 
  StandardLeftSidebar, 
  ExampleSAILForm,
  Button 
} from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling
import { FileText, Users, Settings } from 'lucide-react';

const CrewAppraisalModule = () => {
  const [showForm, setShowForm] = useState(false);
  
  const navigationItems = [
    {
      id: 'appraisals',
      label: 'Appraisals',
      icon: (color: string) => <FileText size={16} color={color} />,
      onClick: (id) => navigate(`/crew/${id}`)
    },
    {
      id: 'crew-list',
      label: 'Crew List', 
      icon: (color: string) => <Users size={16} color={color} />,
      onClick: (id) => navigate(`/crew/${id}`)
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (color: string) => <Settings size={16} color={color} />,
      onClick: (id) => navigate(`/crew/${id}`)
    }
  ];

  const handleSaveAppraisal = (data) => {
    // Handle form save
    console.log('Saving appraisal:', data);
  };

  const handleSubmitAppraisal = (data) => {
    // Handle form submission
    console.log('Submitting appraisal:', data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StandardTopNavigationBar
        currentModule="crew-appraisals"
        onModuleChange={handleModuleChange}
        navigationItems={navigationItems}
        activeSection="appraisals"
      />
      
      <div className="relative">
        <StandardLeftSidebar
          topSection={{
            icon: <Users size={16} color="white" />,
            label: "All"
          }}
          bottomSection={<AppraisalFilters />}
        />
        
        <main className="lg:ml-[67px] pt-4 px-4">
          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-[#5DADE2] hover:bg-[#4A9BD1]"
            >
              New Crew Appraisal
            </Button>
          </div>
          
          {/* Appraisal List */}
          <AppraisalsList />
          
          {/* SAIL Form Modal */}
          <ExampleSAILForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            onSave={handleSaveAppraisal}
            onSubmit={handleSubmitAppraisal}
          />
        </main>
      </div>
    </div>
  );
};
```

### Example 2: Crew Management Module
```tsx
import { StandardTopNavigationBar, StandardLeftSidebar } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling
import { Users, UserPlus, FileText, Settings } from 'lucide-react';

const CrewManagementApp = () => {
  const navigationItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (color: string) => <Users size={16} color={color} />,
      onClick: (id) => navigate(`/crew/${id}`)
    },
    {
      id: 'add-crew',
      label: 'Add Crew',
      icon: (color: string) => <UserPlus size={16} color={color} />,
      onClick: (id) => navigate(`/crew/${id}`)
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: (color: string) => <FileText size={16} color={color} />,
      onClick: (id) => navigate(`/crew/${id}`)
    }
  ];

  return (
    <div>
      <StandardTopNavigationBar
        currentModule="crew-management"
        onModuleChange={handleModuleChange}
        navigationItems={navigationItems}
        activeSection="overview"
      />
      <StandardLeftSidebar
        topSection={{
          icon: <Users size={16} color="white" />,
          label: "All"
        }}
        bottomSection={<CrewFilters />}
      />
      {/* Main content */}
    </div>
  );
};
```

### Example 3: Safety Compliance Module
```tsx
import { StandardTopNavigationBar, StandardLeftSidebar } from 'sail-ui-kit';
import 'sail-ui-kit/dist/index.css'; // Required for styling
import { Shield, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const SafetyComplianceApp = () => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (color: string) => <Shield size={16} color={color} />,
      onClick: (id) => navigate(`/safety/${id}`)
    },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: (color: string) => <AlertTriangle size={16} color={color} />,
      onClick: (id) => navigate(`/safety/${id}`)
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: (color: string) => <CheckCircle size={16} color={color} />,
      onClick: (id) => navigate(`/safety/${id}`)
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: (color: string) => <FileText size={16} color={color} />,
      onClick: (id) => navigate(`/safety/${id}`)
    }
  ];

  return (
    <div>
      <StandardTopNavigationBar
        currentModule="safety-compliance"
        onModuleChange={handleModuleChange}
        navigationItems={navigationItems}
        activeSection="dashboard"
      />
      <StandardLeftSidebar
        topSection={{
          icon: <Shield size={16} color="white" />,
          label: "Safety"
        }}
        bottomSection={<SafetyFilters />}
      />
      {/* Main content */}
    </div>
  );
};
```

## Troubleshooting

### Common Issues

#### 1. Styles Not Applied
**Problem**: Navigation components don't have proper styling.
**Solution**: Ensure Tailwind CSS is properly configured and includes the necessary classes.

#### 2. Icons Not Displaying
**Problem**: Navigation icons are not showing.
**Solution**: 
- Verify icon library is installed (`lucide-react`, etc.)
- Check that icon components are properly imported
- Ensure icon functions receive the color parameter

#### 3. Mobile Responsiveness Issues
**Problem**: Sidebar shows on mobile or content is not properly positioned.
**Solution**:
- Use the default `hidden` prop value: `'lg:block hidden'`
- Apply proper margin classes to main content: `lg:ml-[67px]`
- Test responsive behavior on different screen sizes

#### 4. Navigation Not Working
**Problem**: Clicking navigation items doesn't change routes.
**Solution**:
- Implement proper `onClick` handlers in `NavigationItem`
- Ensure routing library is properly configured
- Check that navigation state is managed correctly

#### 5. Type Errors
**Problem**: TypeScript errors when using components.
**Solution**:
- Import types from `@sail/foundation`
- Ensure props match the expected interfaces
- Update TypeScript configuration if needed

### Performance Optimization

#### 1. Bundle Size
- Import only needed components: `import { StandardTopNavigationBar } from '@sail/foundation'`
- Consider code splitting for large applications
- Optimize icon assets

#### 2. Re-rendering
- Use `React.memo` for static navigation items
- Implement proper key props for dynamic lists
- Optimize state updates

### Browser Compatibility

The package supports:
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- React 18+
- Node.js 16+

## Support and Contributing

For issues, feature requests, or contributions:
1. Check existing documentation
2. Review implementation examples
3. Contact the SAIL Phase 2 development team
4. Follow the established coding standards for maritime applications

## Version History

### v1.0.1 (Current)
- **CRITICAL FIX**: CSS export issue resolved - components now render with proper styling
- Updated package name to `sail-ui-kit` 
- Added comprehensive CSS import documentation
- Fixed icon import errors (Grid3X3 → LayoutGrid)
- Updated all examples with correct package name and CSS imports

### v1.0.0
- Initial release
- StandardTopNavigationBar component  
- StandardLeftSidebar component
- SCOMPMainTableScreen component with AG Grid Enterprise integration
- ActionsCellRenderer for standardized table actions
- SAIL Form system with popup modals and stepper navigation
- ExampleSAILForm with complete crew appraisal implementation
- SAILForm, SAILFormField, and related form components
- Interactive maritime tables and form elements
- Filter popup transparency fixes for better readability
- Responsive flex-based column sizing
- TypeScript support
- Full documentation and examples

---

**Note**: This package is specifically designed for SAIL Phase 2 TMSA modules and follows maritime industry UI/UX standards. For general React components, consider using other UI libraries.