# Button Component Guide

## Overview
The Button component provides consistent styling and behavior for maritime applications. It includes multiple variants, sizes, and states optimized for professional fleet management interfaces with maritime blue theming.

## Component Interface

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}
```

## Basic Button Variants

```jsx
import { Button } from 'scomp-ui';

function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Default - Maritime blue theme */}
      <Button variant="default">
        Add Vessel
      </Button>

      {/* Destructive - For delete/warning actions */}
      <Button variant="destructive">
        Delete Crew Member
      </Button>

      {/* Outline - Secondary actions */}
      <Button variant="outline">
        Edit Details
      </Button>

      {/* Secondary - Tertiary actions */}
      <Button variant="secondary">
        Export Data
      </Button>

      {/* Ghost - Minimal actions */}
      <Button variant="ghost">
        View More
      </Button>

      {/* Link - Text-based actions */}
      <Button variant="link">
        Open Documentation
      </Button>
    </div>
  );
}
```

## Button Sizes

```jsx
function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      {/* Small buttons */}
      <Button size="sm">Small</Button>

      {/* Default size */}
      <Button size="default">Default</Button>

      {/* Large buttons */}
      <Button size="lg">Large Button</Button>

      {/* Icon-only buttons */}
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

## Buttons with Icons

```jsx
import { Ship, Users, Download, Settings, Plus, Search } from 'lucide-react';

function ButtonsWithIcons() {
  return (
    <div className="space-y-4">
      {/* Icons with text */}
      <div className="flex gap-4">
        <Button>
          <Ship className="h-4 w-4 mr-2" />
          Add Vessel
        </Button>

        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Manage Crew
        </Button>

        <Button variant="secondary">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Icon-only buttons */}
      <div className="flex gap-2">
        <Button size="icon" variant="outline">
          <Settings className="h-4 w-4" />
        </Button>

        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
```

## Form Action Buttons

```jsx
function FormActionButtons() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
      <Button variant="outline" disabled={isSubmitting}>
        Cancel
      </Button>
      
      <Button variant="secondary" disabled={isSubmitting}>
        Save Draft
      </Button>
      
      <Button 
        onClick={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Appraisal'}
      </Button>
    </div>
  );
}
```

## Maritime-Specific Button Examples

```jsx
function MaritimeButtons() {
  return (
    <div className="space-y-6">
      {/* Vessel Management */}
      <div className="space-y-2">
        <h3 className="font-medium">Vessel Management</h3>
        <div className="flex gap-3">
          <Button>
            <Ship className="h-4 w-4 mr-2" />
            Add New Vessel
          </Button>
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            Track Location
          </Button>
          <Button variant="secondary">
            <FileText className="h-4 w-4 mr-2" />
            View Documents
          </Button>
        </div>
      </div>

      {/* Crew Operations */}
      <div className="space-y-2">
        <h3 className="font-medium">Crew Operations</h3>
        <div className="flex gap-3">
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Add Crew Member
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Training
          </Button>
          <Button variant="secondary">
            <Award className="h-4 w-4 mr-2" />
            Performance Review
          </Button>
        </div>
      </div>

      {/* Safety & Compliance */}
      <div className="space-y-2">
        <h3 className="font-medium">Safety & Compliance</h3>
        <div className="flex gap-3">
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Safety Inspection
          </Button>
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
          <Button variant="destructive">
            <AlertCircle className="h-4 w-4 mr-2" />
            Emergency Stop
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## Action Button Groups

```jsx
function ActionButtonGroups() {
  return (
    <div className="space-y-6">
      {/* Table Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" variant="ghost">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" variant="ghost">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Card Actions */}
      <div className="bg-white p-6 border rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">MV Atlantic Star</h3>
            <p className="text-gray-600">Container Ship</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Loading and Disabled States

```jsx
function ButtonStates() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-4">
      {/* Loading states */}
      <div className="space-y-2">
        <h3 className="font-medium">Loading States</h3>
        <div className="flex gap-3">
          <Button loading={true}>
            Processing...
          </Button>
          <Button variant="outline" loading={true}>
            Saving Draft...
          </Button>
          <Button variant="secondary" loading={true}>
            Loading Data...
          </Button>
        </div>
      </div>

      {/* Disabled states */}
      <div className="space-y-2">
        <h3 className="font-medium">Disabled States</h3>
        <div className="flex gap-3">
          <Button disabled>
            Submit Form
          </Button>
          <Button variant="outline" disabled>
            Edit Profile
          </Button>
          <Button variant="destructive" disabled>
            Delete Item
          </Button>
        </div>
      </div>

      {/* Interactive example */}
      <div className="space-y-2">
        <h3 className="font-medium">Interactive Example</h3>
        <Button 
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Start Process'}
        </Button>
      </div>
    </div>
  );
}
```

## Custom Styled Buttons

```jsx
function CustomStyledButtons() {
  return (
    <div className="space-y-4">
      {/* Custom maritime blue variations */}
      <div className="flex gap-3">
        <Button className="bg-[#16569e] hover:bg-[#144d8a] text-white">
          Primary Maritime
        </Button>
        
        <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white">
          Light Maritime
        </Button>
        
        <Button 
          variant="outline" 
          className="border-[#16569e] text-[#16569e] hover:bg-[#16569e] hover:text-white"
        >
          Maritime Outline
        </Button>
      </div>

      {/* Status-specific colors */}
      <div className="flex gap-3">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Operational
        </Button>
        
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
          Maintenance
        </Button>
        
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          Critical Alert
        </Button>
      </div>

      {/* Size variations */}
      <div className="flex items-center gap-3">
        <Button size="sm" className="text-xs px-3 py-1">
          Compact Action
        </Button>
        
        <Button className="px-8 py-3 text-lg">
          Large Call to Action
        </Button>
      </div>
    </div>
  );
}
```

## Button in Forms

```jsx
function FormWithButtons() {
  const [formData, setFormData] = useState({
    vesselName: '',
    captain: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({ vesselName: '', captain: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">
          Vessel Name
        </label>
        <input
          type="text"
          value={formData.vesselName}
          onChange={(e) => setFormData({...formData, vesselName: e.target.value})}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Enter vessel name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Captain
        </label>
        <input
          type="text"
          value={formData.captain}
          onChange={(e) => setFormData({...formData, captain: e.target.value})}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Enter captain name"
        />
      </div>

      {/* Form action buttons */}
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleReset}
        >
          Reset Form
        </Button>
        
        <div className="flex gap-3">
          <Button type="button" variant="secondary">
            Save Draft
          </Button>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
```

## Accessibility Features

```jsx
function AccessibleButtons() {
  return (
    <div className="space-y-4">
      {/* Buttons with proper ARIA labels */}
      <div className="flex gap-3">
        <Button aria-label="Add new vessel to fleet">
          <Plus className="h-4 w-4 mr-2" />
          Add Vessel
        </Button>
        
        <Button 
          size="icon" 
          aria-label="Search vessels"
          title="Search vessels"
        >
          <Search className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="destructive"
          aria-label="Delete selected crew member"
          aria-describedby="delete-warning"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
      
      <p id="delete-warning" className="text-sm text-gray-600">
        Warning: This action cannot be undone
      </p>

      {/* Keyboard navigation */}
      <div className="text-sm text-gray-600">
        <p>Keyboard shortcuts:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Tab: Navigate to next button</li>
          <li>Shift+Tab: Navigate to previous button</li>
          <li>Enter/Space: Activate button</li>
          <li>Escape: Cancel action (when applicable)</li>
        </ul>
      </div>
    </div>
  );
}
```

## Key Features
- **Maritime Theme**: Default styling matches maritime blue (#16569e) color scheme
- **Multiple Variants**: Default, destructive, outline, secondary, ghost, and link styles
- **Size Options**: Small, default, large, and icon-only sizes
- **Loading States**: Built-in loading indicators for async operations
- **Icon Support**: Full integration with Lucide React icons
- **Accessibility**: Comprehensive ARIA support and keyboard navigation
- **Form Integration**: Works seamlessly with form elements and validation
- **Custom Styling**: Easy to customize with additional className props

## Context Requirements
- **No context needed**: Button component is completely self-contained
- **No form context**: Works independently of form systems
- **No external providers**: No additional setup required

## Best Practices
1. **Consistent Variants**: Use appropriate variants for different action types
2. **Clear Labels**: Use descriptive text that indicates the action clearly
3. **Icon Usage**: Combine icons with text for better clarity
4. **Loading States**: Show loading indicators for operations that take time
5. **Disabled States**: Disable buttons when actions are not available
6. **Accessibility**: Always provide proper ARIA labels for icon-only buttons
7. **Visual Hierarchy**: Use size and variant to establish action importance

## Common Use Cases
- Form submission and cancellation
- CRUD operations (Create, Read, Update, Delete)
- Navigation actions
- Modal and dialog controls
- Table and list actions
- Quick action buttons
- Export and import functions
- Status change triggers
- Emergency and safety actions
- Settings and configuration access