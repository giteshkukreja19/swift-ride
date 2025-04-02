
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const [ambulances, setAmbulances] = useState<any[]>([]);

  // Initialize map when token is available
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Default to New York area
      zoom: 9
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Load and display ambulance markers when map is ready
  useEffect(() => {
    if (!map.current || !mapboxToken) return;

    const fetchAmbulances = async () => {
      // In a real app, this would fetch from your API
      // For now, we'll use sample data
      const mockAmbulances = [
        { id: 1, lat: 40.7128, lng: -74.006, status: 'available' },
        { id: 2, lat: 40.7328, lng: -73.986, status: 'busy' },
        { id: 3, lat: 40.7228, lng: -74.046, status: 'en-route' }
      ];
      
      setAmbulances(mockAmbulances);
    };

    fetchAmbulances();

    // Setup interval to periodically update ambulance positions
    const intervalId = setInterval(fetchAmbulances, 30000);
    return () => clearInterval(intervalId);
  }, [map.current, mapboxToken]);

  // Add markers for ambulances
  useEffect(() => {
    if (!map.current || ambulances.length === 0) return;

    // Remove existing markers
    const markers = document.getElementsByClassName('ambulance-marker');
    while (markers[0]) {
      markers[0].parentNode?.removeChild(markers[0]);
    }

    // Add new markers
    ambulances.forEach(ambulance => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'ambulance-marker';
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = ambulance.status === 'available' ? '#10B981' : 
                                ambulance.status === 'busy' ? '#EF4444' : '#F59E0B';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([ambulance.lng, ambulance.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>Ambulance #${ambulance.id}</h3><p>Status: ${ambulance.status}</p>`))
        .addTo(map.current);
    });
  }, [ambulances]);

  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
  };

  if (!mapboxToken) {
    return <MapboxTokenInput onTokenSubmit={handleTokenSubmit} />;
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-[500px] rounded-lg shadow-lg" />
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-md z-10">
        <h3 className="font-bold text-swift-dark mb-2">Ambulance Status</h3>
        <div className="flex items-center space-x-4">
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
      </div>
    </div>
  );
};

export default MapComponent;
