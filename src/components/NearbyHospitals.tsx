
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for nearby hospitals
const hospitals = [
  {
    id: 1,
    name: 'Central City Hospital',
    distance: '1.2',
    address: '123 Main Street, Central City',
    phone: '(555) 123-4567',
    emergency: true,
    openNow: true,
    waitTime: '15-20 min'
  },
  {
    id: 2,
    name: 'Westside Medical Center',
    distance: '2.8',
    address: '456 Park Avenue, Westside',
    phone: '(555) 234-5678',
    emergency: true,
    openNow: true,
    waitTime: '30-45 min'
  },
  {
    id: 3,
    name: 'Eastview Community Clinic',
    distance: '3.5',
    address: '789 Oak Road, Eastview',
    phone: '(555) 345-6789',
    emergency: false,
    openNow: true,
    waitTime: '10-15 min'
  },
  {
    id: 4,
    name: 'Riverside Emergency Care',
    distance: '4.2',
    address: '101 River Lane, Riverside',
    phone: '(555) 456-7890',
    emergency: true,
    openNow: true,
    waitTime: '5-10 min'
  }
];

const NearbyHospitals = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-swift-red" />
          Nearby Hospitals
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Phone className="mr-1 h-3 w-3" />
                <span>{hospital.phone}</span>
              </div>
              
              <div className="mt-2 flex items-center gap-3">
                {hospital.emergency && (
                  <span className="flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                    Emergency Services
                  </span>
                )}
                {hospital.openNow && (
                  <span className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Open Now
                  </span>
                )}
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" /> Wait: {hospital.waitTime}
                </span>
              </div>
              
              <div className="mt-3 flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1 text-xs"
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(hospital.name + ' ' + hospital.address)}`)}
                >
                  <Navigation className="h-3 w-3" /> Directions
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1 text-xs"
                  onClick={() => window.location.href = `tel:${hospital.phone.replace(/[^\d+]/g, '')}`}
                >
                  <Phone className="h-3 w-3" /> Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyHospitals;
