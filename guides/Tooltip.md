# Tooltip Component Guide

## Overview
The Tooltip component provides contextual information overlays for maritime applications. It displays helpful hints, explanations, and additional details for UI elements in TMSA-compliant fleet management systems.

## Component Interface

```typescript
interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  delayDuration?: number;
  skipDelayDuration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue accents
- **Smart Positioning**: Automatic positioning with collision detection
- **Rich Content**: Support for text, icons, and formatted content
- **Accessibility**: Screen reader support and keyboard navigation
- **Performance**: Optimized rendering and minimal DOM impact

## Basic Usage

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'scomp-ui/sail-ui-kit';

function VesselStatusTooltips() {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#16569e]">
          Vessel Status Dashboard
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Engine Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Engine</span>
              <Tooltip>
                <TooltipTrigger>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Engine operating normally</p>
                  <p className="text-xs text-gray-300">Last check: 2 hours ago</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-2xl font-bold text-green-600">Normal</div>
          </div>

          {/* Navigation Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Navigation</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#16569e]" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Navigation Systems</p>
                    <p className="text-sm">• GPS: Active</p>
                    <p className="text-sm">• Radar: Active</p>
                    <p className="text-sm">• AIS: Active</p>
                    <p className="text-sm">• Autopilot: Standby</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-2xl font-bold text-[#16569e]">Active</div>
          </div>

          {/* Communication Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Communication</span>
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="space-y-1">
                    <p className="font-medium text-yellow-600">Limited Range</p>
                    <p className="text-sm">Radio range reduced due to weather conditions</p>
                    <p className="text-xs text-gray-300">Expected improvement in 4 hours</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-2xl font-bold text-yellow-600">Limited</div>
          </div>

          {/* Safety Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Safety</span>
              <Tooltip>
                <TooltipTrigger>
                  <Shield className="h-4 w-4 text-green-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Safety Systems Status</p>
                    <p className="text-sm">✓ Fire detection active</p>
                    <p className="text-sm">✓ Life rafts ready</p>
                    <p className="text-sm">✓ Emergency lighting OK</p>
                    <p className="text-sm">⚠ Fire drill due in 3 days</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-2xl font-bold text-green-600">All Clear</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Crew Information Tooltips

```tsx
interface CrewMember {
  id: string;
  name: string;
  rank: string;
  department: string;
  certification: string;
  experience: number;
  nextRotation: string;
}

function CrewRosterWithTooltips() {
  const crewMembers: CrewMember[] = [
    {
      id: '1',
      name: 'Captain John Smith',
      rank: 'Master',
      department: 'Navigation',
      certification: 'Unlimited License',
      experience: 25,
      nextRotation: '2024-03-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      rank: 'Chief Engineer',
      department: 'Engineering',
      certification: 'Motor Engineer License',
      experience: 18,
      nextRotation: '2024-02-28'
    },
    {
      id: '3',
      name: 'Mike Chen',
      rank: 'First Officer',
      department: 'Navigation',
      certification: 'Deck Officer License',
      experience: 12,
      nextRotation: '2024-04-10'
    }
  ];

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-[#16569e] mb-6">
          Current Crew Roster
        </h3>
        
        <div className="space-y-4">
          {crewMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-[#16569e] rounded-full flex items-center justify-center text-white font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base font-medium text-gray-900">
                      {member.name}
                    </h4>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-[#16569e]" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-2">
                          <div className="font-medium text-[#16569e]">Crew Details</div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Certification:</span>
                              <div>{member.certification}</div>
                            </div>
                            <div>
                              <span className="font-medium">Experience:</span>
                              <div>{member.experience} years</div>
                            </div>
                            <div>
                              <span className="font-medium">Department:</span>
                              <div>{member.department}</div>
                            </div>
                            <div>
                              <span className="font-medium">Next Rotation:</span>
                              <div>{new Date(member.nextRotation).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-gray-600">{member.rank} • {member.department}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      On Duty
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Currently on active duty</p>
                    <p className="text-xs text-gray-300">Next rotation: {new Date(member.nextRotation).toLocaleDateString()}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger>
                    <button className="p-2 text-gray-400 hover:text-[#16569e] rounded-md">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="text-sm">• View full profile</p>
                      <p className="text-sm">• Schedule appraisal</p>
                      <p className="text-sm">• Contact crew member</p>
                      <p className="text-sm">• View certifications</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Technical Equipment Tooltips

```tsx
function TechnicalEquipmentTooltips() {
  const equipmentData = [
    {
      name: 'Main Engine',
      status: 'normal',
      temperature: 87,
      pressure: 65,
      efficiency: 94,
      lastMaintenance: '2024-01-15'
    },
    {
      name: 'Auxiliary Engine',
      status: 'warning',
      temperature: 95,
      pressure: 58,
      efficiency: 89,
      lastMaintenance: '2024-01-10'
    },
    {
      name: 'Steering Gear',
      status: 'normal',
      temperature: 45,
      pressure: 72,
      efficiency: 98,
      lastMaintenance: '2024-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-[#16569e] mb-6">
          Engine Room Monitoring
        </h3>
        
        <div className="space-y-6">
          {equipmentData.map((equipment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-semibold text-gray-900">
                  {equipment.name}
                </h4>
                <Tooltip>
                  <TooltipTrigger>
                    <span className={`text-sm font-medium ${getStatusColor(equipment.status)}`}>
                      {equipment.status.toUpperCase()}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      <p className="font-medium">{equipment.name} Status</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Temperature: {equipment.temperature}°C</div>
                        <div>Pressure: {equipment.pressure} PSI</div>
                        <div>Efficiency: {equipment.efficiency}%</div>
                        <div>Last Service: {new Date(equipment.lastMaintenance).toLocaleDateString()}</div>
                      </div>
                      {equipment.status === 'warning' && (
                        <p className="text-xs text-yellow-600 mt-2">
                          Temperature slightly elevated - monitor closely
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-2xl font-bold text-gray-900">{equipment.temperature}°C</div>
                      <div className="text-xs text-gray-500">Temperature</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Operating Temperature</p>
                      <p className="text-xs text-gray-300">Normal range: 80-90°C</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="text-center">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-2xl font-bold text-gray-900">{equipment.pressure}</div>
                      <div className="text-xs text-gray-500">Pressure (PSI)</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Oil Pressure</p>
                      <p className="text-xs text-gray-300">Normal range: 60-75 PSI</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="text-center">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-2xl font-bold text-[#16569e]">{equipment.efficiency}%</div>
                      <div className="text-xs text-gray-500">Efficiency</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fuel Efficiency</p>
                      <p className="text-xs text-gray-300">Target: >90%</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Interactive Help Tooltips

```tsx
function InteractiveFormWithTooltips() {
  const [formData, setFormData] = useState({
    vesselName: '',
    imoNumber: '',
    flagState: '',
    vesselType: ''
  });

  return (
    <TooltipProvider>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold text-[#16569e] mb-6">
          Vessel Registration Form
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Vessel Name *
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="max-w-xs">
                    <p className="font-medium">Vessel Name Guidelines</p>
                    <ul className="text-sm mt-1 space-y-1">
                      <li>• Must be unique within the fleet</li>
                      <li>• Maximum 50 characters</li>
                      <li>• Include vessel type prefix (MV, MT, etc.)</li>
                      <li>• No special characters except hyphen</li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="text"
              value={formData.vesselName}
              onChange={(e) => setFormData({...formData, vesselName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              placeholder="e.g., MV Container Express"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                IMO Number *
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="max-w-xs">
                    <p className="font-medium">IMO Number Format</p>
                    <p className="text-sm mt-1">International Maritime Organization unique identifier</p>
                    <p className="text-sm mt-1">Format: 7 digits (e.g., 9123456)</p>
                    <p className="text-sm text-yellow-600 mt-2">
                      ⚠ This number is permanent and cannot be changed
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="text"
              value={formData.imoNumber}
              onChange={(e) => setFormData({...formData, imoNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
              placeholder="e.g., 9123456"
              pattern="[0-9]{7}"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Flag State *
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="max-w-xs">
                    <p className="font-medium">Flag State Selection</p>
                    <p className="text-sm mt-1">Country under whose laws the vessel is registered</p>
                    <div className="text-sm mt-2 space-y-1">
                      <p><strong>Popular choices:</strong></p>
                      <p>• Panama - Cost effective</p>
                      <p>• Liberia - International recognition</p>
                      <p>• Marshall Islands - Modern registry</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <select
              value={formData.flagState}
              onChange={(e) => setFormData({...formData, flagState: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="">Select flag state</option>
              <option value="panama">Panama</option>
              <option value="liberia">Liberia</option>
              <option value="marshall">Marshall Islands</option>
              <option value="singapore">Singapore</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Vessel Type *
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="max-w-xs">
                    <p className="font-medium">Vessel Classification</p>
                    <div className="text-sm mt-1 space-y-2">
                      <div>
                        <strong>Container Ship:</strong> Carries standardized cargo containers
                      </div>
                      <div>
                        <strong>Oil Tanker:</strong> Liquid bulk cargo vessel
                      </div>
                      <div>
                        <strong>Bulk Carrier:</strong> Dry bulk commodities
                      </div>
                      <div>
                        <strong>General Cargo:</strong> Mixed cargo types
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <select
              value={formData.vesselType}
              onChange={(e) => setFormData({...formData, vesselType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="">Select vessel type</option>
              <option value="container">Container Ship</option>
              <option value="tanker">Oil Tanker</option>
              <option value="bulk">Bulk Carrier</option>
              <option value="general">General Cargo</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
            Register Vessel
          </button>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Best Practices

1. **Concise Content**: Keep tooltip content brief and focused
2. **Helpful Information**: Provide genuinely useful context and explanations
3. **Consistent Positioning**: Use consistent side positioning within sections
4. **Maritime Context**: Include relevant maritime terminology and standards
5. **Performance**: Avoid complex content that slows rendering
6. **Accessibility**: Ensure keyboard access and screen reader compatibility

## Context Requirements

The Tooltip component works with:
- **Positioning System**: Automatic collision detection and positioning
- **Focus Management**: Proper keyboard navigation support
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Screen reader support and ARIA attributes

## Troubleshooting

### Common Issues

**Tooltip not appearing**
```tsx
// Ensure proper TooltipProvider wrapper
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip content</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Content overflow issues**
```tsx
// Set appropriate max-width for long content
<TooltipContent className="max-w-xs">
  <div>Long tooltip content that needs wrapping</div>
</TooltipContent>
```

**Positioning problems on mobile**
```tsx
// Use appropriate positioning for touch devices
<Tooltip>
  <TooltipTrigger asChild>
    <button className="touch-manipulation">
      Trigger button
    </button>
  </TooltipTrigger>
  <TooltipContent side="top" align="center">
    Mobile-friendly tooltip
  </TooltipContent>
</Tooltip>
```