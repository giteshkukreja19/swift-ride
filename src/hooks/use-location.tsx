
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LocationHookResult {
  userLocation: { lat: number; lng: number } | null;
  locationStatus: 'idle' | 'loading' | 'success' | 'error';
  fetchAddressFromCoordinates: (latitude: number, longitude: number) => Promise<string | null>;
  retryFetchLocation: () => void;
  errorMessage: string | null;
}

export function useLocation(): LocationHookResult {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLocation = () => {
    if (navigator.geolocation) {
      setLocationStatus('loading');
      setErrorMessage(null);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus('success');
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationStatus('error');
          
          let message = "Unable to get your location.";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = "Location permission denied. Please enable location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              message = "Location information is unavailable. Please try again.";
              break;
            case error.TIMEOUT:
              message = "Request to get location timed out. Please try again.";
              break;
            default:
              message = "An unknown error occurred while getting location.";
              break;
          }
          
          setErrorMessage(message);
          
          toast({
            title: "Location Error",
            description: message,
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationStatus('error');
      const message = "Geolocation is not supported by your browser. Please enter your address manually.";
      setErrorMessage(message);
      
      toast({
        title: "Location Not Supported",
        description: message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string | null> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      
      if (data && data.display_name) {
        return data.display_name;
      }
      return null;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  const retryFetchLocation = () => {
    fetchLocation();
  };

  return { 
    userLocation, 
    locationStatus, 
    fetchAddressFromCoordinates,
    retryFetchLocation,
    errorMessage 
  };
}
