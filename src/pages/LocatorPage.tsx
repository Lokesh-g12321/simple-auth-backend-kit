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
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-6 relative">
        <BackButton />
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">SBM Toilet Locator</h1>
          <p className="text-gray-600">Find nearby facilities for your convenience</p>
        </div>

        {!showMap ? (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <p className="text-sm text-gray-500 mt-1">
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
              <Button type="submit" className="w-full">
                <MapPin className="mr-2" />
                Show Map
              </Button>
            </form>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Map mapboxToken={mapboxToken} />
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default LocatorPage;
