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
}

export function OperationsDashboard({ 
  fleetSummary, 
  vessels, 
  tmsa, 
  incidents = [],
  className = '' 
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
            <p className="text-xs text-muted-foreground">
              across all vessels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fleetSummary.openIncidents}</div>
            <p className="text-xs text-muted-foreground">
              requiring attention
            </p>
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
              {vessels.slice(0, 6).map((vessel) => (
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
                    <VesselStatusIndicator status={vessel.status} />
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
              {tmsa.slice(0, 5).map((element) => (
                <TMSAComplianceIndicator 
                  key={element.id} 
                  element={element} 
                  compact={true}
                />
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
              {incidents.slice(0, 5).map((incident) => (
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