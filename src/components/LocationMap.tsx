
import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import GoogleMapsLoader from './GoogleMapsLoader';

// Import the Google Maps types
import '@/types/google-maps';

interface LocationMapProps {
  location: { lat: number; lng: number } | null;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Skip if no location or Google Maps hasn't loaded
    if (!location || !mapRef.current || !window.google?.maps) return;
    
    try {
      // Initialize map
      const googleMap = new google.maps.Map(mapRef.current, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });
      
      setMap(googleMap);
      
      // Add marker for user location
      const userMarker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: googleMap,
        title: 'Your Location',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(40, 40),
        },
      });
      
      setMarker(userMarker);
      
      // Add info window with "Your Location" text
      const infoWindow = new google.maps.InfoWindow({
        content: '<div class="p-2"><strong>Your Location</strong></div>',
      });
      
      userMarker.addListener('click', () => {
        infoWindow.open(googleMap, userMarker);
      });
      
      // Open info window by default
      infoWindow.open(googleMap, userMarker);
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      setMapError("Error displaying map. Please try refreshing the page.");
    }
    
    return () => {
      // Cleanup
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [location]);

  if (!location) return null;
  
  return (
    <GoogleMapsLoader>
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
        
        {mapError ? (
          <div className="rounded-md overflow-hidden h-[250px] bg-gray-100 flex items-center justify-center">
            <div className="text-center p-4">
              <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-2" />
              <p className="text-red-600 font-medium">{mapError}</p>
              <p className="text-sm text-gray-500 mt-1">Please check your Google Maps API key</p>
            </div>
          </div>
        ) : (
          <div className="rounded-md overflow-hidden h-[250px] bg-gray-100" ref={mapRef}></div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            Your precise location will be shared when requesting emergency services.
          </p>
          <button 
            className="text-xs text-swift-red flex items-center hover:underline"
            onClick={() => {
              if (location) {
                window.open(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`);
              }
            }}
          >
            <Navigation className="h-3 w-3 mr-1" /> 
            Open in Google Maps
          </button>
        </div>
      </div>
    </GoogleMapsLoader>
  );
};

export default LocationMap;
