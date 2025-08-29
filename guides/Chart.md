# Chart Component Implementation Guide

## Component Overview
The `Chart` component from `scomp-ui/sail-ui-kit` provides data visualization capabilities for maritime analytics and fleet performance metrics. Essential for displaying operational KPIs, compliance trends, and performance dashboards.

## Props Interface
```typescript
interface ChartProps {
  config: ChartConfig;
  data: any[];
  className?: string;
  children?: React.ReactNode;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
    icon?: React.ComponentType;
  };
}

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

interface ChartLegendProps {
  className?: string;
  nameKey?: string;
}

interface ChartLegendContentProps {
  className?: string;
  nameKey?: string;
  payload?: any[];
}
```

## Basic Usage Example
```tsx
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

function FleetPerformanceChart() {
  const chartData = [
    { vessel: "MV Ocean Star", efficiency: 85, fuel: 45, cargo: 95 },
    { vessel: "MV Sea Pioneer", efficiency: 78, fuel: 52, cargo: 87 },
    { vessel: "MV Atlantic Wave", efficiency: 92, fuel: 38, cargo: 98 },
    { vessel: "MV Pacific Dawn", efficiency: 88, fuel: 42, cargo: 91 },
    { vessel: "MV Nordic Wind", efficiency: 83, fuel: 48, cargo: 89 },
  ];

  const chartConfig = {
    efficiency: {
      label: "Operational Efficiency",
      color: "#16569e",
    },
    fuel: {
      label: "Fuel Consumption",
      color: "#e74c3c",
    },
    cargo: {
      label: "Cargo Utilization",
      color: "#27ae60",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="vessel" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="efficiency" fill="var(--color-efficiency)" />
              <Bar dataKey="fuel" fill="var(--color-fuel)" />
              <Bar dataKey="cargo" fill="var(--color-cargo)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

## Advanced Maritime Analytics
```typescript
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "scomp-ui/sail-ui-kit";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

interface TMSAComplianceData {
  month: string;
  element1: number;
  element2: number;
  element3: number;
  element4: number;
  element5: number;
  overall: number;
}

function TMSAComplianceDashboard({ vesselId }: { vesselId?: string }) {
  const [timeRange, setTimeRange] = useState("12months");
  
  const complianceData: TMSAComplianceData[] = [
    { month: "Jan", element1: 85, element2: 78, element3: 92, element4: 88, element5: 83, overall: 85.2 },
    { month: "Feb", element1: 87, element2: 82, element3: 94, element4: 90, element5: 85, overall: 87.6 },
    { month: "Mar", element1: 89, element2: 85, element3: 96, element4: 92, element5: 88, overall: 90.0 },
    { month: "Apr", element1: 91, element2: 88, element3: 98, element4: 94, element5: 90, overall: 92.2 },
    { month: "May", element1: 88, element2: 84, element3: 95, element4: 91, element5: 87, overall: 89.0 },
    { month: "Jun", element1: 92, element2: 89, element3: 97, element4: 95, element5: 91, overall: 92.8 },
  ];

  const chartConfig = {
    element1: {
      label: "Element 1 - Management",
      color: "#16569e",
    },
    element2: {
      label: "Element 2 - HR Management", 
      color: "#27ae60",
    },
    element3: {
      label: "Element 3 - Crewing",
      color: "#f39c12",
    },
    element4: {
      label: "Element 4 - Technical",
      color: "#e74c3c",
    },
    element5: {
      label: "Element 5 - Navigation",
      color: "#9b59b6",
    },
    overall: {
      label: "Overall Compliance",
      color: "#34495e",
    },
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">TMSA Compliance Trends</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
            <SelectItem value="24months">Last 24 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Compliance Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            TMSA Compliance Trends
            <Badge variant="outline">
              Current Overall: {complianceData[complianceData.length - 1].overall}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceData}>
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <ChartTooltip 
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line 
                  type="monotone" 
                  dataKey="element1" 
                  stroke="var(--color-element1)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="element2" 
                  stroke="var(--color-element2)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="element3" 
                  stroke="var(--color-element3)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="element4" 
                  stroke="var(--color-element4)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="element5" 
                  stroke="var(--color-element5)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="overall" 
                  stroke="var(--color-overall)" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Fleet Fuel Consumption Chart
```tsx
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

function FuelConsumptionChart({ vesselId }: { vesselId: string }) {
  const fuelData = [
    { date: "Jan 1", consumption: 45.2, efficiency: 12.8 },
    { date: "Jan 8", consumption: 48.1, efficiency: 11.9 },
    { date: "Jan 15", consumption: 42.7, efficiency: 13.4 },
    { date: "Jan 22", consumption: 46.3, efficiency: 12.5 },
    { date: "Jan 29", consumption: 44.8, efficiency: 13.1 },
    { date: "Feb 5", consumption: 47.2, efficiency: 12.2 },
    { date: "Feb 12", consumption: 43.6, efficiency: 13.7 },
    { date: "Feb 19", consumption: 45.9, efficiency: 12.7 },
  ];

  const chartConfig = {
    consumption: {
      label: "Daily Consumption (MT)",
      color: "#e74c3c",
    },
    efficiency: {
      label: "Efficiency (nm/MT)",
      color: "#16569e",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Consumption & Efficiency</CardTitle>
        <p className="text-sm text-muted-foreground">
          Last 8 weeks performance data
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fuelData}>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip 
                content={<ChartTooltipContent />}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="consumption"
                stroke="var(--color-consumption)"
                fill="var(--color-consumption)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="efficiency"
                stroke="var(--color-efficiency)"
                fill="var(--color-efficiency)"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="3 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

## Port Performance Analytics
```tsx
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

function PortPerformanceChart() {
  const portData = [
    { port: "Singapore", calls: 45, avgStay: 2.3, efficiency: 92 },
    { port: "Rotterdam", calls: 38, avgStay: 3.1, efficiency: 87 },
    { port: "Shanghai", calls: 52, avgStay: 2.8, efficiency: 89 },
    { port: "Los Angeles", calls: 31, avgStay: 3.5, efficiency: 84 },
    { port: "Hamburg", calls: 29, avgStay: 2.9, efficiency: 88 },
    { port: "Antwerp", calls: 34, avgStay: 2.7, efficiency: 90 },
  ];

  const chartConfig = {
    calls: {
      label: "Port Calls",
      color: "#16569e",
    },
    avgStay: {
      label: "Avg Stay (days)",
      color: "#f39c12",
    },
    efficiency: {
      label: "Port Efficiency (%)",
      color: "#27ae60",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Port Performance Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">
          Last 12 months port call statistics
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={portData}>
              <XAxis dataKey="port" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar 
                yAxisId="left"
                dataKey="calls" 
                fill="var(--color-calls)" 
                name="Port Calls"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="efficiency" 
                stroke="var(--color-efficiency)" 
                strokeWidth={3}
                name="Efficiency %"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="avgStay" 
                stroke="var(--color-avgStay)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Avg Stay (days)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

## Safety Metrics Dashboard
```tsx
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

function SafetyMetricsDashboard() {
  const incidentData = [
    { name: "Near Miss", value: 45, color: "#f39c12" },
    { name: "Equipment Failure", value: 23, color: "#e74c3c" },
    { name: "Environmental", value: 12, color: "#27ae60" },
    { name: "Personnel Injury", value: 8, color: "#9b59b6" },
    { name: "Navigation", value: 15, color: "#16569e" },
  ];

  const safetyRadarData = [
    { element: "Navigation", score: 85 },
    { element: "Engineering", score: 78 },
    { element: "Deck Operations", score: 92 },
    { element: "Safety Management", score: 88 },
    { element: "Environmental", score: 83 },
    { element: "Emergency Response", score: 90 },
  ];

  const chartConfig = {
    score: {
      label: "Safety Score",
      color: "#16569e",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Incident Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">Last 12 months</p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {incidentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent hideLabel />}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Safety Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Performance Radar</CardTitle>
          <p className="text-sm text-muted-foreground">Current safety scores by area</p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={safetyRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="element" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Safety Score"
                  dataKey="score"
                  stroke="var(--color-score)"
                  fill="var(--color-score)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Context Requirements
- **Chart Configuration**: Requires chartConfig object for theming and labels
- **Recharts Integration**: Built on top of Recharts library
- **Responsive Design**: Automatically adapts to container sizes

## Maritime-Specific Use Cases
1. **Fleet Performance**: Vessel efficiency and operational metrics
2. **TMSA Compliance**: Regulatory compliance tracking and trends
3. **Fuel Analytics**: Consumption patterns and efficiency analysis
4. **Port Performance**: Port call statistics and efficiency metrics
5. **Safety Dashboards**: Incident tracking and safety performance
6. **Crew Analytics**: Crew performance and training metrics
7. **Route Optimization**: Route performance and weather impact analysis

## Integration with Fleet Management
```tsx
// Example: Real-time chart with data updates
function RealTimeFleetDashboard() {
  const { data: fleetMetrics, isLoading } = useQuery({
    queryKey: ["/api/fleet-metrics"],
    refetchInterval: 60000, // Update every minute
  });

  if (isLoading) {
    return <div>Loading fleet metrics...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <FleetPerformanceChart data={fleetMetrics?.performance} />
      <FuelConsumptionChart data={fleetMetrics?.fuel} />
      <SafetyMetricsDashboard data={fleetMetrics?.safety} />
    </div>
  );
}
```

## Styling and Theming
The Chart component follows maritime blue theme (#16569e) and supports:
- **CSS Variables**: Dynamic theming through CSS custom properties
- **Responsive Design**: Automatically adapts to container sizes
- **Maritime Colors**: Appropriate color schemes for maritime data
- **Accessibility**: Screen reader compatible with proper ARIA labels

## Troubleshooting
1. **Charts not rendering**: Verify Recharts installation and ResponsiveContainer usage
2. **Colors not applying**: Check chartConfig setup and CSS variable definitions
3. **Responsive issues**: Ensure proper container sizing and min-height values
4. **Data not displaying**: Verify data structure matches chart dataKey properties
5. **Tooltip not working**: Check ChartTooltip and ChartTooltipContent setup

## Best Practices
- Define clear chartConfig objects with meaningful labels and colors
- Use appropriate chart types for different maritime data (line for trends, bar for comparisons)
- Implement responsive design with proper min-height values
- Include meaningful tooltips and legends for maritime context
- Use maritime-appropriate color schemes and terminology
- Consider real-time data updates for operational dashboards
- Implement proper loading states for data fetching
- Test charts with real maritime data ranges and edge cases