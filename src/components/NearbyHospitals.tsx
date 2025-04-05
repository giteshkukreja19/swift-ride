import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Clock, MapPin, Navigation, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/use-location';
import { useToast } from '@/hooks/use-toast';
import GoogleMapsLoader from './GoogleMapsLoader';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone?: string;
  isOpen?: boolean;
  rating?: number;
  vicinity: string;
}

const NearbyHospitals = () => {
  const { userLocation } = useLocation();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      if (!userLocation) return;
      
      if (!window.google?.maps) {
        setError("Google Maps API is not loaded. Please check your API key.");
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const mapDiv = document.createElement('div');
        const service = new google.maps.places.PlacesService(mapDiv);
        
        const request = {
          location: new google.maps.LatLng(userLocation.lat, userLocation.lng),
          rankBy: google.maps.places.RankBy.DISTANCE,
          type: 'hospital'
        };
        
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const hospitalResults = results.slice(0, 6).map(place => {
              const distance = calculateDistance(
                userLocation.lat, 
                userLocation.lng, 
                place.geometry?.location?.lat() || 0, 
                place.geometry?.location?.lng() || 0
              );
              
              return {
                id: place.place_id || `hospital-${Math.random()}`,
                name: place.name || 'Unknown Hospital',
                distance: distance.toFixed(1),
                address: place.vicinity || 'Address unavailable',
                vicinity: place.vicinity || '',
                isOpen: place.opening_hours?.isOpen?.() || undefined,
                rating: place.rating
              };
            });
            
            setHospitals(hospitalResults);
            setError(null);
          } else {
            console.error('Failed to fetch hospitals:', status);
            setError(`Unable to find nearby hospitals (${status})`);
            toast({
              title: "Failed to load hospitals",
              description: "Unable to find nearby hospitals. Please try again later.",
              variant: "destructive"
            });
            
            setHospitals([]);
          }
          
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setIsLoading(false);
        setError("Failed to fetch nearby hospitals");
        toast({
          title: "Error",
          description: "Failed to fetch nearby hospitals",
          variant: "destructive"
        });
      }
    };
    
    fetchNearbyHospitals();
  }, [userLocation, toast]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
  };

  return (
    <GoogleMapsLoader>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-swift-red" />
            Nearby Hospitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-3" />
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-sm text-gray-500 mt-1">Please check your Google Maps API key or try again later</p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swift-red"></div>
            </div>
          ) : hospitals.length > 0 ? (
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="rounded-lg border p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{hospital.name}</h3>
                    <span className="flex items-center text-sm text-gray-500">
                      <Navigation className="mr-1 h-3 w-3" /> {hospital.distance} miles
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>{hospital.address}</span>
                  </div>
                  
                  {hospital.phone && (
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Phone className="mr-1 h-3 w-3" />
                      <span>{hospital.phone}</span>
                    </div>
                  )}
                  
                  <div className="mt-2 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                      Emergency Services
                    </span>
                    
                    {hospital.isOpen !== undefined && (
                      <span className={`flex items-center rounded-full ${hospital.isOpen ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} px-2 py-1 text-xs font-medium`}>
                        {hospital.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    )}
                    
                    {hospital.rating && (
                      <span className="flex items-center text-xs">
                        Rating: {hospital.rating.toFixed(1)} ★
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1 text-xs"
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name)}&query_place_id=${hospital.id}`)}
                    >
                      <Navigation className="h-3 w-3" /> Directions
                    </Button>
                    
                    {hospital.phone && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1 text-xs"
                        onClick={() => window.location.href = `tel:${hospital.phone.replace(/[^\d+]/g, '')}`}
                      >
                        <Phone className="h-3 w-3" /> Call
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <p className="text-gray-600">No hospitals found nearby</p>
              <p className="text-sm text-gray-500 mt-1">Please check your location settings or try again</p>
            </div>
          )}
        </CardContent>
      </Card>
    </GoogleMapsLoader>
  );
};

export default NearbyHospitals;
