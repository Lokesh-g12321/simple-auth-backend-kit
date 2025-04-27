
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarPlus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import EventDetailsDialog from "./EventDetailsDialog";

const EventManagement: React.FC = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockEvents = [
      { id: 1, title: "Community Cleanup", date: "2023-06-15", location: "Sector 32 Park", status: "Upcoming", attendees: 45, description: "Join us for a community cleanup event" },
      { id: 2, title: "Public Health Workshop", date: "2023-06-22", location: "City Hall", status: "Upcoming", attendees: 30, description: "Learn about public health practices" },
      { id: 3, title: "Tree Planting Drive", date: "2023-05-30", location: "Sector 21 Garden", status: "Completed", attendees: 60, description: "Help us make the city greener" },
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreateDialog = () => {
    setSelectedEvent(null);
    setIsCreateMode(true);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (event: any) => {
    setSelectedEvent(event);
    setIsCreateMode(false);
    setIsDialogOpen(true);
  };

  const handleSaveEvent = (eventData: any) => {
    if (isCreateMode) {
      // Create new event
      const newEvent = {
        ...eventData,
        id: Date.now(),
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Event Created",
        description: "New event has been created successfully.",
      });
    } else {
      // Update existing event
      setEvents(events.map(event =>
        event.id === eventData.id ? { ...eventData } : event
      ));
      toast({
        title: "Event Updated",
        description: "Event has been updated successfully.",
      });
    }
    setIsDialogOpen(false);
  };

  const handleRemoveEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event Removed",
      description: "Event has been removed successfully.",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'completed':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'cancelled':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Events</h2>
        <div className="flex gap-2 items-center">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={handleOpenCreateDialog}>
            <CalendarPlus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">No events found</TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.attendees}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEditDialog(event)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {isDialogOpen && (
        <EventDetailsDialog
          event={selectedEvent}
          isCreateMode={isCreateMode}
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </Card>
  );
};

export default EventManagement;
