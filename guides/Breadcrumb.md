# Breadcrumb Component Implementation Guide

## Component Overview
The `Breadcrumb` component from `scomp-ui/sail-ui-kit` provides navigation context and hierarchy for maritime applications. Essential for complex fleet management interfaces with deep navigation structures.

## Props Interface
```typescript
interface BreadcrumbProps {
  className?: string;
  separator?: React.ReactNode;
  children: React.ReactNode;
}

interface BreadcrumbListProps {
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbItemProps {
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbLinkProps {
  href?: string;
  className?: string;
  asChild?: boolean;
  children: React.ReactNode;
}

interface BreadcrumbPageProps {
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbSeparatorProps {
  className?: string;
  children?: React.ReactNode;
}

interface BreadcrumbEllipsisProps {
  className?: string;
}
```

## Basic Usage Example
```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "scomp-ui/sail-ui-kit";

function VesselNavigationBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/fleet">Fleet Management</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/fleet/vessels">Vessels</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/fleet/vessels/mv-ocean-star">MV Ocean Star</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Crew Management</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { ChevronRight, Ship, Users, FileText } from "lucide-react";

interface NavigationBreadcrumbProps {
  path: {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    badge?: string;
    isCurrent?: boolean;
  }[];
}

function NavigationBreadcrumb({ path }: NavigationBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {path.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={item.href} 
                  className="flex items-center gap-2 hover:text-[#16569e]"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="outline" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < path.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Usage example
function TMSAComplianceBreadcrumb() {
  const navigationPath = [
    {
      label: "Fleet",
      href: "/fleet",
      icon: <Ship className="h-4 w-4" />,
    },
    {
      label: "MV Ocean Star",
      href: "/fleet/mv-ocean-star",
      icon: <Ship className="h-4 w-4" />,
      badge: "Oil Tanker",
    },
    {
      label: "TMSA Compliance",
      href: "/fleet/mv-ocean-star/tmsa",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Element 3 - Crewing",
      isCurrent: true,
      icon: <Users className="h-4 w-4" />,
      badge: "Non-Compliant",
    },
  ];

  return <NavigationBreadcrumb path={navigationPath} />;
}
```

## Responsive Breadcrumb with Ellipsis
```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "scomp-ui/sail-ui-kit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "scomp-ui/sail-ui-kit";

interface ResponsiveBreadcrumbProps {
  items: {
    label: string;
    href?: string;
    isCurrent?: boolean;
  }[];
  maxVisibleItems?: number;
}

function ResponsiveBreadcrumb({ items, maxVisibleItems = 3 }: ResponsiveBreadcrumbProps) {
  const shouldCollapse = items.length > maxVisibleItems;
  
  if (!shouldCollapse) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const firstItem = items[0];
  const hiddenItems = items.slice(1, -2);
  const lastTwoItems = items.slice(-2);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={firstItem.href}>{firstItem.label}</BreadcrumbLink>
        </BreadcrumbItem>
        
        {hiddenItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {hiddenItems.map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <a href={item.href}>{item.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        
        {lastTwoItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Fleet Management Breadcrumb
```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "scomp-ui/sail-ui-kit";
import { useLocation } from "wouter";

function FleetManagementBreadcrumb() {
  const [location] = useLocation();
  
  // Parse the current route to generate breadcrumb items
  const generateBreadcrumbItems = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const items = [
      { label: "Dashboard", href: "/" }
    ];

    let currentPath = "";
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      switch (segment) {
        case "fleet":
          items.push({ label: "Fleet Management", href: currentPath });
          break;
        case "vessels":
          items.push({ label: "Vessels", href: currentPath });
          break;
        case "crew":
          items.push({ label: "Crew Management", href: currentPath });
          break;
        case "compliance":
          items.push({ label: "TMSA Compliance", href: currentPath });
          break;
        case "reports":
          items.push({ label: "Reports", href: currentPath });
          break;
        default:
          // Handle vessel names and IDs
          if (segment.startsWith("mv-") || segment.match(/^[0-9a-f-]+$/)) {
            const vesselName = segment.replace(/^mv-/, "").replace(/-/g, " ");
            items.push({ 
              label: vesselName.replace(/\b\w/g, l => l.toUpperCase()), 
              href: currentPath 
            });
          } else {
            items.push({ 
              label: segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), 
              href: currentPath 
            });
          }
      }
    });

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems(location);

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage className="text-[#16569e] font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href} className="hover:text-[#16569e]">
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Module-Specific Breadcrumbs
```tsx
// Crew Management Module
function CrewBreadcrumb({ vesselId, crewMemberId }: { vesselId?: string; crewMemberId?: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/fleet">Fleet</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/crew">Crew Management</BreadcrumbLink>
        </BreadcrumbItem>
        {vesselId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/crew/vessel/${vesselId}`}>
                Vessel Crew
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {crewMemberId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Crew Member Details</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// TMSA Compliance Module
function TMSABreadcrumb({ vesselId, elementId }: { vesselId?: string; elementId?: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/fleet">Fleet</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/compliance">TMSA Compliance</BreadcrumbLink>
        </BreadcrumbItem>
        {vesselId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/compliance/vessel/${vesselId}`}>
                Vessel Compliance
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {elementId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Element {elementId}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Context Requirements
- **Router integration**: Works with Wouter or other routing libraries
- **No special context required** - Standalone component
- **State management**: Optional for dynamic navigation state

## Maritime-Specific Use Cases
1. **Fleet Navigation**: Multi-level fleet management hierarchy
2. **Vessel Details**: Deep navigation into vessel-specific information
3. **Crew Management**: Navigation through crew assignment and details
4. **TMSA Compliance**: Element-specific compliance navigation
5. **Document Management**: Certificate and document file structure
6. **Port Operations**: Port-specific operational workflows
7. **Reporting**: Multi-level report and analytics navigation

## Integration with Fleet Management
```tsx
// Example: Dynamic breadcrumb with vessel context
function DynamicFleetBreadcrumb() {
  const [location] = useLocation();
  const { data: currentVessel } = useQuery({
    queryKey: ["/api/current-vessel"],
    enabled: location.includes("/vessel/"),
  });

  const { data: breadcrumbData } = useQuery({
    queryKey: ["/api/breadcrumb", location],
  });

  if (!breadcrumbData) return null;

  return (
    <div className="bg-muted/30 px-4 py-2 border-b">
      <ResponsiveBreadcrumb 
        items={breadcrumbData.items}
        maxVisibleItems={4}
      />
      
      {currentVessel && (
        <div className="mt-2 text-sm text-muted-foreground">
          Current Context: {currentVessel.name} ({currentVessel.type})
        </div>
      )}
    </div>
  );
}
```

## Styling and Theming
The Breadcrumb component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Collapsible navigation for mobile devices
- **Icon integration**: Maritime-specific icons for different sections
- **Badge support**: Status indicators and additional context
- **Hover states**: Clear interactive feedback

## Troubleshooting
1. **Links not working**: Verify href props and routing setup
2. **Responsive issues**: Test ellipsis behavior on different screen sizes
3. **Styling problems**: Check className application and theme consistency
4. **Icon alignment**: Ensure proper spacing with text and icons
5. **Dropdown not working**: Verify DropdownMenu component integration

## Best Practices
- Keep breadcrumb labels concise and descriptive
- Use consistent navigation patterns across maritime modules
- Implement responsive behavior for mobile maritime interfaces
- Include vessel context when relevant for operational clarity
- Use maritime-appropriate icons and terminology
- Provide clear visual hierarchy with proper spacing
- Consider operational context when designing navigation flows
- Test navigation flows with real maritime workflows