import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Shield, Save, X } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
}

interface Role {
  id?: string;
  name: string;
  description: string;
  permissions: string[];
  isSystemRole?: boolean;
  userCount?: number;
}

interface RoleEditorProps {
  role?: Role;
  permissions: Permission[];
  onSave: (role: Role) => void;
  onCancel: () => void;
  readonly?: boolean;
}

export function RoleEditor({
  role,
  permissions,
  onSave,
  onCancel,
  readonly = false,
}: RoleEditorProps) {
  const [formData, setFormData] = React.useState<Role>({
    name: '',
    description: '',
    permissions: [],
    ...role,
  });

  const [selectedPermissions, setSelectedPermissions] = React.useState<Set<string>>(
    new Set(role?.permissions || [])
  );

  const permissionCategories = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      permissions: Array.from(selectedPermissions),
    });
  };

  const togglePermission = (permissionId: string) => {
    if (readonly) return;

    const newSelected = new Set(selectedPermissions);
    if (newSelected.has(permissionId)) {
      newSelected.delete(permissionId);
    } else {
      newSelected.add(permissionId);
    }
    setSelectedPermissions(newSelected);
  };

  const toggleCategory = (categoryPermissions: Permission[]) => {
    if (readonly) return;

    const categoryIds = categoryPermissions.map(p => p.id);
    const allSelected = categoryIds.every(id => selectedPermissions.has(id));

    const newSelected = new Set(selectedPermissions);
    if (allSelected) {
      categoryIds.forEach(id => newSelected.delete(id));
    } else {
      categoryIds.forEach(id => newSelected.add(id));
    }
    setSelectedPermissions(newSelected);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {role?.id ? 'Edit Role' : 'Create New Role'}
          {formData.isSystemRole && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              System Role
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter role name"
                required
                readOnly={readonly || formData.isSystemRole}
              />
            </div>

            {formData.userCount !== undefined && (
              <div className="space-y-2">
                <Label>Users with this role</Label>
                <div className="p-2 bg-gray-50 rounded border">
                  {formData.userCount} users assigned
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this role can do..."
              rows={3}
              readOnly={readonly || formData.isSystemRole}
            />
          </div>

          <Separator />

          {/* Permissions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Permissions</h3>
              <Badge variant="outline">
                {selectedPermissions.size} of {permissions.length} selected
              </Badge>
            </div>

            {Object.entries(permissionCategories).map(
              ([category, categoryPermissions]: [string, any]) => {
                const categoryIds = categoryPermissions.map((p: any) => p.id);
                const selectedCount = categoryIds.filter((id: string) =>
                  selectedPermissions.has(id)
                ).length;
                const allSelected = selectedCount === categoryIds.length;
                const someSelected = selectedCount > 0 && selectedCount < categoryIds.length;

                return (
                  <div key={category} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={() => toggleCategory(categoryPermissions)}
                          disabled={readonly}
                        />
                        <h4 className="font-medium">{category}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {selectedCount}/{categoryIds.length}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                      {categoryPermissions.map((permission: any) => (
                        <div key={permission.id} className="flex items-start gap-2">
                          <Checkbox
                            checked={selectedPermissions.has(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                            disabled={readonly}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{permission.name}</div>
                            <div className="text-xs text-gray-500">{permission.description}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {permission.resource}:{permission.action}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {!readonly && !formData.isSystemRole && (
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="bg-[#5DADE2] hover:bg-[#4A9BD1]">
                <Save className="h-4 w-4 mr-2" />
                {role?.id ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
