
// User data interface
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bloodGroup?: string;
  address?: string;
  password?: string; // Note: In a real app, never store plain passwords
}

// Database interface
export interface UserDatabase {
  users: UserData[];
}

// Initial database setup
const initDatabase = (): UserDatabase => {
  const existingDB = localStorage.getItem('swift_ride_db');
  if (existingDB) {
    return JSON.parse(existingDB);
  }
  
  // Create new database
  const newDB: UserDatabase = { users: [] };
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

// Get total user count
export const getUserCount = (): number => {
  const db = getDatabase();
  return db.users.length;
};
