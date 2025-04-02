
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';
import { ambulanceService, Ambulance } from '@/services/ambulanceService';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ambulance as AmbulanceIcon, Clock, Users, LocateFixed } from 'lucide-react';

const AmbulanceTracking = () => {
  const { data: ambulances, isLoading, error } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceService.getAmbulances,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const getStatusColor = (status: Ambulance['status']) => {
    switch (status) {
      case 'available': return 'text-green-500';
      case 'busy': return 'text-red-500';
      case 'en-route': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-20 bg-swift-dark text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ambulance Tracking</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time monitoring of our emergency medical transport fleet
            </p>
          </div>
        </div>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-swift-dark">Live Map</h2>
                <MapComponent className="mb-6" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 text-swift-dark">Ambulance Status</h2>
                {isLoading ? (
                  <p className="text-gray-500">Loading ambulance data...</p>
                ) : error ? (
                  <p className="text-red-500">Error loading ambulance data</p>
                ) : (
                  <div className="space-y-4">
                    {ambulances?.map((ambulance) => (
                      <Card key={ambulance.id} className="overflow-hidden">
                        <CardHeader className={`bg-gray-100 py-3 px-4`}>
                          <CardTitle className="flex items-center text-lg">
                            <AmbulanceIcon className="mr-2 h-5 w-5" />
                            <span>{ambulance.vehicleNumber}</span>
                            <span className={`ml-auto ${getStatusColor(ambulance.status)}`}>
                              {ambulance.status.charAt(0).toUpperCase() + ambulance.status.slice(1)}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <LocateFixed className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Lat: {ambulance.lat.toFixed(4)}, Lng: {ambulance.lng.toFixed(4)}</span>
                            </div>
                            {ambulance.crew && (
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{ambulance.crew.join(', ')}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Updated: {formatDateTime(ambulance.lastUpdated)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AmbulanceTracking;
