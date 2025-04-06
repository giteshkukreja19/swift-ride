
interface Hospital {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  vicinity: string;
  description?: string;
  phone?: string;
  website?: string;
  rating?: number;
  types?: string[];
}

// Extended hospital type that includes distance
export interface HospitalWithDistance extends Hospital {
  distance: number;
}

// In-memory database for hospitals
let hospitals: Hospital[] = [
  {
    id: 'hospital-1',
    name: 'Sushrut Hospital and Research Center',
    address: 'Chembur, Mumbai',
    location: { lat: 19.0522, lng: 72.8994 },
    vicinity: 'Chembur, Mumbai',
    description: 'A multispeciality hospital offering a wide range of medical services with state-of-the-art facilities.',
    phone: '+91-22-25201181'
  },
  {
    id: 'hospital-2',
    name: 'Das Multispeciality Hospital & ICCU',
    address: 'Chembur, Mumbai',
    location: { lat: 19.0559, lng: 72.8922 },
    vicinity: 'Chembur, Mumbai',
    description: 'Provides comprehensive medical and surgical care with an Intensive Coronary Care Unit.',
    phone: '+91-22-25221378'
  },
  {
    id: 'hospital-3',
    name: 'Zen Multi Specialty Hospital',
    address: 'Chembur, Mumbai',
    location: { lat: 19.0619, lng: 72.8978 },
    vicinity: 'Chembur, Mumbai',
    description: 'Offers advanced healthcare services across various specialties with modern infrastructure.',
    phone: '+91-22-25255555'
  },
  {
    id: 'hospital-4',
    name: 'Apollo Spectra Hospitals',
    address: 'Chembur, Mumbai',
    location: { lat: 19.0447, lng: 72.9097 },
    vicinity: 'Chembur, Mumbai',
    description: 'A renowned hospital providing specialized treatments with cutting-edge technology.',
    phone: '+91-22-30814845'
  },
  {
    id: 'hospital-5',
    name: 'Kolekar Multispecialty Hospital & ICCU',
    address: 'Chembur, Mumbai',
    location: { lat: 19.0534, lng: 72.9012 },
    vicinity: 'Chembur, Mumbai',
    description: 'Delivers a range of medical services with intensive care facilities.',
    phone: '+91-22-25282458'
  },
  {
    id: 'hospital-6',
    name: 'Sai Hospital',
    address: 'Chembur, Mumbai',
    location: { lat: 19.0491, lng: 72.8867 },
    vicinity: 'Chembur, Mumbai',
    description: 'A multi-speciality hospital known for its patient-centric approach and comprehensive care.',
    phone: '+91-22-25285907'
  }
];

// Calculate distance between two points
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  // Haversine formula to calculate distance between two points on a sphere
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export const hospitalService = {
  // Get all hospitals
  getAllHospitals: (): Hospital[] => {
    return [...hospitals];
  },

  // Add a hospital to the database
  addHospital: (hospital: Omit<Hospital, 'id'>): Hospital => {
    const newHospital = {
      ...hospital,
      id: `hospital-${hospitals.length + 1}`
    };
    hospitals.push(newHospital);
    return newHospital;
  },

  // Get a hospital by ID
  getHospitalById: (id: string): Hospital | undefined => {
    return hospitals.find(hospital => hospital.id === id);
  },

  // Update a hospital
  updateHospital: (id: string, updatedData: Partial<Hospital>): Hospital | undefined => {
    const index = hospitals.findIndex(hospital => hospital.id === id);
    if (index !== -1) {
      hospitals[index] = { ...hospitals[index], ...updatedData };
      return hospitals[index];
    }
    return undefined;
  },

  // Delete a hospital
  deleteHospital: (id: string): boolean => {
    const initialLength = hospitals.length;
    hospitals = hospitals.filter(hospital => hospital.id !== id);
    return hospitals.length < initialLength;
  },

  // Find nearby hospitals based on user location
  findNearbyHospitals: (userLat: number, userLng: number, maxDistanceKm: number = 10): HospitalWithDistance[] => {
    return hospitals
      .map(hospital => ({
        ...hospital,
        distance: calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng)
      }))
      .filter(hospital => hospital.distance <= maxDistanceKm)
      .sort((a, b) => a.distance - b.distance);
  },

  // Find the nearest hospital
  findNearestHospital: (userLat: number, userLng: number): HospitalWithDistance => {
    return hospitals
      .map(hospital => ({
        ...hospital,
        distance: calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng)
      }))
      .sort((a, b) => a.distance - b.distance)[0];
  },

  // Search hospitals by name or address
  searchHospitals: (query: string): Hospital[] => {
    const lowerQuery = query.toLowerCase();
    return hospitals.filter(
      hospital =>
        hospital.name.toLowerCase().includes(lowerQuery) ||
        hospital.address.toLowerCase().includes(lowerQuery) ||
        hospital.vicinity.toLowerCase().includes(lowerQuery)
    );
  }
};

export type { Hospital, HospitalWithDistance };
