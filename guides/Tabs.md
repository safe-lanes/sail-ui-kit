# Tabs Component Guide

## Overview
Tabs provides organized content navigation for maritime applications with multiple related data sections. It supports horizontal and vertical layouts, dynamic content loading, and maritime-specific information organization optimized for vessel management and operational dashboards.

## Component Interface

```typescript
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'scomp-ui';

function BasicTabsExample() {
  return (
    <div className="max-w-4xl">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="crew">Crew</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <h3 className="text-lg font-medium">Vessel Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-2">Current Status</h4>
              <p className="text-green-600">Operational</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-2">Location</h4>
              <p className="text-gray-700">Port of Rotterdam</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="space-y-4">
          <h3 className="text-lg font-medium">Technical Specifications</h3>
          <div className="bg-white border rounded-lg p-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="font-medium">Length Overall</dt>
                <dd className="text-gray-700">180.5 meters</dd>
              </div>
              <div>
                <dt className="font-medium">Beam</dt>
                <dd className="text-gray-700">32.2 meters</dd>
              </div>
              <div>
                <dt className="font-medium">Draft</dt>
                <dd className="text-gray-700">12.8 meters</dd>
              </div>
              <div>
                <dt className="font-medium">Gross Tonnage</dt>
                <dd className="text-gray-700">25,340 MT</dd>
              </div>
            </dl>
          </div>
        </TabsContent>
        
        <TabsContent value="crew" className="space-y-4">
          <h3 className="text-lg font-medium">Crew Information</h3>
          <div className="bg-white border rounded-lg p-4">
            <p className="text-gray-700">Crew management content...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <h3 className="text-lg font-medium">Vessel Documents</h3>
          <div className="bg-white border rounded-lg p-4">
            <p className="text-gray-700">Document management content...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## Vessel Management Dashboard

```jsx
import { Ship, Users, FileText, Settings, BarChart3, AlertTriangle, Calendar, MapPin } from 'lucide-react';

function VesselManagementDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const vesselData = {
    name: 'MV Atlantic Star',
    imo: '1234567',
    type: 'Container Ship',
    status: 'Operational',
    location: 'Port of Rotterdam',
    captain: 'Captain James Wilson'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{vesselData.name}</h1>
          <p className="text-gray-600">{vesselData.type} • IMO: {vesselData.imo}</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {vesselData.status}
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <Ship className="h-4 w-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="crew" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Crew
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Current Position</h3>
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{vesselData.location}</p>
                <p className="text-gray-600">51.9244° N, 4.4777° E</p>
                <p className="text-sm text-gray-500">Last updated: 2 minutes ago</p>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Voyage Progress</h3>
                <Ship className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">65%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <p className="text-sm text-gray-500">ETA: March 18, 14:00</p>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Safety Score</h3>
                <AlertTriangle className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-green-600">94.2%</p>
                <p className="text-gray-600">Excellent</p>
                <p className="text-sm text-gray-500">127 days without incident</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Departed Port of Antwerp</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Cargo loading completed</p>
                    <p className="text-xs text-gray-500">6 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Port State Control inspection</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Key Performance Indicators</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fuel Efficiency</span>
                    <span>12.8 MT/day</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On-Time Performance</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cargo Utilization</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Current Voyage</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span>Rotterdam → Hamburg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span>285 NM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Speed:</span>
                  <span>14.2 knots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA:</span>
                  <span>March 18, 14:00</span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Weather Conditions</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Wind:</span>
                  <span>SW 15 knots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sea State:</span>
                  <span>3-4 meters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility:</span>
                  <span>Good (>10 NM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weather:</span>
                  <span>Partly Cloudy</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="crew" className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Crew Manifest</h3>
              <button className="px-4 py-2 bg-[#16569e] text-white rounded hover:bg-[#144d8a]">
                View Full Roster
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">James Wilson</p>
                    <p className="text-sm text-gray-600">Master</p>
                  </div>
                </div>
                <span className="text-green-600 text-sm">On Board</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Chen</p>
                    <p className="text-sm text-gray-600">Chief Officer</p>
                  </div>
                </div>
                <span className="text-green-600 text-sm">On Board</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Scheduled Maintenance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Engine Overhaul</p>
                    <p className="text-sm text-gray-600">Due: April 15, 2024</p>
                  </div>
                  <span className="text-yellow-600 text-sm">Upcoming</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Hull Inspection</p>
                    <p className="text-sm text-gray-600">Due: May 20, 2024</p>
                  </div>
                  <span className="text-gray-600 text-sm">Scheduled</span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Recent Maintenance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Safety Equipment Check</p>
                    <p className="text-sm text-gray-600">Completed: March 10, 2024</p>
                  </div>
                  <span className="text-green-600 text-sm">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-medium mb-4">Certificate Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Safety Management Certificate</span>
                  <span className="text-green-600 text-sm">Valid</span>
                </div>
                <p className="text-sm text-gray-600">Expires: December 15, 2024</p>
              </div>
              <div className="p-3 border rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium">ISPS Certificate</span>
                  <span className="text-yellow-600 text-sm">Expiring Soon</span>
                </div>
                <p className="text-sm text-gray-600">Expires: April 20, 2024</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-medium mb-4">TMSA Compliance Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Overall Score</span>
                <span className="text-xl font-bold text-green-600">94.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{width: '94.2%'}}></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Last Assessment</p>
                  <p className="font-medium">February 15, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Assessment</p>
                  <p className="font-medium">August 15, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## Vertical Tabs Layout

```jsx
function VerticalTabsLayout() {
  return (
    <div className="max-w-4xl">
      <Tabs defaultValue="vessel-info" orientation="vertical" className="flex gap-6">
        <TabsList className="flex flex-col h-fit w-48">
          <TabsTrigger value="vessel-info" className="w-full justify-start">
            <Ship className="h-4 w-4 mr-2" />
            Vessel Information
          </TabsTrigger>
          <TabsTrigger value="technical" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Technical Specs
          </TabsTrigger>
          <TabsTrigger value="operational" className="w-full justify-start">
            <BarChart3 className="h-4 w-4 mr-2" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="safety" className="w-full justify-start">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Safety & Compliance
          </TabsTrigger>
          <TabsTrigger value="financial" className="w-full justify-start">
            <DollarSign className="h-4 w-4 mr-2" />
            Financial
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="vessel-info" className="mt-0">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Basic Vessel Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Vessel Name</label>
                  <p className="font-medium">MV Atlantic Star</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">IMO Number</label>
                  <p className="font-medium">1234567</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Flag State</label>
                  <p className="font-medium">Panama</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Classification</label>
                  <p className="font-medium">Lloyd's Register</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="mt-0">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Length Overall</label>
                  <p className="font-medium">180.5 m</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Beam</label>
                  <p className="font-medium">32.2 m</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Draft</label>
                  <p className="font-medium">12.8 m</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Gross Tonnage</label>
                  <p className="font-medium">25,340 MT</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operational" className="mt-0">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Operational Data</h3>
              <p className="text-gray-600">Operational metrics and performance data...</p>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-0">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Safety & Compliance</h3>
              <p className="text-gray-600">Safety records and compliance status...</p>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-0">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-4">Financial Performance</h3>
              <p className="text-gray-600">Revenue, costs, and financial metrics...</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
```

## Dynamic and Conditional Tabs

```jsx
function DynamicConditionalTabs() {
  const [userRole, setUserRole] = useState('officer');
  const [vesselType, setVesselType] = useState('tanker');
  const [activeTab, setActiveTab] = useState('overview');

  // Dynamic tabs based on user role and vessel type
  const getAvailableTabs = () => {
    const baseTabs = [
      { id: 'overview', label: 'Overview', icon: BarChart3 }
    ];

    // Role-based tabs
    if (userRole === 'master' || userRole === 'chief-officer') {
      baseTabs.push(
        { id: 'navigation', label: 'Navigation', icon: MapPin },
        { id: 'crew', label: 'Crew', icon: Users }
      );
    }

    if (userRole === 'master') {
      baseTabs.push(
        { id: 'compliance', label: 'Compliance', icon: AlertTriangle },
        { id: 'financial', label: 'Financial', icon: DollarSign }
      );
    }

    // Vessel type specific tabs
    if (vesselType === 'tanker') {
      baseTabs.push({ id: 'cargo', label: 'Cargo Operations', icon: Ship });
    }

    if (vesselType === 'container') {
      baseTabs.push({ id: 'containers', label: 'Container Management', icon: Package });
    }

    return baseTabs;
  };

  const availableTabs = getAvailableTabs();

  // Reset active tab if it's no longer available
  useEffect(() => {
    if (!availableTabs.find(tab => tab.id === activeTab)) {
      setActiveTab('overview');
    }
  }, [userRole, vesselType, availableTabs, activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div>
          <label className="text-sm font-medium">User Role:</label>
          <select 
            value={userRole} 
            onChange={(e) => setUserRole(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="officer">Officer</option>
            <option value="chief-officer">Chief Officer</option>
            <option value="master">Master</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Vessel Type:</label>
          <select 
            value={vesselType} 
            onChange={(e) => setVesselType(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="tanker">Tanker</option>
            <option value="container">Container Ship</option>
            <option value="bulk">Bulk Carrier</option>
          </select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full grid-cols-${availableTabs.length}`}>
          {availableTabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-medium mb-2">Vessel Overview</h3>
            <p className="text-gray-600">Basic vessel information and status...</p>
          </div>
        </TabsContent>

        {availableTabs.find(tab => tab.id === 'navigation') && (
          <TabsContent value="navigation">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-2">Navigation</h3>
              <p className="text-gray-600">Navigation data and route information...</p>
            </div>
          </TabsContent>
        )}

        {availableTabs.find(tab => tab.id === 'crew') && (
          <TabsContent value="crew">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-2">Crew Management</h3>
              <p className="text-gray-600">Crew roster and management tools...</p>
            </div>
          </TabsContent>
        )}

        {availableTabs.find(tab => tab.id === 'compliance') && (
          <TabsContent value="compliance">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-2">Compliance</h3>
              <p className="text-gray-600">TMSA and regulatory compliance...</p>
            </div>
          </TabsContent>
        )}

        {availableTabs.find(tab => tab.id === 'financial') && (
          <TabsContent value="financial">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-2">Financial</h3>
              <p className="text-gray-600">Financial performance and reporting...</p>
            </div>
          </TabsContent>
        )}

        {availableTabs.find(tab => tab.id === 'cargo') && (
          <TabsContent value="cargo">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-2">Cargo Operations</h3>
              <p className="text-gray-600">Tanker-specific cargo management...</p>
            </div>
          </TabsContent>
        )}

        {availableTabs.find(tab => tab.id === 'containers') && (
          <TabsContent value="containers">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-medium mb-2">Container Management</h3>
              <p className="text-gray-600">Container-specific operations...</p>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
```

## Key Features
- **Organized Navigation**: Clean tab interface for complex maritime data
- **Icon Integration**: Lucide React icons for visual tab identification
- **Horizontal & Vertical**: Flexible layout options for different use cases
- **Dynamic Content**: Conditional tabs based on user roles and vessel types
- **Responsive Design**: Mobile-friendly tab layout with scrolling
- **State Management**: Controlled and uncontrolled tab state options
- **Accessibility**: Full keyboard navigation and screen reader support
- **Maritime Theming**: Professional styling matching maritime applications

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Tab Organization Patterns
- **Vessel Management**: Overview, Operations, Crew, Maintenance, Documents
- **Compliance**: TMSA, Certificates, Inspections, Audits
- **Operations**: Navigation, Cargo, Safety, Performance
- **Administration**: Settings, Users, Reports, System

## Best Practices
1. **Logical Grouping**: Group related information together
2. **Consistent Labeling**: Use clear, maritime-standard terminology
3. **Icon Usage**: Include relevant icons for quick identification
4. **Role-Based Access**: Show appropriate tabs based on user permissions
5. **State Persistence**: Maintain tab state across navigation
6. **Mobile Optimization**: Ensure usability on smaller screens
7. **Loading States**: Handle dynamic content loading gracefully

## Common Use Cases
- Vessel management dashboards
- Crew information systems
- Compliance and certification tracking
- Operational data organization
- Multi-section forms and wizards
- Settings and configuration panels
- Document management systems
- Training and certification modules
- Financial and performance reporting
- Equipment and inventory management