
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GoogleMapsLoaderProps {
  apiKey?: string;
  children: React.ReactNode;
}

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({ apiKey, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Skip if already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Default API key (you should replace this with your own key)
    const actualApiKey = apiKey || 'YOUR_GOOGLE_MAPS_API_KEY'; 

    // Create a function to initialize Google Maps
    window.initMap = () => {
      setIsLoaded(true);
    };

    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${actualApiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Handle errors
    script.onerror = () => {
      const errorMsg = 'Failed to load Google Maps API. Please check your API key.';
      setError(errorMsg);
      toast({
        title: 'Google Maps Error',
        description: errorMsg,
        variant: 'destructive',
      });
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script if it wasn't loaded yet
      if (!isLoaded) {
        document.head.removeChild(script);
        window.initMap = undefined;
      }
    };
  }, [apiKey, toast]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-600 font-medium">Google Maps Error</h3>
        <p className="text-sm text-red-500">{error}</p>
        <p className="text-xs text-gray-500 mt-2">
          Please make sure you have a valid Google Maps API key.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-4 border border-gray-200 rounded-md flex justify-center items-center">
        <div className="animate-spin h-6 w-6 border-2 border-gray-500 border-t-transparent rounded-full"></div>
        <span className="ml-2">Loading Google Maps...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default GoogleMapsLoader;
