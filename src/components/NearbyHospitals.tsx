
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
  description?: string;
}

const NearbyHospitals = () => {
  const { userLocation } = useLocation();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mumbai, Chembur hospitals data
        const mumbaiHospitals = [
          {
            id: 'hospital-1',
            name: 'Sushrut Hospital and Research Center',
            distance: '0.8',
            address: 'Chembur, Mumbai',
            vicinity: 'Chembur, Mumbai',
            description: 'A multispeciality hospital offering a wide range of medical services with state-of-the-art facilities.'
          },
          {
            id: 'hospital-2',
            name: 'Das Multispeciality Hospital & ICCU',
            distance: '1.2',
            address: 'Chembur, Mumbai',
            vicinity: 'Chembur, Mumbai',
            description: 'Provides comprehensive medical and surgical care with an Intensive Coronary Care Unit.'
          },
          {
            id: 'hospital-3',
            name: 'Zen Multi Specialty Hospital',
            distance: '2.5',
            address: 'Chembur, Mumbai',
            vicinity: 'Chembur, Mumbai',
            description: 'Offers advanced healthcare services across various specialties with modern infrastructure.'
          },
          {
            id: 'hospital-4',
            name: 'Apollo Spectra Hospitals',
            distance: '3.1',
            address: 'Chembur, Mumbai',
            vicinity: 'Chembur, Mumbai',
            description: 'A renowned hospital providing specialized treatments with cutting-edge technology.'
          },
          {
            id: 'hospital-5',
            name: 'Kolekar Multispecialty Hospital & ICCU',
            distance: '3.8',
            address: 'Chembur, Mumbai',
            vicinity: 'Chembur, Mumbai',
            description: 'Delivers a range of medical services with intensive care facilities.'
          },
          {
            id: 'hospital-6',
            name: 'Sai Hospital',
            distance: '4.2',
            address: 'Chembur, Mumbai',
            vicinity: 'Chembur, Mumbai',
            description: 'A multi-speciality hospital known for its patient-centric approach and comprehensive care.'
          }
        ];
        
        setHospitals(mumbaiHospitals);
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
                    <Navigation className="mr-1 h-3 w-3" /> {hospital.distance} km
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
                
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1 text-xs"
                    onClick={() => window.open(`https://www.openstreetmap.org/search?query=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`)}
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
