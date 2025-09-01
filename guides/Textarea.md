# Textarea Component Guide

## Overview
The Textarea component provides multi-line text input for maritime applications. It enables detailed text entry for incident reports, crew feedback, vessel observations, and operational notes with TMSA-compliant styling optimized for fleet management systems.

## Component Interface

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Auto-resize**: Dynamic height adjustment based on content
- **Character Limits**: Built-in character counting and validation
- **Rich Text Support**: Formatting options for detailed reports
- **Accessibility**: Screen reader support and keyboard navigation

## Basic Usage

```tsx
import { Textarea } from 'scomp-ui/sail-ui-kit';
import { Label } from 'scomp-ui/sail-ui-kit';

function IncidentReportForm() {
  const [description, setDescription] = useState('');
  const [recommendations, setRecommendations] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="incident-description" className="text-sm font-medium text-gray-700">
          Incident Description *
        </Label>
        <Textarea
          id="incident-description"
          placeholder="Provide a detailed description of what happened, including time, location, people involved, and immediate actions taken..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="mt-1 w-full border-gray-300 focus:border-[#16569e] focus:ring-[#16569e]"
          maxLength={2000}
          required
        />
        <div className="mt-1 text-xs text-gray-500">
          {description.length}/2000 characters
        </div>
      </div>

      <div>
        <Label htmlFor="recommendations" className="text-sm font-medium text-gray-700">
          Preventive Recommendations
        </Label>
        <Textarea
          id="recommendations"
          placeholder="Suggest actions to prevent similar incidents in the future..."
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
          rows={4}
          className="mt-1 w-full border-gray-300 focus:border-[#16569e] focus:ring-[#16569e]"
          maxLength={1000}
        />
        <div className="mt-1 text-xs text-gray-500">
          {recommendations.length}/1000 characters
        </div>
      </div>
    </div>
  );
}
```

## Crew Appraisal Comments

```tsx
interface AppraisalComments {
  strengths: string;
  areasForImprovement: string;
  trainingRecommendations: string;
  overallFeedback: string;
  goalsForNextPeriod: string;
}

function CrewAppraisalCommentsForm() {
  const [comments, setComments] = useState<AppraisalComments>({
    strengths: '',
    areasForImprovement: '',
    trainingRecommendations: '',
    overallFeedback: '',
    goalsForNextPeriod: ''
  });

  const handleCommentChange = (field: keyof AppraisalComments, value: string) => {
    setComments(prev => ({ ...prev, [field]: value }));
  };

  const commentSections = [
    {
      key: 'strengths' as keyof AppraisalComments,
      label: 'Key Strengths & Achievements',
      placeholder: 'Highlight the crew member\'s notable strengths, achievements, and positive contributions during this evaluation period...',
      rows: 4,
      maxLength: 1500,
      required: true
    },
    {
      key: 'areasForImprovement' as keyof AppraisalComments,
      label: 'Areas for Improvement',
      placeholder: 'Identify specific areas where the crew member can improve performance, skills, or knowledge...',
      rows: 4,
      maxLength: 1500,
      required: true
    },
    {
      key: 'trainingRecommendations' as keyof AppraisalComments,
      label: 'Training & Development Recommendations',
      placeholder: 'Suggest specific training programs, courses, or development opportunities that would benefit the crew member...',
      rows: 3,
      maxLength: 1000,
      required: false
    },
    {
      key: 'overallFeedback' as keyof AppraisalComments,
      label: 'Overall Performance Feedback',
      placeholder: 'Provide a comprehensive summary of the crew member\'s overall performance, attitude, and contribution to the team...',
      rows: 5,
      maxLength: 2000,
      required: true
    },
    {
      key: 'goalsForNextPeriod' as keyof AppraisalComments,
      label: 'Goals for Next Evaluation Period',
      placeholder: 'Set clear, measurable goals and expectations for the crew member to achieve before the next appraisal...',
      rows: 4,
      maxLength: 1500,
      required: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#16569e] mb-2">
          Crew Appraisal Comments
        </h2>
        <p className="text-gray-600">
          Provide detailed feedback and recommendations for the crew member's development
        </p>
      </div>

      <div className="space-y-8">
        {commentSections.map((section) => (
          <div key={section.key} className="border border-gray-200 rounded-lg p-6">
            <Label 
              htmlFor={section.key} 
              className="text-base font-semibold text-gray-900 mb-3 block"
            >
              {section.label}
              {section.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            
            <Textarea
              id={section.key}
              placeholder={section.placeholder}
              value={comments[section.key]}
              onChange={(e) => handleCommentChange(section.key, e.target.value)}
              rows={section.rows}
              className="w-full border-gray-300 focus:border-[#16569e] focus:ring-[#16569e] resize-vertical"
              maxLength={section.maxLength}
              required={section.required}
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                {comments[section.key].length}/{section.maxLength} characters
              </div>
              {section.required && comments[section.key].length === 0 && (
                <div className="text-xs text-red-500">
                  This field is required
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Writing Guidelines
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Be specific and provide concrete examples</li>
          <li>• Focus on behaviors and performance, not personality</li>
          <li>• Use professional and constructive language</li>
          <li>• Include measurable achievements where possible</li>
          <li>• Suggest actionable improvement steps</li>
        </ul>
      </div>

      <div className="mt-8 flex space-x-4">
        <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button className="flex-1 px-6 py-3 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
          Complete Appraisal
        </button>
      </div>
    </div>
  );
}
```

## Vessel Observation Log

```tsx
function VesselObservationLog() {
  const [observations, setObservations] = useState({
    weatherConditions: '',
    seaState: '',
    equipmentStatus: '',
    crewObservations: '',
    safetyNotes: '',
    additionalRemarks: ''
  });

  const [currentTime, setCurrentTime] = useState(new Date().toISOString().slice(0, 16));

  const observationFields = [
    {
      key: 'weatherConditions',
      label: 'Weather Conditions',
      placeholder: 'Wind direction and speed, visibility, precipitation, barometric pressure...',
      rows: 3,
      icon: Cloud
    },
    {
      key: 'seaState',
      label: 'Sea State & Navigation',
      placeholder: 'Wave height, sea conditions, navigation status, course, speed...',
      rows: 3,
      icon: Waves
    },
    {
      key: 'equipmentStatus',
      label: 'Equipment Status',
      placeholder: 'Engine performance, navigation equipment, communication systems, any malfunctions...',
      rows: 4,
      icon: Settings
    },
    {
      key: 'crewObservations',
      label: 'Crew Observations',
      placeholder: 'Crew performance, watch changes, any incidents or notable events involving crew...',
      rows: 3,
      icon: Users
    },
    {
      key: 'safetyNotes',
      label: 'Safety & Security Notes',
      placeholder: 'Safety drills, security updates, any safety concerns or observations...',
      rows: 3,
      icon: Shield
    },
    {
      key: 'additionalRemarks',
      label: 'Additional Remarks',
      placeholder: 'Any other observations, port activities, cargo operations, or relevant information...',
      rows: 4,
      icon: FileText
    }
  ];

  const handleObservationChange = (field: string, value: string) => {
    setObservations(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#16569e]">
            Vessel Observation Log
          </h2>
          <div className="text-sm text-gray-600">
            MV Container Express • Bridge Watch
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <Label htmlFor="log-time" className="text-gray-700 font-medium">
              Date & Time (UTC)
            </Label>
            <input
              id="log-time"
              type="datetime-local"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
          <div>
            <Label htmlFor="position" className="text-gray-700 font-medium">
              Current Position
            </Label>
            <input
              id="position"
              type="text"
              placeholder="Lat/Long or Port"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
          <div>
            <Label htmlFor="watch-officer" className="text-gray-700 font-medium">
              Watch Officer
            </Label>
            <input
              id="watch-officer"
              type="text"
              placeholder="Officer name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {observationFields.map((field) => (
          <div key={field.key} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <field.icon className="h-5 w-5 text-[#16569e]" />
              <Label 
                htmlFor={field.key}
                className="text-base font-semibold text-gray-900"
              >
                {field.label}
              </Label>
            </div>
            
            <Textarea
              id={field.key}
              placeholder={field.placeholder}
              value={observations[field.key as keyof typeof observations]}
              onChange={(e) => handleObservationChange(field.key, e.target.value)}
              rows={field.rows}
              className="w-full border-gray-300 focus:border-[#16569e] focus:ring-[#16569e]"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Log Entry Requirements
        </h3>
        <div className="text-sm text-gray-600 grid grid-cols-2 gap-4">
          <ul className="space-y-1">
            <li>• Record all significant observations</li>
            <li>• Use precise time stamps (UTC)</li>
            <li>• Include weather and sea conditions</li>
          </ul>
          <ul className="space-y-1">
            <li>• Note any equipment anomalies</li>
            <li>• Record crew changes and incidents</li>
            <li>• Maintain professional language</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Save Entry
        </button>
        <button className="flex-1 px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
          Submit to Log Book
        </button>
      </div>
    </div>
  );
}
```

## Auto-Resizing Textarea

```tsx
function AutoResizingTextarea() {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize function
  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    autoResize();
  }, [content, autoResize]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-[#16569e] mb-4">
        Quick Notes & Observations
      </h3>
      
      <div>
        <Label htmlFor="auto-resize-notes" className="text-sm font-medium text-gray-700">
          Notes
        </Label>
        <Textarea
          ref={textareaRef}
          id="auto-resize-notes"
          placeholder="Start typing your observations... This textarea will automatically expand as you type more content."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 w-full border-gray-300 focus:border-[#16569e] focus:ring-[#16569e] min-h-[80px] resize-none overflow-hidden"
          rows={3}
        />
        <div className="mt-1 text-xs text-gray-500">
          Auto-expanding • {content.length} characters
        </div>
      </div>
    </div>
  );
}
```

## Rich Text Formatting Helper

```tsx
function FormattedTextareaWithHelper() {
  const [content, setContent] = useState('');
  const [showFormatting, setShowFormatting] = useState(false);

  const formatTemplates = [
    {
      name: 'Incident Header',
      template: `INCIDENT REPORT
Date: [DATE]
Time: [TIME UTC]
Location: [POSITION/PORT]
Severity: [LOW/MEDIUM/HIGH/CRITICAL]

Description:
`
    },
    {
      name: 'Equipment Issue',
      template: `EQUIPMENT MALFUNCTION
Equipment: [EQUIPMENT NAME]
System: [SYSTEM/DEPARTMENT]
Fault Description: [DESCRIPTION]
Impact on Operations: [IMPACT]
Immediate Actions Taken: [ACTIONS]
Repair Required: [YES/NO]
`
    },
    {
      name: 'Crew Performance',
      template: `CREW PERFORMANCE NOTE
Crew Member: [NAME]
Rank: [POSITION]
Date: [DATE]
Observation: [POSITIVE/NEGATIVE/NEUTRAL]

Details:
`
    }
  ];

  const insertTemplate = (template: string) => {
    setContent(prev => prev + template);
    setShowFormatting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#16569e]">
          Maritime Log Entry
        </h3>
        <button
          onClick={() => setShowFormatting(!showFormatting)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          {showFormatting ? 'Hide' : 'Show'} Templates
        </button>
      </div>

      {showFormatting && (
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Quick Templates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {formatTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => insertTemplate(template.template)}
                className="p-2 text-sm text-left border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="formatted-content" className="text-sm font-medium text-gray-700">
          Log Entry Content
        </Label>
        <Textarea
          id="formatted-content"
          placeholder="Enter your log entry here. Use the templates above for standardized formatting..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="mt-1 w-full border-gray-300 focus:border-[#16569e] focus:ring-[#16569e] font-mono text-sm"
          maxLength={5000}
        />
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>Supports standard maritime reporting formats</span>
          <span>{content.length}/5000 characters</span>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Clear
        </button>
        <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
          Save Entry
        </button>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Clear Placeholders**: Provide helpful placeholder text with examples
2. **Character Limits**: Set appropriate limits and show character counts
3. **Auto-resize**: Consider auto-expanding textareas for better UX
4. **Templates**: Provide templates for standardized maritime reporting
5. **Validation**: Implement proper validation for required fields
6. **Accessibility**: Ensure proper labeling and keyboard navigation

## Context Requirements

The Textarea component works with:
- **Form Libraries**: Integration with react-hook-form and validation
- **State Management**: Text content handling and persistence
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Screen reader support and keyboard navigation

## Troubleshooting

### Common Issues

**Textarea not resizing properly**
```tsx
// For auto-resize functionality
const textareaRef = useRef<HTMLTextAreaElement>(null);

useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
}, [content]);

<Textarea
  ref={textareaRef}
  className="resize-none overflow-hidden"
  value={content}
  onChange={(e) => setContent(e.target.value)}
/>
```

**Form validation not working**
```tsx
// Ensure proper form integration
const { register, formState: { errors } } = useForm();

<Textarea
  {...register('description', { 
    required: 'Description is required',
    maxLength: { value: 2000, message: 'Maximum 2000 characters' }
  })}
  className={errors.description ? 'border-red-500' : 'border-gray-300'}
/>
{errors.description && (
  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
)}
```

**Character count not updating**
```tsx
// Ensure proper state management
const [text, setText] = useState('');

<Textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  maxLength={1000}
/>
<div className="text-xs text-gray-500">
  {text.length}/1000 characters
</div>
```