import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { 
  ChevronRight, 
  Phone, 
  Shield, 
  LogOut, 
  MapPin, 
  FileText, 
  Upload,
  Settings,
  User,
  Bell,
  Moon
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Active Citizen",
    email: "user@example.com",
    phone: "+91 9876543210",
    location: "Sector 32, Chandigarh"
  });

  // Mock complaints data
  const userComplaints = [
    { id: 1, title: "Broken Street Light", status: "In Progress", date: "2023-05-15" },
    { id: 2, title: "Garbage Collection Issue", status: "Resolved", date: "2023-05-10" },
    { id: 3, title: "Water Leakage", status: "Pending", date: "2023-05-18" }
  ];

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setAvatar(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6 relative">
        <BackButton />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                {avatar ? (
                  <AvatarImage src={avatar} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-blue-500 text-white text-xl">
                    {userData.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                <Upload size={14} className="text-white" />
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange} 
                />
              </label>
            </div>
            <div>
              <h2 className="font-bold text-lg">{userData.name}</h2>
              <p className="text-gray-500 text-sm">{userData.email}</p>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <MapPin size={14} /> {userData.location}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="settings" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="complaints">My Complaints</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">Account Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    value={userData.location}
                    onChange={(e) => setUserData({...userData, location: e.target.value})}
                  />
                </div>
                
                <Button className="w-full mt-2">Save Changes</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="divide-y">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Moon size={18} />
                    <span>Dark Mode</span>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode} 
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Bell size={18} />
                    <span>Notifications</span>
                  </div>
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="divide-y">
                <div className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span>Emergency Contacts</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>About Us</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText size={18} />
                    <span>Terms & Conditions</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Shield size={18} />
                    <span>Privacy Policy</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
                
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-2">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="complaints" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {userComplaints.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    You haven't filed any complaints yet
                  </div>
                ) : (
                  <div className="divide-y">
                    {userComplaints.map(complaint => (
                      <div key={complaint.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{complaint.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            complaint.status === "Resolved" 
                              ? "bg-green-100 text-green-800" 
                              : complaint.status === "In Progress" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {complaint.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Filed on: {complaint.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
