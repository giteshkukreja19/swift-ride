
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
}

// Simulated ambulance data
const mockAmbulances: Ambulance[] = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    status: 'available',
    vehicleNumber: 'AMB-001',
    lastUpdated: new Date(),
    crew: ['John Smith', 'Maria Rodriguez']
  },
  {
    id: 2,
    lat: 40.7328,
    lng: -73.986,
    status: 'busy',
    vehicleNumber: 'AMB-002',
    lastUpdated: new Date(),
    crew: ['Robert Johnson', 'Lisa Chen']
  },
  {
    id: 3,
    lat: 40.7228,
    lng: -74.046,
    status: 'en-route',
    vehicleNumber: 'AMB-003',
    lastUpdated: new Date(),
    crew: ['James Wilson', 'Sarah Ahmed']
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
  }
};
