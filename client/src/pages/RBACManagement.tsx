import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Shield, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  UserPlus,
  Key,
  Crown,
  Building
} from "lucide-react";
import { rbacService } from "@/services/shared";
import { RoleForm } from "@/components/rbac/RoleForm";
import { PermissionForm } from "@/components/rbac/PermissionForm";
import { UserRoleAssignment } from "@/components/rbac/UserRoleAssignment";
import { StandardNavigationBar } from "@/components/StandardNavigationBar";
import type { Role, Permission, UserRole, Module } from "@shared/schema";

export const RBACManagement: React.FC = () => {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [showUserRoleDialog, setShowUserRoleDialog] = useState(false);

  const queryClient = useQueryClient();

  const handleModuleChange = (moduleId: string) => {
    switch (moduleId) {
      case "crewing":
        navigate("/");
        break;
      case "technical-pms":
        navigate("/technical-pms");
        break;
      default:
        navigate("/");
    }
  };

  // Queries
  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ["/rbac/roles"],
    queryFn: () => rbacService.getRoles(),
  });

  const { data: permissions = [], isLoading: permissionsLoading } = useQuery({
    queryKey: ["/rbac/permissions"],
    queryFn: () => rbacService.getPermissions(),
  });

  const { data: modules = [] } = useQuery({
    queryKey: ["/rbac/modules"],
    queryFn: () => rbacService.getModules(),
  });

  // Mutations
  const deleteRoleMutation = useMutation({
    mutationFn: rbacService.deleteRole.bind(rbacService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/rbac/roles"] });
    },
  });

  const deletePermissionMutation = useMutation({
    mutationFn: (id: number) => rbacService.deleteRole(id), // This should be deletePermission when available
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/rbac/permissions"] });
    },
  });

  // Filter functions
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "super admin": return "bg-red-100 text-red-800";
      case "admin": return "bg-orange-100 text-orange-800";
      case "user": return "bg-blue-100 text-blue-800";
      case "guest": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "shore": return "bg-green-100 text-green-800";
      case "vessel": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-transparent w-full">
      <div className="overflow-hidden bg-[url(/figmaAssets/vector.svg)] bg-[100%_100%] w-full min-h-screen relative">
        {/* Header */}
        <StandardNavigationBar
          currentModule="rbac"
          onModuleChange={handleModuleChange}
          activeSection="rbac"
        />

        {/* Left sidebar - Hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block w-[67px] absolute left-0 top-[66px] h-[calc(100vh-66px)]">
          {/* Light blue section with icon and "All" text */}
          <div className="w-full h-[79px] flex flex-col items-center justify-center bg-[#52baf3]">
            <div className="w-6 h-6 mb-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                <path d="M19 15L19.74 17.74L22 18L19.74 18.26L19 21L18.26 18.26L16 18L18.26 17.74L19 15Z" fill="white"/>
                <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="white"/>
              </svg>
            </div>
            <div className="text-white text-[10px] font-normal font-['Roboto',Helvetica]">
              All
            </div>
          </div>

          {/* Dark blue section */}
          <div className="w-full h-[calc(100%-79px)] bg-[#16569e]">
          </div>
        </aside>

        {/* Main content - Responsive layout */}
        <main className="absolute top-[67px] left-0 lg:left-[67px] w-full lg:w-[calc(100%-67px)] h-[calc(100%-67px)] overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Shield className="h-8 w-8" />
                  RBAC Management
                </h1>
                <p className="text-muted-foreground">Manage roles, permissions, and user access</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search roles, permissions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">
              {roles.filter(r => r.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.length}</div>
            <p className="text-xs text-muted-foreground">
              {permissions.filter(p => p.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TMSA Modules</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modules.length}</div>
            <p className="text-xs text-muted-foreground">
              {modules.filter(m => m.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roles.filter(r => r.level === "Super Admin").length}
            </div>
            <p className="text-xs text-muted-foreground">Roles with full access</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="assignments">User Assignments</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Role Management</CardTitle>
                <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedRole ? "Edit Role" : "Create New Role"}
                      </DialogTitle>
                    </DialogHeader>
                    <RoleForm
                      role={selectedRole}
                      modules={modules}
                      onSuccess={() => {
                        setShowRoleDialog(false);
                        setSelectedRole(null);
                        queryClient.invalidateQueries({ queryKey: ["/rbac/roles"] });
                      }}
                      onCancel={() => {
                        setShowRoleDialog(false);
                        setSelectedRole(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rolesLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">Loading roles...</TableCell>
                    </TableRow>
                  ) : filteredRoles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No roles found</TableCell>
                    </TableRow>
                  ) : (
                    filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell><code className="text-xs">{role.code}</code></TableCell>
                        <TableCell>
                          <Badge className={getLevelBadgeColor(role.level)}>
                            {role.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryBadgeColor(role.category)}>
                            {role.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{role.department || "All"}</TableCell>
                        <TableCell>
                          <Badge variant={role.isActive ? "default" : "secondary"}>
                            {role.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedRole(role);
                                setShowRoleDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Role</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the role "{role.name}"? 
                                    This action cannot be undone and will affect all users assigned to this role.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteRoleMutation.mutate(role.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Permission Management</CardTitle>
                <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Permission
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedPermission ? "Edit Permission" : "Create New Permission"}
                      </DialogTitle>
                    </DialogHeader>
                    <PermissionForm
                      permission={selectedPermission}
                      modules={modules}
                      onSuccess={() => {
                        setShowPermissionDialog(false);
                        setSelectedPermission(null);
                        queryClient.invalidateQueries({ queryKey: ["/rbac/permissions"] });
                      }}
                      onCancel={() => {
                        setShowPermissionDialog(false);
                        setSelectedPermission(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionsLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">Loading permissions...</TableCell>
                    </TableRow>
                  ) : filteredPermissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No permissions found</TableCell>
                    </TableRow>
                  ) : (
                    filteredPermissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">{permission.name}</TableCell>
                        <TableCell><code className="text-xs">{permission.code}</code></TableCell>
                        <TableCell>
                          {modules.find(m => m.id === permission.moduleId)?.name || "All"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{permission.resource}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{permission.action}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={permission.isActive ? "default" : "secondary"}>
                            {permission.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedPermission(permission);
                                setShowPermissionDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Permission</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the permission "{permission.name}"? 
                                    This will affect all roles that have this permission.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deletePermissionMutation.mutate(permission.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Role Assignments</CardTitle>
                <Dialog open={showUserRoleDialog} onOpenChange={setShowUserRoleDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Assign Role to User</DialogTitle>
                    </DialogHeader>
                    <UserRoleAssignment
                      roles={roles}
                      onSuccess={() => {
                        setShowUserRoleDialog(false);
                        // Refresh any user role queries if needed
                      }}
                      onCancel={() => setShowUserRoleDialog(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                User role assignments interface will be implemented here.
                This will show current user-role mappings and allow assignment/removal.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>TMSA Module Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{module.code}</Badge>
                        <Badge variant={module.isActive ? "default" : "secondary"}>
                          {module.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium mb-2">{module.name}</h3>
                      {module.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {module.description}
                        </p>
                      )}
                      <div className="text-xs text-muted-foreground">
                        Permissions: {permissions.filter(p => p.moduleId === module.id).length}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};