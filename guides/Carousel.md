# Carousel Component Implementation Guide

## Component Overview
The `Carousel` component from `scomp-ui/sail-ui-kit` provides an interactive slideshow for maritime content like vessel galleries, equipment documentation, and operational procedures. Essential for showcasing fleet assets and visual documentation.

## Props Interface
```typescript
interface CarouselProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: React.ReactNode;
}

interface CarouselContentProps {
  className?: string;
  children: React.ReactNode;
}

interface CarouselItemProps {
  className?: string;
  children: React.ReactNode;
}

interface CarouselPreviousProps {
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

interface CarouselNextProps {
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}
```

## Basic Usage Example
```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent } from "scomp-ui/sail-ui-kit";

function VesselImageCarousel({ vessel }: { vessel: Vessel }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">{vessel.name} - Image Gallery</h3>
      
      <Carousel className="w-full">
        <CarouselContent>
          {vessel.images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-0">
                  <img 
                    src={image.url}
                    alt={`${vessel.name} - ${image.caption}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
              {image.caption && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {image.caption}
                </p>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { useState } from "react";

interface FleetOverviewCarouselProps {
  vessels: {
    id: string;
    name: string;
    type: string;
    imageUrl: string;
    status: "operational" | "maintenance" | "drydock" | "loading" | "discharging";
    location: string;
    nextPort: string;
    eta: string;
    cargo: string;
    dwt: number;
    crew: number;
  }[];
}

function FleetOverviewCarousel({ vessels }: FleetOverviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-600";
      case "loading": return "bg-blue-600";
      case "discharging": return "bg-purple-600";
      case "maintenance": return "bg-yellow-600";
      case "drydock": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Fleet Overview</h2>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} of {vessels.length} vessels
        </div>
      </div>
      
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {vessels.map((vessel) => (
            <CarouselItem key={vessel.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{vessel.name}</CardTitle>
                    <Badge className={`${getStatusColor(vessel.status)} text-white text-xs`}>
                      {vessel.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{vessel.type}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Vessel Image */}
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={vessel.imageUrl}
                      alt={vessel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Vessel Details */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Current Location:</span>
                        <p className="text-muted-foreground">{vessel.location}</p>
                      </div>
                      <div>
                        <span className="font-medium">Next Port:</span>
                        <p className="text-muted-foreground">{vessel.nextPort}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">ETA:</span>
                        <p className="text-muted-foreground">{vessel.eta}</p>
                      </div>
                      <div>
                        <span className="font-medium">Crew:</span>
                        <p className="text-muted-foreground">{vessel.crew} persons</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Cargo:</span>
                      <p className="text-muted-foreground">{vessel.cargo}</p>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">DWT:</span>
                      <p className="text-muted-foreground">{vessel.dwt.toLocaleString()} MT</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
```

## Equipment Documentation Carousel
```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";

interface EquipmentDocument {
  id: string;
  title: string;
  type: "manual" | "diagram" | "specification" | "certificate" | "procedure";
  imageUrl: string;
  description: string;
  lastUpdated: string;
  version: string;
}

function EquipmentDocumentationCarousel({ documents }: { documents: EquipmentDocument[] }) {
  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "manual": return "bg-blue-600";
      case "diagram": return "bg-green-600";
      case "specification": return "bg-purple-600";
      case "certificate": return "bg-yellow-600";
      case "procedure": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Equipment Documentation</h3>
      
      <Carousel className="w-full">
        <CarouselContent>
          {documents.map((doc) => (
            <CarouselItem key={doc.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base leading-tight">{doc.title}</CardTitle>
                    <Badge className={`${getDocumentTypeColor(doc.type)} text-white text-xs ml-2`}>
                      {doc.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {/* Document Preview */}
                  <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={doc.imageUrl}
                      alt={doc.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  
                  {/* Document Details */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {doc.description}
                    </p>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Version {doc.version}</span>
                      <span>Updated {doc.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
```

## Safety Procedure Carousel
```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge, Button } from "scomp-ui/sail-ui-kit";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface SafetyProcedure {
  id: string;
  title: string;
  category: "emergency" | "routine" | "maintenance" | "navigation";
  priority: "low" | "medium" | "high" | "critical";
  steps: string[];
  estimatedTime: string;
  requiredPersonnel: number;
  imageUrl?: string;
  lastReviewed: string;
}

function SafetyProcedureCarousel({ procedures }: { procedures: SafetyProcedure[] }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emergency": return <AlertTriangle className="h-4 w-4" />;
      case "routine": return <CheckCircle className="h-4 w-4" />;
      case "maintenance": return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Safety Procedures</h3>
      
      <Carousel className="w-full">
        <CarouselContent>
          {procedures.map((procedure) => (
            <CarouselItem key={procedure.id} className="md:basis-1/2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      {getCategoryIcon(procedure.category)}
                      {procedure.title}
                    </CardTitle>
                    <Badge className={`${getPriorityColor(procedure.priority)} text-white text-xs`}>
                      {procedure.priority}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Procedure Image */}
                  {procedure.imageUrl && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={procedure.imageUrl}
                        alt={procedure.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Procedure Info */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Time:</span>
                      <p className="text-muted-foreground">{procedure.estimatedTime}</p>
                    </div>
                    <div>
                      <span className="font-medium">Personnel:</span>
                      <p className="text-muted-foreground">{procedure.requiredPersonnel} persons</p>
                    </div>
                  </div>
                  
                  {/* Procedure Steps */}
                  <div>
                    <span className="font-medium text-sm">Key Steps:</span>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground mt-1 space-y-1">
                      {procedure.steps.slice(0, 3).map((step, index) => (
                        <li key={index} className="line-clamp-1">{step}</li>
                      ))}
                      {procedure.steps.length > 3 && (
                        <li className="text-xs">... and {procedure.steps.length - 3} more steps</li>
                      )}
                    </ol>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Reviewed: {procedure.lastReviewed}
                    </span>
                    <Button size="sm" variant="outline">
                      View Full Procedure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
```

## Port Information Carousel
```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { MapPin, Anchor, Clock, DollarSign } from "lucide-react";

interface PortInfo {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  maxDraft: number;
  berthLength: number;
  pilotage: "compulsory" | "optional" | "not-required";
  anchorage: boolean;
  services: string[];
  restrictions: string[];
  contactInfo: string;
}

function PortInformationCarousel({ ports }: { ports: PortInfo[] }) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Port Information</h3>
      
      <Carousel className="w-full">
        <CarouselContent>
          {ports.map((port) => (
            <CarouselItem key={port.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {port.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{port.country}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Port Image */}
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={port.imageUrl}
                      alt={port.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Port Specifications */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Max Draft:</span>
                        <p className="text-muted-foreground">{port.maxDraft}m</p>
                      </div>
                      <div>
                        <span className="font-medium">Berth Length:</span>
                        <p className="text-muted-foreground">{port.berthLength}m</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Pilotage:</span>
                      <p className="text-muted-foreground capitalize">{port.pilotage.replace("-", " ")}</p>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Anchorage:</span>
                      <p className="text-muted-foreground">{port.anchorage ? "Available" : "Not Available"}</p>
                    </div>
                  </div>
                  
                  {/* Services */}
                  <div>
                    <span className="font-medium text-sm">Services:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {port.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                      {port.services.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{port.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Contact */}
                  <div className="text-xs text-muted-foreground">
                    Contact: {port.contactInfo}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Embla Carousel**: Uses Embla Carousel under the hood for smooth performance
- **Image optimization**: Consider lazy loading for large image galleries

## Maritime-Specific Use Cases
1. **Vessel Galleries**: Showcase fleet vessels with detailed information
2. **Equipment Documentation**: Display technical manuals and diagrams
3. **Safety Procedures**: Present emergency and routine procedures
4. **Port Information**: Show port facilities and requirements
5. **Certificate Display**: Showcase vessel certificates and documentation
6. **Training Materials**: Present educational content and procedures
7. **Route Visualization**: Display route options and alternatives

## Integration with Fleet Management
```tsx
// Example: Dynamic fleet carousel with real-time data
function DynamicFleetCarousel() {
  const { data: vessels, isLoading } = useQuery({
    queryKey: ["/api/fleet-overview"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return <div>Loading fleet information...</div>;
  }

  return (
    <div className="space-y-6">
      <FleetOverviewCarousel vessels={vessels || []} />
      
      <div className="text-center">
        <Button variant="outline" asChild>
          <a href="/fleet">View Full Fleet</a>
        </Button>
      </div>
    </div>
  );
}
```

## Styling and Theming
The Carousel component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Adapts to mobile and desktop layouts
- **Custom controls**: Styled navigation buttons
- **Smooth animations**: Embla Carousel integration for performance
- **Maritime styling**: Consistent with fleet management interfaces

## Troubleshooting
1. **Navigation not working**: Check if CarouselPrevious/Next components are included
2. **Images not loading**: Verify image URLs and implement proper fallbacks
3. **Layout issues**: Ensure proper basis classes for responsive design
4. **Performance problems**: Implement lazy loading for large image sets
5. **Touch gestures not working**: Verify Embla Carousel setup and mobile touch support

## Best Practices
- Use appropriate aspect ratios for maritime content
- Implement lazy loading for large vessel image galleries
- Provide meaningful alt text for all maritime images
- Use consistent card layouts across different carousel types
- Consider mobile-first responsive design for maritime interfaces
- Include relevant metadata and context for maritime content
- Implement proper error handling for missing images or data
- Provide clear navigation indicators for complex carousels