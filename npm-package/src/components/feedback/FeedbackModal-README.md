# FeedbackModal Component

Comprehensive feedback collection interface with **90+ enhanced props** for maritime applications, featuring templates, media attachments, smart routing, and compliance integration.

## Quick Reference

### Basic Usage

```tsx
import { FeedbackModal } from 'scomp-ui/sail-ui-kit';

<FeedbackModal
  isOpen={isModalOpen}
  onClose={handleClose}
  onSubmit={handleSubmit}
  title="Send Feedback"
/>;
```

### Enterprise Configuration

```tsx
<FeedbackModal
  // Template system
  templates={feedbackTemplates}
  enableQuickTemplates={true}
  onTemplateSelect={handleTemplateSelect}
  // Advanced media support
  allowAttachments={true}
  enableVoiceRecording={true}
  enableScreenshot={true}
  maxAttachments={10}
  // Smart routing
  enableRouting={true}
  routingRules={smartRules}
  availableAssignees={teamMembers}
  // Batch/survey mode
  enableBatchMode={true}
  surveyMode={true}
  batchQuestions={surveyQuestions}
  // Maritime context
  vesselContext={currentVessel}
  operationalContext={currentOperation}
  complianceFeedback={true}
/>
```

## Key Features

### 📝 Template System

- Pre-configured feedback templates for common scenarios
- Quick template selection with recent templates tracking
- Maritime-specific template categories
- Custom template creation and management

### 🎥 Advanced Media Support

- File attachments with drag-and-drop interface
- Voice recording capabilities with audio controls
- Screenshot capture functionality
- Multi-media preview and management

### 🎯 Smart Routing

- Automatic assignment based on category and priority
- Expertise-based routing with team matching
- Escalation rules and department routing
- Manual assignment override capabilities

### 📊 Batch & Survey Mode

- Multi-question survey functionality
- Batch feedback collection workflows
- Progress tracking and completion analytics
- Response validation and quality checks

## Core Props

| Prop                   | Type                               | Default           | Description              |
| ---------------------- | ---------------------------------- | ----------------- | ------------------------ |
| `isOpen`               | `boolean`                          | -                 | Modal visibility state   |
| `onClose`              | `() => void`                       | -                 | Close modal callback     |
| `onSubmit`             | `(feedback: FeedbackData) => void` | -                 | Submit feedback callback |
| `title`                | `string`                           | `"Send Feedback"` | Modal title text         |
| `allowAttachments`     | `boolean`                          | `false`           | Enable file attachments  |
| `enableVoiceRecording` | `boolean`                          | `false`           | Enable voice recording   |
| `enableRouting`        | `boolean`                          | `false`           | Enable smart routing     |

## Enhanced Props (90+ Total)

### Template Management

- `templates`: Pre-configured feedback template definitions
- `enableQuickTemplates`: Quick template access functionality
- `onTemplateSelect`: Template selection event handlers
- `recentTemplates`: Recently used template tracking

### File and Media

- `allowAttachments`: File upload capabilities
- `maxAttachments`: Upload limit configuration
- `allowedFileTypes`: File type restrictions
- `enableVoiceRecording`: Voice capture functionality
- `enableScreenshot`: Screen capture capabilities

### Routing and Assignment

- `enableRouting`: Smart routing activation
- `routingRules`: Automatic routing rule definitions
- `availableAssignees`: Team member assignment options
- `onAutoRoute`: Automatic routing event handlers

### Survey and Batch Mode

- `enableBatchMode`: Batch feedback collection
- `batchQuestions`: Multi-question survey definitions
- `surveyMode`: Survey-specific interface mode
- `onBatchSubmit`: Batch submission handlers

[📖 **View Complete Documentation with All Props**](../../../../guides/FeedbackModal.md)

## Maritime Integration

### Vessel Context

```tsx
<FeedbackModal
  vesselContext={{
    vesselId: 'MV-001',
    vesselName: 'MV Container Express',
    voyage: 'VOY-2024-001',
    port: 'Singapore',
  }}
  operationalContext={{
    watchKeeper: 'Second Officer',
    operationType: 'Port Approach',
    weatherConditions: 'Fair weather',
  }}
/>
```

### Compliance Integration

```tsx
<FeedbackModal
  complianceFeedback={true}
  regulatoryReporting={true}
  customFields={[
    {
      id: 'regulatory_reference',
      type: 'text',
      label: 'Regulatory Reference',
      required: true,
    },
  ]}
/>
```

### Emergency Feedback

```tsx
<FeedbackModal
  templates={[
    {
      id: 'safety-emergency',
      name: 'Safety Emergency',
      data: {
        type: 'safety',
        priority: 'critical',
        complianceFeedback: true,
        regulatoryReporting: true,
      },
    },
  ]}
  enableRouting={true}
  routingRules={{
    'safety-critical': {
      assignTo: 'safety-officer',
      department: 'Safety Management',
    },
  }}
/>
```

## Advanced Features

### Template System

```tsx
const feedbackTemplates = [
  {
    id: 'bug-navigation',
    name: 'Navigation System Bug',
    description: 'Report navigation system issues',
    icon: <Navigation className="h-5 w-5" />,
    data: {
      type: 'bug',
      category: 'navigation',
      priority: 'high',
    },
  },
  {
    id: 'safety-concern',
    name: 'Safety Report',
    description: 'Report safety concerns',
    data: {
      type: 'safety',
      priority: 'critical',
      complianceFeedback: true,
    },
  },
];

<FeedbackModal
  templates={feedbackTemplates}
  enableQuickTemplates={true}
  onTemplateSelect={handleTemplateSelection}
/>;
```

### Smart Routing

```tsx
<FeedbackModal
  enableRouting={true}
  routingRules={{
    'navigation-critical': {
      category: 'navigation',
      priority: 'critical',
      assignTo: 'navigation-team',
      department: 'Bridge Operations',
    },
  }}
  availableAssignees={[
    {
      id: 'navigation-team',
      name: 'Navigation Team',
      department: 'Bridge Operations',
      expertise: ['navigation', 'radar', 'gps'],
    },
  ]}
/>
```

### Batch Survey Mode

```tsx
<FeedbackModal
  enableBatchMode={true}
  surveyMode={true}
  batchQuestions={[
    {
      id: 'satisfaction',
      question: 'How satisfied are you with system performance?',
      type: 'rating',
      required: true,
    },
    {
      id: 'improvements',
      question: 'What improvements would you suggest?',
      type: 'text',
      required: false,
    },
  ]}
  onBatchSubmit={handleSurveySubmission}
/>
```

## Installation

```bash
npm install scomp-ui/sail-ui-kit
```

## TypeScript Support

Full TypeScript definitions included:

```tsx
import { FeedbackModal, FeedbackData, FeedbackTemplate, RoutingRule } from 'scomp-ui/sail-ui-kit';

const feedbackData: FeedbackData = {
  type: 'bug',
  category: 'navigation',
  title: 'GPS System Error',
  description: 'GPS showing incorrect position',
  priority: 'high',
};
```

## Examples

- [Basic Feedback Modal](../../../../guides/FeedbackModal.md#basic-usage)
- [Template System](../../../../guides/FeedbackModal.md#template-system-and-quick-access)
- [Media Attachments](../../../../guides/FeedbackModal.md#advanced-file-attachments-and-media)
- [Smart Routing](../../../../guides/FeedbackModal.md#smart-routing-and-assignment)
- [Survey Mode](../../../../guides/FeedbackModal.md#batch-mode-and-survey-functionality)

## Support

- [Complete Documentation](../../../../guides/FeedbackModal.md)
- [API Reference](../../../../guides/FeedbackModal.md#enhanced-component-interface)
- [Integration Examples](../../../../guides/FeedbackModal.md#enterprise-feature-examples)
