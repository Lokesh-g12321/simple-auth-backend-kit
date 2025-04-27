
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ComplaintDetailsDialog from "./ComplaintDetailsDialog";

const ComplaintManagement: React.FC = () => {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockComplaints = [
      { id: 1, title: "Broken Street Light", status: "In Progress", date: "2023-05-15", area: "Sector 32", userId: "user123", description: "The street light has been non-functional for a week" },
      { id: 2, title: "Garbage Collection Issue", status: "Resolved", date: "2023-05-10", area: "Sector 45", userId: "user456", description: "Garbage hasn't been collected for 3 days" },
      { id: 3, title: "Water Leakage", status: "Pending", date: "2023-05-18", area: "Sector 21", userId: "user789", description: "Major water leakage from the main pipe" },
      { id: 4, title: "Road Pothole", status: "In Progress", date: "2023-05-20", area: "Sector 17", userId: "user123", description: "Large pothole causing accidents" },
      { id: 5, title: "Public Toilet Maintenance", status: "Resolved", date: "2023-05-12", area: "Sector 29", userId: "user456", description: "Toilet needs cleaning and maintenance" },
    ];
    setComplaints(mockComplaints);
  }, []);

  const filteredComplaints = complaints.filter(complaint =>
    complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (id: number, newStatus: string) => {
    setComplaints(complaints.map(complaint =>
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    ));
    toast({
      title: "Status Updated",
      description: "Complaint status has been updated successfully.",
    });
  };

  const handleRemoveComplaint = (id: number) => {
    setComplaints(complaints.filter(complaint => complaint.id !== id));
    toast({
      title: "Complaint Removed",
      description: "Complaint has been removed successfully.",
    });
  };

  const openDetailsDialog = (complaint: any) => {
    setSelectedComplaint(complaint);
    setShowDetailsDialog(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'in progress':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'pending':
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Complaints</h2>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all reported complaints</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">No complaints found</TableCell>
              </TableRow>
            ) : (
              filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.title}</TableCell>
                  <TableCell>{complaint.area}</TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDetailsDialog(complaint)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveComplaint(complaint.id)}
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

      {showDetailsDialog && selectedComplaint && (
        <ComplaintDetailsDialog
          complaint={selectedComplaint}
          open={showDetailsDialog}
          onClose={() => setShowDetailsDialog(false)}
          onStatusChange={(status) => {
            handleStatusChange(selectedComplaint.id, status);
            setShowDetailsDialog(false);
          }}
        />
      )}
    </Card>
  );
};

export default ComplaintManagement;
