
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, PlusCircle, Upload, User } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-500" : "text-gray-600";
  };
  
  return (
    <nav className="app-bottom-nav safe-area-bottom">
      <div className="flex justify-around items-center">
        <Link to="/home" className={`flex flex-col items-center p-2 ${isActive("/home")} hover:text-blue-500 active:opacity-70 transition-opacity`}>
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/events" className={`flex flex-col items-center p-2 ${isActive("/events")} hover:text-blue-500 active:opacity-70 transition-opacity`}>
          <Calendar className="h-6 w-6 mb-1" />
          <span className="text-xs">Events</span>
        </Link>
        <Link to="/post" className={`flex flex-col items-center p-2 ${isActive("/post")} hover:text-blue-500 active:opacity-70 transition-opacity`}>
          <div className="bg-blue-500 rounded-full p-3 -mt-5 shadow-lg">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs mt-1">Add</span>
        </Link>
        <Link to="/complaints" className={`flex flex-col items-center p-2 ${isActive("/complaints")} hover:text-blue-500 active:opacity-70 transition-opacity`}>
          <Upload className="h-6 w-6 mb-1" />
          <span className="text-xs">Complaints</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive("/profile")} hover:text-blue-500 active:opacity-70 transition-opacity`}>
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
