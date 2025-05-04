
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
import { Camera, CameraOff, Upload } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { pipeline } from "@huggingface/transformers";

type ImageAnalysisItem = {
  text?: string;
  generated_text?: string;
  [key: string]: any;
};

type ImageAnalysisResult = ImageAnalysisItem | ImageAnalysisItem[] | any;

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const categoryKeywords = {
    "sanitation": ["garbage", "trash", "waste", "dirty", "litter", "dump", "sewage", "debris", "pollution", "rubbish"],
    "water": ["water", "flood", "pipe", "leak", "drainage", "sewage", "drinking", "tap", "plumbing", "puddle", "wet"],
    "road": ["road", "street", "pothole", "traffic", "sidewalk", "pavement", "crack", "highway", "path", "asphalt"],
    "electricity": ["electricity", "power", "light", "outage", "pole", "wire", "bulb", "electric", "lamp", "current"],
    "other": ["building", "park", "wall", "structure", "tree", "bench", "house", "shop", "construction"]
  };

  const startCamera = async () => {
    try {
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
      streamRef.current = stream;
      setCameraDialogOpen(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          console.log("Setting video source");
          videoRef.current.srcObject = stream;
          
          videoRef.current.play().then(() => {
            console.log("Video playback started");
            setIsCameraActive(true);
          }).catch((playError) => {
            console.error("Error playing video:", playError);
            setCameraError(`Unable to play video: ${playError.message}`);
          });
        } else {
          console.error("Video reference is still null after timeout");
          throw new Error("Video element not found after dialog opened");
        }
      }, 300);
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
    setCameraDialogOpen(false);
  };

  const analyzeImage = async (imageUrl: string) => {
    try {
      setIsAnalyzing(true);
      toast({
        title: "Analyzing Image",
        description: "Please wait while we analyze your image...",
      });
      
      console.log("Starting image analysis...");
      
      const imageToText = await pipeline("image-to-text", "nlpconnect/vit-gpt2-image-captioning");
      
      const base64Data = imageUrl.split(',')[1];
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
      
      const result: ImageAnalysisResult = await imageToText(blob);
      console.log("Image Analysis result:", result);
      
      let extractedText = "";
      
      if (Array.isArray(result)) {
        for (const item of result) {
          if (typeof item === 'object' && item !== null) {
            if (item && typeof item === 'object') {
              if ('text' in item && typeof item.text === 'string') {
                extractedText = item.text;
                break;
              }
              if ('generated_text' in item && typeof item.generated_text === 'string') {
                extractedText = item.generated_text;
                break;
              }
            }
          }
        }
      } else if (result && typeof result === 'object') {
        if ('text' in result && typeof result.text === 'string') {
          extractedText = result.text;
        } else if ('generated_text' in result && typeof result.generated_text === 'string') {
          extractedText = result.generated_text;
        }
      }
      
      if (extractedText) {
        console.log("Generated description:", extractedText);
        
        // Enhanced description
        const enhancedDescription = enhanceDescription(extractedText);
        setDescription(enhancedDescription);
        
        // Smart title extraction
        const titleText = generateSmartTitle(extractedText);
        setTitle(titleText);
        
        // Category detection with confidence boost
        const detectedCategory = detectCategory(extractedText);
        if (detectedCategory) {
          setCategory(detectedCategory);
        }
        
        toast({
          title: "Image Analysis Complete",
          description: "Form fields have been automatically filled based on the image.",
        });
      } else {
        throw new Error("Could not extract description from image analysis result");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze the image. Please fill in the details manually.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceDescription = (text: string): string => {
    // Enhance the description with more details about civic issues
    if (text.length < 30) {
      // For very short descriptions, add more context
      return `Civic issue identified: ${text}. This needs attention from municipal authorities.`;
    }
    
    if (!text.endsWith('.')) {
      text = text + '.';
    }
    
    return text;
  };

  const generateSmartTitle = (text: string): string => {
    // Generate a concise title from the description
    // First try to find a complete sentence that's short enough
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length > 0) {
      let bestSentence = sentences[0].trim();
      
      // Try to find a sentence between 15 and 50 chars
      const idealSentence = sentences.find(s => {
        const trimmed = s.trim();
        return trimmed.length >= 15 && trimmed.length <= 50;
      });
      
      if (idealSentence) {
        bestSentence = idealSentence.trim();
      }
      
      // If the best sentence is too long, truncate it
      if (bestSentence.length > 50) {
        bestSentence = bestSentence.substring(0, 47) + '...';
      }
      
      return bestSentence.charAt(0).toUpperCase() + bestSentence.slice(1);
    }
    
    // Fallback to taking the first 50 chars
    return text.length > 50 ? text.substring(0, 47) + '...' : text;
  };

  const detectCategory = (text: string): string => {
    const lowerText = text.toLowerCase();
    let bestCategory = "";
    let highestScore = 0;
    
    // Calculate a score for each category
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      let score = 0;
      
      keywords.forEach(keyword => {
        // Check if keyword appears in the text
        if (lowerText.includes(keyword)) {
          // Give more weight to full word matches than partial matches
          const regex = new RegExp(`\\b${keyword}\\b`, 'i');
          if (regex.test(lowerText)) {
            score += 2;  // Full word match
          } else {
            score += 1;  // Partial match
          }
        }
      });
      
      if (score > highestScore) {
        highestScore = score;
        bestCategory = cat;
      }
    }
    
    // If no good matches, default to "other"
    return highestScore > 0 ? bestCategory : "other";
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
        const photoUrl = canvas.toDataURL('image/jpeg', 0.8);
        console.log("Photo captured successfully");
        
        setImage(photoUrl);
        
        analyzeImage(photoUrl);
        
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageDataUrl = event.target?.result as string;
      setImage(imageDataUrl);
      analyzeImage(imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
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

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
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

      const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      
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
              <div className="flex flex-col items-center gap-4 w-full">
                {cameraError && (
                  <p className="text-red-500 text-sm">{cameraError}</p>
                )}
                
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button 
                    type="button" 
                    onClick={startCamera} 
                    className="w-full flex items-center justify-center"
                    disabled={isCameraActive}
                  >
                    <Camera className="mr-2" />
                    Camera
                  </Button>
                  
                  <div className="relative w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      id="file-upload"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Button 
                      type="button" 
                      className="w-full flex items-center justify-center"
                      disabled={isAnalyzing}
                    >
                      <Upload className="mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
                
                {isAnalyzing && (
                  <div className="py-3 w-full flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}
                
                {image && (
                  <div className="relative w-full">
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

      <Dialog open={cameraDialogOpen} onOpenChange={(open) => {
        if (!open) stopCamera();
        setCameraDialogOpen(open);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Camera</DialogTitle>
            <DialogDescription>
              Take a photo of the issue. The details will be automatically filled.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-64 object-cover rounded-lg border bg-black"
            />
            <div className="flex justify-center gap-2 mt-2 w-full">
              <Button type="button" onClick={capturePhoto} className="flex-1">
                <Camera className="mr-2" />
                Capture
              </Button>
              <Button type="button" variant="outline" onClick={stopCamera} className="flex-1">
                <CameraOff className="mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNav />
    </div>
  );
};

export default PostPage;
