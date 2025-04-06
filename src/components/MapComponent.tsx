
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ambulanceService } from '@/services/ambulanceService';
import { hospitalService, Hospital, HospitalWithDistance } from '@/services/hospitalService';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from '@/hooks/use-location';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';

// Define Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface MapProps {
  className?: string;
}

const MapComponent: React.FC<MapProps> = ({ className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HospitalWithDistance[]>([]);
  const { userLocation } = useLocation();
  const { toast } = useToast();
  
  // Fetch ambulances with React Query
  const { data: ambulances, isLoading: isLoadingAmbulances } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceService.getAmbulances,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });

  // Initialize the map when component mounts
  useEffect(() => {
    // Check if the Google Maps script is already loaded
    if (!window.google) {
      // Create script tag
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Define the callback function
      window.initMap = () => {
        if (mapRef.current && userLocation) {
          initializeMap();
        }
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Clean up
        delete window.initMap;
        document.head.removeChild(script);
      };
    } else if (mapRef.current && userLocation) {
      // If Google Maps API is already loaded
      initializeMap();
    }
  }, [userLocation]);

  // Initialize map with user location
  const initializeMap = () => {
    if (!mapRef.current || !userLocation) return;

    const mapOptions = {
      center: { lat: userLocation.lat, lng: userLocation.lng },
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Add marker for user's location
    new window.google.maps.Marker({
      position: { lat: userLocation.lat, lng: userLocation.lng },
      map: newMap,
      title: 'Your Location',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      }
    });

    // Find nearby hospitals
    findNearbyHospitals(userLocation.lat, userLocation.lng, newMap);
  };

  // Find nearby hospitals using our service
  const findNearbyHospitals = (lat: number, lng: number, googleMap: google.maps.Map) => {
    const hospitals = hospitalService.findNearbyHospitals(lat, lng, 10);
    
    setNearbyHospitals(hospitals);
    
    // Add markers for each hospital
    hospitals.forEach(hospital => {
      const marker = new window.google.maps.Marker({
        position: { lat: hospital.location.lat, lng: hospital.location.lng },
        map: googleMap,
        title: hospital.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
      });

      // Add info window for each hospital
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="max-width: 200px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${hospital.name}</h3>
            <p style="margin: 5px 0; font-size: 12px;">${hospital.address}</p>
            <p style="margin: 5px 0; font-size: 12px;"><b>Distance:</b> ${hospital.distance.toFixed(2)} km</p>
            ${hospital.phone ? `<p style="margin: 5px 0; font-size: 12px;"><b>Phone:</b> ${hospital.phone}</p>` : ''}
          </div>
        `
      });

      // Open info window when marker is clicked
      marker.addListener('click', () => {
        infoWindow.open(googleMap, marker);
      });
    });

    toast({
      title: "Hospitals Found",
      description: `${hospitals.length} hospitals found nearby`,
      variant: "default"
    });
  };

  // Show ambulances on map when data is available
  useEffect(() => {
    if (map && ambulances && ambulances.length > 0) {
      ambulances.forEach(ambulance => {
        const marker = new window.google.maps.Marker({
          position: { lat: ambulance.lat, lng: ambulance.lng },
          map,
          title: ambulance.vehicleNumber,
          icon: {
            url: ambulance.status === 'available' 
              ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
              : ambulance.status === 'en-route'
                ? 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        });

        // Add info window for each ambulance
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 200px;">
              <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${ambulance.vehicleNumber}</h3>
              <p style="margin: 5px 0; font-size: 12px;"><b>Status:</b> ${ambulance.status}</p>
              <p style="margin: 5px 0; font-size: 12px;"><b>Type:</b> ${ambulance.vehicleType}</p>
              <p style="margin: 5px 0; font-size: 12px;"><b>Contact:</b> ${ambulance.contactNumber}</p>
            </div>
          `
        });

        // Open info window when marker is clicked
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, ambulances]);

  return (
    <Card className={`${className} overflow-hidden`}>
      <CardContent className="p-0 relative">
        {!userLocation ? (
          <div className="flex items-center justify-center h-[500px] bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md">
              <AlertCircle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Location Required</h3>
              <p className="text-gray-600 mb-4">
                Please enable location services to see nearby hospitals and ambulances.
              </p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-[500px]"></div>
        )}
        
        {/* Loading overlay */}
        {(isLoadingAmbulances || !map) && userLocation && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swift-red mr-3"></div>
                <span>Loading map data...</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapComponent;
