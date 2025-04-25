
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

const EventRegistrationModal = ({ isOpen, onClose, eventTitle }: EventRegistrationModalProps) => {
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store registration in localStorage
    const registrations = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");
    registrations.push({
      ...formData,
      eventTitle,
      registrationDate: new Date().toISOString(),
    });
    localStorage.setItem("eventRegistrations", JSON.stringify(registrations));
    
    // Show success message
    toast({
      title: "Registration Successful",
      description: "You have successfully registered for " + eventTitle,
    });
    
    // Close modal and reset form
    onClose();
    setFormData({ name: "", age: "", contact: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for {eventTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Email or Mobile Number</Label>
            <Input
              id="contact"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Enter email or mobile number"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Register</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;
