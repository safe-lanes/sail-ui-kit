# Hover Card Component Implementation Guide

## Component Overview
The `HoverCard` component from `scomp-ui/sail-ui-kit` provides rich tooltips and preview content for maritime applications. Essential for displaying detailed information on hover without cluttering the main interface in fleet management systems.

## Props Interface
```typescript
interface HoverCardProps {
  openDelay?: number;
  closeDelay?: number;
  children: React.ReactNode;
}

interface HoverCardTriggerProps {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface HoverCardContentProps {
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "scomp-ui/sail-ui-kit";
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { Ship, MapPin, Users, Calendar } from "lucide-react";

function VesselHoverCard({ vessel }: { vessel: Vessel }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-[#16569e] hover:underline font-medium">
          {vessel.name}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-[#16569e]" />
              <h4 className="font-semibold">{vessel.name}</h4>
            </div>
            <Badge variant="outline">{vessel.status}</Badge>
          </div>
          
          {/* Vessel Details */}
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">IMO:</span>
              <span className="font-mono">{vessel.imo}</span>
              
              <span className="text-muted-foreground">Type:</span>
              <span>{vessel.type}</span>
              
              <span className="text-muted-foreground">Flag:</span>
              <span>{vessel.flag}</span>
              
              <span className="text-muted-foreground">DWT:</span>
              <span>{vessel.dwt.toLocaleString()} MT</span>
            </div>
          </div>
          
          {/* Current Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Location:</span>
            <span>{vessel.currentLocation}</span>
          </div>
          
          {/* Crew Information */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Crew:</span>
            <span>{vessel.crewCount} persons</span>
          </div>
          
          {/* Last Update */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Last updated: {vessel.lastUpdate}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "scomp-ui/sail-ui-kit";
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Badge, Button } from "scomp-ui/sail-ui-kit";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface CrewMemberHoverCardProps {
  crewMember: {
    id: string;
    firstName: string;
    lastName: string;
    rank: string;
    nationality: string;
    photoUrl?: string;
    email: string;
    phone: string;
    currentVessel?: string;
    joinDate: string;
    contractExpiry: string;
    certificateStatus: "valid" | "expiring" | "expired";
    lastTraining: string;
    experience: number;
  };
}

function CrewMemberHoverCard({ crewMember }: CrewMemberHoverCardProps) {
  const getCertificateStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "text-green-600";
      case "expiring": return "text-yellow-600";
      case "expired": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getCertificateStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle className="h-3 w-3" />;
      case "expiring": return <AlertTriangle className="h-3 w-3" />;
      case "expired": return <AlertTriangle className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src={crewMember.photoUrl} alt={`${crewMember.firstName} ${crewMember.lastName}`} />
            <AvatarFallback className="text-xs">
              {crewMember.firstName[0]}{crewMember.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <div className="font-medium text-sm">
              {crewMember.firstName} {crewMember.lastName}
            </div>
            <div className="text-xs text-muted-foreground">{crewMember.rank}</div>
          </div>
        </button>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-96" side="right">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={crewMember.photoUrl} alt={`${crewMember.firstName} ${crewMember.lastName}`} />
              <AvatarFallback>
                {crewMember.firstName[0]}{crewMember.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold">
                {crewMember.firstName} {crewMember.lastName}
              </h4>
              <p className="text-sm text-muted-foreground">{crewMember.rank}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {crewMember.nationality}
                </Badge>
                <div className={`flex items-center gap-1 text-xs ${getCertificateStatusColor(crewMember.certificateStatus)}`}>
                  {getCertificateStatusIcon(crewMember.certificateStatus)}
                  <span className="capitalize">{crewMember.certificateStatus}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm">Contact Information</h5>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <a href={`mailto:${crewMember.email}`} className="text-[#16569e] hover:underline">
                  {crewMember.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <a href={`tel:${crewMember.phone}`} className="text-[#16569e] hover:underline">
                  {crewMember.phone}
                </a>
              </div>
            </div>
          </div>
          
          {/* Assignment Information */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm">Current Assignment</h5>
            <div className="space-y-1 text-sm">
              {crewMember.currentVessel ? (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{crewMember.currentVessel}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Available for assignment</span>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Join Date:</span>
                  <p>{crewMember.joinDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Contract Expiry:</span>
                  <p>{crewMember.contractExpiry}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Professional Information */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm">Professional Details</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Experience:</span>
                <p>{crewMember.experience} years</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Training:</span>
                <p>{crewMember.lastTraining}</p>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 pt-2 border-t">
            <Button size="sm" variant="outline" className="flex-1">
              View Profile
            </Button>
            <Button size="sm" className="flex-1 bg-[#16569e] hover:bg-[#16569e]/90">
              Contact
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Port Information Hover Card
```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { 
  MapPin, 
  Anchor, 
  Clock,
  DollarSign,
  AlertTriangle,
  Info
} from "lucide-react";

interface PortHoverCardProps {
  port: {
    id: string;
    name: string;
    country: string;
    maxDraft: number;
    berthLength: number;
    pilotage: "compulsory" | "optional" | "not-required";
    anchorage: boolean;
    tideRange: number;
    restrictions: string[];
    services: string[];
    averageWaitTime: string;
    portDues: string;
  };
}

function PortHoverCard({ port }: PortHoverCardProps) {
  const getPilotageColor = (pilotage: string) => {
    switch (pilotage) {
      case "compulsory": return "bg-red-600";
      case "optional": return "bg-yellow-600";
      case "not-required": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <button className="flex items-center gap-2 text-[#16569e] hover:underline">
          <MapPin className="h-4 w-4" />
          {port.name}
        </button>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-96" side="bottom">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold">{port.name}</h4>
              <Badge variant="outline">{port.country}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Port Information & Services</p>
          </div>
          
          {/* Port Specifications */}
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-sm mb-2">Port Specifications</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Max Draft:</span>
                  <p className="font-medium">{port.maxDraft}m</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Berth Length:</span>
                  <p className="font-medium">{port.berthLength}m</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tide Range:</span>
                  <p className="font-medium">{port.tideRange}m</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Anchorage:</span>
                  <p className="font-medium">{port.anchorage ? "Available" : "Not Available"}</p>
                </div>
              </div>
            </div>
            
            {/* Pilotage */}
            <div>
              <h5 className="font-medium text-sm mb-2">Pilotage</h5>
              <Badge className={`${getPilotageColor(port.pilotage)} text-white text-xs`}>
                {port.pilotage.replace("-", " ").toUpperCase()}
              </Badge>
            </div>
            
            {/* Operational Information */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <div>
                  <span className="text-xs text-muted-foreground">Avg Wait:</span>
                  <p className="text-sm font-medium">{port.averageWaitTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-3 w-3 text-muted-foreground" />
                <div>
                  <span className="text-xs text-muted-foreground">Port Dues:</span>
                  <p className="text-sm font-medium">{port.portDues}</p>
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h5 className="font-medium text-sm mb-2">Available Services</h5>
              <div className="flex flex-wrap gap-1">
                {port.services.slice(0, 4).map((service, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
                {port.services.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{port.services.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Restrictions */}
            {port.restrictions.length > 0 && (
              <div>
                <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-orange-600" />
                  Restrictions
                </h5>
                <div className="space-y-1">
                  {port.restrictions.slice(0, 2).map((restriction, index) => (
                    <p key={index} className="text-xs text-orange-700 bg-orange-50 p-1 rounded">
                      {restriction}
                    </p>
                  ))}
                  {port.restrictions.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{port.restrictions.length - 2} more restrictions
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
            <Info className="h-3 w-3" />
            <span>Click for detailed port information</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Certificate Status Hover Card
```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { 
  FileText, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock
} from "lucide-react";

interface CertificateHoverCardProps {
  certificate: {
    id: string;
    name: string;
    type: string;
    issueDate: string;
    expiryDate: string;
    issuingAuthority: string;
    status: "valid" | "expiring" | "expired";
    daysUntilExpiry: number;
    vesselName?: string;
    crewMemberName?: string;
  };
}

function CertificateHoverCard({ certificate }: CertificateHoverCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "text-green-600";
      case "expiring": return "text-yellow-600";
      case "expired": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle className="h-4 w-4" />;
      case "expiring": return <AlertTriangle className="h-4 w-4" />;
      case "expired": return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid": return <Badge className="bg-green-600 text-white">Valid</Badge>;
      case "expiring": return <Badge className="bg-yellow-600 text-white">Expiring Soon</Badge>;
      case "expired": return <Badge className="bg-red-600 text-white">Expired</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <HoverCard openDelay={400}>
      <HoverCardTrigger asChild>
        <button className={`flex items-center gap-2 p-1 rounded transition-colors ${getStatusColor(certificate.status)}`}>
          {getStatusIcon(certificate.status)}
          <span className="font-medium text-sm">{certificate.name}</span>
        </button>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80" side="top">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{certificate.name}</h4>
              <p className="text-sm text-muted-foreground">{certificate.type}</p>
            </div>
            {getStatusBadge(certificate.status)}
          </div>
          
          {/* Certificate Details */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Issue Date:</span>
                <p className="font-medium">{certificate.issueDate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Expiry Date:</span>
                <p className="font-medium">{certificate.expiryDate}</p>
              </div>
            </div>
            
            <div>
              <span className="text-muted-foreground text-sm">Issuing Authority:</span>
              <p className="font-medium">{certificate.issuingAuthority}</p>
            </div>
            
            {/* Holder Information */}
            {(certificate.vesselName || certificate.crewMemberName) && (
              <div>
                <span className="text-muted-foreground text-sm">
                  {certificate.vesselName ? "Vessel:" : "Crew Member:"}
                </span>
                <p className="font-medium">
                  {certificate.vesselName || certificate.crewMemberName}
                </p>
              </div>
            )}
          </div>
          
          {/* Status Information */}
          <div className={`p-3 rounded-lg ${
            certificate.status === "valid" ? "bg-green-50 border border-green-200" :
            certificate.status === "expiring" ? "bg-yellow-50 border border-yellow-200" :
            "bg-red-50 border border-red-200"
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <Clock className={`h-3 w-3 ${getStatusColor(certificate.status)}`} />
              <span className={`text-sm font-medium ${getStatusColor(certificate.status)}`}>
                {certificate.status === "valid" && certificate.daysUntilExpiry > 30 && "Certificate Valid"}
                {certificate.status === "valid" && certificate.daysUntilExpiry <= 30 && "Expires Soon"}
                {certificate.status === "expiring" && "Renewal Required"}
                {certificate.status === "expired" && "Certificate Expired"}
              </span>
            </div>
            
            <p className={`text-xs ${getStatusColor(certificate.status)}`}>
              {certificate.status === "expired" 
                ? `Expired ${Math.abs(certificate.daysUntilExpiry)} days ago`
                : certificate.daysUntilExpiry <= 0
                ? "Expires today"
                : `${certificate.daysUntilExpiry} days remaining`
              }
            </p>
          </div>
          
          {/* Warning for Critical Status */}
          {(certificate.status === "expired" || certificate.daysUntilExpiry <= 7) && (
            <div className="bg-red-50 border border-red-200 p-2 rounded text-xs">
              <div className="flex items-center gap-1 text-red-800 font-medium">
                <AlertTriangle className="h-3 w-3" />
                Action Required
              </div>
              <p className="text-red-700 mt-1">
                {certificate.status === "expired" 
                  ? "This certificate has expired and must be renewed immediately."
                  : "This certificate expires within 7 days. Renewal is urgently required."
                }
              </p>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Hover delay**: Configurable open and close delays for better UX
- **Positioning**: Smart positioning to avoid viewport edges

## Maritime-Specific Use Cases
1. **Vessel Information**: Quick vessel details on hover
2. **Crew Profiles**: Crew member contact and assignment information
3. **Port Details**: Port specifications and services
4. **Certificate Status**: Certificate validity and expiry information
5. **Equipment Status**: Equipment condition and maintenance details
6. **Route Information**: Route details and waypoint information
7. **Compliance Status**: TMSA compliance and audit information

## Integration with Fleet Management
```tsx
// Example: Dynamic hover card with data fetching
function VesselHoverCardWithData({ vesselId, children }: {
  vesselId: string;
  children: React.ReactNode;
}) {
  const { data: vessel, isLoading } = useQuery({
    queryKey: ["/api/vessels", vesselId],
    enabled: false, // Only fetch when hover card opens
  });

  return (
    <HoverCard onOpenChange={(open) => {
      if (open && !vessel && !isLoading) {
        // Trigger fetch when hover card opens
        queryClient.prefetchQuery({
          queryKey: ["/api/vessels", vesselId],
        });
      }
    }}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        {isLoading ? (
          <div>Loading vessel details...</div>
        ) : vessel ? (
          <VesselDetails vessel={vessel} />
        ) : (
          <div>Failed to load vessel details</div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Styling and Theming
The HoverCard component follows maritime blue theme (#16569e) and supports:
- **Responsive positioning**: Automatically adjusts position based on viewport
- **Smooth animations**: Fade in/out transitions
- **Maritime styling**: Consistent with fleet management interfaces
- **Rich content**: Supports complex layouts and interactive elements

## Troubleshooting
1. **Hover card not appearing**: Check trigger element and hover delays
2. **Positioning issues**: Adjust side and align props for better placement
3. **Content overflow**: Use appropriate width constraints and responsive design
4. **Performance issues**: Implement proper data fetching strategies
5. **Mobile interactions**: Consider touch interactions on mobile devices

## Best Practices
- Use appropriate hover delays to prevent accidental triggers
- Keep content concise but informative for maritime context
- Implement proper loading states for dynamic content
- Use consistent layout patterns across different hover cards
- Provide clear visual hierarchy with proper typography
- Consider accessibility for keyboard navigation
- Test positioning across different screen sizes and viewport positions
- Use maritime-appropriate terminology and information organization