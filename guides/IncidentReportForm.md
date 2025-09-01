# IncidentReportForm Component Guide

## Overview
The IncidentReportForm component provides a comprehensive incident reporting interface for maritime applications. It enables structured documentation of safety incidents, near-misses, and operational events with TMSA-compliant reporting standards optimized for maritime safety management systems.

## Component Interface

```typescript
interface IncidentReportFormProps {
  mode?: 'create' | 'edit' | 'view';
  initialData?: Partial<IncidentReport>;
  onSubmit?: (data: IncidentReport) => void;
  onCancel?: () => void;
  className?: string;
}

interface IncidentReport {
  id?: string;
  incidentType: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  title: string;
  description: string;
  location: string;
  dateTime: string;
  reportedBy: string;
  witnessess: string[];
  immediateActions: string;
  rootCause?: string;
  correctiveActions?: string;
  preventiveActions?: string;
  attachments?: File[];
  involvedPersonnel: string[];
  equipmentInvolved: string[];
  environmentalConditions?: string;
  injuryDetails?: string;
  damageAssessment?: string;
  regulatoryNotification?: boolean;
  followUpRequired?: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'closed';
}
```

## Key Features
- **Maritime Compliance**: TMSA, ISM Code, and MLC compliant reporting structure
- **Structured Workflow**: Guided incident reporting with validation
- **Multi-step Process**: Progressive disclosure for comprehensive documentation
- **Evidence Collection**: File attachment and photo documentation support
- **Real-time Validation**: Immediate feedback on required fields and data quality

## Basic Usage

```tsx
import { IncidentReportForm } from 'scomp-ui/sail-ui-kit';

function IncidentReportingInterface() {
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReport = (data: IncidentReport) => {
    console.log('Incident report submitted:', data);
    // Process the incident report
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#16569e]">
          Safety Incident Reporting
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Report New Incident
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <IncidentReportForm
              mode="create"
              onSubmit={handleSubmitReport}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

## Comprehensive Incident Report Form

```tsx
function ComprehensiveIncidentReportForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<IncidentReport>>({
    severity: 'medium',
    status: 'draft',
    witnessess: [],
    involvedPersonnel: [],
    equipmentInvolved: [],
    attachments: []
  });

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Incident overview and classification' },
    { id: 2, title: 'Details & Location', description: 'Detailed description and location data' },
    { id: 3, title: 'Personnel & Witnesses', description: 'Involved personnel and witness information' },
    { id: 4, title: 'Actions & Analysis', description: 'Immediate actions and root cause analysis' },
    { id: 5, title: 'Review & Submit', description: 'Final review and submission' }
  ];

  const incidentTypes = [
    { value: 'injury', label: 'Personal Injury', category: 'Safety' },
    { value: 'near-miss', label: 'Near Miss', category: 'Safety' },
    { value: 'equipment-failure', label: 'Equipment Failure', category: 'Operational' },
    { value: 'environmental', label: 'Environmental Incident', category: 'Environmental' },
    { value: 'fire', label: 'Fire/Explosion', category: 'Emergency' },
    { value: 'collision', label: 'Collision/Contact', category: 'Navigation' },
    { value: 'pollution', label: 'Pollution Incident', category: 'Environmental' },
    { value: 'security', label: 'Security Incident', category: 'Security' },
    { value: 'cargo', label: 'Cargo Related', category: 'Operational' },
    { value: 'weather', label: 'Weather Related', category: 'Operational' }
  ];

  const vesselLocations = [
    'Bridge', 'Engine Room', 'Main Deck', 'Cargo Hold #1', 'Cargo Hold #2', 'Cargo Hold #3',
    'Accommodation', 'Galley', 'Recreation Area', 'Hospital', 'Workshop', 'Pump Room',
    'Port Side', 'Starboard Side', 'Bow Area', 'Stern Area', 'Machinery Space', 'Other'
  ];

  const crewMembers = [
    'Captain James Morrison', 'Chief Officer Smith', 'Second Officer Chen', 'Third Officer Rodriguez',
    'Chief Engineer Davis', 'Second Engineer Johnson', 'Third Engineer Martinez', 'Bosun Williams',
    'AB Seaman Thompson', 'AB Seaman Lee', 'Ordinary Seaman Brown', 'Cook Garcia',
    'Electrician Wilson', 'Fitter Anderson', 'Oiler Taylor', 'Wiper Jackson'
  ];

  const updateFormData = (field: keyof IncidentReport, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.incidentType && formData.title && formData.dateTime && formData.reportedBy);
      case 2:
        return !!(formData.description && formData.location);
      case 3:
        return true; // Optional step
      case 4:
        return !!formData.immediateActions;
      case 5:
        return true; // Review step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitReport = () => {
    const finalData = {
      ...formData,
      id: `INC-${Date.now()}`,
      status: 'submitted' as const,
      submittedAt: new Date().toISOString()
    };
    console.log('Submitting incident report:', finalData);
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#16569e] mb-2">
          Incident Report Form
        </h3>
        <p className="text-gray-600">
          Complete this form to report safety incidents, near-misses, or operational events
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${currentStep >= step.id 
                  ? 'bg-[#16569e] border-[#16569e] text-white' 
                  : 'bg-white border-gray-300 text-gray-500'
                }
              `}>
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-full h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-[#16569e]' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">{steps[currentStep - 1].title}</h4>
          <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type *
                </label>
                <select
                  value={formData.incidentType || ''}
                  onChange={(e) => updateFormData('incidentType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level *
                </label>
                <select
                  value={formData.severity || 'medium'}
                  onChange={(e) => updateFormData('severity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                >
                  <option value="low">Low - Minimal impact</option>
                  <option value="medium">Medium - Limited impact</option>
                  <option value="high">High - Significant impact</option>
                  <option value="critical">Critical - Major impact</option>
                  <option value="emergency">Emergency - Immediate threat</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => updateFormData('title', e.target.value)}
                placeholder="Brief, descriptive title of the incident"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date and Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.dateTime || ''}
                  onChange={(e) => updateFormData('dateTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reported By *
                </label>
                <select
                  value={formData.reportedBy || ''}
                  onChange={(e) => updateFormData('reportedBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                >
                  <option value="">Select reporting person</option>
                  {crewMembers.map((member) => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details & Location */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={6}
                placeholder="Provide a detailed description of what happened, including sequence of events, conditions at the time, and any contributing factors..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  value={formData.location || ''}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                >
                  <option value="">Select location</option>
                  {vesselLocations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environmental Conditions
                </label>
                <textarea
                  value={formData.environmentalConditions || ''}
                  onChange={(e) => updateFormData('environmentalConditions', e.target.value)}
                  rows={3}
                  placeholder="Weather conditions, sea state, visibility, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Injury Details (if applicable)
                </label>
                <textarea
                  value={formData.injuryDetails || ''}
                  onChange={(e) => updateFormData('injuryDetails', e.target.value)}
                  rows={3}
                  placeholder="Description of any injuries sustained..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Damage Assessment
                </label>
                <textarea
                  value={formData.damageAssessment || ''}
                  onChange={(e) => updateFormData('damageAssessment', e.target.value)}
                  rows={3}
                  placeholder="Description of any equipment or property damage..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Personnel & Witnesses */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Involved Personnel
              </label>
              <div className="space-y-2">
                {crewMembers.map((member) => (
                  <label key={member} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.involvedPersonnel?.includes(member) || false}
                      onChange={(e) => {
                        const current = formData.involvedPersonnel || [];
                        if (e.target.checked) {
                          updateFormData('involvedPersonnel', [...current, member]);
                        } else {
                          updateFormData('involvedPersonnel', current.filter(p => p !== member));
                        }
                      }}
                      className="rounded text-[#16569e] focus:ring-[#16569e]"
                    />
                    <span className="text-sm text-gray-700">{member}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Witnesses
              </label>
              <div className="space-y-2">
                {crewMembers.map((member) => (
                  <label key={member} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.witnessess?.includes(member) || false}
                      onChange={(e) => {
                        const current = formData.witnessess || [];
                        if (e.target.checked) {
                          updateFormData('witnessess', [...current, member]);
                        } else {
                          updateFormData('witnessess', current.filter(w => w !== member));
                        }
                      }}
                      className="rounded text-[#16569e] focus:ring-[#16569e]"
                    />
                    <span className="text-sm text-gray-700">{member}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Involved
              </label>
              <textarea
                value={formData.equipmentInvolved?.join(', ') || ''}
                onChange={(e) => updateFormData('equipmentInvolved', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                rows={3}
                placeholder="List any equipment, machinery, or tools involved in the incident..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>
          </div>
        )}

        {/* Step 4: Actions & Analysis */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Immediate Actions Taken *
              </label>
              <textarea
                value={formData.immediateActions || ''}
                onChange={(e) => updateFormData('immediateActions', e.target.value)}
                rows={4}
                placeholder="Describe the immediate actions taken to address the incident and prevent escalation..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Root Cause Analysis
              </label>
              <textarea
                value={formData.rootCause || ''}
                onChange={(e) => updateFormData('rootCause', e.target.value)}
                rows={4}
                placeholder="Identify the underlying causes that led to this incident..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Corrective Actions
                </label>
                <textarea
                  value={formData.correctiveActions || ''}
                  onChange={(e) => updateFormData('correctiveActions', e.target.value)}
                  rows={4}
                  placeholder="Actions to fix the immediate problem..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preventive Actions
                </label>
                <textarea
                  value={formData.preventiveActions || ''}
                  onChange={(e) => updateFormData('preventiveActions', e.target.value)}
                  rows={4}
                  placeholder="Actions to prevent similar incidents in the future..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="regulatory-notification"
                  checked={formData.regulatoryNotification || false}
                  onChange={(e) => updateFormData('regulatoryNotification', e.target.checked)}
                  className="rounded text-[#16569e] focus:ring-[#16569e]"
                />
                <label htmlFor="regulatory-notification" className="text-sm text-gray-700">
                  Regulatory notification required (Coast Guard, Port State, Flag State)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="follow-up"
                  checked={formData.followUpRequired || false}
                  onChange={(e) => updateFormData('followUpRequired', e.target.checked)}
                  className="rounded text-[#16569e] focus:ring-[#16569e]"
                />
                <label htmlFor="follow-up" className="text-sm text-gray-700">
                  Follow-up investigation required
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Incident Report Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-800">Type:</span>
                  <div className="text-blue-700">{formData.incidentType}</div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Severity:</span>
                  <div className="text-blue-700">{formData.severity}</div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Title:</span>
                  <div className="text-blue-700">{formData.title}</div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Date/Time:</span>
                  <div className="text-blue-700">
                    {formData.dateTime && new Date(formData.dateTime).toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Location:</span>
                  <div className="text-blue-700">{formData.location}</div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Reported By:</span>
                  <div className="text-blue-700">{formData.reportedBy}</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-yellow-800">
                    Important Notice
                  </h5>
                  <p className="text-sm text-yellow-700 mt-1">
                    By submitting this report, you confirm that the information provided is accurate 
                    and complete to the best of your knowledge. This report will be reviewed by the 
                    safety department and may be shared with relevant authorities as required by maritime regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </span>
        </div>

        {currentStep < steps.length ? (
          <button
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
            className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitReport}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Submit Report
          </button>
        )}
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Form State Management**: Efficient state updates for large forms
- **Validation**: Real-time validation without performance impact
- **File Handling**: Optimized attachment processing
- **Auto-save**: Periodic saving of draft reports

## Accessibility Features

- **Form Navigation**: Clear step-by-step progression
- **Screen Reader Support**: Proper form labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Error Handling**: Clear validation messages and error states

## Common Patterns

```tsx
// Basic incident report
<IncidentReportForm
  mode="create"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
/>

// Edit existing report
<IncidentReportForm
  mode="edit"
  initialData={existingReport}
  onSubmit={handleUpdate}
/>

// View-only mode
<IncidentReportForm
  mode="view"
  initialData={reportData}
/>
```

## Integration with Maritime Systems

The IncidentReportForm component integrates seamlessly with:
- **Safety Management**: ISM and TMSA compliance documentation
- **Emergency Response**: Real-time incident notification and response
- **Regulatory Reporting**: Automated submission to maritime authorities
- **Trend Analysis**: Data collection for safety trend analysis
- **Training Systems**: Incident-based learning and training updates

Use this component to ensure comprehensive incident documentation and maintain compliance with maritime safety regulations.