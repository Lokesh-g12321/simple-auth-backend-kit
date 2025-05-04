
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { Search } from "lucide-react";
import BackButton from "@/components/BackButton";

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
      <div className="space-y-3">
        {complaints.map((complaint, index) => (
          <Card key={complaint.id} 
                className="app-list-item active:bg-gray-50 transition-colors slide-up-animation" 
                style={{ animationDelay: `${index * 0.05}s` }}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h3 className="font-medium">{complaint.title}</h3>
                  <p className="text-sm text-gray-500">Area: {complaint.area}</p>
                  <p className="text-xs text-gray-500">Date: {complaint.date}</p>
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
    <div className="min-h-screen app-native-container">
      <div className="safe-area-top"></div>
      <div className="app-header px-4 py-3 bg-white/80">
        <div className="relative flex items-center">
          <BackButton />
          <h1 className="text-xl font-bold flex-1 text-center">Complaints</h1>
        </div>
      </div>
      
      <div className="app-content px-4 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by title or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inProgress">Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-2 page-transition">
            {renderComplaintsList(filteredComplaints)}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-2 page-transition">
            {renderComplaintsList(pendingComplaints)}
          </TabsContent>
          
          <TabsContent value="inProgress" className="mt-2 page-transition">
            {renderComplaintsList(inProgressComplaints)}
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-2 page-transition">
            {renderComplaintsList(resolvedComplaints)}
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
};

export default ComplaintsPage;
