import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Shield, Save, X } from 'lucide-react';

interface Role {
  id?: string;
  name: string;
  description: string;
  isSystemRole?: boolean;
}

interface RoleFormProps {
  role?: Role;
  onSave: (role: Role) => void;
  onCancel: () => void;
  readonly?: boolean;
}

export function RoleForm({ role, onSave, onCancel, readonly = false }: RoleFormProps) {
  const [formData, setFormData] = React.useState<Role>({
    name: '',
    description: '',
    ...role,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field: keyof Role, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {role?.id ? 'Edit Role' : 'Create New Role'}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder="Enter role name"
              required
              readOnly={readonly || formData.isSystemRole}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => updateField('description', e.target.value)}
              placeholder="Describe what this role is for..."
              rows={4}
              readOnly={readonly || formData.isSystemRole}
            />
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
