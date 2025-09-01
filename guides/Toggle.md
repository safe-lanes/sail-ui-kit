# Toggle Component Guide

## Overview
The Toggle component provides individual toggle controls for maritime applications. It enables binary state management for individual features, settings, and system controls with TMSA-compliant styling optimized for fleet management interfaces.

## Component Interface

```typescript
interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Clear States**: Distinct pressed/unpressed visual states
- **Icon Support**: Compatible with icons and text content
- **Accessibility**: Keyboard navigation and screen reader support
- **Form Integration**: Works with form libraries and validation

## Basic Usage

```tsx
import { Toggle } from 'scomp-ui/sail-ui-kit';

function VesselSystemToggles() {
  const [systemStates, setSystemStates] = useState({
    autopilot: false,
    radar: true,
    ais: true,
    navigation: true,
    anchor: false
  });

  const toggleSystem = (system: keyof typeof systemStates) => {
    setSystemStates(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Navigation Systems
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center space-y-2">
          <Toggle
            pressed={systemStates.autopilot}
            onPressedChange={() => toggleSystem('autopilot')}
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-16 h-16 rounded-lg"
          >
            <Navigation className="h-6 w-6" />
          </Toggle>
          <span className="text-sm font-medium text-gray-700">Autopilot</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Toggle
            pressed={systemStates.radar}
            onPressedChange={() => toggleSystem('radar')}
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-16 h-16 rounded-lg"
          >
            <Radar className="h-6 w-6" />
          </Toggle>
          <span className="text-sm font-medium text-gray-700">Radar</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Toggle
            pressed={systemStates.ais}
            onPressedChange={() => toggleSystem('ais')}
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-16 h-16 rounded-lg"
          >
            <Radio className="h-6 w-6" />
          </Toggle>
          <span className="text-sm font-medium text-gray-700">AIS</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Toggle
            pressed={systemStates.navigation}
            onPressedChange={() => toggleSystem('navigation')}
            className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white w-16 h-16 rounded-lg"
          >
            <Lightbulb className="h-6 w-6" />
          </Toggle>
          <span className="text-sm font-medium text-gray-700">Nav Lights</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Toggle
            pressed={systemStates.anchor}
            onPressedChange={() => toggleSystem('anchor')}
            className="data-[state=on]:bg-yellow-600 data-[state=on]:text-white w-16 h-16 rounded-lg"
          >
            <Anchor className="h-6 w-6" />
          </Toggle>
          <span className="text-sm font-medium text-gray-700">Anchor Light</span>
        </div>
      </div>
    </div>
  );
}
```

## Crew Task Assignment Toggles

```tsx
interface CrewTask {
  id: string;
  name: string;
  description: string;
  assigned: boolean;
  priority: 'low' | 'medium' | 'high';
  department: string;
}

function CrewTaskAssignmentToggles() {
  const [tasks, setTasks] = useState<CrewTask[]>([
    {
      id: '1',
      name: 'Bridge Watch',
      description: 'Navigation watch duty',
      assigned: true,
      priority: 'high',
      department: 'Navigation'
    },
    {
      id: '2',
      name: 'Engine Inspection',
      description: 'Daily engine room rounds',
      assigned: false,
      priority: 'medium',
      department: 'Engineering'
    },
    {
      id: '3',
      name: 'Safety Drill',
      description: 'Weekly fire drill coordinator',
      assigned: true,
      priority: 'high',
      department: 'Safety'
    },
    {
      id: '4',
      name: 'Cargo Monitoring',
      description: 'Cargo hold temperature checks',
      assigned: false,
      priority: 'low',
      department: 'Deck'
    },
    {
      id: '5',
      name: 'Radio Communication',
      description: 'Port communication management',
      assigned: true,
      priority: 'medium',
      department: 'Navigation'
    }
  ]);

  const toggleTaskAssignment = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, assigned: !task.assigned }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Navigation': return Navigation;
      case 'Engineering': return Cog;
      case 'Safety': return Shield;
      case 'Deck': return Package;
      default: return FileText;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#16569e] mb-2">
          Crew Task Assignment
        </h3>
        <p className="text-gray-600">
          Assign or unassign tasks for the current crew member
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          const IconComponent = getDepartmentIcon(task.department);
          return (
            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <IconComponent className="h-8 w-8 text-[#16569e]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-base font-semibold text-gray-900">
                      {task.name}
                    </h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Department: {task.department}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {task.assigned ? 'Assigned' : 'Unassigned'}
                </div>
                <Toggle
                  pressed={task.assigned}
                  onPressedChange={() => toggleTaskAssignment(task.id)}
                  className={`data-[state=on]:${getPriorityColor(task.priority)} data-[state=on]:text-white px-4 py-2 rounded-md font-medium`}
                >
                  {task.assigned ? (
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4" />
                      <span>Assigned</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Assign</span>
                    </div>
                  )}
                </Toggle>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-blue-800">
              Assignment Summary
            </h5>
            <p className="text-sm text-blue-700 mt-1">
              {tasks.filter(t => t.assigned).length} of {tasks.length} tasks assigned. 
              High priority tasks should always be assigned to qualified crew members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Vessel Feature Toggles

```tsx
function VesselFeatureToggles() {
  const [features, setFeatures] = useState({
    liveTracking: true,
    fuelOptimization: false,
    weatherRouting: true,
    automaticReporting: false,
    emergencyAlert: true,
    maintenanceAlerts: true,
    complianceMonitoring: false,
    crewNotifications: true
  });

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const featureGroups = [
    {
      title: "Navigation & Operations",
      features: [
        {
          key: 'liveTracking',
          label: 'Live Tracking',
          description: 'Real-time vessel position updates',
          icon: MapPin,
          premium: false
        },
        {
          key: 'weatherRouting',
          label: 'Weather Routing',
          description: 'Optimized routes based on weather conditions',
          icon: Cloud,
          premium: true
        },
        {
          key: 'fuelOptimization',
          label: 'Fuel Optimization',
          description: 'AI-powered fuel consumption optimization',
          icon: Fuel,
          premium: true
        }
      ]
    },
    {
      title: "Monitoring & Alerts",
      features: [
        {
          key: 'emergencyAlert',
          label: 'Emergency Alerts',
          description: 'Automatic emergency response system',
          icon: AlertTriangle,
          premium: false
        },
        {
          key: 'maintenanceAlerts',
          label: 'Maintenance Alerts',
          description: 'Scheduled maintenance notifications',
          icon: Settings,
          premium: false
        },
        {
          key: 'complianceMonitoring',
          label: 'Compliance Monitoring',
          description: 'TMSA and regulatory compliance tracking',
          icon: Shield,
          premium: true
        }
      ]
    },
    {
      title: "Communication",
      features: [
        {
          key: 'automaticReporting',
          label: 'Automatic Reporting',
          description: 'Scheduled report generation and delivery',
          icon: FileText,
          premium: true
        },
        {
          key: 'crewNotifications',
          label: 'Crew Notifications',
          description: 'Push notifications to crew devices',
          icon: Bell,
          premium: false
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#16569e] mb-2">
          Vessel Feature Configuration
        </h3>
        <p className="text-gray-600">
          Enable or disable features for your vessel operations
        </p>
      </div>

      <div className="space-y-8">
        {featureGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {group.title}
            </h4>
            
            <div className="space-y-4">
              {group.features.map((feature) => (
                <div key={feature.key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-[#16569e]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="text-base font-medium text-gray-900">
                          {feature.label}
                        </h5>
                        {feature.premium && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <Toggle
                    pressed={features[feature.key as keyof typeof features]}
                    onPressedChange={() => toggleFeature(feature.key as keyof typeof features)}
                    disabled={feature.premium && !features[feature.key as keyof typeof features]}
                    className={`
                      data-[state=on]:bg-[#16569e] data-[state=on]:text-white 
                      px-6 py-3 rounded-lg font-medium transition-colors
                      ${feature.premium ? 'data-[state=off]:bg-yellow-100 data-[state=off]:text-yellow-800' : ''}
                    `}
                  >
                    {features[feature.key as keyof typeof features] ? (
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4" />
                        <span>Enabled</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <X className="h-4 w-4" />
                        <span>Disabled</span>
                      </div>
                    )}
                  </Toggle>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Star className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-yellow-800">
                Premium Features
              </h5>
              <p className="text-sm text-yellow-700 mt-1">
                Some features require a premium subscription. Contact your fleet manager to upgrade your plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Safety Equipment Toggles

```tsx
function SafetyEquipmentToggles() {
  const [safetyEquipment, setSafetyEquipment] = useState({
    fireExtinguishers: true,
    smokeDetectors: true,
    co2Suppression: false,
    lifeRafts: true,
    emergencyLights: false,
    gasDetectors: true,
    bilgeAlarms: true,
    epirb: true
  });

  const toggleEquipment = (equipment: keyof typeof safetyEquipment) => {
    setSafetyEquipment(prev => ({
      ...prev,
      [equipment]: !prev[equipment]
    }));
  };

  const safetyItems = [
    {
      key: 'fireExtinguishers',
      label: 'Fire Extinguishers',
      description: 'Portable fire fighting equipment',
      icon: Fire,
      critical: true
    },
    {
      key: 'smokeDetectors',
      label: 'Smoke Detectors',
      description: 'Automatic fire detection system',
      icon: Eye,
      critical: true
    },
    {
      key: 'co2Suppression',
      label: 'CO2 Suppression',
      description: 'Engine room fire suppression',
      icon: Wind,
      critical: true
    },
    {
      key: 'lifeRafts',
      label: 'Life Rafts',
      description: 'Emergency evacuation equipment',
      icon: CircleHelp,
      critical: true
    },
    {
      key: 'emergencyLights',
      label: 'Emergency Lighting',
      description: 'Emergency escape route lighting',
      icon: Lightbulb,
      critical: false
    },
    {
      key: 'gasDetectors',
      label: 'Gas Detectors',
      description: 'Toxic gas detection system',
      icon: AlertTriangle,
      critical: true
    },
    {
      key: 'bilgeAlarms',
      label: 'Bilge Alarms',
      description: 'Water ingress detection',
      icon: Droplets,
      critical: true
    },
    {
      key: 'epirb',
      label: 'EPIRB',
      description: 'Emergency position beacon',
      icon: Radio,
      critical: true
    }
  ];

  const criticalEquipment = safetyItems.filter(item => item.critical);
  const nonCriticalEquipment = safetyItems.filter(item => !item.critical);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-6 w-6 text-red-600" />
          <h3 className="text-xl font-bold text-red-600">
            Safety Equipment Status
          </h3>
        </div>
        <p className="text-gray-600">
          Monitor and control safety equipment systems
        </p>
      </div>

      {/* Critical Equipment */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Critical Safety Equipment</span>
        </h4>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalEquipment.map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {item.description}
                    </div>
                  </div>
                </div>
                
                <Toggle
                  pressed={safetyEquipment[item.key as keyof typeof safetyEquipment]}
                  onPressedChange={() => toggleEquipment(item.key as keyof typeof safetyEquipment)}
                  className="data-[state=on]:bg-green-600 data-[state=on]:text-white data-[state=off]:bg-red-600 data-[state=off]:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {safetyEquipment[item.key as keyof typeof safetyEquipment] ? (
                    <div className="flex items-center space-x-1">
                      <Check className="h-3 w-3" />
                      <span>OK</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <X className="h-3 w-3" />
                      <span>FAIL</span>
                    </div>
                  )}
                </Toggle>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Non-Critical Equipment */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Secondary Safety Equipment
        </h4>
        
        <div className="space-y-3">
          {nonCriticalEquipment.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 text-[#16569e]" />
                <div>
                  <div className="text-base font-medium text-gray-900">
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.description}
                  </div>
                </div>
              </div>
              
              <Toggle
                pressed={safetyEquipment[item.key as keyof typeof safetyEquipment]}
                onPressedChange={() => toggleEquipment(item.key as keyof typeof safetyEquipment)}
                className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white px-4 py-2 rounded-md font-medium"
              >
                {safetyEquipment[item.key as keyof typeof safetyEquipment] ? 'Active' : 'Inactive'}
              </Toggle>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-yellow-800">
              Safety Notice
            </h5>
            <p className="text-sm text-yellow-700 mt-1">
              All critical safety equipment must be operational before departure. 
              Any equipment showing "FAIL" status requires immediate attention from qualified personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Compact Toggle Buttons

```tsx
function CompactToggleButtons() {
  const [quickActions, setQuickActions] = useState({
    bookmark: false,
    favorite: false,
    notify: true,
    share: false,
    archive: false
  });

  const toggleAction = (action: keyof typeof quickActions) => {
    setQuickActions(prev => ({
      ...prev,
      [action]: !prev[action]
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        Quick Actions
      </h3>
      
      <div className="flex space-x-2">
        <Toggle
          pressed={quickActions.bookmark}
          onPressedChange={() => toggleAction('bookmark')}
          className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white p-2 rounded-md"
          aria-label="Bookmark"
        >
          <Bookmark className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={quickActions.favorite}
          onPressedChange={() => toggleAction('favorite')}
          className="data-[state=on]:bg-red-500 data-[state=on]:text-white p-2 rounded-md"
          aria-label="Favorite"
        >
          <Heart className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={quickActions.notify}
          onPressedChange={() => toggleAction('notify')}
          className="data-[state=on]:bg-green-500 data-[state=on]:text-white p-2 rounded-md"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={quickActions.share}
          onPressedChange={() => toggleAction('share')}
          className="data-[state=on]:bg-blue-500 data-[state=on]:text-white p-2 rounded-md"
          aria-label="Share"
        >
          <Share className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={quickActions.archive}
          onPressedChange={() => toggleAction('archive')}
          className="data-[state=on]:bg-gray-500 data-[state=on]:text-white p-2 rounded-md"
          aria-label="Archive"
        >
          <Archive className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Clear Visual States**: Ensure pressed/unpressed states are clearly distinguishable
2. **Appropriate Icons**: Use relevant maritime icons that match the toggle function
3. **Consistent Sizing**: Maintain consistent toggle sizes within groups
4. **Color Coding**: Use colors meaningfully (red for critical, green for normal)
5. **Accessibility**: Provide proper ARIA labels and keyboard support
6. **State Feedback**: Give clear visual and text feedback about current state

## Context Requirements

The Toggle component works with:
- **Form Libraries**: Integration with react-hook-form and validation
- **State Management**: Boolean state handling and persistence
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Keyboard navigation and ARIA attributes

## Troubleshooting

### Common Issues

**Toggle not changing state**
```tsx
// Ensure proper controlled component pattern
const [pressed, setPressed] = useState(false);

<Toggle
  pressed={pressed}
  onPressedChange={setPressed}
>
  Toggle Text
</Toggle>
```

**Styling not applying correctly**
```tsx
// Use data attributes for proper toggle styling
<Toggle
  className="data-[state=on]:bg-[#16569e] data-[state=on]:text-white data-[state=off]:bg-gray-200"
  pressed={isPressed}
  onPressedChange={setIsPressed}
>
  Content
</Toggle>
```

**Accessibility issues**
```tsx
// Provide proper ARIA labels for icon-only toggles
<Toggle
  pressed={isActive}
  onPressedChange={setIsActive}
  aria-label="Enable autopilot system"
>
  <Navigation className="h-4 w-4" />
</Toggle>
```