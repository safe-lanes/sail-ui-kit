import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LayoutGrid, Search, Download, Filter } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface PermissionMatrixProps {
  roles: Role[];
  permissions: Permission[];
  onUpdateRolePermissions: (roleId: string, permissions: string[]) => void;
  readonly?: boolean;
  className?: string;
}

export function PermissionMatrix({ 
  roles, 
  permissions, 
  onUpdateRolePermissions, 
  readonly = false,
  className = '' 
}: PermissionMatrixProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all');
  const [roleFilter, setRoleFilter] = React.useState<string>('all');

  const categories = [...new Set(permissions.map(p => p.category))];

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = 
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.resource.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || permission.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const filteredRoles = roles.filter(role => {
    return roleFilter === 'all' || role.id === roleFilter;
  });

  const hasPermission = (roleId: string, permissionId: string): boolean => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions.includes(permissionId) || false;
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    if (readonly) return;
    
    const role = roles.find(r => r.id === roleId);
    if (!role) return;
    
    const newPermissions = role.permissions.includes(permissionId)
      ? role.permissions.filter(p => p !== permissionId)
      : [...role.permissions, permissionId];
    
    onUpdateRolePermissions(roleId, newPermissions);
  };

  const exportMatrix = () => {
    // Implementation for exporting the permission matrix
    console.log('Exporting permission matrix...');
  };

  const getPermissionCount = (roleId: string): number => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions.length || 0;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              Permission Matrix
            </div>
            <Button variant="outline" onClick={exportMatrix}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Permission Matrix Table */}
          <div className="border rounded-lg overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px] sticky left-0 bg-white">
                    Permission
                  </TableHead>
                  {filteredRoles.map((role) => (
                    <TableHead key={role.id} className="text-center min-w-[120px]">
                      <div className="space-y-1">
                        <div className="font-medium">{role.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {getPermissionCount(role.id)} perms
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {role.userCount} users
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="sticky left-0 bg-white">
                      <div>
                        <div className="font-medium">{permission.name}</div>
                        <div className="text-sm text-gray-500">
                          {permission.description}
                        </div>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {permission.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {permission.resource}:{permission.action}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    {filteredRoles.map((role) => (
                      <TableCell key={role.id} className="text-center">
                        <Checkbox
                          checked={hasPermission(role.id, permission.id)}
                          onCheckedChange={() => togglePermission(role.id, permission.id)}
                          disabled={readonly}
                          className="mx-auto"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPermissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No permissions found matching your criteria.
            </div>
          )}

          {/* Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Matrix Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Roles:</span>
                <span className="ml-2 font-medium">{roles.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Total Permissions:</span>
                <span className="ml-2 font-medium">{permissions.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Categories:</span>
                <span className="ml-2 font-medium">{categories.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Total Users:</span>
                <span className="ml-2 font-medium">
                  {roles.reduce((sum, role) => sum + role.userCount, 0)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}