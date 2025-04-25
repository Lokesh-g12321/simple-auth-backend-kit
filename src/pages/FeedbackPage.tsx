
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const FeedbackPage = () => {
  const { toast } = useToast();
  const [satisfaction, setSatisfaction] = useState<"satisfied" | "unsatisfied" | null>(null);
  const [comment, setComment] = useState("");
  const [improvements, setImprovements] = useState<string[]>([]);

  const improvementOptions = [
    "More public toilets needed",
    "Better cleaning schedule",
    "Improved maintenance",
    "Better accessibility",
    "More hygienic facilities",
    "Better lighting",
    "24/7 availability",
    "Better safety measures"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!satisfaction) {
      toast({
        title: "Please select your satisfaction level",
        variant: "destructive",
      });
      return;
    }

    // Store feedback in localStorage
    const feedback = {
      id: Date.now().toString(),
      satisfaction,
      improvements,
      comment,
      date: new Date().toISOString(),
    };

    const existingFeedback = JSON.parse(localStorage.getItem('appFeedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('appFeedback', JSON.stringify(existingFeedback));

    toast({
      title: "Feedback Submitted",
      description: "Thank you for helping us improve!",
    });

    // Reset form
    setSatisfaction(null);
    setImprovements([]);
    setComment("");
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6 relative">
        <BackButton />
        <h1 className="text-2xl font-bold mb-6 text-center">Provide Feedback</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-8">
                <Button
                  type="button"
                  variant={satisfaction === "satisfied" ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 p-4"
                  onClick={() => setSatisfaction("satisfied")}
                >
                  <ThumbsUp className="h-8 w-8" />
                  <span>Satisfied</span>
                </Button>
                <Button
                  type="button"
                  variant={satisfaction === "unsatisfied" ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 p-4"
                  onClick={() => setSatisfaction("unsatisfied")}
                >
                  <ThumbsDown className="h-8 w-8" />
                  <span>Unsatisfied</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {improvementOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={improvements.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setImprovements([...improvements, option]);
                        } else {
                          setImprovements(improvements.filter((item) => item !== option));
                        }
                      }}
                    />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="comment">Additional Comments</Label>
            <Textarea
              id="comment"
              placeholder="Share your thoughts and suggestions..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </form>
      </div>
      <BottomNav />
    </div>
  );
};

export default FeedbackPage;
