# Input Component Guide

## Overview
Input provides text input functionality with maritime-specific validation, styling, and accessibility features. It supports various input types, validation states, and maritime data entry patterns optimized for fleet management applications.

## Component Interface

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  clearable?: boolean;
  onClear?: () => void;
  className?: string;
}
```

## Basic Usage

```jsx
import { Input } from 'scomp-ui';

function BasicInputExample() {
  return (
    <div className="space-y-4 max-w-md">
      {/* Basic text input */}
      <Input 
        placeholder="Enter vessel name"
        type="text"
      />

      {/* Email input */}
      <Input 
        placeholder="captain@maritime.com"
        type="email"
      />

      {/* Number input with constraints */}
      <Input 
        placeholder="Enter gross tonnage"
        type="number"
        min="0"
        step="0.1"
      />

      {/* Required input */}
      <Input 
        placeholder="IMO Number (required)"
        type="text"
        required
      />
    </div>
  );
}
```

## Maritime-Specific Input Fields

```jsx
import { Ship, User, MapPin, Calendar, Hash, Globe } from 'lucide-react';

function MaritimeInputFields() {
  const [formData, setFormData] = useState({
    vesselName: '',
    imoNumber: '',
    captain: '',
    homePort: '',
    flagState: '',
    yearBuilt: '',
    grossTonnage: '',
    deadweight: '',
    length: '',
    beam: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="font-medium">Vessel Registration Form</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vessel Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vessel Name</label>
          <Input 
            placeholder="Enter vessel name"
            value={formData.vesselName}
            onChange={(e) => handleInputChange('vesselName', e.target.value)}
            icon={<Ship className="h-4 w-4" />}
            iconPosition="left"
            required
          />
        </div>

        {/* IMO Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">IMO Number</label>
          <Input 
            placeholder="1234567"
            value={formData.imoNumber}
            onChange={(e) => handleInputChange('imoNumber', e.target.value)}
            icon={<Hash className="h-4 w-4" />}
            iconPosition="left"
            pattern="[0-9]{7}"
            maxLength={7}
            required
          />
        </div>

        {/* Captain */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Captain</label>
          <Input 
            placeholder="Captain Name"
            value={formData.captain}
            onChange={(e) => handleInputChange('captain', e.target.value)}
            icon={<User className="h-4 w-4" />}
            iconPosition="left"
          />
        </div>

        {/* Home Port */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Home Port</label>
          <Input 
            placeholder="Port of registration"
            value={formData.homePort}
            onChange={(e) => handleInputChange('homePort', e.target.value)}
            icon={<MapPin className="h-4 w-4" />}
            iconPosition="left"
          />
        </div>

        {/* Flag State */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Flag State</label>
          <Input 
            placeholder="Country of registration"
            value={formData.flagState}
            onChange={(e) => handleInputChange('flagState', e.target.value)}
            icon={<Globe className="h-4 w-4" />}
            iconPosition="left"
            required
          />
        </div>

        {/* Year Built */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Year Built</label>
          <Input 
            placeholder="1990"
            value={formData.yearBuilt}
            onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
            icon={<Calendar className="h-4 w-4" />}
            iconPosition="left"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Gross Tonnage */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Gross Tonnage</label>
          <Input 
            placeholder="25000"
            value={formData.grossTonnage}
            onChange={(e) => handleInputChange('grossTonnage', e.target.value)}
            type="number"
            min="0"
            step="0.1"
            clearable
            onClear={() => handleInputChange('grossTonnage', '')}
          />
        </div>

        {/* Deadweight */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Deadweight (MT)</label>
          <Input 
            placeholder="40000"
            value={formData.deadweight}
            onChange={(e) => handleInputChange('deadweight', e.target.value)}
            type="number"
            min="0"
            step="0.1"
            clearable
            onClear={() => handleInputChange('deadweight', '')}
          />
        </div>

        {/* Length */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Length Overall (m)</label>
          <Input 
            placeholder="180.5"
            value={formData.length}
            onChange={(e) => handleInputChange('length', e.target.value)}
            type="number"
            min="0"
            step="0.1"
          />
        </div>

        {/* Beam */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Beam (m)</label>
          <Input 
            placeholder="32.2"
            value={formData.beam}
            onChange={(e) => handleInputChange('beam', e.target.value)}
            type="number"
            min="0"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
}
```

## Input Validation States

```jsx
function InputValidationStates() {
  const [values, setValues] = useState({
    valid: 'MV Atlantic Star',
    invalid: 'invalid-imo',
    required: '',
    email: 'captain@maritime.com'
  });

  const [errors, setErrors] = useState({
    invalid: 'Invalid IMO number format',
    required: 'This field is required'
  });

  return (
    <div className="space-y-6 max-w-md">
      <h3 className="font-medium">Input Validation Examples</h3>
      
      {/* Valid input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Valid Input</label>
        <Input 
          value={values.valid}
          onChange={(e) => setValues(prev => ({ ...prev, valid: e.target.value }))}
          success={true}
          placeholder="Vessel name"
        />
        <p className="text-sm text-green-600">✓ Valid vessel name</p>
      </div>

      {/* Invalid input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Invalid Input</label>
        <Input 
          value={values.invalid}
          onChange={(e) => setValues(prev => ({ ...prev, invalid: e.target.value }))}
          error={true}
          placeholder="IMO Number"
        />
        <p className="text-sm text-red-600">✗ {errors.invalid}</p>
      </div>

      {/* Required field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Required Field</label>
        <Input 
          value={values.required}
          onChange={(e) => setValues(prev => ({ ...prev, required: e.target.value }))}
          error={values.required === ''}
          required
          placeholder="Captain name (required)"
        />
        {values.required === '' && (
          <p className="text-sm text-red-600">✗ {errors.required}</p>
        )}
      </div>

      {/* Email validation */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <Input 
          type="email"
          value={values.email}
          onChange={(e) => setValues(prev => ({ ...prev, email: e.target.value }))}
          success={values.email.includes('@') && values.email.includes('.')}
          placeholder="captain@maritime.com"
        />
        {values.email.includes('@') && values.email.includes('.') && (
          <p className="text-sm text-green-600">✓ Valid email format</p>
        )}
      </div>
    </div>
  );
}
```

## Input Variants and Sizes

```jsx
function InputVariantsAndSizes() {
  return (
    <div className="space-y-8 max-w-md">
      {/* Variants */}
      <div className="space-y-4">
        <h3 className="font-medium">Input Variants</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Default Variant</label>
            <Input 
              variant="default"
              placeholder="Default styling"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Outline Variant</label>
            <Input 
              variant="outline"
              placeholder="Outlined styling"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Filled Variant</label>
            <Input 
              variant="filled"
              placeholder="Filled background"
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="font-medium">Input Sizes</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Small Size</label>
            <Input 
              size="sm"
              placeholder="Small input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Medium Size (Default)</label>
            <Input 
              size="md"
              placeholder="Medium input"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Large Size</label>
            <Input 
              size="lg"
              placeholder="Large input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Search and Filter Inputs

```jsx
import { Search, Filter, X } from 'lucide-react';

function SearchAndFilterInputs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Search & Filter Controls</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Search Vessels</label>
          <Input 
            type="search"
            placeholder="Search by name, IMO, or captain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            iconPosition="left"
            clearable
            onClear={() => setSearchTerm('')}
            size="lg"
          />
        </div>

        {/* Filter Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Filter by Port</label>
          <Input 
            placeholder="Enter port name..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            icon={<Filter className="h-4 w-4" />}
            iconPosition="left"
            clearable
            onClear={() => setFilterValue('')}
            size="lg"
          />
        </div>
      </div>

      {/* Search Results Simulation */}
      {(searchTerm || filterValue) && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Search Results</h4>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterValue('');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {searchTerm && `Searching for: "${searchTerm}"`}
            {searchTerm && filterValue && ' | '}
            {filterValue && `Filtered by port: "${filterValue}"`}
          </p>
        </div>
      )}
    </div>
  );
}
```

## Specialized Maritime Inputs

```jsx
function SpecializedMaritimeInputs() {
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: ''
  });

  const [voyage, setVoyage] = useState({
    departureDate: '',
    arrivalDate: '',
    distance: '',
    speed: ''
  });

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Coordinate Inputs */}
      <div className="space-y-4">
        <h3 className="font-medium">Position Coordinates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Latitude</label>
            <Input 
              placeholder="51.2194° N"
              value={coordinates.latitude}
              onChange={(e) => setCoordinates(prev => ({ ...prev, latitude: e.target.value }))}
              pattern="[0-9]*\.?[0-9]*"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Longitude</label>
            <Input 
              placeholder="1.4080° E"
              value={coordinates.longitude}
              onChange={(e) => setCoordinates(prev => ({ ...prev, longitude: e.target.value }))}
              pattern="[0-9]*\.?[0-9]*"
            />
          </div>
        </div>
      </div>

      {/* Voyage Planning Inputs */}
      <div className="space-y-4">
        <h3 className="font-medium">Voyage Planning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Departure Date</label>
            <Input 
              type="datetime-local"
              value={voyage.departureDate}
              onChange={(e) => setVoyage(prev => ({ ...prev, departureDate: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Expected Arrival</label>
            <Input 
              type="datetime-local"
              value={voyage.arrivalDate}
              onChange={(e) => setVoyage(prev => ({ ...prev, arrivalDate: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Distance (NM)</label>
            <Input 
              type="number"
              placeholder="2,450"
              value={voyage.distance}
              onChange={(e) => setVoyage(prev => ({ ...prev, distance: e.target.value }))}
              min="0"
              step="0.1"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Average Speed (knots)</label>
            <Input 
              type="number"
              placeholder="14.5"
              value={voyage.speed}
              onChange={(e) => setVoyage(prev => ({ ...prev, speed: e.target.value }))}
              min="0"
              max="50"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-medium">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Emergency Phone</label>
            <Input 
              type="tel"
              placeholder="+1 (555) 123-4567"
              pattern="[+]?[0-9\s\(\)\-]+"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Satellite Phone</label>
            <Input 
              type="tel"
              placeholder="+870 123456789"
              pattern="[+]?[0-9\s]+"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Key Features
- **Multiple Input Types**: Text, email, number, date, tel, and more
- **Maritime Validation**: Built-in patterns for IMO numbers, coordinates, etc.
- **Icon Integration**: Left and right positioned icons with Lucide React
- **Validation States**: Success, error, and neutral states with visual feedback
- **Clear Functionality**: Optional clear button for easy value reset
- **Size Variants**: Small, medium, and large sizes for different contexts
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Adapts to different screen sizes and layouts

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Works independently or with form libraries
- **No external providers**: Works without additional setup

## Input Type Guidelines
- **Text**: General text input (vessel names, descriptions)
- **Email**: Email addresses with validation
- **Number**: Numerical values (tonnage, dimensions, coordinates)
- **Tel**: Phone numbers (emergency contacts, satellite phones)
- **Date/DateTime**: Voyage planning, inspection dates
- **Search**: Fleet search and filtering
- **URL**: Website and documentation links

## Best Practices
1. **Appropriate Types**: Use correct input type for data validation
2. **Clear Labels**: Provide descriptive labels for all inputs
3. **Validation Feedback**: Show immediate validation feedback
4. **Placeholder Guidance**: Use helpful placeholder examples
5. **Icon Usage**: Use relevant icons to clarify input purpose
6. **Required Indicators**: Clearly mark required fields
7. **Error Handling**: Provide specific error messages
8. **Mobile Optimization**: Ensure usability on mobile devices

## Common Use Cases
- Vessel registration forms
- Crew member data entry
- Navigation and position inputs
- Contact information forms
- Search and filter controls
- Inspection data entry
- Cargo documentation
- Emergency contact forms
- Route planning inputs
- Equipment specification entry