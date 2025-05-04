
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, PlusCircle, Upload, User } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-500" : "text-gray-600";
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around items-center">
        <Link to="/home" className={`flex flex-col items-center p-2 ${isActive("/home")} hover:text-blue-500`}>
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/events" className={`flex flex-col items-center p-2 ${isActive("/events")} hover:text-blue-500`}>
          <Calendar className="h-6 w-6 mb-1" />
          <span className="text-xs">Events</span>
        </Link>
        <Link to="/post" className={`flex flex-col items-center p-2 ${isActive("/post")} hover:text-blue-500`}>
          <div className="bg-blue-500 rounded-full p-3">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link to="/complaints" className={`flex flex-col items-center p-2 ${isActive("/complaints")} hover:text-blue-500`}>
          <Upload className="h-6 w-6 mb-1" />
          <span className="text-xs">Complaints</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive("/profile")} hover:text-blue-500`}>
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
