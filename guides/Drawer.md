# Drawer Component Implementation Guide

## Component Overview
The `Drawer` component from `scomp-ui/sail-ui-kit` provides slide-out panels for maritime applications. Essential for detailed information displays, forms, and secondary navigation in fleet management interfaces without disrupting the main workflow.

## Props Interface
```typescript
interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DrawerTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface DrawerContentProps {
  className?: string;
  children: React.ReactNode;
}

interface DrawerHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface DrawerFooterProps {
  className?: string;
  children: React.ReactNode;
}

interface DrawerTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface DrawerDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface DrawerCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { Ship, MapPin, Users } from "lucide-react";

function VesselDetailsDrawer({ vessel }: { vessel: Vessel }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Ship className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </DrawerTrigger>
      
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-[#16569e]" />
              {vessel.name}
            </DrawerTitle>
            <DrawerDescription>
              {vessel.type} • IMO: {vessel.imo}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 space-y-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className="font-medium">Status:</span>
              <Badge variant="outline">{vessel.status}</Badge>
            </div>
            
            {/* Vessel Information */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Flag:</span>
                  <p className="text-muted-foreground">{vessel.flag}</p>
                </div>
                <div>
                  <span className="font-medium">Built:</span>
                  <p className="text-muted-foreground">{vessel.yearBuilt}</p>
                </div>
                <div>
                  <span className="font-medium">DWT:</span>
                  <p className="text-muted-foreground">{vessel.dwt.toLocaleString()} MT</p>
                </div>
                <div>
                  <span className="font-medium">Length:</span>
                  <p className="text-muted-foreground">{vessel.length} m</p>
                </div>
              </div>
              
              {/* Current Position */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium text-sm">Current Position:</span>
                  <p className="text-sm text-muted-foreground">{vessel.currentPosition}</p>
                </div>
              </div>
              
              {/* Crew Information */}
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium text-sm">Crew Onboard:</span>
                  <p className="text-sm text-muted-foreground">{vessel.crewCount} persons</p>
                </div>
              </div>
            </div>
          </div>
          
          <DrawerFooter>
            <Button className="bg-[#16569e] hover:bg-[#16569e]/90">
              View Full Report
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button, Input, Label, Textarea } from "scomp-ui/sail-ui-kit";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { AlertTriangle, Clock, FileText, Plus } from "lucide-react";
import { useState } from "react";

interface IncidentReportDrawerProps {
  vesselId: string;
  vesselName: string;
  onSubmit: (report: IncidentReport) => void;
}

interface IncidentReport {
  type: string;
  severity: string;
  description: string;
  location: string;
  dateTime: string;
  reportedBy: string;
  immediateActions: string;
}

function IncidentReportDrawer({ vesselId, vesselName, onSubmit }: IncidentReportDrawerProps) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<Partial<IncidentReport>>({
    dateTime: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = () => {
    if (report.type && report.description && report.reportedBy) {
      onSubmit(report as IncidentReport);
      setOpen(false);
      setReport({ dateTime: new Date().toISOString().slice(0, 16) });
    }
  };

  const incidentTypes = [
    "Near Miss",
    "Equipment Failure",
    "Personnel Injury",
    "Environmental",
    "Security",
    "Navigation",
    "Cargo",
    "Other"
  ];

  const severityLevels = [
    { value: "low", label: "Low", color: "bg-green-600" },
    { value: "medium", label: "Medium", color: "bg-yellow-600" },
    { value: "high", label: "High", color: "bg-orange-600" },
    { value: "critical", label: "Critical", color: "bg-red-600" },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Report Incident
        </Button>
      </DrawerTrigger>
      
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Incident Report
            </DrawerTitle>
            <DrawerDescription>
              {vesselName} • Report a safety incident or near-miss
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Date and Time */}
            <div>
              <Label htmlFor="datetime">Date & Time *</Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={report.dateTime}
                onChange={(e) => setReport({ ...report, dateTime: e.target.value })}
                required
              />
            </div>
            
            {/* Incident Type */}
            <div>
              <Label htmlFor="type">Incident Type *</Label>
              <select
                id="type"
                value={report.type || ""}
                onChange={(e) => setReport({ ...report, type: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select incident type</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Severity */}
            <div>
              <Label>Severity Level *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {severityLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setReport({ ...report, severity: level.value })}
                    className={`p-2 rounded border text-sm font-medium transition-colors ${
                      report.severity === level.value
                        ? `${level.color} text-white`
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Engine Room, Bridge, Deck 3"
                value={report.location || ""}
                onChange={(e) => setReport({ ...report, location: e.target.value })}
              />
            </div>
            
            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the incident..."
                value={report.description || ""}
                onChange={(e) => setReport({ ...report, description: e.target.value })}
                rows={4}
                required
              />
            </div>
            
            {/* Reported By */}
            <div>
              <Label htmlFor="reportedBy">Reported By *</Label>
              <Input
                id="reportedBy"
                placeholder="Your name and rank"
                value={report.reportedBy || ""}
                onChange={(e) => setReport({ ...report, reportedBy: e.target.value })}
                required
              />
            </div>
            
            {/* Immediate Actions */}
            <div>
              <Label htmlFor="immediateActions">Immediate Actions Taken</Label>
              <Textarea
                id="immediateActions"
                placeholder="Actions taken immediately after the incident..."
                value={report.immediateActions || ""}
                onChange={(e) => setReport({ ...report, immediateActions: e.target.value })}
                rows={3}
              />
            </div>
            
            {/* Warning */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-800">Report Submission</p>
                    <p className="text-orange-700">
                      This report will be immediately sent to the safety department 
                      and vessel management for review.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <DrawerFooter>
            <Button 
              onClick={handleSubmit}
              disabled={!report.type || !report.description || !report.reportedBy}
              className="bg-red-600 hover:bg-red-700"
            >
              Submit Incident Report
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

## Crew Assignment Drawer
```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button, Input, Label } from "scomp-ui/sail-ui-kit";
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Badge, Card, CardContent } from "scomp-ui/sail-ui-kit";
import { Users, Calendar, Ship } from "lucide-react";
import { useState } from "react";

interface CrewAssignmentDrawerProps {
  vessel: {
    id: string;
    name: string;
    currentCrew: CrewMember[];
  };
  availableCrew: CrewMember[];
  onAssignment: (assignments: CrewAssignment[]) => void;
}

interface CrewMember {
  id: string;
  name: string;
  rank: string;
  nationality: string;
  photoUrl?: string;
  currentVessel?: string;
  availability: "available" | "assigned" | "onleave";
}

interface CrewAssignment {
  crewId: string;
  vesselId: string;
  embarkDate: string;
  disembarkDate: string;
  rank: string;
}

function CrewAssignmentDrawer({ vessel, availableCrew, onAssignment }: CrewAssignmentDrawerProps) {
  const [open, setOpen] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState<string[]>([]);
  const [embarkDate, setEmbarkDate] = useState("");
  const [disembarkDate, setDisembarkDate] = useState("");

  const handleAssignment = () => {
    if (selectedCrew.length > 0 && embarkDate && disembarkDate) {
      const assignments: CrewAssignment[] = selectedCrew.map(crewId => {
        const crew = availableCrew.find(c => c.id === crewId);
        return {
          crewId,
          vesselId: vessel.id,
          embarkDate,
          disembarkDate,
          rank: crew?.rank || "",
        };
      });
      
      onAssignment(assignments);
      setOpen(false);
      setSelectedCrew([]);
      setEmbarkDate("");
      setDisembarkDate("");
    }
  };

  const toggleCrewSelection = (crewId: string) => {
    setSelectedCrew(prev =>
      prev.includes(crewId)
        ? prev.filter(id => id !== crewId)
        : [...prev, crewId]
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-600";
      case "assigned": return "bg-blue-600";
      case "onleave": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          Assign Crew
        </Button>
      </DrawerTrigger>
      
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-[#16569e]" />
              Crew Assignment - {vessel.name}
            </DrawerTitle>
            <DrawerDescription>
              Select crew members and set assignment dates
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Assignment Dates */}
            <Card>
              <CardContent className="pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="embark">Embark Date</Label>
                    <Input
                      id="embark"
                      type="date"
                      value={embarkDate}
                      onChange={(e) => setEmbarkDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="disembark">Disembark Date</Label>
                    <Input
                      id="disembark"
                      type="date"
                      value={disembarkDate}
                      onChange={(e) => setDisembarkDate(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Current Crew */}
            <div>
              <h4 className="font-medium mb-2">Current Crew ({vessel.currentCrew.length})</h4>
              <div className="space-y-2">
                {vessel.currentCrew.map((crew) => (
                  <div key={crew.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={crew.photoUrl} alt={crew.name} />
                      <AvatarFallback className="text-xs">
                        {crew.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{crew.name}</div>
                      <div className="text-xs text-muted-foreground">{crew.rank}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {crew.nationality}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Available Crew */}
            <div>
              <h4 className="font-medium mb-2">Available Crew</h4>
              <div className="space-y-2">
                {availableCrew.filter(crew => crew.availability === "available").map((crew) => (
                  <div 
                    key={crew.id}
                    onClick={() => toggleCrewSelection(crew.id)}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedCrew.includes(crew.id)
                        ? "border-[#16569e] bg-[#16569e]/10"
                        : "border-gray-200 hover:bg-muted/50"
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={crew.photoUrl} alt={crew.name} />
                      <AvatarFallback>
                        {crew.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="font-medium">{crew.name}</div>
                      <div className="text-sm text-muted-foreground">{crew.rank}</div>
                      {crew.currentVessel && (
                        <div className="text-xs text-muted-foreground">
                          Currently: {crew.currentVessel}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {crew.nationality}
                      </Badge>
                      <Badge className={`${getAvailabilityColor(crew.availability)} text-white text-xs`}>
                        {crew.availability}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedCrew.length > 0 && (
              <Card className="border-[#16569e]/20 bg-[#16569e]/5">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-[#16569e]" />
                    <span className="font-medium">
                      {selectedCrew.length} crew member{selectedCrew.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <DrawerFooter>
            <Button 
              onClick={handleAssignment}
              disabled={selectedCrew.length === 0 || !embarkDate || !disembarkDate}
              className="bg-[#16569e] hover:bg-[#16569e]/90"
            >
              Confirm Assignment ({selectedCrew.length})
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **State management**: Local state for form data and drawer open/close
- **Mobile optimization**: Built-in mobile-friendly interactions

## Maritime-Specific Use Cases
1. **Vessel Details**: Comprehensive vessel information panels
2. **Incident Reporting**: Safety incident and near-miss reporting forms
3. **Crew Assignment**: Crew member assignment and scheduling
4. **Port Procedures**: Port-specific operational forms
5. **Equipment Maintenance**: Maintenance scheduling and reporting
6. **Document Review**: Certificate and document examination
7. **Emergency Procedures**: Quick access to emergency protocols

## Integration with Fleet Management
```tsx
// Example: Data-driven drawer with API integration
function VesselManagementDrawer({ vesselId }: { vesselId: string }) {
  const { data: vessel, isLoading } = useQuery({
    queryKey: ["/api/vessels", vesselId],
  });

  const [formData, setFormData] = useState({});
  
  const updateVessel = useMutation({
    mutationFn: (data: any) => apiRequest(`/api/vessels/${vesselId}`, {
      method: "PATCH",
      body: data,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vessels"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Manage Vessel</Button>
      </DrawerTrigger>
      <DrawerContent>
        {/* Vessel management form */}
      </DrawerContent>
    </Drawer>
  );
}
```

## Styling and Theming
The Drawer component follows maritime blue theme (#16569e) and supports:
- **Mobile-first design**: Optimized for mobile and tablet interactions
- **Responsive sizing**: Adapts to different screen sizes
- **Maritime styling**: Consistent with fleet management interfaces
- **Smooth animations**: Native mobile-like slide interactions

## Troubleshooting
1. **Drawer not opening**: Check open state management and trigger setup
2. **Content overflow**: Use proper max-height and overflow styling
3. **Mobile scrolling issues**: Ensure proper touch handling and scrolling
4. **Form validation**: Implement proper form state management
5. **Performance issues**: Optimize content rendering for mobile devices

## Best Practices
- Use drawers for detailed forms and information that shouldn't interrupt main workflow
- Implement proper form validation and error handling
- Provide clear action buttons and confirmation states
- Use appropriate sizing for mobile and desktop experiences
- Include relevant maritime context and terminology
- Implement proper loading states for dynamic content
- Consider offline scenarios for maritime environments
- Use consistent button placement and labeling across maritime applications