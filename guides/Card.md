# Card Component Guide

## Overview
Card provides a flexible container component for displaying content with consistent styling, shadows, and spacing. It serves as a foundational building block for maritime dashboards, vessel information displays, and data presentation with professional maritime theming.

## Component Interface

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  clickable?: boolean;
  disabled?: boolean;
}

// Additional Card sub-components
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
```

## Basic Usage

```jsx
import { Card, CardHeader, CardContent, CardFooter } from 'scomp-ui';

function BasicCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Simple card */}
      <Card>
        <CardHeader>
          <h3 className="font-medium">MV Atlantic Star</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Container Ship currently en route to Hamburg</p>
        </CardContent>
      </Card>

      {/* Card with footer */}
      <Card variant="outlined">
        <CardHeader>
          <h3 className="font-medium">Safety Report</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Monthly safety performance summary</p>
        </CardContent>
        <CardFooter>
          <button className="text-blue-600 hover:text-blue-800">View Details</button>
        </CardFooter>
      </Card>

      {/* Elevated card */}
      <Card variant="elevated" clickable>
        <CardHeader>
          <h3 className="font-medium">Port Status</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Rotterdam - Normal Operations</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Maritime Dashboard Cards

```jsx
import { Ship, Users, MapPin, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

function MaritimeDashboardCards() {
  return (
    <div className="space-y-6">
      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="elevated" size="sm">
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Ship className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Vessels</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" size="sm">
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Crew</p>
              <p className="text-xl font-bold">380</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" size="sm">
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ports</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" size="sm">
          <CardContent className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Voyages</p>
              <p className="text-xl font-bold">67</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vessel Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card variant="outlined" clickable>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="font-medium">MV Atlantic Star</h3>
              <p className="text-sm text-gray-600">Container Ship</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span>Port of Rotterdam</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Captain:</span>
                <span>James Wilson</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Next Port:</span>
                <span>Hamburg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ETA:</span>
                <span>Mar 17, 14:00</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <button className="w-full px-4 py-2 bg-[#16569e] text-white rounded hover:bg-[#144d8a]">
              Track Vessel
            </button>
          </CardFooter>
        </Card>

        <Card variant="outlined">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="font-medium">MV Pacific Dawn</h3>
              <p className="text-sm text-gray-600">Bulk Carrier</p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-yellow-600 font-medium">Maintenance</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span>Singapore Shipyard</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Captain:</span>
                <span>Sarah Chen</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expected Completion:</span>
                <span>Mar 20, 2024</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded">
              Under Maintenance
            </button>
          </CardFooter>
        </Card>

        <Card variant="elevated" className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="font-medium text-red-800">MV Arctic Wind</h3>
              <p className="text-sm text-red-600">Emergency Status</p>
            </div>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Alert:</span>
                <span className="text-red-600 font-medium">Engine Failure</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span>North Sea</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Contact:</span>
                <span>2 hours ago</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Emergency Response
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
```

## Performance Metrics Cards

```jsx
function PerformanceMetricsCards() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Fleet Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Fuel Efficiency Card */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Fuel Efficiency</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">12.8 MT/day</div>
                <div className="text-sm text-gray-600">Fleet Average</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Target:</span>
                  <span>13.5 MT/day</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="text-xs text-green-600">5% better than target</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Score Card */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Safety Score</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="text-sm text-gray-600">TMSA Average</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Incidents this month:</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Days without incident:</span>
                  <span>127</span>
                </div>
                <div className="text-xs text-green-600">Excellent safety record</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Monthly Revenue</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">$2.4M</div>
                <div className="text-sm text-gray-600">March 2024</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>vs Last Month:</span>
                  <span className="text-green-600">+12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>vs Target:</span>
                  <span className="text-green-600">+8%</span>
                </div>
                <div className="text-xs text-green-600">Exceeding targets</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

## Interactive Card Examples

```jsx
function InteractiveCardExamples() {
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [favoriteVessels, setFavoriteVessels] = useState(new Set());

  const vessels = [
    { id: '1', name: 'MV Atlantic Star', type: 'Container Ship', status: 'operational' },
    { id: '2', name: 'MV Pacific Dawn', type: 'Bulk Carrier', status: 'maintenance' },
    { id: '3', name: 'MV Nordic Explorer', type: 'Tanker', status: 'transit' }
  ];

  const toggleFavorite = (vesselId) => {
    setFavoriteVessels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(vesselId)) {
        newSet.delete(vesselId);
      } else {
        newSet.add(vesselId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Interactive Fleet Cards</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vessels.map((vessel) => (
          <Card 
            key={vessel.id}
            clickable
            variant={selectedVessel === vessel.id ? "elevated" : "outlined"}
            className={`transition-all duration-200 ${
              selectedVessel === vessel.id ? 'ring-2 ring-[#16569e] border-[#16569e]' : ''
            }`}
            onClick={() => setSelectedVessel(vessel.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h3 className="font-medium">{vessel.name}</h3>
                <p className="text-sm text-gray-600">{vessel.type}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(vessel.id);
                }}
                className={`text-xl ${
                  favoriteVessels.has(vessel.id) ? 'text-yellow-500' : 'text-gray-300'
                } hover:text-yellow-500`}
              >
                ★
              </button>
            </CardHeader>
            <CardContent>
              <div className={`inline-block px-2 py-1 rounded text-xs ${
                vessel.status === 'operational' ? 'bg-green-100 text-green-800' :
                vessel.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {vessel.status.charAt(0).toUpperCase() + vessel.status.slice(1)}
              </div>
            </CardContent>
            {selectedVessel === vessel.id && (
              <CardFooter>
                <div className="flex gap-2 w-full">
                  <button className="flex-1 px-3 py-1 bg-[#16569e] text-white rounded text-sm hover:bg-[#144d8a]">
                    Track
                  </button>
                  <button className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    Details
                  </button>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {selectedVessel && (
        <Card variant="elevated" className="border-[#16569e]">
          <CardHeader>
            <h3 className="font-medium">
              {vessels.find(v => v.id === selectedVessel)?.name} - Detailed Information
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Detailed vessel information and controls would appear here for the selected vessel.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

## Card Variants and Sizes

```jsx
function CardVariantsAndSizes() {
  return (
    <div className="space-y-8">
      {/* Variants */}
      <div className="space-y-4">
        <h3 className="font-medium">Card Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card variant="default">
            <CardHeader>
              <h4 className="font-medium">Default</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Standard card with subtle shadow</p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <h4 className="font-medium">Outlined</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Card with border, no shadow</p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <h4 className="font-medium">Elevated</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Card with prominent shadow</p>
            </CardContent>
          </Card>

          <Card variant="flat">
            <CardHeader>
              <h4 className="font-medium">Flat</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Minimal card, no shadow or border</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="font-medium">Card Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card size="sm" variant="outlined">
            <CardHeader>
              <h4 className="font-medium">Small Card</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Compact spacing</p>
            </CardContent>
          </Card>

          <Card size="md" variant="outlined">
            <CardHeader>
              <h4 className="font-medium">Medium Card</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Standard spacing (default)</p>
            </CardContent>
          </Card>

          <Card size="lg" variant="outlined">
            <CardHeader>
              <h4 className="font-medium">Large Card</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Generous spacing for detailed content</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Clickable States */}
      <div className="space-y-4">
        <h3 className="font-medium">Interactive States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card clickable variant="outlined">
            <CardContent>
              <p className="text-center text-gray-600">Clickable Card<br />Hover to see effect</p>
            </CardContent>
          </Card>

          <Card disabled variant="outlined">
            <CardContent>
              <p className="text-center text-gray-400">Disabled Card<br />Non-interactive</p>
            </CardContent>
          </Card>

          <Card clickable variant="elevated" className="border-2 border-[#16569e]">
            <CardContent>
              <p className="text-center text-[#16569e]">Selected Card<br />Active state</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

## Key Features
- **Flexible Container**: Versatile base component for content display
- **Multiple Variants**: Default, outlined, elevated, and flat styles
- **Size Options**: Small, medium, and large size variants
- **Interactive States**: Clickable, disabled, and selected states
- **Structured Layout**: Header, content, and footer sub-components
- **Maritime Theming**: Professional styling matching maritime applications
- **Responsive Design**: Adaptable to different screen sizes
- **Accessibility**: Proper focus states and keyboard navigation

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Styling Guidelines
- **Consistent Spacing**: Use CardHeader, CardContent, and CardFooter for proper spacing
- **Visual Hierarchy**: Leverage size and variant to establish importance
- **Interactive Feedback**: Use clickable prop for interactive cards
- **Color Coding**: Apply custom classes for status-specific styling
- **Mobile Optimization**: Ensure cards work well on mobile devices

## Best Practices
1. **Content Organization**: Use header, content, and footer sections appropriately
2. **Visual Consistency**: Maintain consistent card variants within related groups
3. **Interactive Feedback**: Provide clear hover and focus states for clickable cards
4. **Content Density**: Choose appropriate size based on content complexity
5. **Status Indication**: Use colors and icons to indicate status or priority
6. **Responsive Layout**: Use grid systems for responsive card layouts
7. **Accessibility**: Ensure proper focus management for interactive cards

## Common Use Cases
- Fleet dashboard layouts
- Vessel information displays
- Performance metric presentations
- Alert and notification panels
- Navigation menu cards
- Settings and configuration panels
- Report and document previews
- User profile displays
- Quick action panels
- Status overview displays