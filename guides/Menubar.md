# Menubar Component Guide

## Overview
The Menubar component provides a horizontal navigation bar with dropdown menus for maritime applications. It supports multi-level navigation, keyboard shortcuts, and TMSA-compliant styling for fleet management systems.

## Component Interface

```typescript
interface MenubarProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

interface MenubarItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

interface MenubarContentProps {
  className?: string;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
}
```

## Key Features
- **Maritime Navigation**: TMSA-compliant menu structure for fleet operations
- **Keyboard Support**: Full keyboard navigation with arrow keys and shortcuts
- **Multi-level Menus**: Support for nested menu structures
- **Responsive Design**: Adaptive layout for mobile and desktop
- **Accessibility**: ARIA-compliant menu implementation

## Basic Usage

```tsx
import { 
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut
} from 'scomp-ui/sail-ui-kit';

function FleetManagementMenubar() {
  return (
    <Menubar className="border-b border-gray-200 bg-white">
      <MenubarMenu>
        <MenubarTrigger className="text-[#16569e] hover:bg-blue-50">
          Fleet
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Vessel Registry
            <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Fleet Overview</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Add New Vessel</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className="text-[#16569e] hover:bg-blue-50">
          Crew
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Crew Management</MenubarItem>
          <MenubarItem>Appraisals</MenubarItem>
          <MenubarItem>Certifications</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Training Records</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className="text-[#16569e] hover:bg-blue-50">
          Operations
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Voyage Planning</MenubarItem>
          <MenubarItem>Port Operations</MenubarItem>
          <MenubarItem>Maintenance</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Maritime Fleet Navigation Example

```tsx
function MaritimeMenubarExample() {
  const handleNavigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <Menubar className="bg-[#16569e] text-white border-b border-blue-700">
      {/* Fleet Management */}
      <MenubarMenu>
        <MenubarTrigger className="text-white hover:bg-blue-600 data-[state=open]:bg-blue-600">
          Fleet Management
        </MenubarTrigger>
        <MenubarContent className="w-64">
          <MenubarItem onClick={() => handleNavigate('/fleet/vessels')}>
            Vessel Registry
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/fleet/status')}>
            Fleet Status Dashboard
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => handleNavigate('/fleet/add')}>
            Add New Vessel
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/fleet/import')}>
            Import Vessel Data
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Archive Vessel
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Crew Operations */}
      <MenubarMenu>
        <MenubarTrigger className="text-white hover:bg-blue-600 data-[state=open]:bg-blue-600">
          Crew Operations
        </MenubarTrigger>
        <MenubarContent className="w-56">
          <MenubarItem onClick={() => handleNavigate('/crew/management')}>
            Crew Management
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/crew/appraisals')}>
            Performance Appraisals
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/crew/certifications')}>
            STCW Certifications
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => handleNavigate('/crew/training')}>
            Training Programs
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/crew/medical')}>
            Medical Records
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Safety & Compliance */}
      <MenubarMenu>
        <MenubarTrigger className="text-white hover:bg-blue-600 data-[state=open]:bg-blue-600">
          Safety & Compliance
        </MenubarTrigger>
        <MenubarContent className="w-72">
          <MenubarItem onClick={() => handleNavigate('/safety/incidents')}>
            Incident Reporting
            <MenubarShortcut>⌘I</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/safety/audits')}>
            Safety Audits
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/safety/tmsa')}>
            TMSA Compliance
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => handleNavigate('/safety/risk-assessment')}>
            Risk Assessments
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/safety/emergency')}>
            Emergency Procedures
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Operations */}
      <MenubarMenu>
        <MenubarTrigger className="text-white hover:bg-blue-600 data-[state=open]:bg-blue-600">
          Operations
        </MenubarTrigger>
        <MenubarContent className="w-60">
          <MenubarItem onClick={() => handleNavigate('/operations/voyage')}>
            Voyage Planning
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/operations/ports')}>
            Port Operations
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/operations/cargo')}>
            Cargo Management
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => handleNavigate('/operations/maintenance')}>
            Maintenance Schedule
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/operations/fuel')}>
            Fuel Management
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Reports */}
      <MenubarMenu>
        <MenubarTrigger className="text-white hover:bg-blue-600 data-[state=open]:bg-blue-600">
          Reports
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => handleNavigate('/reports/performance')}>
            Performance Reports
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/reports/compliance')}>
            Compliance Reports
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/reports/financial')}>
            Financial Reports
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => handleNavigate('/reports/custom')}>
            Custom Reports
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Nested Menu Structure

```tsx
function NestedMenuExample() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Certificate Management</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>View All Certificates</MenubarItem>
          
          {/* Nested submenu for certificate types */}
          <MenubarMenu>
            <MenubarTrigger className="w-full justify-between">
              Add Certificate
              <ChevronRight className="h-4 w-4" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>STCW Certificate</MenubarItem>
              <MenubarItem>Medical Certificate</MenubarItem>
              <MenubarItem>Flag State Certificate</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Other Certificate</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          
          <MenubarSeparator />
          <MenubarItem>Expiry Notifications</MenubarItem>
          <MenubarItem>Renewal Reminders</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Mobile-Responsive Menubar

```tsx
function ResponsiveMaritimeMenubar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Menubar */}
      <div className="hidden md:block">
        <Menubar className="bg-[#16569e] text-white">
          <MenubarMenu>
            <MenubarTrigger>Fleet</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Vessel Registry</MenubarItem>
              <MenubarItem>Fleet Dashboard</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger>Crew</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Crew Management</MenubarItem>
              <MenubarItem>Appraisals</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden bg-[#16569e] p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#16569e] text-white p-4">
          <div className="space-y-2">
            <div className="font-medium py-2">Fleet Management</div>
            <div className="pl-4 space-y-1">
              <div className="py-1">Vessel Registry</div>
              <div className="py-1">Fleet Dashboard</div>
            </div>
            
            <div className="font-medium py-2">Crew Operations</div>
            <div className="pl-4 space-y-1">
              <div className="py-1">Crew Management</div>
              <div className="py-1">Appraisals</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

## Keyboard Navigation

```tsx
function KeyboardMenubar() {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Custom keyboard shortcuts
    if (event.metaKey || event.ctrlKey) {
      switch (event.key) {
        case 'f':
          event.preventDefault();
          console.log('Navigate to Fleet');
          break;
        case 'c':
          event.preventDefault();
          console.log('Navigate to Crew');
          break;
        case 's':
          event.preventDefault();
          console.log('Navigate to Safety');
          break;
      }
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Fleet</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Vessel Registry
              <MenubarShortcut>⌘F ⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Fleet Status
              <MenubarShortcut>⌘F ⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>Crew</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Crew Management
              <MenubarShortcut>⌘C ⌘M</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Appraisals
              <MenubarShortcut>⌘C ⌘A</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
```

## Dynamic Menu Content

```tsx
interface VesselType {
  id: string;
  name: string;
  category: string;
}

function DynamicVesselMenubar() {
  const vesselTypes: VesselType[] = [
    { id: 'container', name: 'Container Ship', category: 'cargo' },
    { id: 'tanker', name: 'Oil Tanker', category: 'cargo' },
    { id: 'bulk', name: 'Bulk Carrier', category: 'cargo' },
    { id: 'cruise', name: 'Cruise Ship', category: 'passenger' },
    { id: 'ferry', name: 'Ferry', category: 'passenger' }
  ];

  const groupedVessels = vesselTypes.reduce((acc, vessel) => {
    if (!acc[vessel.category]) acc[vessel.category] = [];
    acc[vessel.category].push(vessel);
    return acc;
  }, {} as Record<string, VesselType[]>);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Add New Vessel</MenubarTrigger>
        <MenubarContent className="w-64">
          {Object.entries(groupedVessels).map(([category, vessels]) => (
            <div key={category}>
              <div className="px-2 py-1 text-sm font-medium text-gray-500 uppercase">
                {category} Vessels
              </div>
              {vessels.map((vessel) => (
                <MenubarItem 
                  key={vessel.id}
                  onClick={() => console.log(`Creating ${vessel.name}`)}
                >
                  {vessel.name}
                </MenubarItem>
              ))}
              <MenubarSeparator />
            </div>
          ))}
          <MenubarItem>Custom Vessel Type</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Best Practices

1. **Logical Grouping**: Organize menu items by maritime functional areas
2. **Keyboard Shortcuts**: Provide shortcuts for frequently used actions
3. **Clear Labels**: Use descriptive names for maritime operations
4. **Visual Hierarchy**: Use separators and grouping for better organization
5. **Responsive Design**: Provide mobile-friendly navigation alternatives
6. **Accessibility**: Ensure proper ARIA labels and keyboard navigation

## Context Requirements

The Menubar component requires:
- **Navigation Context**: Integration with routing systems
- **Permission Context**: Role-based menu visibility
- **Theme Context**: Maritime color scheme consistency
- **Responsive Framework**: Mobile navigation handling

## Troubleshooting

### Common Issues

**Menu not opening on mobile**
```tsx
// Ensure proper touch event handling
<MenubarTrigger className="touch-manipulation">
  Fleet Operations
</MenubarTrigger>
```

**Keyboard navigation not working**
```tsx
// Wrap in proper focus management
<div role="menubar" aria-label="Maritime Navigation">
  <Menubar>
    {/* menu content */}
  </Menubar>
</div>
```

**Submenu positioning issues**
```tsx
// Use align and alignOffset for proper positioning
<MenubarContent align="start" alignOffset={4}>
  {/* submenu content */}
</MenubarContent>
```