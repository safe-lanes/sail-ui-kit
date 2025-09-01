# Slider Component Guide

## Overview
The Slider component provides range input controls for maritime applications. It enables value selection for crew ratings, vessel parameters, and operational thresholds with TMSA-compliant styling optimized for fleet management systems.

## Component Interface

```typescript
interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Range Selection**: Single value and range selection support
- **Visual Feedback**: Clear thumb and track styling
- **Accessibility**: Keyboard navigation and screen reader support
- **Precise Control**: Configurable step values and bounds

## Basic Usage

```tsx
import { Slider } from 'scomp-ui/sail-ui-kit';

function CrewPerformanceRating() {
  const [rating, setRating] = useState([3]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Overall Performance Rating
        </label>
        <div className="px-3">
          <Slider
            value={rating}
            onValueChange={setRating}
            max={5}
            min={1}
            step={0.1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Poor (1)</span>
          <span>Excellent (5)</span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-lg font-semibold text-[#16569e]">
            {rating[0].toFixed(1)} / 5.0
          </span>
        </div>
      </div>
    </div>
  );
}
```

## Crew Appraisal Rating System

```tsx
interface AppraisalRatings {
  leadership: number[];
  communication: number[];
  technical: number[];
  safety: number[];
  teamwork: number[];
}

function CrewAppraisalRatingForm() {
  const [ratings, setRatings] = useState<AppraisalRatings>({
    leadership: [3],
    communication: [3],
    technical: [3],
    safety: [3],
    teamwork: [3]
  });

  const categories = [
    {
      key: 'leadership' as keyof AppraisalRatings,
      label: 'Leadership Skills',
      description: 'Ability to lead and motivate team members'
    },
    {
      key: 'communication' as keyof AppraisalRatings,
      label: 'Communication',
      description: 'Clear and effective communication skills'
    },
    {
      key: 'technical' as keyof AppraisalRatings,
      label: 'Technical Competency',
      description: 'Job-specific technical knowledge and skills'
    },
    {
      key: 'safety' as keyof AppraisalRatings,
      label: 'Safety Awareness',
      description: 'Understanding and adherence to safety protocols'
    },
    {
      key: 'teamwork' as keyof AppraisalRatings,
      label: 'Teamwork',
      description: 'Collaboration and support for colleagues'
    }
  ];

  const updateRating = (category: keyof AppraisalRatings, value: number[]) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const getRatingLabel = (value: number) => {
    if (value <= 1.5) return 'Needs Improvement';
    if (value <= 2.5) return 'Below Average';
    if (value <= 3.5) return 'Average';
    if (value <= 4.5) return 'Above Average';
    return 'Excellent';
  };

  const getRatingColor = (value: number) => {
    if (value <= 2) return 'text-red-600';
    if (value <= 3) return 'text-yellow-600';
    if (value <= 4) return 'text-blue-600';
    return 'text-green-600';
  };

  const averageRating = Object.values(ratings).reduce((sum, rating) => sum + rating[0], 0) / Object.keys(ratings).length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#16569e] mb-2">
          Crew Performance Appraisal
        </h2>
        <p className="text-gray-600">
          Rate the crew member's performance in each category (1-5 scale)
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.key} className="border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.label}
                </h3>
                <div className="text-right">
                  <div className={`text-xl font-bold ${getRatingColor(ratings[category.key][0])}`}>
                    {ratings[category.key][0].toFixed(1)}
                  </div>
                  <div className={`text-sm ${getRatingColor(ratings[category.key][0])}`}>
                    {getRatingLabel(ratings[category.key][0])}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {category.description}
              </p>
            </div>

            <div className="px-3">
              <Slider
                value={ratings[category.key]}
                onValueChange={(value) => updateRating(category.key, value)}
                max={5}
                min={1}
                step={0.1}
                className="w-full [&_[role=slider]]:bg-[#16569e] [&_[role=slider]]:border-[#16569e]"
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Needs Improvement</span>
              <span>Below Average</span>
              <span>Average</span>
              <span>Above Average</span>
              <span>Excellent</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-[#16569e] text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Overall Performance Score</h3>
            <p className="text-blue-100">
              Average across all categories
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {averageRating.toFixed(1)} / 5.0
            </div>
            <div className="text-blue-100">
              {getRatingLabel(averageRating)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Vessel Parameter Controls

```tsx
function VesselParameterControls() {
  const [parameters, setParameters] = useState({
    speed: [12],
    fuelConsumption: [85],
    cargoCapacity: [75],
    crewUtilization: [90]
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-[#16569e] mb-6">
        Vessel Operational Parameters
      </h3>
      
      <div className="space-y-6">
        {/* Speed Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Target Speed (knots)
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {parameters.speed[0]} kts
            </span>
          </div>
          <Slider
            value={parameters.speed}
            onValueChange={(value) => setParameters({...parameters, speed: value})}
            max={25}
            min={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 kts</span>
            <span>Economic Speed</span>
            <span>25 kts</span>
          </div>
        </div>

        {/* Fuel Consumption */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Fuel Efficiency Target (%)
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {parameters.fuelConsumption[0]}%
            </span>
          </div>
          <Slider
            value={parameters.fuelConsumption}
            onValueChange={(value) => setParameters({...parameters, fuelConsumption: value})}
            max={100}
            min={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>50% Efficiency</span>
            <span>100% Optimal</span>
          </div>
        </div>

        {/* Cargo Capacity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Cargo Capacity Utilization (%)
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {parameters.cargoCapacity[0]}%
            </span>
          </div>
          <Slider
            value={parameters.cargoCapacity}
            onValueChange={(value) => setParameters({...parameters, cargoCapacity: value})}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Empty</span>
            <span>Full Capacity</span>
          </div>
        </div>

        {/* Crew Utilization */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Crew Utilization Rate (%)
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {parameters.crewUtilization[0]}%
            </span>
          </div>
          <Slider
            value={parameters.crewUtilization}
            onValueChange={(value) => setParameters({...parameters, crewUtilization: value})}
            max={100}
            min={60}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>60% Minimum</span>
            <span>100% Full</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Reset to Defaults
          </button>
          <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
            Apply Parameters
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Range Slider for Fleet Filters

```tsx
function FleetFilterRangeSliders() {
  const [filters, setFilters] = useState({
    vesselAge: [0, 20],
    dwt: [10000, 200000],
    speed: [10, 25],
    buildYear: [2000, 2024]
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-[#16569e] mb-6">
        Fleet Filter Parameters
      </h3>
      
      <div className="space-y-6">
        {/* Vessel Age Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Vessel Age Range (years)
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {filters.vesselAge[0]} - {filters.vesselAge[1]} years
            </span>
          </div>
          <Slider
            value={filters.vesselAge}
            onValueChange={(value) => setFilters({...filters, vesselAge: value})}
            max={30}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>New (0)</span>
            <span>Old (30+)</span>
          </div>
        </div>

        {/* DWT Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Deadweight Tonnage (MT)
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {filters.dwt[0].toLocaleString()} - {filters.dwt[1].toLocaleString()} MT
            </span>
          </div>
          <Slider
            value={filters.dwt}
            onValueChange={(value) => setFilters({...filters, dwt: value})}
            max={300000}
            min={5000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5K MT</span>
            <span>150K MT</span>
            <span>300K MT</span>
          </div>
        </div>

        {/* Speed Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Service Speed Range (knots)
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {filters.speed[0]} - {filters.speed[1]} knots
            </span>
          </div>
          <Slider
            value={filters.speed}
            onValueChange={(value) => setFilters({...filters, speed: value})}
            max={30}
            min={8}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Slow (8)</span>
            <span>Fast (30)</span>
          </div>
        </div>

        {/* Build Year Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Build Year Range
            </label>
            <span className="text-sm font-semibold text-[#16569e]">
              {filters.buildYear[0]} - {filters.buildYear[1]}
            </span>
          </div>
          <Slider
            value={filters.buildYear}
            onValueChange={(value) => setFilters({...filters, buildYear: value})}
            max={2024}
            min={1990}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1990</span>
            <span>2007</span>
            <span>2024</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Filter Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Age: {filters.vesselAge[0]}-{filters.vesselAge[1]} years</div>
            <div>DWT: {filters.dwt[0].toLocaleString()}-{filters.dwt[1].toLocaleString()} MT</div>
            <div>Speed: {filters.speed[0]}-{filters.speed[1]} knots</div>
            <div>Built: {filters.buildYear[0]}-{filters.buildYear[1]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Vertical Slider Example

```tsx
function VesselGaugeControls() {
  const [gauges, setGauges] = useState({
    fuelLevel: [75],
    waterLevel: [85],
    oilPressure: [65],
    temperature: [45]
  });

  const getGaugeColor = (value: number, type: string) => {
    switch (type) {
      case 'fuel':
      case 'water':
        if (value < 20) return 'text-red-600';
        if (value < 40) return 'text-yellow-600';
        return 'text-green-600';
      case 'pressure':
        if (value < 30 || value > 80) return 'text-red-600';
        if (value < 40 || value > 70) return 'text-yellow-600';
        return 'text-green-600';
      case 'temperature':
        if (value > 80) return 'text-red-600';
        if (value > 60) return 'text-yellow-600';
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-[#16569e] mb-6 text-center">
        Engine Room Monitoring
      </h3>
      
      <div className="grid grid-cols-4 gap-8">
        {/* Fuel Level */}
        <div className="text-center">
          <div className="h-64 flex justify-center mb-4">
            <Slider
              value={gauges.fuelLevel}
              onValueChange={(value) => setGauges({...gauges, fuelLevel: value})}
              max={100}
              min={0}
              step={1}
              orientation="vertical"
              className="h-full"
              disabled
            />
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold ${getGaugeColor(gauges.fuelLevel[0], 'fuel')}`}>
              {gauges.fuelLevel[0]}%
            </div>
            <div className="text-sm font-medium text-gray-700">Fuel Level</div>
            <div className="text-xs text-gray-500">Main Tank</div>
          </div>
        </div>

        {/* Water Level */}
        <div className="text-center">
          <div className="h-64 flex justify-center mb-4">
            <Slider
              value={gauges.waterLevel}
              onValueChange={(value) => setGauges({...gauges, waterLevel: value})}
              max={100}
              min={0}
              step={1}
              orientation="vertical"
              className="h-full"
              disabled
            />
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold ${getGaugeColor(gauges.waterLevel[0], 'water')}`}>
              {gauges.waterLevel[0]}%
            </div>
            <div className="text-sm font-medium text-gray-700">Fresh Water</div>
            <div className="text-xs text-gray-500">Reserve Tank</div>
          </div>
        </div>

        {/* Oil Pressure */}
        <div className="text-center">
          <div className="h-64 flex justify-center mb-4">
            <Slider
              value={gauges.oilPressure}
              onValueChange={(value) => setGauges({...gauges, oilPressure: value})}
              max={100}
              min={0}
              step={1}
              orientation="vertical"
              className="h-full"
              disabled
            />
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold ${getGaugeColor(gauges.oilPressure[0], 'pressure')}`}>
              {gauges.oilPressure[0]}
            </div>
            <div className="text-sm font-medium text-gray-700">Oil Pressure</div>
            <div className="text-xs text-gray-500">PSI</div>
          </div>
        </div>

        {/* Temperature */}
        <div className="text-center">
          <div className="h-64 flex justify-center mb-4">
            <Slider
              value={gauges.temperature}
              onValueChange={(value) => setGauges({...gauges, temperature: value})}
              max={100}
              min={0}
              step={1}
              orientation="vertical"
              className="h-full"
              disabled
            />
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold ${getGaugeColor(gauges.temperature[0], 'temperature')}`}>
              {gauges.temperature[0]}°C
            </div>
            <div className="text-sm font-medium text-gray-700">Engine Temp</div>
            <div className="text-xs text-gray-500">Coolant</div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-sm font-medium text-green-800">Normal Range</div>
            <div className="text-xs text-green-600">All parameters optimal</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="text-sm font-medium text-yellow-800">Caution</div>
            <div className="text-xs text-yellow-600">Monitor closely</div>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <div className="text-sm font-medium text-red-800">Critical</div>
            <div className="text-xs text-red-600">Immediate attention</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Clear Value Display**: Always show current value prominently
2. **Meaningful Labels**: Use descriptive labels and units
3. **Visual Feedback**: Provide color coding for different value ranges
4. **Appropriate Steps**: Set step values that make sense for the use case
5. **Maritime Context**: Use relevant scales and units for maritime operations
6. **Accessibility**: Ensure keyboard navigation and screen reader support

## Context Requirements

The Slider component works with:
- **Form Libraries**: Integration with react-hook-form and validation
- **State Management**: Value change handling and persistence
- **Theme Context**: Maritime color scheme and styling
- **Accessibility**: Keyboard navigation and ARIA attributes

## Troubleshooting

### Common Issues

**Slider not responding to changes**
```tsx
// Ensure proper value and onValueChange props
const [value, setValue] = useState([50]);

<Slider
  value={value}
  onValueChange={setValue}
  min={0}
  max={100}
/>
```

**Styling not applying correctly**
```tsx
// Use specific selectors for slider parts
<Slider
  className="w-full [&_[role=slider]]:bg-[#16569e] [&_[role=slider]]:border-[#16569e]"
  value={value}
  onValueChange={setValue}
/>
```

**Range slider confusion**
```tsx
// Ensure proper array handling for range sliders
const [range, setRange] = useState([20, 80]);

<Slider
  value={range}
  onValueChange={setRange}
  min={0}
  max={100}
/>

// Display: {range[0]} - {range[1]}
```