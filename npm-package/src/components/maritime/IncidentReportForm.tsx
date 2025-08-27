import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { IncidentSeverityIndicator } from './IncidentSeverityIndicator';
import type { SeverityLevel } from './IncidentSeverityIndicator';

interface IncidentReport {
  id?: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  incidentType: string;
  location: string;
  reportedBy: string;
  dateTime: string;
  vesselsInvolved: string[];
  personnelInvolved: string[];
  immediateActions: string;
  rootCause?: string;
  correctiveActions?: string;
  status: 'draft' | 'submitted' | 'under-investigation' | 'closed';
}

interface IncidentReportFormProps {
  incident?: Partial<IncidentReport>;
  onSave: (incident: IncidentReport) => void;
  onCancel: () => void;
  readonly?: boolean;
}

const INCIDENT_TYPES = [
  'Personal Injury',
  'Environmental Incident',
  'Equipment Failure',
  'Navigation Incident',
  'Security Incident',
  'Fire/Explosion',
  'Collision/Contact',
  'Grounding',
  'Cargo Related',
  'Near Miss',
  'Other'
];

export function IncidentReportForm({ 
  incident = {}, 
  onSave, 
  onCancel, 
  readonly = false 
}: IncidentReportFormProps) {
  const [formData, setFormData] = React.useState<Partial<IncidentReport>>({
    title: '',
    description: '',
    severity: 'medium' as SeverityLevel,
    incidentType: '',
    location: '',
    reportedBy: '',
    dateTime: new Date().toISOString().slice(0, 16),
    vesselsInvolved: [],
    personnelInvolved: [],
    immediateActions: '',
    status: 'draft',
    ...incident
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as IncidentReport);
  };

  const updateField = (field: keyof IncidentReport, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Incident Report Form</span>
          {formData.severity && (
            <IncidentSeverityIndicator 
              severity={formData.severity} 
              incidentType={formData.incidentType}
            />
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Incident Title *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Brief description of incident"
                required
                readOnly={readonly}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="incidentType">Incident Type *</Label>
              <Select 
                value={formData.incidentType || ''} 
                onValueChange={(value) => updateField('incidentType', value)}
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {INCIDENT_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <Select 
                value={formData.severity || 'medium'} 
                onValueChange={(value: SeverityLevel) => updateField('severity', value)}
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="near-miss">Near Miss</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Incident location"
                required
                readOnly={readonly}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateTime">Date & Time *</Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={formData.dateTime || ''}
                onChange={(e) => updateField('dateTime', e.target.value)}
                required
                readOnly={readonly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Detailed description of what happened..."
              rows={4}
              required
              readOnly={readonly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="immediateActions">Immediate Actions Taken</Label>
            <Textarea
              id="immediateActions"
              value={formData.immediateActions || ''}
              onChange={(e) => updateField('immediateActions', e.target.value)}
              placeholder="Actions taken immediately after the incident..."
              rows={3}
              readOnly={readonly}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportedBy">Reported By *</Label>
              <Input
                id="reportedBy"
                value={formData.reportedBy || ''}
                onChange={(e) => updateField('reportedBy', e.target.value)}
                placeholder="Name of person reporting"
                required
                readOnly={readonly}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status || 'draft'} 
                onValueChange={(value) => updateField('status', value)}
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under-investigation">Under Investigation</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!readonly && (
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#5DADE2] hover:bg-[#4A9BD1]">
                {formData.status === 'draft' ? 'Save Draft' : 'Submit Report'}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}