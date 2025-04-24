
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { Search } from "lucide-react";

const ComplaintsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock complaints data
  const allComplaints = [
    { id: 1, title: "Broken Street Light", status: "In Progress", date: "2023-05-15", area: "Sector 32" },
    { id: 2, title: "Garbage Collection Issue", status: "Resolved", date: "2023-05-10", area: "Sector 45" },
    { id: 3, title: "Water Leakage", status: "Pending", date: "2023-05-18", area: "Sector 21" },
    { id: 4, title: "Road Pothole", status: "In Progress", date: "2023-05-20", area: "Sector 17" },
    { id: 5, title: "Public Toilet Maintenance", status: "Resolved", date: "2023-05-12", area: "Sector 29" },
  ];

  const filteredComplaints = allComplaints.filter(complaint => 
    complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingComplaints = filteredComplaints.filter(c => c.status === "Pending");
  const inProgressComplaints = filteredComplaints.filter(c => c.status === "In Progress");
  const resolvedComplaints = filteredComplaints.filter(c => c.status === "Resolved");

  const renderComplaintsList = (complaints) => {
    if (complaints.length === 0) {
      return <p className="text-center py-6 text-gray-500">No complaints found</p>;
    }

    return (
      <div className="space-y-4">
        {complaints.map(complaint => (
          <Card key={complaint.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{complaint.title}</h3>
                  <p className="text-sm text-gray-500">Area: {complaint.area}</p>
                  <p className="text-sm text-gray-500">Date: {complaint.date}</p>
                </div>
                <Badge className={
                  complaint.status === "Resolved" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : complaint.status === "In Progress" 
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }>
                  {complaint.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Complaints</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by title or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {renderComplaintsList(filteredComplaints)}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            {renderComplaintsList(pendingComplaints)}
          </TabsContent>
          
          <TabsContent value="inProgress" className="mt-4">
            {renderComplaintsList(inProgressComplaints)}
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            {renderComplaintsList(resolvedComplaints)}
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
};

export default ComplaintsPage;
