
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationMapProps {
  location: { lat: number; lng: number } | null;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, className }) => {
  if (!location) return null;
  
  return (
    <div className={`p-4 border border-gray-200 rounded-lg shadow-sm bg-white ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
        <span className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-swift-red" />
          Your Current Location
        </span>
        <span className="text-xs text-gray-500">
          {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </span>
      </h3>
      <div className="rounded-md overflow-hidden h-[250px] bg-gray-100">
        <iframe
          title="User Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01},${location.lat-0.01},${location.lng+0.01},${location.lat+0.01}&marker=${location.lat},${location.lng}&layers=H`}
          allowFullScreen
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-500">
          Your precise location will be shared when requesting emergency services.
        </p>
        <button 
          className="text-xs text-swift-red flex items-center hover:underline"
          onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`)}
        >
          <Navigation className="h-3 w-3 mr-1" /> 
          Open in full map
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
