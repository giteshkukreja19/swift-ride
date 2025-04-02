
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ambulanceService, Ambulance } from '@/services/ambulanceService';
import { useQuery } from '@tanstack/react-query';
import { Navigation, MapPin, LocateFixed } from 'lucide-react';

interface MapProps {
  className?: string;
}

// Temporary mapbox token input component
const MapboxTokenInput = ({ onTokenSubmit }: { onTokenSubmit: (token: string) => void }) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenSubmit(token);
      // Save token to localStorage for future use
      localStorage.setItem('mapboxToken', token);
    }
  };

  return (
    <div className="bg-swift-light p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-swift-dark mb-4">Mapbox Token Required</h3>
      <p className="mb-4 text-gray-600">
        To use the map feature, please enter your Mapbox public token. 
        You can get one from <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-swift-red hover:underline">mapbox.com</a>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your Mapbox public token"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button 
          type="submit" 
          className="bg-swift-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Token
        </button>
      </form>
    </div>
  );
};

// Main map component
const MapComponent: React.FC<MapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem('mapboxToken'));
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState<number | null>(null);

  // Fetch ambulances data using React Query
  const { data: ambulances, isLoading } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceService.getAmbulances,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });

  // Initialize map when token is available
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.0, 40.7], // Default to New York area
      zoom: 10
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Add markers for ambulances
  useEffect(() => {
    if (!map.current || !ambulances || isLoading) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    ambulances.forEach(ambulance => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'ambulance-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = ambulance.status === 'available' ? '#10B981' : 
                                ambulance.status === 'busy' ? '#EF4444' : '#F59E0B';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      
      // Add ambulance icon based on vehicle type
      if (ambulance.vehicleType === 'ambulance') {
        el.innerHTML = '🚑';
      } else if (ambulance.vehicleType === 'helicopter') {
        el.innerHTML = '🚁';
      } else {
        el.innerHTML = '🏥';
      }

      // Create a popup with ambulance details
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${ambulance.vehicleNumber}</h3>
            <p class="text-sm mb-1">Status: <span class="${
              ambulance.status === 'available' ? 'text-green-500' : 
              ambulance.status === 'busy' ? 'text-red-500' : 'text-yellow-500'
            } font-semibold">${ambulance.status}</span></p>
            <p class="text-sm">Type: ${ambulance.vehicleType}</p>
            <p class="text-sm">Equipment: ${ambulance.equipmentLevel}</p>
            ${ambulance.currentSpeed ? `<p class="text-sm">Speed: ${ambulance.currentSpeed} mph</p>` : ''}
            ${ambulance.currentDestination ? `<p class="text-sm">Destination: ${ambulance.currentDestination}</p>` : ''}
            ${ambulance.estimatedArrivalTime ? `<p class="text-sm">ETA: ${ambulance.estimatedArrivalTime}</p>` : ''}
          </div>
        `);

      // Add marker to map with popup
      const marker = new mapboxgl.Marker(el)
        .setLngLat([ambulance.lng, ambulance.lat])
        .setPopup(popup);
      
      // Add marker to map and store in ref
      marker.addTo(map.current!);
      markersRef.current.push(marker);

      // Add click event to marker
      el.addEventListener('click', () => {
        setSelectedAmbulance(ambulance.id);
        
        // Fly to the ambulance location with animation
        map.current?.flyTo({
          center: [ambulance.lng, ambulance.lat],
          zoom: 14,
          speed: 1.2,
          curve: 1.5
        });
      });
    });

    // Adjust map bounds to fit all markers
    if (ambulances.length > 0 && !selectedAmbulance) {
      const bounds = new mapboxgl.LngLatBounds();
      ambulances.forEach(ambulance => {
        bounds.extend([ambulance.lng, ambulance.lat]);
      });
      map.current.fitBounds(bounds, { padding: 100 });
    }
  }, [ambulances, isLoading, selectedAmbulance]);

  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
  };

  const handleResetView = () => {
    if (!map.current || !ambulances) return;
    
    setSelectedAmbulance(null);
    
    const bounds = new mapboxgl.LngLatBounds();
    ambulances.forEach(ambulance => {
      bounds.extend([ambulance.lng, ambulance.lat]);
    });
    map.current.fitBounds(bounds, { padding: 100 });
  };

  if (!mapboxToken) {
    return <MapboxTokenInput onTokenSubmit={handleTokenSubmit} />;
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
