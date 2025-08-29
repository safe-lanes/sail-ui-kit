# Select Component Guide

## Overview
Select provides dropdown selection functionality with maritime-specific options, validation, and accessibility features. It supports single and multi-select modes, searchable options, and maritime data patterns optimized for fleet management applications.

## Component Interface

```typescript
interface SelectProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  error?: boolean;
  success?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}
```

## Basic Usage

```jsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'scomp-ui';

function BasicSelectExample() {
  const [vesselType, setVesselType] = useState('');
  const [rank, setRank] = useState('');
  const [nationality, setNationality] = useState('');

  return (
    <div className="space-y-4 max-w-md">
      {/* Vessel Type Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Vessel Type</label>
        <Select value={vesselType} onValueChange={setVesselType}>
          <SelectTrigger>
            <SelectValue placeholder="Select vessel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oil-tanker">Oil Tanker</SelectItem>
            <SelectItem value="chemical-tanker">Chemical Tanker</SelectItem>
            <SelectItem value="lng-tanker">LNG Tanker</SelectItem>
            <SelectItem value="lpg-tanker">LPG Tanker</SelectItem>
            <SelectItem value="container">Container Ship</SelectItem>
            <SelectItem value="bulk-carrier">Bulk Carrier</SelectItem>
            <SelectItem value="general-cargo">General Cargo</SelectItem>
            <SelectItem value="roro">RoRo</SelectItem>
            <SelectItem value="passenger">Passenger Ship</SelectItem>
            <SelectItem value="offshore">Offshore Vessel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rank Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Rank</label>
        <Select value={rank} onValueChange={setRank}>
          <SelectTrigger>
            <SelectValue placeholder="Select rank" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="master">Master</SelectItem>
            <SelectItem value="chief-officer">Chief Officer</SelectItem>
            <SelectItem value="second-officer">Second Officer</SelectItem>
            <SelectItem value="third-officer">Third Officer</SelectItem>
            <SelectItem value="chief-engineer">Chief Engineer</SelectItem>
            <SelectItem value="second-engineer">Second Engineer</SelectItem>
            <SelectItem value="third-engineer">Third Engineer</SelectItem>
            <SelectItem value="fourth-engineer">Fourth Engineer</SelectItem>
            <SelectItem value="able-seaman">Able Seaman</SelectItem>
            <SelectItem value="ordinary-seaman">Ordinary Seaman</SelectItem>
            <SelectItem value="bosun">Bosun</SelectItem>
            <SelectItem value="oiler">Oiler</SelectItem>
            <SelectItem value="wiper">Wiper</SelectItem>
            <SelectItem value="cook">Cook</SelectItem>
            <SelectItem value="steward">Steward</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Nationality Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Nationality</label>
        <Select value={nationality} onValueChange={setNationality}>
          <SelectTrigger>
            <SelectValue placeholder="Select nationality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="british">British</SelectItem>
            <SelectItem value="filipino">Filipino</SelectItem>
            <SelectItem value="indian">Indian</SelectItem>
            <SelectItem value="ukrainian">Ukrainian</SelectItem>
            <SelectItem value="polish">Polish</SelectItem>
            <SelectItem value="romanian">Romanian</SelectItem>
            <SelectItem value="bulgarian">Bulgarian</SelectItem>
            <SelectItem value="greek">Greek</SelectItem>
            <SelectItem value="turkish">Turkish</SelectItem>
            <SelectItem value="russian">Russian</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

## Maritime-Specific Selection Groups

```jsx
function MaritimeSelectionGroups() {
  const [formData, setFormData] = useState({
    flagState: '',
    classification: '',
    portOfCall: '',
    cargoType: '',
    inspectionType: '',
    certificateType: ''
  });

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="font-medium">Maritime Registration & Operations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flag State */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Flag State</label>
          <Select 
            value={formData.flagState} 
            onValueChange={(value) => handleSelectChange('flagState', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select flag state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="panama">Panama</SelectItem>
              <SelectItem value="liberia">Liberia</SelectItem>
              <SelectItem value="marshall-islands">Marshall Islands</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
              <SelectItem value="malta">Malta</SelectItem>
              <SelectItem value="bahamas">Bahamas</SelectItem>
              <SelectItem value="cyprus">Cyprus</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="greece">Greece</SelectItem>
              <SelectItem value="italy">Italy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Classification Society */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Classification Society</label>
          <Select 
            value={formData.classification} 
            onValueChange={(value) => handleSelectChange('classification', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select classification society" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abs">ABS (American Bureau of Shipping)</SelectItem>
              <SelectItem value="dnv">DNV (Det Norske Veritas)</SelectItem>
              <SelectItem value="lr">LR (Lloyd's Register)</SelectItem>
              <SelectItem value="bv">BV (Bureau Veritas)</SelectItem>
              <SelectItem value="rina">RINA</SelectItem>
              <SelectItem value="kr">KR (Korean Register)</SelectItem>
              <SelectItem value="nkk">NK (Nippon Kaiji Kyokai)</SelectItem>
              <SelectItem value="ccs">CCS (China Classification Society)</SelectItem>
              <SelectItem value="rs">RS (Russian Maritime Register)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Port of Call */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Port of Call</label>
          <Select 
            value={formData.portOfCall} 
            onValueChange={(value) => handleSelectChange('portOfCall', value)}
            searchable
          >
            <SelectTrigger>
              <SelectValue placeholder="Select or search port" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rotterdam">Rotterdam, Netherlands</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
              <SelectItem value="shanghai">Shanghai, China</SelectItem>
              <SelectItem value="antwerp">Antwerp, Belgium</SelectItem>
              <SelectItem value="hamburg">Hamburg, Germany</SelectItem>
              <SelectItem value="los-angeles">Los Angeles, USA</SelectItem>
              <SelectItem value="long-beach">Long Beach, USA</SelectItem>
              <SelectItem value="felixstowe">Felixstowe, UK</SelectItem>
              <SelectItem value="dubai">Dubai, UAE</SelectItem>
              <SelectItem value="hong-kong">Hong Kong</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cargo Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Cargo Type</label>
          <Select 
            value={formData.cargoType} 
            onValueChange={(value) => handleSelectChange('cargoType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cargo type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crude-oil">Crude Oil</SelectItem>
              <SelectItem value="refined-products">Refined Products</SelectItem>
              <SelectItem value="chemicals">Chemicals</SelectItem>
              <SelectItem value="lng">Liquefied Natural Gas (LNG)</SelectItem>
              <SelectItem value="lpg">Liquefied Petroleum Gas (LPG)</SelectItem>
              <SelectItem value="containers">Containers</SelectItem>
              <SelectItem value="dry-bulk">Dry Bulk</SelectItem>
              <SelectItem value="general-cargo">General Cargo</SelectItem>
              <SelectItem value="breakbulk">Breakbulk</SelectItem>
              <SelectItem value="roro-cargo">RoRo Cargo</SelectItem>
              <SelectItem value="passengers">Passengers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inspection Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Inspection Type</label>
          <Select 
            value={formData.inspectionType} 
            onValueChange={(value) => handleSelectChange('inspectionType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select inspection type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="psc">Port State Control</SelectItem>
              <SelectItem value="flag-state">Flag State Inspection</SelectItem>
              <SelectItem value="class-survey">Classification Survey</SelectItem>
              <SelectItem value="vetting">Oil Major Vetting</SelectItem>
              <SelectItem value="tmsa">TMSA Assessment</SelectItem>
              <SelectItem value="isps">ISPS Security Inspection</SelectItem>
              <SelectItem value="marpol">MARPOL Inspection</SelectItem>
              <SelectItem value="solas">SOLAS Safety Inspection</SelectItem>
              <SelectItem value="stcw">STCW Crew Inspection</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Certificate Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Certificate Type</label>
          <Select 
            value={formData.certificateType} 
            onValueChange={(value) => handleSelectChange('certificateType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select certificate type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="smc">Safety Management Certificate</SelectItem>
              <SelectItem value="doc">Document of Compliance</SelectItem>
              <SelectItem value="issc">International Ship Security Certificate</SelectItem>
              <SelectItem value="iopp">International Oil Pollution Prevention</SelectItem>
              <SelectItem value="itc">International Tonnage Certificate</SelectItem>
              <SelectItem value="radio">Radio Safety Certificate</SelectItem>
              <SelectItem value="loadline">Load Line Certificate</SelectItem>
              <SelectItem value="passenger">Passenger Ship Safety Certificate</SelectItem>
              <SelectItem value="cargo">Cargo Ship Safety Certificate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
```

## Multi-Select and Advanced Features

```jsx
function MultiSelectAdvancedFeatures() {
  const [selectedPorts, setSelectedPorts] = useState([]);
  const [selectedRanks, setSelectedRanks] = useState([]);
  const [vesselType, setVesselType] = useState('');
  const [searchablePorts, setSearchablePorts] = useState('');

  const availablePorts = [
    'Rotterdam', 'Singapore', 'Shanghai', 'Antwerp', 'Hamburg', 
    'Los Angeles', 'Long Beach', 'Felixstowe', 'Dubai', 'Hong Kong'
  ];

  const availableRanks = [
    'Master', 'Chief Officer', 'Second Officer', 'Third Officer',
    'Chief Engineer', 'Second Engineer', 'Third Engineer', 'Fourth Engineer'
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="font-medium">Advanced Selection Features</h3>
      
      {/* Multi-select Ports */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Ports of Call (Multi-select)
        </label>
        <Select 
          value={selectedPorts} 
          onValueChange={setSelectedPorts}
          multiple
        >
          <SelectTrigger>
            <SelectValue 
              placeholder="Select multiple ports" 
              className={selectedPorts.length > 0 ? 'text-black' : 'text-gray-500'}
            >
              {selectedPorts.length > 0 && `${selectedPorts.length} port(s) selected`}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availablePorts.map((port) => (
              <SelectItem key={port} value={port.toLowerCase().replace(' ', '-')}>
                {port}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedPorts.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedPorts.map((port) => (
              <span 
                key={port} 
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
              >
                {availablePorts.find(p => p.toLowerCase().replace(' ', '-') === port)}
                <button 
                  onClick={() => setSelectedPorts(prev => prev.filter(p => p !== port))}
                  className="hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Multi-select Ranks */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Authorized Ranks (Multi-select)
        </label>
        <Select 
          value={selectedRanks} 
          onValueChange={setSelectedRanks}
          multiple
        >
          <SelectTrigger>
            <SelectValue placeholder="Select authorized ranks">
              {selectedRanks.length > 0 && `${selectedRanks.length} rank(s) selected`}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availableRanks.map((rank) => (
              <SelectItem key={rank} value={rank.toLowerCase().replace(' ', '-')}>
                {rank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Searchable Select */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Vessel Type (Searchable)
        </label>
        <Select 
          value={vesselType} 
          onValueChange={setVesselType}
          searchable
        >
          <SelectTrigger>
            <SelectValue placeholder="Search or select vessel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oil-tanker">Oil Tanker</SelectItem>
            <SelectItem value="chemical-tanker">Chemical Tanker</SelectItem>
            <SelectItem value="product-tanker">Product Tanker</SelectItem>
            <SelectItem value="lng-carrier">LNG Carrier</SelectItem>
            <SelectItem value="lpg-carrier">LPG Carrier</SelectItem>
            <SelectItem value="container-ship">Container Ship</SelectItem>
            <SelectItem value="bulk-carrier">Bulk Carrier</SelectItem>
            <SelectItem value="general-cargo">General Cargo Ship</SelectItem>
            <SelectItem value="multipurpose">Multipurpose Vessel</SelectItem>
            <SelectItem value="roro">RoRo Ferry</SelectItem>
            <SelectItem value="passenger-ferry">Passenger Ferry</SelectItem>
            <SelectItem value="cruise-ship">Cruise Ship</SelectItem>
            <SelectItem value="offshore-vessel">Offshore Support Vessel</SelectItem>
            <SelectItem value="supply-vessel">Platform Supply Vessel</SelectItem>
            <SelectItem value="tugboat">Tugboat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clearable Select */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Optional Field (Clearable)
        </label>
        <Select 
          value={searchablePorts} 
          onValueChange={setSearchablePorts}
          clearable
        >
          <SelectTrigger>
            <SelectValue placeholder="Optional selection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

## Validation and Error States

```jsx
function SelectValidationStates() {
  const [values, setValues] = useState({
    required: '',
    validated: 'valid-option',
    error: ''
  });

  const [errors, setErrors] = useState({
    required: 'This field is required',
    error: 'Invalid selection'
  });

  const validateRequired = (value) => {
    if (!value) {
      setErrors(prev => ({ ...prev, required: 'This field is required' }));
      return false;
    }
    setErrors(prev => ({ ...prev, required: '' }));
    return true;
  };

  return (
    <div className="space-y-6 max-w-md">
      <h3 className="font-medium">Select Validation Examples</h3>
      
      {/* Required Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Vessel Type <span className="text-red-500">*</span>
        </label>
        <Select 
          value={values.required}
          onValueChange={(value) => {
            setValues(prev => ({ ...prev, required: value }));
            validateRequired(value);
          }}
          error={!!errors.required}
          required
        >
          <SelectTrigger className={errors.required ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select vessel type (required)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tanker">Tanker</SelectItem>
            <SelectItem value="container">Container Ship</SelectItem>
            <SelectItem value="bulk">Bulk Carrier</SelectItem>
          </SelectContent>
        </Select>
        {errors.required && (
          <p className="text-sm text-red-600">✗ {errors.required}</p>
        )}
      </div>

      {/* Valid Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Valid Selection</label>
        <Select 
          value={values.validated}
          onValueChange={(value) => setValues(prev => ({ ...prev, validated: value }))}
          success={true}
        >
          <SelectTrigger className="border-green-500">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="valid-option">Valid Option</SelectItem>
            <SelectItem value="another-option">Another Option</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-green-600">✓ Valid selection</p>
      </div>

      {/* Error State */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Error Example</label>
        <Select 
          value={values.error}
          onValueChange={(value) => setValues(prev => ({ ...prev, error: value }))}
          error={true}
        >
          <SelectTrigger className="border-red-500">
            <SelectValue placeholder="Select with error" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-red-600">✗ {errors.error}</p>
      </div>

      {/* Disabled State */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Disabled Selection</label>
        <Select disabled>
          <SelectTrigger className="opacity-50 cursor-not-allowed">
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="disabled">This won't open</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500">This field is currently disabled</p>
      </div>
    </div>
  );
}
```

## Dynamic and Conditional Selects

```jsx
function DynamicConditionalSelects() {
  const [vesselType, setVesselType] = useState('');
  const [subType, setSubType] = useState('');
  const [cargoType, setCargoType] = useState('');
  
  // Dynamic options based on vessel type
  const getSubTypes = (type) => {
    const subTypes = {
      'tanker': [
        { value: 'crude-oil', label: 'Crude Oil Tanker' },
        { value: 'product', label: 'Product Tanker' },
        { value: 'chemical', label: 'Chemical Tanker' },
        { value: 'lng', label: 'LNG Carrier' },
        { value: 'lpg', label: 'LPG Carrier' }
      ],
      'dry-cargo': [
        { value: 'container', label: 'Container Ship' },
        { value: 'bulk-carrier', label: 'Bulk Carrier' },
        { value: 'general-cargo', label: 'General Cargo' },
        { value: 'multipurpose', label: 'Multipurpose' }
      ],
      'passenger': [
        { value: 'cruise', label: 'Cruise Ship' },
        { value: 'ferry', label: 'Ferry' },
        { value: 'yacht', label: 'Yacht' }
      ]
    };
    return subTypes[type] || [];
  };

  const getCargoTypes = (subType) => {
    const cargoTypes = {
      'crude-oil': ['Light Crude', 'Heavy Crude', 'Extra Heavy Crude'],
      'product': ['Gasoline', 'Diesel', 'Jet Fuel', 'Fuel Oil'],
      'chemical': ['Caustic Soda', 'Methanol', 'Benzene', 'Toluene'],
      'container': ['Dry Containers', 'Reefer Containers', 'Open Top', 'Flat Rack'],
      'bulk-carrier': ['Iron Ore', 'Coal', 'Grain', 'Bauxite', 'Salt']
    };
    return cargoTypes[subType] || [];
  };

  // Reset dependent fields when parent changes
  const handleVesselTypeChange = (value) => {
    setVesselType(value);
    setSubType(''); // Reset sub-type
    setCargoType(''); // Reset cargo type
  };

  const handleSubTypeChange = (value) => {
    setSubType(value);
    setCargoType(''); // Reset cargo type
  };

  return (
    <div className="space-y-6 max-w-md">
      <h3 className="font-medium">Dynamic Conditional Selects</h3>
      
      {/* Primary Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Vessel Category</label>
        <Select value={vesselType} onValueChange={handleVesselTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select vessel category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tanker">Tanker</SelectItem>
            <SelectItem value="dry-cargo">Dry Cargo</SelectItem>
            <SelectItem value="passenger">Passenger</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conditional Sub-type */}
      {vesselType && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vessel Sub-type</label>
          <Select value={subType} onValueChange={handleSubTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select vessel sub-type" />
            </SelectTrigger>
            <SelectContent>
              {getSubTypes(vesselType).map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Conditional Cargo Type */}
      {subType && getCargoTypes(subType).length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Cargo Type</label>
          <Select value={cargoType} onValueChange={setCargoType}>
            <SelectTrigger>
              <SelectValue placeholder="Select cargo type" />
            </SelectTrigger>
            <SelectContent>
              {getCargoTypes(subType).map((cargo) => (
                <SelectItem key={cargo} value={cargo.toLowerCase().replace(' ', '-')}>
                  {cargo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Selection Summary */}
      {vesselType && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Selection Summary:</h4>
          <div className="text-sm space-y-1">
            <div>Category: <span className="font-medium">{vesselType}</span></div>
            {subType && <div>Type: <span className="font-medium">{getSubTypes(vesselType).find(s => s.value === subType)?.label}</span></div>}
            {cargoType && <div>Cargo: <span className="font-medium">{getCargoTypes(subType).find(c => c.toLowerCase().replace(' ', '-') === cargoType)}</span></div>}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Key Features
- **Maritime Options**: Pre-configured options for vessels, ranks, ports, and classifications
- **Multiple Selection**: Multi-select functionality for complex maritime data
- **Searchable Options**: Built-in search for large option lists
- **Validation States**: Error, success, and required field validation
- **Conditional Logic**: Dynamic options based on previous selections
- **Clearable Selections**: Optional clear functionality
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Mobile-friendly dropdown behavior

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Works independently or with form libraries
- **No external providers**: Works without additional setup

## Maritime Data Patterns
- **Vessel Types**: Standardized IMO vessel type classifications
- **Ranks**: STCW-compliant maritime rank structures
- **Ports**: Major international ports and terminals
- **Flag States**: Common flag state registrations
- **Classifications**: Major classification society options
- **Certificates**: Standard maritime certificates and documents

## Best Practices
1. **Appropriate Options**: Use maritime-standard terminology and classifications
2. **Logical Grouping**: Group related options together
3. **Search Functionality**: Enable search for large option lists (>10 items)
4. **Validation Feedback**: Provide immediate validation feedback
5. **Conditional Logic**: Use dynamic options to guide user selections
6. **Required Indicators**: Clearly mark required fields
7. **Mobile Optimization**: Ensure usability on mobile devices
8. **Accessibility**: Provide proper labels and keyboard navigation

## Common Use Cases
- Vessel type and specification selection
- Crew rank and certification selection
- Port and destination selection
- Flag state and classification selection
- Cargo type and handling selection
- Certificate and document type selection
- Inspection and audit type selection
- Equipment and system selection
- Route and navigation selection
- Emergency contact and procedure selection