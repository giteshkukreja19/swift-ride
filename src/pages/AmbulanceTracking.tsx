import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';
import { ambulanceService, Ambulance } from '@/services/ambulanceService';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Ambulance as AmbulanceIcon, 
  Clock, 
  Users, 
  LocateFixed, 
  MapPin, 
  MapPinCheck
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

const AmbulanceTracking = () => {
  const { data: ambulances, isLoading: isLoadingAmbulances, error: ambulancesError } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceService.getAmbulances,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: statistics, isLoading: isLoadingStats } = useQuery({
    queryKey: ['ambulance-statistics'],
    queryFn: ambulanceService.getAmbulanceStatistics,
    refetchInterval: 30000,
  });

  const getStatusColor = (status: Ambulance['status']) => {
    switch (status) {
      case 'available': return 'text-green-500';
      case 'busy': return 'text-red-500';
      case 'en-route': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBgColor = (status: Ambulance['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100';
      case 'busy': return 'bg-red-100';
      case 'en-route': return 'bg-yellow-100';
      default: return 'bg-gray-100';
    }
  };

  const getVehicleTypeIcon = (type: Ambulance['vehicleType']) => {
    switch (type) {
      case 'helicopter': return '🚁';
      case 'mobile-icu': return '🏥';
      default: return '🚑';
    }
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const statusData = statistics ? [
    { name: 'Available', value: statistics.available, color: '#10b981' },
    { name: 'Busy', value: statistics.busy, color: '#ef4444' },
    { name: 'En Route', value: statistics.enRoute, color: '#f59e0b' },
  ] : [];

  const vehicleTypeData = statistics?.vehicleTypes.map(type => ({
    name: type.type.charAt(0).toUpperCase() + type.type.slice(1).replace('-', ' '),
    value: type.count,
    color: type.type === 'ambulance' ? '#3b82f6' : 
           type.type === 'helicopter' ? '#8b5cf6' : '#ec4899'
  })) || [];

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
            {/* Statistics Overview */}
            {statistics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 uppercase">Available</p>
                      <p className="text-4xl font-bold text-green-500">{statistics.available}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 uppercase">Busy</p>
                      <p className="text-4xl font-bold text-red-500">{statistics.busy}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 uppercase">En Route</p>
                      <p className="text-4xl font-bold text-yellow-500">{statistics.enRoute}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 uppercase">Total Fleet</p>
                      <p className="text-4xl font-bold text-blue-500">{statistics.total}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-swift-dark">Live Map</h2>
                <MapComponent className="mb-6" />
                
                {/* Charts */}
                {statistics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Vehicle Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {statusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Vehicle Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={vehicleTypeData}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" name="Count">
                                {vehicleTypeData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 text-swift-dark">Ambulance Status</h2>
                {isLoadingAmbulances ? (
                  <p className="text-gray-500">Loading ambulance data...</p>
                ) : ambulancesError ? (
                  <p className="text-red-500">Error loading ambulance data</p>
                ) : (
                  <div className="space-y-4">
                    {ambulances?.map((ambulance) => (
                      <Card key={ambulance.id} className="overflow-hidden">
                        <CardHeader className={`py-3 px-4 ${getStatusBgColor(ambulance.status)}`}>
                          <CardTitle className="flex items-center text-lg">
                            <div className="mr-2">{getVehicleTypeIcon(ambulance.vehicleType)}</div>
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
                            {ambulance.currentDestination && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Destination: {ambulance.currentDestination}</span>
                              </div>
                            )}
                            {ambulance.estimatedArrivalTime && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <span>ETA: {ambulance.estimatedArrivalTime}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <MapPinCheck className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Response Time: {ambulance.responseTime} min</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Updated: {formatDateTime(ambulance.lastUpdated)}</span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Type: {ambulance.vehicleType}</span>
                                <span className="text-xs text-gray-500">Equipment: {ambulance.equipmentLevel}</span>
                                <span className="text-xs text-gray-500">Fuel: {ambulance.fuelLevel}%</span>
                              </div>
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
