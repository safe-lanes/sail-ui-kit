# AlertNotification Component Guide

## Overview
AlertNotification provides maritime-specific alert and notification displays for critical situations, system updates, and operational messages. It supports various alert types, priority levels, and action handling optimized for fleet management and safety-critical maritime applications.

## Component Interface

```typescript
interface AlertNotificationProps {
  type: 'info' | 'success' | 'warning' | 'error' | 'emergency';
  title: string;
  message: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timestamp?: string;
  dismissible?: boolean;
  persistent?: boolean;
  actions?: AlertAction[];
  onDismiss?: () => void;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  showPriorityBadge?: boolean;
}

interface AlertAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
}
```

## Basic Usage

```jsx
import { AlertNotification } from 'scomp-ui';

function MaritimeAlerts() {
  return (
    <div className="space-y-4">
      {/* Success notification */}
      <AlertNotification
        type="success"
        title="Vessel Inspection Complete"
        message="MV Atlantic Star has successfully completed port state control inspection with no deficiencies."
        timestamp="2024-03-15T10:30:00Z"
        dismissible={true}
        onDismiss={() => console.log('Alert dismissed')}
      />

      {/* Warning notification */}
      <AlertNotification
        type="warning"
        title="Weather Advisory"
        message="Severe weather conditions expected in the North Atlantic. Vessels should consider route adjustments."
        priority="high"
        showPriorityBadge={true}
        actions={[
          { label: 'View Details', action: () => console.log('View weather details') },
          { label: 'Update Route', action: () => console.log('Update route') }
        ]}
      />

      {/* Emergency notification */}
      <AlertNotification
        type="emergency"
        title="Mayday Signal Received"
        message="Emergency distress signal received from MV Arctic Wind in North Sea. Coast Guard notified."
        priority="critical"
        persistent={true}
        showPriorityBadge={true}
        actions={[
          { label: 'Emergency Response', action: () => console.log('Initiate emergency response'), variant: 'destructive' },
          { label: 'Contact Coast Guard', action: () => console.log('Contact Coast Guard'), variant: 'primary' }
        ]}
      />
    </div>
  );
}
```

## Alert Types & Priorities

```jsx
function AlertTypesDemo() {
  const alerts = [
    {
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled system maintenance will occur tonight from 02:00 to 04:00 UTC.',
      priority: 'low'
    },
    {
      type: 'success',
      title: 'Certificate Renewed',
      message: 'Safety Management Certificate for MV Pacific Dawn has been successfully renewed.',
      priority: 'medium'
    },
    {
      type: 'warning',
      title: 'Fuel Level Low',
      message: 'MV Nordic Explorer fuel level below 20%. Consider refueling at next port.',
      priority: 'high'
    },
    {
      type: 'error',
      title: 'Engine Malfunction',
      message: 'Main engine fault detected on MV Southern Cross. Immediate attention required.',
      priority: 'high'
    },
    {
      type: 'emergency',
      title: 'Man Overboard',
      message: 'Man overboard incident reported on MV Baltic Trader. Search and rescue initiated.',
      priority: 'critical'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Alert Types & Priority Levels</h3>
      {alerts.map((alert, index) => (
        <AlertNotification
          key={index}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          priority={alert.priority}
          timestamp={new Date().toISOString()}
          showPriorityBadge={true}
          dismissible={alert.type !== 'emergency'}
          persistent={alert.type === 'emergency'}
        />
      ))}
    </div>
  );
}
```

## Operational Alerts Dashboard

```jsx
import { Ship, AlertTriangle, CheckCircle, Info, Clock, Zap } from 'lucide-react';

function OperationalAlertsDashboard() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'emergency',
      title: 'Engine Room Fire',
      message: 'Fire alarm activated in engine room of MV Atlantic Star. Crew evacuating to muster stations.',
      priority: 'critical',
      timestamp: '2024-03-15T11:45:00Z',
      vessel: 'MV Atlantic Star',
      location: 'North Sea',
      actions: [
        { label: 'Emergency Response', action: () => {}, variant: 'destructive' },
        { label: 'Contact Vessel', action: () => {}, variant: 'primary' }
      ]
    },
    {
      id: '2',
      type: 'warning',
      title: 'Weather Deteriorating',
      message: 'Wind speed increasing to 45 knots. Sea state 7. Multiple vessels in affected area.',
      priority: 'high',
      timestamp: '2024-03-15T11:30:00Z',
      location: 'Bay of Biscay',
      actions: [
        { label: 'Issue Advisory', action: () => {}, variant: 'primary' },
        { label: 'Track Vessels', action: () => {}, variant: 'secondary' }
      ]
    },
    {
      id: '3',
      type: 'error',
      title: 'Communication Lost',
      message: 'No communication with MV Pacific Dawn for 4 hours. Last known position: 51.2°N, 1.4°E.',
      priority: 'high',
      timestamp: '2024-03-15T11:15:00Z',
      vessel: 'MV Pacific Dawn',
      actions: [
        { label: 'Search & Rescue', action: () => {}, variant: 'destructive' },
        { label: 'Check Last Position', action: () => {}, variant: 'secondary' }
      ]
    },
    {
      id: '4',
      type: 'warning',
      title: 'Port Congestion',
      message: 'Rotterdam port experiencing high congestion. Expect delays of 2-3 days for berth allocation.',
      priority: 'medium',
      timestamp: '2024-03-15T10:45:00Z',
      location: 'Port of Rotterdam',
      actions: [
        { label: 'Alternative Ports', action: () => {}, variant: 'secondary' }
      ]
    },
    {
      id: '5',
      type: 'success',
      title: 'Inspection Passed',
      message: 'MV Nordic Explorer successfully passed Port State Control inspection with zero deficiencies.',
      priority: 'low',
      timestamp: '2024-03-15T10:00:00Z',
      vessel: 'MV Nordic Explorer'
    }
  ];

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency': return <Zap className="h-5 w-5" />;
      case 'error': return <AlertTriangle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'success': return <CheckCircle className="h-5 w-5" />;
      case 'info': return <Info className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const criticalAlerts = alerts.filter(alert => alert.priority === 'critical').length;
  const highAlerts = alerts.filter(alert => alert.priority === 'high').length;

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Operations Alert Center</h2>
          <div className="flex gap-3">
            {criticalAlerts > 0 && (
              <div className="bg-red-100 border border-red-200 rounded px-3 py-1">
                <span className="text-red-800 font-medium">{criticalAlerts} Critical</span>
              </div>
            )}
            {highAlerts > 0 && (
              <div className="bg-orange-100 border border-orange-200 rounded px-3 py-1">
                <span className="text-orange-800 font-medium">{highAlerts} High Priority</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-red-50 rounded">
            <div className="text-lg font-bold text-red-600">
              {alerts.filter(a => a.type === 'emergency').length}
            </div>
            <div className="text-sm text-red-600">Emergency</div>
          </div>
          
          <div className="text-center p-3 bg-red-50 rounded">
            <div className="text-lg font-bold text-red-600">
              {alerts.filter(a => a.type === 'error').length}
            </div>
            <div className="text-sm text-red-600">Errors</div>
          </div>
          
          <div className="text-center p-3 bg-yellow-50 rounded">
            <div className="text-lg font-bold text-yellow-600">
              {alerts.filter(a => a.type === 'warning').length}
            </div>
            <div className="text-sm text-yellow-600">Warnings</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded">
            <div className="text-lg font-bold text-green-600">
              {alerts.filter(a => a.type === 'success').length}
            </div>
            <div className="text-sm text-green-600">Success</div>
          </div>
          
          <div className="text-center p-3 bg-blue-50 rounded">
            <div className="text-lg font-bold text-blue-600">
              {alerts.filter(a => a.type === 'info').length}
            </div>
            <div className="text-sm text-blue-600">Info</div>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <AlertNotification
            key={alert.id}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            priority={alert.priority}
            timestamp={alert.timestamp}
            showPriorityBadge={true}
            dismissible={alert.type !== 'emergency'}
            persistent={alert.type === 'emergency'}
            actions={alert.actions}
            onDismiss={() => dismissAlert(alert.id)}
            icon={getAlertIcon(alert.type)}
          />
        ))}
      </div>
    </div>
  );
}
```

## Real-Time Alert System

```jsx
function RealTimeAlertSystem() {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [alertHistory, setAlertHistory] = useState([]);

  // Simulate incoming alerts
  useEffect(() => {
    const alertTemplates = [
      {
        type: 'warning',
        title: 'High Winds',
        message: 'Wind speed exceeding 40 knots in operational area.',
        priority: 'medium'
      },
      {
        type: 'error',
        title: 'Equipment Failure',
        message: 'Radar system malfunction reported.',
        priority: 'high'
      },
      {
        type: 'info',
        title: 'Port Update',
        message: 'New berth availability at Singapore port.',
        priority: 'low'
      }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new alert
        const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
        const newAlert = {
          id: Date.now().toString(),
          ...template,
          timestamp: new Date().toISOString(),
          vessel: `MV ${['Atlantic Star', 'Pacific Dawn', 'Nordic Explorer'][Math.floor(Math.random() * 3)]}`
        };

        setActiveAlerts(prev => [newAlert, ...prev].slice(0, 10)); // Keep only 10 active alerts
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (alertId) => {
    const alert = activeAlerts.find(a => a.id === alertId);
    if (alert) {
      setAlertHistory(prev => [{ ...alert, dismissedAt: new Date().toISOString() }, ...prev].slice(0, 50));
      setActiveAlerts(prev => prev.filter(a => a.id !== alertId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Alert Feed */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Live Alert Feed</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Updates
          </div>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
            <p>All systems operational - no active alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <AlertNotification
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={`${alert.vessel}: ${alert.message}`}
                priority={alert.priority}
                timestamp={alert.timestamp}
                showPriorityBadge={true}
                dismissible={true}
                onDismiss={() => dismissAlert(alert.id)}
                actions={[
                  { label: 'Acknowledge', action: () => dismissAlert(alert.id), variant: 'primary' },
                  { label: 'Details', action: () => console.log('View details'), variant: 'secondary' }
                ]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Alert History */}
      {alertHistory.length > 0 && (
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-medium mb-4">Recent Alert History</h3>
          <div className="space-y-2">
            {alertHistory.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                <div className="flex-1">
                  <span className="font-medium">{alert.title}</span>
                  <span className="text-gray-600 ml-2">- {alert.vessel}</span>
                </div>
                <div className="text-gray-500">
                  Dismissed {new Date(alert.dismissedAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Emergency Alert Protocol

```jsx
function EmergencyAlertProtocol() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyDetails, setEmergencyDetails] = useState(null);

  const triggerEmergency = (type) => {
    const emergencyTypes = {
      fire: {
        title: 'FIRE EMERGENCY',
        message: 'Fire detected in engine room. All crew to muster stations immediately.',
        protocol: ['Sound general alarm', 'Crew to muster stations', 'Activate fire suppression', 'Contact Coast Guard']
      },
      mayday: {
        title: 'MAYDAY EMERGENCY',
        message: 'Vessel taking on water rapidly. Immediate assistance required.',
        protocol: ['Send Mayday signal', 'Prepare lifeboats', 'Don life jackets', 'Coordinate rescue']
      },
      collision: {
        title: 'COLLISION ALERT',
        message: 'Collision with another vessel. Assessing damage and casualties.',
        protocol: ['Stop engines', 'Assess damage', 'Check for injuries', 'Report to authorities']
      }
    };

    setEmergencyDetails(emergencyTypes[type]);
    setEmergencyActive(true);
  };

  const acknowledgeEmergency = () => {
    setEmergencyActive(false);
    setEmergencyDetails(null);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Trigger Buttons (for demo) */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-medium mb-4">Emergency Simulation (Demo Only)</h3>
        <div className="flex gap-3">
          <button 
            onClick={() => triggerEmergency('fire')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Simulate Fire Emergency
          </button>
          <button 
            onClick={() => triggerEmergency('mayday')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Simulate Mayday
          </button>
          <button 
            onClick={() => triggerEmergency('collision')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Simulate Collision
          </button>
        </div>
      </div>

      {/* Emergency Alert */}
      {emergencyActive && emergencyDetails && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-red-600 rounded-lg p-8 max-w-2xl w-full mx-4">
            <AlertNotification
              type="emergency"
              title={emergencyDetails.title}
              message={emergencyDetails.message}
              priority="critical"
              timestamp={new Date().toISOString()}
              persistent={true}
              showPriorityBadge={true}
              className="mb-6"
            />

            <div className="mb-6">
              <h4 className="font-bold text-red-800 mb-3">EMERGENCY PROTOCOL:</h4>
              <ol className="list-decimal list-inside space-y-2">
                {emergencyDetails.protocol.map((step, index) => (
                  <li key={index} className="text-red-700">{step}</li>
                ))}
              </ol>
            </div>

            <div className="flex gap-3 justify-center">
              <button 
                onClick={acknowledgeEmergency}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold"
              >
                ACKNOWLEDGE EMERGENCY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Key Features
- **Maritime-Specific Types**: Emergency, safety, operational, and system alerts
- **Priority Levels**: Critical, high, medium, and low priority classification
- **Action Integration**: Built-in action buttons for immediate response
- **Persistence Control**: Persistent alerts for critical situations
- **Real-Time Updates**: Live alert feed with automatic updates
- **Emergency Protocols**: Special handling for emergency situations
- **Visual Hierarchy**: Color coding and icons for quick identification
- **Dismissal Management**: Controlled dismissal with history tracking

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Alert Type Colors
- **Emergency**: Dark Red (#dc2626) - Critical emergencies
- **Error**: Red (#ef4444) - System errors and failures
- **Warning**: Yellow (#eab308) - Cautions and advisories
- **Success**: Green (#22c55e) - Successful operations
- **Info**: Blue (#3b82f6) - General information

## Best Practices
1. **Priority Classification**: Use appropriate priority levels for alert severity
2. **Clear Messaging**: Write concise, actionable alert messages
3. **Emergency Handling**: Implement special protocols for emergency alerts
4. **Action Integration**: Provide relevant actions for each alert type
5. **Real-Time Updates**: Update alerts in real-time for operational situations
6. **Alert History**: Maintain history of dismissed alerts for review
7. **Accessibility**: Ensure alerts are accessible to all users including screen readers

## Common Use Cases
- Emergency response systems
- Fleet monitoring alerts
- Safety notification systems
- Weather and navigation warnings
- Equipment malfunction alerts
- Compliance and inspection notifications
- Port and terminal updates
- Communication system alerts
- Maintenance reminders
- Regulatory compliance notifications