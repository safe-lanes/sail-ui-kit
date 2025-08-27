import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Users, Shield, Key, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

interface RBACStats {
  totalUsers: number;
  activeUsers: number;
  totalRoles: number;
  totalPermissions: number;
  recentLogins: number;
  failedLogins: number;
  privilegedUsers: number;
  inactiveUsers: number;
}

interface RecentActivity {
  id: string;
  type: 'login' | 'role_change' | 'permission_change' | 'user_created' | 'failed_login';
  user: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  resolved: boolean;
}

interface RBACDashboardProps {
  stats: RBACStats;
  activities: RecentActivity[];
  alerts: SecurityAlert[];
  onViewDetails: (section: string) => void;
  className?: string;
}

export function RBACDashboard({ 
  stats, 
  activities, 
  alerts, 
  onViewDetails,
  className = '' 
}: RBACDashboardProps) {
  const activeUserPercentage = (stats.activeUsers / stats.totalUsers) * 100;
  const failedLoginRate = (stats.failedLogins / (stats.recentLogins + stats.failedLogins)) * 100;

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'login':
        return <Activity className="h-4 w-4 text-green-600" />;
      case 'role_change':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'permission_change':
        return <Key className="h-4 w-4 text-purple-600" />;
      case 'user_created':
        return <Users className="h-4 w-4 text-teal-600" />;
      case 'failed_login':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active ({activeUserPercentage.toFixed(1)}%)
            </p>
            <Progress value={activeUserPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles & Permissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRoles}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalPermissions} total permissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentLogins}</div>
            <p className="text-xs text-muted-foreground">
              successful logins today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alerts.filter(a => !a.resolved).length}</div>
            <p className="text-xs text-muted-foreground">
              unresolved alerts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewDetails('activity')}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {getSeverityBadge(activity.severity)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Security Alerts</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewDetails('alerts')}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.filter(a => !a.resolved).slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {getSeverityBadge(alert.severity)}
                </div>
              ))}
              
              {alerts.filter(a => !a.resolved).length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No active security alerts
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>User Activity Rate</span>
                <span>{activeUserPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={activeUserPercentage} />
              <p className="text-xs text-gray-500">
                {stats.activeUsers} of {stats.totalUsers} users active
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Failed Login Rate</span>
                <span>{failedLoginRate.toFixed(1)}%</span>
              </div>
              <Progress value={failedLoginRate} />
              <p className="text-xs text-gray-500">
                {stats.failedLogins} failed attempts today
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Privileged Users</span>
                <span>{((stats.privilegedUsers / stats.totalUsers) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(stats.privilegedUsers / stats.totalUsers) * 100} />
              <p className="text-xs text-gray-500">
                {stats.privilegedUsers} users with elevated access
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}