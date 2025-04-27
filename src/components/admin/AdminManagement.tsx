
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Shield, ShieldCheck, Search, Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminPermissionsDialog from "./AdminPermissionsDialog";

const AdminManagement: React.FC = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockAdmins = [
      { id: "admin1", name: "Sarah Davis", email: "sarah@example.com", role: "super-admin", location: "Sector 17", permissions: ["complaints", "events", "users", "admins"] },
      { id: "admin2", name: "Robert Johnson", email: "robert@example.com", role: "admin", location: "Sector 24", permissions: ["complaints", "events"] },
      { id: "admin3", name: "Lisa Wilson", email: "lisa@example.com", role: "admin", location: "Sector 38", permissions: ["complaints", "users"] },
    ];
    setAdmins(mockAdmins);
  }, []);

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openPermissionsDialog = (admin: any) => {
    setSelectedAdmin(admin);
    setShowPermissionsDialog(true);
  };

  const handleCreateAdmin = () => {
    // Set an empty admin object to open the dialog in create mode
    setSelectedAdmin({
      id: "",
      name: "",
      email: "",
      role: "admin",
      location: "",
      permissions: []
    });
    setShowPermissionsDialog(true);
  };

  const handleSaveAdmin = (adminData: any) => {
    if (!adminData.id) {
      // Create new admin
      const newAdmin = {
        ...adminData,
        id: `admin${Date.now()}`,
      };
      setAdmins([...admins, newAdmin]);
      toast({
        title: "Admin Created",
        description: "New admin has been created successfully.",
      });
    } else {
      // Update existing admin
      setAdmins(admins.map(admin =>
        admin.id === adminData.id ? { ...adminData } : admin
      ));
      toast({
        title: "Admin Updated",
        description: "Admin permissions have been updated successfully.",
      });
    }
    setShowPermissionsDialog(false);
  };

  const handleRemoveAdmin = (id: string) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    toast({
      title: "Admin Removed",
      description: "Admin has been removed successfully.",
    });
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Administrators</h2>
        <div className="flex gap-2 items-center">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search admins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={handleCreateAdmin}>
            <ShieldCheck className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all administrators</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">No admins found</TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {admin.role === "super-admin" ? (
                        <ShieldCheck className="h-4 w-4 mr-1 text-emerald-600" />
                      ) : (
                        <Shield className="h-4 w-4 mr-1 text-blue-600" />
                      )}
                      {admin.name}
                    </div>
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant={admin.role === "super-admin" ? "default" : "secondary"}>
                      {admin.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{admin.location}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.map((perm: string) => (
                        <Badge key={perm} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openPermissionsDialog(admin)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={admin.role === "super-admin"}
                      onClick={() => handleRemoveAdmin(admin.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {showPermissionsDialog && selectedAdmin && (
        <AdminPermissionsDialog
          admin={selectedAdmin}
          open={showPermissionsDialog}
          onClose={() => setShowPermissionsDialog(false)}
          onSave={handleSaveAdmin}
          isCreateMode={!selectedAdmin.id}
        />
      )}
    </Card>
  );
};

export default AdminManagement;
