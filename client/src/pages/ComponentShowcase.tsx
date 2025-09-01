import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Palette, 
  Shield, 
  Ship,
  Eye,
  Code,
  Package,
  FileText,
  MousePointer,
  Layout,
  MessageSquare,
  Layers,
  Plus as PlusIcon
} from "lucide-react";
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from "@/components/ui/alert";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import FormTable, { TableColumn, TableRow } from "@/components/ui/form-table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StandardNavigationBar } from "@/components/StandardNavigationBar";
import { SCOMPMainTableScreen } from "@/components/SCOMPMainTableScreen";
import { Edit3, Trash2 } from 'lucide-react';

// Actions Cell Renderer Component for AG Grid
const ActionsCellRenderer = (props: any) => {
  return (
    <div className="flex items-center gap-1 justify-center py-1">
      <Button
        variant="ghost"
        size="sm"
        className="p-1 h-7 w-7"
        title="View"
        onClick={() => console.log('View clicked for:', props.data.id || props.data.inspectionId)}
      >
        <Eye className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="p-1 h-7 w-7"
        title="Edit"
        onClick={() => console.log('Edit clicked for:', props.data.id || props.data.inspectionId)}
      >
        <Edit3 className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="p-1 h-7 w-7 text-red-600 hover:text-red-700"
        title="Delete"
        onClick={() => console.log('Delete clicked for:', props.data.id || props.data.inspectionId)}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};
import { 
  VesselStatusIndicator,
  SafetyRatingBadge,
  TMSAComplianceIndicator,
  OperationsDashboard,
  VESSEL_TYPES,
  MARITIME_RANKS,
  TMSA_ELEMENTS,
  INCIDENT_TYPES,
  SEVERITY_LEVELS,
  MARITIME_COMPONENTS_VERSION
} from "@/components/maritime";
import type { SafetyRating } from "@/components/maritime";
import { Form } from "@/components/ui/form";

export const ComponentShowcase: React.FC = () => {
  const [location, navigate] = useLocation();
  const [showSAILFormDemo, setShowSAILFormDemo] = useState(false);
  const [currentSection, setCurrentSection] = useState('A');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // FormTable demo data
  const [trainingData, setTrainingData] = useState<TableRow[]>([
    { id: '1', training: 'Bridge Resource Management', evaluation: '4-meets-expectations' },
    { id: '2', training: 'STCW Basic Safety Training', evaluation: '5-exceeded-expectations' }
  ]);

  // Different table configurations for demonstrations
  const [assessmentData, setAssessmentData] = useState<TableRow[]>([
    { id: '1', criteria: 'Navigation Skills', weight: '25', effectiveness: '4-meets-expectations', score: '85' }
  ]);

  const [incidentData, setIncidentData] = useState<TableRow[]>([
    { id: '1', date: '2024-01-15', type: 'Near Miss', severity: 'low', status: 'closed' }
  ]);

  const handleModuleChange = (moduleId: string) => {
    switch (moduleId) {
      case "crewing":
        navigate("/");
        break;
      case "technical-pms":
        navigate("/technical-pms");
        break;
      default:
        navigate("/");
    }
  };

  // Sample data for demonstrations
  const sampleVessels = [
    {
      name: "MV Atlantic Star",
      imoNumber: "9123456",
      vesselType: "Oil Tanker",
      status: { status: "active" as const, location: "Persian Gulf", lastUpdate: "2 hours ago" }
    },
    {
      name: "MV Pacific Dawn",
      imoNumber: "9234567",
      vesselType: "Container",
      status: { status: "port" as const, location: "Singapore", lastUpdate: "1 hour ago" }
    },
    {
      name: "MV Northern Light",
      imoNumber: "9345678",
      vesselType: "Chemical Tanker",
      status: { status: "maintenance" as const, location: "Dubai", lastUpdate: "30 minutes ago" }
    },
    {
      name: "MV Ocean Explorer",
      imoNumber: "9456789",
      vesselType: "LNG Tanker",
      status: { status: "emergency" as const, location: "Red Sea", lastUpdate: "5 minutes ago" }
    }
  ];

  const sampleTMSAElements = [
    { 
      element: { id: "EL1", name: "Management & Leadership", code: "EL1", description: "Shore-based management" },
      status: { elementId: "EL1", status: "compliant" as const, score: 95, lastAuditDate: "2024-01-15" }
    },
    { 
      element: { id: "EL2", name: "Shore HR Management", code: "EL2", description: "Human resources management" },
      status: { elementId: "EL2", status: "non_compliant" as const, score: 65, lastAuditDate: "2024-01-10" }
    },
    { 
      element: { id: "EL3", name: "Crewing Management", code: "EL3", description: "Crew management and training" },
      status: { elementId: "EL3", status: "partially_compliant" as const, score: 78, lastAuditDate: "2024-01-20" }
    },
    { 
      element: { id: "EL4", name: "Technical Management", code: "EL4", description: "Technical operations" },
      status: { elementId: "EL4", status: "not_assessed" as const }
    }
  ];

  return (
    <div className="bg-transparent w-full">
      <div className="overflow-hidden bg-[url(/figmaAssets/vector.svg)] bg-[100%_100%] w-full min-h-screen relative">
        <StandardNavigationBar
          currentModule="crewing"
          onModuleChange={handleModuleChange}
          activeSection="components"
        />

        {/* Left sidebar - Hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block w-[67px] absolute left-0 top-[66px] h-[calc(100vh-66px)]">
          {/* Light blue section with icon and "All" text */}
          <div className="w-full h-[79px] flex flex-col items-center justify-center bg-[#52baf3]">
            <div className="w-6 h-6 mb-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                <path d="M19 15L19.74 17.74L22 18L19.74 18.26L19 21L18.26 18.26L16 18L18.26 17.74L19 15Z" fill="white"/>
                <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="white"/>
              </svg>
            </div>
            <div className="text-white text-[10px] font-normal font-['Roboto',Helvetica]">
              All
            </div>
          </div>

          {/* Dark blue section */}
          <div className="w-full h-[calc(100%-79px)] bg-[#16569e]">
          </div>
        </aside>

        {/* Main content - Responsive layout */}
        <main className="absolute top-[67px] left-0 lg:left-[67px] w-full lg:w-[calc(100%-67px)] h-[calc(100%-67px)] overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Palette className="h-8 w-8" />
                  Maritime UI Components
                </h1>
                <p className="text-muted-foreground">Comprehensive library of maritime-specific UI components v{MARITIME_COMPONENTS_VERSION}</p>
              </div>
            </div>

            <Tabs defaultValue="components" className="space-y-4">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="components">Maritime</TabsTrigger>
                <TabsTrigger value="constants">Constants</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="form">Form UI</TabsTrigger>
                <TabsTrigger value="layout">Layout UI</TabsTrigger>
                <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
                <TabsTrigger value="feedback">Feedback UI</TabsTrigger>
                <TabsTrigger value="usage">Usage Guide</TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="space-y-6">
                {/* Vessel Status Indicators */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ship className="h-5 w-5" />
                      Vessel Status Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sampleVessels.map((vessel, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <VesselStatusIndicator 
                            vessel={vessel}
                            size="md"
                            showDetails={true}
                          />
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <VesselStatusIndicator 
                          vessel={{
                            name: "Sample Vessel",
                            vesselType: "Oil Tanker",
                            status: { status: "active" }
                          }}
                          size="sm"
                        />
                        <p className="text-xs mt-2">Small</p>
                      </div>
                      <div className="text-center">
                        <VesselStatusIndicator 
                          vessel={{
                            name: "Sample Vessel",
                            vesselType: "Oil Tanker", 
                            status: { status: "port" }
                          }}
                          size="md"
                        />
                        <p className="text-xs mt-2">Medium</p>
                      </div>
                      <div className="text-center">
                        <VesselStatusIndicator 
                          vessel={{
                            name: "Sample Vessel",
                            vesselType: "Oil Tanker",
                            status: { status: "maintenance" }
                          }}
                          size="lg"
                        />
                        <p className="text-xs mt-2">Large</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Safety Rating Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Safety Rating Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="border rounded-lg p-4 text-center">
                          <SafetyRatingBadge 
                            rating={rating as 1 | 2 | 3 | 4 | 5}
                            size="md"
                            showDetails={true}
                          />
                          <p className="text-xs mt-2">Rating {rating}</p>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Different Types:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SafetyRatingBadge rating={4} type="crew" size="md" />
                        <SafetyRatingBadge rating={3} type="vessel" size="md" />
                        <SafetyRatingBadge rating={5} type="incident" size="md" />
                        <SafetyRatingBadge rating={2} type="compliance" size="md" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* TMSA Compliance Indicators */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      TMSA Compliance Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sampleTMSAElements.map((element, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <TMSAComplianceIndicator 
                            element={element.element}
                            status={element.status}
                            showDetails={true}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="constants" className="space-y-6">
                {/* Vessel Types */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vessel Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {VESSEL_TYPES.map((type) => (
                        <Badge key={type} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Maritime Ranks */}
                <Card>
                  <CardHeader>
                    <CardTitle>Maritime Ranks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Senior Officers</h4>
                      <div className="flex flex-wrap gap-2">
                        {MARITIME_RANKS.SENIOR_OFFICERS.map((rank) => (
                          <Badge key={rank} className="bg-blue-100 text-blue-800">{rank}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Junior Officers</h4>
                      <div className="flex flex-wrap gap-2">
                        {MARITIME_RANKS.JUNIOR_OFFICERS.map((rank) => (
                          <Badge key={rank} className="bg-green-100 text-green-800">{rank}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Ratings</h4>
                      <div className="flex flex-wrap gap-2">
                        {MARITIME_RANKS.RATINGS.map((rank) => (
                          <Badge key={rank} className="bg-gray-100 text-gray-800">{rank}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* TMSA Elements */}
                <Card>
                  <CardHeader>
                    <CardTitle>TMSA Elements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {TMSA_ELEMENTS.map((element) => (
                        <div key={element.id} className="flex items-center gap-2 p-2 border rounded">
                          <Badge variant="outline">{element.code}</Badge>
                          <span className="text-sm">{element.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Incident Types & Severity Levels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Incident Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {INCIDENT_TYPES.map((type) => (
                          <Badge key={type} variant="outline">{type}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Severity Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.values(SEVERITY_LEVELS).map((level) => (
                          <div key={level.value} className="flex items-center gap-2">
                            <Badge className={level.color}>{level.label}</Badge>
                            <span className="text-sm text-muted-foreground">{level.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="dashboard" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Operations Dashboard Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OperationsDashboard 
                      vessels={sampleVessels.map(v => ({
                        id: v.imoNumber || "unknown",
                        name: v.name,
                        imoNumber: v.imoNumber,
                        vesselType: v.vesselType,
                        status: v.status,
                        safetyRating: 4 as SafetyRating,
                        crewCount: 25,
                        lastInspection: "2024-01-15"
                      }))}
                      incidents={{
                        total: 12,
                        critical: 1,
                        high: 2,
                        medium: 4,
                        low: 5,
                        thisMonth: 3,
                        trend: "down" as const
                      }}
                      compliance={{
                        totalElements: 13,
                        compliant: 8,
                        partiallyCompliant: 3,
                        nonCompliant: 2,
                        overallScore: 78
                      }}
                      tmsakElements={sampleTMSAElements}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="enhanced" className="space-y-6">
                {/* Enhanced Components */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Enhanced Components - New Props & Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="text-green-900 font-medium mb-2">✅ Enhancement Complete!</h4>
                      <p className="text-green-800 text-sm">
                        All scomp-ui components have been enhanced with 100+ new props and callbacks for complete functionality in maritime applications.
                        The TopNavigationBar Profile and Settings dropdown menus are now fully functional!
                      </p>
                    </div>

                    {/* TMSAAppLayout Enhancements */}
                    <div>
                      <h4 className="font-medium mb-3">🏗️ TMSAAppLayout - Complete Application Layout</h4>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="text-blue-900 font-medium mb-2">🔔 Now Fully Functional: Notification System</h5>
                        <div className="text-sm text-blue-800 space-y-2">
                          <p><strong>✨ NEW Props:</strong> showNotifications, notificationCount, notifications[], onNotificationClick, onNotificationRead, onNotificationAction</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="relative">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white">🔔</span>
                              </div>
                              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</div>
                            </div>
                            <span className="text-xs">Smart notification badges with count</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-2">
                        <h5 className="text-green-900 font-medium mb-2">👤 Now Fully Functional: User Profile & Settings</h5>
                        <div className="text-sm text-green-800 space-y-2">
                          <p><strong>✨ NEW Props:</strong> onProfileClick, onUserSettingsClick, onSettingsClick, onLogout</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">👤</div>
                            <span className="text-xs">Profile dropdown menu items now work!</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-2">
                        <h5 className="text-purple-900 font-medium mb-2">📱 Enhanced Sidebar & Layout</h5>
                        <div className="text-sm text-purple-800">
                          <p><strong>✨ NEW Props:</strong> sidebarDefaultOpen, sidebarCollapsible, onSidebarToggle, headerHeight, maxContentWidth, contentPadding</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* TopNavigationBar Enhancements */}
                    <div>
                      <h4 className="font-medium mb-3">🧭 TopNavigationBar - Enhanced Header Navigation</h4>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <h5 className="text-amber-900 font-medium mb-2">🎉 BREAKTHROUGH: Fixed Profile & Settings Dropdown!</h5>
                        <div className="text-sm text-amber-800 space-y-2">
                          <p><strong>Problem Solved:</strong> Profile and Settings dropdown menu items were not clickable</p>
                          <p><strong>Solution Added:</strong> onProfileClick, onUserSettingsClick props with proper event handlers</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Button size="sm" variant="outline" className="text-xs">Profile ✅</Button>
                            <Button size="sm" variant="outline" className="text-xs">Settings ✅</Button>
                            <Button size="sm" variant="outline" className="text-xs">Logout ✅</Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mt-2">
                        <h5 className="text-indigo-900 font-medium mb-2">🔔 Rich Notification Popover</h5>
                        <div className="text-sm text-indigo-800">
                          <p><strong>✨ NEW Features:</strong> Severity badges, timestamps, action handling, maritime-specific notification types (weather, maintenance, crew, compliance, safety)</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* LeftSidebar Enhancements */}
                    <div>
                      <h4 className="font-medium mb-3">📋 LeftSidebar - Interactive Navigation</h4>
                      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                        <h5 className="text-teal-900 font-medium mb-2">🖱️ Enhanced Interaction</h5>
                        <div className="text-sm text-teal-800 space-y-1">
                          <p><strong>✨ NEW Props:</strong> onMenuItemClick, onQuickActionClick, quickActions[], customSections[]</p>
                          <p><strong>✨ Features:</strong> Collapsible sidebar, quick actions, custom header content, module icons</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* FormTable Enhancements */}
                    <div>
                      <h4 className="font-medium mb-3">📊 FormTable - Professional Data Tables</h4>
                      <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                        <h5 className="text-rose-900 font-medium mb-2">🎯 Enterprise Features</h5>
                        <div className="text-sm text-rose-800 space-y-1">
                          <p><strong>✨ Row Operations:</strong> onRowAdd, onRowUpdate, onRowDelete, onRowReorder</p>
                          <p><strong>✨ Validation:</strong> validationRules, errors, onValidationError</p>
                          <p><strong>✨ Bulk Operations:</strong> enableBulkActions, onBulkDelete, onBulkUpdate</p>
                          <p><strong>✨ Import/Export:</strong> enableImport, enableExport, onImport, onExport</p>
                          <p><strong>✨ Enhanced Comments:</strong> Comment threads with author and timestamp</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* SCOMPMainTableScreen Enhancements */}
                    <div>
                      <h4 className="font-medium mb-3">🖥️ SCOMPMainTableScreen - Enterprise Data Management</h4>
                      <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                        <h5 className="text-cyan-900 font-medium mb-2">🚀 Comprehensive Enterprise Features</h5>
                        <div className="text-sm text-cyan-800 space-y-1">
                          <p><strong>✨ Selection Management:</strong> selectionMode, selectedRowIds, onSelectionChange, onSelectionClear</p>
                          <p><strong>✨ Advanced Sorting:</strong> onSortChange, defaultSort, multiColumnSort</p>
                          <p><strong>✨ Column Management:</strong> onColumnResize, onColumnReorder, onColumnVisibilityChange, visibleColumns</p>
                          <p><strong>✨ Context Menus:</strong> onContextMenu, contextMenuItems with custom actions</p>
                          <p><strong>✨ Drag & Drop:</strong> enableRowReorder, onRowReorder, enableDragDrop, onRowDrop</p>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-2">
                        <h5 className="text-purple-900 font-medium mb-2">✏️ Advanced Editing & Validation</h5>
                        <div className="text-sm text-purple-800 space-y-1">
                          <p><strong>✨ Inline Editing:</strong> enableInlineEditing, editableColumns, onCellEditComplete, onCellValidation</p>
                          <p><strong>✨ Data Management:</strong> onRowAdd, onRowUpdate, onRowDelete, validateRowData</p>
                          <p><strong>✨ Toolbar Actions:</strong> toolbarActions[], customHeaderActions, showToolbar</p>
                          <p><strong>✨ State Persistence:</strong> persistTableState, tableStateKey, restoreTableState</p>
                        </div>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mt-2">
                        <h5 className="text-orange-900 font-medium mb-2">⚡ Performance & Advanced Features</h5>
                        <div className="text-sm text-orange-800 space-y-1">
                          <p><strong>✨ Performance:</strong> virtualScrolling, lazyLoading, loadMoreData, rowBufferSize</p>
                          <p><strong>✨ Grouping:</strong> enableGrouping, groupByColumns, onGroupChange, expandedGroups</p>
                          <p><strong>✨ Advanced Filters:</strong> enableAdvancedFilters, savedFilters, onSaveFilter</p>
                          <p><strong>✨ Auto-Sync:</strong> enableAutoRefresh, autoRefreshInterval, onDataSync</p>
                        </div>
                      </div>

                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mt-2">
                        <h5 className="text-emerald-900 font-medium mb-2">🚢 Maritime-Specific Features</h5>
                        <div className="text-sm text-emerald-800 space-y-1">
                          <p><strong>✨ Vessel Context:</strong> vesselId, vesselName, vesselType integration</p>
                          <p><strong>✨ Compliance:</strong> complianceMode, auditTrail, maritimeValidation</p>
                          <p><strong>✨ User Tracking:</strong> onUserAction, auditMode, trackUserInteractions</p>
                          <p><strong>✨ Accessibility:</strong> ariaLabel, enableKeyboardNavigation, onKeyDown</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <Separator />

                    {/* NEW ENHANCED COMPONENTS */}
                    <div>
                      <h4 className="font-medium mb-3">🚢 OperationsDashboard - Maritime Operations Control</h4>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="text-blue-900 font-medium mb-2">✨ NEW: 60+ Enterprise Props Added</h5>
                        <div className="text-sm text-blue-800 space-y-1">
                          <p><strong>🔄 Real-time Features:</strong> Auto-refresh, data updates, WebSocket support, last update tracking</p>
                          <p><strong>🖱️ Interactivity:</strong> Vessel clicks, KPI drill-downs, incident navigation, TMSA element actions</p>
                          <p><strong>🔍 Advanced Filtering:</strong> Multi-criteria filters, search functionality, saved filter presets</p>
                          <p><strong>📊 Customization:</strong> Configurable sections, layout options, chart configurations, alert management</p>
                          <p><strong>🚢 Maritime Features:</strong> Weather integration, port schedules, compliance thresholds, vessel context</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-3">📋 IncidentReportForm - Maritime Incident Management</h4>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h5 className="text-red-900 font-medium mb-2">✨ NEW: 100+ Enterprise Props Added</h5>
                        <div className="text-sm text-red-800 space-y-1">
                          <p><strong>📝 Workflow Management:</strong> Multi-step workflows, progress tracking, conditional logic</p>
                          <p><strong>📎 File Attachments:</strong> Evidence upload, file validation, attachment management</p>
                          <p><strong>👥 Collaboration:</strong> Comments, mentions, review workflows, approval processes</p>
                          <p><strong>🔄 Auto-save:</strong> Draft management, persistence, conflict resolution</p>
                          <p><strong>⚓ Maritime Features:</strong> Emergency protocols, authority notifications, compliance checks</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-3">🔔 NotificationPanel - Enterprise Notification Management</h4>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h5 className="text-green-900 font-medium mb-2">✨ NEW: 80+ Enterprise Props Added</h5>
                        <div className="text-sm text-green-800 space-y-1">
                          <p><strong>📊 Advanced Filtering:</strong> Grouping, sorting, date ranges, multi-criteria filters</p>
                          <p><strong>⚡ Bulk Operations:</strong> Select all, bulk actions, mass read/dismiss capabilities</p>
                          <p><strong>🔊 Sound Alerts:</strong> Configurable sounds per priority, browser notifications</p>
                          <p><strong>⏰ Snooze & Archive:</strong> Temporary dismissal, retention policies, archival management</p>
                          <p><strong>🚢 Maritime Integration:</strong> Vessel context, emergency overrides, compliance routing</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-3">💬 FeedbackModal - Enterprise Feedback System</h4>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="text-purple-900 font-medium mb-2">✨ NEW: 90+ Enterprise Props Added</h5>
                        <div className="text-sm text-purple-800 space-y-1">
                          <p><strong>📝 Templates:</strong> Pre-filled forms, feedback categories, smart auto-fill from context</p>
                          <p><strong>📎 Attachments:</strong> File uploads, screenshots, evidence capture, validation</p>
                          <p><strong>🔄 Routing:</strong> Automated assignment, department routing, expertise matching</p>
                          <p><strong>📊 Analytics:</strong> Sentiment analysis, metrics tracking, follow-up management</p>
                          <p><strong>🚢 Maritime Context:</strong> Vessel operations, watch keeper info, weather conditions</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Comprehensive Enhancement Summary */}
                    <div>
                      <h4 className="font-medium mb-3">🎯 Complete Enhancement Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">All Enhanced Components</h5>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p>✅ TMSAAppLayout</p>
                            <p>✅ TopNavigationBar</p>
                            <p>✅ LeftSidebar</p>
                            <p>✅ RBACProvider</p>
                            <p>✅ SAILForm</p>
                            <p>✅ FormTable</p>
                            <p>✅ SCOMPMainTableScreen</p>
                            <p><strong>🆕 OperationsDashboard</strong></p>
                            <p><strong>🆕 IncidentReportForm</strong></p>
                            <p><strong>🆕 NotificationPanel</strong></p>
                            <p><strong>🆕 FeedbackModal</strong></p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Enterprise Features</h5>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p>🔔 Complete notification systems</p>
                            <p>👤 Full user interaction (Profile, Settings, Logout)</p>
                            <p>📊 Advanced table operations</p>
                            <p>✅ Enhanced form validation</p>
                            <p>🛡️ Robust RBAC with maritime features</p>
                            <p>📱 Mobile-responsive design</p>
                            <p><strong>🎯 400+ new props added total</strong></p>
                            <p><strong>🚢 Maritime-specific enhancements</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Implementation Note */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-gray-900 mb-2">🎉 Ready for Production</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        All scomp-ui components now support comprehensive functionality for maritime applications. 
                        The critical TopNavigationBar Profile and Settings dropdown functionality that was previously broken is now fully working!
                      </p>
                      <div className="text-xs text-gray-600 bg-white p-3 rounded">
                        <strong>Key Achievement:</strong> Fixed missing props in TopNavigationBar that prevented Profile and Settings dropdown menu items from working. 
                        Added onProfileClick and onUserSettingsClick props with proper event handling.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Usage Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Import Components:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { 
  VesselStatusIndicator,
  SafetyRatingBadge,
  TMSAComplianceIndicator,
  OperationsDashboard
} from "@/components/maritime";

// Layout Components
import { SCOMPMainTableScreen } from "@/components/SCOMPMainTableScreen";`}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Import Constants:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { 
  VESSEL_TYPES,
  MARITIME_RANKS,
  TMSA_ELEMENTS,
  INCIDENT_TYPES,
  SEVERITY_LEVELS
} from "@/components/maritime";`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Example Usage:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<VesselStatusIndicator 
  vessel={{
    name: "MV Atlantic Star",
    vesselType: "Oil Tanker",
    status: { 
      status: "active",
      location: "Persian Gulf"
    }
  }}
  size="md"
  showDetails={true}
/>

<SafetyRatingBadge 
  rating={4}
  type="crew"
  showDetails={true}
/>

<TMSAComplianceIndicator 
  element="EL1"
  status="compliant"
  score={95}
/>`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">SCOMP Main Table Screen Usage:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<SCOMPMainTableScreen
  screenTitle="Crew Management"
  currentModule="Crew Appraisals"
  showFilters={true}
  filters={[
    { 
      id: 'search', 
      type: 'search', 
      placeholder: 'Search crew members...', 
      label: 'Search' 
    },
    { 
      id: 'rank', 
      type: 'select', 
      placeholder: 'Select rank...', 
      label: 'Rank',
      options: [
        { value: 'master', label: 'Master' },
        { value: 'chief-officer', label: 'Chief Officer' },
        { value: 'able-seaman', label: 'Able Seaman' }
      ]
    },
    { id: 'dateFrom', type: 'date', label: 'From Date' }
  ]}
  columnDefs={[
    { 
      field: 'id', 
      headerName: 'Crew ID', 
      flex: 1, 
      minWidth: 120,
      filter: 'agTextColumnFilter', 
      sortable: true 
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 2, 
      minWidth: 160,
      filter: 'agTextColumnFilter', 
      sortable: true 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      pinned: 'right',
      cellRenderer: ActionsCellRenderer
    }
  ]}
  sampleData={crewData}
  primaryAction={{
    label: 'Add New Crew',
    icon: <PlusIcon className="w-4 h-4" />
  }}
/>`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Filter Configuration Options:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Filter Types Available:
const filters = [
  // Search filter
  { id: 'search', type: 'search', placeholder: 'Search...', label: 'Search' },
  
  // Select dropdown filter  
  { 
    id: 'status', 
    type: 'select', 
    placeholder: 'Select status...', 
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  },
  
  // Date filter
  { id: 'dateFrom', type: 'date', label: 'From Date' },
  { id: 'dateTo', type: 'date', label: 'To Date' }
];`}
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">AG Grid Column Configuration:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Column Definition Examples:
const columnDefs = [
  // Basic text column with responsive flex sizing
  { 
    field: 'name', 
    headerName: 'Name', 
    flex: 2,           // Takes 2x space vs flex: 1 columns
    minWidth: 160,     // Minimum width before scrolling
    filter: 'agTextColumnFilter', 
    sortable: true,
    resizable: true 
  },
  
  // Set filter for categorical data
  { 
    field: 'rank', 
    headerName: 'Rank', 
    flex: 1,
    minWidth: 130,
    filter: 'agSetColumnFilter',  // Dropdown with checkboxes
    sortable: true 
  },
  
  // Date column with date picker filter
  { 
    field: 'signOn', 
    headerName: 'Sign-On Date', 
    flex: 1,
    minWidth: 120,
    filter: 'agDateColumnFilter', 
    sortable: true 
  },
  
  // Actions column (pinned to right, always visible)
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,           // Fixed width, not flex
    sortable: false,
    filter: false,
    resizable: false,
    pinned: 'right',      // Always visible during scroll
    cellRenderer: ActionsCellRenderer  // Custom React component
  }
];`}
                      </pre>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">🆕 Recent Improvements & Features</h4>
                      <div className="text-sm text-green-800 space-y-2">
                        <p><strong>✅ Fixed AG Grid Filter Popups:</strong> Filter dialogs now have solid white backgrounds with clear readability</p>
                        <p><strong>✅ Actions Column Pinning:</strong> Actions column stays visible on the right during horizontal scrolling</p>
                        <p><strong>✅ Responsive Column Sizing:</strong> Flex-based column widths eliminate white space and improve mobile responsiveness</p>
                        <p><strong>✅ Dialog Close Button:</strong> Proper state management for modal close functionality</p>
                        <p><strong>✅ ActionsCellRenderer:</strong> React component for view/edit/delete buttons in Actions column</p>
                        <p><strong>✅ Filter Toggle:</strong> Show/hide filters with smooth transitions and state persistence</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Component Library Information</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>Version:</strong> {MARITIME_COMPONENTS_VERSION}</p>
                        <p><strong>Total Components:</strong> 6 main components (includes SCOMPMainTableScreen)</p>
                        <p><strong>Total Constants:</strong> {VESSEL_TYPES.length + Object.keys(MARITIME_RANKS).length + TMSA_ELEMENTS.length + INCIDENT_TYPES.length + Object.keys(SEVERITY_LEVELS).length} constants and enums</p>
                        <p><strong>Documentation:</strong> All components include TypeScript types and tooltips</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="form" className="space-y-6">
                {/* Form Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MousePointer className="h-5 w-5" />
                      Form Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Buttons */}
                    <div>
                      <h4 className="font-medium mb-3">Buttons</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button size="sm">Small</Button>
                        <Button size="lg">Large</Button>
                        <Button disabled>Disabled</Button>
                        <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white">Maritime Blue</Button>
                        <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white" size="sm">Save Draft</Button>
                      </div>
                    </div>
                    <Separator />

                    {/* Inputs - Maritime Form Style */}
                    <div>
                      <h4 className="font-medium mb-3">Input Fields (Maritime Form Style)</h4>
                      <div className="bg-gray-50 p-6 rounded-lg border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="seafarer-name" className="text-sm font-medium text-gray-700">Seafarer's Name</Label>
                            <Input id="seafarer-name" placeholder="James Michael" className="bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rank" className="text-sm font-medium text-gray-700">Seafarer's Rank</Label>
                            <Select>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select rank" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="master">Master</SelectItem>
                                <SelectItem value="chief-officer">Chief Officer</SelectItem>
                                <SelectItem value="2nd-officer">2nd Officer</SelectItem>
                                <SelectItem value="3rd-officer">3rd Officer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">Nationality</Label>
                            <Select>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select nationality..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="british">British</SelectItem>
                                <SelectItem value="filipino">Filipino</SelectItem>
                                <SelectItem value="indian">Indian</SelectItem>
                                <SelectItem value="norwegian">Norwegian</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="vessel" className="text-sm font-medium text-gray-700">Vessel</Label>
                            <Select>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select vessel" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mv-atlantic-star">MV Atlantic Star</SelectItem>
                                <SelectItem value="mv-pacific-dawn">MV Pacific Dawn</SelectItem>
                                <SelectItem value="mv-northern-light">MV Northern Light</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sign-on-date" className="text-sm font-medium text-gray-700">Sign On Date</Label>
                            <Input id="sign-on-date" type="date" className="bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="appraisal-type" className="text-sm font-medium text-gray-700">Appraisal Type</Label>
                            <Select>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="initial">Initial Assessment</SelectItem>
                                <SelectItem value="mid-contract">Mid Contract</SelectItem>
                                <SelectItem value="end-contract">End of Contract</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-6">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />

                    {/* Select Dropdowns - Appraisal Form Style */}
                    <div>
                      <h4 className="font-medium mb-3">Select Dropdowns (Appraisal Form Style)</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Vessel Type</Label>
                            <Select>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select vessel type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="oil-tanker">Oil Tanker</SelectItem>
                                <SelectItem value="container">Container</SelectItem>
                                <SelectItem value="bulk-carrier">Bulk Carrier</SelectItem>
                                <SelectItem value="lng-tanker">LNG Tanker</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Primary Appraiser</Label>
                            <Select>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select appraiser" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="captain-smith">Captain Smith</SelectItem>
                                <SelectItem value="chief-jones">Chief Officer Jones</SelectItem>
                                <SelectItem value="manager-brown">Fleet Manager Brown</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">PI Category</Label>
                            <Select>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="leadership">Leadership</SelectItem>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="safety">Safety</SelectItem>
                                <SelectItem value="communication">Communication</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />

                    {/* Checkboxes and Radios */}
                    <div>
                      <h4 className="font-medium mb-3">Checkboxes & Radio Groups</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium">Checkboxes</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="terms" />
                              <Label htmlFor="terms">Accept terms and conditions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="marketing" />
                              <Label htmlFor="marketing">Send me marketing emails</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="disabled" disabled />
                              <Label htmlFor="disabled">Disabled option</Label>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium">Radio Group</h5>
                          <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="option-one" id="option-one" />
                              <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="option-two" id="option-two" />
                              <Label htmlFor="option-two">Option Two</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="option-three" id="option-three" />
                              <Label htmlFor="option-three">Option Three</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                    <Separator />

                    {/* Sliders and Switches */}
                    <div>
                      <h4 className="font-medium mb-3">Interactive Controls</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium">Slider</h5>
                          <Slider defaultValue={[50]} max={100} step={1} />
                        </div>
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium">Switch</h5>
                          <div className="flex items-center space-x-2">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Airplane Mode</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />

                    {/* SAIL Form System */}
                    <div>
                      <h4 className="font-medium mb-3">SAIL Form System</h4>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="text-sm font-medium text-blue-900 mb-2">Full-screen Maritime Forms</h5>
                          <p className="text-sm text-blue-800 mb-3">
                            The SAIL Form system provides standardized full-screen popup forms with stepper navigation, 
                            configurable sections, and consistent maritime styling. Perfect for appraisals, inspections, 
                            and compliance forms across all TMSA modules.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">Popup Overlay</Badge>
                            <Badge variant="secondary">Stepper Navigation</Badge>
                            <Badge variant="secondary">Card Sections</Badge>
                            <Badge variant="secondary">Form Validation</Badge>
                            <Badge variant="secondary">Mobile Responsive</Badge>
                          </div>
                          <Button 
                            onClick={() => setShowSAILFormDemo(true)}
                            className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white"
                          >
                            View SAIL Form Preview
                          </Button>
                        </div>

                        {/* SAIL Form Field Examples */}
                        <div>
                          <h5 className="text-sm font-medium mb-3">SAIL Form Components</h5>
                          <div className="bg-gray-50 p-4 rounded-lg border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">SAIL Form Field (Text)</Label>
                                <Input placeholder="Standard SAIL input field" className="bg-white" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">SAIL Form Field (Select)</Label>
                                <Select>
                                  <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Choose option..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="option1">Maritime Option 1</SelectItem>
                                    <SelectItem value="option2">Maritime Option 2</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="mb-3">
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">SAIL Form Grid Layout</Label>
                              <div className="grid grid-cols-3 gap-3">
                                <Input placeholder="Col 1" className="bg-white" />
                                <Input placeholder="Col 2" className="bg-white" />
                                <Input placeholder="Col 3" className="bg-white" />
                              </div>
                            </div>
                            <div className="text-xs text-gray-600">
                              <strong>Features:</strong> Responsive grids (1-6 columns), form validation, 
                              tables with CRUD operations, standardized styling, and consistent UX across modules.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SAIL Form Demo Popup - Proper Modal Overlay */}
                {showSAILFormDemo && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-[4px]">
                    {/* Modal Card with shadow and rounded corners */}
                    <div className="bg-white rounded-xl shadow-2xl w-full h-[90vh] flex flex-col relative">
                      {/* Header - Exact match to reference */}
                      <div className="bg-white border-b border-gray-200 p-3 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 rounded-t-xl">
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setShowSAILFormDemo(false)}
                            className="text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
                          >
                            ←
                          </Button>
                          <h1 className="text-lg font-medium text-gray-900">Crew Appraisal Form</h1>
                        </div>
                        <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-4">
                          Save Draft
                        </Button>
                      </div>
                      
                      {/* Body - Responsive split layout */}
                      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Left Sidebar - Mobile: compact horizontal, Tablet: vertical circles only, Desktop: full with text */}
                        <div className="w-full md:w-20 lg:w-80 bg-gray-50 p-1 md:p-2 lg:p-6 max-h-20 md:max-h-none overflow-hidden md:overflow-visible border-b md:border-b-0 md:border-r border-gray-200">
                          <div className="flex md:flex-col md:space-y-1 space-x-1 md:space-x-0 overflow-x-auto md:overflow-x-visible">
                            {/* Section A - Clickable */}
                            <div 
                              className="flex items-center md:items-center lg:items-start gap-1 md:gap-1 lg:gap-4 cursor-pointer hover:bg-gray-100 p-0.5 md:p-1 lg:p-2 rounded flex-shrink-0"
                              onClick={() => setCurrentSection('A')}
                            >
                              <div className={`w-12 h-12 ${currentSection === 'A' ? 'bg-[#16569e]' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center text-lg font-medium`}>
                                A
                              </div>
                              <div className="flex-1 pt-2 hidden lg:block">
                                <h3 className={`font-medium text-sm ${currentSection === 'A' ? 'text-[#16569e]' : 'text-gray-600'}`}>Seafarer's Information</h3>
                              </div>
                            </div>
                            
                            {/* Connecting line - Hidden on mobile/tablet, visible on desktop */}
                            <div className="hidden lg:block w-0.5 h-4 bg-gray-300" style={{marginLeft: 'calc(0.5rem + 1.5rem)'}}></div>
                            
                            {/* Section B - Clickable */}
                            <div 
                              className="flex items-center md:items-center lg:items-start gap-1 md:gap-1 lg:gap-4 cursor-pointer hover:bg-gray-100 p-0.5 md:p-1 lg:p-2 rounded flex-shrink-0"
                              onClick={() => setCurrentSection('B')}
                            >
                              <div className={`w-12 h-12 ${currentSection === 'B' ? 'bg-[#16569e]' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center text-lg font-medium`}>
                                B
                              </div>
                              <div className="flex-1 pt-2 hidden lg:block">
                                <h3 className={`font-medium text-sm ${currentSection === 'B' ? 'text-[#16569e]' : 'text-gray-600'}`}>Information at Start of</h3>
                                <h3 className={`font-medium text-sm ${currentSection === 'B' ? 'text-[#16569e]' : 'text-gray-600'}`}>Appraisal Period</h3>
                              </div>
                            </div>
                            
                            {/* Connecting line - Hidden on mobile/tablet, visible on desktop */}
                            <div className="hidden lg:block w-0.5 h-4 bg-gray-300" style={{marginLeft: 'calc(0.5rem + 1.5rem)'}}></div>
                            
                            {/* Section C - Non-clickable for demo */}
                            <div className="flex items-center md:items-center lg:items-start gap-1 md:gap-1 lg:gap-4 opacity-60 p-0.5 md:p-1 lg:p-2 flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-medium">
                                C
                              </div>
                              <div className="flex-1 pt-2 hidden lg:block">
                                <h3 className="font-medium text-gray-600 text-sm">Competence</h3>
                                <h3 className="font-medium text-gray-600 text-sm">Assessment</h3>
                                <p className="text-xs text-gray-500">(Professional Knowledge & Skills)</p>
                              </div>
                            </div>
                            
                            {/* Connecting line - Hidden on mobile/tablet, visible on desktop */}
                            <div className="hidden lg:block w-0.5 h-4 bg-gray-300" style={{marginLeft: 'calc(0.5rem + 1.5rem)'}}></div>
                            
                            {/* Section D - Non-clickable for demo */}
                            <div className="flex items-center md:items-center lg:items-start gap-1 md:gap-1 lg:gap-4 opacity-60 p-0.5 md:p-1 lg:p-2 flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-medium">
                                D
                              </div>
                              <div className="flex-1 pt-2 hidden lg:block">
                                <h3 className="font-medium text-gray-600 text-sm">Behavioural</h3>
                                <h3 className="font-medium text-gray-600 text-sm">Assessment (Soft</h3>
                                <h3 className="font-medium text-gray-600 text-sm">Skills)</h3>
                              </div>
                            </div>
                            
                            {/* Connecting line - Hidden on mobile/tablet, visible on desktop */}
                            <div className="hidden lg:block w-0.5 h-4 bg-gray-300" style={{marginLeft: 'calc(0.5rem + 1.5rem)'}}></div>
                            
                            {/* Section E - Non-clickable for demo */}
                            <div className="flex items-center md:items-center lg:items-start gap-1 md:gap-1 lg:gap-4 opacity-60 p-0.5 md:p-1 lg:p-2 flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-medium">
                                E
                              </div>
                              <div className="flex-1 pt-2 hidden lg:block">
                                <h3 className="font-medium text-gray-600 text-sm">Training Needs &</h3>
                                <h3 className="font-medium text-gray-600 text-sm">Development</h3>
                              </div>
                            </div>
                            
                            {/* Connecting line - Hidden on mobile/tablet, visible on desktop */}
                            <div className="hidden lg:block w-0.5 h-4 bg-gray-300" style={{marginLeft: 'calc(0.5rem + 1.5rem)'}}></div>
                            
                            {/* Section F - Non-clickable for demo */}
                            <div className="flex items-center md:items-center lg:items-start gap-1 md:gap-1 lg:gap-4 opacity-60 p-0.5 md:p-1 lg:p-2 flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-medium">
                                F
                              </div>
                              <div className="flex-1 pt-2 hidden lg:block">
                                <h3 className="font-medium text-gray-600 text-sm">Summary &</h3>
                                <h3 className="font-medium text-gray-600 text-sm">Recommendations</h3>
                              </div>
                            </div>
                            
                            {/* Connecting line - Hidden on mobile/tablet, visible on desktop */}
                            <div className="hidden lg:block w-0.5 h-4 bg-gray-300" style={{marginLeft: 'calc(0.5rem + 1.5rem)'}}></div>
                            
                            {/* Section G - Non-clickable for demo */}
                            <div className="flex items-center md:items-center lg:items-start gap-1 md:gap-1 lg:gap-4 opacity-60 p-0.5 md:p-1 lg:p-2 flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-medium">
                                G
                              </div>
                              <div className="flex-1 pt-2 hidden lg:block">
                                <h3 className="font-medium text-gray-600 text-sm">Office Review &</h3>
                                <h3 className="font-medium text-gray-600 text-sm">Followup</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Content Area - Responsive dynamic content */}
                        <div className="flex-1 bg-gray-50 overflow-y-auto">
                          <div className="p-4 md:p-8">
                            {/* White Content Card - Changes based on section */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                              
                              {/* Section A Content */}
                              {currentSection === 'A' && (
                                <>
                                  {/* Section Header */}
                                  <div className="p-6 pb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-[#16569e]">Part A: Seafarer's Information</h2>
                                    <p className="text-sm text-[#16569e] border-b-2 border-[#16569e] pb-2">Enter details as applicable</p>
                                  </div>
                                  
                                  {/* Form Fields */}
                                  <div className="px-6 pb-6">
                                    <div className="space-y-6">
                                      {/* Row 1 - Responsive grid */}
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                          <Label className="text-sm font-medium text-gray-700">Seafarer's Name</Label>
                                          <Input className="bg-white border-gray-300" defaultValue="James Michael" />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-sm font-medium text-gray-700">Seafarer's Rank</Label>
                                          <Select>
                                            <SelectTrigger className="bg-white border-gray-300">
                                              <SelectValue placeholder="Select rank" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="master">Master</SelectItem>
                                              <SelectItem value="chief-officer">Chief Officer</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-sm font-medium text-gray-700">Nationality</Label>
                                          <Select>
                                            <SelectTrigger className="bg-white border-gray-300">
                                              <SelectValue placeholder="Select nationality..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="british">British</SelectItem>
                                              <SelectItem value="filipino">Filipino</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      
                                      {/* More rows as before... */}
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                        <div className="space-y-2">
                                          <Label className="text-sm font-medium text-gray-700">Vessel</Label>
                                          <Select>
                                            <SelectTrigger className="bg-white border-gray-300">
                                              <SelectValue placeholder="Select vessel" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="mv-atlantic">MV Atlantic Star</SelectItem>
                                              <SelectItem value="mv-pacific">MV Pacific Dawn</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-sm font-medium text-gray-700">Sign On Date</Label>
                                          <Input type="date" className="bg-white border-gray-300" placeholder="dd/mm/yyyy" />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-sm font-medium text-gray-700">Appraisal Type</Label>
                                          <Select>
                                            <SelectTrigger className="bg-white border-gray-300">
                                              <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="initial">Initial Assessment</SelectItem>
                                              <SelectItem value="mid">Mid Contract</SelectItem>
                                              <SelectItem value="end">End of Contract</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Save Button */}
                                    <div className="flex justify-end mt-8">
                                      <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-6">
                                        Save
                                      </Button>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Section B Content - Matches reference image */}
                              {currentSection === 'B' && (
                                <>
                                  {/* Section Header */}
                                  <div className="p-6 pb-4">
                                    <h2 className="text-xl font-semibold text-[#16569e] mb-2">Part B: Information at Start of Appraisal Period</h2>
                                    <p className="text-sm text-[#16569e] border-b-2 border-[#16569e] pb-2">Add below at the start of the Appraisal Period except the Evaluation which must be completed at the end of the Appraisal Period</p>
                                  </div>
                                  
                                  {/* Form Content */}
                                  <div className="px-6 pb-6 space-y-8">
                                    {/* B1. Trainings Section */}
                                    <div>
                                      <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-base font-medium text-[#16569e]">B1. Trainings conducted prior joining vessel (To Assess Effectiveness)</h3>
                                        <Button variant="outline" className="text-[#16569e] border-[#16569e]">
                                          + Add Training
                                        </Button>
                                      </div>
                                      
                                      {/* Table Header */}
                                      <div className="bg-gray-50 border border-gray-200 rounded-t">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 text-sm font-medium text-gray-700">
                                          <div>S.No</div>
                                          <div>Training</div>
                                          <div>Evaluation</div>
                                          <div>Actions</div>
                                        </div>
                                      </div>
                                      
                                      {/* Empty State */}
                                      <div className="border border-gray-200 border-t-0 rounded-b bg-white p-8 text-center">
                                        <p className="text-gray-500">No trainings added yet. Click "Add Training" to get started.</p>
                                      </div>
                                    </div>

                                    {/* B2. Target Setting Section */}
                                    <div>
                                      <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-base font-medium text-[#16569e]">B2. Target Setting</h3>
                                        <Button variant="outline" className="text-[#16569e] border-[#16569e]">
                                          + Add Target
                                        </Button>
                                      </div>
                                      
                                      {/* Table Header */}
                                      <div className="bg-gray-50 border border-gray-200 rounded-t">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 text-sm font-medium text-gray-700">
                                          <div>S.No</div>
                                          <div>Target Setting</div>
                                          <div>Evaluation</div>
                                          <div>Actions</div>
                                        </div>
                                      </div>
                                      
                                      {/* Empty State */}
                                      <div className="border border-gray-200 border-t-0 rounded-b bg-white p-8 text-center">
                                        <p className="text-gray-500">No targets added yet. Click "Add Target" to get started.</p>
                                      </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-3 mt-8">
                                      <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-6">
                                        Save
                                      </Button>
                                      <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                                        Submit
                                      </Button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Table Component */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Form Table Component
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h5 className="text-sm font-medium text-blue-900 mb-2">Dynamic Form Tables</h5>
                      <p className="text-sm text-blue-800 mb-3">
                        Reusable table component with add/delete rows, inline editing, comments, dropdowns, and 
                        configurable columns. Perfect for training records, assessments, and dynamic data entry.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">Add/Delete Rows</Badge>
                        <Badge variant="secondary">Inline Editing</Badge>
                        <Badge variant="secondary">Comments</Badge>
                        <Badge variant="secondary">Dropdowns</Badge>
                        <Badge variant="secondary">Configurable</Badge>
                      </div>
                    </div>

                    {/* Training Table Demo - 3 Columns */}
                    <div className="mb-8">
                      <h5 className="text-sm font-medium mb-3 text-gray-700">3-Column Configuration: Training Records</h5>
                      <FormTable
                        title="B1. Trainings conducted prior joining vessel (To Assess Effectiveness)"
                        columns={[
                          { id: 'sno', header: 'S.No', type: 'readonly', width: '60px' },
                          { id: 'training', header: 'Training', type: 'text', placeholder: 'Enter training name' },
                          { 
                            id: 'evaluation', 
                            header: 'Evaluation', 
                            type: 'select',
                            placeholder: 'Select Rating',
                            options: [
                              { value: '5-exceeded-expectations', label: '5- Exceeded Expectations' },
                              { value: '4-meets-expectations', label: '4- Meets Expectations' },
                              { value: '3-somewhat-meets-expectations', label: '3- Somewhat Meets Expectations' },
                              { value: '2-below-expectations', label: '2- Below Expectations' },
                              { value: '1-significantly-below-expectations', label: '1- Significantly Below Expectations' }
                            ]
                          }
                        ]}
                        data={trainingData}
                        onDataChange={setTrainingData}
                        addButtonText="Add Training"
                        emptyMessage="No trainings added yet. Click 'Add Training' to get started."
                        showActions={true}
                        showComments={true}
                      />
                    </div>

                    {/* Assessment Table Demo - 5 Columns */}
                    <div className="mb-8">
                      <h5 className="text-sm font-medium mb-3 text-gray-700">5-Column Configuration: Competence Assessment</h5>
                      <FormTable
                        title="Part C: Competence Assessment (Professional Knowledge & Skills)"
                        columns={[
                          { id: 'sno', header: 'S.No', type: 'readonly', width: '60px' },
                          { id: 'criteria', header: 'Assessment Criteria', type: 'text', placeholder: 'Enter criteria' },
                          { id: 'weight', header: 'Weight %', type: 'number', placeholder: '0', width: '100px' },
                          { 
                            id: 'effectiveness', 
                            header: 'Effectiveness', 
                            type: 'select',
                            placeholder: 'Select Rating',
                            options: [
                              { value: '5-exceeds-expectations', label: '5- Exceeds Expectations' },
                              { value: '4-meets-expectations', label: '4- Meets Expectations' },
                              { value: '3-somewhat-meets-expectations', label: '3- Somewhat Meets Expectations' },
                              { value: '2-below-expectations', label: '2- Below Expectations' },
                              { value: '1-significantly-below-expectations', label: '1- Significantly Below Expectations' }
                            ]
                          },
                          { id: 'score', header: 'Score', type: 'number', placeholder: '0-100', width: '80px' }
                        ]}
                        data={assessmentData}
                        onDataChange={setAssessmentData}
                        addButtonText="Add Criteria"
                        emptyMessage="No assessment criteria added yet."
                        showActions={true}
                        showComments={true}
                      />
                    </div>

                    {/* Incident Table Demo - 4 Columns */}
                    <div className="mb-6">
                      <h5 className="text-sm font-medium mb-3 text-gray-700">4-Column Configuration: Incident Tracking</h5>
                      <FormTable
                        title="Safety Incident Log"
                        columns={[
                          { id: 'date', header: 'Date', type: 'text', placeholder: 'YYYY-MM-DD', width: '120px' },
                          { id: 'type', header: 'Incident Type', type: 'text', placeholder: 'Describe incident type' },
                          { 
                            id: 'severity', 
                            header: 'Severity', 
                            type: 'select',
                            placeholder: 'Select severity',
                            options: [
                              { value: 'high', label: 'High' },
                              { value: 'medium', label: 'Medium' },
                              { value: 'low', label: 'Low' }
                            ]
                          },
                          { 
                            id: 'status', 
                            header: 'Status', 
                            type: 'select',
                            placeholder: 'Select status',
                            options: [
                              { value: 'open', label: 'Open' },
                              { value: 'investigating', label: 'Investigating' },
                              { value: 'closed', label: 'Closed' }
                            ]
                          }
                        ]}
                        data={incidentData}
                        onDataChange={setIncidentData}
                        addButtonText="Add Incident"
                        emptyMessage="No incidents recorded."
                        showActions={true}
                        showComments={false}
                      />
                    </div>

                    {/* Flexibility Information */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="text-sm font-medium text-green-900 mb-2">Component Flexibility Features</h5>
                      <div className="text-sm text-green-800 space-y-2">
                        <div><strong>Dynamic Columns:</strong> Support for 2-10+ columns with configurable widths</div>
                        <div><strong>Column Types:</strong> text, select (dropdown), number, readonly</div>
                        <div><strong>Configurable Options:</strong> Custom dropdowns, placeholders, validation</div>
                        <div><strong>Optional Features:</strong> Comments, actions, custom empty messages</div>
                        <div><strong>Data Agnostic:</strong> Works with any data structure matching column IDs</div>
                        <div><strong>Responsive:</strong> Horizontal scroll on mobile, full layout on desktop</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                {/* Layout Components */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="h-5 w-5" />
                      Layout Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Cards */}
                    <div>
                      <h4 className="font-medium mb-3">Cards</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Simple Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>This is a simple card with header and content.</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Vessel Info</CardTitle>
                            <Badge>Active</Badge>
                          </CardHeader>
                          <CardContent>
                            <p>MV Atlantic Star</p>
                            <p className="text-sm text-muted-foreground">Oil Tanker</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src="/figmaAssets/group-3.png" />
                                <AvatarFallback>JM</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">James Michael</p>
                                <p className="text-xs text-muted-foreground">Master</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <Separator />

                    {/* Avatars */}
                    <div>
                      <h4 className="font-medium mb-3">Avatars</h4>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/figmaAssets/group-3.png" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarImage src="/figmaAssets/group-3.png" />
                          <AvatarFallback>MD</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/figmaAssets/group-3.png" />
                          <AvatarFallback>LG</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>FO</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <Separator />

                    {/* Separator Examples */}
                    <div>
                      <h4 className="font-medium mb-3">Separators</h4>
                      <div className="space-y-4">
                        <div>
                          <p>Content above separator</p>
                          <Separator className="my-2" />
                          <p>Content below separator</p>
                        </div>
                      </div>
                    </div>
                    <Separator />

                    {/* Skeletons */}
                    <div>
                      <h4 className="font-medium mb-3">Skeleton Loading</h4>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                    <Separator />

                    {/* SCOMP Main Table Screen System */}
                    <div>
                      <h4 className="font-medium mb-3">SCOMP Main Table Screen System</h4>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="text-sm font-medium text-blue-900 mb-2">Full-screen Maritime Table Layouts</h5>
                          <p className="text-sm text-blue-800 mb-3">
                            The SCOMP Main Table Screen provides standardized full-screen table layouts with configurable navigation, 
                            dynamic filters, and AG Grid integration. Perfect for crew management, inspections, audits, and data-heavy 
                            screens across all TMSA modules.
                          </p>
                          
                          <div className="flex flex-wrap gap-2 text-xs text-blue-700">
                            <span className="bg-blue-100 px-2 py-1 rounded">Flexible Navigation</span>
                            <span className="bg-blue-100 px-2 py-1 rounded">Dynamic Filters</span>
                            <span className="bg-blue-100 px-2 py-1 rounded">AG Grid Ready</span>
                            <span className="bg-blue-100 px-2 py-1 rounded">Mobile Responsive</span>
                            <span className="bg-blue-100 px-2 py-1 rounded">Multi-Module Support</span>
                          </div>
                        </div>
                        
                        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                          <DialogTrigger asChild>
                            <Button className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white">
                              View SCOMP Main Table Screen Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-none w-screen h-screen p-0 m-0 rounded-none border-0 [&>button]:hidden">
                            {/* Full Screen Header with Close Button */}
                            <div className="relative p-6 pb-4 border-b">
                              <DialogHeader>
                                <DialogTitle>SCOMP Main Table Screen Preview</DialogTitle>
                                <DialogDescription>
                                  Interactive preview showing different module configurations and flexible layout options
                                </DialogDescription>
                              </DialogHeader>
                              <button
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => setIsPreviewOpen(false)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="px-6 pb-6 space-y-6 overflow-y-auto flex-1">
                              {/* Basic Configuration Example */}
                              <div>
                                <h5 className="text-sm font-medium mb-3 text-gray-700">Basic Configuration - Crew Management</h5>
                                <SCOMPMainTableScreen
                                  previewMode={true}
                                  screenTitle="Crew Management"
                                  filters={[
                                    { id: 'search', type: 'search', placeholder: 'Search crew members...', label: 'Search' },
                                    { 
                                      id: 'rank', 
                                      type: 'select', 
                                      placeholder: 'Select rank...', 
                                      label: 'Rank',
                                      options: [
                                        { value: 'master', label: 'Master' },
                                        { value: 'chief-engineer', label: 'Chief Engineer' },
                                        { value: 'able-seaman', label: 'Able Seaman' }
                                      ]
                                    },
                                    { id: 'vessel', type: 'select', placeholder: 'Select vessel...', label: 'Vessel' }
                                  ]}
                                  columnDefs={[
                                    { field: 'id', headerName: 'Crew ID', flex: 1, minWidth: 120, filter: 'agTextColumnFilter', sortable: true },
                                    { field: 'name', headerName: 'Name', flex: 2, minWidth: 160, filter: 'agTextColumnFilter', sortable: true },
                                    { field: 'rank', headerName: 'Rank', flex: 1, minWidth: 130, filter: 'agSetColumnFilter', sortable: true },
                                    { field: 'vessel', headerName: 'Vessel', flex: 1.5, minWidth: 150, filter: 'agTextColumnFilter', sortable: true },
                                    {
                                      field: 'actions',
                                      headerName: 'Actions',
                                      width: 120,
                                      sortable: false,
                                      filter: false,
                                      resizable: false,
                                      pinned: 'right',
                                      cellRenderer: (params: any) => {
                                        const eDiv = document.createElement('div');
                                        eDiv.className = 'flex items-center gap-2 justify-center py-1';
                                        eDiv.innerHTML = `
                                          <button class="p-1 hover:bg-gray-100 rounded" title="View" onclick="console.log('View clicked for:', '${params.data.id}')">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                          </button>
                                          <button class="p-1 hover:bg-gray-100 rounded" title="Edit" onclick="console.log('Edit clicked for:', '${params.data.id}')">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                          </button>
                                          <button class="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete" onclick="console.log('Delete clicked for:', '${params.data.id}')">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                          </button>
                                        `;
                                        return ActionsCellRenderer(params);
                                      }
                                    }
                                  ]}
                                  sampleData={[
                                    { id: '2025-05-14', name: 'James Michael', rank: 'Master', vessel: 'MT Sail One' },
                                    { id: '2025-03-12', name: 'Anna Marie Johnson', rank: 'Chief Engineer', vessel: 'MT Sail Ten' },
                                    { id: '2025-02-15', name: 'David Lee Brown', rank: 'Able Seaman', vessel: 'MT Sail Two' }
                                  ]}
                                  primaryAction={{
                                    label: 'Add New Crew',
                                    icon: <PlusIcon className="w-4 h-4" />
                                  }}
                                />
                              </div>

                              {/* Different Module Configuration Example */}
                              <div>
                                <h5 className="text-sm font-medium mb-3 text-gray-700">Different Module Configuration - Port State Control</h5>
                                <SCOMPMainTableScreen
                                  previewMode={true}
                                  currentModule="Port State Control"
                                  navigationItems={[
                                    { id: 'inspections', label: 'Inspections', icon: <div className="w-4 h-4 bg-red-400 rounded"></div>, isActive: true },
                                    { id: 'certificates', label: 'Certificates', icon: <div className="w-4 h-4 bg-yellow-400 rounded"></div>, isActive: false },
                                    { id: 'deficiencies', label: 'Deficiencies', icon: <div className="w-4 h-4 bg-orange-400 rounded"></div>, isActive: false },
                                    { id: 'reports', label: 'Reports', icon: <div className="w-4 h-4 bg-blue-400 rounded"></div>, isActive: false }
                                  ]}
                                  screenTitle="Port State Control Inspections"
                                  filters={[
                                    { id: 'search', type: 'search', placeholder: 'Search inspections...', label: 'Search' },
                                    { 
                                      id: 'status', 
                                      type: 'select', 
                                      placeholder: 'Select status...', 
                                      label: 'Status',
                                      options: [
                                        { value: 'passed', label: 'Passed' },
                                        { value: 'deficiencies', label: 'Deficiencies Found' },
                                        { value: 'detained', label: 'Detained' }
                                      ]
                                    },
                                    { id: 'dateFrom', type: 'date', label: 'From Date' },
                                    { id: 'dateTo', type: 'date', label: 'To Date' }
                                  ]}
                                  columnDefs={[
                                    { field: 'inspectionId', headerName: 'Inspection ID', flex: 1.5, minWidth: 140, filter: 'agTextColumnFilter', sortable: true },
                                    { field: 'vessel', headerName: 'Vessel', flex: 2, minWidth: 160, filter: 'agTextColumnFilter', sortable: true },
                                    { field: 'port', headerName: 'Port', flex: 1, minWidth: 120, filter: 'agSetColumnFilter', sortable: true },
                                    { 
                                      field: 'status', 
                                      headerName: 'Status', 
                                      flex: 1, 
                                      minWidth: 120,
                                      filter: 'agSetColumnFilter', 
                                      sortable: true,
                                      cellRenderer: (params: any) => {
                                        const status = params.value;
                                        const colorClass = status === 'Passed' ? 'bg-green-100 text-green-800' : 
                                                          status === 'Deficiencies' ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-red-100 text-red-800';
                                        return `<span class="inline-flex px-2 py-1 rounded-full text-xs font-medium ${colorClass}">${status}</span>`;
                                      }
                                    },
                                    { field: 'date', headerName: 'Date', flex: 1, minWidth: 110, filter: 'agDateColumnFilter', sortable: true },
                                    {
                                      field: 'actions',
                                      headerName: 'Actions',
                                      width: 120,
                                      sortable: false,
                                      filter: false,
                                      resizable: false,
                                      pinned: 'right',
                                      cellRenderer: (params: any) => {
                                        const eDiv = document.createElement('div');
                                        eDiv.className = 'flex items-center gap-2 justify-center py-1';
                                        eDiv.innerHTML = `
                                          <button class="p-1 hover:bg-gray-100 rounded" title="View" onclick="console.log('View clicked for:', '${params.data.inspectionId}')">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 616 0z"></path>
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                          </button>
                                          <button class="p-1 hover:bg-gray-100 rounded" title="Edit" onclick="console.log('Edit clicked for:', '${params.data.inspectionId}')">
                                            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                          </button>
                                          <button class="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete" onclick="console.log('Delete clicked for:', '${params.data.inspectionId}')">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                          </button>
                                        `;
                                        return ActionsCellRenderer(params);
                                      }
                                    }
                                  ]}
                                  sampleData={[
                                    { inspectionId: 'PSC-2025-001', vessel: 'MT Atlantic Star', port: 'Hamburg', status: 'Passed', date: '2025-01-15' },
                                    { inspectionId: 'PSC-2025-002', vessel: 'MT Pacific Wave', port: 'Rotterdam', status: 'Deficiencies', date: '2025-01-20' }
                                  ]}
                                  primaryAction={{
                                    label: 'New Inspection',
                                    icon: <PlusIcon className="w-4 h-4" />
                                  }}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                {/* Feedback Components */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Feedback Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Badges */}
                    <div>
                      <h4 className="font-medium mb-3">Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                        <Badge className="bg-red-100 text-red-800">Critical</Badge>
                      </div>
                    </div>
                    <Separator />

                    {/* Alerts */}
                    <div>
                      <h4 className="font-medium mb-3">Alerts</h4>
                      <div className="space-y-3">
                        <Alert>
                          <AlertTitle>Information</AlertTitle>
                          <AlertDescription>
                            This is an informational alert message.
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-yellow-200 bg-yellow-50">
                          <AlertTitle className="text-yellow-800">Warning</AlertTitle>
                          <AlertDescription className="text-yellow-700">
                            This is a warning alert. Please review the information carefully.
                          </AlertDescription>
                        </Alert>
                        <Alert className="border-red-200 bg-red-50">
                          <AlertTitle className="text-red-800">Error</AlertTitle>
                          <AlertDescription className="text-red-700">
                            Something went wrong. Please try again later.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                    <Separator />

                    {/* Progress */}
                    <div>
                      <h4 className="font-medium mb-3">Progress Indicators</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>TMSA Compliance</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Safety Training</span>
                            <span>90%</span>
                          </div>
                          <Progress value={90} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Maintenance</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} />
                        </div>
                      </div>
                    </div>
                    <Separator />

                    {/* Tooltips */}
                    <div>
                      <h4 className="font-medium mb-3">Tooltips</h4>
                      <div className="flex gap-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline">Hover me</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This is a tooltip</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge>Info Badge</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Additional information about this badge</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <Separator />

                    {/* Dialogs and Popovers */}
                    <div>
                      <h4 className="font-medium mb-3">Interactive Overlays</h4>
                      <div className="flex gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Open Dialog</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Vessel Information</DialogTitle>
                              <DialogDescription>
                                View detailed information about the selected vessel.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p>This is a dialog with vessel information.</p>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline">Open Popover</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="space-y-2">
                              <h4 className="font-medium">Quick Actions</h4>
                              <p className="text-sm text-muted-foreground">
                                Select an action below.
                              </p>
                              <div className="flex flex-col gap-2">
                                <Button size="sm" variant="outline">View Details</Button>
                                <Button size="sm" variant="outline">Edit Information</Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Item</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the selected item.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};