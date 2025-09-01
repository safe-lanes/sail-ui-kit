# RadioGroup Component Guide

## Overview
The RadioGroup component provides radio button selection controls for maritime applications. It supports single-selection scenarios with TMSA-compliant styling optimized for crew appraisals, vessel classifications, and operational choices.

## Component Interface

```typescript
interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Flexible Layout**: Horizontal and vertical orientations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Validation**: Built-in required field validation
- **Visual States**: Clear active, disabled, and focus states

## Basic Usage

```tsx
import { RadioGroup, RadioGroupItem } from 'scomp-ui/sail-ui-kit';
import { Label } from 'scomp-ui/sail-ui-kit';

function VesselTypeSelection() {
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-gray-900">
        Select Vessel Type
      </Label>
      <RadioGroup 
        value={selectedType} 
        onValueChange={setSelectedType}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="container" 
            id="container"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="container" className="text-sm font-medium text-gray-700">
            Container Ship
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="tanker" 
            id="tanker"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="tanker" className="text-sm font-medium text-gray-700">
            Oil Tanker
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="bulk" 
            id="bulk"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="bulk" className="text-sm font-medium text-gray-700">
            Bulk Carrier
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="cruise" 
            id="cruise"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="cruise" className="text-sm font-medium text-gray-700">
            Cruise Ship
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
```

## Crew Appraisal Rating Example

```tsx
interface AppraisalRating {
  category: string;
  value: string;
}

function CrewAppraisalRating() {
  const [ratings, setRatings] = useState<Record<string, string>>({
    leadership: '',
    communication: '',
    technical: '',
    safety: ''
  });

  const handleRatingChange = (category: string, value: string) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const ratingOptions = [
    { value: '1', label: 'Needs Improvement', description: 'Below expectations' },
    { value: '2', label: 'Developing', description: 'Meets some expectations' },
    { value: '3', label: 'Competent', description: 'Meets expectations' },
    { value: '4', label: 'Proficient', description: 'Exceeds expectations' },
    { value: '5', label: 'Expert', description: 'Far exceeds expectations' }
  ];

  const categories = [
    { key: 'leadership', title: 'Leadership Skills' },
    { key: 'communication', title: 'Communication' },
    { key: 'technical', title: 'Technical Competency' },
    { key: 'safety', title: 'Safety Awareness' }
  ];

  return (
    <div className="space-y-8">
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-[#16569e] mb-6">
          Performance Assessment
        </h3>
        
        {categories.map((category) => (
          <div key={category.key} className="mb-8 last:mb-0">
            <Label className="text-base font-medium text-gray-900 mb-4 block">
              {category.title}
            </Label>
            
            <RadioGroup
              value={ratings[category.key]}
              onValueChange={(value) => handleRatingChange(category.key, value)}
              orientation="horizontal"
              className="grid grid-cols-1 md:grid-cols-5 gap-4"
            >
              {ratingOptions.map((option) => (
                <div 
                  key={option.value}
                  className="relative border border-gray-200 rounded-lg p-4 hover:border-[#16569e] hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem
                      value={option.value}
                      id={`${category.key}-${option.value}`}
                      className="mt-1 border-[#16569e] text-[#16569e] focus:ring-[#16569e]"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={`${category.key}-${option.value}`}
                        className="block text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#16569e] text-white text-xs font-medium">
                      {option.value}
                    </span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Current Ratings</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {categories.map((category) => (
            <div key={category.key}>
              <span className="text-gray-600">{category.title}:</span>
              <span className="ml-2 font-medium">
                {ratings[category.key] || 'Not rated'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Incident Severity Selection

```tsx
function IncidentSeveritySelection() {
  const [severity, setSeverity] = useState('');

  const severityLevels = [
    {
      value: 'low',
      label: 'Low',
      color: 'bg-green-50 border-green-200 text-green-800',
      description: 'Minor incident, no immediate risk'
    },
    {
      value: 'medium',
      label: 'Medium',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      description: 'Moderate risk, requires attention'
    },
    {
      value: 'high',
      label: 'High',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      description: 'Significant risk, immediate action required'
    },
    {
      value: 'critical',
      label: 'Critical',
      color: 'bg-red-50 border-red-200 text-red-800',
      description: 'Emergency situation, safety compromised'
    }
  ];

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-gray-900">
        Incident Severity Level *
      </Label>
      
      <RadioGroup 
        value={severity} 
        onValueChange={setSeverity}
        required
        className="space-y-3"
      >
        {severityLevels.map((level) => (
          <div 
            key={level.value}
            className={`relative border rounded-lg p-4 transition-all ${
              severity === level.value 
                ? `${level.color} border-2` 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value={level.value}
                id={level.value}
                className="mt-1 border-[#16569e] text-[#16569e] focus:ring-[#16569e]"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={level.value}
                  className="block text-sm font-medium cursor-pointer"
                >
                  <span className="flex items-center space-x-2">
                    <span>{level.label} Severity</span>
                    {level.value === 'critical' && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </span>
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  {level.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      {severity && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {severityLevels.find(l => l.value === severity)?.label} severity incident
          </p>
        </div>
      )}
    </div>
  );
}
```

## Horizontal Layout Example

```tsx
function CrewRotationPreference() {
  const [rotationPeriod, setRotationPeriod] = useState('');

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-gray-900">
        Preferred Rotation Period
      </Label>
      
      <RadioGroup 
        value={rotationPeriod} 
        onValueChange={setRotationPeriod}
        orientation="horizontal"
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="3months" 
            id="3months"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="3months" className="text-sm font-medium text-gray-700">
            3 Months
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="6months" 
            id="6months"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="6months" className="text-sm font-medium text-gray-700">
            6 Months
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="9months" 
            id="9months"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="9months" className="text-sm font-medium text-gray-700">
            9 Months
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="12months" 
            id="12months"
            className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
          />
          <Label htmlFor="12months" className="text-sm font-medium text-gray-700">
            12 Months
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
```

## Certificate Renewal Method

```tsx
function CertificateRenewalMethod() {
  const [renewalMethod, setRenewalMethod] = useState('');

  const methods = [
    {
      value: 'online',
      title: 'Online Renewal',
      description: 'Complete renewal process digitally',
      icon: Monitor,
      availability: 'Available 24/7'
    },
    {
      value: 'office',
      title: 'Maritime Office',
      description: 'Visit local maritime authority office',
      icon: Building,
      availability: 'Business hours only'
    },
    {
      value: 'agent',
      title: 'Through Agent',
      description: 'Use certified maritime agent services',
      icon: Users,
      availability: 'Agent dependent'
    },
    {
      value: 'mail',
      title: 'Mail Submission',
      description: 'Submit documents via postal service',
      icon: Mail,
      availability: '5-10 business days'
    }
  ];

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-gray-900">
        Select Renewal Method
      </Label>
      
      <RadioGroup 
        value={renewalMethod} 
        onValueChange={setRenewalMethod}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {methods.map((method) => (
          <div 
            key={method.value}
            className={`relative border rounded-lg p-4 transition-all cursor-pointer ${
              renewalMethod === method.value 
                ? 'border-[#16569e] bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value={method.value}
                id={method.value}
                className="mt-1 border-[#16569e] text-[#16569e] focus:ring-[#16569e]"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <method.icon className="h-5 w-5 text-[#16569e]" />
                  <Label 
                    htmlFor={method.value}
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {method.title}
                  </Label>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {method.description}
                </p>
                <p className="text-xs text-gray-500">
                  {method.availability}
                </p>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      {renewalMethod && (
        <div className="mt-4 p-3 bg-[#16569e] text-white rounded-md">
          <p className="text-sm">
            <strong>Selected Method:</strong> {methods.find(m => m.value === renewalMethod)?.title}
          </p>
        </div>
      )}
    </div>
  );
}
```

## Form Integration Example

```tsx
function VesselRegistrationForm() {
  const [formData, setFormData] = useState({
    vesselType: '',
    flagState: '',
    classification: '',
    operationType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-[#16569e] mb-6">
          Vessel Registration
        </h2>
        
        {/* Vessel Type */}
        <div className="mb-6">
          <Label className="text-base font-medium text-gray-900 mb-4 block">
            Vessel Type *
          </Label>
          <RadioGroup 
            value={formData.vesselType} 
            onValueChange={(value) => setFormData({...formData, vesselType: value})}
            required
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {['Container', 'Tanker', 'Bulk', 'General Cargo'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={type.toLowerCase()} 
                  id={type.toLowerCase()}
                  className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
                />
                <Label htmlFor={type.toLowerCase()} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Flag State */}
        <div className="mb-6">
          <Label className="text-base font-medium text-gray-900 mb-4 block">
            Flag State *
          </Label>
          <RadioGroup 
            value={formData.flagState} 
            onValueChange={(value) => setFormData({...formData, flagState: value})}
            required
            className="space-y-2"
          >
            {['Panama', 'Liberia', 'Marshall Islands', 'Singapore', 'Other'].map((flag) => (
              <div key={flag} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={flag.toLowerCase().replace(' ', '-')} 
                  id={flag.toLowerCase().replace(' ', '-')}
                  className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
                />
                <Label htmlFor={flag.toLowerCase().replace(' ', '-')} className="text-sm">
                  {flag}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Operation Type */}
        <div className="mb-6">
          <Label className="text-base font-medium text-gray-900 mb-4 block">
            Primary Operation Type
          </Label>
          <RadioGroup 
            value={formData.operationType} 
            onValueChange={(value) => setFormData({...formData, operationType: value})}
            orientation="horizontal"
            className="flex flex-wrap gap-4"
          >
            {['Coastal', 'Short Sea', 'Deep Sea', 'Specialized'].map((operation) => (
              <div key={operation} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={operation.toLowerCase().replace(' ', '-')} 
                  id={operation.toLowerCase().replace(' ', '-')}
                  className="border-[#16569e] text-[#16569e] focus:ring-[#16569e]" 
                />
                <Label htmlFor={operation.toLowerCase().replace(' ', '-')} className="text-sm">
                  {operation}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#16569e] text-white rounded-md text-sm font-medium hover:bg-[#134a87]"
        >
          Register Vessel
        </button>
      </div>
    </form>
  );
}
```

## Best Practices

1. **Clear Labels**: Use descriptive labels for each radio option
2. **Visual Grouping**: Group related options with clear visual boundaries
3. **Required Indicators**: Mark required radio groups clearly
4. **Logical Order**: Arrange options in logical sequence (severity, frequency, etc.)
5. **Maritime Context**: Use appropriate maritime terminology and classifications
6. **Accessibility**: Ensure proper keyboard navigation and screen reader support

## Context Requirements

The RadioGroup component works with:
- **Form Libraries**: Compatible with react-hook-form and other form libraries
- **Validation**: Built-in required field validation
- **Theme System**: Maritime color scheme and styling
- **Accessibility**: Screen reader and keyboard navigation support

## Troubleshooting

### Common Issues

**Radio group not working with form libraries**
```tsx
// Use Controller for react-hook-form integration
<Controller
  name="vesselType"
  control={control}
  rules={{ required: "Vessel type is required" }}
  render={({ field }) => (
    <RadioGroup onValueChange={field.onChange} value={field.value}>
      {/* radio items */}
    </RadioGroup>
  )}
/>
```

**Styling not applying correctly**
```tsx
// Ensure proper className usage
<RadioGroupItem
  value="option"
  className="border-[#16569e] text-[#16569e] focus:ring-[#16569e] focus:ring-offset-2"
/>
```

**Keyboard navigation issues**
```tsx
// Ensure proper accessibility attributes
<RadioGroup 
  aria-label="Vessel type selection"
  role="radiogroup"
>
  {/* radio items */}
</RadioGroup>
```