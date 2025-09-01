# Label Component Guide

## Overview
The Label component provides accessible, semantic labeling for form inputs in maritime applications. It ensures proper form accessibility, supports required field indicators, and maintains consistent typography across TMSA-compliant fleet management systems.

## Component Interface

```typescript
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'maritime' | 'error' | 'success';
  className?: string;
  children: React.ReactNode;
}
```

## Key Features
- **Accessibility**: Proper semantic labeling with htmlFor associations
- **Required Indicators**: Visual asterisk for required fields
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Size Variants**: Multiple size options for different form contexts
- **Status Indicators**: Visual states for validation and feedback

## Basic Usage

```tsx
import { Label } from 'scomp-ui/sail-ui-kit';

function VesselInformationForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="vessel-name" required>
          Vessel Name
        </Label>
        <input
          id="vessel-name"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter vessel name"
        />
      </div>
      
      <div>
        <Label htmlFor="imo-number" required>
          IMO Number
        </Label>
        <input
          id="imo-number"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="IMO xxxxxxx"
        />
      </div>
    </div>
  );
}
```

## Size Variants

```tsx
function LabelSizeExamples() {
  return (
    <div className="space-y-6">
      {/* Small label for compact forms */}
      <div>
        <Label size="sm" htmlFor="crew-id">
          Crew ID
        </Label>
        <input id="crew-id" type="text" className="text-sm" />
      </div>
      
      {/* Medium label (default) */}
      <div>
        <Label size="md" htmlFor="rank" required>
          Rank
        </Label>
        <select id="rank">
          <option>Select rank</option>
        </select>
      </div>
      
      {/* Large label for prominent fields */}
      <div>
        <Label size="lg" htmlFor="vessel-type" required>
          Vessel Type
        </Label>
        <select id="vessel-type">
          <option>Select vessel type</option>
        </select>
      </div>
    </div>
  );
}
```

## Variant Styles

```tsx
function LabelVariantExamples() {
  return (
    <div className="space-y-4">
      {/* Default variant */}
      <div>
        <Label variant="default" htmlFor="default-field">
          Standard Field
        </Label>
        <input id="default-field" type="text" />
      </div>
      
      {/* Maritime variant with blue accent */}
      <div>
        <Label variant="maritime" htmlFor="maritime-field" required>
          Maritime-Specific Field
        </Label>
        <input id="maritime-field" type="text" />
      </div>
      
      {/* Error variant for validation */}
      <div>
        <Label variant="error" htmlFor="error-field" required>
          Field with Error
        </Label>
        <input 
          id="error-field" 
          type="text" 
          className="border-red-300 focus:border-red-500" 
        />
      </div>
      
      {/* Success variant for validated fields */}
      <div>
        <Label variant="success" htmlFor="success-field">
          Validated Field
        </Label>
        <input 
          id="success-field" 
          type="text" 
          className="border-green-300 focus:border-green-500" 
        />
      </div>
    </div>
  );
}
```

## Crew Appraisal Form Example

```tsx
interface CrewAppraisalSection {
  leadership: number;
  communication: number;
  technical: number;
  safety: number;
}

function CrewAppraisalLabels() {
  return (
    <div className="space-y-6">
      {/* Basic Information Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="crew-member-id" required variant="maritime">
              Crew Member ID
            </Label>
            <input
              id="crew-member-id"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
              placeholder="Enter crew ID"
            />
          </div>
          <div>
            <Label htmlFor="appraisal-period" required variant="maritime">
              Appraisal Period
            </Label>
            <select
              id="appraisal-period"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="">Select period</option>
              <option value="q1-2024">Q1 2024</option>
              <option value="q2-2024">Q2 2024</option>
              <option value="annual-2024">Annual 2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Performance Assessment Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Performance Assessment
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="leadership-score" required variant="maritime" size="sm">
              Leadership Skills (1-5)
            </Label>
            <input
              id="leadership-score"
              type="number"
              min="1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
          <div>
            <Label htmlFor="communication-score" required variant="maritime" size="sm">
              Communication Skills (1-5)
            </Label>
            <input
              id="communication-score"
              type="number"
              min="1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
          <div>
            <Label htmlFor="technical-score" required variant="maritime" size="sm">
              Technical Competency (1-5)
            </Label>
            <input
              id="technical-score"
              type="number"
              min="1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
          <div>
            <Label htmlFor="safety-score" required variant="maritime" size="sm">
              Safety Awareness (1-5)
            </Label>
            <input
              id="safety-score"
              type="number"
              min="1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <Label htmlFor="overall-comments" variant="maritime">
          Overall Comments & Recommendations
        </Label>
        <textarea
          id="overall-comments"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
          placeholder="Provide detailed feedback and recommendations for the crew member..."
        />
      </div>
    </div>
  );
}
```

## Required Field Indicators

```tsx
function RequiredFieldExamples() {
  return (
    <div className="space-y-4">
      {/* Required field with asterisk */}
      <div>
        <Label htmlFor="mandatory-field" required>
          Mandatory Information
        </Label>
        <input
          id="mandatory-field"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      
      {/* Optional field without asterisk */}
      <div>
        <Label htmlFor="optional-field">
          Optional Information
        </Label>
        <input
          id="optional-field"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      
      {/* Custom required indicator */}
      <div>
        <Label htmlFor="custom-required" className="text-[#16569e]">
          Custom Required Field
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <input
          id="custom-required"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
          required
        />
      </div>
    </div>
  );
}
```

## Maritime-Specific Examples

### Certificate Management Labels
```tsx
function CertificateLabels() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="stcw-certificate" required variant="maritime">
          STCW Certificate Number
        </Label>
        <input
          id="stcw-certificate"
          type="text"
          pattern="[A-Z]{2}\d{7}"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#16569e] focus:ring-[#16569e]"
          placeholder="XX1234567"
        />
      </div>
      
      <div>
        <Label htmlFor="certificate-expiry" required variant="error">
          Certificate Expiry Date
        </Label>
        <input
          id="certificate-expiry"
          type="date"
          className="mt-1 block w-full rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>
    </div>
  );
}
```

### Vessel Operations Labels
```tsx
function VesselOperationsLabels() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor="port-departure" required size="sm">
          Port of Departure
        </Label>
        <select
          id="port-departure"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
        >
          <option>Select port</option>
          <option value="SGSIN">Singapore</option>
          <option value="NLRTM">Rotterdam</option>
          <option value="USNYC">New York</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="estimated-arrival" required size="sm">
          Estimated Arrival
        </Label>
        <input
          id="estimated-arrival"
          type="datetime-local"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
        />
      </div>
      
      <div>
        <Label htmlFor="cargo-type" size="sm">
          Cargo Type
        </Label>
        <input
          id="cargo-type"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
          placeholder="Container, Bulk, etc."
        />
      </div>
    </div>
  );
}
```

## Accessibility Features

```tsx
function AccessibleLabelExamples() {
  return (
    <div className="space-y-6">
      {/* Proper association with input */}
      <div>
        <Label htmlFor="accessible-input">
          Accessible Input Field
        </Label>
        <input
          id="accessible-input"
          type="text"
          aria-describedby="input-help"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <p id="input-help" className="mt-1 text-sm text-gray-500">
          This input has proper accessibility support
        </p>
      </div>
      
      {/* Label with description */}
      <div>
        <Label htmlFor="described-input">
          Complex Field
        </Label>
        <input
          id="described-input"
          type="text"
          aria-describedby="field-description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <div id="field-description" className="mt-1 text-sm text-gray-600">
          Enter the vessel's unique identification number as registered with the maritime authority
        </div>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Always Use htmlFor**: Associate labels with their corresponding input elements
2. **Required Indicators**: Clearly mark required fields with the required prop
3. **Consistent Sizing**: Use appropriate size variants based on form context
4. **Maritime Theme**: Use maritime variant for TMSA-related forms
5. **Accessibility**: Provide descriptive text and proper ARIA attributes
6. **Validation States**: Use error/success variants to indicate field states

## Context Requirements

The Label component works with:
- **Form Elements**: All standard HTML form inputs
- **Custom Components**: Compatible with custom input components
- **Validation Libraries**: Works with react-hook-form and other form libraries
- **Accessibility Tools**: Supports screen readers and keyboard navigation

## Troubleshooting

### Common Issues

**Label not associating with input**
```tsx
// Ensure matching htmlFor and id attributes
<Label htmlFor="vessel-name">Vessel Name</Label>
<input id="vessel-name" type="text" />
```

**Required indicator not showing**
```tsx
// Use the required prop, not just the attribute
<Label htmlFor="required-field" required>
  Required Field
</Label>
```

**Styling conflicts**
```tsx
// Use className for custom styles while preserving base styles
<Label 
  htmlFor="custom-field" 
  className="text-lg font-bold text-[#16569e]"
>
  Custom Styled Label
</Label>
```