# Alert Component Implementation Guide

## Component Overview
The `Alert` component from `scomp-ui/sail-ui-kit` provides contextual feedback and important notifications for maritime operations. Essential for displaying safety warnings, compliance alerts, operational status updates, and system notifications.

## Props Interface
```typescript
interface AlertProps {
  variant?: "default" | "destructive" | "warning" | "success";
  className?: string;
  children: React.ReactNode;
}

interface AlertTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDescriptionProps {
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import { Alert, AlertDescription, AlertTitle } from "scomp-ui/sail-ui-kit";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

function BasicMaritimeAlerts() {
  return (
    <div className="space-y-4">
      {/* Success Alert */}
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Port Clearance Obtained</AlertTitle>
        <AlertDescription>
          Vessel MV Ocean Star has received clearance from Singapore Port Authority. 
          Departure authorized for 14:30 UTC.
        </AlertDescription>
      </Alert>

      {/* Warning Alert */}
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Weather Advisory</AlertTitle>
        <AlertDescription>
          Moderate sea conditions expected in route area. Reduce speed to 12 knots 
          and secure all deck cargo.
        </AlertDescription>
      </Alert>

      {/* Destructive Alert */}
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>TMSA Non-Compliance Detected</AlertTitle>
        <AlertDescription>
          Element 6A (Mooring Operations) requires immediate attention. 
          2 critical findings must be addressed before next port call.
        </AlertDescription>
      </Alert>

      {/* Default/Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>System Maintenance Scheduled</AlertTitle>
        <AlertDescription>
          Fleet management system will undergo maintenance on Sunday 2:00-4:00 UTC. 
          Limited functionality may be available.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

## Advanced Maritime Implementation
```tsx
import { Alert, AlertDescription, AlertTitle } from "scomp-ui/sail-ui-kit";
import { Badge, Button } from "scomp-ui/sail-ui-kit";
import { AlertTriangle, Clock, MapPin, Users } from "lucide-react";

interface VesselAlert {
  id: string;
  type: "safety" | "compliance" | "operational" | "emergency";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  vesselName: string;
  imo: string;
  timestamp: string;
  location?: string;
  actionRequired: boolean;
  dueDate?: string;
}

function MaritimeAlertSystem({ alerts }: { alerts: VesselAlert[] }) {
  const getAlertVariant = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "default";
      default: return "default";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600";
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fleet Alerts & Notifications</h3>
      
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={getAlertVariant(alert.severity)}>
          <AlertTriangle className="h-4 w-4" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <AlertTitle className="flex items-center gap-2">
                {alert.title}
                <Badge 
                  className={`${getSeverityColor(alert.severity)} text-white text-xs`}
                >
                  {alert.severity.toUpperCase()}
                </Badge>
              </AlertTitle>
              <span className="text-sm text-muted-foreground">
                {alert.timestamp}
              </span>
            </div>
            
            <AlertDescription>
              <div className="space-y-3">
                <p>{alert.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{alert.vesselName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-xs">IMO: {alert.imo}</span>
                  </div>
                  {alert.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{alert.location}</span>
                    </div>
                  )}
                </div>
                
                {alert.actionRequired && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3" />
                      <span>Action required by: {alert.dueDate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-[#16569e] hover:bg-[#16569e]/90">
                        Take Action
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}
```

## TMSA Compliance Alerts
```tsx
function TMSAComplianceAlerts({ violations }: { violations: TMSAViolation[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#16569e]">TMSA Compliance Alerts</h3>
      
      {violations.map((violation) => (
        <Alert key={violation.id} variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            TMSA {violation.element} - Non-Compliance Detected
          </AlertTitle>
          <AlertDescription>
            <div className="space-y-3">
              <p>{violation.description}</p>
              
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                <h4 className="font-medium text-red-800">Required Actions:</h4>
                <ul className="text-sm text-red-700 mt-1 space-y-1">
                  {violation.requiredActions.map((action, index) => (
                    <li key={index}>• {action}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Compliance deadline: {violation.deadline}</span>
                <Badge variant="outline" className="border-red-500 text-red-700">
                  {violation.severity} Priority
                </Badge>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
```

## Weather and Safety Alerts
```tsx
function WeatherSafetyAlerts({ weatherData }: { weatherData: WeatherAlert[] }) {
  return (
    <div className="space-y-4">
      {weatherData.map((alert) => (
        <Alert 
          key={alert.id} 
          variant={alert.severity === "severe" ? "destructive" : "warning"}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            Weather Alert - {alert.type}
          </AlertTitle>
          <AlertDescription>
            <div className="space-y-3">
              <p>{alert.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Wind Speed:</strong> {alert.windSpeed} knots
                </div>
                <div>
                  <strong>Wave Height:</strong> {alert.waveHeight} meters
                </div>
                <div>
                  <strong>Visibility:</strong> {alert.visibility} nm
                </div>
                <div>
                  <strong>Duration:</strong> {alert.duration}
                </div>
              </div>
              
              <div className="bg-orange-50 p-3 rounded">
                <h4 className="font-medium text-orange-800">Recommended Actions:</h4>
                <ul className="text-sm text-orange-700 mt-1 space-y-1">
                  {alert.recommendations.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **State management**: Optional for dynamic alerts and dismissible notifications
- **Real-time updates**: Integrate with websockets or polling for live alerts

## Maritime-Specific Use Cases
1. **Safety Alerts**: Weather warnings, equipment failures, emergency situations
2. **Compliance Notifications**: TMSA violations, certificate expirations, audit findings
3. **Operational Updates**: Port clearances, voyage status changes, crew changes
4. **System Notifications**: Maintenance schedules, software updates, connectivity issues
5. **Emergency Alerts**: Man overboard, fire alerts, collision warnings
6. **Port Communications**: Berth assignments, cargo operations, customs clearance

## Integration with Fleet Management
```tsx
// Example: Real-time fleet alert dashboard
function FleetAlertDashboard() {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ["/api/fleet-alerts"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) return <div>Loading alerts...</div>;

  const criticalAlerts = alerts?.filter(alert => alert.severity === "critical") || [];
  const otherAlerts = alerts?.filter(alert => alert.severity !== "critical") || [];

  return (
    <div className="space-y-6">
      {/* Critical Alerts Section */}
      {criticalAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Critical Alerts ({criticalAlerts.length})
          </h2>
          <MaritimeAlertSystem alerts={criticalAlerts} />
        </div>
      )}
      
      {/* Other Alerts Section */}
      {otherAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Fleet Notifications ({otherAlerts.length})
          </h2>
          <MaritimeAlertSystem alerts={otherAlerts} />
        </div>
      )}
      
      {/* No Alerts State */}
      {alerts?.length === 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>All Systems Operational</AlertTitle>
          <AlertDescription>
            No active alerts for the fleet. All vessels reporting normal operations.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
```

## Styling and Theming
The Alert component follows maritime blue theme (#16569e) and supports:
- **Severity-based styling**: Color coding for different alert levels
- **Responsive design**: Adapts to mobile and desktop layouts
- **Maritime compliance**: Consistent with safety protocol interfaces
- **Icon integration**: Supports Lucide React icons for visual context

## Troubleshooting
1. **Icons not displaying**: Ensure Lucide React icons are properly imported
2. **Variant styling issues**: Check that variant prop matches available options
3. **Responsive layout problems**: Use proper grid and flex classes
4. **Content overflow**: Implement proper text wrapping and spacing
5. **Real-time updates not working**: Verify query refetch intervals and websocket connections

## Best Practices
- Use appropriate severity levels for different types of maritime alerts
- Include vessel identification (name, IMO) in all vessel-specific alerts
- Provide clear action items and deadlines for compliance alerts
- Implement real-time updates for critical safety alerts
- Use consistent color coding across the maritime application
- Include location and timestamp information when relevant
- Group related alerts by severity or type for better organization