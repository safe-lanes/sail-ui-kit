# FeedbackModal Component Guide

## Overview
The FeedbackModal component provides a comprehensive feedback collection interface for maritime applications. It enables users to submit feedback, report issues, and request improvements with TMSA-compliant styling optimized for maritime user experience and operational feedback collection.

## Enhanced Component Interface

The FeedbackModal component has been significantly enhanced with **90+ enterprise props** for comprehensive feedback management capabilities:

```typescript
interface FeedbackModalProps {
  // Core functionality
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
  title?: string;
  userEmail?: string;
  currentVessel?: string;
  currentModule?: string;
  allowRating?: boolean;
  className?: string;
  
  // ✨ ENTERPRISE ENHANCEMENTS
  
  // Feedback templates and pre-filling
  templates?: Array<{
    id: string;
    name: string;
    description: string;
    data: Partial<FeedbackData>;
    icon?: React.ReactNode;
  }>;
  onTemplateSelect?: (templateId: string) => void;
  enableQuickTemplates?: boolean;
  recentTemplates?: string[];
  
  // File attachments and media
  allowAttachments?: boolean;
  maxAttachments?: number;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  onAttachmentUpload?: (files: File[]) => Promise<string[]>;
  onAttachmentRemove?: (attachmentId: string) => void;
  enableScreenshot?: boolean;
  onScreenshotCapture?: () => Promise<string>;
  enableVoiceRecording?: boolean;
  onVoiceRecord?: (audioBlob: Blob) => void;
  maxRecordingDuration?: number;
  
  // Advanced categorization and tagging
  customCategories?: Array<{
    id: string;
    label: string;
    description?: string;
    subcategories?: Array<{ id: string; label: string }>;
  }>;
  enableTags?: boolean;
  availableTags?: string[];
  onTagCreate?: (tag: string) => void;
  priorityLevels?: Array<{
    value: string;
    label: string;
    color: string;
    description?: string;
  }>;
  
  // Routing and assignment
  enableRouting?: boolean;
  routingRules?: Record<string, {
    category: string;
    priority: string;
    assignTo: string;
    department: string;
  }>;
  onAutoRoute?: (feedback: FeedbackData) => string;
  availableAssignees?: Array<{
    id: string;
    name: string;
    department: string;
    expertise: string[];
  }>;
  enableManualAssignment?: boolean;
  
  // Follow-up and tracking
  enableFollowUp?: boolean;
  onFollowUpSubscribe?: (feedbackId: string, notify: boolean) => void;
  trackingId?: string;
  onTrackingGenerate?: () => string;
  statusUpdates?: Array<{
    status: string;
    message: string;
    timestamp: Date;
    updatedBy: string;
  }>;
  
  // Validation and quality checks
  validationRules?: Record<string, (value: unknown) => string | null>;
  onValidationError?: (errors: Record<string, string>) => void;
  enableDuplicateCheck?: boolean;
  onDuplicateCheck?: (feedback: FeedbackData) => Promise<string[]>;
  duplicateSuggestions?: string[];
  
  // User preferences and history
  userHistory?: Array<{
    id: string;
    type: string;
    title: string;
    submittedAt: Date;
    status: string;
  }>;
  onHistoryView?: (feedbackId: string) => void;
  enableDrafts?: boolean;
  onDraftSave?: (draft: Partial<FeedbackData>) => void;
  onDraftLoad?: () => Partial<FeedbackData>;
  
  // Custom fields and dynamic forms
  customFields?: Array<{
    id: string;
    type: 'text' | 'select' | 'multiselect' | 'checkbox' | 'date' | 'rating';
    label: string;
    required?: boolean;
    options?: string[];
    dependsOn?: string;
    condition?: (value: unknown) => boolean;
  }>;
  onCustomFieldChange?: (fieldId: string, value: unknown) => void;
  dynamicFormConfig?: Record<string, unknown>;
  
  // Integration and notifications
  onSlackNotify?: (feedback: FeedbackData, channel: string) => void;
  onEmailNotify?: (feedback: FeedbackData, recipients: string[]) => void;
  onJiraTicketCreate?: (feedback: FeedbackData) => Promise<string>;
  integrationSettings?: {
    slack?: { enabled: boolean; defaultChannel: string };
    email?: { enabled: boolean; recipients: string[] };
    jira?: { enabled: boolean; project: string };
  };
  
  // Analytics and metrics
  onAnalyticsEvent?: (event: string, data: Record<string, unknown>) => void;
  trackSubmissionMetrics?: boolean;
  enableSentimentAnalysis?: boolean;
  onSentimentAnalysis?: (text: string) => Promise<{ score: number; sentiment: string }>;
  
  // Batch feedback and surveys
  enableBatchMode?: boolean;
  batchQuestions?: Array<{
    id: string;
    question: string;
    type: 'rating' | 'text' | 'choice';
    required?: boolean;
    options?: string[];
  }>;
  onBatchSubmit?: (responses: Record<string, unknown>) => void;
  surveyMode?: boolean;
  
  // User interface customization
  theme?: 'light' | 'dark' | 'auto';
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  customLogo?: string;
  footerText?: string;
  enableMinimizedMode?: boolean;
  
  // Advanced features
  enableCollaboration?: boolean;
  onCollaboratorAdd?: (email: string) => void;
  collaborators?: string[];
  
  // Feedback lifecycle management
  onStatusChange?: (feedbackId: string, status: string, reason?: string) => void;
  onPriorityChange?: (feedbackId: string, priority: string) => void;
  onCategoryChange?: (feedbackId: string, category: string) => void;
  workflowSteps?: Array<{
    id: string;
    name: string;
    description: string;
    order: number;
  }>;
  
  // Maritime-specific features
  vesselContext?: {
    vesselId: string;
    vesselName: string;
    voyage?: string;
    port?: string;
  };
  operationalContext?: {
    watchKeeper?: string;
    operationType?: string;
    weatherConditions?: string;
    seaState?: string;
  };
  complianceFeedback?: boolean;
  regulatoryReporting?: boolean;
  
  // Error handling and recovery
  onSubmissionError?: (error: Error, feedback: FeedbackData) => void;
  enableRetry?: boolean;
  onRetry?: () => void;
  offlineMode?: boolean;
  onOfflineSubmit?: (feedback: FeedbackData) => void;
  
  // Performance and UX
  enableAutoSave?: boolean;
  autoSaveInterval?: number;
  onAutoSave?: (draft: Partial<FeedbackData>) => void;
  enableTabNavigation?: boolean;
  enableKeyboardShortcuts?: boolean;
  loadingState?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
}

interface FeedbackData {
  type: 'general' | 'bug-report' | 'feature-request' | 'safety-concern';
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  rating?: number; // 1-5 stars
  userInfo: {
    name: string;
    email: string;
    role: string;
    department: string;
    vessel?: string;
  };
  technical: {
    browser?: string;
    device?: string;
    operatingSystem?: string;
    timestamp: string;
    url?: string;
  };
  attachments?: File[];
  followUp: boolean;
  anonymous: boolean;
}
```

## Enhanced Key Features

### Core Maritime Capabilities
- **Maritime-Specific Categories**: Specialized feedback categories with vessel and operational context
- **Multi-Type Support**: Bug reports, feature requests, safety concerns, compliance feedback, and surveys
- **Advanced File Attachments**: Screenshots, documents, voice recordings, and screen captures
- **Contextual Intelligence**: Automatic capture of maritime operational context and vessel information
- **Priority Classification**: Intelligent prioritization with automated routing and escalation

### Enterprise Enhancements
- **Template System**: Pre-configured feedback templates for common scenarios with quick selection
- **Smart Routing**: Automated assignment based on category, priority, and expertise matching
- **Advanced Media Support**: Voice recording, screen capture, and multi-file attachment capabilities
- **Duplicate Detection**: AI-powered duplicate checking with suggestion mechanisms
- **Integration Suite**: Slack, email, JIRA, and custom system integrations for seamless workflow
- **Analytics & Insights**: Sentiment analysis, submission metrics, and comprehensive tracking
- **Batch & Survey Mode**: Multi-question surveys and batch feedback collection capabilities
- **Draft Management**: Auto-save functionality with draft recovery and version tracking
- **Collaboration Features**: Multi-user feedback with collaborator management and shared reviews
- **Lifecycle Management**: Complete feedback tracking from submission to resolution with status updates
- **Custom Fields**: Dynamic form configuration with conditional logic and validation rules
- **Maritime Context**: Vessel-specific information, watch keeping details, and operational context capture
- **Quality Assurance**: Advanced validation, error handling, and submission quality checks

## Basic Usage

```tsx
import { FeedbackModal } from 'scomp-ui/sail-ui-kit';

function FeedbackSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'general' | 'bug-report' | 'feature-request' | 'safety-concern'>('general');

  const handleFeedbackSubmit = (feedbackData: FeedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    // Process feedback submission
    setIsModalOpen(false);
  };

  const handleOpenFeedback = (type: typeof feedbackType) => {
    setFeedbackType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        User Feedback System
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleOpenFeedback('general')}
          className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
        >
          <MessageCircle className="h-6 w-6 mx-auto mb-2 text-[#16569e]" />
          <span className="text-sm font-medium">General Feedback</span>
        </button>

        <button
          onClick={() => handleOpenFeedback('bug-report')}
          className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
        >
          <Bug className="h-6 w-6 mx-auto mb-2 text-red-600" />
          <span className="text-sm font-medium">Report Bug</span>
        </button>

        <button
          onClick={() => handleOpenFeedback('feature-request')}
          className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
        >
          <Lightbulb className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
          <span className="text-sm font-medium">Feature Request</span>
        </button>

        <button
          onClick={() => handleOpenFeedback('safety-concern')}
          className="p-4 border border-red-300 bg-red-50 rounded-lg hover:bg-red-100 text-center"
        >
          <Shield className="h-6 w-6 mx-auto mb-2 text-red-600" />
          <span className="text-sm font-medium">Safety Concern</span>
        </button>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        feedbackType={feedbackType}
        allowAttachments={true}
        showRating={true}
        showCategory={true}
      />
    </div>
  );
}
```

## Comprehensive Feedback Management

```tsx
function ComprehensiveFeedbackManagement() {
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<'general' | 'bug-report' | 'feature-request' | 'safety-concern'>('general');
  const [preFilledData, setPreFilledData] = useState<Partial<FeedbackData> | undefined>();

  const feedbackCategories = {
    'general': [
      'User Interface',
      'Performance',
      'Documentation',
      'Training',
      'Workflow',
      'Other'
    ],
    'bug-report': [
      'Navigation System',
      'Engine Monitoring',
      'Safety Systems',
      'Communication',
      'Data Display',
      'Login/Authentication',
      'Reports/Charts',
      'Mobile Interface'
    ],
    'feature-request': [
      'Dashboard Enhancement',
      'New Report Type',
      'Integration Request',
      'Automation',
      'Mobile Features',
      'Accessibility',
      'Compliance Tools',
      'Training Tools'
    ],
    'safety-concern': [
      'System Safety',
      'Data Accuracy',
      'Emergency Procedures',
      'Equipment Monitoring',
      'Alert Systems',
      'Compliance Issues',
      'Training Gaps',
      'Procedure Violations'
    ]
  };

  const handleFeedbackSubmit = (feedbackData: FeedbackData) => {
    const enhancedFeedback = {
      ...feedbackData,
      id: `FB-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      technical: {
        ...feedbackData.technical,
        browser: navigator.userAgent,
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        operatingSystem: navigator.platform,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
    };

    setFeedbackHistory(prev => [enhancedFeedback, ...prev]);
    setIsModalOpen(false);
    setPreFilledData(undefined);

    // Show success message
    console.log('Feedback submitted successfully:', enhancedFeedback);
  };

  const handleQuickFeedback = (type: typeof selectedFeedbackType, category?: string) => {
    const quickData: Partial<FeedbackData> = {
      type,
      category: category || '',
      userInfo: {
        name: 'Current User', // Would come from auth context
        email: 'user@maritime.com',
        role: 'Navigation Officer',
        department: 'Bridge Operations',
        vessel: 'MV Container Express'
      }
    };

    setPreFilledData(quickData);
    setSelectedFeedbackType(type);
    setIsModalOpen(true);
  };

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case 'bug-report': return <Bug className="h-4 w-4" />;
      case 'feature-request': return <Lightbulb className="h-4 w-4" />;
      case 'safety-concern': return <Shield className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case 'bug-report': return 'text-red-600 bg-red-100';
      case 'feature-request': return 'text-yellow-600 bg-yellow-100';
      case 'safety-concern': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Feedback Management Center
        </h1>
        <p className="text-gray-600">
          Comprehensive feedback collection and management for maritime operations
        </p>
      </div>

      {/* Quick Feedback Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Feedback</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => handleQuickFeedback('general')}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-[#16569e]" />
            <h4 className="font-medium text-gray-900">General Feedback</h4>
            <p className="text-sm text-gray-600 mt-1">Share your thoughts and suggestions</p>
          </button>

          <button
            onClick={() => handleQuickFeedback('bug-report')}
            className="p-4 border border-red-300 bg-red-50 rounded-lg hover:bg-red-100 text-center transition-colors"
          >
            <Bug className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <h4 className="font-medium text-gray-900">Report Bug</h4>
            <p className="text-sm text-gray-600 mt-1">Report technical issues or problems</p>
          </button>

          <button
            onClick={() => handleQuickFeedback('feature-request')}
            className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg hover:bg-yellow-100 text-center transition-colors"
          >
            <Lightbulb className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <h4 className="font-medium text-gray-900">Feature Request</h4>
            <p className="text-sm text-gray-600 mt-1">Suggest new features or improvements</p>
          </button>

          <button
            onClick={() => handleQuickFeedback('safety-concern')}
            className="p-4 border border-red-300 bg-red-50 rounded-lg hover:bg-red-100 text-center transition-colors"
          >
            <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <h4 className="font-medium text-gray-900">Safety Concern</h4>
            <p className="text-sm text-gray-600 mt-1">Report safety-related issues</p>
          </button>
        </div>
      </div>

      {/* Common Feedback Categories */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Categories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Bug Reports</h4>
            <div className="space-y-2">
              {feedbackCategories['bug-report'].slice(0, 4).map((category) => (
                <button
                  key={category}
                  onClick={() => handleQuickFeedback('bug-report', category)}
                  className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Feature Requests</h4>
            <div className="space-y-2">
              {feedbackCategories['feature-request'].slice(0, 4).map((category) => (
                <button
                  key={category}
                  onClick={() => handleQuickFeedback('feature-request', category)}
                  className="w-full text-left px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{feedbackHistory.length}</p>
            </div>
            <MessageCircle className="h-6 w-6 text-[#16569e]" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bug Reports</p>
              <p className="text-2xl font-bold text-red-600">
                {feedbackHistory.filter(f => f.type === 'bug-report').length}
              </p>
            </div>
            <Bug className="h-6 w-6 text-red-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Feature Requests</p>
              <p className="text-2xl font-bold text-yellow-600">
                {feedbackHistory.filter(f => f.type === 'feature-request').length}
              </p>
            </div>
            <Lightbulb className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Safety Concerns</p>
              <p className="text-2xl font-bold text-red-600">
                {feedbackHistory.filter(f => f.type === 'safety-concern').length}
              </p>
            </div>
            <Shield className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
        
        <div className="space-y-4">
          {feedbackHistory.slice(0, 5).map((feedback, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFeedbackTypeColor(feedback.type)}`}>
                      {getFeedbackTypeIcon(feedback.type)}
                      <span className="ml-1 capitalize">{feedback.type.replace('-', ' ')}</span>
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                      {feedback.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{feedback.category}</span>
                  </div>
                  <h4 className="font-medium text-gray-900">{feedback.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{feedback.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>By: {feedback.userInfo.name}</span>
                    <span>•</span>
                    <span>Role: {feedback.userInfo.role}</span>
                    <span>•</span>
                    <span>Vessel: {feedback.userInfo.vessel}</span>
                    <span>•</span>
                    <span>{new Date(feedback.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {feedback.rating && (
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating! 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{feedback.rating}/5 stars</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {feedbackHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No feedback submitted yet</p>
            <p className="text-sm">Click the buttons above to share your feedback</p>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPreFilledData(undefined);
        }}
        onSubmit={handleFeedbackSubmit}
        feedbackType={selectedFeedbackType}
        preFilledData={preFilledData}
        allowAttachments={true}
        showRating={true}
        showCategory={true}
        customFields={[
          {
            id: 'vessel',
            label: 'Vessel Name',
            type: 'text',
            required: false,
            placeholder: 'Enter vessel name if applicable'
          },
          {
            id: 'impact',
            label: 'Impact Level',
            type: 'select',
            required: false,
            options: [
              { value: 'no-impact', label: 'No Impact' },
              { value: 'minor', label: 'Minor Impact' },
              { value: 'moderate', label: 'Moderate Impact' },
              { value: 'significant', label: 'Significant Impact' },
              { value: 'critical', label: 'Critical Impact' }
            ]
          }
        ]}
      />
    </div>
  );
}
```

## Enterprise Feature Examples

### Template System and Quick Access

```tsx
function TemplateEnabledFeedbackModal() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [recentTemplates, setRecentTemplates] = useState(['bug-navigation', 'feature-dashboard']);

  const feedbackTemplates = [
    {
      id: 'bug-navigation',
      name: 'Navigation System Bug',
      description: 'Report issues with navigation systems',
      icon: <Navigation className="h-5 w-5" />,
      data: {
        type: 'bug',
        category: 'navigation',
        priority: 'high',
        title: 'Navigation System Issue',
        vesselContext: {
          vesselId: currentVessel?.id,
          vesselName: currentVessel?.name
        }
      }
    },
    {
      id: 'feature-dashboard',
      name: 'Dashboard Enhancement',
      description: 'Suggest dashboard improvements',
      icon: <BarChart className="h-5 w-5" />,
      data: {
        type: 'feature',
        category: 'ui-ux',
        priority: 'medium',
        title: 'Dashboard Feature Request'
      }
    },
    {
      id: 'safety-concern',
      name: 'Safety Report',
      description: 'Report safety-related concerns',
      icon: <Shield className="h-5 w-5" />,
      data: {
        type: 'safety',
        category: 'safety-system',
        priority: 'critical',
        title: 'Safety Concern Report',
        complianceFeedback: true,
        regulatoryReporting: true
      }
    },
    {
      id: 'compliance-issue',
      name: 'Compliance Issue',
      description: 'Report regulatory compliance concerns',
      icon: <FileCheck className="h-5 w-5" />,
      data: {
        type: 'compliance',
        category: 'regulatory',
        priority: 'high',
        title: 'Compliance Issue',
        complianceFeedback: true
      }
    }
  ];

  const handleTemplateSelect = (templateId) => {
    const template = feedbackTemplates.find(t => t.id === templateId);
    setSelectedTemplate(template);
    
    // Update recent templates
    setRecentTemplates(prev => {
      const updated = [templateId, ...prev.filter(id => id !== templateId)];
      return updated.slice(0, 3); // Keep only 3 most recent
    });
  };

  return (
    <div className="space-y-4">
      {/* Template Selection */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Quick Feedback Templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {feedbackTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {template.icon}
                <span className="font-medium text-sm">{template.name}</span>
              </div>
              <p className="text-xs text-gray-600">{template.description}</p>
            </button>
          ))}
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        
        // Template system
        templates={feedbackTemplates}
        onTemplateSelect={handleTemplateSelect}
        enableQuickTemplates={true}
        recentTemplates={recentTemplates}
      />
    </div>
  );
}
```

### Advanced File Attachments and Media

```tsx
function MediaEnabledFeedbackModal() {
  const [attachments, setAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const handleAttachmentUpload = async (files) => {
    const uploadPromises = files.map(async (file) => {
      // Simulate upload with progress tracking
      const uploadId = `upload-${Date.now()}-${Math.random()}`;
      
      try {
        const uploadedFile = await uploadFileToStorage(file);
        return {
          id: uploadId,
          name: file.name,
          type: file.type,
          size: file.size,
          url: uploadedFile.url,
          uploadedAt: new Date()
        };
      } catch (error) {
        console.error('Upload failed:', error);
        throw error;
      }
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    setAttachments(prev => [...prev, ...uploadedFiles]);
    return uploadedFiles.map(f => f.id);
  };

  const handleScreenshotCapture = async () => {
    try {
      // Capture screenshot using browser API
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: { mediaSource: 'screen' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      return new Promise((resolve) => {
        video.addEventListener('loadedmetadata', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0);
          
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            stream.getTracks().forEach(track => track.stop());
            resolve(url);
          });
        });
      });
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      return null;
    }
  };

  const handleVoiceRecord = async (audioBlob) => {
    try {
      const audioFile = new File([audioBlob], 'voice-feedback.wav', { 
        type: 'audio/wav' 
      });
      
      const uploadedAudio = await uploadFileToStorage(audioFile);
      
      setAttachments(prev => [...prev, {
        id: `audio-${Date.now()}`,
        name: 'Voice Recording',
        type: 'audio/wav',
        size: audioBlob.size,
        url: uploadedAudio.url,
        duration: recordingDuration,
        uploadedAt: new Date()
      }]);
    } catch (error) {
      console.error('Voice recording upload failed:', error);
    }
  };

  const handleAttachmentRemove = (attachmentId) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
    deleteFileFromStorage(attachmentId);
  };

  return (
    <div className="space-y-4">
      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Attached Files ({attachments.length})</h3>
          <div className="space-y-2">
            {attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    {attachment.type.startsWith('image/') ? (
                      <ImageIcon className="h-4 w-4 text-blue-600" />
                    ) : attachment.type.startsWith('audio/') ? (
                      <Mic className="h-4 w-4 text-green-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{attachment.name}</div>
                    <div className="text-xs text-gray-500">
                      {(attachment.size / 1024).toFixed(1)} KB
                      {attachment.duration && ` • ${Math.round(attachment.duration)}s`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAttachmentRemove(attachment.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        
        // File attachments and media
        allowAttachments={true}
        maxAttachments={10}
        maxFileSize={5 * 1024 * 1024} // 5MB
        allowedFileTypes={['image/*', 'application/pdf', 'audio/*', '.doc', '.docx']}
        onAttachmentUpload={handleAttachmentUpload}
        onAttachmentRemove={handleAttachmentRemove}
        enableScreenshot={true}
        onScreenshotCapture={handleScreenshotCapture}
        enableVoiceRecording={true}
        onVoiceRecord={handleVoiceRecord}
        maxRecordingDuration={300} // 5 minutes
      />
    </div>
  );
}
```

### Smart Routing and Assignment

```tsx
function SmartRoutingFeedbackModal() {
  const [routingRules] = useState({
    'navigation-critical': {
      category: 'navigation',
      priority: 'critical',
      assignTo: 'navigation-team',
      department: 'Bridge Operations'
    },
    'safety-high': {
      category: 'safety',
      priority: 'high',
      assignTo: 'safety-officer',
      department: 'Safety Management'
    },
    'engine-urgent': {
      category: 'engine',
      priority: 'urgent',
      assignTo: 'chief-engineer',
      department: 'Engineering'
    }
  });

  const availableAssignees = [
    {
      id: 'navigation-team',
      name: 'Navigation Team',
      department: 'Bridge Operations',
      expertise: ['navigation', 'radar', 'gps', 'charts']
    },
    {
      id: 'safety-officer',
      name: 'Chief Safety Officer',
      department: 'Safety Management',
      expertise: ['safety', 'compliance', 'emergency', 'training']
    },
    {
      id: 'chief-engineer',
      name: 'Chief Engineer',
      department: 'Engineering',
      expertise: ['engine', 'machinery', 'maintenance', 'systems']
    },
    {
      id: 'it-support',
      name: 'IT Support Team',
      department: 'Technical',
      expertise: ['software', 'systems', 'network', 'hardware']
    }
  ];

  const handleAutoRoute = (feedback) => {
    // Smart routing based on category and priority
    const routingKey = `${feedback.category}-${feedback.priority}`;
    const rule = routingRules[routingKey];
    
    if (rule) {
      // Automatic assignment based on rules
      return rule.assignTo;
    } else {
      // Fallback routing based on category expertise
      const assignee = availableAssignees.find(a => 
        a.expertise.includes(feedback.category)
      );
      return assignee?.id || 'it-support'; // Default fallback
    }
  };

  const handleRouteNotification = async (feedback, assigneeId) => {
    const assignee = availableAssignees.find(a => a.id === assigneeId);
    
    // Send notification to assigned team/person
    await sendNotification({
      to: assignee.id,
      subject: `New ${feedback.priority} priority feedback assigned`,
      message: `You have been assigned a new feedback: "${feedback.title}"`,
      priority: feedback.priority,
      category: feedback.category
    });

    // Log routing decision
    console.log(`Feedback routed to ${assignee.name} (${assignee.department})`);
  };

  return (
    <div className="space-y-4">
      {/* Routing Rules Display */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Smart Routing Rules</h3>
        <div className="space-y-2">
          {Object.entries(routingRules).map(([key, rule]) => (
            <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium capitalize">{rule.category}</span> + 
                <span className="font-medium capitalize ml-1">{rule.priority}</span>
              </div>
              <div className="text-sm text-gray-600">
                → {availableAssignees.find(a => a.id === rule.assignTo)?.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Assignees */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Available Teams & Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableAssignees.map(assignee => (
            <div key={assignee.id} className="p-3 border rounded-lg">
              <div className="font-medium">{assignee.name}</div>
              <div className="text-sm text-gray-600">{assignee.department}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {assignee.expertise.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={async (feedback) => {
          const assigneeId = handleAutoRoute(feedback);
          await handleRouteNotification(feedback, assigneeId);
          handleSubmit(feedback);
        }}
        
        // Routing and assignment
        enableRouting={true}
        routingRules={routingRules}
        onAutoRoute={handleAutoRoute}
        availableAssignees={availableAssignees}
        enableManualAssignment={true}
      />
    </div>
  );
}
```

### Batch Mode and Survey Functionality

```tsx
function BatchSurveyFeedbackModal() {
  const [surveyMode, setSurveyMode] = useState(false);
  const [batchResponses, setBatchResponses] = useState({});

  const batchQuestions = [
    {
      id: 'overall_satisfaction',
      question: 'How satisfied are you with the overall system performance?',
      type: 'rating',
      required: true
    },
    {
      id: 'ease_of_use',
      question: 'How would you rate the ease of use?',
      type: 'rating',
      required: true
    },
    {
      id: 'most_useful_feature',
      question: 'Which feature do you find most useful?',
      type: 'choice',
      required: false,
      options: [
        'Dashboard Overview',
        'Navigation Tools',
        'Reporting System',
        'Alert Management',
        'Communication Features'
      ]
    },
    {
      id: 'improvement_suggestions',
      question: 'What improvements would you like to see?',
      type: 'text',
      required: false
    },
    {
      id: 'recommend_system',
      question: 'Would you recommend this system to other vessels?',
      type: 'choice',
      required: true,
      options: ['Definitely', 'Probably', 'Maybe', 'Probably Not', 'Definitely Not']
    }
  ];

  const handleBatchSubmit = async (responses) => {
    setBatchResponses(responses);
    
    // Process survey responses
    const surveyData = {
      id: `survey-${Date.now()}`,
      type: 'user_satisfaction_survey',
      responses,
      submittedAt: new Date(),
      vesselId: currentVessel?.id,
      userId: currentUser?.id
    };

    try {
      await submitSurveyData(surveyData);
      showNotification('Survey submitted successfully!', 'success');
      setSurveyMode(false);
    } catch (error) {
      showNotification('Failed to submit survey', 'error');
    }
  };

  const getSurveyAnalytics = () => {
    // Calculate survey analytics
    const totalQuestions = batchQuestions.length;
    const answeredQuestions = Object.keys(batchResponses).length;
    const completionRate = (answeredQuestions / totalQuestions) * 100;
    
    return {
      totalQuestions,
      answeredQuestions,
      completionRate: Math.round(completionRate)
    };
  };

  return (
    <div className="space-y-6">
      {/* Survey Mode Toggle */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Feedback Collection Mode</h3>
            <p className="text-sm text-gray-600">
              Choose between individual feedback or batch survey collection
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={!surveyMode}
                onChange={() => setSurveyMode(false)}
                className="rounded"
              />
              <span className="text-sm">Individual Feedback</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={surveyMode}
                onChange={() => setSurveyMode(true)}
                className="rounded"
              />
              <span className="text-sm">Survey Mode</span>
            </label>
          </div>
        </div>
      </div>

      {/* Survey Preview */}
      {surveyMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">User Satisfaction Survey</h3>
          <div className="space-y-3">
            {batchQuestions.map((question, index) => (
              <div key={question.id} className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                <div>
                  <div className="font-medium text-sm">{question.question}</div>
                  <div className="text-xs text-blue-700">
                    Type: {question.type} {question.required && '(Required)'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {Object.keys(batchResponses).length > 0 && (
            <div className="mt-4 pt-3 border-t border-blue-200">
              <div className="text-sm text-blue-800">
                Progress: {getSurveyAnalytics().answeredQuestions} of {getSurveyAnalytics().totalQuestions} questions completed 
                ({getSurveyAnalytics().completionRate}%)
              </div>
            </div>
          )}
        </div>
      )}

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={surveyMode ? null : handleSubmit}
        
        // Batch feedback and surveys
        enableBatchMode={surveyMode}
        batchQuestions={batchQuestions}
        onBatchSubmit={handleBatchSubmit}
        surveyMode={surveyMode}
        
        // UI customization for survey mode
        title={surveyMode ? 'User Satisfaction Survey' : 'Send Feedback'}
        submitButtonText={surveyMode ? 'Submit Survey' : 'Send Feedback'}
      />
    </div>
  );
}
```

### Maritime Context and Compliance Features

```tsx
function MaritimeFeedbackModal() {
  const [vesselContext] = useState({
    vesselId: 'MV-001',
    vesselName: 'MV Container Express',
    voyage: 'VOY-2024-001',
    port: 'Port of Singapore'
  });

  const [operationalContext] = useState({
    watchKeeper: 'Second Officer James Wilson',
    operationType: 'Port Approach',
    weatherConditions: 'Fair, 15 knots SW wind',
    seaState: 'Slight (2-3 feet)'
  });

  const [complianceReporting, setComplianceReporting] = useState(false);

  const handleComplianceFeedback = (feedback) => {
    if (feedback.complianceFeedback || feedback.regulatoryReporting) {
      // Trigger regulatory reporting workflow
      initiateRegulatoryReporting(feedback);
      
      // Notify compliance officer
      notifyComplianceOfficer(feedback);
      
      // Create audit trail entry
      createAuditTrailEntry({
        type: 'compliance_feedback',
        feedbackId: feedback.id,
        vesselId: vesselContext.vesselId,
        reportedBy: currentUser.id,
        timestamp: new Date(),
        regulatoryContext: {
          applicableRegulations: determineApplicableRegulations(feedback),
          complianceLevel: assessComplianceLevel(feedback),
          requiredActions: generateRequiredActions(feedback)
        }
      });
    }
  };

  const maritimeCustomFields = [
    {
      id: 'incident_location',
      type: 'select',
      label: 'Incident Location',
      required: false,
      options: ['Bridge', 'Engine Room', 'Deck', 'Cargo Hold', 'Crew Quarters', 'Other']
    },
    {
      id: 'watch_details',
      type: 'text',
      label: 'Watch Details',
      required: false
    },
    {
      id: 'regulatory_reference',
      type: 'text',
      label: 'Regulatory Reference (if applicable)',
      required: false
    },
    {
      id: 'safety_impact',
      type: 'select',
      label: 'Safety Impact Level',
      required: false,
      options: ['None', 'Minor', 'Moderate', 'Significant', 'Critical']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Vessel Context Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-3">Vessel Context</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">Vessel:</span> {vesselContext.vesselName}
          </div>
          <div>
            <span className="font-medium text-blue-800">Voyage:</span> {vesselContext.voyage}
          </div>
          <div>
            <span className="font-medium text-blue-800">Current Port:</span> {vesselContext.port}
          </div>
          <div>
            <span className="font-medium text-blue-800">Watch Keeper:</span> {operationalContext.watchKeeper}
          </div>
        </div>
      </div>

      {/* Operational Context */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-3">Operational Context</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-green-800">Operation Type:</span> {operationalContext.operationType}
          </div>
          <div>
            <span className="font-medium text-green-800">Weather:</span> {operationalContext.weatherConditions}
          </div>
          <div>
            <span className="font-medium text-green-800">Sea State:</span> {operationalContext.seaState}
          </div>
        </div>
      </div>

      {/* Compliance Options */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-3">Compliance & Regulatory</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={complianceReporting}
              onChange={(e) => setComplianceReporting(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">This feedback relates to regulatory compliance</span>
          </label>
          
          {complianceReporting && (
            <div className="pl-6 text-sm text-yellow-800">
              <p>• Automatic notification to compliance officer</p>
              <p>• Regulatory audit trail will be created</p>
              <p>• Required follow-up actions will be generated</p>
            </div>
          )}
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={(feedback) => {
          handleComplianceFeedback(feedback);
          handleSubmit(feedback);
        }}
        
        // Maritime-specific features
        vesselContext={vesselContext}
        operationalContext={operationalContext}
        complianceFeedback={complianceReporting}
        regulatoryReporting={complianceReporting}
        
        // Custom fields for maritime context
        customFields={maritimeCustomFields}
        
        // Enhanced validation for compliance
        validationRules={{
          regulatory_reference: (value) => {
            if (complianceReporting && !value) {
              return 'Regulatory reference is required for compliance feedback';
            }
            return null;
          },
          safety_impact: (value) => {
            if (complianceReporting && !value) {
              return 'Safety impact assessment is required for compliance feedback';
            }
            return null;
          }
        }}
      />
    </div>
  );
}
```

## Enhanced Performance Considerations

- **File Upload Optimization**: Progressive upload with chunking and resume capabilities for large files
- **Form Validation**: Asynchronous validation with debouncing to prevent performance impact
- **Modal Performance**: Lazy loading of components with optimized rendering for complex forms
- **Data Compression**: Intelligent compression of large text submissions and media files
- **Memory Management**: Efficient cleanup of draft data and temporary file references
- **Caching Strategy**: Smart caching of templates, user preferences, and form configurations

## Enhanced Accessibility Features

- **Screen Reader Support**: Comprehensive ARIA labels with live regions for dynamic content updates
- **Keyboard Navigation**: Full keyboard accessibility with customizable shortcuts and focus management
- **Focus Management**: Advanced focus trapping with proper restoration and sequential navigation
- **High Contrast**: Maritime-optimized color schemes with WCAG AAA compliance
- **Voice Control**: Optional voice input for hands-free feedback submission
- **Multi-language**: Internationalization support for global maritime operations

## Enterprise Patterns

```tsx
// Template-enabled feedback with quick access
<FeedbackModal
  templates={feedbackTemplates}
  enableQuickTemplates={true}
  recentTemplates={recentTemplateIds}
  onTemplateSelect={handleTemplateSelection}
/>

// Advanced media support with voice recording
<FeedbackModal
  allowAttachments={true}
  enableScreenshot={true}
  enableVoiceRecording={true}
  maxRecordingDuration={300}
  onAttachmentUpload={handleFileUpload}
  onVoiceRecord={handleVoiceCapture}
/>

// Smart routing with automatic assignment
<FeedbackModal
  enableRouting={true}
  routingRules={smartRoutingRules}
  availableAssignees={teamMembers}
  onAutoRoute={handleAutomaticRouting}
  enableManualAssignment={true}
/>

// Batch survey mode for comprehensive feedback
<FeedbackModal
  enableBatchMode={true}
  batchQuestions={surveyQuestions}
  surveyMode={true}
  onBatchSubmit={handleSurveySubmission}
/>

// Maritime compliance with regulatory reporting
<FeedbackModal
  vesselContext={currentVesselContext}
  operationalContext={currentOperationalState}
  complianceFeedback={true}
  regulatoryReporting={true}
  customFields={maritimeSpecificFields}
/>

// Integration-enabled feedback
<FeedbackModal
  integrationSettings={{
    slack: { enabled: true, defaultChannel: '#feedback' },
    jira: { enabled: true, project: 'MARITIME' },
    email: { enabled: true, recipients: ['support@maritime.com'] }
  }}
  onSlackNotify={handleSlackNotification}
  onJiraTicketCreate={handleJiraIntegration}
/>
```

## Enhanced Integration with Maritime Systems

The enhanced FeedbackModal component provides comprehensive integration with:

### Quality Management Systems
- **Continuous Improvement**: Structured feedback collection aligned with ISO 9001 and maritime quality standards
- **Root Cause Analysis**: Integration with RCA tools and systematic problem-solving methodologies
- **Performance Metrics**: KPI tracking and performance measurement integration for quality objectives
- **Document Control**: Integration with document management systems for procedure improvements

### Issue Tracking and Workflow Management
- **JIRA Integration**: Automatic ticket creation with maritime-specific fields and workflows
- **Service Desk**: Seamless integration with IT service management and support systems
- **Change Management**: Integration with change control processes and approval workflows
- **Resolution Tracking**: Complete lifecycle management from submission to closure

### Safety Management Systems
- **ISM Code Compliance**: Safety concern reporting aligned with International Safety Management requirements
- **Near Miss Reporting**: Integration with safety observation and near miss reporting systems
- **Safety Culture**: Anonymous reporting capabilities to promote open safety culture
- **Regulatory Compliance**: Automatic flagging and routing of regulatory compliance issues

### Training and Competence Management
- **Training Feedback**: Integration with LMS and training effectiveness measurement
- **Competency Assessment**: Feedback integration with competency management systems
- **Knowledge Management**: Capture and sharing of operational knowledge and best practices
- **Performance Improvement**: Individual and team performance feedback integration

### Fleet Management Integration
- **Shore-based Support**: Integration with shore-based technical and operational support
- **Fleet Benchmarking**: Cross-vessel feedback comparison and best practice sharing
- **Resource Optimization**: Feedback-driven resource allocation and optimization
- **Standardization**: Fleet-wide process standardization through centralized feedback management

Use this enhanced component to create a comprehensive feedback ecosystem that drives continuous improvement, ensures regulatory compliance, and enhances maritime operational excellence while supporting crew engagement and system optimization across the entire maritime operation.