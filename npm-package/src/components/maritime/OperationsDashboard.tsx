import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { VesselStatusIndicator } from './VesselStatusIndicator';
import { SafetyRatingBadge } from './SafetyRatingBadge';
import { TMSAComplianceIndicator } from './TMSAComplianceIndicator';
import { Ship, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import type { VesselStatus } from './VesselStatusIndicator';
import type { SafetyRating } from './SafetyRatingBadge';
import type { TMSAElement } from './TMSAComplianceIndicator';

interface FleetSummary {
  totalVessels: number;
  activeVessels: number;
  averageUtilization: number;
  totalCrew: number;
  openIncidents: number;
  complianceScore: number;
}

interface VesselSummary {
  id: string;
  name: string;
  type: string;
  status: VesselStatus;
  location: string;
  safetyRating: SafetyRating;
  utilization: number;
  nextMaintenance: string;
}

interface OperationsDashboardProps {
  fleetSummary: FleetSummary;
  vessels: VesselSummary[];
  tmsa: TMSAElement[];
  incidents?: Array<{
    id: string;
    title: string;
    severity: string;
    date: string;
  }>;
  className?: string;

  // ✨ ENTERPRISE ENHANCEMENTS

  // Real-time data management
  loading?: boolean;
  lastUpdated?: Date;
  enableAutoRefresh?: boolean;
  refreshInterval?: number;
  onRefresh?: () => void;
  onDataUpdate?: (data: Partial<OperationsDashboardProps>) => void;

  // Interactive callbacks
  onVesselClick?: (vessel: VesselSummary) => void;
  onVesselDoubleClick?: (vessel: VesselSummary) => void;
  onIncidentClick?: (incident: {
    id: string;
    title: string;
    severity: string;
    date: string;
  }) => void;
  onKPIClick?: (kpi: 'vessels' | 'utilization' | 'crew' | 'incidents') => void;
  onTMSAElementClick?: (element: TMSAElement) => void;

  // Filtering and search
  enableFiltering?: boolean;
  onFilterChange?: (filters: {
    vesselType?: string[];
    status?: string[];
    location?: string[];
    severity?: string[];
  }) => void;
  onSearch?: (searchTerm: string) => void;
  searchPlaceholder?: string;

  // Drill-down capabilities
  onDrillDown?: (type: 'fleet' | 'vessel' | 'incident' | 'tmsa', id?: string) => void;
  enableDrillDown?: boolean;

  // Customization options
  visibleSections?: {
    kpis?: boolean;
    vesselOverview?: boolean;
    incidentSummary?: boolean;
    tmsaCompliance?: boolean;
    alerts?: boolean;
  };
  kpiLayout?: 'grid' | 'row' | 'cards';
  chartConfigs?: {
    showTrends?: boolean;
    timeRange?: '24h' | '7d' | '30d' | '90d';
    chartType?: 'line' | 'bar' | 'area';
  };

  // Alert and notification management
  alerts?: Array<{
    id: string;
    type: 'warning' | 'error' | 'info' | 'success';
    message: string;
    timestamp: Date;
    vessel?: string;
    actionRequired?: boolean;
  }>;
  onAlertClick?: (alertId: string) => void;
  onAlertDismiss?: (alertId: string) => void;
  maxAlerts?: number;

  // Export and reporting
  onExport?: (format: 'pdf' | 'excel' | 'csv', section?: string) => void;
  onGenerateReport?: (type: 'fleet' | 'compliance' | 'incidents' | 'comprehensive') => void;
  enableExport?: boolean;

  // User interaction tracking
  onUserAction?: (action: string, details: Record<string, unknown>) => void;
  trackInteractions?: boolean;

  // Performance optimization
  enableVirtualization?: boolean;
  maxVisibleVessels?: number;
  lazyLoadIncidents?: boolean;

  // Maritime-specific features
  complianceThresholds?: {
    vesselUtilization?: number;
    safetyRating?: number;
    tmsaScore?: number;
  };
  weatherIntegration?: {
    enabled?: boolean;
    onWeatherAlert?: (vessel: string, weather: Record<string, unknown>) => void;
  };
  portScheduleIntegration?: {
    enabled?: boolean;
    onPortUpdate?: (vessel: string, port: Record<string, unknown>) => void;
  };

  // Layout and responsive behavior
  isMobile?: boolean;
  collapsibleSections?: boolean;
  defaultCollapsed?: string[];
  onSectionToggle?: (sectionId: string, collapsed: boolean) => void;

  // Custom actions and menu items
  customActions?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    tooltip?: string;
  }>;
  contextMenuItems?: Array<{
    id: string;
    label: string;
    onClick: (context: Record<string, unknown>) => void;
  }>;

  // Error handling
  error?: string;
  onErrorDismiss?: () => void;
  onRetry?: () => void;

  // Accessibility
  ariaLabel?: string;
  enableKeyboardNavigation?: boolean;
  onKeyboardShortcut?: (shortcut: string) => void;
}

export function OperationsDashboard({
  fleetSummary,
  vessels,
  tmsa,
  incidents = [],
  className = '',
}: OperationsDashboardProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Fleet KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vessels</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetSummary.activeVessels}</div>
            <p className="text-xs text-muted-foreground">
              of {fleetSummary.totalVessels} total vessels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetSummary.averageUtilization}%</div>
            <Progress value={fleetSummary.averageUtilization} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Crew</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetSummary.totalCrew}</div>
            <p className="text-xs text-muted-foreground">across all vessels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetSummary.openIncidents}</div>
            <p className="text-xs text-muted-foreground">requiring attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vessel Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Vessel Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vessels.slice(0, 6).map(vessel => (
                <div key={vessel.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{vessel.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {vessel.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{vessel.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <VesselStatusIndicator
                      vessel={{
                        name: vessel.name,
                        vesselType: vessel.type,
                        status: { status: vessel.status, location: vessel.location },
                      }}
                    />
                    <SafetyRatingBadge rating={vessel.safetyRating} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* TMSA Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>TMSA Compliance</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {fleetSummary.complianceScore}% Overall
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tmsa.slice(0, 5).map(element => (
                <TMSAComplianceIndicator key={element.id} elementData={element} compact={true} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      {incidents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidents.slice(0, 5).map(incident => (
                <div key={incident.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{incident.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(incident.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      incident.severity === 'critical'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : incident.severity === 'high'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }
                  >
                    {incident.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
