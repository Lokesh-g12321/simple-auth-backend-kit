
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventDetailsDialogProps {
  event?: any;
  isCreateMode: boolean;
  open: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  event,
  isCreateMode,
  open,
  onClose,
  onSave,
}) => {
  const [eventData, setEventData] = useState({
    id: 0,
    title: "",
    date: "",
    location: "",
    status: "Upcoming",
    attendees: 0,
    description: "",
  });

  useEffect(() => {
    if (event && !isCreateMode) {
      setEventData({
        id: event.id,
        title: event.title || "",
        date: event.date || "",
        location: event.location || "",
        status: event.status || "Upcoming",
        attendees: event.attendees || 0,
        description: event.description || "",
      });
    } else {
      setEventData({
        id: 0,
        title: "",
        date: "",
        location: "",
        status: "Upcoming",
        attendees: 0,
        description: "",
      });
    }
  }, [event, isCreateMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isCreateMode ? "Create New Event" : "Edit Event"}</DialogTitle>
          <DialogDescription>
            {isCreateMode 
              ? "Add a new community event" 
              : "Make changes to the existing event"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title:
            </Label>
            <Input
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date:
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={eventData.date}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location:
            </Label>
            <Input
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attendees" className="text-right">
              Attendees:
            </Label>
            <Input
              id="attendees"
              name="attendees"
              type="number"
              value={eventData.attendees}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status:
            </Label>
            <Select 
              value={eventData.status} 
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description:
            </Label>
            <Textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(eventData)}>
            {isCreateMode ? "Create Event" : "Update Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
