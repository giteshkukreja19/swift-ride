
import React from 'react';
import { ambulanceService } from '@/services/ambulanceService';
import { useQuery } from '@tanstack/react-query';
import { Navigation, MapPin, LocateFixed } from 'lucide-react';

interface MapProps {
  className?: string;
}

const MapComponent: React.FC<MapProps> = ({ className }) => {
  const { data: ambulances, isLoading } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceService.getAmbulances,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-[500px] rounded-lg shadow-lg bg-gray-100 flex flex-col items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md">
          <MapPin className="h-12 w-12 mx-auto text-swift-red mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ambulance Tracking</h3>
          <p className="text-gray-600 mb-4">
            Maps functionality has been removed. This would display a map showing the real-time location of ambulances.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Available Ambulances: {ambulances?.filter(a => a.status === 'available').length || 0}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Available: {ambulances?.filter(a => a.status === 'available').length || 0}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Busy: {ambulances?.filter(a => a.status === 'busy').length || 0}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>En-route: {ambulances?.filter(a => a.status === 'en-route').length || 0}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Total: {ambulances?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swift-red mr-3"></div>
              <span>Loading ambulance data...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
