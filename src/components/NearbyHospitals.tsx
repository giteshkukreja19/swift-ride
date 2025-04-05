
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Navigation, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/use-location';
import { useToast } from '@/hooks/use-toast';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  address: string;
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
      
      setIsLoading(true);
      setError(null);
      
      try {
        // This is a fallback that simulates nearby hospitals when Google Maps API is not available
        // In a real app, you might use a different API or backend service
        
        // Generate some mock data based on the user's location
        const mockHospitals = [
          {
            id: 'hospital-1',
            name: 'General Hospital',
            distance: '0.8',
            address: '123 Medical Blvd',
            vicinity: '123 Medical Blvd'
          },
          {
            id: 'hospital-2',
            name: 'County Medical Center',
            distance: '1.2',
            address: '456 Healthcare Ave',
            vicinity: '456 Healthcare Ave'
          },
          {
            id: 'hospital-3',
            name: 'Emergency Care Clinic',
            distance: '2.5',
            address: '789 First Aid St',
            vicinity: '789 First Aid St'
          }
        ];
        
        setHospitals(mockHospitals);
        setError(null);
        
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setIsLoading(false);
        setError("Failed to fetch nearby hospitals");
        toast({
          title: "Error",
          description: "Failed to fetch nearby hospitals",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNearbyHospitals();
  }, [userLocation, toast]);

  return (
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
            <p className="text-sm text-gray-500 mt-1">Please try again later</p>
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
                
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1 text-xs"
                    onClick={() => window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(hospital.name)}`)}
                  >
                    <Navigation className="h-3 w-3" /> Directions
                  </Button>
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
  );
};

export default NearbyHospitals;
