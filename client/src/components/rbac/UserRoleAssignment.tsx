import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Search, User } from "lucide-react";
import { rbacService } from "@/services/shared";
import { useMutation } from "@tanstack/react-query";
import type { Role, InsertUserRole } from "@shared/schema";

const userRoleSchema = z.object({
  userId: z.number().min(1, "Please select a user"),
  roleId: z.number().min(1, "Please select a role"),
  expiresAt: z.string().optional(),
});

type UserRoleFormData = z.infer<typeof userRoleSchema>;

interface UserRoleAssignmentProps {
  roles: Role[];
  onSuccess: () => void;
  onCancel: () => void;
}

// Mock users for demonstration - in real app this would come from API
const mockUsers = [
  { id: 1, name: "John Smith", email: "john.smith@company.com", department: "Technical" },
  { id: 2, name: "Maria Garcia", email: "maria.garcia@company.com", department: "Marine" },
  { id: 3, name: "David Chen", email: "david.chen@company.com", department: "Crewing" },
  { id: 4, name: "Sarah Johnson", email: "sarah.johnson@company.com", department: "Admin" },
];

export const UserRoleAssignment: React.FC<UserRoleAssignmentProps> = ({
  roles,
  onSuccess,
  onCancel
}) => {
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const form = useForm<UserRoleFormData>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      userId: 0,
      roleId: 0,
      expiresAt: "",
    }
  });

  const assignMutation = useMutation({
    mutationFn: (data: InsertUserRole) => rbacService.assignUserRole(data),
    onSuccess,
  });

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.department.toLowerCase().includes(userSearch.toLowerCase())
  );

  const onSubmit = (data: UserRoleFormData) => {
    const userRoleData: InsertUserRole = {
      userId: data.userId,
      roleId: data.roleId,
      assignedBy: 1, // This should be the current user's ID
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      isActive: true,
    };

    assignMutation.mutate(userRoleData);
  };

  const handleUserSelect = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    form.setValue("userId", user.id);
    setUserSearch("");
  };

  const isSubmitting = assignMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* User Selection */}
        <div className="space-y-2">
          <FormLabel>Select User</FormLabel>
          
          {selectedUser ? (
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
              <User className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">{selectedUser.name}</div>
                <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
              </div>
              <Badge variant="outline">{selectedUser.department}</Badge>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedUser(null);
                  form.setValue("userId", 0);
                }}
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or department..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {userSearch && (
                <div className="border rounded-lg max-h-48 overflow-y-auto">
                  {filteredUsers.length === 0 ? (
                    <div className="p-3 text-center text-muted-foreground">
                      No users found
                    </div>
                  ) : (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleUserSelect(user)}
                      >
                        <User className="h-4 w-4" />
                        <div className="flex-1">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <Badge variant="outline">{user.department}</Badge>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
          
          {form.formState.errors.userId && (
            <p className="text-sm text-destructive">
              {form.formState.errors.userId.message}
            </p>
          )}
        </div>

        {/* Role Selection */}
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Role</FormLabel>
              <Select onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a role to assign" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.filter(role => role.isActive).map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      <div className="flex items-center gap-2">
                        <span>{role.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {role.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {role.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiration Date (Optional) */}
        <FormField
          control={form.control}
          name="expiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Date (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="datetime-local" 
                  {...field}
                  placeholder="Leave empty for permanent assignment"
                />
              </FormControl>
              <div className="text-sm text-muted-foreground">
                Leave empty for permanent role assignment
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !selectedUser}>
            {isSubmitting ? "Assigning..." : "Assign Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
};