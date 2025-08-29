# Calendar Component Implementation Guide

## Component Overview
The `Calendar` component from `scomp-ui/sail-ui-kit` provides date selection and scheduling functionality for maritime operations. Essential for voyage planning, crew scheduling, maintenance schedules, and port operations.

## Props Interface
```typescript
interface CalendarProps {
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
  defaultMonth?: Date;
  fromMonth?: Date;
  toMonth?: Date;
  disabled?: (date: Date) => boolean;
  className?: string;
  classNames?: {
    months?: string;
    month?: string;
    caption?: string;
    caption_label?: string;
    nav?: string;
    nav_button?: string;
    nav_button_previous?: string;
    nav_button_next?: string;
    table?: string;
    head_row?: string;
    head_cell?: string;
    row?: string;
    cell?: string;
    day?: string;
    day_range_end?: string;
    day_range_middle?: string;
    day_range_start?: string;
    day_selected?: string;
    day_today?: string;
    day_outside?: string;
    day_disabled?: string;
    day_hidden?: string;
  };
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
}
```

## Basic Usage Example
```tsx
import { Calendar } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

function VoyageScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Select Departure Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date()}
          className="rounded-md border"
        />
        
        {selectedDate && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm">
              <strong>Selected Departure:</strong> {selectedDate.toLocaleDateString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

## Advanced Maritime Implementation
```tsx
import { Calendar } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

interface VoyageEvent {
  date: Date;
  type: "departure" | "arrival" | "maintenance" | "inspection" | "crew-change";
  vessel: string;
  location: string;
  status: "scheduled" | "confirmed" | "completed" | "delayed";
}

interface MaritimeCalendarProps {
  events: VoyageEvent[];
  onDateSelect?: (date: Date) => void;
}

function MaritimeCalendar({ events, onDateSelect }: MaritimeCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "departure": return "bg-blue-500";
      case "arrival": return "bg-green-500";
      case "maintenance": return "bg-orange-500";
      case "inspection": return "bg-purple-500";
      case "crew-change": return "bg-cyan-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "border-green-500";
      case "confirmed": return "border-blue-500";
      case "scheduled": return "border-gray-400";
      case "delayed": return "border-red-500";
      default: return "border-gray-400";
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Operations Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              if (date && onDateSelect) {
                onDateSelect(date);
              }
            }}
            className="rounded-md border"
            classNames={{
              day: hasEvents(selectedDate || new Date()) ? "relative" : undefined,
            }}
          />
          
          {/* Legend */}
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm">Event Types:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span>Departure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span>Arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-500"></div>
                <span>Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span>Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-cyan-500"></div>
                <span>Crew Change</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Selected Date Events */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select a Date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border-l-4 ${getStatusColor(event.status)} bg-muted/30`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${getEventTypeColor(event.type)}`}></div>
                      <span className="font-medium capitalize">
                        {event.type.replace("-", " ")}
                      </span>
                    </div>
                    <Badge 
                      variant={event.status === "completed" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <p><strong>Vessel:</strong> {event.vessel}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              {selectedDate ? "No events scheduled" : "Select a date to view events"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

## Crew Schedule Calendar
```tsx
import { Calendar } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

interface CrewSchedule {
  crewMemberId: string;
  name: string;
  rank: string;
  onboardDate: Date;
  offboardDate: Date;
  vessel: string;
}

function CrewScheduleCalendar({ schedules }: { schedules: CrewSchedule[] }) {
  const [selectedRange, setSelectedRange] = useState<{ from: Date; to: Date } | undefined>();

  const isDateInSchedule = (date: Date) => {
    return schedules.some(schedule => 
      date >= schedule.onboardDate && date <= schedule.offboardDate
    );
  };

  const getSchedulesForDate = (date: Date) => {
    return schedules.filter(schedule => 
      date >= schedule.onboardDate && date <= schedule.offboardDate
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Crew Schedule Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={setSelectedRange}
            numberOfMonths={2}
            className="rounded-md border"
            classNames={{
              day: "relative",
            }}
          />
          
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Schedule Information:</h4>
            <div className="text-sm space-y-1">
              <p>• Total crew schedules: {schedules.length}</p>
              <p>• Officers on rotation: {schedules.filter(s => s.rank.includes("Officer") || s.rank === "Master").length}</p>
              <p>• Ratings on rotation: {schedules.filter(s => !s.rank.includes("Officer") && s.rank !== "Master").length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {selectedRange && (
        <Card>
          <CardHeader>
            <CardTitle>
              Crew Schedule: {selectedRange.from.toLocaleDateString()} - {selectedRange.to.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schedules
                .filter(schedule => 
                  (schedule.onboardDate >= selectedRange.from && schedule.onboardDate <= selectedRange.to) ||
                  (schedule.offboardDate >= selectedRange.from && schedule.offboardDate <= selectedRange.to) ||
                  (schedule.onboardDate <= selectedRange.from && schedule.offboardDate >= selectedRange.to)
                )
                .map((schedule, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{schedule.name}</h5>
                        <p className="text-sm text-muted-foreground">{schedule.rank}</p>
                        <p className="text-sm text-muted-foreground">{schedule.vessel}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p>Onboard: {schedule.onboardDate.toLocaleDateString()}</p>
                        <p>Offboard: {schedule.offboardDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

## Maintenance Schedule Calendar
```tsx
import { Calendar } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

interface MaintenanceEvent {
  id: string;
  date: Date;
  type: "drydock" | "survey" | "engine" | "navigation" | "safety";
  vessel: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "planned" | "in-progress" | "completed" | "overdue";
}

function MaintenanceCalendar({ maintenanceEvents }: { maintenanceEvents: MaintenanceEvent[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const isMaintenanceDate = (date: Date) => {
    return maintenanceEvents.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getMaintenanceForDate = (date: Date) => {
    return maintenanceEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateMaintenance = selectedDate ? getMaintenanceForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="xl:col-span-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          classNames={{
            day: "relative",
          }}
        />
      </div>
      
      {/* Maintenance Details */}
      <div className="space-y-4">
        <h3 className="font-semibold">
          {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
        </h3>
        
        {selectedDateMaintenance.length > 0 ? (
          <div className="space-y-3">
            {selectedDateMaintenance.map((maintenance) => (
              <div key={maintenance.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getPriorityColor(maintenance.priority)} text-white text-xs`}>
                    {maintenance.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {maintenance.status}
                  </Badge>
                </div>
                
                <h4 className="font-medium capitalize mb-1">
                  {maintenance.type} Maintenance
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {maintenance.vessel}
                </p>
                <p className="text-sm">{maintenance.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            {selectedDate ? "No maintenance scheduled" : "Select a date"}
          </div>
        )}
        
        {/* Summary */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-2">Maintenance Overview</h4>
          <div className="text-sm space-y-1">
            <p>Total events: {maintenanceEvents.length}</p>
            <p>Critical: {maintenanceEvents.filter(e => e.priority === "critical").length}</p>
            <p>Overdue: {maintenanceEvents.filter(e => e.status === "overdue").length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Date formatting**: Consider timezone handling for global maritime operations
- **State management**: Optional for complex scheduling applications

## Maritime-Specific Use Cases
1. **Voyage Planning**: Departure and arrival date selection
2. **Crew Scheduling**: Rotation and leave planning
3. **Maintenance Planning**: Equipment and vessel maintenance schedules
4. **Port Operations**: Berth bookings and port call scheduling
5. **Certification Tracking**: Certificate expiry and renewal dates
6. **Weather Windows**: Optimal departure date selection
7. **Cargo Operations**: Loading and discharge scheduling

## Integration with Fleet Management
```tsx
// Example: Integrated voyage planning calendar
function VoyagePlanningCalendar({ vesselId }: { vesselId: string }) {
  const { data: voyageEvents } = useQuery({
    queryKey: ["/api/voyages", vesselId],
  });

  const { data: weatherWindows } = useQuery({
    queryKey: ["/api/weather-windows", vesselId],
  });

  const [selectedRange, setSelectedRange] = useState<{ from: Date; to: Date }>();

  const isOptimalWeatherDate = (date: Date) => {
    return weatherWindows?.some((window: any) => 
      date >= new Date(window.start) && date <= new Date(window.end)
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voyage Planning - Select Departure Window</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={setSelectedRange}
            disabled={(date) => date < new Date()}
            numberOfMonths={2}
            className="rounded-md border"
            classNames={{
              day: isOptimalWeatherDate(new Date()) 
                ? "bg-green-100 hover:bg-green-200" 
                : undefined,
            }}
          />
          
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border rounded"></div>
              <span>Optimal Weather Window</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Styling and Theming
The Calendar component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Adapts to mobile and desktop layouts
- **Custom styling**: Extensive className customization options
- **Event indicators**: Visual markers for scheduled maritime events
- **Status colors**: Maritime-appropriate color coding

## Troubleshooting
1. **Date selection not working**: Check mode prop and onSelect handler
2. **Styling issues**: Verify classNames prop usage and CSS imports
3. **Performance problems**: Implement proper date comparison optimizations
4. **Timezone issues**: Use consistent timezone handling for global operations
5. **Mobile layout problems**: Test responsive behavior on different screen sizes

## Best Practices
- Use appropriate calendar modes for different maritime use cases
- Implement proper timezone handling for international operations
- Provide clear visual indicators for different event types
- Consider weather and operational constraints in date selection
- Use consistent date formatting throughout maritime applications
- Implement proper validation for date ranges and constraints
- Provide helpful legends and context for maritime-specific events
- Consider offline scenarios for maritime environments