
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(-1)}
      className="absolute left-4 top-6"
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
  );
};

export default BackButton;
