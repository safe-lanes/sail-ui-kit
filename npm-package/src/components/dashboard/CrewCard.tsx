import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export interface CrewMember {
  id: string;
  name: string;
  rank: string;
  vessel?: string;
  status: 'onboard' | 'shore-leave' | 'training' | 'medical-leave' | 'available';
  certificationStatus: 'valid' | 'expiring' | 'expired';
  nextRotation?: string;
}

export interface CrewCardProps {
  title?: string;
  crewMembers: CrewMember[];
  showMemberDetails?: boolean;
  onMemberClick?: (member: CrewMember) => void;
  className?: string;
}

const statusConfig = {
  'onboard': { color: 'bg-green-100 text-green-800 border-green-200', icon: '🚢', label: 'Onboard' },
  'shore-leave': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '🏖', label: 'Shore Leave' },
  'training': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '📚', label: 'Training' },
  'medical-leave': { color: 'bg-red-100 text-red-800 border-red-200', icon: '🏥', label: 'Medical' },
  'available': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '✓', label: 'Available' }
};

const certificationConfig = {
  'valid': { color: 'bg-green-100 text-green-800 border-green-200', label: 'Valid' },
  'expiring': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Expiring' },
  'expired': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Expired' }
};

export function CrewCard({
  title = "Crew",
  crewMembers,
  showMemberDetails = false,
  onMemberClick,
  className = ''
}: CrewCardProps) {
  const totalCrew = crewMembers.length;
  const onboardCount = crewMembers.filter(c => c.status === 'onboard').length;
  const availableCount = crewMembers.filter(c => c.status === 'available').length;
  const trainingCount = crewMembers.filter(c => c.status === 'training').length;
  const medicalLeaveCount = crewMembers.filter(c => c.status === 'medical-leave').length;

  const validCertifications = crewMembers.filter(c => c.certificationStatus === 'valid').length;
  const expiringCertifications = crewMembers.filter(c => c.certificationStatus === 'expiring').length;
  const expiredCertifications = crewMembers.filter(c => c.certificationStatus === 'expired').length;

  const certificationCompliance = totalCrew > 0 ? (validCertifications / totalCrew) * 100 : 0;

  // Group by ranks
  const rankCounts = crewMembers.reduce((acc, member) => {
    acc[member.rank] = (acc[member.rank] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-lg">👥</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Total Crew */}
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {totalCrew}
            </div>
            <p className="text-xs text-gray-500">
              {onboardCount} onboard, {availableCount} available
            </p>
          </div>

          {/* Status Distribution */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              🚢 {onboardCount} Onboard
            </Badge>
            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
              ✓ {availableCount} Available
            </Badge>
            {trainingCount > 0 && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                📚 {trainingCount} Training
              </Badge>
            )}
            {medicalLeaveCount > 0 && (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                🏥 {medicalLeaveCount} Medical Leave
              </Badge>
            )}
          </div>

          {/* Certification Compliance */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Certification Compliance</span>
              <span>{Math.round(certificationCompliance)}%</span>
            </div>
            <Progress value={certificationCompliance} className="h-2" />
            <div className="flex flex-wrap gap-1 text-xs">
              <span className="text-green-600">{validCertifications} valid</span>
              {expiringCertifications > 0 && (
                <span className="text-yellow-600">• {expiringCertifications} expiring</span>
              )}
              {expiredCertifications > 0 && (
                <span className="text-red-600">• {expiredCertifications} expired</span>
              )}
            </div>
          </div>

          {/* Rank Distribution */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              By Rank
            </h4>
            <div className="flex flex-wrap gap-1">
              {Object.entries(rankCounts).map(([rank, count]: [string, number]) => (
                <Badge key={rank} variant="outline">
                  {rank}: {count}
                </Badge>
              ))}
            </div>
          </div>

          {/* Member Details */}
          {showMemberDetails && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Crew Members
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {crewMembers.slice(0, 10).map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 ${
                      onMemberClick ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => onMemberClick?.(member)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        {statusConfig[member.status]?.icon}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {member.rank}
                          {member.vessel && ` • ${member.vessel}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={statusConfig[member.status]?.color}
                      >
                        {statusConfig[member.status]?.label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${certificationConfig[member.certificationStatus]?.color} text-xs mt-1`}
                      >
                        {certificationConfig[member.certificationStatus]?.label}
                      </Badge>
                    </div>
                  </div>
                ))}
                {crewMembers.length > 10 && (
                  <p className="text-xs text-gray-500 text-center py-2">
                    ... and {crewMembers.length - 10} more
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