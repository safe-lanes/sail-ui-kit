# SAILForm Component Guide

## Overview
SAILForm is a modal-based form wrapper with multi-section navigation designed for maritime applications. It provides a structured interface for complex forms like appraisals, inspections, and compliance documentation. **Important**: SAILForm does NOT provide FormContext - you must wrap content with FormProvider when using SAILFormField components.

## Component Interface

```typescript
interface SAILFormProps {
  title: string;
  sections: SAILFormSection[];
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  onSubmit?: () => void;
  showSaveButton?: boolean;
  showSubmitButton?: boolean;
  saveButtonText?: string;
  submitButtonText?: string;
  initialSection?: string;
  className?: string;
}

interface SAILFormSection {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

## Basic Usage (with FormProvider)

```jsx
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { SAILForm, SAILFormField } from 'scomp-ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const vesselFormSchema = z.object({
  vesselName: z.string().min(1, "Vessel name is required"),
  imoNumber: z.string().min(1, "IMO number is required"),
  captain: z.string().min(1, "Captain name is required"),
});

function VesselAppraisalForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const formMethods = useForm({
    resolver: zodResolver(vesselFormSchema),
    defaultValues: {
      vesselName: '',
      imoNumber: '',
      captain: '',
    }
  });

  const handleSave = () => {
    const data = formMethods.getValues();
    console.log('Saving draft:', data);
  };

  const handleSubmit = (data) => {
    console.log('Submitting form:', data);
    setIsFormOpen(false);
  };

  const sections = [
    {
      id: 'basic-info',
      title: 'Part A: Basic Information',
      description: 'Enter vessel and crew details',
      content: (
        // ✅ CRITICAL: Wrap with FormProvider for SAILFormField
        <FormProvider {...formMethods}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SAILFormField
                control={formMethods.control}
                name="vesselName"
                label="Vessel Name"
                type="text"
                placeholder="Enter vessel name"
                required
              />
              
              <SAILFormField
                control={formMethods.control}
                name="imoNumber"
                label="IMO Number"
                type="text"
                placeholder="Enter IMO number"
                required
              />
              
              <SAILFormField
                control={formMethods.control}
                name="captain"
                label="Captain"
                type="text"
                placeholder="Enter captain name"
                required
              />
            </div>
          </div>
        </FormProvider>
      )
    },
    {
      id: 'assessment',
      title: 'Part B: Performance Assessment',
      description: 'Evaluate performance metrics',
      content: (
        <FormProvider {...formMethods}>
          <div className="space-y-6">
            <FormTable
              title="Assessment Criteria"
              columns={[
                { id: 'criteria', header: 'Criteria', type: 'text' },
                { id: 'rating', header: 'Rating', type: 'select', 
                  options: [
                    { value: 'excellent', label: 'Excellent' },
                    { value: 'good', label: 'Good' },
                    { value: 'satisfactory', label: 'Satisfactory' },
                    { value: 'needs-improvement', label: 'Needs Improvement' }
                  ]
                },
                { id: 'comments', header: 'Comments', type: 'textarea' }
              ]}
              data={[]}
              onDataChange={(data) => console.log('Assessment data:', data)}
              addButtonText="Add Criteria"
            />
          </div>
        </FormProvider>
      )
    }
  ];

  return (
    <div>
      <button 
        onClick={() => setIsFormOpen(true)}
        className="bg-[#16569e] text-white px-4 py-2 rounded"
      >
        Open Appraisal Form
      </button>

      <SAILForm
        title="Vessel Performance Appraisal"
        sections={sections}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        onSubmit={formMethods.handleSubmit(handleSubmit)}
        showSaveButton={true}
        showSubmitButton={true}
        saveButtonText="Save Draft"
        submitButtonText="Submit Appraisal"
        initialSection="basic-info"
      />
    </div>
  );
}
```

## Alternative: Using Regular Form Elements (No FormProvider Needed)

```jsx
function SimpleVesselForm() {
  const form = useForm({
    defaultValues: {
      vesselName: '',
      vesselType: '',
      captain: ''
    }
  });

  const sections = [
    {
      id: 'vessel-details',
      title: 'Part A: Vessel Information',
      content: (
        // ✅ No FormProvider needed with regular inputs
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Vessel Name</label>
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter vessel name"
                {...form.register('vesselName', { required: 'Required' })}
              />
              {form.formState.errors.vesselName && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.vesselName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vessel Type</label>
              <select
                className="w-full px-3 py-2 border rounded"
                {...form.register('vesselType')}
              >
                <option value="">Select type</option>
                <option value="cargo">Cargo Ship</option>
                <option value="tanker">Tanker</option>
                <option value="container">Container Ship</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Captain</label>
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter captain name"
                {...form.register('captain')}
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <SAILForm
      title="Simple Vessel Form"
      sections={sections}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={form.handleSubmit(handleSubmit)}
    />
  );
}
```

## Advanced Multi-Section Form

```jsx
function ComprehensiveAppraisalForm() {
  const sections = [
    {
      id: 'seafarer-info',
      title: "Part A: Seafarer's Information",
      description: 'Basic seafarer details and vessel assignment',
      icon: <User className="h-4 w-4" />,
      content: <SeafarerInfoSection />
    },
    {
      id: 'training-records',
      title: 'Part B: Training Records',
      description: 'Prior training and effectiveness assessment',
      icon: <BookOpen className="h-4 w-4" />,
      content: <TrainingRecordsSection />
    },
    {
      id: 'performance-assessment',
      title: 'Part C: Performance Assessment',
      description: 'Detailed performance evaluation',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <PerformanceAssessmentSection />
    },
    {
      id: 'development-plan',
      title: 'Part D: Development Plan',
      description: 'Future training and development goals',
      icon: <Target className="h-4 w-4" />,
      content: <DevelopmentPlanSection />
    },
    {
      id: 'recommendations',
      title: 'Part E: Recommendations',
      description: 'Final recommendations and approvals',
      icon: <CheckCircle className="h-4 w-4" />,
      content: <RecommendationsSection />
    }
  ];

  return (
    <SAILForm
      title="Comprehensive Performance Appraisal"
      sections={sections}
      isOpen={isFormOpen}
      onClose={() => setIsFormOpen(false)}
      onSave={handleSave}
      onSubmit={handleSubmit}
      showSaveButton={true}
      showSubmitButton={true}
      saveButtonText="Save Progress"
      submitButtonText="Complete Appraisal"
      initialSection="seafarer-info"
      className="max-w-6xl"
    />
  );
}
```

## Navigation Between Sections

```jsx
// SAILForm automatically handles section navigation with:
// - Left sidebar with section list
// - Next/Previous buttons
// - Click to jump to any section
// - Progress indication
// - Validation before section switching (if implemented)

function NavigationExample() {
  // Sections are automatically numbered (A, B, C, etc.)
  // Users can click on any section in the sidebar
  // Form maintains state across section switches
  // Save/Submit buttons appear in header and footer
}
```

## Form Validation Integration

```jsx
function ValidatedSAILForm() {
  const formMethods = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'onChange' // Enable real-time validation
  });

  const sections = [
    {
      id: 'basic-info',
      title: 'Part A: Basic Information',
      content: (
        <FormProvider {...formMethods}>
          <SAILFormField
            control={formMethods.control}
            name="requiredField"
            label="Required Field"
            type="text"
            required
            // Validation errors automatically displayed
          />
          
          {/* Show section-level validation summary */}
          {Object.keys(formMethods.formState.errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mt-4">
              <h4 className="text-red-800 font-medium">Please correct the following:</h4>
              <ul className="text-red-700 text-sm mt-2">
                {Object.entries(formMethods.formState.errors).map(([field, error]) => (
                  <li key={field}>• {error.message}</li>
                ))}
              </ul>
            </div>
          )}
        </FormProvider>
      )
    }
  ];

  const handleSubmit = (data) => {
    // Only called if validation passes
    console.log('Valid data:', data);
  };

  return (
    <SAILForm
      title="Validated Form"
      sections={sections}
      onSubmit={formMethods.handleSubmit(handleSubmit)}
      // Submit button automatically disabled if form invalid
    />
  );
}
```

## Key Features
- **Modal Interface**: Full-screen modal with responsive design
- **Multi-Section Navigation**: Automatic section numbering (A, B, C, etc.)
- **Progress Tracking**: Visual indication of current section
- **Flexible Content**: Each section accepts any React content
- **Action Buttons**: Built-in Save and Submit functionality
- **Maritime Styling**: Professional blue theme matching maritime applications
- **No Form Context**: Pure UI wrapper - you provide your own form management

## Context Requirements
- **No FormContext provided**: SAILForm is just a modal wrapper
- **FormProvider needed for SAILFormField**: Wrap section content with FormProvider
- **Regular inputs work directly**: Use form.register() without FormProvider
- **FormTable is independent**: Works without any form context

## Common Errors & Solutions

### Error: "Cannot destructure property 'getFieldState'"
```jsx
// ❌ Wrong - SAILFormField without FormProvider
<SAILFormField control={form.control} name="field" />

// ✅ Correct - Wrapped with FormProvider
<FormProvider {...formMethods}>
  <SAILFormField control={formMethods.control} name="field" />
</FormProvider>
```

### Error: Form state not persisting between sections
```jsx
// ✅ Solution - Use same form instance across all sections
const formMethods = useForm(); // Declare once outside sections

const sections = [
  {
    content: (
      <FormProvider {...formMethods}> {/* Same instance */}
        <SAILFormField control={formMethods.control} name="field1" />
      </FormProvider>
    )
  },
  {
    content: (
      <FormProvider {...formMethods}> {/* Same instance */}
        <SAILFormField control={formMethods.control} name="field2" />
      </FormProvider>
    )
  }
];
```

## Best Practices
1. **Single Form Instance**: Use one useForm() instance for entire multi-section form
2. **Section Organization**: Logical grouping of related fields per section
3. **Validation Strategy**: Consider section-level validation before allowing navigation
4. **Save Functionality**: Implement draft saving for long forms
5. **Progress Indication**: Use section descriptions to guide users
6. **Mobile Optimization**: Test sidebar navigation on mobile devices

## Common Use Cases
- Crew performance appraisals
- Vessel inspection forms
- TMSA compliance assessments
- Training evaluation forms
- Incident reporting
- Certificate renewal processes
- Multi-step onboarding workflows