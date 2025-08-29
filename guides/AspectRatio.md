# Aspect Ratio Component Implementation Guide

## Component Overview
The `AspectRatio` component from `scomp-ui/sail-ui-kit` maintains consistent proportional layouts for maritime content like vessel images, charts, maps, and diagrams. Essential for responsive design in fleet management interfaces.

## Props Interface
```typescript
interface AspectRatioProps {
  ratio?: number;
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import { AspectRatio } from "scomp-ui/sail-ui-kit";

function VesselImageDisplay({ vessel }: { vessel: Vessel }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{vessel.name}</h3>
      
      {/* 16:9 aspect ratio for vessel photos */}
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
        <img
          src={vessel.imageUrl}
          alt={`${vessel.name} vessel image`}
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      
      <div className="text-sm text-muted-foreground">
        <p>IMO: {vessel.imo}</p>
        <p>Type: {vessel.type}</p>
        <p>DWT: {vessel.dwt.toLocaleString()} MT</p>
      </div>
    </div>
  );
}
```

## Advanced Maritime Implementation
```tsx
import { AspectRatio } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";

interface MaritimeContentGalleryProps {
  vessel: {
    name: string;
    images: string[];
    charts: string[];
    diagrams: string[];
  };
}

function MaritimeContentGallery({ vessel }: MaritimeContentGalleryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{vessel.name} - Visual Documentation</h2>
      
      {/* Main vessel image - 3:2 aspect ratio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Vessel Overview
            <Badge variant="outline">Main Image</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={3 / 2} className="bg-muted rounded-lg overflow-hidden">
            <img
              src={vessel.images[0]}
              alt={`${vessel.name} main view`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardContent>
      </Card>
      
      {/* Navigation charts - Square aspect ratio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Navigation Charts
            <Badge variant="outline">1:1 Ratio</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vessel.charts.map((chart, index) => (
              <AspectRatio key={index} ratio={1} className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={chart}
                  alt={`Navigation chart ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Technical diagrams - 4:3 aspect ratio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Technical Diagrams
            <Badge variant="outline">4:3 Ratio</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {vessel.diagrams.map((diagram, index) => (
              <div key={index} className="space-y-2">
                <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg overflow-hidden">
                  <img
                    src={diagram}
                    alt={`Technical diagram ${index + 1}`}
                    className="object-contain w-full h-full p-2"
                  />
                </AspectRatio>
                <p className="text-sm text-muted-foreground text-center">
                  Diagram {index + 1}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Port and Route Visualization
```tsx
import { AspectRatio } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";

interface RouteMapProps {
  route: {
    id: string;
    origin: string;
    destination: string;
    mapUrl: string;
    distance: number;
    estimatedTime: string;
  };
}

function RouteMapDisplay({ route }: RouteMapProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Route: {route.origin} → {route.destination}
        </CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Distance: {route.distance} nm</span>
          <span>ETA: {route.estimatedTime}</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* 21:9 aspect ratio for wide route maps */}
        <AspectRatio ratio={21 / 9} className="bg-muted rounded-lg overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${route.mapUrl})` }}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent to-black/20 flex items-end p-4">
              <div className="text-white">
                <h4 className="font-semibold">{route.origin} to {route.destination}</h4>
                <p className="text-sm opacity-90">{route.distance} nautical miles</p>
              </div>
            </div>
          </div>
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
```

## Document and Certificate Display
```tsx
import { AspectRatio } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { Calendar, FileText } from "lucide-react";

interface CertificateDisplayProps {
  certificates: {
    id: string;
    name: string;
    type: string;
    imageUrl: string;
    expiryDate: string;
    status: "valid" | "expiring" | "expired";
  }[];
}

function CertificateDisplay({ certificates }: CertificateDisplayProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-green-600";
      case "expiring": return "bg-yellow-600";
      case "expired": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Vessel Certificates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {cert.name}
                </span>
                <Badge className={`${getStatusColor(cert.status)} text-white text-xs`}>
                  {cert.status}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Expires: {cert.expiryDate}</span>
              </div>
            </CardHeader>
            <CardContent>
              {/* A4 aspect ratio for certificates */}
              <AspectRatio ratio={210 / 297} className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={cert.imageUrl}
                  alt={`${cert.name} certificate`}
                  className="object-contain w-full h-full p-2"
                />
              </AspectRatio>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## Fleet Dashboard Charts
```tsx
import { AspectRatio } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";

function FleetDashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fleet status overview - 16:9 */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <div className="w-full h-full flex items-center justify-center">
              {/* Chart component would go here */}
              <div className="text-center">
                <h4 className="font-semibold">Fleet Performance Chart</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time fleet status visualization
                </p>
              </div>
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
      
      {/* TMSA compliance - 4:3 */}
      <Card>
        <CardHeader>
          <CardTitle>TMSA Compliance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <h4 className="font-semibold">Compliance Dashboard</h4>
                <p className="text-sm text-muted-foreground">
                  TMSA elements compliance overview
                </p>
              </div>
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Image optimization**: Consider lazy loading for large image galleries
- **Responsive design**: Works with CSS Grid and Flexbox layouts

## Maritime-Specific Use Cases
1. **Vessel Images**: Consistent proportions for fleet galleries
2. **Navigation Charts**: Standard aspect ratios for chart displays
3. **Technical Diagrams**: Engineering drawings and schematics
4. **Route Maps**: Wide-format route visualizations
5. **Certificate Display**: Document and certificate previews
6. **Dashboard Charts**: Consistent chart container sizing
7. **Port Layouts**: Port facility maps and berth diagrams

## Integration with Fleet Management
```tsx
// Example: Responsive vessel gallery
function VesselGallery({ vessels }: { vessels: Vessel[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {vessels.map((vessel) => (
        <Card key={vessel.id} className="overflow-hidden">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <img
              src={vessel.thumbnailUrl}
              alt={vessel.name}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <CardContent className="p-3">
            <h4 className="font-semibold truncate">{vessel.name}</h4>
            <p className="text-sm text-muted-foreground">
              {vessel.type} • {vessel.flag}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## Common Aspect Ratios for Maritime Content
- **16:9**: Wide vessel photos, dashboard charts
- **4:3**: Technical diagrams, traditional photos
- **3:2**: Professional vessel photography
- **1:1**: Square thumbnails, profile images
- **21:9**: Ultra-wide route maps, panoramic views
- **210:297** (A4): Certificate and document display

## Styling and Theming
The AspectRatio component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Maintains proportions across all screen sizes
- **Overflow handling**: Proper image containment and covering
- **Loading states**: Placeholder backgrounds during image loading
- **Accessibility**: Proper alt text for maritime images

## Troubleshooting
1. **Images not displaying**: Check image URLs and network accessibility
2. **Aspect ratio not maintained**: Ensure container has proper dimensions
3. **Content overflow**: Use `overflow-hidden` class on AspectRatio
4. **Responsive issues**: Test aspect ratios on different screen sizes
5. **Performance problems**: Implement lazy loading for image galleries

## Best Practices
- Use consistent aspect ratios throughout the maritime application
- Implement lazy loading for large vessel image galleries
- Provide placeholder content during image loading
- Use appropriate object-fit values (cover vs contain) based on content type
- Consider mobile-first responsive design for maritime interfaces
- Include proper alt text for accessibility compliance
- Optimize images for web delivery to improve loading performance