
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminPermissionsDialogProps {
  admin: any;
  open: boolean;
  onClose: () => void;
  onSave: (adminData: any) => void;
  isCreateMode: boolean;
}

const AdminPermissionsDialog: React.FC<AdminPermissionsDialogProps> = ({
  admin,
  open,
  onClose,
  onSave,
  isCreateMode,
}) => {
  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    role: "admin",
    location: "",
    permissions: [] as string[],
  });

  const permissionOptions = [
    { id: "complaints", label: "Manage Complaints" },
    { id: "events", label: "Manage Events" },
    { id: "users", label: "Manage Users" },
    { id: "admins", label: "Manage Admins" },
    { id: "feedback", label: "Access Feedback" },
  ];

  useEffect(() => {
    if (admin) {
      setAdminData({
        id: admin.id || "",
        name: admin.name || "",
        email: admin.email || "",
        role: admin.role || "admin",
        location: admin.location || "",
        permissions: admin.permissions || [],
      });
    }
  }, [admin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setAdminData({
        ...adminData,
        permissions: [...adminData.permissions, permissionId],
      });
    } else {
      setAdminData({
        ...adminData,
        permissions: adminData.permissions.filter(id => id !== permissionId),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isCreateMode ? "Add New Administrator" : "Edit Administrator Permissions"}
          </DialogTitle>
          <DialogDescription>
            {isCreateMode 
              ? "Create a new admin with specific permissions" 
              : "Update admin information and permissions"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isCreateMode && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name:
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={adminData.name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email:
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={adminData.email}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location:
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={adminData.location}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </>
          )}

          {!isCreateMode && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Admin:</Label>
              <div className="col-span-3">
                <p className="font-medium">{adminData.name}</p>
                <p className="text-sm text-gray-500">{adminData.email}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role:
            </Label>
            <Select 
              value={adminData.role} 
              onValueChange={(value) => setAdminData({ ...adminData, role: value })}
              disabled={!isCreateMode && adminData.role === "super-admin"}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super-admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Permissions:
            </Label>
            <div className="col-span-3 space-y-2">
              {permissionOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={adminData.permissions.includes(option.id)}
                    onCheckedChange={(checked) => {
                      handlePermissionChange(option.id, checked as boolean);
                    }}
                    disabled={adminData.role === "super-admin"}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">
                {adminData.role === "super-admin" && "Super admins automatically have all permissions."}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(adminData)}>
            {isCreateMode ? "Create Admin" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPermissionsDialog;
