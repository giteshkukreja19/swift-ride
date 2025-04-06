
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Navigation, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/use-location';
import { useToast } from '@/hooks/use-toast';
import { hospitalService, Hospital } from '@/services/hospitalService';

const NearbyHospitals = () => {
  const { userLocation } = useLocation();
  const [hospitals, setHospitals] = useState<(Hospital & { distance: number })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      if (!userLocation) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Get nearby hospitals using our service
        const nearbyHospitals = hospitalService.findNearbyHospitals(
          userLocation.lat,
          userLocation.lng,
          10 // 10km radius
        );
        
        setHospitals(nearbyHospitals);
        setError(null);
        
      } catch (error) {
        console.error('Error fetching hospitals:', error);
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
          Nearby Hospitals in Chembur, Mumbai
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
                    <Navigation className="mr-1 h-3 w-3" /> {hospital.distance.toFixed(1)} km
                  </span>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span>{hospital.address}</span>
                </div>
                
                {hospital.description && (
                  <div className="mt-2 text-sm text-gray-600">
                    {hospital.description}
                  </div>
                )}
                
                {hospital.phone && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Phone className="mr-1 h-3 w-3" />
                    <span>{hospital.phone}</span>
                  </div>
                )}
                
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1 text-xs"
                    onClick={() => {
                      if (hospital.location) {
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${hospital.location.lat},${hospital.location.lng}`,
                          '_blank'
                        );
                      }
                    }}
                  >
                    <Navigation className="h-3 w-3" /> Directions
                  </Button>
                  
                  {hospital.phone && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1 text-xs"
                      onClick={() => window.open(`tel:${hospital.phone}`)}
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
  );
};

export default NearbyHospitals;
