import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { rbacService } from "@/services/shared";
import { useMutation } from "@tanstack/react-query";
import type { Permission, Module, InsertPermission } from "@shared/schema";

const permissionSchema = z.object({
  name: z.string().min(1, "Permission name is required"),
  code: z.string().min(1, "Permission code is required").regex(/^[A-Z_]+$/, "Code must be uppercase letters and underscores only"),
  description: z.string().optional(),
  moduleId: z.number().optional(),
  resource: z.string().min(1, "Resource is required"),
  action: z.string().min(1, "Action is required"),
  isActive: z.boolean().default(true),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

interface PermissionFormProps {
  permission?: Permission | null;
  modules: Module[];
  onSuccess: () => void;
  onCancel: () => void;
}

const commonResources = [
  "users", "roles", "permissions", "modules",
  "vessels", "crew_members", "incidents", "inspections",
  "certificates", "documents", "reports", "forms",
  "appraisals", "training", "maintenance", "*"
];

const commonActions = [
  "create", "read", "update", "delete", "approve", 
  "export", "import", "archive", "restore", "*"
];

export const PermissionForm: React.FC<PermissionFormProps> = ({
  permission,
  modules,
  onSuccess,
  onCancel
}) => {
  const form = useForm<PermissionFormData>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      name: permission?.name || "",
      code: permission?.code || "",
      description: permission?.description || "",
      moduleId: permission?.moduleId || undefined,
      resource: permission?.resource || "",
      action: permission?.action || "",
      isActive: permission?.isActive ?? true,
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertPermission) => rbacService.createPermission(data),
    onSuccess,
  });

  // Note: Update permission mutation would need to be implemented in rbacService
  const updateMutation = useMutation({
    mutationFn: (data: Partial<InsertPermission>) => {
      // This would need to be implemented in rbacService
      throw new Error("Update permission not implemented yet");
    },
    onSuccess,
  });

  const onSubmit = (data: PermissionFormData) => {
    const permissionData: InsertPermission = {
      name: data.name,
      code: data.code,
      description: data.description,
      moduleId: data.moduleId || null,
      resource: data.resource,
      action: data.action,
      isActive: data.isActive,
    };

    if (permission) {
      updateMutation.mutate(permissionData);
    } else {
      createMutation.mutate(permissionData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Auto-generate code based on module, resource, and action
  const watchModuleId = form.watch("moduleId");
  const watchResource = form.watch("resource");
  const watchAction = form.watch("action");

  React.useEffect(() => {
    if (watchResource && watchAction && !permission) {
      const modulePrefix = watchModuleId ? 
        modules.find(m => m.id === watchModuleId)?.code || "" : "";
      const code = [modulePrefix, watchResource.toUpperCase(), watchAction.toUpperCase()]
        .filter(Boolean)
        .join("_");
      form.setValue("code", code);
    }
  }, [watchModuleId, watchResource, watchAction, modules, form, permission]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permission Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Edit Technical Incidents" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permission Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., EL4_INCIDENTS_EDIT" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what this permission allows..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="moduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TMSA Module (Optional)</FormLabel>
              <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} 
                      defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select module or leave empty for global" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">All Modules</SelectItem>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {module.code} - {module.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="resource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {commonResources.map((resource) => (
                      <SelectItem key={resource} value={resource}>
                        {resource}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {commonActions.map((action) => (
                      <SelectItem key={action} value={action}>
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Permission</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Enable this permission for use in roles
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : permission ? "Update Permission" : "Create Permission"}
          </Button>
        </div>
      </form>
    </Form>
  );
};