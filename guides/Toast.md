# Toast Component Guide

## Overview
Toast provides non-intrusive notification messages for maritime applications with success, error, warning, and informational alerts. It supports auto-dismissal, action buttons, and maritime-specific messaging patterns optimized for operational feedback and system notifications.

## Component Interface

```typescript
interface ToastProps {
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number; // milliseconds, 0 for persistent
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

// Hook for programmatic toast creation
interface UseToastOptions {
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

## Basic Usage

```jsx
import { useToast } from 'scomp-ui';

function BasicToastExample() {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast({
      title: "Vessel Inspection Complete",
      description: "MV Atlantic Star passed all safety checks successfully.",
      type: "success",
      duration: 5000
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Navigation System Error",
      description: "GPS connection lost. Switch to backup navigation.",
      type: "error",
      duration: 0, // Persistent until dismissed
      action: {
        label: "View Details",
        onClick: () => console.log("View error details")
      }
    });
  };

  const showWarningToast = () => {
    toast({
      title: "Weather Advisory",
      description: "Severe weather conditions expected in the next 6 hours.",
      type: "warning",
      duration: 10000,
      action: {
        label: "Update Route",
        onClick: () => console.log("Update route for weather")
      }
    });
  };

  const showInfoToast = () => {
    toast({
      title: "Port Update",
      description: "New berth allocation available at Rotterdam Terminal 3.",
      type: "info",
      duration: 8000
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Toast Notification Examples</h3>
      <div className="flex gap-3">
        <button 
          onClick={showSuccessToast}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Success Toast
        </button>
        <button 
          onClick={showErrorToast}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Error Toast
        </button>
        <button 
          onClick={showWarningToast}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Warning Toast
        </button>
        <button 
          onClick={showInfoToast}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Info Toast
        </button>
      </div>
    </div>
  );
}
```

## Maritime Operations Toasts

```jsx
import { Ship, Users, AlertTriangle, CheckCircle, Info, Settings } from 'lucide-react';

function MaritimeOperationsToasts() {
  const { toast } = useToast();

  const vesselOperationToasts = {
    departureComplete: () => {
      toast({
        title: "Departure Completed",
        description: "MV Atlantic Star has successfully departed from Port of Rotterdam.",
        type: "success",
        duration: 6000,
        action: {
          label: "Track Voyage",
          onClick: () => console.log("Open voyage tracking")
        }
      });
    },

    arrivalScheduled: () => {
      toast({
        title: "Arrival Update",
        description: "ETA updated to March 18, 14:00 due to weather conditions.",
        type: "info",
        duration: 8000,
        action: {
          label: "View Details",
          onClick: () => console.log("View arrival details")
        }
      });
    },

    engineMalfunction: () => {
      toast({
        title: "Engine Room Alert",
        description: "Main engine temperature high. Immediate attention required.",
        type: "error",
        duration: 0, // Persistent
        action: {
          label: "Emergency Protocol",
          onClick: () => console.log("Activate emergency protocol")
        }
      });
    },

    fuelLowWarning: () => {
      toast({
        title: "Fuel Level Warning",
        description: "Fuel reserves below 20%. Plan refueling at next port.",
        type: "warning",
        duration: 0, // Persistent until acknowledged
        action: {
          label: "Find Fuel Stations",
          onClick: () => console.log("Show nearby fuel stations")
        }
      });
    },

    crewChangeComplete: () => {
      toast({
        title: "Crew Change Completed",
        description: "5 crew members successfully signed on. All documentation verified.",
        type: "success",
        duration: 5000
      });
    },

    weatherAlert: () => {
      toast({
        title: "Severe Weather Alert",
        description: "Gale force winds expected. Reduce speed and monitor conditions.",
        type: "warning",
        duration: 15000,
        action: {
          label: "Weather Details",
          onClick: () => console.log("Show detailed weather forecast")
        }
      });
    },

    inspectionPassed: () => {
      toast({
        title: "Port State Control Inspection",
        description: "Inspection completed with zero deficiencies. Certificate issued.",
        type: "success",
        duration: 8000,
        action: {
          label: "Download Certificate",
          onClick: () => console.log("Download inspection certificate")
        }
      });
    },

    maintenanceScheduled: () => {
      toast({
        title: "Maintenance Scheduled",
        description: "Engine overhaul scheduled for April 15-20 in Singapore.",
        type: "info",
        duration: 10000,
        action: {
          label: "View Schedule",
          onClick: () => console.log("View maintenance schedule")
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Maritime Operations Notifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-medium text-green-700">Success Notifications</h4>
          <div className="space-y-2">
            <button 
              onClick={vesselOperationToasts.departureComplete}
              className="w-full px-3 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 text-sm"
            >
              Departure Complete
            </button>
            <button 
              onClick={vesselOperationToasts.crewChangeComplete}
              className="w-full px-3 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 text-sm"
            >
              Crew Change Complete
            </button>
            <button 
              onClick={vesselOperationToasts.inspectionPassed}
              className="w-full px-3 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 text-sm"
            >
              Inspection Passed
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-blue-700">Information Updates</h4>
          <div className="space-y-2">
            <button 
              onClick={vesselOperationToasts.arrivalScheduled}
              className="w-full px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
            >
              Arrival Update
            </button>
            <button 
              onClick={vesselOperationToasts.maintenanceScheduled}
              className="w-full px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
            >
              Maintenance Scheduled
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-yellow-700">Warning Alerts</h4>
          <div className="space-y-2">
            <button 
              onClick={vesselOperationToasts.fuelLowWarning}
              className="w-full px-3 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 text-sm"
            >
              Fuel Low Warning
            </button>
            <button 
              onClick={vesselOperationToasts.weatherAlert}
              className="w-full px-3 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 text-sm"
            >
              Weather Alert
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-red-700">Emergency Alerts</h4>
          <div className="space-y-2">
            <button 
              onClick={vesselOperationToasts.engineMalfunction}
              className="w-full px-3 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
            >
              Engine Malfunction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## System and Form Feedback Toasts

```jsx
function SystemFormFeedbackToasts() {
  const { toast } = useToast();

  const systemToasts = {
    saveSuccess: () => {
      toast({
        title: "Changes Saved",
        description: "Vessel configuration has been saved successfully.",
        type: "success",
        duration: 3000
      });
    },

    saveError: () => {
      toast({
        title: "Save Failed",
        description: "Unable to save changes. Please check your connection and try again.",
        type: "error",
        duration: 5000,
        action: {
          label: "Retry",
          onClick: () => console.log("Retry save operation")
        }
      });
    },

    validationError: () => {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before submitting.",
        type: "error",
        duration: 4000
      });
    },

    uploadProgress: () => {
      toast({
        title: "Document Upload",
        description: "Certificate upload in progress... Please wait.",
        type: "info",
        duration: 0, // Will be dismissed programmatically
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancel upload")
        }
      });
    },

    uploadComplete: () => {
      toast({
        title: "Upload Complete",
        description: "Safety Management Certificate uploaded successfully.",
        type: "success",
        duration: 4000,
        action: {
          label: "View Document",
          onClick: () => console.log("View uploaded document")
        }
      });
    },

    connectionLost: () => {
      toast({
        title: "Connection Lost",
        description: "Satellite connection interrupted. Reconnecting...",
        type: "warning",
        duration: 0, // Persistent until resolved
      });
    },

    connectionRestored: () => {
      toast({
        title: "Connection Restored",
        description: "Satellite connection re-established. All systems operational.",
        type: "success",
        duration: 4000
      });
    },

    dataSync: () => {
      toast({
        title: "Data Synchronization",
        description: "Syncing with shore office... 3 of 5 files remaining.",
        type: "info",
        duration: 0 // Will update progress
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">System & Form Feedback</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium">Form Operations</h4>
          <div className="space-y-2">
            <button 
              onClick={systemToasts.saveSuccess}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Save Success
            </button>
            <button 
              onClick={systemToasts.saveError}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Save Error
            </button>
            <button 
              onClick={systemToasts.validationError}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Validation Error
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">File Operations</h4>
          <div className="space-y-2">
            <button 
              onClick={systemToasts.uploadProgress}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Upload Progress
            </button>
            <button 
              onClick={systemToasts.uploadComplete}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Upload Complete
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">System Status</h4>
          <div className="space-y-2">
            <button 
              onClick={systemToasts.connectionLost}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Connection Lost
            </button>
            <button 
              onClick={systemToasts.connectionRestored}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Connection Restored
            </button>
            <button 
              onClick={systemToasts.dataSync}
              className="w-full px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              Data Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Progressive Toast Updates

```jsx
function ProgressiveToastUpdates() {
  const { toast, dismiss } = useToast();
  const [toastId, setToastId] = useState(null);

  const startProgressiveOperation = () => {
    // Start with initial toast
    const id = toast({
      title: "Port State Control Inspection",
      description: "Inspection started... Checking documentation.",
      type: "info",
      duration: 0 // Persistent
    });
    setToastId(id);

    // Update progress after 2 seconds
    setTimeout(() => {
      toast({
        id: id, // Update existing toast
        title: "Port State Control Inspection",
        description: "Documentation verified. Conducting physical inspection...",
        type: "info",
        duration: 0
      });
    }, 2000);

    // Update progress after 4 seconds
    setTimeout(() => {
      toast({
        id: id,
        title: "Port State Control Inspection",
        description: "Physical inspection complete. Reviewing findings...",
        type: "info",
        duration: 0
      });
    }, 4000);

    // Final success after 6 seconds
    setTimeout(() => {
      toast({
        id: id,
        title: "Inspection Complete",
        description: "Port State Control inspection passed with zero deficiencies.",
        type: "success",
        duration: 5000,
        action: {
          label: "Download Certificate",
          onClick: () => console.log("Download certificate")
        }
      });
    }, 6000);
  };

  const startFileUpload = () => {
    let progress = 0;
    const id = toast({
      title: "Uploading Certificate",
      description: `Upload progress: ${progress}%`,
      type: "info",
      duration: 0
    });

    const interval = setInterval(() => {
      progress += 10;
      
      if (progress <= 100) {
        toast({
          id: id,
          title: "Uploading Certificate",
          description: `Upload progress: ${progress}%`,
          type: "info",
          duration: 0
        });
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          toast({
            id: id,
            title: "Upload Complete",
            description: "Safety Management Certificate uploaded successfully.",
            type: "success",
            duration: 4000,
            action: {
              label: "View Document",
              onClick: () => console.log("View uploaded document")
            }
          });
        }, 500);
      }
    }, 500);
  };

  const handleMultipleToasts = () => {
    // Show multiple related toasts
    toast({
      title: "Crew Change Initiated",
      description: "Beginning crew sign-on process for 5 crew members.",
      type: "info",
      duration: 4000
    });

    setTimeout(() => {
      toast({
        title: "Documentation Verified",
        description: "All crew certificates and visas verified successfully.",
        type: "success",
        duration: 4000
      });
    }, 2000);

    setTimeout(() => {
      toast({
        title: "Medical Clearance",
        description: "Medical examinations completed for all crew members.",
        type: "success",
        duration: 4000
      });
    }, 4000);

    setTimeout(() => {
      toast({
        title: "Crew Change Complete",
        description: "All crew members successfully signed on. Vessel ready for departure.",
        type: "success",
        duration: 6000,
        action: {
          label: "Update Roster",
          onClick: () => console.log("Update crew roster")
        }
      });
    }, 6000);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Progressive Toast Updates</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Single Toast Updates</h4>
          <button 
            onClick={startProgressiveOperation}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Inspection Process
          </button>
          <button 
            onClick={startFileUpload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-2"
          >
            Upload with Progress
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Multiple Related Toasts</h4>
          <button 
            onClick={handleMultipleToasts}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Crew Change Process
          </button>
        </div>

        {toastId && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Manual Control</h4>
            <button 
              onClick={() => {
                dismiss(toastId);
                setToastId(null);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Dismiss Current Toast
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Toast Configuration and Best Practices

```jsx
function ToastConfiguration() {
  const { toast } = useToast();

  const configurations = {
    emergency: () => {
      toast({
        title: "EMERGENCY ALERT",
        description: "Man overboard incident. All crew to muster stations immediately.",
        type: "error",
        duration: 0, // Never auto-dismiss
        position: "top-center", // Center for critical alerts
        action: {
          label: "ACKNOWLEDGE",
          onClick: () => console.log("Emergency acknowledged")
        }
      });
    },

    routine: () => {
      toast({
        title: "Daily Report Submitted",
        description: "Noon report has been successfully transmitted to shore office.",
        type: "success",
        duration: 3000, // Quick dismiss for routine operations
        position: "bottom-right"
      });
    },

    persistent: () => {
      toast({
        title: "System Maintenance",
        description: "Navigation system will be offline for 30 minutes starting at 02:00.",
        type: "warning",
        duration: 0, // Persistent until manually dismissed
        action: {
          label: "Set Reminder",
          onClick: () => console.log("Set maintenance reminder")
        }
      });
    },

    grouped: () => {
      // Show grouped notifications for related events
      const baseTime = Date.now();
      
      toast({
        title: "Weather Update 1/3",
        description: "Wind speed increasing to 25 knots from SW.",
        type: "warning",
        duration: 8000
      });

      setTimeout(() => {
        toast({
          title: "Weather Update 2/3",
          description: "Sea state expected to reach 4-5 meters.",
          type: "warning",
          duration: 8000
        });
      }, 1000);

      setTimeout(() => {
        toast({
          title: "Weather Update 3/3",
          description: "Visibility reducing to 2-3 nautical miles.",
          type: "warning",
          duration: 10000,
          action: {
            label: "Reduce Speed",
            onClick: () => console.log("Implement weather precautions")
          }
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Toast Configuration Examples</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium">Duration Settings</h4>
          <div className="space-y-2">
            <button 
              onClick={configurations.emergency}
              className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Emergency (Persistent)
            </button>
            <button 
              onClick={configurations.routine}
              className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Routine (3 seconds)
            </button>
            <button 
              onClick={configurations.persistent}
              className="w-full px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
            >
              Important (Persistent)
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Special Patterns</h4>
          <div className="space-y-2">
            <button 
              onClick={configurations.grouped}
              className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Grouped Updates
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="font-medium mb-2">Best Practices</h4>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• Use persistent toasts (duration: 0) for critical safety alerts</li>
          <li>• Keep routine notifications brief (3-5 seconds)</li>
          <li>• Include actions for toasts that require user response</li>
          <li>• Use appropriate positioning for different alert types</li>
          <li>• Group related notifications to avoid overwhelming users</li>
          <li>• Test toast behavior on different screen sizes</li>
        </ul>
      </div>
    </div>
  );
}
```

## Key Features
- **Maritime-Specific Messages**: Pre-configured patterns for vessel operations
- **Multiple Types**: Success, error, warning, and informational notifications
- **Action Integration**: Built-in action buttons for immediate response
- **Duration Control**: Auto-dismiss or persistent options based on criticality
- **Progressive Updates**: Update existing toasts with new information
- **Position Options**: Flexible positioning for different alert priorities
- **Accessibility**: Screen reader support and keyboard navigation
- **Mobile Optimized**: Responsive design for mobile bridge operations

## Context Requirements
- **Toast Provider needed**: Wrap app with ToastProvider component
- **Hook usage**: Use `useToast` hook for programmatic toast creation
- **No form context**: Independent of form systems

## Toast Type Guidelines
- **Success**: Completed operations, successful inspections, achievements
- **Error**: System failures, safety alerts, critical malfunctions
- **Warning**: Weather alerts, fuel warnings, maintenance reminders
- **Info**: Status updates, arrival notifications, routine information

## Best Practices
1. **Appropriate Duration**: Match duration to message criticality
2. **Clear Actions**: Provide relevant actions for actionable notifications
3. **Consistent Messaging**: Use standard maritime terminology
4. **Priority Positioning**: Use top-center for critical alerts
5. **Progress Updates**: Update toasts for long-running operations
6. **Accessibility**: Ensure toasts are accessible to all users
7. **Mobile Testing**: Verify toast behavior on bridge tablets and phones

## Common Use Cases
- Vessel operation confirmations
- Safety and emergency alerts
- Weather and navigation warnings
- System status notifications
- Form submission feedback
- File upload progress
- Communication status updates
- Maintenance reminders
- Compliance notifications
- Crew change confirmations