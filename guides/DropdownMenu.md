# Dropdown Menu Component Implementation Guide

## Component Overview
The `DropdownMenu` component from `scomp-ui/sail-ui-kit` provides contextual action menus for maritime applications. Essential for organizing actions, filters, and navigation options in fleet management interfaces while saving screen space.

## Props Interface
```typescript
interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  className?: string;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}

interface DropdownMenuItemProps {
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  onSelect?: (event: Event) => void;
  children: React.ReactNode;
}

interface DropdownMenuCheckboxItemProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children: React.ReactNode;
}

interface DropdownMenuRadioItemProps {
  className?: string;
  value: string;
  children: React.ReactNode;
}

interface DropdownMenuLabelProps {
  className?: string;
  inset?: boolean;
  children: React.ReactNode;
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

interface DropdownMenuShortcutProps {
  className?: string;
  children: React.ReactNode;
}

interface DropdownMenuSubProps {
  children: React.ReactNode;
}

interface DropdownMenuSubTriggerProps {
  className?: string;
  inset?: boolean;
  children: React.ReactNode;
}

interface DropdownMenuSubContentProps {
  className?: string;
  children: React.ReactNode;
}

interface DropdownMenuRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

interface DropdownMenuPortalProps {
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { MoreHorizontal, Eye, Edit, Trash2, Ship } from "lucide-react";

function VesselActionsDropdown({ vessel }: { vessel: Vessel }) {
  const handleViewDetails = () => {
    console.log(`View details for ${vessel.name}`);
  };

  const handleEditVessel = () => {
    console.log(`Edit ${vessel.name}`);
  };

  const handleDeleteVessel = () => {
    console.log(`Delete ${vessel.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Vessel Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleEditVessel}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Vessel
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleDeleteVessel} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Vessel
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Advanced Maritime Filters
```tsx
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { Filter, Ship, Users, MapPin } from "lucide-react";
import { useState } from "react";

interface FleetFiltersProps {
  onFiltersChange: (filters: FleetFilters) => void;
}

interface FleetFilters {
  vesselTypes: string[];
  status: string[];
  regions: string[];
  sortBy: string;
  crewSize: string;
}

function FleetFiltersDropdown({ onFiltersChange }: FleetFiltersProps) {
  const [filters, setFilters] = useState<FleetFilters>({
    vesselTypes: [],
    status: [],
    regions: [],
    sortBy: "name",
    crewSize: "all",
  });

  const updateFilters = (newFilters: Partial<FleetFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleVesselType = (type: string) => {
    const updated = filters.vesselTypes.includes(type)
      ? filters.vesselTypes.filter(t => t !== type)
      : [...filters.vesselTypes, type];
    updateFilters({ vesselTypes: updated });
  };

  const toggleStatus = (status: string) => {
    const updated = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    updateFilters({ status: updated });
  };

  const toggleRegion = (region: string) => {
    const updated = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    updateFilters({ regions: updated });
  };

  const getActiveFilterCount = () => {
    return filters.vesselTypes.length + filters.status.length + filters.regions.length +
           (filters.sortBy !== "name" ? 1 : 0) + (filters.crewSize !== "all" ? 1 : 0);
  };

  const vesselTypes = [
    "Oil Tanker",
    "Chemical Tanker", 
    "LPG Tanker",
    "Container",
    "Bulk Carrier",
    "General Cargo"
  ];

  const statusOptions = [
    "Operational",
    "Loading",
    "Discharging",
    "At Anchor",
    "Maintenance",
    "Dry Dock"
  ];

  const regions = [
    "North Atlantic",
    "Mediterranean",
    "Persian Gulf",
    "Southeast Asia",
    "North Pacific",
    "Caribbean"
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Fleet Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Vessel Types */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Ship className="mr-2 h-4 w-4" />
            Vessel Types
            {filters.vesselTypes.length > 0 && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {filters.vesselTypes.length}
              </Badge>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {vesselTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={filters.vesselTypes.includes(type)}
                onCheckedChange={() => toggleVesselType(type)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Status */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Ship className="mr-2 h-4 w-4" />
            Status
            {filters.status.length > 0 && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {filters.status.length}
              </Badge>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {statusOptions.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filters.status.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Regions */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <MapPin className="mr-2 h-4 w-4" />
            Regions
            {filters.regions.length > 0 && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {filters.regions.length}
              </Badge>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {regions.map((region) => (
              <DropdownMenuCheckboxItem
                key={region}
                checked={filters.regions.includes(region)}
                onCheckedChange={() => toggleRegion(region)}
              >
                {region}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        
        {/* Sort Options */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Sort By
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={filters.sortBy} 
              onValueChange={(value) => updateFilters({ sortBy: value })}
            >
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="type">Vessel Type</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dwt">Deadweight</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="built">Year Built</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Crew Size */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            Crew Size
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={filters.crewSize} 
              onValueChange={(value) => updateFilters({ crewSize: value })}
            >
              <DropdownMenuRadioItem value="all">All Sizes</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="small">Small (&lt; 15)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medium">Medium (15-25)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="large">Large (&gt; 25)</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## User Account Dropdown
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Bell,
  Moon,
  Sun,
  Shield
} from "lucide-react";

interface UserAccountDropdownProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onAction: (action: string) => void;
}

function UserAccountDropdown({ user, onAction }: UserAccountDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.role}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => onAction("profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onAction("notifications")}>
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onAction("settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => onAction("theme")}>
          <Moon className="mr-2 h-4 w-4" />
          Toggle Theme
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => onAction("security")}>
          <Shield className="mr-2 h-4 w-4" />
          Security
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onAction("help")}>
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => onAction("logout")}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Status Change Dropdown
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { 
  ChevronDown, 
  Ship, 
  Anchor, 
  Fuel, 
  Wrench, 
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface VesselStatusDropdownProps {
  currentStatus: string;
  vesselName: string;
  onStatusChange: (newStatus: string) => void;
}

function VesselStatusDropdown({ currentStatus, vesselName, onStatusChange }: VesselStatusDropdownProps) {
  const statusOptions = [
    {
      value: "operational",
      label: "Operational",
      icon: <Ship className="h-4 w-4" />,
      color: "bg-green-600",
      description: "Vessel is operational and ready for service"
    },
    {
      value: "loading",
      label: "Loading",
      icon: <Fuel className="h-4 w-4" />,
      color: "bg-blue-600",
      description: "Vessel is currently loading cargo"
    },
    {
      value: "discharging",
      label: "Discharging",
      icon: <Fuel className="h-4 w-4" />,
      color: "bg-purple-600",
      description: "Vessel is currently discharging cargo"
    },
    {
      value: "at-anchor",
      label: "At Anchor",
      icon: <Anchor className="h-4 w-4" />,
      color: "bg-yellow-600",
      description: "Vessel is anchored and waiting"
    },
    {
      value: "maintenance",
      label: "Maintenance",
      icon: <Wrench className="h-4 w-4" />,
      color: "bg-orange-600",
      description: "Vessel is undergoing maintenance"
    },
    {
      value: "drydock",
      label: "Dry Dock",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-red-600",
      description: "Vessel is in dry dock for repairs"
    }
  ];

  const currentStatusInfo = statusOptions.find(option => option.value === currentStatus);

  const handleStatusChange = (newStatus: string) => {
    if (newStatus !== currentStatus) {
      onStatusChange(newStatus);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {currentStatusInfo?.icon}
          <Badge className={`${currentStatusInfo?.color} text-white`}>
            {currentStatusInfo?.label}
          </Badge>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>
          Change Status - {vesselName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className="flex items-start gap-3 py-3"
          >
            <div className="flex items-center gap-2 flex-1">
              {option.icon}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{option.label}</span>
                  {option.value === currentStatus && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
            </div>
            <Badge 
              className={`${option.color} text-white text-xs`}
              variant="secondary"
            >
              {option.label}
            </Badge>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2 text-xs text-muted-foreground">
          Status changes are logged and will notify relevant personnel
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Fleet Operations Dropdown
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { 
  Settings, 
  Ship, 
  Users, 
  FileText, 
  BarChart3,
  AlertTriangle,
  Calendar,
  MapPin,
  Fuel
} from "lucide-react";

function FleetOperationsDropdown({ onAction }: { onAction: (action: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Operations
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Fleet Operations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Fleet Management */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Ship className="mr-2 h-4 w-4" />
            Fleet Management
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => onAction("add-vessel")}>
              ➕ Add New Vessel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("vessel-transfers")}>
              🔄 Vessel Transfers
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("fleet-overview")}>
              📊 Fleet Overview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("vessel-tracking")}>
              🗺️ Real-time Tracking
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Crew Operations */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            Crew Operations
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => onAction("crew-assignments")}>
              👥 Crew Assignments
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("crew-rotations")}>
              🔄 Crew Rotations
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("training-schedules")}>
              📚 Training Schedules
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("certification-tracking")}>
              🏆 Certification Tracking
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Port Operations */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <MapPin className="mr-2 h-4 w-4" />
            Port Operations
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => onAction("port-schedules")}>
              📅 Port Schedules
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("cargo-operations")}>
              📦 Cargo Operations
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("port-clearances")}>
              📋 Port Clearances
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("berth-planning")}>
              ⚓ Berth Planning
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        
        {/* Reports & Analytics */}
        <DropdownMenuItem onClick={() => onAction("analytics")}>
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics Dashboard
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onAction("fuel-reports")}>
          <Fuel className="mr-2 h-4 w-4" />
          Fuel Consumption Reports
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onAction("compliance-reports")}>
          <FileText className="mr-2 h-4 w-4" />
          Compliance Reports
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Safety & Emergency */}
        <DropdownMenuItem 
          onClick={() => onAction("safety-alerts")}
          className="text-orange-600 focus:text-orange-600"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Safety Alerts
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => onAction("emergency-procedures")}
          className="text-red-600 focus:text-red-600"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Emergency Procedures
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **State management**: Optional for controlled open/close state
- **Event handling**: Custom action handlers for menu selections

## Maritime-Specific Use Cases
1. **Vessel Actions**: Quick actions for individual vessels
2. **Fleet Filters**: Advanced filtering for vessel lists
3. **Status Changes**: Update vessel operational status
4. **User Account**: User profile and system settings
5. **Operations Menu**: Access to fleet management functions
6. **Port Selection**: Choose ports and terminals
7. **Crew Assignment**: Quick crew management actions

## Integration with Fleet Management
```tsx
// Example: Integrated dropdown with data fetching
function VesselActionsWithData({ vesselId }: { vesselId: string }) {
  const { data: vessel } = useQuery({
    queryKey: ["/api/vessels", vesselId],
  });

  const updateVesselStatus = useMutation({
    mutationFn: (status: string) => apiRequest(`/api/vessels/${vesselId}/status`, {
      method: "PATCH",
      body: { status },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vessels"] });
    },
  });

  const handleStatusChange = (newStatus: string) => {
    updateVesselStatus.mutate(newStatus);
  };

  if (!vessel) return null;

  return (
    <VesselStatusDropdown
      currentStatus={vessel.status}
      vesselName={vessel.name}
      onStatusChange={handleStatusChange}
    />
  );
}
```

## Styling and Theming
The DropdownMenu component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Adapts to mobile and desktop interfaces
- **Keyboard navigation**: Full accessibility support
- **Maritime styling**: Consistent with fleet management interfaces
- **Icon integration**: Maritime-appropriate icons for actions

## Troubleshooting
1. **Menu not opening**: Check trigger button setup and event handlers
2. **Positioning issues**: Adjust align and sideOffset props
3. **Submenu problems**: Verify DropdownMenuSub structure
4. **Click outside not closing**: Ensure proper portal setup
5. **Mobile touch issues**: Test touch interactions on mobile devices

## Best Practices
- Group related actions logically using separators and submenus
- Use descriptive labels and meaningful icons
- Implement keyboard shortcuts for frequently used actions
- Provide visual feedback for current selections
- Consider screen space and mobile usability
- Use consistent terminology across maritime applications
- Implement proper loading states for dynamic actions
- Handle errors gracefully with user feedback