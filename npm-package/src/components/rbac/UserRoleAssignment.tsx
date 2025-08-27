import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UserCheck, Search, Save, X } from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  currentRoles: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isSystemRole?: boolean;
}

interface UserRoleAssignmentProps {
  user: User;
  availableRoles: Role[];
  onUpdateUserRoles: (userId: string, roles: string[]) => void;
  onCancel: () => void;
  readonly?: boolean;
}

export function UserRoleAssignment({ 
  user, 
  availableRoles, 
  onUpdateUserRoles, 
  onCancel,
  readonly = false 
}: UserRoleAssignmentProps) {
  const [selectedRoles, setSelectedRoles] = React.useState<Set<string>>(
    new Set(user.currentRoles)
  );
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredRoles = availableRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserRoles(user.id, Array.from(selectedRoles));
  };

  const toggleRole = (roleId: string) => {
    if (readonly) return;
    
    const newSelected = new Set(selectedRoles);
    if (newSelected.has(roleId)) {
      newSelected.delete(roleId);
    } else {
      newSelected.add(roleId);
    }
    setSelectedRoles(newSelected);
  };

  const getRoleChanges = () => {
    const current = new Set(user.currentRoles);
    const selected = selectedRoles;
    
    const added = Array.from(selected).filter(role => !current.has(role));
    const removed = Array.from(current).filter(role => !selected.has(role));
    
    return { added, removed };
  };

  const { added, removed } = getRoleChanges();
  const hasChanges = added.length > 0 || removed.length > 0;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Role Assignment
        </CardTitle>
        <div className="text-sm text-gray-600">
          <div className="font-medium">{user.firstName} {user.lastName}</div>
          <div>@{user.username} • {user.email}</div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Current Roles */}
          <div>
            <h3 className="font-medium mb-2">Current Roles</h3>
            <div className="flex flex-wrap gap-2">
              {user.currentRoles.length > 0 ? (
                user.currentRoles.map(roleId => {
                  const role = availableRoles.find(r => r.id === roleId);
                  return role ? (
                    <Badge key={roleId} variant="outline">
                      {role.name}
                    </Badge>
                  ) : null;
                })
              ) : (
                <p className="text-sm text-gray-500">No roles assigned</p>
              )}
            </div>
          </div>

          {/* Available Roles */}
          <div>
            <h3 className="font-medium mb-3">Available Roles</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {filteredRoles.map((role) => (
                <div key={role.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={selectedRoles.has(role.id)}
                    onCheckedChange={() => toggleRole(role.id)}
                    disabled={readonly || role.isSystemRole}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{role.name}</h4>
                      {role.isSystemRole && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                          System
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{role.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {role.userCount} users have this role
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Changes Summary */}
          {hasChanges && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Pending Changes</h4>
              {added.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm text-green-700 font-medium">Adding: </span>
                  {added.map(roleId => {
                    const role = availableRoles.find(r => r.id === roleId);
                    return role?.name;
                  }).join(', ')}
                </div>
              )}
              {removed.length > 0 && (
                <div>
                  <span className="text-sm text-red-700 font-medium">Removing: </span>
                  {removed.map(roleId => {
                    const role = availableRoles.find(r => r.id === roleId);
                    return role?.name;
                  }).join(', ')}
                </div>
              )}
            </div>
          )}

          {!readonly && (
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#5DADE2] hover:bg-[#4A9BD1]"
                disabled={!hasChanges}
              >
                <Save className="h-4 w-4 mr-2" />
                Update Roles
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}