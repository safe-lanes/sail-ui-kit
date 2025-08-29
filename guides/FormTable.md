# FormTable Component Guide

## Overview
FormTable is a self-contained table component for managing dynamic data entry in maritime applications. Unlike SAILFormField, FormTable does NOT require FormProvider context and manages its own internal state. Perfect for training records, crew listings, equipment inventories, and assessment criteria.

## Component Interface

```typescript
interface FormTableProps {
  title?: string;
  columns: FormTableColumn[];
  data: Record<string, any>[];
  onDataChange: (data: Record<string, any>[]) => void;
  addButtonText?: string;
  showActions?: boolean;
  showComments?: boolean;
  maxRows?: number;
  className?: string;
  readOnly?: boolean;
}

interface FormTableColumn {
  id: string;
  header: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox' | 'readonly';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  width?: string;
  required?: boolean;
  min?: number;
  max?: number;
  rows?: number;
}
```

## Basic Usage (Self-Contained)

```jsx
import React, { useState } from 'react';
import { FormTable } from 'scomp-ui';

function CrewManagement() {
  const [crewData, setCrewData] = useState([
    {
      id: '1',
      name: 'John Smith',
      rank: 'master',
      nationality: 'british',
      experience: '15',
      signOnDate: '2024-01-15',
      medicalValid: true
    }
  ]);

  const columns = [
    { 
      id: 'serialNumber', 
      header: 'S/N', 
      type: 'readonly', 
      width: '60px' 
    },
    { 
      id: 'name', 
      header: 'Crew Member Name', 
      type: 'text', 
      placeholder: 'Enter full name',
      required: true
    },
    { 
      id: 'rank', 
      header: 'Rank', 
      type: 'select',
      options: [
        { value: 'master', label: 'Master' },
        { value: 'chief-officer', label: 'Chief Officer' },
        { value: 'second-officer', label: 'Second Officer' },
        { value: 'engineer', label: 'Engineer' },
        { value: 'able-seaman', label: 'Able Seaman' }
      ],
      required: true
    },
    { 
      id: 'nationality', 
      header: 'Nationality', 
      type: 'select',
      options: [
        { value: 'british', label: 'British' },
        { value: 'filipino', label: 'Filipino' },
        { value: 'indian', label: 'Indian' },
        { value: 'ukrainian', label: 'Ukrainian' }
      ]
    },
    { 
      id: 'experience', 
      header: 'Years Experience', 
      type: 'number',
      placeholder: 'Years',
      min: 0,
      max: 50
    },
    { 
      id: 'signOnDate', 
      header: 'Sign On Date', 
      type: 'date'
    },
    { 
      id: 'medicalValid', 
      header: 'Medical Valid', 
      type: 'checkbox'
    }
  ];

  return (
    <div className="space-y-6">
      <h2>Crew Management</h2>
      
      <FormTable
        title="Crew Members"
        columns={columns}
        data={crewData}
        onDataChange={setCrewData}
        addButtonText="Add Crew Member"
        showActions={true}
        showComments={true}
      />
      
      <div className="mt-4">
        <button 
          onClick={() => console.log('Crew data:', crewData)}
          className="bg-[#16569e] text-white px-4 py-2 rounded"
        >
          Save Crew List
        </button>
      </div>
    </div>
  );
}
```

## Training Records Table

```jsx
function TrainingManagement() {
  const [trainingData, setTrainingData] = useState([]);

  const trainingColumns = [
    { id: 'serialNumber', header: 'S/N', type: 'readonly', width: '50px' },
    { 
      id: 'trainingType', 
      header: 'Training Type', 
      type: 'select',
      options: [
        { value: 'basic-safety', label: 'Basic Safety Training' },
        { value: 'fire-fighting', label: 'Fire Fighting' },
        { value: 'first-aid', label: 'First Aid' },
        { value: 'leadership', label: 'Leadership Training' },
        { value: 'navigation', label: 'Navigation' },
        { value: 'engine-room', label: 'Engine Room Operations' }
      ],
      required: true
    },
    { 
      id: 'institution', 
      header: 'Training Institution', 
      type: 'text',
      placeholder: 'Enter institution name'
    },
    { 
      id: 'completionDate', 
      header: 'Completion Date', 
      type: 'date',
      required: true
    },
    { 
      id: 'validUntil', 
      header: 'Valid Until', 
      type: 'date'
    },
    { 
      id: 'effectiveness', 
      header: 'Effectiveness Rating', 
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'satisfactory', label: 'Satisfactory' },
        { value: 'needs-improvement', label: 'Needs Improvement' }
      ]
    },
    { 
      id: 'notes', 
      header: 'Notes', 
      type: 'textarea',
      placeholder: 'Additional notes...',
      rows: 2
    }
  ];

  return (
    <FormTable
      title="Training Records"
      columns={trainingColumns}
      data={trainingData}
      onDataChange={setTrainingData}
      addButtonText="Add Training Record"
      showActions={true}
      showComments={false}
      maxRows={20}
    />
  );
}
```

## Equipment Inventory Table

```jsx
function EquipmentInventory() {
  const [equipmentData, setEquipmentData] = useState([]);

  const equipmentColumns = [
    { id: 'serialNumber', header: 'Item #', type: 'readonly', width: '70px' },
    { 
      id: 'equipmentName', 
      header: 'Equipment Name', 
      type: 'text',
      placeholder: 'Enter equipment name',
      required: true
    },
    { 
      id: 'category', 
      header: 'Category', 
      type: 'select',
      options: [
        { value: 'safety', label: 'Safety Equipment' },
        { value: 'navigation', label: 'Navigation Equipment' },
        { value: 'communication', label: 'Communication' },
        { value: 'engine', label: 'Engine Room' },
        { value: 'deck', label: 'Deck Equipment' }
      ]
    },
    { 
      id: 'serialNo', 
      header: 'Serial Number', 
      type: 'text',
      placeholder: 'Enter serial number'
    },
    { 
      id: 'quantity', 
      header: 'Quantity', 
      type: 'number',
      min: 0,
      placeholder: 'Qty'
    },
    { 
      id: 'condition', 
      header: 'Condition', 
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'defective', label: 'Defective' }
      ]
    },
    { 
      id: 'lastInspection', 
      header: 'Last Inspection', 
      type: 'date'
    },
    { 
      id: 'nextInspection', 
      header: 'Next Inspection', 
      type: 'date'
    },
    { 
      id: 'operational', 
      header: 'Operational', 
      type: 'checkbox'
    }
  ];

  return (
    <div>
      <FormTable
        title="Equipment Inventory"
        columns={equipmentColumns}
        data={equipmentData}
        onDataChange={setEquipmentData}
        addButtonText="Add Equipment"
        showActions={true}
        showComments={true}
        className="equipment-table"
      />
    </div>
  );
}
```

## Assessment Criteria Table

```jsx
function PerformanceAssessment() {
  const [assessmentData, setAssessmentData] = useState([
    {
      id: '1',
      criteria: 'Navigation Skills',
      weight: '25',
      rating: 'good',
      score: '4',
      comments: 'Strong understanding of navigation principles'
    }
  ]);

  const assessmentColumns = [
    { id: 'serialNumber', header: 'S/N', type: 'readonly', width: '50px' },
    { 
      id: 'criteria', 
      header: 'Assessment Criteria', 
      type: 'text',
      placeholder: 'Enter assessment criteria',
      required: true
    },
    { 
      id: 'weight', 
      header: 'Weight (%)', 
      type: 'number',
      placeholder: '%',
      min: 0,
      max: 100,
      width: '100px'
    },
    { 
      id: 'rating', 
      header: 'Rating', 
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent (5)' },
        { value: 'good', label: 'Good (4)' },
        { value: 'satisfactory', label: 'Satisfactory (3)' },
        { value: 'needs-improvement', label: 'Needs Improvement (2)' },
        { value: 'unsatisfactory', label: 'Unsatisfactory (1)' }
      ],
      required: true
    },
    { 
      id: 'score', 
      header: 'Score', 
      type: 'readonly',
      width: '80px'
    },
    { 
      id: 'comments', 
      header: 'Comments', 
      type: 'textarea',
      placeholder: 'Enter assessment comments...',
      rows: 2
    }
  ];

  // Calculate scores based on rating
  const handleAssessmentChange = (newData) => {
    const updatedData = newData.map(row => {
      const ratingToScore = {
        'excellent': '5',
        'good': '4',
        'satisfactory': '3',
        'needs-improvement': '2',
        'unsatisfactory': '1'
      };
      return {
        ...row,
        score: ratingToScore[row.rating] || ''
      };
    });
    setAssessmentData(updatedData);
  };

  return (
    <FormTable
      title="Performance Assessment Criteria"
      columns={assessmentColumns}
      data={assessmentData}
      onDataChange={handleAssessmentChange}
      addButtonText="Add Assessment Criteria"
      showActions={true}
      showComments={false} // Comments are inline
    />
  );
}
```

## Read-Only Display Table

```jsx
function VesselSpecificationsDisplay() {
  const vesselSpecs = [
    { id: '1', specification: 'Length Overall', value: '180.5', unit: 'meters' },
    { id: '2', specification: 'Beam', value: '32.2', unit: 'meters' },
    { id: '3', specification: 'Draft', value: '12.8', unit: 'meters' },
    { id: '4', specification: 'Gross Tonnage', value: '25,340', unit: 'tons' }
  ];

  const specColumns = [
    { id: 'serialNumber', header: 'S/N', type: 'readonly', width: '50px' },
    { id: 'specification', header: 'Specification', type: 'readonly' },
    { id: 'value', header: 'Value', type: 'readonly', width: '120px' },
    { id: 'unit', header: 'Unit', type: 'readonly', width: '100px' }
  ];

  return (
    <FormTable
      title="Vessel Specifications"
      columns={specColumns}
      data={vesselSpecs}
      onDataChange={() => {}} // No changes allowed
      showActions={false} // No add/delete buttons
      readOnly={true}
      className="specs-table"
    />
  );
}
```

## Column Types Reference

```jsx
const allColumnTypes = [
  // Text input
  { id: 'textField', header: 'Text Field', type: 'text', placeholder: 'Enter text' },
  
  // Number input
  { id: 'numberField', header: 'Number', type: 'number', min: 0, max: 100 },
  
  // Select dropdown
  { 
    id: 'selectField', 
    header: 'Select Field', 
    type: 'select',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ]
  },
  
  // Textarea
  { id: 'textareaField', header: 'Textarea', type: 'textarea', rows: 3 },
  
  // Date input
  { id: 'dateField', header: 'Date', type: 'date' },
  
  // Checkbox
  { id: 'checkboxField', header: 'Checkbox', type: 'checkbox' },
  
  // Read-only field
  { id: 'readonlyField', header: 'Read Only', type: 'readonly' }
];
```

## Data Management

```jsx
function DataManagementExample() {
  const [tableData, setTableData] = useState([]);

  // Add new row programmatically
  const addCustomRow = () => {
    const newRow = {
      id: Date.now().toString(),
      field1: 'default value',
      field2: '',
      // ... other default values
    };
    setTableData([...tableData, newRow]);
  };

  // Update specific row
  const updateRow = (rowId, fieldName, newValue) => {
    setTableData(prev => prev.map(row => 
      row.id === rowId 
        ? { ...row, [fieldName]: newValue }
        : row
    ));
  };

  // Delete specific row
  const deleteRow = (rowId) => {
    setTableData(prev => prev.filter(row => row.id !== rowId));
  };

  // Validate all data
  const validateData = () => {
    const errors = [];
    tableData.forEach((row, index) => {
      if (!row.requiredField) {
        errors.push(`Row ${index + 1}: Required field is missing`);
      }
    });
    return errors;
  };

  return (
    <div>
      <FormTable
        columns={columns}
        data={tableData}
        onDataChange={setTableData}
      />
      
      <div className="mt-4 flex gap-3">
        <button onClick={addCustomRow}>Add Custom Row</button>
        <button onClick={() => console.log('Validation:', validateData())}>
          Validate Data
        </button>
      </div>
    </div>
  );
}
```

## Key Features
- **Self-Contained**: No FormProvider or external context required
- **Dynamic Rows**: Add/remove rows with built-in controls
- **Multiple Column Types**: Text, number, select, textarea, date, checkbox, readonly
- **Built-in Validation**: Required field validation and type checking
- **Serial Numbers**: Automatic row numbering with readonly column type
- **Action Controls**: Optional add/delete buttons
- **Comment System**: Optional comment column for additional notes
- **Responsive Design**: Mobile-friendly table layout
- **Maritime Styling**: Professional appearance matching maritime applications

## Context Requirements
- **No FormProvider needed**: Self-contained component
- **No external form context**: Manages its own state internally
- **Independent operation**: Works without any form library setup

## Best Practices
1. **Column Configuration**: Use appropriate column types for data validation
2. **Required Fields**: Mark essential columns as required for data integrity
3. **Serial Numbers**: Always include readonly serial number column for reference
4. **Data Validation**: Implement validation logic in onDataChange handler
5. **Performance**: Use React.memo for large datasets
6. **Accessibility**: Leverage built-in accessibility features
7. **Mobile Design**: Test table responsiveness on mobile devices

## Common Use Cases
- Crew member listings and management
- Training record tracking
- Equipment and inventory management
- Assessment criteria and scoring
- Incident reporting details
- Maintenance schedules and records
- Compliance checklist items
- Certificate and document tracking
- Port call and voyage records
- Safety inspection findings