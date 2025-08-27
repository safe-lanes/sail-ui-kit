import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export interface FleetVesselStatus {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'in-port' | 'maintenance' | 'emergency' | 'at-sea';
  location?: string;
  crew: number;
  lastInspection?: string;
  safetyRating?: number;
}

export interface FleetStatusCardProps {
  vessels: FleetVesselStatus[];
  title?: string;
  showDetails?: boolean;
  onVesselClick?: (vessel: FleetVesselStatus) => void;
  className?: string;
}

const statusConfig = {
  'active': { color: 'bg-green-100 text-green-800 border-green-200', icon: '●' },
  'in-port': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '⚓' },
  'at-sea': { color: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: '🌊' },
  'maintenance': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⚠' },
  'emergency': { color: 'bg-red-100 text-red-800 border-red-200', icon: '🚨' }
};

export function FleetStatusCard({
  vessels,
  title = "Fleet Status",
  showDetails = false,
  onVesselClick,
  className = ''
}: FleetStatusCardProps) {
  const totalVessels = vessels.length;
  const inPortCount = vessels.filter(v => v.status === 'in-port').length;
  const activeCount = vessels.filter(v => v.status === 'active' || v.status === 'at-sea').length;
  const maintenanceCount = vessels.filter(v => v.status === 'maintenance').length;
  const emergencyCount = vessels.filter(v => v.status === 'emergency').length;

  const averageSafetyRating = vessels
    .filter(v => v.safetyRating)
    .reduce((sum, v) => sum + (v.safetyRating || 0), 0) / vessels.filter(v => v.safetyRating).length;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-lg">🚢</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary */}
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {totalVessels}
            </div>
            <p className="text-xs text-gray-500">
              {inPortCount} in port, {activeCount} operational
            </p>
          </div>

          {/* Status Distribution */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              ● {activeCount} Active
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              ⚓ {inPortCount} In Port
            </Badge>
            {maintenanceCount > 0 && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                ⚠ {maintenanceCount} Maintenance
              </Badge>
            )}
            {emergencyCount > 0 && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                🚨 {emergencyCount} Emergency
              </Badge>
            )}
          </div>

          {/* Average Safety Rating */}
          {!isNaN(averageSafetyRating) && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Fleet Safety Rating</span>
                <span>{averageSafetyRating.toFixed(1)}/5.0</span>
              </div>
              <Progress value={(averageSafetyRating / 5) * 100} className="h-2" />
            </div>
          )}

          {/* Detailed Vessel List */}
          {showDetails && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Fleet Overview
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {vessels.map((vessel) => (
                  <div
                    key={vessel.id}
                    className={`flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 ${
                      onVesselClick ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => onVesselClick?.(vessel)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm">
                        {statusConfig[vessel.status]?.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {vessel.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {vessel.type} • {vessel.crew} crew
                        </p>
                        {vessel.location && (
                          <p className="text-xs text-gray-500">
                            📍 {vessel.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={statusConfig[vessel.status]?.color}
                      >
                        {vessel.status}
                      </Badge>
                      {vessel.safetyRating && (
                        <p className="text-xs text-gray-500 mt-1">
                          Safety: {vessel.safetyRating}/5
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}