import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Star, Send } from 'lucide-react';

export interface FeedbackData {
  type: 'bug' | 'feature' | 'improvement' | 'compliment' | 'question';
  category: 'ui' | 'performance' | 'functionality' | 'data' | 'other';
  priority: 'low' | 'medium' | 'high';
  rating?: number;
  title: string;
  description: string;
  vessel?: string;
  module?: string;
  userEmail?: string;
}

export interface FeedbackModalProps {
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

  // Template and pre-filling
  feedbackTemplates?: Array<{
    id: string;
    name: string;
    type: string;
    category: string;
    template: Partial<FeedbackData>;
    description?: string;
  }>;
  onTemplateSelect?: (templateId: string) => void;
  enableTemplates?: boolean;
  autoFillFromContext?: boolean;

  // File attachments and screenshots
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
  onAttachmentUpload?: (files: FileList) => void;
  onAttachmentDelete?: (attachmentId: string) => void;
  enableScreenshot?: boolean;
  onScreenshotCapture?: () => Promise<Blob>;
  maxAttachments?: number;
  maxFileSize?: number;
  allowedFileTypes?: string[];

  // Routing and assignment
  routingRules?: Array<{
    type: string;
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
  enableVoiceRecording?: boolean;
  onVoiceRecord?: (audioBlob: Blob) => void;
  maxRecordingDuration?: number;
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

const feedbackTypes = [
  {
    value: 'bug',
    label: 'Bug Report',
    icon: '🐛',
    description: 'Something is not working correctly',
  },
  { value: 'feature', label: 'Feature Request', icon: '✨', description: 'Request a new feature' },
  { value: 'improvement', label: 'Improvement', icon: '📈', description: 'Suggest an enhancement' },
  { value: 'compliment', label: 'Compliment', icon: '👍', description: 'Share positive feedback' },
  { value: 'question', label: 'Question', icon: '❓', description: 'Ask about functionality' },
];

const categories = [
  { value: 'ui', label: 'User Interface' },
  { value: 'performance', label: 'Performance' },
  { value: 'functionality', label: 'Functionality' },
  { value: 'data', label: 'Data & Reports' },
  { value: 'other', label: 'Other' },
];

export function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Send Feedback',
  userEmail,
  currentVessel,
  currentModule,
  allowRating = true,
  className = '',
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState<Partial<FeedbackData>>({
    type: 'improvement',
    category: 'ui',
    priority: 'medium',
    title: '',
    description: '',
    vessel: currentVessel,
    module: currentModule,
    userEmail: userEmail,
    rating: undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.title || !feedback.description || !feedback.type || !feedback.category) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(feedback as FeedbackData);
      onClose();
      // Reset form
      setFeedback({
        type: 'improvement',
        category: 'ui',
        priority: 'medium',
        title: '',
        description: '',
        vessel: currentVessel,
        module: currentModule,
        userEmail: userEmail,
        rating: undefined,
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedType = feedbackTypes.find(t => t.value === feedback.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${className}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription>
            Help us improve by sharing your feedback, reporting issues, or suggesting enhancements.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">What type of feedback is this?</Label>
            <RadioGroup
              value={feedback.type}
              onValueChange={value =>
                setFeedback(prev => ({ ...prev, type: value as FeedbackData['type'] }))
              }
            >
              <div className="grid grid-cols-1 gap-3">
                {feedbackTypes.map(type => (
                  <div key={type.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label
                      htmlFor={type.value}
                      className="flex items-center space-x-3 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                    >
                      <span className="text-lg">{type.icon}</span>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Rating (for compliments) */}
          {allowRating && feedback.type === 'compliment' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">How would you rate your experience?</Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        (feedback.rating || 0) >= star
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                {feedback.rating && (
                  <span className="ml-2 text-sm text-gray-600">
                    {feedback.rating} out of 5 stars
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Category and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select
                value={feedback.category}
                onValueChange={value =>
                  setFeedback(prev => ({ ...prev, category: value as FeedbackData['category'] }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority
              </Label>
              <Select
                value={feedback.priority}
                onValueChange={value =>
                  setFeedback(prev => ({ ...prev, priority: value as FeedbackData['priority'] }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </Label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Brief ${selectedType?.label.toLowerCase()} title...`}
              value={feedback.title}
              onChange={e => setFeedback(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              className="min-h-[100px]"
              placeholder={`Please provide detailed information about your ${feedback.type}...`}
              value={feedback.description}
              onChange={e => setFeedback(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          {/* Context Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vessel" className="text-sm font-medium">
                Vessel (Optional)
              </Label>
              <input
                id="vessel"
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Vessel name"
                value={feedback.vessel || ''}
                onChange={e => setFeedback(prev => ({ ...prev, vessel: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="module" className="text-sm font-medium">
                Module (Optional)
              </Label>
              <input
                id="module"
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="TMSA module"
                value={feedback.module || ''}
                onChange={e => setFeedback(prev => ({ ...prev, module: e.target.value }))}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Feedback Summary:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {selectedType?.icon} {selectedType?.label}
              </Badge>
              <Badge variant="outline">
                {categories.find(c => c.value === feedback.category)?.label}
              </Badge>
              <Badge variant="outline">Priority: {feedback.priority}</Badge>
              {feedback.rating && <Badge variant="outline">⭐ {feedback.rating}/5</Badge>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !feedback.title || !feedback.description}
            >
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
