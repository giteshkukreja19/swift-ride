
import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  location: { lat: number; lng: number } | null;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, className }) => {
  if (!location) return null;
  
  return (
    <div className={`p-4 border border-gray-200 rounded-lg shadow-sm bg-white ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
        <MapPin className="h-4 w-4 mr-1 text-swift-red" />
        Your Current Location
      </h3>
      <div className="rounded-md overflow-hidden h-[150px] bg-gray-100">
        <iframe
          title="User Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01},${location.lat-0.01},${location.lng+0.01},${location.lat+0.01}&marker=${location.lat},${location.lng}`}
          allowFullScreen
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Your precise location will be shared only when you request emergency services.
      </p>
    </div>
  );
};

export default LocationMap;
