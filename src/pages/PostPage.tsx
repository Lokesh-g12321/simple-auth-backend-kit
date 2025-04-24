
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNav from "@/components/BottomNav";
import { Camera, MapPin, Upload } from "lucide-react";

const PostPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("Current Location");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
    anonymous: false
  });

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleLocationDetect = () => {
    // Simulate location detection
    setTimeout(() => {
      setLocation("Sector 32, New Delhi");
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    alert("Complaint submitted successfully!");
    navigate("/complaints");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Post a Complaint</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Complaint Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Complaint Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Enter a brief title for your complaint" 
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, category: value})}
                  value={formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                    <SelectItem value="garbage">Garbage Collection</SelectItem>
                    <SelectItem value="water">Water Supply</SelectItem>
                    <SelectItem value="streetlight">Street Light</SelectItem>
                    <SelectItem value="road">Road Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Provide detailed information about the issue" 
                  rows={4} 
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup 
                  defaultValue={formData.urgency} 
                  onValueChange={(value) => setFormData({...formData, urgency: value})}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    value={location} 
                    readOnly 
                    className="flex-grow"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={handleLocationDetect}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Add Photos (Optional)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative w-16 h-16 border rounded overflow-hidden">
                      <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <label className="flex items-center justify-center w-16 h-16 border border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <Camera className="h-6 w-6 text-gray-400" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">Up to 3 images, max 5MB each</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="anonymous" 
                  checked={formData.anonymous}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, anonymous: checked as boolean})
                  }
                />
                <Label htmlFor="anonymous" className="text-sm">Submit complaint anonymously</Label>
              </div>
              
              <Button type="submit" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Submit Complaint
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default PostPage;
