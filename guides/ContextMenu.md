# Context Menu Component Implementation Guide

## Component Overview
The `ContextMenu` component from `scomp-ui/sail-ui-kit` provides right-click context menus for maritime applications. Essential for quick actions on vessels, crew members, and operational elements in fleet management interfaces.

## Props Interface
```typescript
interface ContextMenuProps {
  children: React.ReactNode;
}

interface ContextMenuTriggerProps {
  className?: string;
  asChild?: boolean;
  children: React.ReactNode;
}

interface ContextMenuContentProps {
  className?: string;
  sideOffset?: number;
  children: React.ReactNode;
}

interface ContextMenuItemProps {
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  onSelect?: (event: Event) => void;
  children: React.ReactNode;
}

interface ContextMenuCheckboxItemProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children: React.ReactNode;
}

interface ContextMenuRadioItemProps {
  className?: string;
  value: string;
  children: React.ReactNode;
}

interface ContextMenuLabelProps {
  className?: string;
  inset?: boolean;
  children: React.ReactNode;
}

interface ContextMenuSeparatorProps {
  className?: string;
}

interface ContextMenuShortcutProps {
  className?: string;
  children: React.ReactNode;
}

interface ContextMenuSubProps {
  children: React.ReactNode;
}

interface ContextMenuSubTriggerProps {
  className?: string;
  inset?: boolean;
  children: React.ReactNode;
}

interface ContextMenuSubContentProps {
  className?: string;
  children: React.ReactNode;
}

interface ContextMenuRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { Eye, Edit, Trash2, MapPin, Users } from "lucide-react";

function VesselCard({ vessel }: { vessel: Vessel }) {
  const handleViewDetails = () => {
    console.log(`View details for ${vessel.name}`);
  };

  const handleEditVessel = () => {
    console.log(`Edit ${vessel.name}`);
  };

  const handleDeleteVessel = () => {
    console.log(`Delete ${vessel.name}`);
  };

  const handleViewLocation = () => {
    console.log(`View location for ${vessel.name}`);
  };

  const handleManageCrew = () => {
    console.log(`Manage crew for ${vessel.name}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{vessel.name}</CardTitle>
              <Badge variant="outline">{vessel.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{vessel.type}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>IMO:</strong> {vessel.imo}</p>
              <p><strong>Flag:</strong> {vessel.flag}</p>
              <p><strong>DWT:</strong> {vessel.dwt.toLocaleString()} MT</p>
              <p><strong>Current Position:</strong> {vessel.currentPosition}</p>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={handleViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleEditVessel}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Vessel
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={handleViewLocation}>
          <MapPin className="mr-2 h-4 w-4" />
          View on Map
        </ContextMenuItem>
        
        <ContextMenuItem onClick={handleManageCrew}>
          <Users className="mr-2 h-4 w-4" />
          Manage Crew
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem 
          onClick={handleDeleteVessel}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Vessel
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Advanced Maritime Context Menu
```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { 
  Ship, 
  Users, 
  FileText, 
  AlertTriangle, 
  Settings, 
  Eye,
  Calendar,
  MapPin,
  Anchor,
  Fuel,
  Activity
} from "lucide-react";
import { useState } from "react";

interface VesselContextMenuProps {
  vessel: {
    id: string;
    name: string;
    type: string;
    status: "operational" | "maintenance" | "drydock" | "loading" | "discharging";
    currentPort?: string;
    nextPort?: string;
    eta?: string;
    crew: number;
  };
  onAction: (action: string, vesselId: string, data?: any) => void;
}

function VesselContextMenu({ vessel, onAction }: VesselContextMenuProps) {
  const [showAlerts, setShowAlerts] = useState(true);
  const [trackingMode, setTrackingMode] = useState("realtime");

  const canDeparture = vessel.status === "operational" && vessel.currentPort;
  const canArrive = vessel.status === "operational" && vessel.nextPort;
  const canMaintenance = vessel.status !== "maintenance" && vessel.status !== "drydock";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Ship className="h-5 w-5 text-[#16569e]" />
                {vessel.name}
              </CardTitle>
              <Badge variant="outline">{vessel.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{vessel.type}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {vessel.currentPort && (
                <p><strong>Current Port:</strong> {vessel.currentPort}</p>
              )}
              {vessel.nextPort && (
                <p><strong>Next Port:</strong> {vessel.nextPort}</p>
              )}
              {vessel.eta && (
                <p><strong>ETA:</strong> {vessel.eta}</p>
              )}
              <p><strong>Crew:</strong> {vessel.crew} persons</p>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-72">
        <ContextMenuLabel>Vessel Operations</ContextMenuLabel>
        
        <ContextMenuItem onClick={() => onAction("view-details", vessel.id)}>
          <Eye className="mr-2 h-4 w-4" />
          View Vessel Details
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem onClick={() => onAction("view-map", vessel.id)}>
          <MapPin className="mr-2 h-4 w-4" />
          View on Fleet Map
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        {/* Operational Actions */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Anchor className="mr-2 h-4 w-4" />
            Port Operations
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-56">
            <ContextMenuItem 
              disabled={!canDeparture}
              onClick={() => onAction("departure", vessel.id)}
            >
              🚢 Record Departure
            </ContextMenuItem>
            <ContextMenuItem 
              disabled={!canArrive}
              onClick={() => onAction("arrival", vessel.id)}
            >
              ⚓ Record Arrival
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => onAction("port-clearance", vessel.id)}>
              📋 Port Clearance
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("customs", vessel.id)}>
              🛃 Customs Declaration
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            Crew Management
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-56">
            <ContextMenuItem onClick={() => onAction("crew-list", vessel.id)}>
              👥 View Crew List
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("crew-change", vessel.id)}>
              🔄 Schedule Crew Change
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("crew-training", vessel.id)}>
              📚 Training Records
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => onAction("crew-certificates", vessel.id)}>
              🏆 Certificates Status
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Activity className="mr-2 h-4 w-4" />
            Maintenance & Inspections
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-56">
            <ContextMenuItem 
              disabled={!canMaintenance}
              onClick={() => onAction("schedule-maintenance", vessel.id)}
            >
              🔧 Schedule Maintenance
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("inspection-report", vessel.id)}>
              📝 Inspection Report
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("dry-dock", vessel.id)}>
              🏗️ Dry Dock Planning
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => onAction("equipment-status", vessel.id)}>
              ⚙️ Equipment Status
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSeparator />
        
        {/* Compliance & Documents */}
        <ContextMenuItem onClick={() => onAction("tmsa-compliance", vessel.id)}>
          <FileText className="mr-2 h-4 w-4" />
          TMSA Compliance
        </ContextMenuItem>
        
        <ContextMenuItem onClick={() => onAction("certificates", vessel.id)}>
          <FileText className="mr-2 h-4 w-4" />
          Certificates & Documents
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        {/* Tracking Options */}
        <ContextMenuLabel>Tracking Settings</ContextMenuLabel>
        
        <ContextMenuCheckboxItem
          checked={showAlerts}
          onCheckedChange={setShowAlerts}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Show Alerts
        </ContextMenuCheckboxItem>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Settings className="mr-2 h-4 w-4" />
            Tracking Mode
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioGroup value={trackingMode} onValueChange={setTrackingMode}>
              <ContextMenuRadioItem value="realtime">
                Real-time Tracking
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="hourly">
                Hourly Updates
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="daily">
                Daily Reports
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="manual">
                Manual Updates
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSeparator />
        
        {/* Emergency Actions */}
        <ContextMenuItem 
          onClick={() => onAction("emergency-contact", vessel.id)}
          className="text-red-600 focus:text-red-600"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Emergency Contact
          <ContextMenuShortcut>⌘!</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Crew Member Context Menu
```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { 
  User, 
  FileText, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin,
  Award,
  Clock,
  AlertTriangle
} from "lucide-react";

interface CrewMemberContextMenuProps {
  crewMember: {
    id: string;
    firstName: string;
    lastName: string;
    rank: string;
    vessel?: string;
    photoUrl?: string;
    email: string;
    phone: string;
    nationality: string;
    status: "onboard" | "onleave" | "training" | "medical";
  };
  onAction: (action: string, crewId: string) => void;
}

function CrewMemberContextMenu({ crewMember, onAction }: CrewMemberContextMenuProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "onboard": return "bg-green-600";
      case "onleave": return "bg-blue-600";
      case "training": return "bg-yellow-600";
      case "medical": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage src={crewMember.photoUrl} alt={`${crewMember.firstName} ${crewMember.lastName}`} />
            <AvatarFallback>
              {crewMember.firstName[0]}{crewMember.lastName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="font-medium">
              {crewMember.firstName} {crewMember.lastName}
            </div>
            <div className="text-sm text-muted-foreground">{crewMember.rank}</div>
            {crewMember.vessel && (
              <div className="text-xs text-muted-foreground">{crewMember.vessel}</div>
            )}
          </div>
          
          <Badge className={`${getStatusColor(crewMember.status)} text-white text-xs`}>
            {crewMember.status}
          </Badge>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Crew Member Actions</ContextMenuLabel>
        
        <ContextMenuItem onClick={() => onAction("view-profile", crewMember.id)}>
          <User className="mr-2 h-4 w-4" />
          View Full Profile
        </ContextMenuItem>
        
        <ContextMenuItem onClick={() => onAction("contact-info", crewMember.id)}>
          <Phone className="mr-2 h-4 w-4" />
          Contact Information
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FileText className="mr-2 h-4 w-4" />
            Documents & Certificates
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-56">
            <ContextMenuItem onClick={() => onAction("certificates", crewMember.id)}>
              🏆 View Certificates
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("medical-certificate", crewMember.id)}>
              🏥 Medical Certificate
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("passport", crewMember.id)}>
              📘 Passport & Visa
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("contract", crewMember.id)}>
              📝 Employment Contract
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule & Assignment
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-56">
            <ContextMenuItem onClick={() => onAction("current-assignment", crewMember.id)}>
              🚢 Current Assignment
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("schedule-change", crewMember.id)}>
              📅 Schedule Change
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("leave-request", crewMember.id)}>
              🏖️ Leave Request
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("rotation-schedule", crewMember.id)}>
              🔄 Rotation Schedule
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Award className="mr-2 h-4 w-4" />
            Training & Development
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-56">
            <ContextMenuItem onClick={() => onAction("training-records", crewMember.id)}>
              📚 Training Records
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("competency-assessment", crewMember.id)}>
              📊 Competency Assessment
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("schedule-training", crewMember.id)}>
              📝 Schedule Training
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onAction("certification-renewal", crewMember.id)}>
              🔄 Certification Renewal
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={() => onAction("send-message", crewMember.id)}>
          <Mail className="mr-2 h-4 w-4" />
          Send Message
        </ContextMenuItem>
        
        <ContextMenuItem onClick={() => onAction("location-history", crewMember.id)}>
          <MapPin className="mr-2 h-4 w-4" />
          Assignment History
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem 
          onClick={() => onAction("emergency-contact", crewMember.id)}
          className="text-red-600 focus:text-red-600"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Emergency Contact
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Fleet Table Context Menu
```tsx
function FleetTableWithContextMenu() {
  const [vessels, setVessels] = useState([
    // Sample vessel data
  ]);

  const handleVesselAction = (action: string, vesselId: string, data?: any) => {
    console.log(`Action: ${action} for vessel: ${vesselId}`, data);
    
    switch (action) {
      case "departure":
        // Handle departure recording
        break;
      case "arrival":
        // Handle arrival recording
        break;
      case "maintenance":
        // Handle maintenance scheduling
        break;
      // Add more action handlers
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Fleet Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vessels.map((vessel) => (
          <VesselContextMenu
            key={vessel.id}
            vessel={vessel}
            onAction={handleVesselAction}
          />
        ))}
      </div>
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Event handling**: Custom action handlers for maritime operations
- **Permission checking**: Optional role-based menu item visibility

## Maritime-Specific Use Cases
1. **Vessel Operations**: Quick access to vessel-specific actions
2. **Crew Management**: Crew member profile and assignment actions
3. **Port Operations**: Port-specific operational commands
4. **Document Management**: Quick access to certificates and reports
5. **Emergency Procedures**: Rapid access to emergency contacts and protocols
6. **Fleet Monitoring**: Status updates and tracking modifications
7. **Compliance Actions**: TMSA and regulatory compliance operations

## Integration with Fleet Management
```tsx
// Example: Context menu with permission-based actions
function PermissionBasedContextMenu({ vessel, userPermissions }: {
  vessel: Vessel;
  userPermissions: string[];
}) {
  const canEdit = userPermissions.includes("vessel.edit");
  const canDelete = userPermissions.includes("vessel.delete");
  const canManageCrew = userPermissions.includes("crew.manage");

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <VesselCard vessel={vessel} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>View Details</ContextMenuItem>
        {canEdit && (
          <ContextMenuItem>Edit Vessel</ContextMenuItem>
        )}
        {canManageCrew && (
          <ContextMenuItem>Manage Crew</ContextMenuItem>
        )}
        {canDelete && (
          <ContextMenuItem className="text-red-600">
            Delete Vessel
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Styling and Theming
The ContextMenu component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Adapts to mobile and desktop interfaces
- **Keyboard navigation**: Full accessibility support
- **Maritime styling**: Consistent with fleet management interfaces
- **Icon integration**: Maritime-appropriate icons for actions

## Troubleshooting
1. **Menu not appearing**: Verify ContextMenuTrigger wraps the target element
2. **Actions not firing**: Check onSelect handlers in ContextMenuItem
3. **Submenu issues**: Ensure proper ContextMenuSub structure
4. **Positioning problems**: Check ContextMenuContent sideOffset prop
5. **Mobile context menu**: Consider touch-and-hold behavior for mobile devices

## Best Practices
- Group related actions logically (Operations, Management, Documents)
- Use meaningful icons that align with maritime terminology
- Implement keyboard shortcuts for frequently used actions
- Provide visual feedback for destructive actions (red text/icons)
- Consider user permissions when showing menu items
- Use consistent action naming across maritime applications
- Implement proper error handling for context menu actions
- Consider offline scenarios for maritime environments