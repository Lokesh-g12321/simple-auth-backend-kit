
import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ComplaintDetailsDialogProps {
  complaint: any;
  open: boolean;
  onClose: () => void;
  onStatusChange: (status: string) => void;
}

const ComplaintDetailsDialog: React.FC<ComplaintDetailsDialogProps> = ({
  complaint,
  open,
  onClose,
  onStatusChange,
}) => {
  const [status, setStatus] = useState(complaint.status);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complaint Details</DialogTitle>
          <DialogDescription>
            View and update the complaint information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-medium text-right">Title:</Label>
            <span className="col-span-3">{complaint.title}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-medium text-right">Area:</Label>
            <span className="col-span-3">{complaint.area}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-medium text-right">Date:</Label>
            <span className="col-span-3">{complaint.date}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-medium text-right">Description:</Label>
            <span className="col-span-3">{complaint.description}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="font-medium text-right">User ID:</Label>
            <span className="col-span-3">{complaint.userId}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="font-medium text-right">Status:</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onStatusChange(status)}>Update Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComplaintDetailsDialog;
