
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { 
  Settings, User, Shield, FileText, Phone, 
  LogOut, MapPin, Image, Info, Bell, Ambulance 
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Active Citizen",
    email: "citizen@example.com",
    phone: "+91 9876543210",
    location: "New Delhi, India",
    profileImage: ""
  });

  // Mock complaints data
  const complaints = [
    { id: 1, title: "Broken Street Light", status: "In Progress", date: "2023-05-15" },
    { id: 2, title: "Garbage Collection Issue", status: "Resolved", date: "2023-05-10" },
    { id: 3, title: "Water Leakage", status: "Pending", date: "2023-05-18" },
  ];

  const handleLogout = () => {
    // Implement logout functionality
    navigate("/login");
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Implement profile update functionality
    alert("Profile updated successfully!");
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // Implement theme change functionality
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({...userData, profileImage: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen pb-24 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-gray-100 to-gray-300"}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={userData.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219983.png"} />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
              <Image className="w-4 h-4 text-white" />
              <input 
                id="profile-image" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </label>
          </div>
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
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
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="location" 
                        value={userData.location}
                        onChange={(e) => setUserData({...userData, location: e.target.value})}
                      />
                      <Button type="button" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="complaints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                {complaints.length > 0 ? (
                  <div className="space-y-4">
                    {complaints.map(complaint => (
                      <Card key={complaint.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{complaint.title}</h3>
                            <p className="text-sm text-gray-500">Date: {complaint.date}</p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs ${
                            complaint.status === "Resolved" 
                              ? "bg-green-100 text-green-800" 
                              : complaint.status === "In Progress" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {complaint.status}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-6 text-gray-500">No complaints filed yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">App Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Dark Theme</h3>
                    <p className="text-sm text-gray-500">Enable dark mode for app interface</p>
                  </div>
                  <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-gray-500">Enable push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current Password" />
                    <Input type="password" placeholder="New Password" />
                    <Input type="password" placeholder="Confirm New Password" />
                    <Button>Update Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-red-500" />
                    <div>
                      <h3 className="font-medium">Police</h3>
                      <p className="text-sm text-gray-500">Emergency: 100</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Call</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Ambulance className="h-5 w-5 mr-3 text-red-500" />
                    <div>
                      <h3 className="font-medium">Ambulance</h3>
                      <p className="text-sm text-gray-500">Emergency: 108</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Call</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <h3 className="font-medium">Fire Department</h3>
                      <p className="text-sm text-gray-500">Emergency: 101</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Call</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  MITS_Swachhata App is dedicated to improving sanitation and cleanliness across India. 
                  This platform allows citizens to actively participate in the Swachh Bharat Mission by 
                  reporting issues, rating public facilities, and accessing sanitation resources.
                </p>
                <h3 className="font-medium mb-2">Terms and Conditions</h3>
                <p className="text-sm text-gray-600">
                  By using this application, you agree to our terms and conditions regarding data usage, 
                  privacy policies, and user responsibilities. For more information, please visit our website.
                </p>
                <Button variant="link" className="px-0">Read Full Terms</Button>
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
