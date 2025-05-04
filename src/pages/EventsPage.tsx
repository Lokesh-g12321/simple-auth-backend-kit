
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import { Calendar, Clock, MapPin, Search, User } from "lucide-react";
import BackButton from "@/components/BackButton";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import { toast } from "@/components/ui/use-toast";

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  
  useEffect(() => {
    // Load saved events from localStorage
    const savedEvents = localStorage.getItem("communityEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleRegisterClick = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setShowRegistrationModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistrationModal(false);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(event => 
    new Date(event.date) >= new Date()
  );

  const cleanupEvents = filteredEvents.filter(event => event.category === "cleanup");
  const educationEvents = filteredEvents.filter(event => event.category === "education");
  const plantationEvents = filteredEvents.filter(event => event.category === "plantation");

  const renderEventsList = (events) => {
    if (events.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No events found</p>
          <p className="text-sm text-gray-400">Events will appear here once they are added by administrators</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {events.map(event => (
          <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>{event.organizer}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{event.description}</p>
              <Button 
                className="mt-3 w-full"
                onClick={() => handleRegisterClick(event.title)}
              >
                Register
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6 relative">
        <BackButton />
        <h1 className="text-2xl font-bold mb-6 text-center">Community Events</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="cleanup">Cleanup</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {renderEventsList(filteredEvents)}
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            {renderEventsList(upcomingEvents)}
          </TabsContent>
          
          <TabsContent value="cleanup" className="mt-4">
            {renderEventsList(cleanupEvents)}
          </TabsContent>
          
          <TabsContent value="education" className="mt-4">
            {renderEventsList(educationEvents)}
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
      {showRegistrationModal && selectedEvent && (
        <EventRegistrationModal
          isOpen={showRegistrationModal}
          onClose={handleCloseModal}
          eventTitle={selectedEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
