# Avatar Component Implementation Guide

## Component Overview
The `Avatar` component from `scomp-ui/sail-ui-kit` displays crew member profile images, vessel icons, and user representations in maritime applications. Essential for crew management, user profiles, and fleet identification.

## Props Interface
```typescript
interface AvatarProps {
  className?: string;
  children: React.ReactNode;
}

interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

interface AvatarFallbackProps {
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";

function CrewMemberAvatar({ crewMember }: { crewMember: CrewMember }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage 
          src={crewMember.photoUrl} 
          alt={`${crewMember.firstName} ${crewMember.lastName}`} 
        />
        <AvatarFallback className="bg-[#16569e] text-white">
          {crewMember.firstName[0]}{crewMember.lastName[0]}
        </AvatarFallback>
      </Avatar>
      
      <div>
        <p className="font-medium">{crewMember.firstName} {crewMember.lastName}</p>
        <p className="text-sm text-muted-foreground">{crewMember.rank}</p>
      </div>
    </div>
  );
}
```

## Advanced Maritime Implementation
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { Crown, Anchor, Users, AlertCircle } from "lucide-react";

interface CrewMemberListProps {
  crewMembers: {
    id: string;
    firstName: string;
    lastName: string;
    rank: string;
    nationality: string;
    photoUrl?: string;
    status: "onboard" | "onleave" | "medical" | "training";
    isOfficer: boolean;
    certificationStatus: "valid" | "expiring" | "expired";
  }[];
}

function CrewMemberList({ crewMembers }: CrewMemberListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "onboard": return "bg-green-600";
      case "onleave": return "bg-blue-600";
      case "medical": return "bg-red-600";
      case "training": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getCertificationIcon = (status: string) => {
    switch (status) {
      case "valid": return null;
      case "expiring": return <AlertCircle className="h-3 w-3 text-yellow-500" />;
      case "expired": return <AlertCircle className="h-3 w-3 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Crew Members</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crewMembers.map((member) => (
          <div 
            key={member.id} 
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            {/* Avatar with status indicator */}
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage 
                  src={member.photoUrl} 
                  alt={`${member.firstName} ${member.lastName}`} 
                />
                <AvatarFallback className="bg-[#16569e] text-white font-semibold">
                  {member.firstName[0]}{member.lastName[0]}
                </AvatarFallback>
              </Avatar>
              
              {/* Status indicator */}
              <div 
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                title={member.status}
              />
              
              {/* Officer indicator */}
              {member.isOfficer && (
                <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium truncate">
                  {member.firstName} {member.lastName}
                </p>
                {getCertificationIcon(member.certificationStatus)}
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">{member.rank}</p>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {member.nationality}
                </Badge>
                <Badge 
                  className={`${getStatusColor(member.status)} text-white text-xs`}
                >
                  {member.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Vessel Avatar Implementation
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Ship, Anchor } from "lucide-react";

interface VesselAvatarProps {
  vessel: {
    id: string;
    name: string;
    type: string;
    imageUrl?: string;
    status: "operational" | "maintenance" | "drydock" | "transit";
  };
  size?: "sm" | "md" | "lg" | "xl";
}

function VesselAvatar({ vessel, size = "md" }: VesselAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const getVesselTypeIcon = (type: string) => {
    if (type.toLowerCase().includes("tanker")) {
      return "T";
    }
    if (type.toLowerCase().includes("container")) {
      return "C";
    }
    if (type.toLowerCase().includes("bulk")) {
      return "B";
    }
    return vessel.name.substring(0, 2).toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-600";
      case "maintenance": return "bg-yellow-600";
      case "drydock": return "bg-red-600";
      case "transit": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="relative">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage 
          src={vessel.imageUrl} 
          alt={`${vessel.name} vessel`} 
        />
        <AvatarFallback className="bg-[#16569e] text-white font-bold">
          {getVesselTypeIcon(vessel.type)}
        </AvatarFallback>
      </Avatar>
      
      {/* Status indicator */}
      <div 
        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(vessel.status)}`}
        title={vessel.status}
      />
    </div>
  );
}
```

## User Profile with Rank Indicators
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";

interface UserProfileAvatarProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    rank: string;
    department: string;
    photoUrl?: string;
    licenseNumber: string;
    nationality: string;
    experience: number; // years
  };
}

function UserProfileAvatar({ user }: UserProfileAvatarProps) {
  const getRankStripes = (rank: string) => {
    const officerRanks = ["Master", "Chief Officer", "Chief Engineer", "2nd Officer", "2nd Engineer"];
    return officerRanks.includes(rank) ? 3 : 1;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage 
                src={user.photoUrl} 
                alt={`${user.firstName} ${user.lastName}`} 
              />
              <AvatarFallback className="bg-[#16569e] text-white text-xl font-bold">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            {/* Rank stripes */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                {Array.from({ length: getRankStripes(user.rank) }).map((_, index) => (
                  <div 
                    key={index} 
                    className="w-6 h-1 bg-yellow-500 rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold">{user.firstName} {user.lastName}</h3>
        <p className="text-muted-foreground">{user.rank}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="font-medium">Department:</span>
          <span>{user.department}</span>
          
          <span className="font-medium">License:</span>
          <span className="font-mono text-xs">{user.licenseNumber}</span>
          
          <span className="font-medium">Nationality:</span>
          <span>{user.nationality}</span>
          
          <span className="font-medium">Experience:</span>
          <span>{user.experience} years</span>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="outline">{user.rank}</Badge>
          <Badge variant="outline">{user.department}</Badge>
          <Badge variant="outline">{user.nationality}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Avatar Group for Team Display
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "scomp-ui/sail-ui-kit";

interface AvatarGroupProps {
  members: {
    id: string;
    name: string;
    photoUrl?: string;
    rank: string;
  }[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

function AvatarGroup({ members, max = 5, size = "md" }: AvatarGroupProps) {
  const displayMembers = members.slice(0, max);
  const extraCount = members.length - max;
  
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base"
  };

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayMembers.map((member, index) => (
          <Avatar 
            key={member.id} 
            className={`${sizeClasses[size]} border-2 border-white z-${10 - index}`}
          >
            <AvatarImage 
              src={member.photoUrl} 
              alt={member.name} 
            />
            <AvatarFallback className="bg-[#16569e] text-white">
              {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        ))}
        
        {extraCount > 0 && (
          <Avatar className={`${sizeClasses[size]} border-2 border-white bg-muted`}>
            <AvatarFallback className="text-muted-foreground">
              +{extraCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      
      <span className="ml-3 text-sm text-muted-foreground">
        {members.length} crew member{members.length !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Image optimization**: Consider lazy loading and image compression
- **Accessibility**: Proper alt text and screen reader support

## Maritime-Specific Use Cases
1. **Crew Profiles**: Individual crew member identification and status
2. **Vessel Identification**: Ship avatars with type and status indicators
3. **User Management**: System user profiles with rank indicators
4. **Team Display**: Crew team groupings and department views
5. **Contact Lists**: Maritime personnel directories
6. **Bridge Team**: Current watch officer displays
7. **Emergency Contacts**: Quick access to key personnel

## Integration with Fleet Management
```tsx
// Example: Vessel crew summary with avatars
function VesselCrewSummary({ vessel }: { vessel: Vessel }) {
  const { data: crew, isLoading } = useQuery({
    queryKey: ["/api/crew", vessel.id],
  });

  if (isLoading) return <div>Loading crew...</div>;

  const officers = crew?.filter(member => member.isOfficer) || [];
  const ratings = crew?.filter(member => !member.isOfficer) || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Crew Summary - {vessel.name}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Officers ({officers.length})</h4>
          <AvatarGroup members={officers} max={6} size="md" />
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Ratings ({ratings.length})</h4>
          <AvatarGroup members={ratings} max={8} size="sm" />
        </div>
      </div>
    </div>
  );
}
```

## Styling and Theming
The Avatar component follows maritime blue theme (#16569e) and supports:
- **Responsive sizing**: Multiple size variants for different contexts
- **Status indicators**: Color-coded status overlays
- **Rank indicators**: Visual rank designation for maritime personnel
- **Fallback styling**: Consistent initials when images unavailable

## Troubleshooting
1. **Images not loading**: Verify image URLs and implement proper fallbacks
2. **Fallback text issues**: Ensure proper name parsing for initials
3. **Sizing problems**: Use consistent size classes across components
4. **Overlay positioning**: Check z-index and positioning for status indicators
5. **Performance issues**: Implement lazy loading for large crew lists

## Best Practices
- Always provide meaningful fallback initials for crew members
- Use consistent sizing throughout maritime applications
- Implement status indicators for operational awareness
- Include rank or role indicators for maritime hierarchy
- Optimize images for web delivery and implement lazy loading
- Provide proper alt text for accessibility
- Use maritime-appropriate color schemes for status indicators
- Consider offline scenarios with proper fallback handling