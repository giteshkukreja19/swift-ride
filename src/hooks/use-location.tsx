
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface LocationHookResult {
  userLocation: { lat: number; lng: number } | null;
  locationStatus: 'idle' | 'loading' | 'success' | 'error';
  fetchAddressFromCoordinates: (latitude: number, longitude: number) => Promise<string | null>;
}

export function useLocation(): LocationHookResult {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('loading');
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
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please allow location access or enter your address manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setLocationStatus('error');
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser. Please enter your address manually.",
        variant: "destructive",
      });
    }
  }, [toast]);

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

  return { userLocation, locationStatus, fetchAddressFromCoordinates };
}
