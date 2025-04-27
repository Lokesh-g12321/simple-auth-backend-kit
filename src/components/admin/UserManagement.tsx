
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Search, Edit, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UserDetailsDialog from "./UserDetailsDialog";

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockUsers = [
      { id: "user123", name: "John Smith", email: "john@example.com", location: "Sector 32", role: "user", status: "active", registeredDate: "2023-03-15" },
      { id: "user456", name: "Emma Wilson", email: "emma@example.com", location: "Sector 45", role: "user", status: "inactive", registeredDate: "2023-04-10" },
      { id: "user789", name: "Michael Brown", email: "michael@example.com", location: "Sector 21", role: "user", status: "active", registeredDate: "2023-02-18" },
      { id: "admin1", name: "Sarah Davis", email: "sarah@example.com", location: "Sector 17", role: "admin", status: "active", registeredDate: "2023-01-05" },
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast({
      title: "User Status Updated",
      description: "User status has been updated successfully.",
    });
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Removed",
      description: "User has been removed successfully.",
    });
  };

  const openDetailsDialog = (user: any) => {
    setSelectedUser(user);
    setShowDetailsDialog(true);
  };

  const handleUpdateUser = (updatedUser: any) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? { ...updatedUser } : user
    ));
    toast({
      title: "User Updated",
      description: "User information has been updated successfully.",
    });
    setShowDetailsDialog(false);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">No users found</TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {user.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDetailsDialog(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUser(user.id)}
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

      {showDetailsDialog && selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          open={showDetailsDialog}
          onClose={() => setShowDetailsDialog(false)}
          onSave={handleUpdateUser}
        />
      )}
    </Card>
  );
};

export default UserManagement;
