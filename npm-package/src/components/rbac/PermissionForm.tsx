import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Key, Save, X } from 'lucide-react';

interface Permission {
  id?: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
}

interface PermissionFormProps {
  permission?: Permission;
  categories: string[];
  resources: string[];
  actions: string[];
  onSave: (permission: Permission) => void;
  onCancel: () => void;
  readonly?: boolean;
}

export function PermissionForm({ 
  permission, 
  categories,
  resources,
  actions,
  onSave, 
  onCancel, 
  readonly = false 
}: PermissionFormProps) {
  const [formData, setFormData] = React.useState<Permission>({
    name: '',
    description: '',
    category: '',
    resource: '',
    action: '',
    ...permission
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field: keyof Permission, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          {permission?.id ? 'Edit Permission' : 'Create New Permission'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Permission Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Enter permission name"
                required
                readOnly={readonly}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => updateField('category', value)}
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe what this permission allows..."
              rows={3}
              readOnly={readonly}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resource">Resource *</Label>
              <Select 
                value={formData.resource} 
                onValueChange={(value) => updateField('resource', value)}
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resource" />
                </SelectTrigger>
                <SelectContent>
                  {resources.map(resource => (
                    <SelectItem key={resource} value={resource}>{resource}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action">Action *</Label>
              <Select 
                value={formData.action} 
                onValueChange={(value) => updateField('action', value)}
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!readonly && (
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="bg-[#5DADE2] hover:bg-[#4A9BD1]">
                <Save className="h-4 w-4 mr-2" />
                {permission?.id ? 'Update Permission' : 'Create Permission'}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}