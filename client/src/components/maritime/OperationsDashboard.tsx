import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VesselStatusIndicator, VesselStatus } from "./VesselStatusIndicator";
import { SafetyRatingBadge, SafetyRating } from "./SafetyRatingBadge";
import { TMSAComplianceIndicator, TMSAElement, ComplianceStatus } from "./TMSAComplianceIndicator";
import { 
  Ship, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar,
  MapPin,
  Activity
} from "lucide-react";

interface Vessel {
  id: string;
  name: string;
  imoNumber?: string;
  vesselType: string;
  status: VesselStatus;
  safetyRating: SafetyRating;
  crewCount: number;
  lastInspection?: string;
}

interface IncidentSummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  thisMonth: number;
  trend: "up" | "down" | "stable";
}

interface ComplianceSummary {
  totalElements: number;
  compliant: number;
  partiallyCompliant: number;
  nonCompliant: number;
  overallScore: number;
}

interface OperationsDashboardProps {
  vessels: Vessel[];
  incidents: IncidentSummary;
  compliance: ComplianceSummary;
  tmsakElements: Array<{ element: TMSAElement; status: ComplianceStatus }>;
}

export const OperationsDashboard: React.FC<OperationsDashboardProps> = ({
  vessels,
  incidents,
  compliance,
  tmsakElements
}) => {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);

  const getStatusCount = (status: string) => {
    return vessels.filter(v => v.status.status === status).length;
  };

  const getSafetyRatingColor = (rating: SafetyRating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getComplianceColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maritime Operations Dashboard</h1>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Status</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vessels.length}</div>
            <p className="text-xs text-muted-foreground">
              {getStatusCount("active")} active, {getStatusCount("port")} in port
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidents.thisMonth}</div>
            <p className="text-xs text-muted-foreground">
              This month ({incidents.critical} critical)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TMSA Compliance</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getComplianceColor(compliance.overallScore)}`}>
              {compliance.overallScore}%
            </div>
            <p className="text-xs text-muted-foreground">
              {compliance.compliant}/{compliance.totalElements} elements compliant
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crew</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vessels.reduce((total, vessel) => total + vessel.crewCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total crew members
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fleet" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fleet">Fleet Overview</TabsTrigger>
          <TabsTrigger value="compliance">TMSA Compliance</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="safety">Safety Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {vessels.map((vessel) => (
                  <Card 
                    key={vessel.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedVessel === vessel.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedVessel(selectedVessel === vessel.id ? null : vessel.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{vessel.name}</CardTitle>
                        <VesselStatusIndicator 
                          vessel={vessel} 
                          size="sm" 
                          showDetails 
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Type:</span>
                          <span>{vessel.vesselType}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Safety Rating:</span>
                          <SafetyRatingBadge 
                            rating={vessel.safetyRating} 
                            size="sm" 
                            type="vessel"
                            showDetails
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Crew:</span>
                          <span>{vessel.crewCount} members</span>
                        </div>
                        {vessel.lastInspection && (
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Last Inspection:</span>
                            <span>{vessel.lastInspection}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>TMSA Elements Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tmsakElements.map(({ element, status }) => (
                  <Card key={element.id}>
                    <CardContent className="pt-6">
                      <TMSAComplianceIndicator
                        element={element}
                        status={status}
                        showDetails
                        showScore
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incident Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{incidents.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{incidents.critical}</div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{incidents.high}</div>
                  <div className="text-sm text-muted-foreground">High</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{incidents.medium}</div>
                  <div className="text-sm text-muted-foreground">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{incidents.low}</div>
                  <div className="text-sm text-muted-foreground">Low</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Safety Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vessels.map((vessel) => (
                  <div key={vessel.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Ship className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{vessel.name}</div>
                        <div className="text-sm text-muted-foreground">{vessel.vesselType}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <SafetyRatingBadge 
                        rating={vessel.safetyRating} 
                        type="vessel"
                        showDetails
                      />
                      <VesselStatusIndicator 
                        vessel={vessel} 
                        size="sm" 
                        showDetails 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};