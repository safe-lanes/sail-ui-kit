# ToggleGroup Component Guide

## Overview
The ToggleGroup component provides grouped toggle controls for maritime applications. It enables multiple selection and exclusive selection scenarios for vessel classifications, crew assignments, and operational options with TMSA-compliant styling.

## Component Interface

```typescript
interface ToggleGroupProps {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Selection Types**: Single or multiple selection modes
- **Visual Grouping**: Clear grouped appearance with connected borders
- **Keyboard Navigation**: Full accessibility support
- **Flexible Layout**: Horizontal and vertical orientations

## Basic Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from 'scomp-ui/sail-ui-kit';

function VesselTypeSelector() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Vessel Types for Fleet Report
        </label>
        <ToggleGroup
          type="multiple"
          value={selectedTypes}
          onValueChange={setSelectedTypes}
          className="justify-start"
        >
          <ToggleGroupItem 
            value="container" 
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white"
          >
            Container Ships
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="tanker" 
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white"
          >
            Oil Tankers
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="bulk" 
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white"
          >
            Bulk Carriers
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="general" 
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white"
          >
            General Cargo
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="cruise" 
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white"
          >
            Cruise Ships
          </ToggleGroupItem>
        </ToggleGroup>
        {selectedTypes.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {selectedTypes.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
```

## Crew Schedule Assignment

```tsx
interface ShiftAssignment {
  watchPeriod: string;
  departments: string[];
  alertLevel: string;
}

function CrewScheduleToggleGroups() {
  const [assignment, setAssignment] = useState<ShiftAssignment>({
    watchPeriod: '',
    departments: [],
    alertLevel: 'normal'
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-[#16569e] mb-6">
        Crew Schedule Assignment
      </h3>
      
      <div className="space-y-8">
        {/* Watch Period - Single Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Watch Period *
          </label>
          <ToggleGroup
            type="single"
            value={assignment.watchPeriod}
            onValueChange={(value) => setAssignment(prev => ({...prev, watchPeriod: value as string}))}
            className="justify-start"
          >
            <ToggleGroupItem 
              value="0000-0400" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-4 py-2"
            >
              00:00 - 04:00
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="0400-0800" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-4 py-2"
            >
              04:00 - 08:00
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="0800-1200" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-4 py-2"
            >
              08:00 - 12:00
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="1200-1600" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-4 py-2"
            >
              12:00 - 16:00
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="1600-2000" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-4 py-2"
            >
              16:00 - 20:00
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="2000-0000" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-4 py-2"
            >
              20:00 - 00:00
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Departments - Multiple Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Assigned Departments
          </label>
          <ToggleGroup
            type="multiple"
            value={assignment.departments}
            onValueChange={(value) => setAssignment(prev => ({...prev, departments: value as string[]}))}
            orientation="vertical"
            className="items-start space-y-2"
          >
            <ToggleGroupItem 
              value="bridge" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-full justify-start px-4 py-3"
            >
              <div className="flex items-center space-x-3">
                <Compass className="h-4 w-4" />
                <div>
                  <div className="font-medium">Bridge</div>
                  <div className="text-sm opacity-75">Navigation and Watch</div>
                </div>
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="engine" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-full justify-start px-4 py-3"
            >
              <div className="flex items-center space-x-3">
                <Cog className="h-4 w-4" />
                <div>
                  <div className="font-medium">Engine Room</div>
                  <div className="text-sm opacity-75">Mechanical Systems</div>
                </div>
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="deck" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-full justify-start px-4 py-3"
            >
              <div className="flex items-center space-x-3">
                <Anchor className="h-4 w-4" />
                <div>
                  <div className="font-medium">Deck Operations</div>
                  <div className="text-sm opacity-75">Cargo and Maintenance</div>
                </div>
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="galley" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-full justify-start px-4 py-3"
            >
              <div className="flex items-center space-x-3">
                <Chef className="h-4 w-4" />
                <div>
                  <div className="font-medium">Galley</div>
                  <div className="text-sm opacity-75">Food Service</div>
                </div>
              </div>
            </ToggleGroupItem>
          </ToggleGroup>
          {assignment.departments.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {assignment.departments.length} department{assignment.departments.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>

        {/* Alert Level - Single Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Alert Level
          </label>
          <ToggleGroup
            type="single"
            value={assignment.alertLevel}
            onValueChange={(value) => setAssignment(prev => ({...prev, alertLevel: value as string}))}
            className="justify-start"
          >
            <ToggleGroupItem 
              value="normal" 
              className="data-[state=on]:bg-green-600 data-[state=on]:text-white px-4 py-2"
            >
              Normal
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="elevated" 
              className="data-[state=on]:bg-yellow-600 data-[state=on]:text-white px-4 py-2"
            >
              Elevated
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="high" 
              className="data-[state=on]:bg-orange-600 data-[state=on]:text-white px-4 py-2"
            >
              High
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="critical" 
              className="data-[state=on]:bg-red-600 data-[state=on]:text-white px-4 py-2"
            >
              Critical
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Assignment Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Watch Period: {assignment.watchPeriod || 'Not selected'}</div>
            <div>Departments: {assignment.departments.length > 0 ? assignment.departments.join(', ') : 'None selected'}</div>
            <div>Alert Level: {assignment.alertLevel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Fleet Operations Filter

```tsx
function FleetOperationsFilter() {
  const [filters, setFilters] = useState({
    status: [] as string[],
    region: '',
    vesselTypes: [] as string[],
    priority: ''
  });

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-600' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-600' },
    { value: 'port', label: 'In Port', color: 'bg-blue-600' },
    { value: 'delayed', label: 'Delayed', color: 'bg-orange-600' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-600' }
  ];

  const regionOptions = [
    { value: 'atlantic', label: 'Atlantic', icon: Waves },
    { value: 'pacific', label: 'Pacific', icon: Waves },
    { value: 'indian', label: 'Indian Ocean', icon: Waves },
    { value: 'mediterranean', label: 'Mediterranean', icon: Waves },
    { value: 'gulf', label: 'Gulf', icon: Waves }
  ];

  const vesselTypeOptions = [
    { value: 'container', label: 'Container', icon: Package },
    { value: 'tanker', label: 'Tanker', icon: Fuel },
    { value: 'bulk', label: 'Bulk Carrier', icon: Package },
    { value: 'general', label: 'General Cargo', icon: Package }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-[#16569e] mb-6">
        Fleet Operations Filter
      </h3>
      
      <div className="space-y-8">
        {/* Vessel Status - Multiple Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Vessel Status
          </label>
          <ToggleGroup
            type="multiple"
            value={filters.status}
            onValueChange={(value) => setFilters(prev => ({...prev, status: value as string[]}))}
            className="flex-wrap gap-2"
          >
            {statusOptions.map((option) => (
              <ToggleGroupItem 
                key={option.value}
                value={option.value}
                className={`data-[state=on]:${option.color} data-[state=on]:text-white px-3 py-2 rounded-md border`}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Operating Region - Single Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Operating Region
          </label>
          <ToggleGroup
            type="single"
            value={filters.region}
            onValueChange={(value) => setFilters(prev => ({...prev, region: value as string}))}
            orientation="vertical"
            className="items-start space-y-1"
          >
            {regionOptions.map((option) => (
              <ToggleGroupItem 
                key={option.value}
                value={option.value}
                className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-full justify-start px-3 py-2"
              >
                <div className="flex items-center space-x-2">
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Vessel Types - Multiple Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Vessel Types
          </label>
          <ToggleGroup
            type="multiple"
            value={filters.vesselTypes}
            onValueChange={(value) => setFilters(prev => ({...prev, vesselTypes: value as string[]}))}
            className="grid grid-cols-2 gap-2"
          >
            {vesselTypeOptions.map((option) => (
              <ToggleGroupItem 
                key={option.value}
                value={option.value}
                className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white justify-start px-3 py-3"
              >
                <div className="flex items-center space-x-2">
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Priority Level - Single Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Priority Level
          </label>
          <ToggleGroup
            type="single"
            value={filters.priority}
            onValueChange={(value) => setFilters(prev => ({...prev, priority: value as string}))}
            className="justify-start"
          >
            <ToggleGroupItem 
              value="low" 
              className="data-[state=on]:bg-green-600 data-[state=on]:text-white px-4 py-2"
            >
              Low
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="medium" 
              className="data-[state=on]:bg-yellow-600 data-[state=on]:text-white px-4 py-2"
            >
              Medium
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="high" 
              className="data-[state=on]:bg-orange-600 data-[state=on]:text-white px-4 py-2"
            >
              High
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="urgent" 
              className="data-[state=on]:bg-red-600 data-[state=on]:text-white px-4 py-2"
            >
              Urgent
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => setFilters({
            status: [],
            region: '',
            vesselTypes: [],
            priority: ''
          })}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
        <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
```

## Maintenance Schedule Toggle

```tsx
function MaintenanceScheduleToggle() {
  const [scheduleOptions, setScheduleOptions] = useState({
    maintenanceType: [] as string[],
    urgency: '',
    departments: [] as string[],
    scheduleMode: 'planned'
  });

  const maintenanceTypes = [
    { value: 'engine', label: 'Engine Service', icon: Cog },
    { value: 'hull', label: 'Hull Inspection', icon: Shield },
    { value: 'safety', label: 'Safety Equipment', icon: AlertTriangle },
    { value: 'navigation', label: 'Navigation Systems', icon: Compass },
    { value: 'electrical', label: 'Electrical Systems', icon: Zap },
    { value: 'plumbing', label: 'Plumbing & HVAC', icon: Wrench }
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-[#16569e] mb-6">
        Maintenance Schedule Configuration
      </h3>
      
      <div className="space-y-8">
        {/* Schedule Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Schedule Mode
          </label>
          <ToggleGroup
            type="single"
            value={scheduleOptions.scheduleMode}
            onValueChange={(value) => setScheduleOptions(prev => ({...prev, scheduleMode: value as string}))}
            className="justify-start"
          >
            <ToggleGroupItem 
              value="planned" 
              className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-6 py-3"
            >
              <div className="text-center">
                <Calendar className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Planned</div>
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="emergency" 
              className="data-[state=on]:bg-red-600 data-[state=on]:text-white px-6 py-3"
            >
              <div className="text-center">
                <AlertTriangle className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Emergency</div>
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="condition" 
              className="data-[state=on]:bg-yellow-600 data-[state=on]:text-white px-6 py-3"
            >
              <div className="text-center">
                <Clock className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Condition Based</div>
              </div>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Maintenance Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Maintenance Types
          </label>
          <ToggleGroup
            type="multiple"
            value={scheduleOptions.maintenanceType}
            onValueChange={(value) => setScheduleOptions(prev => ({...prev, maintenanceType: value as string[]}))}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {maintenanceTypes.map((type) => (
              <ToggleGroupItem 
                key={type.value}
                value={type.value}
                className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white p-4 h-auto"
              >
                <div className="text-center">
                  <type.icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{type.label}</div>
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {scheduleOptions.maintenanceType.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {scheduleOptions.maintenanceType.length} maintenance type{scheduleOptions.maintenanceType.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>

        {/* Urgency Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Urgency Level
          </label>
          <ToggleGroup
            type="single"
            value={scheduleOptions.urgency}
            onValueChange={(value) => setScheduleOptions(prev => ({...prev, urgency: value as string}))}
            className="justify-start"
          >
            <ToggleGroupItem 
              value="routine" 
              className="data-[state=on]:bg-green-600 data-[state=on]:text-white px-4 py-2"
            >
              Routine
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="scheduled" 
              className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2"
            >
              Scheduled
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="priority" 
              className="data-[state=on]:bg-orange-600 data-[state=on]:text-white px-4 py-2"
            >
              Priority
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="critical" 
              className="data-[state=on]:bg-red-600 data-[state=on]:text-white px-4 py-2"
            >
              Critical
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Maintenance Schedule Summary
        </h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Mode: {scheduleOptions.scheduleMode || 'Not selected'}</div>
          <div>Types: {scheduleOptions.maintenanceType.length > 0 ? scheduleOptions.maintenanceType.join(', ') : 'None selected'}</div>
          <div>Urgency: {scheduleOptions.urgency || 'Not selected'}</div>
        </div>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Clear Visual States**: Ensure selected/unselected states are clearly distinguishable
2. **Logical Grouping**: Group related options together with appropriate spacing
3. **Icon Usage**: Use relevant maritime icons to enhance understanding
4. **Color Coding**: Use colors meaningfully (red for emergency, green for normal)
5. **Selection Feedback**: Provide clear feedback about current selections
6. **Accessibility**: Ensure keyboard navigation and screen reader support

## Context Requirements

The ToggleGroup component works with:
- **Form Libraries**: Integration with react-hook-form and validation
- **State Management**: Selection state handling and persistence
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Keyboard navigation and ARIA attributes

## Troubleshooting

### Common Issues

**Multiple selection not working**
```tsx
// Ensure proper type and value handling
const [selected, setSelected] = useState<string[]>([]);

<ToggleGroup
  type="multiple"
  value={selected}
  onValueChange={setSelected}
>
  {/* items */}
</ToggleGroup>
```

**Single selection clearing unexpectedly**
```tsx
// Use proper single selection pattern
const [single, setSingle] = useState<string>('');

<ToggleGroup
  type="single"
  value={single}
  onValueChange={(value) => setSingle(value as string)}
>
  {/* items */}
</ToggleGroup>
```

**Styling not applying correctly**
```tsx
// Use data attributes for proper styling
<ToggleGroupItem
  value="option"
  className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white data-[state=off]:bg-gray-100"
>
  Option
</ToggleGroupItem>
```