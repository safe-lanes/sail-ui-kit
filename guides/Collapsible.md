# Collapsible Component Implementation Guide

## Component Overview
The `Collapsible` component from `scomp-ui/sail-ui-kit` provides expandable content areas for maritime applications. Essential for organizing complex information, technical specifications, and detailed procedures while maintaining clean interfaces.

## Props Interface
```typescript
interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CollapsibleTriggerProps {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CollapsibleContentProps {
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

function VesselSpecifications({ vessel }: { vessel: Vessel }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{vessel.name} - Technical Details</h3>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>View Technical Specifications</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-2 mt-2 p-4 border rounded-lg bg-muted/30">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>IMO Number:</strong> {vessel.imo}
            </div>
            <div>
              <strong>Call Sign:</strong> {vessel.callSign}
            </div>
            <div>
              <strong>Flag:</strong> {vessel.flag}
            </div>
            <div>
              <strong>Built:</strong> {vessel.yearBuilt}
            </div>
            <div>
              <strong>Length Overall:</strong> {vessel.length} meters
            </div>
            <div>
              <strong>Beam:</strong> {vessel.beam} meters
            </div>
            <div>
              <strong>Deadweight:</strong> {vessel.dwt.toLocaleString()} MT
            </div>
            <div>
              <strong>Gross Tonnage:</strong> {vessel.grossTonnage.toLocaleString()}
            </div>
          </div>
          
          <div className="mt-4">
            <strong>Classification:</strong>
            <p className="text-muted-foreground">{vessel.classification}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge, Button } from "scomp-ui/sail-ui-kit";
import { ChevronDown, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface TMSAElementDetails {
  id: string;
  name: string;
  score: number;
  status: "compliant" | "non-compliant" | "pending";
  lastAudit: string;
  findings: {
    id: string;
    type: "major" | "minor" | "observation";
    description: string;
    status: "open" | "closed" | "pending";
    dueDate: string;
  }[];
  requirements: string[];
  documents: string[];
}

function TMSAElementCollapsible({ element }: { element: TMSAElementDetails }) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-600";
      case "non-compliant": return "bg-red-600";
      case "pending": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getFindingTypeColor = (type: string) => {
    switch (type) {
      case "major": return "bg-red-600";
      case "minor": return "bg-yellow-600";
      case "observation": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getFindingStatusIcon = (status: string) => {
    switch (status) {
      case "closed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "open": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-base">{element.name}</CardTitle>
                <Badge className={`${getStatusColor(element.status)} text-white text-xs`}>
                  {element.status}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-bold">{element.score}%</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            {/* Element Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium text-sm">Last Audit</div>
                <div className="text-muted-foreground text-sm">{element.lastAudit}</div>
              </div>
              <div>
                <div className="font-medium text-sm">Open Findings</div>
                <div className="text-muted-foreground text-sm">
                  {element.findings.filter(f => f.status === "open").length}
                </div>
              </div>
              <div>
                <div className="font-medium text-sm">Compliance Score</div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        element.score >= 80 ? 'bg-green-600' : 
                        element.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${element.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{element.score}%</span>
                </div>
              </div>
            </div>

            {/* Findings */}
            {element.findings.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Audit Findings</h4>
                <div className="space-y-3">
                  {element.findings.map((finding) => (
                    <div key={finding.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getFindingTypeColor(finding.type)} text-white text-xs`}>
                            {finding.type}
                          </Badge>
                          {getFindingStatusIcon(finding.status)}
                          <span className="text-sm font-medium capitalize">{finding.status}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Due: {finding.dueDate}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{finding.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            <div>
              <h4 className="font-medium mb-3">Key Requirements</h4>
              <ul className="space-y-2">
                {element.requirements.map((requirement, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-[#16569e] mt-1">•</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div>
              <h4 className="font-medium mb-3">Required Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {element.documents.map((document, index) => (
                  <div key={index} className="text-sm p-2 bg-muted/30 rounded">
                    {document}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" variant="outline">
                View Full Report
              </Button>
              <Button size="sm" className="bg-[#16569e] hover:bg-[#16569e]/90">
                Update Status
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
```

## Multi-Level Collapsible Structure
```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent } from "scomp-ui/sail-ui-kit";
import { ChevronDown, Ship, Anchor, Users } from "lucide-react";
import { useState } from "react";

interface FleetHierarchy {
  region: string;
  fleets: {
    name: string;
    vessels: {
      name: string;
      type: string;
      status: string;
      crew: number;
    }[];
  }[];
}

function FleetHierarchyCollapsible({ fleetData }: { fleetData: FleetHierarchy[] }) {
  const [openRegions, setOpenRegions] = useState<Record<string, boolean>>({});
  const [openFleets, setOpenFleets] = useState<Record<string, boolean>>({});

  const toggleRegion = (region: string) => {
    setOpenRegions(prev => ({ ...prev, [region]: !prev[region] }));
  };

  const toggleFleet = (fleetKey: string) => {
    setOpenFleets(prev => ({ ...prev, [fleetKey]: !prev[fleetKey] }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Fleet Organization</h2>
      
      {fleetData.map((region) => (
        <Card key={region.region}>
          <Collapsible 
            open={openRegions[region.region]} 
            onOpenChange={() => toggleRegion(region.region)}
          >
            <CollapsibleTrigger asChild>
              <div className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Ship className="h-5 w-5 text-[#16569e]" />
                    <h3 className="text-lg font-semibold">{region.region}</h3>
                    <span className="text-sm text-muted-foreground">
                      ({region.fleets.length} fleets)
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      openRegions[region.region] ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-3">
                {region.fleets.map((fleet) => {
                  const fleetKey = `${region.region}-${fleet.name}`;
                  return (
                    <Card key={fleet.name} className="border-l-4 border-l-[#16569e]">
                      <Collapsible 
                        open={openFleets[fleetKey]} 
                        onOpenChange={() => toggleFleet(fleetKey)}
                      >
                        <CollapsibleTrigger asChild>
                          <div className="p-3 cursor-pointer hover:bg-muted/30 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Anchor className="h-4 w-4 text-[#16569e]" />
                                <h4 className="font-medium">{fleet.name}</h4>
                                <span className="text-xs text-muted-foreground">
                                  ({fleet.vessels.length} vessels)
                                </span>
                              </div>
                              <ChevronDown 
                                className={`h-3 w-3 transition-transform ${
                                  openFleets[fleetKey] ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="px-3 pb-3 space-y-2">
                            {fleet.vessels.map((vessel) => (
                              <div 
                                key={vessel.name} 
                                className="p-2 bg-muted/30 rounded flex items-center justify-between"
                              >
                                <div>
                                  <div className="font-medium text-sm">{vessel.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {vessel.type} • {vessel.status}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Users className="h-3 w-3" />
                                  <span>{vessel.crew}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  );
                })}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}
```

## Equipment Maintenance Collapsible
```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader } from "scomp-ui/sail-ui-kit";
import { Badge, Button } from "scomp-ui/sail-ui-kit";
import { ChevronDown, Wrench, Calendar, AlertTriangle } from "lucide-react";

interface EquipmentMaintenance {
  equipment: string;
  category: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: "current" | "due" | "overdue";
  procedures: {
    id: string;
    name: string;
    frequency: string;
    responsible: string;
    lastCompleted: string;
    nextDue: string;
    status: "completed" | "due" | "overdue";
  }[];
}

function EquipmentMaintenanceCollapsible({ equipmentList }: { equipmentList: EquipmentMaintenance[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (equipment: string) => {
    setOpenItems(prev => ({ ...prev, [equipment]: !prev[equipment] }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-green-600";
      case "due": return "bg-yellow-600";
      case "overdue": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue": return <AlertTriangle className="h-4 w-4" />;
      case "due": return <Calendar className="h-4 w-4" />;
      default: return <Wrench className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Equipment Maintenance Schedule</h2>
      
      {equipmentList.map((equipment) => (
        <Card key={equipment.equipment}>
          <Collapsible 
            open={openItems[equipment.equipment]} 
            onOpenChange={() => toggleItem(equipment.equipment)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(equipment.status)}
                    <div>
                      <h3 className="font-semibold">{equipment.equipment}</h3>
                      <p className="text-sm text-muted-foreground">{equipment.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm">Next Maintenance</div>
                      <div className="text-xs text-muted-foreground">{equipment.nextMaintenance}</div>
                    </div>
                    <Badge className={`${getStatusColor(equipment.status)} text-white`}>
                      {equipment.status}
                    </Badge>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${
                        openItems[equipment.equipment] ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-4">
                {/* Maintenance Overview */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Last Maintenance</div>
                    <div className="text-muted-foreground text-sm">{equipment.lastMaintenance}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Next Due</div>
                    <div className="text-muted-foreground text-sm">{equipment.nextMaintenance}</div>
                  </div>
                </div>

                {/* Maintenance Procedures */}
                <div>
                  <h4 className="font-medium mb-3">Maintenance Procedures</h4>
                  <div className="space-y-3">
                    {equipment.procedures.map((procedure) => (
                      <div key={procedure.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{procedure.name}</span>
                            <Badge 
                              variant={procedure.status === "completed" ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {procedure.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {procedure.frequency}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Responsible:</span> {procedure.responsible}
                          </div>
                          <div>
                            <span className="font-medium">Last Completed:</span> {procedure.lastCompleted}
                          </div>
                          <div>
                            <span className="font-medium">Next Due:</span> {procedure.nextDue}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm" variant="outline">
                    Schedule Maintenance
                  </Button>
                  <Button size="sm" className="bg-[#16569e] hover:bg-[#16569e]/90">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **State management**: Local state for open/closed status
- **Animation support**: Built-in smooth expand/collapse animations

## Maritime-Specific Use Cases
1. **Technical Specifications**: Detailed vessel and equipment information
2. **TMSA Elements**: Expandable compliance element details
3. **Fleet Organization**: Hierarchical fleet and vessel structures
4. **Maintenance Schedules**: Equipment maintenance procedures and schedules
5. **Incident Reports**: Detailed incident information and follow-up actions
6. **Crew Information**: Expandable crew member details and certifications
7. **Port Procedures**: Detailed port-specific operational procedures

## Integration with Fleet Management
```tsx
// Example: Dynamic collapsible content with data fetching
function DynamicTMSAElements({ vesselId }: { vesselId: string }) {
  const { data: elements, isLoading } = useQuery({
    queryKey: ["/api/tmsa-elements", vesselId],
  });

  if (isLoading) {
    return <div>Loading TMSA elements...</div>;
  }

  return (
    <div className="space-y-4">
      {elements?.map((element: TMSAElementDetails) => (
        <TMSAElementCollapsible key={element.id} element={element} />
      ))}
    </div>
  );
}
```

## Styling and Theming
The Collapsible component follows maritime blue theme (#16569e) and supports:
- **Smooth animations**: Built-in expand/collapse transitions
- **Responsive design**: Adapts to mobile and desktop layouts
- **Maritime styling**: Consistent with fleet management interfaces
- **Accessibility**: Proper keyboard navigation and screen reader support

## Troubleshooting
1. **Animation not working**: Ensure CollapsibleContent is properly structured
2. **State not updating**: Verify onOpenChange handler is connected
3. **Trigger not clickable**: Check asChild prop usage with trigger elements
4. **Content overflow**: Use proper spacing and container classes
5. **Nested collapsibles conflicting**: Use separate state management for each level

## Best Practices
- Use descriptive trigger labels that indicate expandable content
- Provide visual indicators (icons) for expand/collapse state
- Group related information logically within collapsible sections
- Implement proper loading states for dynamic content
- Consider mobile interaction patterns for maritime field use
- Use consistent spacing and typography throughout collapsed content
- Provide clear action buttons for maritime operational tasks
- Consider offline scenarios for maritime environments