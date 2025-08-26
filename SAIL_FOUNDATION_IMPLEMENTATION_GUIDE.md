# @sail/foundation Implementation Guide

## Overview

The `@sail/foundation` package provides standardized navigation components for SAIL Phase 2 TMSA modules. It ensures consistent UI/UX across all maritime applications while maintaining flexibility for module-specific customization.

## Package Information

- **Package Name**: `@sail/foundation`
- **Version**: `1.0.0`
- **License**: MIT
- **Author**: SAIL Phase 2 Team

## Installation

```bash
npm install @sail/foundation
```

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
- **🎨 Maritime Theme**: Professional blue color scheme (#4A90E2) matching maritime industry standards
- **🖼️ Popup Modal Design**: Full-screen popup with proper overlay, shadows, and card-based content
- **📝 Complete Form Templates**: Ready-to-use Seafarer Information and Appraisal Period sections
- **📊 Interactive Tables**: Built-in training and target setting tables with add/edit/delete functionality
- **💾 Auto-save Support**: Built-in save draft and submit functionality with proper button styling
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🔧 TypeScript**: Complete type safety and IntelliSense support
- **🎯 Maritime-Specific Fields**: Pre-built fields for ranks, vessels, nationalities, and appraisal types

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
import { ExampleSAILForm } from '@sail/foundation';

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
import { SAILForm, Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button } from '@sail/foundation';

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
import { StandardTopNavigationBar, type NavigationItem } from '@sail/foundation';
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
import { StandardLeftSidebar } from '@sail/foundation';
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

## Implementation Guidelines

### 1. Project Setup

#### Step 1: Install the Package
```bash
npm install @sail/foundation
```

#### Step 2: Import Components
```tsx
import { 
  StandardTopNavigationBar, 
  StandardLeftSidebar,
  SAILForm,
  ExampleSAILForm,
  type NavigationItem,
  type SidebarSection,
  type SAILFormProps,
  type SAILFormSection
} from '@sail/foundation';
```

#### Step 3: Configure Tailwind CSS
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
import { NavigationItem } from '@sail/foundation';
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

## Module Integration Examples

### Example 1: Maritime Form Integration
```tsx
import React from 'react';
import { 
  StandardTopNavigationBar, 
  StandardLeftSidebar, 
  ExampleSAILForm,
  Button 
} from '@sail/foundation';
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
import { StandardTopNavigationBar, StandardLeftSidebar } from '@sail/foundation';
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
import { StandardTopNavigationBar, StandardLeftSidebar } from '@sail/foundation';
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

### v1.0.0
- Initial release
- StandardTopNavigationBar component  
- StandardLeftSidebar component
- SAIL Form system with popup modals and stepper navigation
- ExampleSAILForm with complete crew appraisal implementation
- SAILForm, SAILFormField, and related form components
- Interactive maritime tables and form elements
- TypeScript support
- Full documentation and examples

---

**Note**: This package is specifically designed for SAIL Phase 2 TMSA modules and follows maritime industry UI/UX standards. For general React components, consider using other UI libraries.