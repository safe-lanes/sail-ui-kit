# IncidentReportForm Component Guide

## Overview
The IncidentReportForm component provides a comprehensive incident reporting interface for maritime applications. It enables structured documentation of safety incidents, near-misses, and operational events with TMSA-compliant reporting standards optimized for maritime safety management systems.

## Enhanced Component Interface

The IncidentReportForm component has been significantly enhanced with **100+ enterprise props** for comprehensive incident management capabilities:

```typescript
interface IncidentReportFormProps {
  // Core functionality
  incident?: Partial<IncidentReport>;
  onSave: (incident: IncidentReport) => void;
  onCancel: () => void;
  readonly?: boolean;
  
  // ✨ ENTERPRISE ENHANCEMENTS
  
  // Validation and form management
  validationRules?: Record<string, (value: unknown) => string | null>;
  onValidationError?: (errors: Record<string, string>) => void;
  validateOnChange?: boolean;
  validateOnSubmit?: boolean;
  customValidation?: (incident: Partial<IncidentReport>) => Record<string, string>;
  
  // Workflow management
  currentStep?: number;
  totalSteps?: number;
  onStepChange?: (step: number) => void;
  workflowSteps?: Array<{
    id: string;
    title: string;
    description?: string;
    required?: boolean;
    completed?: boolean;
  }>;
  enableWorkflow?: boolean;
  onWorkflowComplete?: (incident: IncidentReport) => void;
  
  // Auto-save and persistence
  autoSave?: boolean;
  autoSaveInterval?: number;
  onAutoSave?: (incident: Partial<IncidentReport>) => void;
  draftId?: string;
  onDraftSave?: (draftId: string, incident: Partial<IncidentReport>) => void;
  onDraftLoad?: (draftId: string) => Partial<IncidentReport>;
  enableDrafts?: boolean;
  
  // File attachments and evidence
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    uploadedBy?: string;
    uploadedAt?: Date;
  }>;
  onAttachmentUpload?: (files: FileList) => void;
  onAttachmentDelete?: (attachmentId: string) => void;
  onAttachmentView?: (attachmentId: string) => void;
  maxAttachments?: number;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  
  // Collaboration features
  comments?: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    type?: 'comment' | 'review' | 'approval';
  }>;
  onCommentAdd?: (comment: string) => void;
  onCommentEdit?: (commentId: string, content: string) => void;
  onCommentDelete?: (commentId: string) => void;
  enableComments?: boolean;
  enableMentions?: boolean;
  
  // Review and approval workflow
  reviewers?: Array<{
    id: string;
    name: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    comments?: string;
  }>;
  onReviewerAdd?: (reviewerId: string) => void;
  onReviewerRemove?: (reviewerId: string) => void;
  onReviewSubmit?: (status: 'approved' | 'rejected', comments?: string) => void;
  requireReview?: boolean;
  minRequiredApprovals?: number;
  
  // Dynamic field configuration
  customFields?: Array<{
    id: string;
    type: 'text' | 'select' | 'multiselect' | 'date' | 'textarea' | 'checkbox';
    label: string;
    required?: boolean;
    options?: string[];
    validation?: (value: unknown) => string | null;
  }>;
  onCustomFieldChange?: (fieldId: string, value: unknown) => void;
  fieldVisibilityRules?: Record<string, (incident: Partial<IncidentReport>) => boolean>;
  
  // Templates and pre-filling
  templates?: Array<{
    id: string;
    name: string;
    description?: string;
    data: Partial<IncidentReport>;
  }>;
  onTemplateSelect?: (templateId: string) => void;
  onTemplateSave?: (name: string, incident: Partial<IncidentReport>) => void;
  enableTemplates?: boolean;
  
  // Integration and data sources
  onVesselLookup?: (query: string) => Promise<string[]>;
  onPersonnelLookup?: (query: string) => Promise<string[]>;
  onLocationLookup?: (query: string) => Promise<string[]>;
  availableVessels?: string[];
  availablePersonnel?: string[];
  availableLocations?: string[];
  
  // Notification and alerts
  onNotificationSend?: (recipients: string[], message: string) => void;
  notificationRules?: Array<{
    trigger: 'severity_change' | 'status_change' | 'assignment';
    recipients: string[];
    template: string;
  }>;
  enableNotifications?: boolean;
  
  // Audit trail and history
  changeHistory?: Array<{
    id: string;
    field: string;
    oldValue: unknown;
    newValue: unknown;
    changedBy: string;
    changedAt: Date;
    reason?: string;
  }>;
  onChangeLog?: (field: string, oldValue: unknown, newValue: unknown, reason?: string) => void;
  enableAuditTrail?: boolean;
  
  // Export and reporting
  onExport?: (format: 'pdf' | 'docx' | 'excel') => void;
  onPrint?: () => void;
  onGenerateReport?: () => void;
  reportTemplate?: string;
  enableExport?: boolean;
  
  // Form behavior and UX
  enableTabNavigation?: boolean;
  enableKeyboardShortcuts?: boolean;
  onKeyboardShortcut?: (shortcut: string) => void;
  showProgressIndicator?: boolean;
  enableFormValidationSummary?: boolean;
  confirmOnCancel?: boolean;
  
  // Conditional logic and dynamic behavior
  onFieldVisibilityChange?: (field: string, visible: boolean) => void;
  dependentFields?: Record<string, {
    dependsOn: string;
    condition: (value: unknown) => boolean;
    action: 'show' | 'hide' | 'require' | 'disable';
  }>;
  
  // Data quality and completeness
  requiredFieldsPerStep?: Record<number, string[]>;
  dataQualityChecks?: Array<{
    field: string;
    check: (value: unknown) => { valid: boolean; message?: string; suggestion?: string };
  }>;
  onDataQualityIssue?: (field: string, issue: string, suggestion?: string) => void;
  
  // User permissions and access control
  userPermissions?: {
    canEdit?: boolean;
    canSubmit?: boolean;
    canDelete?: boolean;
    canReview?: boolean;
    canApprove?: boolean;
    editableFields?: string[];
  };
  onPermissionCheck?: (action: string, field?: string) => boolean;
  
  // Maritime-specific enhancements
  emergencyMode?: boolean;
  onEmergencyProtocolTrigger?: (incident: Partial<IncidentReport>) => void;
  complianceChecks?: Array<{
    regulation: string;
    check: (incident: Partial<IncidentReport>) => boolean;
    message: string;
  }>;
  maritimeAuthorityNotification?: boolean;
  onAuthorityNotify?: (incident: IncidentReport, authorities: string[]) => void;
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

## Enhanced Key Features

### Core Maritime Capabilities
- **Maritime Compliance**: TMSA, ISM Code, and MLC compliant reporting with automated compliance checks
- **Structured Workflow**: Multi-step guided reporting with customizable workflow stages
- **Multi-step Process**: Progressive disclosure with validation at each step and smart form navigation
- **Evidence Collection**: Advanced file attachment system with versioning and metadata capture
- **Real-time Validation**: Intelligent validation with custom rules and data quality suggestions

### Enterprise Enhancements
- **Advanced Workflow Management**: Configurable multi-step processes with approval chains and status tracking
- **Collaboration Features**: Real-time commenting, reviewer assignment, and team collaboration tools
- **Auto-save & Draft Management**: Automatic saving with draft recovery and version control
- **Dynamic Field Configuration**: Customizable forms with conditional field visibility and validation
- **Template System**: Pre-configured incident templates for common scenarios and rapid reporting
- **Integration Capabilities**: Smart lookup for vessels, personnel, and locations with external system integration
- **Audit Trail & History**: Complete change tracking with user attribution and reason logging
- **Advanced Notifications**: Smart notification system with customizable triggers and escalation rules
- **Export & Reporting**: Generate comprehensive reports in multiple formats with custom templates
- **Maritime Authority Integration**: Automated regulatory notification and compliance reporting
- **Emergency Response**: Emergency mode with rapid reporting and instant escalation protocols

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

## Enterprise Feature Examples

### Advanced Workflow Management

```tsx
function WorkflowEnabledIncidentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [workflowData, setWorkflowData] = useState({});
  
  const workflowSteps = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Incident overview and classification',
      required: true,
      completed: false
    },
    {
      id: 'details',
      title: 'Incident Details',
      description: 'Detailed description and circumstances',
      required: true,
      completed: false
    },
    {
      id: 'investigation',
      title: 'Investigation',
      description: 'Root cause analysis and findings',
      required: false,
      completed: false
    },
    {
      id: 'actions',
      title: 'Actions & Response',
      description: 'Corrective and preventive actions',
      required: true,
      completed: false
    },
    {
      id: 'review',
      title: 'Review & Approval',
      description: 'Management review and approval',
      required: true,
      completed: false
    }
  ];

  const handleStepChange = (step) => {
    // Validate current step before allowing navigation
    if (validateCurrentStep()) {
      setCurrentStep(step);
      updateWorkflowProgress(step);
    }
  };

  const handleWorkflowComplete = (incident) => {
    // Trigger final approvals and notifications
    notifyStakeholders(incident);
    submitToRegulatoryAuthorities(incident);
    generateComplianceReport(incident);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Progress Indicator */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Incident Report Progress</h3>
          <span className="text-sm text-gray-600">Step {currentStep} of {workflowSteps.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep > index + 1 ? 'bg-green-500 text-white' : 
                  currentStep === index + 1 ? 'bg-blue-500 text-white' : 
                  'bg-gray-200 text-gray-600'}
              `}>
                {currentStep > index + 1 ? '✓' : index + 1}
              </div>
              {index < workflowSteps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <IncidentReportForm
        incident={workflowData}
        onSave={handleSave}
        onCancel={handleCancel}
        
        // Workflow management
        currentStep={currentStep}
        totalSteps={workflowSteps.length}
        onStepChange={handleStepChange}
        workflowSteps={workflowSteps}
        enableWorkflow={true}
        onWorkflowComplete={handleWorkflowComplete}
        
        // Step-specific required fields
        requiredFieldsPerStep={{
          1: ['title', 'incidentType', 'severity', 'dateTime', 'location'],
          2: ['description', 'reportedBy'],
          4: ['immediateActions'],
          5: ['finalReview']
        }}
      />
    </div>
  );
}
```

### Auto-save and Draft Management

```tsx
function AutoSaveIncidentForm() {
  const [draftId, setDraftId] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleAutoSave = async (incidentData) => {
    try {
      const savedDraft = await saveDraftToStorage(draftId, incidentData);
      setDraftId(savedDraft.id);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      showNotification('Draft saved automatically', 'success');
    } catch (error) {
      console.error('Auto-save failed:', error);
      showNotification('Auto-save failed. Please save manually.', 'warning');
    }
  };

  const handleDraftSave = (draftId, incidentData) => {
    return saveDraftToLocalStorage(draftId, incidentData);
  };

  const handleDraftLoad = (draftId) => {
    return loadDraftFromLocalStorage(draftId);
  };

  return (
    <div className="space-y-4">
      {/* Auto-save Status */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            hasUnsavedChanges ? 'bg-yellow-500' : 'bg-green-500'
          }`} />
          <span className="text-sm text-gray-600">
            {hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
          </span>
        </div>
        {lastSaved && (
          <span className="text-xs text-gray-500">
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>

      <IncidentReportForm
        incident={incidentData}
        onSave={handleSave}
        onCancel={handleCancel}
        
        // Auto-save and persistence
        autoSave={true}
        autoSaveInterval={30000} // 30 seconds
        onAutoSave={handleAutoSave}
        draftId={draftId}
        onDraftSave={handleDraftSave}
        onDraftLoad={handleDraftLoad}
        enableDrafts={true}
      />
    </div>
  );
}
```

### File Attachments and Evidence Collection

```tsx
function EvidenceCollectionForm() {
  const [attachments, setAttachments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleAttachmentUpload = async (files) => {
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      const uploadId = `upload-${Date.now()}-${Math.random()}`;
      
      try {
        setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }));
        
        // Simulate upload with progress
        const attachment = await uploadFileWithProgress(file, (progress) => {
          setUploadProgress(prev => ({ ...prev, [uploadId]: progress }));
        });
        
        setAttachments(prev => [...prev, {
          id: attachment.id,
          name: file.name,
          type: file.type,
          size: file.size,
          url: attachment.url,
          uploadedBy: currentUser.name,
          uploadedAt: new Date(),
          thumbnail: attachment.thumbnail
        }]);
        
        setUploadProgress(prev => {
          const { [uploadId]: removed, ...rest } = prev;
          return rest;
        });
        
      } catch (error) {
        console.error('Upload failed:', error);
        showNotification(`Failed to upload ${file.name}`, 'error');
      }
    }
  };

  const handleAttachmentDelete = (attachmentId) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
    deleteFileFromStorage(attachmentId);
  };

  const handleAttachmentView = (attachmentId) => {
    const attachment = attachments.find(att => att.id === attachmentId);
    if (attachment) {
      window.open(attachment.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Attachment Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Evidence Collection</h3>
        <p className="text-sm text-blue-800">
          Attach photos, documents, and other evidence related to this incident. 
          Supported formats: Images, PDFs, videos (max 10MB each).
        </p>
        {attachments.length > 0 && (
          <div className="mt-3">
            <span className="text-sm font-medium text-blue-800">
              {attachments.length} file{attachments.length !== 1 ? 's' : ''} attached
            </span>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([uploadId, progress]) => (
            <div key={uploadId} className="bg-white border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <IncidentReportForm
        incident={incidentData}
        onSave={handleSave}
        onCancel={handleCancel}
        
        // File attachments and evidence
        attachments={attachments}
        onAttachmentUpload={handleAttachmentUpload}
        onAttachmentDelete={handleAttachmentDelete}
        onAttachmentView={handleAttachmentView}
        maxAttachments={20}
        maxFileSize={10 * 1024 * 1024} // 10MB
        allowedFileTypes={['image/*', 'application/pdf', 'video/*', '.doc', '.docx']}
      />
    </div>
  );
}
```

### Collaboration and Review System

```tsx
function CollaborativeIncidentForm() {
  const [comments, setComments] = useState([]);
  const [reviewers, setReviewers] = useState([
    {
      id: 'safety-manager',
      name: 'Sarah Johnson',
      role: 'Safety Manager',
      status: 'pending',
      comments: ''
    },
    {
      id: 'chief-engineer',
      name: 'Mike Chen',
      role: 'Chief Engineer',
      status: 'pending',
      comments: ''
    }
  ]);

  const handleCommentAdd = (comment) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author: currentUser.name,
      content: comment,
      timestamp: new Date(),
      type: 'comment'
    };
    
    setComments(prev => [...prev, newComment]);
    
    // Notify mentioned users
    const mentions = extractMentions(comment);
    if (mentions.length > 0) {
      notifyMentionedUsers(mentions, newComment);
    }
  };

  const handleReviewSubmit = (status, comments) => {
    const review = {
      reviewerId: currentUser.id,
      status,
      comments,
      timestamp: new Date()
    };
    
    setReviewers(prev => prev.map(reviewer => 
      reviewer.id === currentUser.id 
        ? { ...reviewer, status, comments }
        : reviewer
    ));
    
    // Add review as a comment
    const reviewComment = {
      id: `review-${Date.now()}`,
      author: currentUser.name,
      content: `${status === 'approved' ? 'Approved' : 'Rejected'}: ${comments}`,
      timestamp: new Date(),
      type: 'review'
    };
    
    setComments(prev => [...prev, reviewComment]);
    
    // Check if all required approvals are received
    const approvedCount = reviewers.filter(r => r.status === 'approved').length;
    if (approvedCount >= minRequiredApprovals) {
      triggerFinalApproval();
    }
  };

  return (
    <div className="space-y-6">
      {/* Review Status */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Review & Approval Status</h3>
        <div className="space-y-3">
          {reviewers.map(reviewer => (
            <div key={reviewer.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{reviewer.name}</div>
                <div className="text-sm text-gray-600">{reviewer.role}</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  reviewer.status === 'approved' ? 'bg-green-100 text-green-800' :
                  reviewer.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {reviewer.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Comments & Discussion</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {comments.map(comment => (
            <div key={comment.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-500">
                    {comment.timestamp.toLocaleString()}
                  </span>
                  {comment.type === 'review' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      Review
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <IncidentReportForm
        incident={incidentData}
        onSave={handleSave}
        onCancel={handleCancel}
        
        // Collaboration features
        comments={comments}
        onCommentAdd={handleCommentAdd}
        onCommentEdit={(commentId, content) => updateComment(commentId, content)}
        onCommentDelete={(commentId) => deleteComment(commentId)}
        enableComments={true}
        enableMentions={true}
        
        // Review and approval workflow
        reviewers={reviewers}
        onReviewerAdd={(reviewerId) => addReviewer(reviewerId)}
        onReviewerRemove={(reviewerId) => removeReviewer(reviewerId)}
        onReviewSubmit={handleReviewSubmit}
        requireReview={true}
        minRequiredApprovals={2}
      />
    </div>
  );
}
```

### Dynamic Field Configuration and Templates

```tsx
function CustomizableIncidentForm() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customFields, setCustomFields] = useState([]);

  const incidentTemplates = [
    {
      id: 'personal-injury',
      name: 'Personal Injury Template',
      description: 'For incidents involving crew member injuries',
      data: {
        incidentType: 'Personal Injury',
        severity: 'high',
        customFields: {
          injuredPersonName: '',
          injuryType: '',
          bodyPartAffected: '',
          medicalTreatment: '',
          timeOffWork: ''
        }
      }
    },
    {
      id: 'environmental',
      name: 'Environmental Incident Template',
      description: 'For pollution or environmental incidents',
      data: {
        incidentType: 'Environmental Incident',
        severity: 'critical',
        customFields: {
          pollutantType: '',
          quantityReleased: '',
          environmentalImpact: '',
          containmentActions: '',
          authorityNotification: true
        }
      }
    },
    {
      id: 'equipment-failure',
      name: 'Equipment Failure Template',
      description: 'For machinery and equipment failures',
      data: {
        incidentType: 'Equipment Failure',
        severity: 'medium',
        customFields: {
          equipmentType: '',
          failureMode: '',
          downtime: '',
          repairCost: '',
          spareParts: ''
        }
      }
    }
  ];

  const customFieldDefinitions = [
    {
      id: 'injuredPersonName',
      type: 'text',
      label: 'Injured Person Name',
      required: true,
      validation: (value) => value ? null : 'Name is required'
    },
    {
      id: 'injuryType',
      type: 'select',
      label: 'Type of Injury',
      required: true,
      options: ['Cut/Laceration', 'Bruise', 'Burn', 'Fracture', 'Sprain', 'Other']
    },
    {
      id: 'pollutantType',
      type: 'select',
      label: 'Pollutant Type',
      required: true,
      options: ['Oil', 'Chemical', 'Sewage', 'Garbage', 'Other']
    },
    {
      id: 'quantityReleased',
      type: 'text',
      label: 'Quantity Released',
      required: true,
      validation: (value) => {
        if (!value) return 'Quantity is required';
        if (isNaN(Number(value))) return 'Must be a valid number';
        return null;
      }
    }
  ];

  const handleTemplateSelect = (templateId) => {
    const template = incidentTemplates.find(t => t.id === templateId);
    setSelectedTemplate(template);
    
    // Load template data and custom fields
    if (template) {
      setIncidentData(template.data);
      setCustomFields(Object.keys(template.data.customFields || {}));
    }
  };

  const handleTemplateSave = (name, incidentData) => {
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name,
      description: 'Custom template',
      data: incidentData
    };
    
    saveCustomTemplate(newTemplate);
    showNotification('Template saved successfully', 'success');
  };

  const fieldVisibilityRules = {
    injuredPersonName: (incident) => incident.incidentType === 'Personal Injury',
    medicalTreatment: (incident) => incident.incidentType === 'Personal Injury',
    pollutantType: (incident) => incident.incidentType === 'Environmental Incident',
    quantityReleased: (incident) => incident.incidentType === 'Environmental Incident'
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Incident Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incidentTemplates.map(template => (
            <div 
              key={template.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedTemplate?.id === template.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      <IncidentReportForm
        incident={incidentData}
        onSave={handleSave}
        onCancel={handleCancel}
        
        // Dynamic field configuration
        customFields={customFieldDefinitions.filter(field => 
          customFields.includes(field.id)
        )}
        onCustomFieldChange={(fieldId, value) => {
          setIncidentData(prev => ({
            ...prev,
            customFields: { ...prev.customFields, [fieldId]: value }
          }));
        }}
        fieldVisibilityRules={fieldVisibilityRules}
        
        // Templates and pre-filling
        templates={incidentTemplates}
        onTemplateSelect={handleTemplateSelect}
        onTemplateSave={handleTemplateSave}
        enableTemplates={true}
      />
    </div>
  );
}
```

### Maritime Authority Notification and Emergency Response

```tsx
function EmergencyResponseIncidentForm() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [complianceIssues, setComplianceIssues] = useState([]);
  const [authorityNotifications, setAuthorityNotifications] = useState([]);

  const complianceChecks = [
    {
      regulation: 'SOLAS Chapter IX',
      check: (incident) => incident.severity === 'critical' && incident.incidentType === 'Fire/Explosion',
      message: 'Critical fire incidents require immediate flag state notification'
    },
    {
      regulation: 'MARPOL Annex I',
      check: (incident) => incident.incidentType === 'Environmental Incident',
      message: 'Environmental incidents require port state and coastal authority notification'
    },
    {
      regulation: 'MLC 2006',
      check: (incident) => incident.incidentType === 'Personal Injury' && incident.severity === 'critical',
      message: 'Serious crew injuries require flag state and next port notification'
    }
  ];

  const handleEmergencyProtocolTrigger = (incident) => {
    setEmergencyMode(true);
    
    // Trigger emergency protocols
    const emergencyActions = [
      'Notify bridge team immediately',
      'Activate emergency response team',
      'Prepare for potential evacuation',
      'Contact nearest coast guard',
      'Notify company emergency hotline'
    ];
    
    // Auto-populate immediate actions
    setIncidentData(prev => ({
      ...prev,
      immediateActions: emergencyActions.join('\n'),
      emergencyProtocolActivated: true,
      emergencyActivatedAt: new Date()
    }));
    
    // Send immediate notifications
    notifyEmergencyContacts(incident);
    
    showNotification('Emergency protocols activated', 'error');
  };

  const handleAuthorityNotify = (incident, authorities) => {
    const notifications = authorities.map(authority => ({
      id: `notification-${Date.now()}-${authority}`,
      authority,
      incident: incident.id,
      notifiedAt: new Date(),
      status: 'sent',
      confirmationNumber: generateConfirmationNumber()
    }));
    
    setAuthorityNotifications(prev => [...prev, ...notifications]);
    
    // Send actual notifications (API call)
    sendAuthorityNotifications(incident, authorities);
    
    showNotification(`Notifications sent to ${authorities.length} authorities`, 'success');
  };

  const checkCompliance = (incident) => {
    const issues = complianceChecks
      .filter(check => check.check(incident))
      .map(check => ({
        regulation: check.regulation,
        message: check.message,
        severity: 'warning'
      }));
    
    setComplianceIssues(issues);
    return issues;
  };

  return (
    <div className="space-y-6">
      {/* Emergency Mode Indicator */}
      {emergencyMode && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-bold text-red-900">EMERGENCY MODE ACTIVATED</h3>
              <p className="text-red-800">Emergency response protocols are in effect. All notifications have been sent to emergency contacts.</p>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Issues */}
      {complianceIssues.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-3">Regulatory Compliance Requirements</h3>
          <div className="space-y-2">
            {complianceIssues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800">{issue.regulation}</div>
                  <div className="text-sm text-yellow-700">{issue.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Authority Notifications */}
      {authorityNotifications.length > 0 && (
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">Authority Notifications Sent</h3>
          <div className="space-y-2">
            {authorityNotifications.map(notification => (
              <div key={notification.id} className="flex items-center justify-between p-2 bg-white rounded border">
                <div>
                  <div className="font-medium">{notification.authority}</div>
                  <div className="text-sm text-gray-600">
                    Sent: {notification.notifiedAt.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm">
                  Ref: {notification.confirmationNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <IncidentReportForm
        incident={incidentData}
        onSave={handleSave}
        onCancel={handleCancel}
        
        // Maritime-specific enhancements
        emergencyMode={emergencyMode}
        onEmergencyProtocolTrigger={handleEmergencyProtocolTrigger}
        complianceChecks={complianceChecks}
        maritimeAuthorityNotification={true}
        onAuthorityNotify={handleAuthorityNotify}
        
        // Validation with compliance checking
        customValidation={(incident) => {
          const issues = checkCompliance(incident);
          return issues.reduce((acc, issue) => {
            acc[`compliance_${issue.regulation}`] = issue.message;
            return acc;
          }, {});
        }}
      />
    </div>
  );
}
```

## Enhanced Performance Considerations

- **Form State Management**: Optimized state updates with smart batching for complex forms
- **Validation**: Asynchronous validation with debouncing to prevent performance impact
- **File Handling**: Progressive upload with chunking for large files and evidence collection
- **Auto-save**: Intelligent auto-save with conflict resolution and offline support
- **Workflow Management**: Efficient step navigation with preloading and smart caching
- **Collaboration**: Real-time synchronization with optimistic updates for seamless teamwork

## Enhanced Accessibility Features

- **Form Navigation**: Intuitive step-by-step progression with keyboard shortcuts
- **Screen Reader Support**: Comprehensive ARIA labels and live regions for dynamic content
- **Keyboard Navigation**: Full keyboard accessibility with customizable shortcuts
- **Error Handling**: Clear validation messages with suggestions and guided correction
- **Voice Commands**: Optional voice input for hands-free operation in emergency situations
- **High Contrast**: Maritime-optimized color schemes for various lighting conditions

## Enterprise Patterns

```tsx
// Workflow-enabled form with auto-save
<IncidentReportForm
  enableWorkflow={true}
  currentStep={2}
  workflowSteps={customWorkflowSteps}
  autoSave={true}
  autoSaveInterval={30000}
  onWorkflowComplete={handleWorkflowComplete}
/>

// Collaborative form with review system
<IncidentReportForm
  enableComments={true}
  enableMentions={true}
  reviewers={assignedReviewers}
  requireReview={true}
  minRequiredApprovals={2}
  onReviewSubmit={handleReviewSubmit}
/>

// Template-based form with custom fields
<IncidentReportForm
  templates={incidentTemplates}
  enableTemplates={true}
  customFields={dynamicFields}
  fieldVisibilityRules={visibilityRules}
  onTemplateSelect={handleTemplateSelect}
/>

// Emergency response form
<IncidentReportForm
  emergencyMode={true}
  complianceChecks={maritimeComplianceChecks}
  maritimeAuthorityNotification={true}
  onEmergencyProtocolTrigger={handleEmergencyResponse}
  onAuthorityNotify={handleAuthorityNotification}
/>

// Evidence collection form
<IncidentReportForm
  attachments={evidenceFiles}
  maxAttachments={20}
  maxFileSize={10485760}
  allowedFileTypes={['image/*', 'application/pdf', 'video/*']}
  onAttachmentUpload={handleEvidenceUpload}
/>
```

## Enhanced Integration with Maritime Systems

The enhanced IncidentReportForm component provides comprehensive integration with:

### Safety Management Systems
- **ISM Code Compliance**: Automated documentation aligned with ISM Code requirements
- **TMSA Integration**: Seamless integration with TMSA assessment and improvement processes
- **Safety Culture**: Incident reporting that promotes transparent safety culture
- **Trend Analysis**: Data collection optimized for safety trend identification and analysis

### Emergency Response Systems
- **Emergency Protocols**: Automated triggering of emergency response procedures
- **Communication Systems**: Integration with vessel communication and alert systems
- **Evacuation Procedures**: Support for emergency evacuation documentation and tracking
- **Search and Rescue**: Integration with SAR coordination and reporting systems

### Regulatory Compliance
- **Authority Notification**: Automated notifications to maritime authorities and regulators
- **Flag State Reporting**: Streamlined reporting to flag state administrations
- **Port State Control**: Documentation aligned with PSC inspection requirements
- **Environmental Compliance**: MARPOL and environmental regulation compliance tracking

### Fleet Management Integration
- **Vessel Systems**: Integration with vessel management and operational systems
- **Crew Management**: Connection to crew training and certification tracking
- **Maintenance Systems**: Link incident reports to planned maintenance and inspections
- **Performance Analytics**: Integration with fleet performance and efficiency monitoring

### Advanced Analytics and Intelligence
- **Predictive Analytics**: Machine learning integration for incident prediction and prevention
- **Root Cause Analysis**: AI-powered analysis for systematic root cause identification
- **Risk Assessment**: Automated risk scoring and mitigation recommendation systems
- **Benchmarking**: Industry-wide incident benchmarking and best practice identification

Use this enhanced component to ensure comprehensive incident documentation, maintain regulatory compliance, and drive continuous improvement in maritime safety management while supporting emergency response and collaborative investigation processes.