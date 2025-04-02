// This service simulates a backend API. In a real application,
// this would make API calls to your server.

export interface Ambulance {
  id: number;
  lat: number;
  lng: number;
  status: 'available' | 'busy' | 'en-route';
  vehicleNumber: string;
  lastUpdated: Date;
  crew?: string[];
  equipmentLevel: 'basic' | 'advanced' | 'specialized';
  estimatedArrivalTime?: string;
  responseTime?: number; // in minutes
  currentSpeed?: number; // in mph/kph
  vehicleType: 'ambulance' | 'helicopter' | 'mobile-icu';
  contactNumber: string;
  currentDestination?: string;
  patientCapacity: number;
  fuelLevel?: number; // percentage
  gpsAccuracy?: number; // in meters
  heading?: number; // direction in degrees (0-359)
  elevation?: number; // in meters
  lastGpsUpdate?: Date;
}

// Enhanced ambulance data with GPS information
const mockAmbulances: Ambulance[] = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    status: 'available',
    vehicleNumber: 'AMB-001',
    lastUpdated: new Date(),
    crew: ['John Smith', 'Maria Rodriguez', 'David Lee'],
    equipmentLevel: 'advanced',
    responseTime: 5,
    currentSpeed: 0,
    vehicleType: 'ambulance',
    contactNumber: '(555) 123-4567',
    patientCapacity: 2,
    fuelLevel: 85,
    gpsAccuracy: 3,
    heading: 0,
    elevation: 10,
    lastGpsUpdate: new Date()
  },
  {
    id: 2,
    lat: 40.7328,
    lng: -73.986,
    status: 'busy',
    vehicleNumber: 'AMB-002',
    lastUpdated: new Date(),
    crew: ['Robert Johnson', 'Lisa Chen', 'Michael Brown'],
    equipmentLevel: 'specialized',
    estimatedArrivalTime: '15:45',
    responseTime: 8,
    currentSpeed: 35,
    vehicleType: 'mobile-icu',
    contactNumber: '(555) 234-5678',
    currentDestination: 'Central Hospital',
    patientCapacity: 1,
    fuelLevel: 62,
    gpsAccuracy: 4,
    heading: 120,
    elevation: 15,
    lastGpsUpdate: new Date()
  },
  {
    id: 3,
    lat: 40.7228,
    lng: -74.046,
    status: 'en-route',
    vehicleNumber: 'AMB-003',
    lastUpdated: new Date(),
    crew: ['James Wilson', 'Sarah Ahmed'],
    equipmentLevel: 'basic',
    estimatedArrivalTime: '15:30',
    responseTime: 6,
    currentSpeed: 45,
    vehicleType: 'ambulance',
    contactNumber: '(555) 345-6789',
    currentDestination: '42 Park Avenue',
    patientCapacity: 2,
    fuelLevel: 78,
    gpsAccuracy: 2,
    heading: 270,
    elevation: 12,
    lastGpsUpdate: new Date()
  },
  {
    id: 4,
    lat: 40.7425,
    lng: -73.997,
    status: 'available',
    vehicleNumber: 'HELI-001',
    lastUpdated: new Date(),
    crew: ['Amanda Perez', 'Thomas Nguyen', 'Elizabeth Wilson'],
    equipmentLevel: 'specialized',
    responseTime: 3,
    currentSpeed: 0,
    vehicleType: 'helicopter',
    contactNumber: '(555) 456-7890',
    patientCapacity: 1,
    fuelLevel: 92,
    gpsAccuracy: 5,
    heading: 0,
    elevation: 0,
    lastGpsUpdate: new Date()
  },
  {
    id: 5,
    lat: 40.7050,
    lng: -74.015,
    status: 'en-route',
    vehicleNumber: 'AMB-004',
    lastUpdated: new Date(),
    crew: ['Daniel Garcia', 'Jennifer Kim'],
    equipmentLevel: 'basic',
    estimatedArrivalTime: '15:50',
    responseTime: 7,
    currentSpeed: 28,
    vehicleType: 'ambulance',
    contactNumber: '(555) 567-8901',
    currentDestination: 'Brooklyn Medical Center',
    patientCapacity: 2,
    fuelLevel: 45,
    gpsAccuracy: 3,
    heading: 90,
    elevation: 8,
    lastGpsUpdate: new Date()
  }
];

// Simulate API endpoints
export const ambulanceService = {
  // Get all ambulances
  getAmbulances: async (): Promise<Ambulance[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockAmbulances];
  },

  // Get a single ambulance by ID
  getAmbulanceById: async (id: number): Promise<Ambulance | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAmbulances.find(ambulance => ambulance.id === id);
  },

  // Update ambulance status
  updateAmbulanceStatus: async (id: number, status: Ambulance['status']): Promise<Ambulance | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const ambulance = mockAmbulances.find(amb => amb.id === id);
    if (ambulance) {
      ambulance.status = status;
      ambulance.lastUpdated = new Date();
      return { ...ambulance };
    }
    return undefined;
  },

  // Update ambulance location
  updateAmbulanceLocation: async (id: number, lat: number, lng: number): Promise<Ambulance | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const ambulance = mockAmbulances.find(amb => amb.id === id);
    if (ambulance) {
      ambulance.lat = lat;
      ambulance.lng = lng;
      ambulance.lastUpdated = new Date();
      return { ...ambulance };
    }
    return undefined;
  },

  // Get ambulances by status
  getAmbulancesByStatus: async (status: Ambulance['status']): Promise<Ambulance[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAmbulances.filter(ambulance => ambulance.status === status);
  },
  
  // Get ambulances by type
  getAmbulancesByType: async (type: Ambulance['vehicleType']): Promise<Ambulance[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAmbulances.filter(ambulance => ambulance.vehicleType === type);
  },
  
  // Get ambulance statistics
  getAmbulanceStatistics: async (): Promise<{
    total: number;
    available: number;
    busy: number;
    enRoute: number;
    averageResponseTime: number;
    averageFuelLevel: number;
    vehicleTypes: { type: string; count: number }[];
  }> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const available = mockAmbulances.filter(a => a.status === 'available').length;
    const busy = mockAmbulances.filter(a => a.status === 'busy').length;
    const enRoute = mockAmbulances.filter(a => a.status === 'en-route').length;
    
    const responseTimes = mockAmbulances.filter(a => a.responseTime !== undefined)
      .map(a => a.responseTime as number);
    const averageResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0;
    
    const fuelLevels = mockAmbulances.filter(a => a.fuelLevel !== undefined)
      .map(a => a.fuelLevel as number);
    const averageFuelLevel = fuelLevels.length > 0 
      ? fuelLevels.reduce((sum, level) => sum + level, 0) / fuelLevels.length 
      : 0;
    
    const vehicleTypeCounts = mockAmbulances.reduce((acc, ambulance) => {
      const existing = acc.find(item => item.type === ambulance.vehicleType);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ type: ambulance.vehicleType, count: 1 });
      }
      return acc;
    }, [] as { type: string; count: number }[]);
    
    return {
      total: mockAmbulances.length,
      available,
      busy,
      enRoute,
      averageResponseTime,
      averageFuelLevel,
      vehicleTypes: vehicleTypeCounts
    };
  },
  
  // Get GPS data for a specific ambulance
  getAmbulanceGpsData: async (id: number): Promise<{
    lat: number;
    lng: number;
    accuracy: number;
    heading: number;
    elevation: number;
    speed: number;
    lastUpdate: Date;
  } | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const ambulance = mockAmbulances.find(amb => amb.id === id);
    if (ambulance) {
      return {
        lat: ambulance.lat,
        lng: ambulance.lng,
        accuracy: ambulance.gpsAccuracy || 5,
        heading: ambulance.heading || 0,
        elevation: ambulance.elevation || 0,
        speed: ambulance.currentSpeed || 0,
        lastUpdate: ambulance.lastGpsUpdate || new Date()
      };
    }
    return undefined;
  },
  
  // Get all ambulance locations for map view
  getAmbulanceLocations: async (): Promise<Array<{
    id: number;
    lat: number;
    lng: number;
    status: Ambulance['status'];
    vehicleNumber: string;
    vehicleType: Ambulance['vehicleType'];
  }>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAmbulances.map(ambulance => ({
      id: ambulance.id,
      lat: ambulance.lat,
      lng: ambulance.lng,
      status: ambulance.status,
      vehicleNumber: ambulance.vehicleNumber,
      vehicleType: ambulance.vehicleType
    }));
  }
};
