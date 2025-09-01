# NavigationMenu Component Guide

## Overview
The NavigationMenu component provides a sophisticated navigation system for maritime applications. It supports multi-level navigation, animations, and responsive design optimized for TMSA-compliant fleet management systems.

## Component Interface

```typescript
interface NavigationMenuProps {
  className?: string;
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  delayDuration?: number;
  skipDelayDuration?: number;
}

interface NavigationMenuItemProps {
  className?: string;
  children: React.ReactNode;
}

interface NavigationMenuContentProps {
  className?: string;
  children: React.ReactNode;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
}
```

## Key Features
- **Smooth Animations**: Elegant transitions between navigation states
- **Maritime Hierarchy**: TMSA-compliant navigation structure
- **Responsive Design**: Adaptive layout for all screen sizes
- **Keyboard Navigation**: Full accessibility support
- **Visual Indicators**: Active states and navigation cues

## Basic Usage

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport
} from 'scomp-ui/sail-ui-kit';

function FleetNavigationMenu() {
  return (
    <NavigationMenu className="relative z-10 flex max-w-max flex-1 items-center justify-center">
      <NavigationMenuList className="group flex flex-1 list-none items-center justify-center space-x-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Fleet Management
          </NavigationMenuTrigger>
          <NavigationMenuContent className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
            <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/fleet"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-[#16569e]">
                      Fleet Dashboard
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Comprehensive overview of your entire fleet operations
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink href="/fleet/vessels" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Vessel Registry</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Manage vessel information and documentation
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/fleet/status" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Fleet Status</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Real-time status and location tracking
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Crew Operations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
              <NavigationMenuLink href="/crew/management" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Crew Management</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Manage crew assignments and schedules
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/crew/appraisals" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Performance Appraisals</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Conduct and track crew performance evaluations
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/crew/certifications" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">STCW Certifications</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Track certification status and renewals
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/crew/training" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Training Programs</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Manage training schedules and progress
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/safety" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Safety & Compliance
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## Maritime Operations Navigation

```tsx
interface NavigationItem {
  title: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

function MaritimeOperationsNav() {
  const fleetOperations: NavigationItem[] = [
    {
      title: "Vessel Tracking",
      href: "/fleet/tracking",
      description: "Real-time vessel positions and route monitoring",
      icon: <Ship className="h-6 w-6" />
    },
    {
      title: "Port Operations",
      href: "/fleet/ports",
      description: "Manage port calls, berth assignments, and cargo operations",
      icon: <Anchor className="h-6 w-6" />
    },
    {
      title: "Voyage Planning",
      href: "/fleet/voyage",
      description: "Plan routes, calculate fuel consumption, and weather routing",
      icon: <Navigation className="h-6 w-6" />
    },
    {
      title: "Maintenance Schedule",
      href: "/fleet/maintenance",
      description: "Track maintenance schedules and work orders",
      icon: <Settings className="h-6 w-6" />
    }
  ];

  const complianceItems: NavigationItem[] = [
    {
      title: "TMSA Compliance",
      href: "/compliance/tmsa",
      description: "Tanker Management Self Assessment compliance tracking"
    },
    {
      title: "ISM Audits",
      href: "/compliance/ism",
      description: "International Safety Management audit schedules"
    },
    {
      title: "Flag State Inspections",
      href: "/compliance/flag-state",
      description: "Manage flag state inspection requirements"
    }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Fleet Operations */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[#16569e] hover:text-[#134a87]">
            Fleet Operations
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              {fleetOperations.map((item) => (
                <NavigationMenuLink
                  key={item.href}
                  href={item.href}
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-[#16569e] focus:bg-blue-50 focus:text-[#16569e]"
                >
                  <div className="flex items-center space-x-3">
                    {item.icon && (
                      <div className="text-[#16569e] group-hover:text-[#134a87]">
                        {item.icon}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium leading-none">
                        {item.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Safety & Compliance */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[#16569e] hover:text-[#134a87]">
            Safety & Compliance
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[400px]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md"
                    href="/safety"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-[#16569e]">
                      Safety Dashboard
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Comprehensive safety management and compliance overview
                    </p>
                  </a>
                </NavigationMenuLink>
              </div>
              {complianceItems.map((item) => (
                <NavigationMenuLink
                  key={item.href}
                  href={item.href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-[#16569e] focus:bg-blue-50 focus:text-[#16569e]"
                >
                  <div className="text-sm font-medium leading-none">{item.title}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Quick Links */}
        <NavigationMenuItem>
          <NavigationMenuLink 
            href="/emergency"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-red-600 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700"
          >
            Emergency Response
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## Responsive Maritime Navigation

```tsx
function ResponsiveMaritimeNavigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Fleet</NavigationMenuTrigger>
              <NavigationMenuContent>
                <FleetNavigationContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Crew</NavigationMenuTrigger>
              <NavigationMenuContent>
                <CrewNavigationContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-[#16569e] text-white"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {isMobileOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="p-4 space-y-4">
              <MobileNavigationSection title="Fleet Management">
                <MobileNavigationLink href="/fleet/vessels">Vessel Registry</MobileNavigationLink>
                <MobileNavigationLink href="/fleet/status">Fleet Status</MobileNavigationLink>
                <MobileNavigationLink href="/fleet/tracking">Live Tracking</MobileNavigationLink>
              </MobileNavigationSection>
              
              <MobileNavigationSection title="Crew Operations">
                <MobileNavigationLink href="/crew/management">Crew Management</MobileNavigationLink>
                <MobileNavigationLink href="/crew/appraisals">Appraisals</MobileNavigationLink>
                <MobileNavigationLink href="/crew/certifications">Certifications</MobileNavigationLink>
              </MobileNavigationSection>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function MobileNavigationSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-medium text-[#16569e] mb-2">{title}</h3>
      <div className="space-y-1 pl-4">
        {children}
      </div>
    </div>
  );
}

function MobileNavigationLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block py-2 text-sm text-gray-600 hover:text-[#16569e] transition-colors"
    >
      {children}
    </a>
  );
}
```

## Multi-Level Navigation

```tsx
function MultiLevelMaritimeNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Vessel Management</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[600px] lg:grid-cols-3">
              {/* Vessel Operations Column */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#16569e]">Operations</h4>
                <NavigationMenuLink href="/vessels/tracking" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Live Tracking</div>
                  <p className="text-xs text-muted-foreground">Real-time vessel positions</p>
                </NavigationMenuLink>
                <NavigationMenuLink href="/vessels/voyage" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Voyage Planning</div>
                  <p className="text-xs text-muted-foreground">Route optimization</p>
                </NavigationMenuLink>
                <NavigationMenuLink href="/vessels/cargo" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Cargo Operations</div>
                  <p className="text-xs text-muted-foreground">Loading and discharge</p>
                </NavigationMenuLink>
              </div>

              {/* Maintenance Column */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#16569e]">Maintenance</h4>
                <NavigationMenuLink href="/vessels/maintenance/scheduled" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Scheduled Maintenance</div>
                  <p className="text-xs text-muted-foreground">Planned maintenance tasks</p>
                </NavigationMenuLink>
                <NavigationMenuLink href="/vessels/maintenance/emergency" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Emergency Repairs</div>
                  <p className="text-xs text-muted-foreground">Urgent maintenance issues</p>
                </NavigationMenuLink>
                <NavigationMenuLink href="/vessels/maintenance/dry-dock" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Dry Dock Schedule</div>
                  <p className="text-xs text-muted-foreground">Major overhaul planning</p>
                </NavigationMenuLink>
              </div>

              {/* Compliance Column */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-[#16569e]">Compliance</h4>
                <NavigationMenuLink href="/vessels/compliance/certificates" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Certificates</div>
                  <p className="text-xs text-muted-foreground">Vessel certifications</p>
                </NavigationMenuLink>
                <NavigationMenuLink href="/vessels/compliance/inspections" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Inspections</div>
                  <p className="text-xs text-muted-foreground">Port state control</p>
                </NavigationMenuLink>
                <NavigationMenuLink href="/vessels/compliance/audits" className="block space-y-1 rounded-md p-2 hover:bg-blue-50">
                  <div className="text-sm font-medium">Safety Audits</div>
                  <p className="text-xs text-muted-foreground">ISM and TMSA audits</p>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## Best Practices

1. **Logical Hierarchy**: Organize navigation by maritime functional areas
2. **Visual Consistency**: Maintain TMSA-compliant maritime theme
3. **Mobile Optimization**: Provide alternative mobile navigation patterns
4. **Loading States**: Show loading indicators for dynamic content
5. **Accessibility**: Ensure keyboard navigation and screen reader support
6. **Performance**: Lazy load navigation content when possible

## Context Requirements

The NavigationMenu component works with:
- **Router Integration**: Compatible with routing libraries
- **Permission System**: Role-based navigation visibility
- **Theme Context**: Maritime color scheme and styling
- **Responsive Framework**: Mobile and desktop layout handling

## Troubleshooting

### Common Issues

**Navigation not animating properly**
```tsx
// Ensure proper viewport configuration
<NavigationMenu>
  <NavigationMenuList>
    {/* navigation items */}
  </NavigationMenuList>
  <NavigationMenuViewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
</NavigationMenu>
```

**Mobile navigation overlay issues**
```tsx
// Use proper z-index and positioning
<div className="fixed inset-0 z-50 bg-white lg:hidden">
  <MobileNavigation />
</div>
```

**Keyboard navigation problems**
```tsx
// Ensure proper focus management
<NavigationMenuTrigger 
  className="focus:outline-none focus:ring-2 focus:ring-[#16569e] focus:ring-offset-2"
>
  Fleet Operations
</NavigationMenuTrigger>
```