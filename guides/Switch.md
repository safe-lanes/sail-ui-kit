# Switch Component Guide

## Overview
The Switch component provides toggle controls for maritime applications. It enables binary state management for vessel systems, crew settings, and operational features with TMSA-compliant styling optimized for fleet management interfaces.

## Component Interface

```typescript
interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Clear States**: Distinct on/off visual states
- **Accessibility**: Keyboard navigation and screen reader support
- **Touch-Friendly**: Optimized for mobile and tablet interfaces
- **Form Integration**: Works with form libraries and validation

## Basic Usage

```tsx
import { Switch } from 'scomp-ui/sail-ui-kit';
import { Label } from 'scomp-ui/sail-ui-kit';

function VesselSystemControls() {
  const [systemStates, setSystemStates] = useState({
    autopilot: false,
    radar: true,
    ais: true,
    navigation: true,
    emergency: false
  });

  const handleSystemToggle = (system: keyof typeof systemStates) => {
    setSystemStates(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Vessel System Controls
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="autopilot" className="text-sm font-medium text-gray-900">
              Autopilot System
            </Label>
            <p className="text-sm text-gray-500">
              Automatic navigation control
            </p>
          </div>
          <Switch
            id="autopilot"
            checked={systemStates.autopilot}
            onCheckedChange={() => handleSystemToggle('autopilot')}
            className="data-[state=checked]:bg-[#16569e]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="radar" className="text-sm font-medium text-gray-900">
              Radar System
            </Label>
            <p className="text-sm text-gray-500">
              Navigation radar active
            </p>
          </div>
          <Switch
            id="radar"
            checked={systemStates.radar}
            onCheckedChange={() => handleSystemToggle('radar')}
            className="data-[state=checked]:bg-[#16569e]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="ais" className="text-sm font-medium text-gray-900">
              AIS Transponder
            </Label>
            <p className="text-sm text-gray-500">
              Automatic Identification System
            </p>
          </div>
          <Switch
            id="ais"
            checked={systemStates.ais}
            onCheckedChange={() => handleSystemToggle('ais')}
            className="data-[state=checked]:bg-[#16569e]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="navigation" className="text-sm font-medium text-gray-900">
              Navigation Lights
            </Label>
            <p className="text-sm text-gray-500">
              Vessel navigation lighting
            </p>
          </div>
          <Switch
            id="navigation"
            checked={systemStates.navigation}
            onCheckedChange={() => handleSystemToggle('navigation')}
            className="data-[state=checked]:bg-[#16569e]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emergency" className="text-sm font-medium text-gray-900">
              Emergency Beacon
            </Label>
            <p className="text-sm text-gray-500">
              Distress signal transmitter
            </p>
          </div>
          <Switch
            id="emergency"
            checked={systemStates.emergency}
            onCheckedChange={() => handleSystemToggle('emergency')}
            className="data-[state=checked]:bg-red-600"
          />
        </div>
      </div>
    </div>
  );
}
```

## Crew Notification Settings

```tsx
interface NotificationSettings {
  emailAlerts: boolean;
  smsNotifications: boolean;
  emergencyContacts: boolean;
  scheduleReminders: boolean;
  certificationAlerts: boolean;
  performanceUpdates: boolean;
  systemMaintenance: boolean;
}

function CrewNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailAlerts: true,
    smsNotifications: false,
    emergencyContacts: true,
    scheduleReminders: true,
    certificationAlerts: true,
    performanceUpdates: false,
    systemMaintenance: true
  });

  const handleSettingChange = (setting: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const notificationCategories = [
    {
      title: "Communication Preferences",
      settings: [
        {
          key: 'emailAlerts' as keyof NotificationSettings,
          label: 'Email Alerts',
          description: 'Receive notifications via email',
          important: false
        },
        {
          key: 'smsNotifications' as keyof NotificationSettings,
          label: 'SMS Notifications',
          description: 'Text messages for urgent updates',
          important: false
        },
        {
          key: 'emergencyContacts' as keyof NotificationSettings,
          label: 'Emergency Contacts',
          description: 'Critical emergency notifications',
          important: true
        }
      ]
    },
    {
      title: "Schedule & Training",
      settings: [
        {
          key: 'scheduleReminders' as keyof NotificationSettings,
          label: 'Schedule Reminders',
          description: 'Shift and assignment reminders',
          important: false
        },
        {
          key: 'certificationAlerts' as keyof NotificationSettings,
          label: 'Certification Alerts',
          description: 'Certificate renewal reminders',
          important: true
        },
        {
          key: 'performanceUpdates' as keyof NotificationSettings,
          label: 'Performance Updates',
          description: 'Appraisal and review notifications',
          important: false
        }
      ]
    },
    {
      title: "System Notifications",
      settings: [
        {
          key: 'systemMaintenance' as keyof NotificationSettings,
          label: 'System Maintenance',
          description: 'Planned system downtime alerts',
          important: false
        }
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#16569e] mb-2">
          Notification Preferences
        </h2>
        <p className="text-gray-600">
          Manage how you receive updates and alerts about crew operations
        </p>
      </div>

      <div className="space-y-8">
        {notificationCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {category.title}
            </h3>
            
            <div className="space-y-4">
              {category.settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Label 
                        htmlFor={setting.key} 
                        className="text-sm font-medium text-gray-900"
                      >
                        {setting.label}
                      </Label>
                      {setting.important && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Important
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={setting.key}
                    checked={settings[setting.key]}
                    onCheckedChange={() => handleSettingChange(setting.key)}
                    className={`${
                      setting.important 
                        ? 'data-[state=checked]:bg-red-600' 
                        : 'data-[state=checked]:bg-[#16569e]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex space-x-4">
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Reset to Defaults
          </button>
          <button className="flex-1 px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Fleet Management Dashboard Toggles

```tsx
function FleetDashboardSettings() {
  const [dashboardSettings, setDashboardSettings] = useState({
    liveTracking: true,
    weatherOverlay: true,
    trafficInfo: false,
    portAlerts: true,
    fuelOptimization: true,
    maintenanceAlerts: true,
    complianceMonitoring: true,
    emergencyProtocols: true,
    automaticReports: false,
    realTimeUpdates: true
  });

  const handleToggle = (setting: keyof typeof dashboardSettings) => {
    setDashboardSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const settingsGroups = [
    {
      title: "Navigation & Tracking",
      icon: Navigation,
      settings: [
        { key: 'liveTracking', label: 'Live Vessel Tracking', desc: 'Real-time position updates' },
        { key: 'weatherOverlay', label: 'Weather Overlay', desc: 'Display weather conditions on map' },
        { key: 'trafficInfo', label: 'Traffic Information', desc: 'Show vessel traffic density' }
      ]
    },
    {
      title: "Alerts & Monitoring",
      icon: AlertTriangle,
      settings: [
        { key: 'portAlerts', label: 'Port Alerts', desc: 'Notifications for port operations' },
        { key: 'maintenanceAlerts', label: 'Maintenance Alerts', desc: 'Equipment service reminders' },
        { key: 'complianceMonitoring', label: 'Compliance Monitoring', desc: 'TMSA and regulatory tracking' },
        { key: 'emergencyProtocols', label: 'Emergency Protocols', desc: 'Automatic emergency response' }
      ]
    },
    {
      title: "Optimization & Reports",
      icon: BarChart,
      settings: [
        { key: 'fuelOptimization', label: 'Fuel Optimization', desc: 'Route and speed recommendations' },
        { key: 'automaticReports', label: 'Automatic Reports', desc: 'Scheduled report generation' },
        { key: 'realTimeUpdates', label: 'Real-time Updates', desc: 'Live data synchronization' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#16569e] mb-2">
          Dashboard Configuration
        </h3>
        <p className="text-sm text-gray-600">
          Customize your fleet management dashboard features
        </p>
      </div>

      <div className="space-y-6">
        {settingsGroups.map((group, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <group.icon className="h-5 w-5 text-[#16569e]" />
              <h4 className="text-base font-semibold text-gray-900">
                {group.title}
              </h4>
            </div>
            
            <div className="space-y-3">
              {group.settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label 
                      htmlFor={setting.key}
                      className="text-sm font-medium text-gray-900 block"
                    >
                      {setting.label}
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      {setting.desc}
                    </p>
                  </div>
                  <Switch
                    id={setting.key}
                    checked={dashboardSettings[setting.key as keyof typeof dashboardSettings]}
                    onCheckedChange={() => handleToggle(setting.key as keyof typeof dashboardSettings)}
                    className="data-[state=checked]:bg-[#16569e]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-blue-800">
              Performance Impact
            </h5>
            <p className="text-sm text-blue-700 mt-1">
              Enabling real-time features may increase data usage. Consider your connection when operating in remote waters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Safety System Toggles

```tsx
function SafetySystemControls() {
  const [safetyStates, setSafetyStates] = useState({
    fireSuppressionAuto: true,
    bilgeAlarmAuto: true,
    emergencyLighting: false,
    gasDetectionAuto: true,
    waterTightDoors: false,
    lifeRaftRelease: false,
    generalAlarm: false,
    maydayTransmitter: false
  });

  const handleSafetyToggle = (system: keyof typeof safetyStates) => {
    setSafetyStates(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  const criticalSystems = ['fireSuppressionAuto', 'bilgeAlarmAuto', 'gasDetectionAuto'];
  const emergencySystems = ['emergencyLighting', 'lifeRaftRelease', 'generalAlarm', 'maydayTransmitter'];

  const safetyControls = [
    {
      id: 'fireSuppressionAuto',
      label: 'Fire Suppression Auto',
      description: 'Automatic fire suppression system',
      critical: true
    },
    {
      id: 'bilgeAlarmAuto',
      label: 'Bilge Alarm Auto',
      description: 'Automatic bilge water detection',
      critical: true
    },
    {
      id: 'gasDetectionAuto',
      label: 'Gas Detection Auto',
      description: 'Automatic gas leak detection',
      critical: true
    },
    {
      id: 'emergencyLighting',
      label: 'Emergency Lighting',
      description: 'Emergency escape route lighting',
      critical: false
    },
    {
      id: 'waterTightDoors',
      label: 'Watertight Doors',
      description: 'Remote watertight door control',
      critical: false
    },
    {
      id: 'lifeRaftRelease',
      label: 'Life Raft Release',
      description: 'Hydrostatic life raft release',
      critical: false
    },
    {
      id: 'generalAlarm',
      label: 'General Alarm',
      description: 'Ship-wide alarm system',
      critical: false
    },
    {
      id: 'maydayTransmitter',
      label: 'EPIRB Transmitter',
      description: 'Emergency position beacon',
      critical: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-red-600">
            Safety System Controls
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          Configure automatic safety systems and emergency equipment
        </p>
      </div>

      {/* Critical Systems */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h4 className="text-base font-semibold text-red-600">
            Critical Safety Systems
          </h4>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="space-y-4">
            {safetyControls.filter(control => control.critical).map((control) => (
              <div key={control.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <Label 
                    htmlFor={control.id}
                    className="text-sm font-medium text-gray-900 block"
                  >
                    {control.label}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {control.description}
                  </p>
                </div>
                <Switch
                  id={control.id}
                  checked={safetyStates[control.id as keyof typeof safetyStates]}
                  onCheckedChange={() => handleSafetyToggle(control.id as keyof typeof safetyStates)}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Systems */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-5 w-5 text-orange-600" />
          <h4 className="text-base font-semibold text-orange-600">
            Emergency Systems
          </h4>
        </div>
        <div className="space-y-4">
          {safetyControls.filter(control => !control.critical).map((control) => (
            <div key={control.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <Label 
                  htmlFor={control.id}
                  className="text-sm font-medium text-gray-900 block"
                >
                  {control.label}
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  {control.description}
                </p>
              </div>
              <Switch
                id={control.id}
                checked={safetyStates[control.id as keyof typeof safetyStates]}
                onCheckedChange={() => handleSafetyToggle(control.id as keyof typeof safetyStates)}
                className="data-[state=checked]:bg-orange-600"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-yellow-800">
              Safety Notice
            </h5>
            <p className="text-sm text-yellow-700 mt-1">
              Changes to safety systems require authorization from the Chief Engineer or Captain. 
              All modifications are logged for regulatory compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Form Integration Example

```tsx
function CrewMemberForm() {
  const [formData, setFormData] = useState({
    availableForOvertime: false,
    receiveEmailUpdates: true,
    emergencyContactPermission: true,
    traineeStatus: false,
    medicalClearance: true,
    securityClearance: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-[#16569e] mb-6">
        Crew Member Preferences
      </h2>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Work Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="overtime" className="text-sm font-medium text-gray-900">
                  Available for Overtime
                </Label>
                <p className="text-sm text-gray-500">
                  Willing to work additional hours when needed
                </p>
              </div>
              <Switch
                id="overtime"
                checked={formData.availableForOvertime}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({...prev, availableForOvertime: checked}))
                }
                className="data-[state=checked]:bg-[#16569e]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="trainee" className="text-sm font-medium text-gray-900">
                  Trainee Status
                </Label>
                <p className="text-sm text-gray-500">
                  Currently in training program
                </p>
              </div>
              <Switch
                id="trainee"
                checked={formData.traineeStatus}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({...prev, traineeStatus: checked}))
                }
                className="data-[state=checked]:bg-[#16569e]"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Communication Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-updates" className="text-sm font-medium text-gray-900">
                  Email Updates
                </Label>
                <p className="text-sm text-gray-500">
                  Receive schedule and policy updates via email
                </p>
              </div>
              <Switch
                id="email-updates"
                checked={formData.receiveEmailUpdates}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({...prev, receiveEmailUpdates: checked}))
                }
                className="data-[state=checked]:bg-[#16569e]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emergency-contact" className="text-sm font-medium text-gray-900">
                  Emergency Contact Permission
                </Label>
                <p className="text-sm text-gray-500">
                  Allow contact of emergency contacts in case of incident
                </p>
              </div>
              <Switch
                id="emergency-contact"
                checked={formData.emergencyContactPermission}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({...prev, emergencyContactPermission: checked}))
                }
                className="data-[state=checked]:bg-red-600"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Clearances
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="medical" className="text-sm font-medium text-gray-900">
                  Medical Clearance
                </Label>
                <p className="text-sm text-gray-500">
                  Current medical certificate is valid
                </p>
              </div>
              <Switch
                id="medical"
                checked={formData.medicalClearance}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({...prev, medicalClearance: checked}))
                }
                className="data-[state=checked]:bg-green-600"
                disabled
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="security" className="text-sm font-medium text-gray-900">
                  Security Clearance
                </Label>
                <p className="text-sm text-gray-500">
                  Enhanced security background check completed
                </p>
              </div>
              <Switch
                id="security"
                checked={formData.securityClearance}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({...prev, securityClearance: checked}))
                }
                className="data-[state=checked]:bg-[#16569e]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex space-x-4">
        <button
          type="button"
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </form>
  );
}
```

## Best Practices

1. **Clear Labeling**: Use descriptive labels that explain the toggle's purpose
2. **Visual Feedback**: Provide immediate visual response to state changes
3. **Contextual Colors**: Use appropriate colors for different system types (safety = red, normal = blue)
4. **Grouping**: Organize related toggles into logical sections
5. **Confirmation**: Consider confirmation dialogs for critical system changes
6. **Accessibility**: Ensure keyboard navigation and screen reader support

## Context Requirements

The Switch component works with:
- **Form Libraries**: Integration with react-hook-form and validation
- **State Management**: Boolean state handling and persistence
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Keyboard navigation and ARIA attributes

## Troubleshooting

### Common Issues

**Switch not toggling**
```tsx
// Ensure proper controlled component pattern
const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onCheckedChange={setChecked}
/>
```

**Styling not applying**
```tsx
// Use data attributes for switch styling
<Switch
  className="data-[state=checked]:bg-[#16569e] data-[state=unchecked]:bg-gray-200"
  checked={isOn}
  onCheckedChange={setIsOn}
/>
```

**Form integration issues**
```tsx
// Use proper form integration with react-hook-form
const { control } = useForm();

<Controller
  name="systemEnabled"
  control={control}
  render={({ field }) => (
    <Switch
      checked={field.value}
      onCheckedChange={field.onChange}
    />
  )}
/>
```