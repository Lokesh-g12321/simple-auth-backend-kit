
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Map from "@/components/Map";
import BackButton from "@/components/BackButton";

const LocatorPage = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [showMap, setShowMap] = useState(false);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMap(true);
  };

  return (
    <div className="min-h-screen app-native-container">
      <div className="safe-area-top"></div>
      <div className="app-header px-4 py-3 bg-white/80">
        <div className="relative flex items-center">
          <BackButton />
          <h1 className="text-xl font-bold flex-1 text-center">Toilet Locator</h1>
        </div>
      </div>
      
      <div className="app-content px-4 py-4">
        <div className="text-center mb-6">
          <p className="text-gray-600">Find nearby facilities for your convenience</p>
        </div>

        {!showMap ? (
          <div className="max-w-md mx-auto slide-up-animation">
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Enter Mapbox Token
                </label>
                <Input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1..."
                  required
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1 text-left">
                  Get your token at{" "}
                  <a
                    href="https://www.mapbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
              <Button type="submit" className="w-full app-button">
                <MapPin className="mr-2" />
                Show Map
              </Button>
            </form>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden shadow-lg h-[calc(100vh-12rem)]">
            <Map mapboxToken={mapboxToken} />
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default LocatorPage;
