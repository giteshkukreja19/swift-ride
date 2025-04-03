
import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationStatusProps {
  status: 'idle' | 'loading' | 'success' | 'error';
}

const LocationStatus: React.FC<LocationStatusProps> = ({ status }) => {
  if (status === 'idle') return null;
  
  if (status === 'loading') {
    return (
      <span className="text-xs text-gray-500 flex items-center">
        <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Getting your location...
      </span>
    );
  }
  
  if (status === 'success') {
    return (
      <span className="text-xs text-green-500 flex items-center">
        <MapPin className="h-3 w-3 mr-1" />
        Location found
      </span>
    );
  }
  
  if (status === 'error') {
    return (
      <span className="text-xs text-red-500 flex items-center">
        <MapPin className="h-3 w-3 mr-1" />
        Location error
      </span>
    );
  }
  
  return null;
};

export default LocationStatus;
