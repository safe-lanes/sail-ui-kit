# IncidentReportForm Component

Comprehensive incident reporting system with **100+ enhanced props** for maritime compliance, workflow management, and collaborative incident investigation.

## Quick Reference

### Basic Usage
```tsx
import { IncidentReportForm } from 'scomp-ui/sail-ui-kit';

<IncidentReportForm
  incident={incidentData}
  onSave={handleSave}
  onSubmit={handleSubmit}
/>
```

### Enterprise Configuration
```tsx
<IncidentReportForm
  // Workflow management
  enableWorkflow={true}
  workflowSteps={customWorkflow}
  onStepChange={handleWorkflowProgress}
  
  // Collaboration features
  enableComments={true}
  enableApprovals={true}
  onCommentAdd={handleNewComment}
  
  // File attachments
  allowAttachments={true}
  maxAttachments={10}
  onAttachmentUpload={handleFileUpload}
  
  // Auto-save capabilities
  autoSave={true}
  autoSaveInterval={30000}
  onAutoSave={handleDraftSave}
  
  // Maritime compliance
  complianceChecks={maritimeRegulations}
  enableAuthorityNotification={true}
  emergencyEscalation={emergencyProtocols}
/>
```

## Key Features

### 📋 Comprehensive Reporting
- Structured incident data collection
- Maritime-specific incident categories
- Evidence collection and documentation
- Witness statement management

### 🔄 Advanced Workflow
- Multi-step approval processes
- Role-based access controls
- Progress tracking and notifications
- Automated escalation protocols

### 👥 Collaboration Tools
- Real-time commenting system
- Multi-user editing capabilities
- Approval workflows with signatures
- Investigation team coordination

### 💾 Auto-save & Drafts
- Intelligent auto-save functionality
- Draft management and recovery
- Version control and audit trails
- Offline capability support

## Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `incident` | `IncidentData` | - | Incident data object |
| `onSave` | `(data: IncidentData) => void` | - | Save callback function |
| `onSubmit` | `(data: IncidentData) => void` | - | Submit callback function |
| `enableWorkflow` | `boolean` | `false` | Enable workflow management |
| `enableComments` | `boolean` | `false` | Enable commenting system |
| `allowAttachments` | `boolean` | `false` | Allow file attachments |
| `autoSave` | `boolean` | `false` | Enable auto-save functionality |

## Enhanced Props (100+ Total)

### Workflow Management
- `workflowSteps`: Custom workflow step definitions
- `currentStep`: Current workflow position tracking
- `onStepChange`: Workflow progression callbacks
- `enableStepValidation`: Step-by-step validation rules

### Collaboration Features
- `enableComments`: Real-time commenting system
- `comments`: Comment data and threading
- `onCommentAdd`: New comment notification handlers
- `enableApprovals`: Multi-level approval workflows

### File Management
- `allowAttachments`: File upload capabilities
- `maxAttachments`: Upload limit configuration
- `allowedFileTypes`: File type restrictions
- `onAttachmentUpload`: Custom upload handling

### Auto-save Capabilities
- `autoSave`: Intelligent auto-save activation
- `autoSaveInterval`: Save frequency configuration
- `onAutoSave`: Custom draft save handlers
- `enableDraftRecovery`: Draft recovery mechanisms

[📖 **View Complete Documentation with All Props**](../../../../guides/IncidentReportForm.md)

## Maritime Compliance

### Regulatory Integration
```tsx
<IncidentReportForm
  complianceChecks={{
    solas: true,
    marpol: true,
    stcw: true,
    flagState: 'US'
  }}
  enableAuthorityNotification={true}
  regulatoryReporting={true}
/>
```

### Emergency Response
```tsx
<IncidentReportForm
  emergencyEscalation={{
    autoEscalate: true,
    escalationRules: emergencyRules,
    notifyAuthorities: true
  }}
  enableEmergencyMode={true}
/>
```

### Investigation Support
```tsx
<IncidentReportForm
  enableInvestigation={true}
  investigationTools={{
    evidenceCollection: true,
    witnessStatements: true,
    timelineReconstruction: true
  }}
/>
```

## Workflow Examples

### Multi-step Approval Process
```tsx
const workflowSteps = [
  { id: 'report', name: 'Initial Report', required: true },
  { id: 'investigation', name: 'Investigation', required: true },
  { id: 'review', name: 'Management Review', required: true },
  { id: 'approval', name: 'Final Approval', required: false }
];

<IncidentReportForm
  workflowSteps={workflowSteps}
  enableWorkflow={true}
  onStepChange={handleWorkflowProgress}
/>
```

### Collaborative Investigation
```tsx
<IncidentReportForm
  enableComments={true}
  enableApprovals={true}
  investigationTeam={teamMembers}
  onTeamMemberAdd={handleTeamExpansion}
  enableRealTimeUpdates={true}
/>
```

## Installation

```bash
npm install scomp-ui/sail-ui-kit
```

## TypeScript Support

Full TypeScript definitions included:

```tsx
import { 
  IncidentReportForm, 
  IncidentData, 
  WorkflowStep,
  ComplianceConfig 
} from 'scomp-ui/sail-ui-kit';

const incident: IncidentData = {
  id: 'INC-001',
  type: 'safety',
  severity: 'high',
  // ... other properties
};
```

## Examples

- [Basic Incident Reporting](../../../../guides/IncidentReportForm.md#basic-usage)
- [Workflow Management](../../../../guides/IncidentReportForm.md#workflow-management-and-approval-processes)
- [Collaboration Features](../../../../guides/IncidentReportForm.md#collaboration-and-team-management)
- [Maritime Compliance](../../../../guides/IncidentReportForm.md#maritime-compliance-and-regulatory-features)

## Support

- [Complete Documentation](../../../../guides/IncidentReportForm.md)
- [API Reference](../../../../guides/IncidentReportForm.md#enhanced-component-interface)
- [Integration Examples](../../../../guides/IncidentReportForm.md#enterprise-feature-examples)