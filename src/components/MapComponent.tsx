
import React, { useState, useEffect, useRef } from 'react';
import { ambulanceService, Ambulance } from '@/services/ambulanceService';
import { useQuery } from '@tanstack/react-query';
import { Navigation, MapPin, LocateFixed } from 'lucide-react';
import '@/types/google-maps';

interface MapProps {
  className?: string;
}

// Temporary Google Maps API key input component
const GoogleMapsKeyInput = ({ onKeySubmit }: { onKeySubmit: (key: string) => void }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onKeySubmit(apiKey);
      // Save key to localStorage for future use
      localStorage.setItem('googleMapsApiKey', apiKey);
    }
  };

  return (
    <div className="bg-swift-light p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-swift-dark mb-4">Google Maps API Key Required</h3>
      <p className="mb-4 text-gray-600">
        To use the map feature, please enter your Google Maps API key. 
        You can get one from <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noreferrer" className="text-swift-red hover:underline">Google Cloud Console</a>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Google Maps API key"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button 
          type="submit" 
          className="bg-swift-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Save API Key
        </button>
      </form>
    </div>
  );
};

// Main map component
const MapComponent: React.FC<MapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string | null>(localStorage.getItem('googleMapsApiKey'));
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState<number | null>(null);

  // Fetch ambulances data using React Query
  const { data: ambulances, isLoading } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceService.getAmbulances,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });

  // Load Google Maps script
  useEffect(() => {
    if (!googleMapsApiKey) return;
    
    // Skip if Google Maps is already loaded
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    // Handle script loading
    script.onload = () => {
      setMapLoaded(true);
    };
    
    // Handle script errors
    script.onerror = () => {
      console.error('Google Maps script failed to load');
      localStorage.removeItem('googleMapsApiKey');
      setGoogleMapsApiKey(null);
    };
    
    // Add script to document
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [googleMapsApiKey]);

  // Initialize map when script is loaded
  useEffect(() => {
    if (!mapLoaded || !mapContainer.current || !googleMapsApiKey || !window.google?.maps) return;

    // Create the map
    map.current = new google.maps.Map(mapContainer.current, {
      center: { lat: 40.7, lng: -74.0 }, // Default to New York
      zoom: 10,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });
    
    // Add custom controls
    const locationButton = document.createElement("button");
    locationButton.innerHTML = '<div class="flex items-center justify-center w-8 h-8"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="5" y1="12" x2="2" y2="12"/><line x1="22" y1="12" x2="19" y2="12"/></svg></div>';
    locationButton.className = "bg-white rounded shadow-md hover:bg-gray-100 m-2";
    locationButton.title = "Find Your Location";
    
    map.current.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationButton);
    
    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            // Add a marker at the user's location
            new google.maps.Marker({
              position: pos,
              map: map.current!,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
              title: "Your Location",
            });
            
            map.current!.setCenter(pos);
            map.current!.setZoom(14);
          },
          () => {
            console.error("Error: The Geolocation service failed.");
          }
        );
      } else {
        console.error("Error: Your browser doesn't support geolocation.");
      }
    });

  }, [mapLoaded, googleMapsApiKey]);

  // Add markers for ambulances
  useEffect(() => {
    if (!map.current || !ambulances || isLoading || !mapLoaded || !window.google?.maps) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    ambulances.forEach(ambulance => {
      // Set marker color based on status
      const markerColor = ambulance.status === 'available' ? 'green' : 
                          ambulance.status === 'busy' ? 'red' : 'orange';
      
      // Create marker for ambulance
      const marker = new google.maps.Marker({
        position: { lat: ambulance.lat, lng: ambulance.lng },
        map: map.current!,
        title: ambulance.vehicleNumber,
        icon: {
          url: `https://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`,
          scaledSize: new google.maps.Size(32, 32),
        }
      });
      
      // Create info window content
      const contentString = `
        <div class="p-2">
          <h3 class="font-bold text-lg">${ambulance.vehicleNumber}</h3>
          <p class="text-sm mb-1">Status: <span style="color:${
            ambulance.status === 'available' ? 'green' : 
            ambulance.status === 'busy' ? 'red' : 'orange'
          }">${ambulance.status}</span></p>
          <p class="text-sm">Type: ${ambulance.vehicleType}</p>
          <p class="text-sm">Equipment: ${ambulance.equipmentLevel}</p>
          ${ambulance.currentSpeed ? `<p class="text-sm">Speed: ${ambulance.currentSpeed} mph</p>` : ''}
          ${ambulance.currentDestination ? `<p class="text-sm">Destination: ${ambulance.currentDestination}</p>` : ''}
          ${ambulance.estimatedArrivalTime ? `<p class="text-sm">ETA: ${ambulance.estimatedArrivalTime}</p>` : ''}
        </div>
      `;
      
      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      });
      
      // Add click listener to marker
      marker.addListener("click", () => {
        // Close all open info windows
        markersRef.current.forEach(m => {
          const mw = m.get('infoWindow');
          if (mw) mw.close();
        });
        
        infoWindow.open(map.current!, marker);
        setSelectedAmbulance(ambulance.id);
        
        // Center and zoom the map
        map.current!.panTo(marker.getPosition()!);
        map.current!.setZoom(14);
      });
      
      // Store the info window with the marker for later access
      marker.set('infoWindow', infoWindow);
      
      // Store marker in ref
      markersRef.current.push(marker);
    });
    
    // Fit bounds to show all markers if no ambulance is selected
    if (ambulances.length > 0 && !selectedAmbulance && window.google?.maps) {
      const bounds = new google.maps.LatLngBounds();
      ambulances.forEach(ambulance => {
        bounds.extend({ lat: ambulance.lat, lng: ambulance.lng });
      });
      map.current!.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = google.maps.event.addListener(map.current!, 'idle', () => {
        if (map.current!.getZoom() > 15) map.current!.setZoom(15);
        google.maps.event.removeListener(listener);
      });
    }
  }, [ambulances, isLoading, selectedAmbulance, mapLoaded]);

  const handleApiKeySubmit = (key: string) => {
    setGoogleMapsApiKey(key);
  };

  const handleResetView = () => {
    if (!map.current || !ambulances || !window.google?.maps) return;
    
    setSelectedAmbulance(null);
    
    const bounds = new google.maps.LatLngBounds();
    ambulances.forEach(ambulance => {
      bounds.extend({ lat: ambulance.lat, lng: ambulance.lng });
    });
    map.current.fitBounds(bounds);
  };

  if (!googleMapsApiKey) {
    return <GoogleMapsKeyInput onKeySubmit={handleApiKeySubmit} />;
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-[500px] rounded-lg shadow-lg" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-md z-10">
        <button 
          onClick={handleResetView}
          className="flex items-center gap-1 text-sm bg-swift-red text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
        >
          <MapPin size={16} /> Reset View
        </button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-md z-10">
        <h3 className="font-bold text-swift-dark mb-2">Ambulance Status</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Busy</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">En-route</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center">
            <LocateFixed size={16} className="mr-2 text-swift-dark" />
            <span className="text-sm">Real-time GPS Location</span>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swift-red mr-3"></div>
              <span>Loading ambulance data...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
