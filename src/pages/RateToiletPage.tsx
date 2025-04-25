
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const RateToiletPage = () => {
  const { toast } = useToast();
  const [cleanlinessRating, setCleanlinessRating] = useState<string>("");
  const [maintenanceRating, setMaintenanceRating] = useState<string>("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store rating in localStorage
    const rating = {
      id: Date.now().toString(),
      cleanlinessRating,
      maintenanceRating,
      comment,
      date: new Date().toISOString(),
    };

    const existingRatings = JSON.parse(localStorage.getItem('toiletRatings') || '[]');
    existingRatings.push(rating);
    localStorage.setItem('toiletRatings', JSON.stringify(existingRatings));

    toast({
      title: "Rating Submitted",
      description: "Thank you for your feedback!",
    });

    // Reset form
    setCleanlinessRating("");
    setMaintenanceRating("");
    setComment("");
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6 relative">
        <BackButton />
        <h1 className="text-2xl font-bold mb-6 text-center">Rate Public Toilet</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cleanliness Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={cleanlinessRating}
                onValueChange={setCleanlinessRating}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="cleanliness-poor" />
                  <Label htmlFor="cleanliness-poor">Poor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="average" id="cleanliness-average" />
                  <Label htmlFor="cleanliness-average">Average</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="cleanliness-good" />
                  <Label htmlFor="cleanliness-good">Good</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maintenance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={maintenanceRating}
                onValueChange={setMaintenanceRating}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="needs-repair" id="maintenance-poor" />
                  <Label htmlFor="maintenance-poor">Needs Repair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="functional" id="maintenance-average" />
                  <Label htmlFor="maintenance-average">Functional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="well-maintained" id="maintenance-good" />
                  <Label htmlFor="maintenance-good">Well Maintained</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="comment">Additional Comments</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience or suggestions..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Rating
          </Button>
        </form>
      </div>
      <BottomNav />
    </div>
  );
};

export default RateToiletPage;
