# Dialog Component Guide

## Overview
The Dialog component provides a modal overlay system for maritime applications. Unlike SAILForm which has multi-section navigation, Dialog is perfect for simple popups, confirmations, and single-purpose forms. It's the recommended choice for "Add Vessel" popups and other straightforward modal interactions.

## Component Interface

```typescript
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

interface DialogTitleProps {
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
}
```

## Basic Dialog Usage

```jsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'scomp-ui';

function BasicDialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[#16569e] text-white px-4 py-2 rounded"
      >
        Open Dialog
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed with this action?
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                console.log('Action confirmed');
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-[#16569e] text-white rounded hover:bg-[#144d8a]"
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## Add Vessel Dialog (Recommended for Simple Forms)

```jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'scomp-ui';

function AddVesselDialog({ isOpen, onClose, onSave }) {
  const form = useForm({
    defaultValues: {
      vesselName: '',
      vesselType: '',
      imoNumber: '',
      flag: '',
      captain: '',
      yearBuilt: '',
      grossTonnage: ''
    }
  });

  const handleSubmit = (data) => {
    console.log('Vessel data:', data);
    onSave(data);
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vessel</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6">
          {/* Basic vessel information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Vessel Name *
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16569e] focus:border-transparent"
                placeholder="Enter vessel name"
                {...form.register('vesselName', { required: 'Vessel name is required' })}
              />
              {form.formState.errors.vesselName && (
                <p className="text-red-500 text-sm">{form.formState.errors.vesselName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Vessel Type *
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16569e] focus:border-transparent"
                {...form.register('vesselType', { required: 'Vessel type is required' })}
              >
                <option value="">Select vessel type</option>
                <option value="cargo">Cargo Ship</option>
                <option value="tanker">Tanker</option>
                <option value="container">Container Ship</option>
                <option value="bulk">Bulk Carrier</option>
                <option value="passenger">Passenger Ship</option>
              </select>
              {form.formState.errors.vesselType && (
                <p className="text-red-500 text-sm">{form.formState.errors.vesselType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                IMO Number *
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16569e] focus:border-transparent"
                placeholder="Enter IMO number"
                {...form.register('imoNumber', { required: 'IMO number is required' })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Flag State *
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16569e] focus:border-transparent"
                {...form.register('flag', { required: 'Flag state is required' })}
              >
                <option value="">Select flag state</option>
                <option value="panama">Panama</option>
                <option value="liberia">Liberia</option>
                <option value="singapore">Singapore</option>
                <option value="marshall-islands">Marshall Islands</option>
                <option value="uk">United Kingdom</option>
                <option value="malta">Malta</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Captain
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16569e] focus:border-transparent"
                placeholder="Enter captain name"
                {...form.register('captain')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Year Built
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16569e] focus:border-transparent"
                placeholder="Enter year"
                min="1950"
                max={new Date().getFullYear()}
                {...form.register('yearBuilt')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Gross Tonnage
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16569e] focus:border-transparent"
                placeholder="Enter tonnage"
                min="0"
                step="0.1"
                {...form.register('grossTonnage')}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-[#16569e] text-white rounded-lg hover:bg-[#144d8a] focus:ring-2 focus:ring-[#16569e]"
            >
              Add Vessel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Usage
function VesselManagement() {
  const [showAddVessel, setShowAddVessel] = useState(false);

  const handleSaveVessel = (vesselData) => {
    console.log('Saving vessel:', vesselData);
    // Save logic here
  };

  return (
    <div>
      <button 
        onClick={() => setShowAddVessel(true)}
        className="bg-[#16569e] text-white px-4 py-2 rounded-lg"
      >
        Add Vessel
      </button>

      <AddVesselDialog
        isOpen={showAddVessel}
        onClose={() => setShowAddVessel(false)}
        onSave={handleSaveVessel}
      />
    </div>
  );
}
```

## Confirmation Dialogs

```jsx
function DeleteConfirmationDialog({ isOpen, onClose, onConfirm, itemName }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{itemName}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Usage
function CrewMemberRow({ member, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 border rounded">
      <div>
        <h3>{member.name}</h3>
        <p className="text-gray-600">{member.rank}</p>
      </div>
      
      <button 
        onClick={() => setShowDeleteDialog(true)}
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => onDelete(member.id)}
        itemName={member.name}
      />
    </div>
  );
}
```

## Information Display Dialog

```jsx
function VesselDetailsDialog({ vessel, isOpen, onClose }) {
  if (!vessel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{vessel.name} - Details</DialogTitle>
          <DialogDescription>
            Complete vessel information and specifications
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>
              <div className="space-y-2">
                <div><strong>Vessel Name:</strong> {vessel.name}</div>
                <div><strong>IMO Number:</strong> {vessel.imoNumber}</div>
                <div><strong>Type:</strong> {vessel.type}</div>
                <div><strong>Flag:</strong> {vessel.flag}</div>
                <div><strong>Year Built:</strong> {vessel.yearBuilt}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Specifications</h3>
              <div className="space-y-2">
                <div><strong>Length:</strong> {vessel.length}m</div>
                <div><strong>Beam:</strong> {vessel.beam}m</div>
                <div><strong>Draft:</strong> {vessel.draft}m</div>
                <div><strong>Gross Tonnage:</strong> {vessel.grossTonnage}</div>
                <div><strong>Capacity:</strong> {vessel.capacity}</div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Current Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <div className="font-medium">Location</div>
                <div className="text-sm text-gray-600">{vessel.currentPort}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="font-medium">Status</div>
                <div className="text-sm text-gray-600">{vessel.status}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="font-medium">Captain</div>
                <div className="text-sm text-gray-600">{vessel.captain}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#16569e] text-white rounded-lg hover:bg-[#144d8a]"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## Form Dialog with Validation

```jsx
function EditCrewMemberDialog({ member, isOpen, onClose, onSave }) {
  const form = useForm({
    defaultValues: member || {
      name: '',
      rank: '',
      nationality: '',
      email: '',
      phone: '',
      emergencyContact: ''
    }
  });

  React.useEffect(() => {
    if (member) {
      form.reset(member);
    }
  }, [member, form]);

  const handleSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {member ? 'Edit Crew Member' : 'Add Crew Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name *</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter full name"
              {...form.register('name', { required: 'Name is required' })}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rank *</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              {...form.register('rank', { required: 'Rank is required' })}
            >
              <option value="">Select rank</option>
              <option value="master">Master</option>
              <option value="chief-officer">Chief Officer</option>
              <option value="second-officer">Second Officer</option>
              <option value="engineer">Engineer</option>
              <option value="able-seaman">Able Seaman</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="crew@maritime.com"
              {...form.register('email')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="+1 (555) 123-4567"
              {...form.register('phone')}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#16569e] text-white rounded-lg hover:bg-[#144d8a]"
            >
              {member ? 'Update' : 'Add'} Crew Member
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

## Dialog Sizes

```jsx
// Small dialog (confirmations)
<DialogContent className="max-w-md">

// Medium dialog (forms)
<DialogContent className="max-w-lg">

// Large dialog (detailed forms)
<DialogContent className="max-w-2xl">

// Extra large dialog (complex data)
<DialogContent className="max-w-4xl">

// Full screen on mobile, constrained on desktop
<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
```

## Key Features
- **Simple Modal Interface**: Clean overlay without complex navigation
- **Form Integration**: Works perfectly with React Hook Form and form.register()
- **Responsive Design**: Adapts to mobile and desktop screens
- **Accessible**: Built-in keyboard navigation and screen reader support
- **Flexible Sizing**: Multiple size options for different use cases
- **Maritime Styling**: Professional appearance matching maritime applications
- **No FormProvider Required**: Works with regular form inputs

## Context Requirements
- **No FormProvider needed**: Works with regular form elements and form.register()
- **No external context**: Self-contained modal component
- **Independent operation**: No form context dependencies

## When to Use Dialog vs SAILForm
- **Use Dialog for**: Simple forms, confirmations, single-purpose popups, "Add Item" dialogs
- **Use SAILForm for**: Multi-section forms, appraisals, complex assessments, forms with navigation

## Best Practices
1. **Single Purpose**: Each dialog should have one clear purpose
2. **Appropriate Sizing**: Choose dialog size based on content complexity
3. **Clear Actions**: Use descriptive button labels
4. **Escape Handling**: Allow users to close with Escape key
5. **Mobile Optimization**: Test dialog behavior on mobile devices
6. **Focus Management**: Ensure proper focus handling when opening/closing
7. **Form Validation**: Implement client-side validation for better UX

## Common Use Cases
- Add/edit vessel popups
- Crew member management dialogs
- Equipment entry forms
- Delete confirmations
- Information display modals
- Quick data entry forms
- Settings and configuration dialogs
- Document upload interfaces
- Status change confirmations