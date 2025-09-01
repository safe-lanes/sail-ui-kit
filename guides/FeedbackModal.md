# FeedbackModal Component Guide

## Overview
The FeedbackModal component provides a comprehensive feedback collection interface for maritime applications. It enables users to submit feedback, report issues, and request improvements with TMSA-compliant styling optimized for maritime user experience and operational feedback collection.

## Component Interface

```typescript
interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
  feedbackType?: 'general' | 'bug-report' | 'feature-request' | 'safety-concern';
  preFilledData?: Partial<FeedbackData>;
  allowAttachments?: boolean;
  showRating?: boolean;
  showCategory?: boolean;
  customFields?: CustomField[];
  className?: string;
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

## Key Features
- **Maritime-Specific Categories**: Specialized feedback categories for maritime operations
- **Multi-Type Support**: Bug reports, feature requests, safety concerns, and general feedback
- **File Attachments**: Screenshot and document upload capabilities
- **User Context**: Automatic capture of technical and operational context
- **Priority Classification**: Intelligent feedback prioritization system

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

## Performance Considerations

- **File Upload Optimization**: Efficient handling of multiple file attachments
- **Form Validation**: Real-time validation without performance impact
- **Modal Performance**: Optimized rendering and state management
- **Data Compression**: Automatic compression of large text submissions

## Accessibility Features

- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility for all form elements
- **Focus Management**: Proper focus trapping within the modal
- **High Contrast**: WCAG compliant color schemes for form elements

## Common Patterns

```tsx
// Basic feedback modal
<FeedbackModal
  isOpen={isOpen}
  onClose={handleClose}
  onSubmit={handleSubmit}
/>

// Bug report specific
<FeedbackModal
  isOpen={isOpen}
  feedbackType="bug-report"
  allowAttachments={true}
  onSubmit={handleBugReport}
/>

// Pre-filled feedback
<FeedbackModal
  isOpen={isOpen}
  preFilledData={{
    type: 'safety-concern',
    category: 'System Safety',
    priority: 'high'
  }}
  onSubmit={handleSubmit}
/>
```

## Integration with Maritime Systems

The FeedbackModal component integrates seamlessly with:
- **Quality Management**: Continuous improvement and feedback loops
- **Issue Tracking**: Bug reports and feature request management
- **Safety Management**: Safety concern reporting and investigation
- **Training Systems**: User experience feedback for training improvements
- **Support Systems**: Direct integration with help desk and support workflows

Use this component to collect valuable user feedback that drives continuous improvement in maritime operations and system usability.