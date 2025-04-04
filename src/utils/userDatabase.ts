
// User data interface
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bloodGroup?: string;
  address?: string;
  password?: string; // Note: In a real app, never store plain passwords
  location?: {
    lat: number;
    lng: number;
  };
  emergencyRequest?: boolean;
  requestTime?: string;
}

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
  patientName?: string;
  phoneNumber?: string;
  bloodGroup?: string;
  notes?: string;
  status: 'pending' | 'dispatched' | 'arrived' | 'completed' | 'cancelled';
  assignedAmbulanceId?: string;
  estimatedArrivalTime?: string;
  distanceToBeTravelled?: number;
  nearestHospital?: string;
}

// Database interface
export interface UserDatabase {
  users: UserData[];
  emergencyRequests: EmergencyRequest[];
}

// Initial database setup
const initDatabase = (): UserDatabase => {
  const existingDB = localStorage.getItem('swift_ride_db');
  if (existingDB) {
    return JSON.parse(existingDB);
  }
  
  // Create new database
  const newDB: UserDatabase = { 
    users: [],
    emergencyRequests: []
  };
  localStorage.setItem('swift_ride_db', JSON.stringify(newDB));
  return newDB;
};

// Get database
export const getDatabase = (): UserDatabase => {
  return initDatabase();
};

// Save database
export const saveDatabase = (db: UserDatabase): void => {
  localStorage.setItem('swift_ride_db', JSON.stringify(db));
};

// Add user
export const addUser = (userData: UserData): UserData => {
  const db = getDatabase();
  
  // Check if user with email already exists
  const existingUser = db.users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Generate unique ID if not provided
  if (!userData.id) {
    userData.id = Date.now().toString();
  }
  
  // Add user to database
  db.users.push(userData);
  saveDatabase(db);
  
  // Return user without password
  const { password, ...userWithoutPassword } = userData;
  return userWithoutPassword;
};

// Get user by email
export const getUserByEmail = (email: string): UserData | null => {
  const db = getDatabase();
  const user = db.users.find(user => user.email === email);
  
  if (!user) return null;
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Update user
export const updateUser = (userId: string, userData: Partial<UserData>): UserData | null => {
  const db = getDatabase();
  const userIndex = db.users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return null;
  
  // Update user data
  db.users[userIndex] = { ...db.users[userIndex], ...userData };
  saveDatabase(db);
  
  // Return updated user without password
  const { password, ...userWithoutPassword } = db.users[userIndex];
  return userWithoutPassword;
};

// Verify user login
export const verifyLogin = (email: string, password: string): UserData | null => {
  const db = getDatabase();
  const user = db.users.find(user => user.email === email && user.password === password);
  
  if (!user) return null;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Create emergency request
export const createEmergencyRequest = (userId: string, location: {lat: number, lng: number}): EmergencyRequest => {
  const db = getDatabase();
  
  // Check if user exists
  const user = db.users.find(user => user.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Create emergency request
  const requestId = `er-${Date.now()}`;
  const timestamp = new Date().toISOString();
  
  // Simulate ambulance assignment and ETA calculation
  const randomMinutes = Math.floor(Math.random() * 10) + 5; // 5-15 minutes
  const eta = new Date();
  eta.setMinutes(eta.getMinutes() + randomMinutes);
  
  const newRequest: EmergencyRequest = {
    id: requestId,
    userId,
    timestamp,
    location,
    status: 'dispatched',
    assignedAmbulanceId: `amb-${Math.floor(Math.random() * 1000)}`,
    estimatedArrivalTime: eta.toISOString(),
    patientName: user.name,
    phoneNumber: user.phone,
    bloodGroup: user.bloodGroup,
  };
  
  // Add request to database
  db.emergencyRequests.push(newRequest);
  saveDatabase(db);
  
  return newRequest;
};

// Get emergency request
export const getEmergencyRequest = (requestId: string): EmergencyRequest | null => {
  const db = getDatabase();
  const request = db.emergencyRequests.find(req => req.id === requestId);
  return request || null;
};

// Get user's active emergency requests
export const getUserActiveRequests = (userId: string): EmergencyRequest[] => {
  const db = getDatabase();
  return db.emergencyRequests.filter(req => 
    req.userId === userId && 
    ['pending', 'dispatched'].includes(req.status as string)
  );
};

// Update emergency request status
export const updateEmergencyRequestStatus = (
  requestId: string, 
  status: 'pending' | 'dispatched' | 'arrived' | 'completed' | 'cancelled'
): EmergencyRequest | null => {
  const db = getDatabase();
  const requestIndex = db.emergencyRequests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) return null;
  
  // Update status
  db.emergencyRequests[requestIndex].status = status;
  
  // If status is arrived, update arrival time
  if (status === 'arrived') {
    db.emergencyRequests[requestIndex].estimatedArrivalTime = new Date().toISOString();
  }
  
  saveDatabase(db);
  return db.emergencyRequests[requestIndex];
};

// Get total user count
export const getUserCount = (): number => {
  const db = getDatabase();
  return db.users.length;
};

// Create emergency user for quick access
export const createEmergencyUser = (userData: Partial<UserData>): UserData => {
  // Generate a temporary email if not provided
  if (!userData.email) {
    userData.email = `emergency_${Date.now()}@swiftride.temp`;
  }
  
  // Generate a random password
  const tempPassword = Math.random().toString(36).slice(-8);
  
  const newUser: UserData = {
    id: Date.now().toString(),
    name: userData.name || 'Emergency User',
    email: userData.email,
    phone: userData.phone,
    bloodGroup: userData.bloodGroup,
    address: userData.address,
    password: tempPassword,
    location: userData.location,
    emergencyRequest: true,
    requestTime: new Date().toISOString()
  };
  
  return addUser(newUser);
};

