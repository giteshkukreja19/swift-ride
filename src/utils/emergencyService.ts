import { UserData, getDatabase, saveDatabase } from './userDatabase';

// Emergency request interface
export interface EmergencyRequest {
  id: string;
  userId: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  address?: string;
  patientName: string;
  phoneNumber: string;
  bloodGroup: string;
  notes?: string;
  status: 'pending' | 'dispatched' | 'arrived' | 'completed' | 'cancelled';
  assignedAmbulanceId?: string;
  estimatedArrivalTime?: string;
  distanceToBeTravelled?: number;
  nearestHospital?: string;
}

// Create emergency request
export const createEmergencyRequest = (
  userData: {
    id?: string;
    name: string;
    phone: string;
    bloodGroup: string;
    address?: string;
    notes?: string;
    location?: { lat: number; lng: number } | null;
  }
): EmergencyRequest | null => {
  if (!userData.location) {
    console.error('Location is required for emergency requests');
    return null;
  }
  
  const db = getDatabase();
  
  // Get or create user ID
  let userId = userData.id;
  if (!userId) {
    // Look for existing user with same phone
    const existingUser = db.users.find(user => user.phone === userData.phone);
    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create temporary user
      userId = `temp-${Date.now()}`;
      const newUser: UserData = {
        id: userId,
        name: userData.name,
        email: `emergency_${Date.now()}@swiftride.temp`,
        phone: userData.phone,
        bloodGroup: userData.bloodGroup,
        address: userData.address,
        location: userData.location,
        emergencyRequest: true,
        requestTime: new Date().toISOString()
      };
      
      db.users.push(newUser);
    }
  }
  
  // Create request ID
  const requestId = `er-${Date.now()}`;
  const timestamp = new Date().toISOString();
  
  // Simulate ambulance assignment and ETA calculation
  const randomMinutes = Math.floor(Math.random() * 10) + 5; // 5-15 minutes
  const eta = new Date();
  eta.setMinutes(eta.getMinutes() + randomMinutes);
  
  // Calculate simulated distance (for demo purposes)
  const distanceInKm = (Math.random() * 5 + 1).toFixed(1); // 1-6 km
  
  // Mumbai hospitals for nearest hospital selection
  const mumbaiHospitals = [
    'Sushrut Hospital and Research Center',
    'Das Multispeciality Hospital & ICCU',
    'Zen Multi Specialty Hospital',
    'Apollo Spectra Hospitals',
    'Kolekar Multispecialty Hospital & ICCU',
    'Sai Hospital'
  ];
  
  // Select a random hospital from the Mumbai hospitals list
  const randomHospitalIndex = Math.floor(Math.random() * mumbaiHospitals.length);
  const nearestHospital = mumbaiHospitals[randomHospitalIndex];
  
  // Create new emergency request
  const newRequest: EmergencyRequest = {
    id: requestId,
    userId,
    timestamp,
    location: userData.location,
    address: userData.address,
    patientName: userData.name,
    phoneNumber: userData.phone,
    bloodGroup: userData.bloodGroup,
    notes: userData.notes,
    status: 'dispatched',
    assignedAmbulanceId: `amb-${Math.floor(Math.random() * 1000)}`,
    estimatedArrivalTime: eta.toISOString(),
    distanceToBeTravelled: parseFloat(distanceInKm),
    nearestHospital
  };
  
  // Add request to database
  db.emergencyRequests.push(newRequest);
  saveDatabase(db);
  
  return newRequest;
};

// Get emergency request by ID
export const getEmergencyRequestById = (requestId: string): EmergencyRequest | null => {
  const db = getDatabase();
  const request = db.emergencyRequests.find(req => req.id === requestId);
  
  if (!request) return null;
  
  // Convert database request to our EmergencyRequest format
  return {
    ...request,
    patientName: request.patientName || '',
    phoneNumber: request.phoneNumber || '',
    bloodGroup: request.bloodGroup || '',
  } as EmergencyRequest;
};

// Get all emergency requests for a user
export const getUserEmergencyRequests = (userId: string): EmergencyRequest[] => {
  const db = getDatabase();
  
  // Map database requests to our EmergencyRequest format
  return db.emergencyRequests
    .filter(req => req.userId === userId)
    .map(req => ({
      ...req,
      patientName: req.patientName || '',
      phoneNumber: req.phoneNumber || '',
      bloodGroup: req.bloodGroup || '',
    } as EmergencyRequest));
};

// Update emergency request status
export const updateEmergencyRequestStatus = (
  requestId: string, 
  status: EmergencyRequest['status']
): EmergencyRequest | null => {
  const db = getDatabase();
  const requestIndex = db.emergencyRequests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) return null;
  
  db.emergencyRequests[requestIndex].status = status;
  
  // If status is arrived, update arrival time
  if (status === 'arrived') {
    db.emergencyRequests[requestIndex].estimatedArrivalTime = new Date().toISOString();
  }
  
  saveDatabase(db);
  
  // Convert to our EmergencyRequest format
  return {
    ...db.emergencyRequests[requestIndex],
    patientName: db.emergencyRequests[requestIndex].patientName || '',
    phoneNumber: db.emergencyRequests[requestIndex].phoneNumber || '',
    bloodGroup: db.emergencyRequests[requestIndex].bloodGroup || '',
  } as EmergencyRequest;
};

// Get all active emergency requests
export const getActiveEmergencyRequests = (): EmergencyRequest[] => {
  const db = getDatabase();
  
  // Map database requests to our EmergencyRequest format
  return db.emergencyRequests
    .filter(req => ['pending', 'dispatched'].includes(req.status))
    .map(req => ({
      ...req,
      patientName: req.patientName || '',
      phoneNumber: req.phoneNumber || '',
      bloodGroup: req.bloodGroup || '',
    } as EmergencyRequest));
};

// Cancel emergency request
export const cancelEmergencyRequest = (requestId: string): boolean => {
  const db = getDatabase();
  const requestIndex = db.emergencyRequests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) return false;
  
  db.emergencyRequests[requestIndex].status = 'cancelled';
  saveDatabase(db);
  
  return true;
};

// Get nearest ambulance (simulated)
export const findNearestAmbulance = (location: { lat: number; lng: number }): string => {
  // This is a simulation - in a real app, this would query a database of ambulance locations
  const ambulanceIds = ['amb-101', 'amb-102', 'amb-103', 'amb-104', 'amb-105'];
  return ambulanceIds[Math.floor(Math.random() * ambulanceIds.length)];
};

// Calculate ETA (simulated)
export const calculateETA = (
  ambulanceLocation: { lat: number; lng: number },
  userLocation: { lat: number; lng: number }
): number => {
  // This is a simulation - in a real app, this would use a routing API
  // Returns minutes until arrival
  return Math.floor(Math.random() * 15) + 5; // 5-20 minutes
};
