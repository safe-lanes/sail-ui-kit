# Sidebar Component Guide

## Overview
The Sidebar component provides navigation panels for maritime applications. It creates collapsible, responsive navigation systems optimized for TMSA-compliant fleet management interfaces with proper hierarchy and accessibility.

## Component Interface

```typescript
interface SidebarProps {
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface SidebarHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarContentProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarFooterProps {
  className?: string;
  children: React.ReactNode;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Collapsible Design**: Space-efficient collapsed state with icons
- **Responsive Behavior**: Mobile-friendly navigation patterns
- **Hierarchical Structure**: Support for nested navigation items
- **Accessibility**: Proper ARIA attributes and keyboard navigation

## Basic Usage

```tsx
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem
} from 'scomp-ui/sail-ui-kit';

function FleetManagementSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar 
        collapsible 
        defaultCollapsed={collapsed}
        onCollapsedChange={setCollapsed}
        className="border-r border-gray-200 bg-white"
      >
        <SidebarHeader className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-[#16569e] rounded-lg flex items-center justify-center">
              <Ship className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-[#16569e]">FleetOps</h2>
                <p className="text-xs text-gray-500">Maritime Management</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </SidebarHeader>

        <SidebarContent className="flex-1 p-4">
          <SidebarNav>
            <SidebarNavItem
              icon={BarChart3}
              label="Dashboard"
              href="/dashboard"
              collapsed={collapsed}
              active
            />
            <SidebarNavItem
              icon={Ship}
              label="Fleet Management"
              href="/fleet"
              collapsed={collapsed}
            />
            <SidebarNavItem
              icon={Users}
              label="Crew Operations"
              href="/crew"
              collapsed={collapsed}
            />
            <SidebarNavItem
              icon={Shield}
              label="Safety & Compliance"
              href="/safety"
              collapsed={collapsed}
            />
            <SidebarNavItem
              icon={Settings}
              label="Maintenance"
              href="/maintenance"
              collapsed={collapsed}
            />
            <SidebarNavItem
              icon={FileText}
              label="Reports"
              href="/reports"
              collapsed={collapsed}
            />
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Captain Smith</p>
                <p className="text-xs text-gray-500 truncate">Fleet Manager</p>
              </div>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#16569e]">Fleet Dashboard</h1>
          {/* Main content */}
        </div>
      </main>
    </div>
  );
}

function SidebarNavItem({ icon: Icon, label, href, collapsed, active = false }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  collapsed: boolean;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
        active 
          ? 'bg-[#16569e] text-white' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      title={collapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </a>
  );
}
```

## Crew Management Sidebar

```tsx
function CrewManagementSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems = [
    {
      id: 'overview',
      icon: BarChart3,
      label: 'Overview',
      href: '/crew/overview',
      badge: null
    },
    {
      id: 'members',
      icon: Users,
      label: 'Crew Members',
      href: '/crew/members',
      badge: '486'
    },
    {
      id: 'appraisals',
      icon: ClipboardCheck,
      label: 'Appraisals',
      href: '/crew/appraisals',
      badge: '23'
    },
    {
      id: 'certifications',
      icon: Award,
      label: 'Certifications',
      href: '/crew/certifications',
      badge: '12'
    },
    {
      id: 'training',
      icon: BookOpen,
      label: 'Training Programs',
      href: '/crew/training',
      badge: null
    },
    {
      id: 'scheduling',
      icon: Calendar,
      label: 'Scheduling',
      href: '/crew/scheduling',
      badge: null
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        collapsible
        defaultCollapsed={collapsed}
        onCollapsedChange={setCollapsed}
        className="bg-white border-r border-gray-200"
      >
        <SidebarHeader className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-[#16569e] rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-xl font-bold text-[#16569e]">Crew Ops</h1>
                  <p className="text-sm text-gray-600">Personnel Management</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 px-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#16569e] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
                {!collapsed && item.badge && (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    activeSection === item.id
                      ? 'bg-white text-[#16569e]'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {!collapsed && (
            <div className="mt-8">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quick Actions
              </div>
              <div className="mt-2 space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Crew Member</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>New Appraisal</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Import Data</span>
                </button>
              </div>
            </div>
          )}
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-[#16569e] rounded-full flex items-center justify-center text-white text-sm font-medium">
              JS
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Smith</p>
                <p className="text-xs text-gray-500 truncate">Crew Manager</p>
              </div>
            )}
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <CrewContentArea activeSection={activeSection} />
        </div>
      </main>
    </div>
  );
}
```

## Mobile-Responsive Sidebar

```tsx
function ResponsiveMaritimeSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <MobileSidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:h-screen">
        <Sidebar
          collapsible
          defaultCollapsed={desktopCollapsed}
          onCollapsedChange={setDesktopCollapsed}
          className="bg-white border-r border-gray-200"
        >
          <DesktopSidebarContent collapsed={desktopCollapsed} />
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-[#16569e] hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-[#16569e]">Fleet Operations</h1>
            <button className="p-2 rounded-md text-gray-600 hover:text-[#16569e] hover:bg-gray-100">
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="p-4 lg:p-6">
          <FleetDashboardContent />
        </main>
      </div>
    </>
  );
}

function MobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <Sidebar className="h-full">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-[#16569e] rounded-lg flex items-center justify-center">
              <Ship className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#16569e]">FleetOps</h2>
              <p className="text-xs text-gray-500">Maritime Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-4">
        <nav className="space-y-2">
          <MobileNavItem icon={BarChart3} label="Dashboard" href="/dashboard" onClick={onClose} />
          <MobileNavItem icon={Ship} label="Fleet Management" href="/fleet" onClick={onClose} />
          <MobileNavItem icon={Users} label="Crew Operations" href="/crew" onClick={onClose} />
          <MobileNavItem icon={Shield} label="Safety & Compliance" href="/safety" onClick={onClose} />
          <MobileNavItem icon={Settings} label="Maintenance" href="/maintenance" onClick={onClose} />
          <MobileNavItem icon={FileText} label="Reports" href="/reports" onClick={onClose} />
        </nav>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Captain Smith</p>
            <p className="text-xs text-gray-500 truncate">Fleet Manager</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function MobileNavItem({ icon: Icon, label, href, onClick }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center space-x-3 px-3 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
```

## Nested Navigation Sidebar

```tsx
interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavigationItem[];
  badge?: string;
}

function NestedNavigationSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['fleet']));

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard'
    },
    {
      id: 'fleet',
      label: 'Fleet Management',
      icon: Ship,
      children: [
        { id: 'vessels', label: 'Vessel Registry', href: '/fleet/vessels' },
        { id: 'tracking', label: 'Live Tracking', href: '/fleet/tracking' },
        { id: 'maintenance', label: 'Maintenance', href: '/fleet/maintenance', badge: '5' },
        { id: 'documents', label: 'Documents', href: '/fleet/documents' }
      ]
    },
    {
      id: 'crew',
      label: 'Crew Operations',
      icon: Users,
      children: [
        { id: 'crew-list', label: 'Crew Members', href: '/crew/members', badge: '486' },
        { id: 'appraisals', label: 'Appraisals', href: '/crew/appraisals', badge: '12' },
        { id: 'certifications', label: 'Certifications', href: '/crew/certifications' },
        { id: 'training', label: 'Training', href: '/crew/training' }
      ]
    },
    {
      id: 'safety',
      label: 'Safety & Compliance',
      icon: Shield,
      children: [
        { id: 'incidents', label: 'Incident Reports', href: '/safety/incidents' },
        { id: 'audits', label: 'Safety Audits', href: '/safety/audits' },
        { id: 'tmsa', label: 'TMSA Compliance', href: '/safety/tmsa' }
      ]
    }
  ];

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsible
        defaultCollapsed={collapsed}
        onCollapsedChange={setCollapsed}
        className="bg-white border-r border-gray-200"
      >
        <SidebarHeader className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-[#16569e] rounded-lg flex items-center justify-center">
                <Anchor className="h-6 w-6 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-xl font-bold text-[#16569e]">MarineOps</h1>
                  <p className="text-sm text-gray-600">Fleet Control Center</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 px-4 py-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <NestedNavItem
                key={item.id}
                item={item}
                collapsed={collapsed}
                expanded={expandedItems.has(item.id)}
                onToggle={() => toggleExpanded(item.id)}
                level={0}
              />
            ))}
          </nav>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-gray-200">
          <div className="space-y-3">
            {!collapsed && (
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-[#16569e]">System Status</span>
                </div>
                <p className="text-xs text-gray-600">All systems operational</p>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-[#16569e] rounded-full flex items-center justify-center text-white text-sm font-medium">
                CM
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Captain Miller</p>
                  <p className="text-xs text-gray-500 truncate">Operations Manager</p>
                </div>
              )}
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#16569e] mb-6">Maritime Operations Center</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Vessels</h3>
              <div className="text-3xl font-bold text-[#16569e]">24</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crew On Board</h3>
              <div className="text-3xl font-bold text-green-600">486</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Score</h3>
              <div className="text-3xl font-bold text-blue-600">95%</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NestedNavItem({ item, collapsed, expanded, onToggle, level }: {
  item: NavigationItem;
  collapsed: boolean;
  expanded: boolean;
  onToggle: () => void;
  level: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = level * 16;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ paddingLeft: `${12 + paddingLeft}px` }}
          title={collapsed ? item.label : undefined}
        >
          <div className="flex items-center space-x-3">
            {item.icon && <item.icon className="h-5 w-5 flex-shrink-0" />}
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </div>
          {!collapsed && (
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          )}
        </button>
        {!collapsed && expanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => (
              <a
                key={child.id}
                href={child.href}
                className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ paddingLeft: `${24 + paddingLeft}px` }}
              >
                <span>{child.label}</span>
                {child.badge && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                    {child.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
      style={{ paddingLeft: `${12 + paddingLeft}px` }}
      title={collapsed ? item.label : undefined}
    >
      {item.icon && <item.icon className="h-5 w-5 flex-shrink-0" />}
      {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
    </a>
  );
}
```

## Best Practices

1. **Consistent Navigation**: Maintain logical hierarchy and grouping
2. **Visual Feedback**: Clearly indicate active states and hover effects
3. **Mobile Consideration**: Provide responsive navigation patterns
4. **Performance**: Lazy load sidebar content when possible
5. **Accessibility**: Ensure proper keyboard navigation and ARIA attributes
6. **Maritime Theme**: Use consistent TMSA-compliant styling

## Context Requirements

The Sidebar component works with:
- **Routing Systems**: Integration with navigation libraries
- **State Management**: Collapsed state and active item tracking
- **Theme Context**: Maritime color scheme and styling
- **Responsive Framework**: Mobile and desktop layout handling

## Troubleshooting

### Common Issues

**Sidebar not collapsing properly**
```tsx
// Ensure proper state management
const [collapsed, setCollapsed] = useState(false);

<Sidebar 
  collapsible
  defaultCollapsed={collapsed}
  onCollapsedChange={setCollapsed}
>
  {/* content */}
</Sidebar>
```

**Mobile overlay not working**
```tsx
// Ensure proper z-index and positioning
<div className="fixed inset-0 z-50 lg:hidden">
  <div className="fixed inset-0 bg-black bg-opacity-25" />
  <div className="fixed inset-y-0 left-0 w-64 bg-white">
    <MobileSidebar />
  </div>
</div>
```

**Navigation items not responding**
```tsx
// Ensure proper event handling
<button
  onClick={handleClick}
  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
>
  <Icon className="h-5 w-5" />
  <span>{label}</span>
</button>
```