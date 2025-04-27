
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";
import { 
  Users, FileText, Calendar, MessageSquare, 
  Shield, Edit, Trash2, CalendarPlus, Bell, Settings 
} from "lucide-react";
import UserManagement from "@/components/admin/UserManagement";
import ComplaintManagement from "@/components/admin/ComplaintManagement";
import EventManagement from "@/components/admin/EventManagement";
import FeedbackViewer from "@/components/admin/FeedbackViewer";
import AdminManagement from "@/components/admin/AdminManagement";

const AdminDashboardPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("complaints");

  // Check if user is admin - in a real app, this would come from authentication
  const isAdmin = true; // This would normally check from auth context

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/">Return to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              Admin Access
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <DashboardCard
            title="Users"
            value="124"
            description="Active accounts"
            icon={<Users className="h-5 w-5" />}
          />
          <DashboardCard
            title="Complaints"
            value="38"
            description="Open complaints"
            icon={<FileText className="h-5 w-5" />}
          />
          <DashboardCard
            title="Events"
            value="12"
            description="Upcoming events"
            icon={<Calendar className="h-5 w-5" />}
          />
          <DashboardCard
            title="Feedback"
            value="56"
            description="New feedback"
            icon={<MessageSquare className="h-5 w-5" />}
          />
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="complaints">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Complaints</span>
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="admins">
              <Shield className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Admins</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="complaints" className="space-y-4">
            <ComplaintManagement />
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <EventManagement />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <FeedbackViewer />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          <TabsContent value="admins" className="space-y-4">
            <AdminManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, description, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AdminDashboardPage;
