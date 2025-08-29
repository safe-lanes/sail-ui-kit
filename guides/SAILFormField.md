# SAILFormField Component Guide

## Overview
SAILFormField is a form input component designed for maritime applications with built-in validation, styling, and accessibility features. **Critical**: This component requires React Hook Form's FormProvider context to function properly.

## Component Interface

```typescript
interface SAILFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'datetime-local' | 'select' | 'textarea' | 'checkbox' | 'radio';
  placeholder?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  className?: string;
  rows?: number; // For textarea
  min?: number; // For number inputs
  max?: number; // For number inputs
  step?: number; // For number inputs
}
```

## Context Requirements (CRITICAL)

```jsx
import { useForm, FormProvider } from 'react-hook-form';
import { SAILFormField } from 'scomp-ui';

// ✅ REQUIRED: FormProvider wrapper
function MyForm() {
  const formMethods = useForm({
    defaultValues: {
      vesselName: '',
      email: '',
      vesselType: ''
    }
  });

  return (
    <FormProvider {...formMethods}>
      {/* ✅ Now SAILFormField has required context */}
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <SAILFormField
          control={formMethods.control}
          name="vesselName"
          label="Vessel Name"
          type="text"
          required
        />
      </form>
    </FormProvider>
  );
}

// ❌ This will cause: "Cannot destructure property 'getFieldState'"
function BrokenForm() {
  const form = useForm();
  
  return (
    <SAILFormField // Missing FormProvider wrapper
      control={form.control}
      name="field"
      label="Field"
      type="text"
    />
  );
}
```

## Text Input Types

```jsx
<FormProvider {...formMethods}>
  <div className="space-y-6">
    {/* Basic text input */}
    <SAILFormField
      control={formMethods.control}
      name="vesselName"
      label="Vessel Name"
      type="text"
      placeholder="Enter vessel name"
      required
      description="Official registered name of the vessel"
    />

    {/* Email input with validation */}
    <SAILFormField
      control={formMethods.control}
      name="email"
      label="Email Address"
      type="email"
      placeholder="captain@maritime.com"
      required
    />

    {/* Number input with constraints */}
    <SAILFormField
      control={formMethods.control}
      name="grossTonnage"
      label="Gross Tonnage"
      type="number"
      placeholder="Enter tonnage"
      min="0"
      step="0.1"
    />

    {/* Date input */}
    <SAILFormField
      control={formMethods.control}
      name="signOnDate"
      label="Sign On Date"
      type="date"
      required
    />

    {/* Telephone input */}
    <SAILFormField
      control={formMethods.control}
      name="emergencyContact"
      label="Emergency Contact"
      type="tel"
      placeholder="+1 (555) 123-4567"
    />
  </div>
</FormProvider>
```

## Select Dropdowns

```jsx
<FormProvider {...formMethods}>
  <div className="space-y-6">
    {/* Basic select */}
    <SAILFormField
      control={formMethods.control}
      name="vesselType"
      label="Vessel Type"
      type="select"
      placeholder="Select vessel type"
      options={[
        { value: 'cargo', label: 'Cargo Ship' },
        { value: 'tanker', label: 'Tanker' },
        { value: 'container', label: 'Container Ship' },
        { value: 'bulk', label: 'Bulk Carrier' },
        { value: 'passenger', label: 'Passenger Ship' }
      ]}
      required
    />

    {/* Select with disabled options */}
    <SAILFormField
      control={formMethods.control}
      name="rank"
      label="Seafarer Rank"
      type="select"
      options={[
        { value: 'master', label: 'Master' },
        { value: 'chief-officer', label: 'Chief Officer' },
        { value: 'second-officer', label: 'Second Officer' },
        { value: 'third-officer', label: 'Third Officer' },
        { value: 'cadet', label: 'Cadet', disabled: true } // Disabled option
      ]}
      required
    />

    {/* Nationality select */}
    <SAILFormField
      control={formMethods.control}
      name="nationality"
      label="Nationality"
      type="select"
      placeholder="Select nationality"
      options={[
        { value: 'british', label: 'British' },
        { value: 'filipino', label: 'Filipino' },
        { value: 'indian', label: 'Indian' },
        { value: 'ukrainian', label: 'Ukrainian' },
        { value: 'polish', label: 'Polish' },
        { value: 'romanian', label: 'Romanian' }
      ]}
    />
  </div>
</FormProvider>
```

## Textarea Fields

```jsx
<FormProvider {...formMethods}>
  <div className="space-y-6">
    {/* Basic textarea */}
    <SAILFormField
      control={formMethods.control}
      name="comments"
      label="Additional Comments"
      type="textarea"
      placeholder="Enter any additional information..."
      rows={4}
      description="Include any relevant details about the assessment"
    />

    {/* Large textarea for detailed reports */}
    <SAILFormField
      control={formMethods.control}
      name="incidentReport"
      label="Incident Report Details"
      type="textarea"
      placeholder="Provide detailed description of the incident..."
      rows={8}
      required
    />
  </div>
</FormProvider>
```

## Checkbox and Radio Fields

```jsx
<FormProvider {...formMethods}>
  <div className="space-y-6">
    {/* Single checkbox */}
    <SAILFormField
      control={formMethods.control}
      name="agreesToTerms"
      label="I agree to the terms and conditions"
      type="checkbox"
      required
    />

    {/* Radio button group */}
    <SAILFormField
      control={formMethods.control}
      name="assessmentType"
      label="Assessment Type"
      type="radio"
      options={[
        { value: 'initial', label: 'Initial Assessment' },
        { value: 'mid-contract', label: 'Mid Contract Review' },
        { value: 'end-contract', label: 'End of Contract' },
        { value: 'annual', label: 'Annual Review' }
      ]}
      required
    />
  </div>
</FormProvider>
```

## Complete Form Example

```jsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SAILFormField } from 'scomp-ui';

const seafarerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  rank: z.string().min(1, "Rank is required"),
  nationality: z.string().min(1, "Nationality is required"),
  experience: z.number().min(0, "Experience must be positive"),
  signOnDate: z.string().min(1, "Sign on date is required"),
  emergencyContact: z.string().optional(),
  medicalCertificate: z.boolean(),
  additionalNotes: z.string().optional()
});

function SeafarerRegistrationForm() {
  const formMethods = useForm({
    resolver: zodResolver(seafarerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      rank: '',
      nationality: '',
      experience: 0,
      signOnDate: '',
      emergencyContact: '',
      medicalCertificate: false,
      additionalNotes: ''
    }
  });

  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SAILFormField
            control={formMethods.control}
            name="firstName"
            label="First Name"
            type="text"
            placeholder="Enter first name"
            required
          />

          <SAILFormField
            control={formMethods.control}
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            required
          />

          <SAILFormField
            control={formMethods.control}
            name="email"
            label="Email Address"
            type="email"
            placeholder="seafarer@maritime.com"
            required
          />

          <SAILFormField
            control={formMethods.control}
            name="rank"
            label="Rank"
            type="select"
            placeholder="Select rank"
            options={[
              { value: 'master', label: 'Master' },
              { value: 'chief-officer', label: 'Chief Officer' },
              { value: 'second-officer', label: 'Second Officer' },
              { value: 'third-officer', label: 'Third Officer' },
              { value: 'engineer', label: 'Engineer' },
              { value: 'able-seaman', label: 'Able Seaman' }
            ]}
            required
          />

          <SAILFormField
            control={formMethods.control}
            name="nationality"
            label="Nationality"
            type="select"
            placeholder="Select nationality"
            options={[
              { value: 'british', label: 'British' },
              { value: 'filipino', label: 'Filipino' },
              { value: 'indian', label: 'Indian' },
              { value: 'ukrainian', label: 'Ukrainian' }
            ]}
            required
          />

          <SAILFormField
            control={formMethods.control}
            name="experience"
            label="Years of Experience"
            type="number"
            placeholder="Enter years"
            min="0"
            max="50"
            step="0.5"
          />

          <SAILFormField
            control={formMethods.control}
            name="signOnDate"
            label="Sign On Date"
            type="date"
            required
          />

          <SAILFormField
            control={formMethods.control}
            name="emergencyContact"
            label="Emergency Contact"
            type="tel"
            placeholder="+1 (555) 123-4567"
            description="Include country code"
          />
        </div>

        <SAILFormField
          control={formMethods.control}
          name="medicalCertificate"
          label="Valid Medical Certificate"
          type="checkbox"
          description="I confirm I have a valid medical certificate"
          required
        />

        <SAILFormField
          control={formMethods.control}
          name="additionalNotes"
          label="Additional Notes"
          type="textarea"
          placeholder="Any additional information..."
          rows={4}
        />

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#16569e] text-white rounded-lg hover:bg-[#144d8a]"
          >
            Register Seafarer
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
```

## Field Validation Display

```jsx
// SAILFormField automatically displays validation errors
<FormProvider {...formMethods}>
  <SAILFormField
    control={formMethods.control}
    name="requiredField"
    label="Required Field"
    type="text"
    required
    // Error message automatically appears below field
    // Error styling automatically applied to field border
  />
  
  {/* Access validation state */}
  {formMethods.formState.errors.requiredField && (
    <div className="text-red-600 text-sm mt-1">
      Custom error message: {formMethods.formState.errors.requiredField.message}
    </div>
  )}
</FormProvider>
```

## Accessibility Features
- **Automatic labeling**: Proper label associations for screen readers
- **Error announcements**: Validation errors announced to assistive technology
- **Keyboard navigation**: Full keyboard support for all field types
- **Focus management**: Proper focus indicators and tabbing order
- **ARIA attributes**: Comprehensive ARIA support for enhanced accessibility

## Context Requirements
- **FormProvider required**: Must be wrapped with React Hook Form's FormProvider
- **Control prop**: Pass formMethods.control to each field
- **Validation integration**: Works with Zod schemas and react-hook-form validation

## Common Errors & Solutions

### Error: "Cannot destructure property 'getFieldState'"
```jsx
// ❌ Missing FormProvider
<SAILFormField control={form.control} name="field" />

// ✅ Wrapped with FormProvider
<FormProvider {...formMethods}>
  <SAILFormField control={formMethods.control} name="field" />
</FormProvider>
```

### Error: Field not registering with form
```jsx
// ✅ Ensure consistent control reference
const formMethods = useForm();

<FormProvider {...formMethods}>
  <SAILFormField
    control={formMethods.control} // Same control instance
    name="fieldName"
    // ...
  />
</FormProvider>
```

## Best Practices
1. **Consistent FormProvider**: Use single FormProvider for entire form section
2. **Clear Labels**: Use descriptive labels that indicate field purpose
3. **Helpful Placeholders**: Provide examples of expected input format
4. **Logical Grouping**: Group related fields visually using grids or sections
5. **Validation Feedback**: Rely on built-in validation display for consistency
6. **Maritime Context**: Use field names and options relevant to maritime operations

## Common Use Cases
- Crew registration and profile forms
- Vessel information and specification forms
- Training record and certificate tracking
- Incident reporting and documentation
- Performance evaluation and appraisal forms
- Compliance and audit forms
- Equipment and maintenance tracking