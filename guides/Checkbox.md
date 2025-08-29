# Checkbox Component Implementation Guide

## Component Overview
The `Checkbox` component from `scomp-ui/sail-ui-kit` provides binary selection controls for maritime applications. Essential for checklists, compliance forms, safety procedures, and equipment verification in fleet management systems.

## Props Interface
```typescript
interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
  asChild?: boolean;
}
```

## Basic Usage Example
```tsx
import { Checkbox } from "scomp-ui/sail-ui-kit";
import { Label } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

function BasicSafetyChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  const safetyItems = [
    { id: "life-jackets", label: "Life jackets inspected and available" },
    { id: "fire-extinguishers", label: "Fire extinguishers checked and operational" },
    { id: "emergency-lights", label: "Emergency lighting system tested" },
    { id: "communication", label: "Communication equipment operational" },
    { id: "navigation-lights", label: "Navigation lights functioning" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pre-Departure Safety Checklist</h3>
      
      <div className="space-y-3">
        {safetyItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={checkedItems[item.id] || false}
              onCheckedChange={(checked) => handleCheckChange(item.id, checked)}
            />
            <Label 
              htmlFor={item.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </div>
      
      {/* Progress Indicator */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex justify-between text-sm">
          <span>Progress:</span>
          <span>
            {Object.values(checkedItems).filter(Boolean).length} / {safetyItems.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-[#16569e] h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(Object.values(checkedItems).filter(Boolean).length / safetyItems.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

## Advanced Maritime Checklist Implementation
```tsx
import { Checkbox } from "scomp-ui/sail-ui-kit";
import { Label } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge, Button } from "scomp-ui/sail-ui-kit";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  required: boolean;
  priority: "low" | "medium" | "high" | "critical";
  responsible: string;
  notes?: string;
}

interface TMSAComplianceChecklistProps {
  elementId: string;
  elementName: string;
  items: ChecklistItem[];
  onComplete?: (completedItems: Record<string, boolean>) => void;
}

function TMSAComplianceChecklist({ 
  elementId, 
  elementName, 
  items, 
  onComplete 
}: TMSAComplianceChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleCheckChange = (id: string, checked: boolean) => {
    const updatedItems = { ...checkedItems, [id]: checked };
    setCheckedItems(updatedItems);
    
    if (onComplete) {
      onComplete(updatedItems);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "high": return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, ChecklistItem[]>);

  const requiredItems = items.filter(item => item.required);
  const completedRequired = requiredItems.filter(item => checkedItems[item.id]).length;
  const isCompliant = completedRequired === requiredItems.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TMSA {elementName}</h2>
          <p className="text-muted-foreground">Element {elementId} Compliance Checklist</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge 
            variant={isCompliant ? "default" : "destructive"}
            className="flex items-center gap-1"
          >
            {isCompliant ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
            {isCompliant ? "Compliant" : "Pending"}
          </Badge>
        </div>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#16569e]">
                {Object.values(checkedItems).filter(Boolean).length}
              </div>
              <div className="text-sm text-muted-foreground">Total Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedRequired}
              </div>
              <div className="text-sm text-muted-foreground">Required Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((completedRequired / requiredItems.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Compliance Level</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className="bg-[#16569e] h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${(completedRequired / requiredItems.length) * 100}%` 
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items by Category */}
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 border rounded-lg ${
                    item.required ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={item.id}
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={(checked) => handleCheckChange(item.id, checked)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label 
                          htmlFor={item.id}
                          className="text-sm font-medium leading-relaxed cursor-pointer"
                        >
                          {item.item}
                        </Label>
                        
                        <div className="flex items-center gap-2">
                          {item.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                          <Badge 
                            className={`${getPriorityColor(item.priority)} text-white text-xs flex items-center gap-1`}
                          >
                            {getPriorityIcon(item.priority)}
                            {item.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Responsible: {item.responsible}</span>
                        {checkedItems[item.id] && (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      
                      {item.notes && (
                        <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                          <strong>Note:</strong> {item.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline">
          Save Progress
        </Button>
        <Button 
          className="bg-[#16569e] hover:bg-[#16569e]/90"
          disabled={!isCompliant}
        >
          Submit for Review
        </Button>
      </div>
    </div>
  );
}
```

## Vessel Inspection Checklist
```tsx
import { Checkbox } from "scomp-ui/sail-ui-kit";
import { Label } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Button, Textarea } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

interface InspectionItem {
  id: string;
  area: string;
  item: string;
  acceptable: boolean | null;
  deficiency: string;
  action: string;
}

function VesselInspectionForm({ vesselName }: { vesselName: string }) {
  const [inspectionItems, setInspectionItems] = useState<Record<string, boolean>>({});
  const [deficiencies, setDeficiencies] = useState<Record<string, string>>({});
  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState(new Date().toISOString().split('T')[0]);

  const inspectionAreas = [
    {
      area: "Bridge & Navigation",
      items: [
        { id: "nav-charts", item: "Charts updated and corrected" },
        { id: "nav-equipment", item: "Navigation equipment operational" },
        { id: "radio-equipment", item: "Radio equipment tested" },
        { id: "lookout", item: "Proper lookout maintained" },
      ]
    },
    {
      area: "Engine Room",
      items: [
        { id: "engine-logs", item: "Engine logs up to date" },
        { id: "machinery-condition", item: "Machinery in good condition" },
        { id: "oil-records", item: "Oil record book entries correct" },
        { id: "bilge-condition", item: "Bilges clean and dry" },
      ]
    },
    {
      area: "Safety Equipment",
      items: [
        { id: "life-saving", item: "Life-saving appliances checked" },
        { id: "fire-fighting", item: "Fire-fighting equipment operational" },
        { id: "emergency-lighting", item: "Emergency lighting functional" },
        { id: "safety-signs", item: "Safety signs posted and visible" },
      ]
    },
  ];

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setInspectionItems(prev => ({ ...prev, [itemId]: checked }));
  };

  const handleDeficiencyChange = (itemId: string, value: string) => {
    setDeficiencies(prev => ({ ...prev, [itemId]: value }));
  };

  const totalItems = inspectionAreas.reduce((total, area) => total + area.items.length, 0);
  const completedItems = Object.values(inspectionItems).filter(Boolean).length;
  const deficiencyCount = Object.values(deficiencies).filter(def => def.trim() !== "").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Vessel Inspection Report</h2>
        <p className="text-muted-foreground">{vesselName}</p>
      </div>

      {/* Inspection Details */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inspector">Inspector Name</Label>
              <input
                id="inspector"
                type="text"
                value={inspector}
                onChange={(e) => setInspector(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter inspector name"
              />
            </div>
            <div>
              <Label htmlFor="inspection-date">Inspection Date</Label>
              <input
                id="inspection-date"
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#16569e]">{completedItems}</div>
              <div className="text-sm text-muted-foreground">Items Checked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{deficiencyCount}</div>
              <div className="text-sm text-muted-foreground">Deficiencies</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round((completedItems / totalItems) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Checklist */}
      {inspectionAreas.map((area) => (
        <Card key={area.area}>
          <CardHeader>
            <CardTitle>{area.area}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {area.items.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={inspectionItems[item.id] || false}
                      onCheckedChange={(checked) => handleItemCheck(item.id, checked)}
                    />
                    <Label htmlFor={item.id} className="flex-1">
                      {item.item}
                    </Label>
                  </div>
                  
                  {!inspectionItems[item.id] && (
                    <div className="ml-6">
                      <Label htmlFor={`${item.id}-deficiency`} className="text-sm text-red-600">
                        Deficiency/Action Required:
                      </Label>
                      <Textarea
                        id={`${item.id}-deficiency`}
                        value={deficiencies[item.id] || ""}
                        onChange={(e) => handleDeficiencyChange(item.id, e.target.value)}
                        placeholder="Describe deficiency and required action..."
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Submit */}
      <div className="flex justify-between">
        <Button variant="outline">
          Save Draft
        </Button>
        <Button 
          className="bg-[#16569e] hover:bg-[#16569e]/90"
          disabled={completedItems !== totalItems || !inspector}
        >
          Submit Inspection Report
        </Button>
      </div>
    </div>
  );
}
```

## Crew Certification Checklist
```tsx
import { Checkbox } from "scomp-ui/sail-ui-kit";
import { Label } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { Calendar, AlertTriangle } from "lucide-react";

interface CrewCertification {
  id: string;
  name: string;
  required: boolean;
  expiryDate: string;
  status: "valid" | "expiring" | "expired";
}

function CrewCertificationChecklist({ crewMember }: { crewMember: any }) {
  const [verifiedCertifications, setVerifiedCertifications] = useState<Record<string, boolean>>({});

  const certifications: CrewCertification[] = [
    { id: "stcw-basic", name: "STCW Basic Safety Training", required: true, expiryDate: "2025-06-15", status: "valid" },
    { id: "coc", name: "Certificate of Competency", required: true, expiryDate: "2024-12-31", status: "expiring" },
    { id: "medical", name: "Medical Certificate", required: true, expiryDate: "2025-03-20", status: "valid" },
    { id: "passport", name: "Passport", required: true, expiryDate: "2026-08-10", status: "valid" },
    { id: "visa", name: "Visa/Work Permit", required: true, expiryDate: "2024-11-15", status: "expiring" },
    { id: "dangerous-goods", name: "Dangerous Goods Training", required: false, expiryDate: "2025-01-30", status: "valid" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-green-600";
      case "expiring": return "bg-yellow-600";
      case "expired": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const requiredCerts = certifications.filter(cert => cert.required);
  const verifiedRequired = requiredCerts.filter(cert => verifiedCertifications[cert.id]).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Certification Verification</h3>
        <p className="text-muted-foreground">{crewMember.name} - {crewMember.rank}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#16569e]">
                {verifiedRequired}/{requiredCerts.length}
              </div>
              <div className="text-sm text-muted-foreground">Required Verified</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round((verifiedRequired / requiredCerts.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Compliance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div 
            key={cert.id} 
            className={`p-4 border rounded-lg ${
              cert.required ? 'border-orange-200 bg-orange-50/20' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={cert.id}
                  checked={verifiedCertifications[cert.id] || false}
                  onCheckedChange={(checked) => 
                    setVerifiedCertifications(prev => ({ ...prev, [cert.id]: checked }))
                  }
                />
                <div>
                  <Label htmlFor={cert.id} className="font-medium cursor-pointer">
                    {cert.name}
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Expires: {cert.expiryDate}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {cert.required && (
                  <Badge variant="outline" className="text-xs">
                    Required
                  </Badge>
                )}
                <Badge className={`${getStatusColor(cert.status)} text-white text-xs`}>
                  {cert.status}
                </Badge>
                {cert.status === "expiring" && (
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Form integration**: Works well with React Hook Form and form libraries
- **State management**: Requires local state or form state management

## Maritime-Specific Use Cases
1. **Safety Checklists**: Pre-departure and emergency procedure checklists
2. **TMSA Compliance**: Element-specific compliance verification
3. **Vessel Inspections**: Port state control and internal inspection forms
4. **Crew Certifications**: Verification of crew document validity
5. **Equipment Checks**: Regular equipment inspection and maintenance
6. **Port Procedures**: Port-specific requirement checklists
7. **Training Records**: Training completion and competency verification

## Integration with Fleet Management
```tsx
// Example: Form integration with React Hook Form
function IntegratedComplianceForm() {
  const { data: complianceItems } = useQuery({
    queryKey: ["/api/compliance-checklist"],
  });

  const form = useForm({
    defaultValues: {
      checklist: {},
      inspector: "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: any) => {
    await apiRequest("/api/compliance-submit", {
      method: "POST",
      body: data,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TMSAComplianceChecklist 
        items={complianceItems || []}
        onComplete={(checklist) => form.setValue("checklist", checklist)}
      />
    </form>
  );
}
```

## Styling and Theming
The Checkbox component follows maritime blue theme (#16569e) and supports:
- **Accessible design**: Proper focus states and keyboard navigation
- **Responsive sizing**: Scales appropriately for mobile and desktop
- **Maritime styling**: Consistent with fleet management interfaces
- **Status indicators**: Clear visual feedback for checked/unchecked states

## Troubleshooting
1. **State not updating**: Verify onCheckedChange handler is properly connected
2. **Label not clickable**: Ensure proper htmlFor and id attributes match
3. **Styling issues**: Check className application and CSS specificity
4. **Accessibility problems**: Verify proper label association and ARIA attributes
5. **Performance issues**: Use proper key props for dynamic lists

## Best Practices
- Always associate checkboxes with descriptive labels using htmlFor
- Use controlled state management for form integration
- Implement progress indicators for long checklists
- Provide clear visual feedback for completion status
- Group related items logically for maritime workflows
- Include required/optional indicators for compliance forms
- Implement proper validation for critical maritime procedures
- Consider offline capabilities for maritime environments
- Use consistent terminology across maritime applications