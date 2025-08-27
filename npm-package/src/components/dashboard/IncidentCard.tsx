import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'safety' | 'environmental' | 'security' | 'operational' | 'technical';
  vessel?: string;
  reportedBy: string;
  reportedAt: string;
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
}

export interface IncidentCardProps {
  title?: string;
  incidents: Incident[];
  timeframe?: string;
  showIncidentDetails?: boolean;
  onIncidentClick?: (incident: Incident) => void;
  className?: string;
}

const severityConfig = {
  'low': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: 'ℹ', label: 'Low' },
  'medium': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⚠', label: 'Medium' },
  'high': { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '⚠', label: 'High' },
  'critical': { color: 'bg-red-100 text-red-800 border-red-200', icon: '🚨', label: 'Critical' }
};

const typeConfig = {
  'safety': { color: 'bg-red-100 text-red-800 border-red-200', icon: '🦺', label: 'Safety' },
  'environmental': { color: 'bg-green-100 text-green-800 border-green-200', icon: '🌍', label: 'Environmental' },
  'security': { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '🔒', label: 'Security' },
  'operational': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '⚙', label: 'Operational' },
  'technical': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '🔧', label: 'Technical' }
};

const statusConfig = {
  'reported': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Reported' },
  'investigating': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Investigating' },
  'resolved': { color: 'bg-green-100 text-green-800 border-green-200', label: 'Resolved' },
  'closed': { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Closed' }
};

export function IncidentCard({
  title = "Incidents",
  incidents,
  timeframe = "Past month",
  showIncidentDetails = false,
  onIncidentClick,
  className = ''
}: IncidentCardProps) {
  const totalIncidents = incidents.length;
  const criticalCount = incidents.filter(i => i.severity === 'critical').length;
  const highCount = incidents.filter(i => i.severity === 'high').length;
  const resolvedCount = incidents.filter(i => i.status === 'resolved' || i.status === 'closed').length;
  const activeCount = incidents.filter(i => i.status === 'reported' || i.status === 'investigating').length;

  // Get severity breakdown
  const severityCounts = incidents.reduce((acc, incident) => {
    acc[incident.severity] = (acc[incident.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-lg">⚠</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Total Incidents */}
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {totalIncidents}
            </div>
            <p className="text-xs text-gray-500">
              {timeframe} • {criticalCount} critical
            </p>
          </div>

          {/* Severity Distribution */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(severityCounts).map(([severity, count]) => (
              <Badge
                key={severity}
                variant="outline"
                className={severityConfig[severity as keyof typeof severityConfig]?.color}
              >
                {severityConfig[severity as keyof typeof severityConfig]?.icon} {count} {severityConfig[severity as keyof typeof severityConfig]?.label}
              </Badge>
            ))}
          </div>

          {/* Status Summary */}
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <div className="font-medium text-red-600">{activeCount}</div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-green-600">{resolvedCount}</div>
              <div className="text-xs text-gray-500">Resolved</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-orange-600">{criticalCount + highCount}</div>
              <div className="text-xs text-gray-500">Priority</div>
            </div>
          </div>

          {/* Recent Incidents */}
          {showIncidentDetails && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Recent Incidents
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {incidents.slice(0, 5).map((incident) => (
                  <div
                    key={incident.id}
                    className={`p-3 rounded-lg border hover:bg-gray-50 ${
                      onIncidentClick ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => onIncidentClick?.(incident)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge
                            variant="outline"
                            className={severityConfig[incident.severity]?.color}
                          >
                            {severityConfig[incident.severity]?.icon} {severityConfig[incident.severity]?.label}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={typeConfig[incident.type]?.color}
                          >
                            {typeConfig[incident.type]?.icon} {typeConfig[incident.type]?.label}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {incident.title}
                        </p>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                          {incident.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {incident.vessel && `${incident.vessel} • `}
                            {incident.reportedBy}
                          </span>
                          <span>{new Date(incident.reportedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={statusConfig[incident.status]?.color}
                      >
                        {statusConfig[incident.status]?.label}
                      </Badge>
                    </div>
                  </div>
                ))}
                {incidents.length > 5 && (
                  <p className="text-xs text-gray-500 text-center py-2">
                    ... and {incidents.length - 5} more incidents
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}