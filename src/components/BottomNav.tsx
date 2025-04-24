
import { Link } from "react-router-dom";
import { Home, Calendar, PlusCircle, Upload, User } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center">
        <Link to="/home" className="flex flex-col items-center p-3 text-gray-600 hover:text-blue-500">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center p-3 text-gray-600 hover:text-blue-500">
          <Calendar className="h-6 w-6" />
          <span className="text-xs mt-1">Events</span>
        </Link>
        <Link to="/post" className="flex flex-col items-center p-3 text-gray-600 hover:text-blue-500">
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link to="/complaints" className="flex flex-col items-center p-3 text-gray-600 hover:text-blue-500">
          <Upload className="h-6 w-6" />
          <span className="text-xs mt-1">Complaints</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center p-3 text-gray-600 hover:text-blue-500">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
