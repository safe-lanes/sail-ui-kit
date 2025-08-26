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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Role, Module, InsertRole } from "@shared/schema";

const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  code: z.string().min(1, "Role code is required").regex(/^[A-Z_]+$/, "Code must be uppercase letters and underscores only"),
  description: z.string().optional(),
  level: z.enum(["Super Admin", "Admin", "User", "Guest"]),
  category: z.enum(["Shore", "Vessel"]),
  department: z.string().optional(),
  parentRoleId: z.number().optional(),
  isActive: z.boolean().default(true),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormProps {
  role?: Role | null;
  modules: Module[];
  onSuccess: () => void;
  onCancel: () => void;
}

export const RoleForm: React.FC<RoleFormProps> = ({
  role,
  modules,
  onSuccess,
  onCancel
}) => {
  const queryClient = useQueryClient();
  
  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || "",
      code: role?.code || "",
      description: role?.description || "",
      level: (role?.level as "Super Admin" | "Admin" | "User" | "Guest") || "User",
      category: (role?.category as "Shore" | "Vessel") || "Shore",
      department: role?.department || "",
      parentRoleId: role?.parentRoleId || undefined,
      isActive: role?.isActive ?? true,
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertRole) => rbacService.createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/rbac/roles"] });
      onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<InsertRole>) => rbacService.updateRole(role!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/rbac/roles"] });
      onSuccess();
    },
  });

  const onSubmit = (data: RoleFormData) => {
    const roleData: InsertRole = {
      name: data.name,
      code: data.code,
      description: data.description,
      level: data.level,
      category: data.category,
      department: data.department || null,
      parentRoleId: data.parentRoleId || null,
      isActive: data.isActive,
    };

    if (role) {
      updateMutation.mutate(roleData);
    } else {
      createMutation.mutate(roleData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Vessel Master" {...field} />
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
                <FormLabel>Role Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., VESSEL_MASTER" 
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
                  placeholder="Describe the role and its responsibilities..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Authorization Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select authorization level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Shore">Shore-based</SelectItem>
                    <SelectItem value="Vessel">Vessel-based</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Technical, Marine, Crewing"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Role</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Enable this role for assignment to users
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
            {isSubmitting ? "Saving..." : role ? "Update Role" : "Create Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
};