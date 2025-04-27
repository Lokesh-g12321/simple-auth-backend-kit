
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackViewer: React.FC = () => {
  const { toast } = useToast();
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [toiletRatings, setToiletRatings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"feedback" | "ratings">("feedback");

  useEffect(() => {
    try {
      // Load feedback from localStorage
      const storedFeedback = localStorage.getItem('appFeedback');
      if (storedFeedback) {
        setFeedbackList(JSON.parse(storedFeedback));
      }

      // Load toilet ratings from localStorage
      const storedRatings = localStorage.getItem('toiletRatings');
      if (storedRatings) {
        setToiletRatings(JSON.parse(storedRatings));
      }
    } catch (error) {
      console.error("Error loading feedback data:", error);
      
      // Fallback to mock data if localStorage fails
      const mockFeedback = [
        { id: "f1", satisfaction: "satisfied", improvements: ["More public toilets needed", "Better cleaning schedule"], comment: "Overall good service, but more facilities needed.", date: "2023-05-15T10:30:00Z" },
        { id: "f2", satisfaction: "unsatisfied", improvements: ["Better maintenance", "More hygienic facilities"], comment: "Toilets are often dirty and not maintained well.", date: "2023-05-18T14:15:00Z" },
      ];
      setFeedbackList(mockFeedback);

      const mockRatings = [
        { id: "r1", cleanlinessRating: "good", maintenanceRating: "functional", comment: "Clean but could use some repairs", date: "2023-05-16T09:20:00Z" },
        { id: "r2", cleanlinessRating: "poor", maintenanceRating: "needs-repair", comment: "Very dirty and broken facilities", date: "2023-05-19T11:45:00Z" },
      ];
      setToiletRatings(mockRatings);
    }
  }, []);

  const filteredFeedback = feedbackList.filter(item =>
    (item.comment && item.comment.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.improvements && item.improvements.some((imp: string) => imp.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredRatings = toiletRatings.filter(item =>
    (item.comment && item.comment.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Format date for display
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Feedback</h2>
        <div className="flex gap-4 items-center">
          <div className="flex">
            <Button
              variant={activeTab === "feedback" ? "default" : "outline"}
              onClick={() => setActiveTab("feedback")}
              className="rounded-r-none"
            >
              General Feedback
            </Button>
            <Button
              variant={activeTab === "ratings" ? "default" : "outline"}
              onClick={() => setActiveTab("ratings")}
              className="rounded-l-none"
            >
              Toilet Ratings
            </Button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {activeTab === "feedback" ? (
        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No feedback found</p>
          ) : (
            filteredFeedback.map((feedback) => (
              <Card key={feedback.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {feedback.satisfaction === "satisfied" ? (
                        <ThumbsUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <ThumbsDown className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">
                        {feedback.satisfaction === "satisfied" ? "Satisfied" : "Unsatisfied"}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {formatDate(feedback.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {feedback.improvements && feedback.improvements.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-medium">Areas for improvement:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {feedback.improvements.map((item: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {feedback.comment && (
                  <div className="mt-3">
                    <span className="text-sm font-medium">Comment:</span>
                    <p className="text-sm mt-1 bg-gray-50 p-2 rounded-md">{feedback.comment}</p>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRatings.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No ratings found</p>
          ) : (
            filteredRatings.map((rating) => (
              <Card key={rating.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">
                        {formatDate(rating.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <span className="text-sm font-medium">Cleanliness Rating:</span>
                    <Badge className={
                      rating.cleanlinessRating === "good" ? "bg-green-100 text-green-800" :
                      rating.cleanlinessRating === "average" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {rating.cleanlinessRating}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Maintenance Rating:</span>
                    <Badge className={
                      rating.maintenanceRating === "well-maintained" ? "bg-green-100 text-green-800" :
                      rating.maintenanceRating === "functional" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {rating.maintenanceRating}
                    </Badge>
                  </div>
                </div>

                {rating.comment && (
                  <div className="mt-3">
                    <span className="text-sm font-medium">Comment:</span>
                    <p className="text-sm mt-1 bg-gray-50 p-2 rounded-md">{rating.comment}</p>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      )}
    </Card>
  );
};

export default FeedbackViewer;
