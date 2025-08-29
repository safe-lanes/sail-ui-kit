# Alert Dialog Component Implementation Guide

## Component Overview
The `AlertDialog` component from `scomp-ui/sail-ui-kit` provides a modal dialog for critical confirmations and alerts in maritime applications. Essential for safety-critical operations like emergency procedures, vessel commands, and compliance confirmations.

## Props Interface
```typescript
interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface AlertDialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface AlertDialogContentProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogActionProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface AlertDialogCancelProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
```

## Basic Usage Example
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";

function EmergencyStopDialog() {
  const handleEmergencyStop = () => {
    // Emergency stop procedure
    console.log("Emergency stop initiated");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="lg">
          EMERGENCY STOP
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            ⚠️ Emergency Stop Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to initiate an emergency stop procedure. This will immediately 
            halt all cargo operations and activate emergency protocols.
            
            This action cannot be undone and must be reported to the bridge immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleEmergencyStop}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Confirm Emergency Stop
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "scomp-ui/sail-ui-kit";
import { Button, Badge } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

interface VesselDepartureConfirmationProps {
  vessel: {
    name: string;
    imo: string;
    destination: string;
    departureTime: string;
    crewCount: number;
    cargoStatus: string;
  };
  onConfirmDeparture: () => void;
}

function VesselDepartureConfirmation({ vessel, onConfirmDeparture }: VesselDepartureConfirmationProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleConfirm = () => {
    onConfirmDeparture();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="default" 
          size="lg"
          className="bg-[#16569e] hover:bg-[#16569e]/90"
        >
          Authorize Departure
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            🚢 Vessel Departure Authorization
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please confirm all pre-departure requirements have been completed for vessel departure.
              </p>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium">Vessel:</span>
                  <span>{vessel.name}</span>
                  
                  <span className="font-medium">IMO:</span>
                  <span>{vessel.imo}</span>
                  
                  <span className="font-medium">Destination:</span>
                  <span>{vessel.destination}</span>
                  
                  <span className="font-medium">Scheduled Departure:</span>
                  <span>{vessel.departureTime}</span>
                  
                  <span className="font-medium">Crew Onboard:</span>
                  <span>{vessel.crewCount} persons</span>
                  
                  <span className="font-medium">Cargo Status:</span>
                  <Badge variant={vessel.cargoStatus === "Loaded" ? "default" : "secondary"}>
                    {vessel.cargoStatus}
                  </Badge>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="font-medium text-destructive mb-2">⚠️ Pre-Departure Checklist Confirmation Required:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>All crew members reported and accounted for</li>
                  <li>Cargo securing completed and verified</li>
                  <li>Port clearance obtained</li>
                  <li>Weather routing approved</li>
                  <li>Engine room ready for departure</li>
                  <li>Navigation equipment tested and operational</li>
                </ul>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-[#16569e] hover:bg-[#16569e]/90"
          >
            Authorize Departure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Critical Operations Dialog
```tsx
function BallasteOperationDialog({ operation, onConfirm }: {
  operation: "load" | "discharge";
  onConfirm: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          {operation === "load" ? "Load Ballast" : "Discharge Ballast"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-orange-600">
            ⚠️ Ballast Operation Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-3">
              <p>
                You are about to initiate a ballast {operation} operation. 
                This will affect vessel stability and must be monitored continuously.
              </p>
              
              <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                <p className="font-medium text-orange-800">Critical Safety Requirements:</p>
                <ul className="text-sm text-orange-700 mt-1 space-y-1">
                  <li>• Confirm stability calculations are complete</li>
                  <li>• Verify ballast tank valves are operational</li>
                  <li>• Ensure continuous monitoring during operation</li>
                  <li>• Maintain communication with bridge</li>
                </ul>
              </div>
              
              <p className="text-sm text-muted-foreground">
                This operation will be logged in the vessel's deck log and must be 
                supervised by a qualified officer.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Confirm {operation === "load" ? "Load" : "Discharge"} Operation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **State management**: Optional for complex confirmation workflows
- **Event handlers**: Required for action confirmations

## Maritime-Specific Use Cases
1. **Emergency Procedures**: Confirm critical safety operations
2. **Departure Authorization**: Pre-departure checklist confirmations
3. **Cargo Operations**: Critical cargo handling confirmations
4. **Equipment Operations**: High-risk equipment operation confirmations
5. **Compliance Actions**: TMSA compliance procedure confirmations
6. **Port Operations**: Berth assignments and port procedure confirmations

## Integration with Fleet Management
```tsx
// Example: Mass crew reassignment confirmation
function CrewReassignmentDialog({ crewMembers, newVessel }: {
  crewMembers: CrewMember[];
  newVessel: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Reassign {crewMembers.length} Crew Members
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Crew Reassignment Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4">
              <p>
                You are about to reassign {crewMembers.length} crew members to vessel {newVessel}.
              </p>
              
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Rank</th>
                      <th className="text-left py-2">Current Vessel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crewMembers.map(member => (
                      <tr key={member.id} className="border-b">
                        <td className="py-1">{member.name}</td>
                        <td className="py-1">{member.rank}</td>
                        <td className="py-1">{member.currentVessel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-destructive">
                ⚠️ This action will update all crew records and notify affected vessels.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm Reassignment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Styling and Theming
The AlertDialog component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Adapts to mobile and desktop screens
- **Critical action styling**: Red for destructive actions, orange for warnings
- **Maritime compliance**: Consistent with safety protocol interfaces
- **Accessibility**: Proper focus management and screen reader support

## Troubleshooting
1. **Dialog not opening**: Check trigger element and `open` state
2. **Action not firing**: Verify onClick handlers are properly bound
3. **Styling issues**: Ensure proper className application
4. **Focus issues**: Check that interactive elements are properly structured
5. **Mobile layout problems**: Use responsive max-width classes

## Best Practices
- Use clear, action-specific titles and descriptions
- Include relevant vessel/operation details in confirmations
- Implement proper loading states for async operations
- Use appropriate color coding for different risk levels
- Provide detailed information for critical maritime operations
- Always include cancel options for non-emergency actions