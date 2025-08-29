# Command Component Implementation Guide

## Component Overview
The `Command` component from `scomp-ui/sail-ui-kit` provides a command palette interface for maritime applications. Essential for quick navigation, search functionality, and command execution in fleet management systems.

## Props Interface
```typescript
interface CommandProps {
  className?: string;
  shouldFilter?: boolean;
  filter?: (value: string, search: string) => boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

interface CommandInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface CommandListProps {
  className?: string;
  children?: React.ReactNode;
}

interface CommandEmptyProps {
  className?: string;
  children?: React.ReactNode;
}

interface CommandGroupProps {
  className?: string;
  heading?: string;
  children?: React.ReactNode;
}

interface CommandItemProps {
  className?: string;
  value?: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  children?: React.ReactNode;
}

interface CommandShortcutProps {
  className?: string;
  children?: React.ReactNode;
}

interface CommandSeparatorProps {
  className?: string;
}
```

## Basic Usage Example
```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "scomp-ui/sail-ui-kit";
import { useState } from "react";

function FleetSearchCommand() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Sample fleet data
  const vessels = [
    { id: "mv-ocean-star", name: "MV Ocean Star", type: "Oil Tanker" },
    { id: "mv-sea-pioneer", name: "MV Sea Pioneer", type: "Container" },
    { id: "mv-atlantic-wave", name: "MV Atlantic Wave", type: "Bulk Carrier" },
  ];

  const crew = [
    { id: "captain-smith", name: "Captain John Smith", rank: "Master" },
    { id: "chief-engineer-doe", name: "John Doe", rank: "Chief Engineer" },
    { id: "first-officer-brown", name: "Sarah Brown", rank: "First Officer" },
  ];

  return (
    <>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Press</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
        <span>to open fleet search</span>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search vessels, crew, ports..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Vessels">
            {vessels.map((vessel) => (
              <CommandItem 
                key={vessel.id}
                value={vessel.id}
                onSelect={() => {
                  console.log(`Navigate to vessel: ${vessel.name}`);
                  setOpen(false);
                }}
              >
                <span>{vessel.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {vessel.type}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Crew">
            {crew.map((member) => (
              <CommandItem 
                key={member.id}
                value={member.id}
                onSelect={() => {
                  console.log(`Navigate to crew: ${member.name}`);
                  setOpen(false);
                }}
              >
                <span>{member.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {member.rank}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

## Advanced Maritime Command Palette
```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { 
  Ship, 
  Users, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  Settings, 
  Search,
  Calculator,
  Calendar 
} from "lucide-react";
import { useState, useEffect } from "react";

interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category: string;
  shortcut?: string[];
  action: () => void;
  keywords?: string[];
}

function MaritimeCommandPalette() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Register keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commandActions: CommandAction[] = [
    // Navigation
    {
      id: "fleet-overview",
      label: "Fleet Overview",
      description: "View all vessels and their status",
      icon: <Ship className="h-4 w-4" />,
      category: "Navigation",
      shortcut: ["g", "f"],
      action: () => console.log("Navigate to fleet overview"),
      keywords: ["vessels", "ships", "fleet"],
    },
    {
      id: "crew-management",
      label: "Crew Management",
      description: "Manage crew assignments and schedules",
      icon: <Users className="h-4 w-4" />,
      category: "Navigation",
      shortcut: ["g", "c"],
      action: () => console.log("Navigate to crew management"),
      keywords: ["crew", "personnel", "staff"],
    },
    {
      id: "port-operations",
      label: "Port Operations",
      description: "View port schedules and operations",
      icon: <MapPin className="h-4 w-4" />,
      category: "Navigation",
      shortcut: ["g", "p"],
      action: () => console.log("Navigate to port operations"),
      keywords: ["ports", "terminals", "berths"],
    },
    
    // Quick Actions
    {
      id: "create-incident",
      label: "Create Incident Report",
      description: "Report a new incident or near-miss",
      icon: <AlertTriangle className="h-4 w-4" />,
      category: "Quick Actions",
      action: () => console.log("Create incident report"),
      keywords: ["incident", "report", "safety", "accident"],
    },
    {
      id: "schedule-maintenance",
      label: "Schedule Maintenance",
      description: "Schedule equipment maintenance",
      icon: <Calendar className="h-4 w-4" />,
      category: "Quick Actions",
      action: () => console.log("Schedule maintenance"),
      keywords: ["maintenance", "service", "repair"],
    },
    {
      id: "calculate-eta",
      label: "Calculate ETA",
      description: "Calculate estimated time of arrival",
      icon: <Calculator className="h-4 w-4" />,
      category: "Tools",
      action: () => console.log("Open ETA calculator"),
      keywords: ["eta", "arrival", "calculate", "time"],
    },
    
    // Documents
    {
      id: "tmsa-compliance",
      label: "TMSA Compliance Dashboard",
      description: "View TMSA compliance status",
      icon: <FileText className="h-4 w-4" />,
      category: "Compliance",
      action: () => console.log("Open TMSA dashboard"),
      keywords: ["tmsa", "compliance", "audit", "elements"],
    },
    {
      id: "certificates",
      label: "Vessel Certificates",
      description: "View and manage vessel certificates",
      icon: <FileText className="h-4 w-4" />,
      category: "Documents",
      action: () => console.log("View certificates"),
      keywords: ["certificates", "documents", "validity"],
    },
    
    // Settings
    {
      id: "user-settings",
      label: "User Settings",
      description: "Manage your account settings",
      icon: <Settings className="h-4 w-4" />,
      category: "Settings",
      action: () => console.log("Open user settings"),
      keywords: ["settings", "preferences", "account"],
    },
  ];

  const filteredActions = commandActions.filter((action) => {
    if (!inputValue) return true;
    
    const searchTerms = inputValue.toLowerCase();
    return (
      action.label.toLowerCase().includes(searchTerms) ||
      action.description?.toLowerCase().includes(searchTerms) ||
      action.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerms)) ||
      action.category.toLowerCase().includes(searchTerms)
    );
  });

  const groupedActions = filteredActions.reduce((groups, action) => {
    if (!groups[action.category]) {
      groups[action.category] = [];
    }
    groups[action.category].push(action);
    return groups;
  }, {} as Record<string, CommandAction[]>);

  return (
    <>
      {/* Trigger Button */}
      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg border">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Search fleet operations...</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search fleet operations, vessels, crew..." 
          value={inputValue}
          onValueChange={setInputValue}
        />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">No results found</p>
                <p className="text-xs text-muted-foreground">
                  Try searching for vessels, crew, ports, or operations
                </p>
              </div>
            </div>
          </CommandEmpty>
          
          {Object.entries(groupedActions).map(([category, actions], index) => (
            <div key={category}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={category}>
                {actions.map((action) => (
                  <CommandItem
                    key={action.id}
                    value={action.id}
                    onSelect={() => {
                      action.action();
                      setOpen(false);
                      setInputValue("");
                    }}
                    className="flex items-center gap-3 py-3"
                  >
                    {action.icon}
                    <div className="flex-1">
                      <div className="font-medium">{action.label}</div>
                      {action.description && (
                        <div className="text-xs text-muted-foreground">
                          {action.description}
                        </div>
                      )}
                    </div>
                    {action.shortcut && (
                      <CommandShortcut>
                        {action.shortcut.map((key, i) => (
                          <span key={i}>
                            {key}
                            {i < action.shortcut!.length - 1 && " "}
                          </span>
                        ))}
                      </CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

## Search Interface Implementation
```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "scomp-ui/sail-ui-kit";
import { Card } from "scomp-ui/sail-ui-kit";
import { Ship, Users, MapPin } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "vessel" | "crew" | "port";
  metadata?: Record<string, string>;
}

function FleetSearchInterface({ onResultSelect }: { onResultSelect: (result: SearchResult) => void }) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "vessel-1",
          title: "MV Ocean Star",
          subtitle: "Oil Tanker • Flag: Singapore",
          type: "vessel",
          metadata: { dwt: "115,000 MT", status: "At Sea" },
        },
        {
          id: "crew-1",
          title: "Captain John Smith",
          subtitle: "Master • MV Ocean Star",
          type: "crew",
          metadata: { nationality: "British", experience: "15 years" },
        },
        {
          id: "port-1",
          title: "Port of Singapore",
          subtitle: "Singapore • Southeast Asia",
          type: "port",
          metadata: { berths: "Available", pilotage: "Compulsory" },
        },
      ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 300);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "vessel": return <Ship className="h-4 w-4 text-[#16569e]" />;
      case "crew": return <Users className="h-4 w-4 text-green-600" />;
      case "port": return <MapPin className="h-4 w-4 text-orange-600" />;
      default: return null;
    }
  };

  const groupedResults = searchResults.reduce((groups, result) => {
    if (!groups[result.type]) {
      groups[result.type] = [];
    }
    groups[result.type].push(result);
    return groups;
  }, {} as Record<string, SearchResult[]>);

  return (
    <Card className="w-full max-w-2xl">
      <Command className="rounded-lg border-none shadow-none">
        <CommandInput 
          placeholder="Search vessels, crew members, ports..." 
          onValueChange={handleSearch}
        />
        <CommandList>
          {isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          
          {!isLoading && searchResults.length === 0 && (
            <CommandEmpty>
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Start typing to search fleet database
                </p>
              </div>
            </CommandEmpty>
          )}
          
          {Object.entries(groupedResults).map(([type, results]) => (
            <CommandGroup key={type} heading={type.charAt(0).toUpperCase() + type.slice(1) + "s"}>
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.id}
                  onSelect={() => onResultSelect(result)}
                  className="flex items-center gap-3 py-3"
                >
                  {getResultIcon(result.type)}
                  <div className="flex-1">
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-muted-foreground">{result.subtitle}</div>
                    {result.metadata && (
                      <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                        {Object.entries(result.metadata).map(([key, value]) => (
                          <span key={key}>
                            <strong>{key}:</strong> {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </Card>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Keyboard shortcuts**: Built-in keyboard navigation support
- **Search functionality**: Custom filtering and search logic

## Maritime-Specific Use Cases
1. **Fleet Navigation**: Quick access to vessels, crew, and operations
2. **Command Execution**: Execute common maritime operations via commands
3. **Search Interface**: Global search across fleet data
4. **Quick Actions**: Rapid access to frequently used functions
5. **Emergency Procedures**: Quick access to emergency protocols
6. **Document Search**: Find certificates, reports, and procedures
7. **Contact Directory**: Search crew members and contacts

## Integration with Fleet Management
```tsx
// Example: Integrated command palette with routing
function IntegratedCommandPalette() {
  const navigate = useNavigate();
  const { data: fleetData } = useQuery({
    queryKey: ["/api/fleet-search"],
  });

  const commandActions = [
    {
      id: "fleet",
      label: "Fleet Overview",
      action: () => navigate("/fleet"),
      category: "Navigation",
    },
    {
      id: "emergency",
      label: "Emergency Procedures",
      action: () => navigate("/emergency"),
      category: "Safety",
    },
    // Add more actions based on real fleet operations
  ];

  return <MaritimeCommandPalette actions={commandActions} />;
}
```

## Styling and Theming
The Command component follows maritime blue theme (#16569e) and supports:
- **Keyboard navigation**: Full keyboard accessibility
- **Responsive design**: Adapts to mobile and desktop layouts
- **Maritime styling**: Consistent with fleet management interfaces
- **Search highlighting**: Visual feedback for search results

## Troubleshooting
1. **Search not working**: Verify shouldFilter prop and custom filter function
2. **Keyboard shortcuts conflicting**: Check for duplicate key bindings
3. **Dialog not opening**: Ensure proper open state management
4. **Performance issues**: Implement debouncing for search input
5. **Results not showing**: Check CommandEmpty and CommandList structure

## Best Practices
- Implement keyboard shortcuts for common maritime operations
- Use meaningful icons and descriptions for maritime contexts
- Group related commands logically (Navigation, Safety, Operations)
- Provide comprehensive search across all fleet data
- Include relevant metadata in search results
- Consider offline scenarios for maritime environments
- Use consistent terminology across maritime applications
- Implement proper loading and error states for search functionality