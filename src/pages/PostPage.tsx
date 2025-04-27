
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Camera, CameraOff } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Keywords for automatic categorization based on complaint description
  const categoryKeywords = {
    "sanitation": ["garbage", "trash", "waste", "dirty", "litter", "dump", "sewage"],
    "water": ["water", "flood", "pipe", "leak", "drainage", "sewage", "drinking"],
    "road": ["road", "street", "pothole", "traffic", "sidewalk", "pavement", "crack"],
    "electricity": ["electricity", "power", "light", "outage", "pole", "wire", "bulb"],
  };

  const startCamera = async () => {
    try {
      // Clear any previous errors
      setCameraError(null);
      
      console.log("Starting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      console.log("Camera stream obtained:", stream);
      if (videoRef.current) {
        console.log("Setting video source");
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Ensure the video starts playing
        try {
          await videoRef.current.play();
          console.log("Video playback started");
        } catch (playError) {
          console.error("Error playing video:", playError);
          throw playError;
        }
      } else {
        console.error("Video reference is null");
        throw new Error("Video element not found");
      }
      
      setIsCameraActive(true);
    } catch (error) {
      console.error("Camera access error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setCameraError(`Unable to access camera: ${errorMessage}`);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please make sure you've granted permission.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera...");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log("Stopping track:", track.kind);
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    console.log("Capturing photo...");
    if (videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        console.log("Canvas dimensions:", canvas.width, "x", canvas.height);
        
        const context = canvas.getContext('2d');
        if (!context) {
          console.error("Could not get canvas context");
          return;
        }
        
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photoUrl = canvas.toDataURL('image/jpeg');
        console.log("Photo captured successfully");
        
        setImage(photoUrl);
        stopCamera();
      } catch (error) {
        console.error("Error capturing photo:", error);
        toast({
          title: "Capture Error",
          description: "Failed to capture photo.",
          variant: "destructive",
        });
      }
    } else {
      console.error("Video element not found for photo capture");
    }
  };

  // Auto-detect category based on description text
  const detectCategory = (text: string) => {
    const lowerText = text.toLowerCase();
    
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return cat;
      }
    }
    
    return "";
  };

  // Detect location using browser's geolocation
  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Using OpenStreetMap's Nominatim for reverse geocoding
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data && data.address) {
            const address = data.address;
            const locationString = [
              address.road,
              address.suburb,
              address.village || address.town || address.city,
              address.state,
              address.postcode,
              "India"
            ].filter(Boolean).join(", ");
            
            setLocation(locationString);
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
        }
      }, error => {
        console.error('Error getting location:', error);
        toast({
          title: "Location Error",
          description: "Unable to fetch your current location.",
          variant: "destructive",
        });
      });
    }
  };

  // Effect for auto-categorization when description changes
  useEffect(() => {
    if (description && !category) {
      const detectedCategory = detectCategory(description);
      if (detectedCategory) {
        setCategory(detectedCategory);
      }
    }
  }, [description]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process the complaint data
      const complaintData = {
        id: Date.now().toString(),
        title,
        description,
        category,
        location,
        image,
        status: "Pending",
        date: new Date().toISOString(),
      };

      // Get existing complaints or initialize an empty array
      const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      
      // Add new complaint and save back to localStorage
      existingComplaints.push(complaintData);
      localStorage.setItem('complaints', JSON.stringify(existingComplaints));
      
      toast({
        title: "Complaint submitted successfully",
        description: "Your complaint has been received and will be processed soon.",
      });
      
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setImage(null);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6 relative">
        <BackButton />
        <h1 className="text-2xl font-bold mb-6 text-center">Post a Complaint</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief title of your complaint"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="category">
              Category
            </label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sanitation">Sanitation</SelectItem>
                <SelectItem value="water">Water Supply</SelectItem>
                <SelectItem value="road">Road Issue</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="location">
              Location
            </label>
            <div className="flex gap-2">
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where is this issue located?"
                required
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={fetchLocation}
                className="whitespace-nowrap"
              >
                Use Current
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="description">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about your complaint"
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Take Photo
            </label>
            <div className="flex flex-col items-center gap-4">
              {isCameraActive ? (
                <div className="w-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover rounded-lg border bg-black"
                    style={{ maxWidth: "100%" }}
                  />
                  {cameraError && (
                    <p className="text-red-500 text-sm mt-1">{cameraError}</p>
                  )}
                  <div className="flex justify-center gap-2 mt-2">
                    <Button type="button" onClick={capturePhoto}>
                      <Camera className="mr-2" />
                      Capture Photo
                    </Button>
                    <Button type="button" variant="outline" onClick={stopCamera}>
                      <CameraOff className="mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 w-full">
                  {cameraError && (
                    <p className="text-red-500 text-sm">{cameraError}</p>
                  )}
                  <Button 
                    type="button" 
                    onClick={startCamera} 
                    className="w-full md:w-auto"
                    disabled={isCameraActive}
                  >
                    <Camera className="mr-2" />
                    Open Camera
                  </Button>
                  
                  {image && (
                    <div className="relative">
                      <img
                        src={image}
                        alt="Captured"
                        className="h-48 w-full object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setImage(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </div>
      <BottomNav />
    </div>
  );
};

export default PostPage;
