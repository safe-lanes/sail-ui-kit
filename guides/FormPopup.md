# Form Popup Component Implementation Guide

## Component Overview
The `FormPopup` component from `scomp-ui/sail-ui-kit` provides a standardized modal interface for forms in maritime applications. Essential for maintaining consistent spacing (`p-4`, `h-[calc(100vh-2rem)]`) and styling across all modal popups in fleet management systems.

## Props Interface
```typescript
interface FormPopupProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
```

## Basic Usage Example
```tsx
import { FormPopup } from "scomp-ui/sail-ui-kit";
import { Button, Input, Label } from "scomp-ui/sail-ui-kit";
import { Ship, Plus } from "lucide-react";
import { useState } from "react";

function AddVesselFormPopup() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imo: "",
    type: "",
    flag: "",
    dwt: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding vessel:", formData);
    setOpen(false);
    setFormData({ name: "", imo: "", type: "", flag: "", dwt: "" });
  };

  return (
    <FormPopup
      open={open}
      onOpenChange={setOpen}
      title="Add New Vessel"
      description="Enter vessel details to add to the fleet"
      trigger={
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vessel
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="vessel-name">Vessel Name *</Label>
          <Input
            id="vessel-name"
            placeholder="e.g., MV Ocean Star"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="imo-number">IMO Number *</Label>
          <Input
            id="imo-number"
            placeholder="e.g., 9123456"
            value={formData.imo}
            onChange={(e) => setFormData({ ...formData, imo: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="vessel-type">Vessel Type *</Label>
          <select
            id="vessel-type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select vessel type</option>
            <option value="oil-tanker">Oil Tanker</option>
            <option value="chemical-tanker">Chemical Tanker</option>
            <option value="container">Container</option>
            <option value="bulk-carrier">Bulk Carrier</option>
            <option value="general-cargo">General Cargo</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="flag">Flag *</Label>
            <Input
              id="flag"
              placeholder="e.g., Singapore"
              value={formData.flag}
              onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="dwt">DWT (MT) *</Label>
            <Input
              id="dwt"
              type="number"
              placeholder="e.g., 115000"
              value={formData.dwt}
              onChange={(e) => setFormData({ ...formData, dwt: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#16569e] hover:bg-[#16569e]/90">
            Add Vessel
          </Button>
        </div>
      </form>
    </FormPopup>
  );
}
```

## Advanced Maritime Form Implementation
```tsx
import { FormPopup } from "scomp-ui/sail-ui-kit";
import { Button, Input, Label, Textarea } from "scomp-ui/sail-ui-kit";
import { Badge, Card, CardContent } from "scomp-ui/sail-ui-kit";
import { AlertTriangle, Calendar, Clock, FileText } from "lucide-react";
import { useState } from "react";

interface MaintenanceScheduleFormProps {
  vessel: {
    id: string;
    name: string;
    type: string;
  };
  onSubmit: (schedule: MaintenanceSchedule) => void;
}

interface MaintenanceSchedule {
  type: string;
  priority: string;
  scheduledDate: string;
  estimatedDuration: string;
  description: string;
  requiredParts: string;
  responsibleTeam: string;
  portLocation: string;
}

function MaintenanceScheduleFormPopup({ vessel, onSubmit }: MaintenanceScheduleFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<MaintenanceSchedule>>({
    scheduledDate: new Date().toISOString().split('T')[0],
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData as MaintenanceSchedule);
      setOpen(false);
      resetForm();
    }
  };

  const isFormValid = () => {
    return formData.type && formData.scheduledDate && formData.description && formData.responsibleTeam;
  };

  const resetForm = () => {
    setFormData({
      scheduledDate: new Date().toISOString().split('T')[0],
      priority: "medium",
    });
  };

  const maintenanceTypes = [
    "Engine Overhaul",
    "Hull Inspection",
    "Safety Equipment Check",
    "Navigation System Update",
    "Cargo System Maintenance",
    "Deck Machinery Service",
    "Electrical System Check",
    "Other"
  ];

  const priorityLevels = [
    { value: "low", label: "Low", color: "bg-green-600" },
    { value: "medium", label: "Medium", color: "bg-yellow-600" },
    { value: "high", label: "High", color: "bg-orange-600" },
    { value: "critical", label: "Critical", color: "bg-red-600" },
  ];

  const getPriorityColor = (priority: string) => {
    return priorityLevels.find(p => p.value === priority)?.color || "bg-gray-600";
  };

  return (
    <FormPopup
      open={open}
      onOpenChange={setOpen}
      title={`Schedule Maintenance - ${vessel.name}`}
      description="Schedule maintenance activities for the vessel"
      trigger={
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Maintenance
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vessel Information */}
        <Card className="border-[#16569e]/20 bg-[#16569e]/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#16569e]" />
              <span className="font-medium">Vessel: {vessel.name}</span>
              <Badge variant="outline">{vessel.type}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Type */}
        <div>
          <Label htmlFor="maintenance-type">Maintenance Type *</Label>
          <select
            id="maintenance-type"
            value={formData.type || ""}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select maintenance type</option>
            {maintenanceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Priority Level */}
        <div>
          <Label>Priority Level *</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {priorityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, priority: level.value })}
                className={`p-2 rounded border text-sm font-medium transition-colors ${
                  formData.priority === level.value
                    ? `${level.color} text-white`
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="scheduled-date">Scheduled Date *</Label>
            <Input
              id="scheduled-date"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Estimated Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 3 days"
              value={formData.estimatedDuration || ""}
              onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
            />
          </div>
        </div>

        {/* Location and Team */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="port-location">Port/Location</Label>
            <Input
              id="port-location"
              placeholder="e.g., Singapore Port"
              value={formData.portLocation || ""}
              onChange={(e) => setFormData({ ...formData, portLocation: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="responsible-team">Responsible Team *</Label>
            <select
              id="responsible-team"
              value={formData.responsibleTeam || ""}
              onChange={(e) => setFormData({ ...formData, responsibleTeam: e.target.value })}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select team</option>
              <option value="engine-team">Engine Team</option>
              <option value="deck-team">Deck Team</option>
              <option value="electrical-team">Electrical Team</option>
              <option value="external-contractor">External Contractor</option>
              <option value="shipyard">Shipyard</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Detailed description of maintenance work required..."
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />
        </div>

        {/* Required Parts */}
        <div>
          <Label htmlFor="required-parts">Required Parts/Materials</Label>
          <Textarea
            id="required-parts"
            placeholder="List any specific parts or materials needed..."
            value={formData.requiredParts || ""}
            onChange={(e) => setFormData({ ...formData, requiredParts: e.target.value })}
            rows={3}
          />
        </div>

        {/* Warning for Critical Priority */}
        {formData.priority === "critical" && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-red-800">Critical Priority Maintenance</p>
                  <p className="text-red-700">
                    This maintenance has been marked as critical and will require immediate attention.
                    Relevant safety and operational personnel will be notified.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!isFormValid()}
            className="bg-[#16569e] hover:bg-[#16569e]/90"
          >
            Schedule Maintenance
          </Button>
        </div>
      </form>
    </FormPopup>
  );
}
```

## Crew Assignment Form Popup
```tsx
import { FormPopup } from "scomp-ui/sail-ui-kit";
import { Button, Input, Label } from "scomp-ui/sail-ui-kit";
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Badge, Card, CardContent } from "scomp-ui/sail-ui-kit";
import { Users, Search, UserPlus } from "lucide-react";
import { useState } from "react";

interface CrewAssignmentFormProps {
  vessel: {
    id: string;
    name: string;
    currentCrew: number;
    maxCrew: number;
  };
  availableCrew: CrewMember[];
  onAssign: (assignment: CrewAssignment) => void;
}

interface CrewMember {
  id: string;
  name: string;
  rank: string;
  nationality: string;
  photoUrl?: string;
  availability: "available" | "assigned" | "onleave";
}

interface CrewAssignment {
  crewId: string;
  vesselId: string;
  rank: string;
  embarkDate: string;
  contractDuration: string;
}

function CrewAssignmentFormPopup({ vessel, availableCrew, onAssign }: CrewAssignmentFormProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null);
  const [assignmentData, setAssignmentData] = useState({
    embarkDate: new Date().toISOString().split('T')[0],
    contractDuration: "6",
  });

  const filteredCrew = availableCrew.filter(crew =>
    crew.availability === "available" &&
    (crew.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     crew.rank.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCrew && assignmentData.embarkDate) {
      onAssign({
        crewId: selectedCrew.id,
        vesselId: vessel.id,
        rank: selectedCrew.rank,
        embarkDate: assignmentData.embarkDate,
        contractDuration: assignmentData.contractDuration,
      });
      setOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedCrew(null);
    setSearchTerm("");
    setAssignmentData({
      embarkDate: new Date().toISOString().split('T')[0],
      contractDuration: "6",
    });
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
    <FormPopup
      open={open}
      onOpenChange={setOpen}
      title={`Assign Crew - ${vessel.name}`}
      description={`Current crew: ${vessel.currentCrew}/${vessel.maxCrew}`}
      trigger={
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Assign Crew
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vessel Status */}
        <Card className="border-[#16569e]/20 bg-[#16569e]/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#16569e]" />
                <span className="font-medium">Crew Capacity</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  {vessel.currentCrew}/{vessel.maxCrew}
                </div>
                <div className="text-xs text-muted-foreground">
                  {vessel.maxCrew - vessel.currentCrew} positions available
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crew Search */}
        <div>
          <Label htmlFor="crew-search">Search Available Crew</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="crew-search"
              placeholder="Search by name or rank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Available Crew List */}
        <div>
          <Label>Available Crew Members ({filteredCrew.length})</Label>
          <div className="max-h-48 overflow-y-auto space-y-2 mt-2 border rounded-lg p-2">
            {filteredCrew.map((crew) => (
              <div
                key={crew.id}
                onClick={() => setSelectedCrew(crew)}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedCrew?.id === crew.id
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
            
            {filteredCrew.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No available crew members found</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Crew Details */}
        {selectedCrew && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedCrew.photoUrl} alt={selectedCrew.name} />
                  <AvatarFallback>
                    {selectedCrew.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-green-800">{selectedCrew.name}</div>
                  <div className="text-sm text-green-700">{selectedCrew.rank}</div>
                  <div className="text-xs text-green-600">{selectedCrew.nationality}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assignment Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="embark-date">Embark Date *</Label>
            <Input
              id="embark-date"
              type="date"
              value={assignmentData.embarkDate}
              onChange={(e) => setAssignmentData({ ...assignmentData, embarkDate: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="contract-duration">Contract Duration (months)</Label>
            <select
              id="contract-duration"
              value={assignmentData.contractDuration}
              onChange={(e) => setAssignmentData({ ...assignmentData, contractDuration: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="9">9 months</option>
              <option value="12">12 months</option>
            </select>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!selectedCrew || !assignmentData.embarkDate}
            className="bg-[#16569e] hover:bg-[#16569e]/90"
          >
            Assign Crew Member
          </Button>
        </div>
      </form>
    </FormPopup>
  );
}
```

## Context Requirements
- **Consistent spacing**: Always uses `p-4` padding and `h-[calc(100vh-2rem)]` height
- **Modal management**: Built-in open/close state management
- **Form integration**: Works seamlessly with form libraries and validation

## Maritime-Specific Use Cases
1. **Vessel Management**: Add/edit vessel information
2. **Crew Assignment**: Assign crew members to vessels
3. **Maintenance Scheduling**: Schedule equipment and vessel maintenance
4. **Incident Reporting**: Report safety incidents and near-misses
5. **Port Operations**: Schedule port calls and cargo operations
6. **Certificate Management**: Add/update vessel and crew certificates
7. **Compliance Forms**: TMSA compliance and audit forms

## Integration with Fleet Management
```tsx
// Example: FormPopup with React Hook Form integration
function VesselFormWithValidation() {
  const form = useForm({
    resolver: zodResolver(vesselSchema),
    defaultValues: {
      name: "",
      imo: "",
      type: "",
    },
  });

  const createVessel = useMutation({
    mutationFn: (data: VesselData) => apiRequest("/api/vessels", {
      method: "POST",
      body: data,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vessels"] });
      form.reset();
    },
  });

  return (
    <FormPopup
      title="Add New Vessel"
      description="Create a new vessel in the fleet"
      trigger={<Button>Add Vessel</Button>}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createVessel.mutate)}>
          {/* Form fields */}
        </form>
      </Form>
    </FormPopup>
  );
}
```

## Styling and Theming
The FormPopup component follows maritime blue theme (#16569e) and supports:
- **Consistent spacing**: Standardized `p-4` padding and responsive height
- **Maritime styling**: Consistent with fleet management interfaces
- **Responsive design**: Adapts to mobile and desktop screens
- **Form validation**: Visual feedback for form errors and validation

## Troubleshooting
1. **Height issues**: Use `h-[calc(100vh-2rem)]` for proper modal sizing
2. **Spacing inconsistency**: Always use `p-4` for consistent padding
3. **Form validation not working**: Ensure proper form library integration
4. **Mobile responsiveness**: Test on various screen sizes
5. **State management issues**: Verify proper form state handling

## Best Practices
- Always use consistent spacing (`p-4`, `h-[calc(100vh-2rem)]`)
- Implement proper form validation for maritime data integrity
- Provide clear action buttons and confirmation states
- Use descriptive titles and descriptions for maritime context
- Include relevant vessel/crew/operation context in forms
- Implement proper loading states for form submissions
- Handle errors gracefully with user-friendly messages
- Consider offline scenarios for maritime environments
- Use maritime-appropriate terminology and field labels