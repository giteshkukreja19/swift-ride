
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ambulanceService } from '@/services/ambulanceService';
import { hospitalService, Hospital, HospitalWithDistance } from '@/services/hospitalService';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from '@/hooks/use-location';
import { MapPin, Navigation, AlertCircle, Lock, Unlock, Eye, EyeOff, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Define Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

// Extended Map type to include our custom properties
interface ExtendedMap extends google.maps.Map {
  placesService?: google.maps.places.PlacesService;
}

interface MapProps {
  className?: string;
}

const MapComponent: React.FC<MapProps> = ({ className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<ExtendedMap | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [nearbyHospitals, setNearbyHospitals] = useState<HospitalWithDistance[]>([]);
  const { userLocation } = useLocation();
  const { toast } = useToast();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  
  // Check if password is stored in session storage
  useEffect(() => {
    const isVerified = sessionStorage.getItem('mapPasswordVerified') === 'true';
    if (isVerified) {
      setIsPasswordVerified(true);
    }
  }, []);

  // Fetch ambulances with React Query
  const { data: ambulances, isLoading: isLoadingAmbulances } = useQuery({
    queryKey: ['ambulances'],
    queryFn: ambulanceService.getAmbulances,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
    enabled: isPasswordVerified // Only fetch if password is verified
  });

  // Handle password verification
  const handleVerifyPassword = () => {
    setIsSubmitting(true);
    setPasswordError(null);
    
    // Simple timeout to simulate verification process
    setTimeout(() => {
      if (password === 'Great19@') {
        setIsPasswordVerified(true);
        sessionStorage.setItem('mapPasswordVerified', 'true');
        toast({
          title: "Access Granted",
          description: "Map access has been unlocked",
          variant: "default"
        });
      } else {
        setPasswordError("Incorrect password. Please try again.");
        toast({
          title: "Access Denied",
          description: "The password you entered is incorrect",
          variant: "destructive"
        });
      }
      setIsSubmitting(false);
    }, 800);
  };

  // Initialize the map when component mounts and password is verified
  useEffect(() => {
    if (isPasswordVerified && !window.google) {
      // Create script tag
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCBpUdcHgRJlBz8e9xsexa1ssRca5A-C3E&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Define the callback function
      window.initMap = () => {
        if (mapRef.current && userLocation) {
          initializeMap();
        }
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Clean up
        delete window.initMap;
        document.head.removeChild(script);
      };
    } else if (isPasswordVerified && window.google && mapRef.current && userLocation) {
      // If Google Maps API is already loaded and password is verified
      initializeMap();
    }
  }, [userLocation, isPasswordVerified]);

  // Initialize map with user location
  const initializeMap = () => {
    if (!mapRef.current || !userLocation || !isPasswordVerified) return;

    const mapOptions = {
      center: { lat: userLocation.lat, lng: userLocation.lng },
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions) as ExtendedMap;
    setMap(newMap);

    // Add marker for user's location
    const userMarker = new window.google.maps.Marker({
      position: { lat: userLocation.lat, lng: userLocation.lng },
      map: newMap,
      title: 'Your Location',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      }
    });
    
    setMarkers(prevMarkers => [...prevMarkers, userMarker]);

    // Find nearby hospitals
    findNearbyHospitals(userLocation.lat, userLocation.lng, newMap);
    
    // Add Places service for hospital search
    if (window.google && window.google.maps && window.google.maps.places) {
      newMap.placesService = new window.google.maps.places.PlacesService(newMap);
    }
  };

  // Search for hospitals using Google Places API
  const searchHospitals = () => {
    if (!map || !userLocation || !searchQuery.trim()) return;
    
    if (map.placesService) {
      const request = {
        location: { lat: userLocation.lat, lng: userLocation.lng },
        radius: 5000, // 5km radius
        type: 'hospital',
        keyword: searchQuery
      };
      
      map.placesService.nearbySearch(request, (results: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Clear existing markers
          clearExistingMarkers();
          
          // Add user location marker
          const userMarker = new window.google.maps.Marker({
            position: { lat: userLocation.lat, lng: userLocation.lng },
            map: map,
            title: 'Your Location',
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }
          });
          
          setMarkers(prevMarkers => [...prevMarkers, userMarker]);
          
          // Process results and add markers
          const mappedResults = results.map((result: any) => {
            const hospital: Hospital = {
              id: result.place_id,
              name: result.name,
              address: result.vicinity,
              location: { 
                lat: result.geometry.location.lat(), 
                lng: result.geometry.location.lng() 
              },
              vicinity: result.vicinity,
              phone: result.formatted_phone_number,
              rating: result.rating
            };
            
            // Calculate distance
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              hospital.location.lat,
              hospital.location.lng
            );
            
            return {
              ...hospital,
              distance
            };
          }).sort((a: HospitalWithDistance, b: HospitalWithDistance) => a.distance - b.distance);
          
          // Update hospitals state
          setNearbyHospitals(mappedResults);
          
          // Add markers for each hospital
          mappedResults.forEach((hospital: HospitalWithDistance) => {
            addHospitalMarker(hospital, map);
          });
          
          toast({
            title: "Search Complete",
            description: `Found ${mappedResults.length} hospitals matching "${searchQuery}"`,
            variant: "default"
          });
        } else {
          toast({
            title: "Search Error",
            description: `No hospitals found matching "${searchQuery}"`,
            variant: "destructive"
          });
        }
      });
    } else {
      // Fallback to our service if Places API is not available
      const filteredHospitals = hospitalService.searchHospitals(searchQuery);
      setNearbyHospitals(filteredHospitals.map(hospital => ({
        ...hospital,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.location.lat,
          hospital.location.lng
        )
      })));
      
      if (map) {
        clearExistingMarkers();
        
        // Add user location marker
        const userMarker = new window.google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          map,
          title: 'Your Location',
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }
        });
        
        setMarkers(prevMarkers => [...prevMarkers, userMarker]);
        
        filteredHospitals.forEach(hospital => {
          const hospitalWithDistance = {
            ...hospital,
            distance: calculateDistance(
              userLocation.lat,
              userLocation.lng,
              hospital.location.lat,
              hospital.location.lng
            )
          };
          addHospitalMarker(hospitalWithDistance, map);
        });
      }
    }
  };
  
  // Clear existing markers on the map
  const clearExistingMarkers = () => {
    // Remove all markers from the map
    markers.forEach(marker => marker.setMap(null));
    // Clear the markers array
    setMarkers([]);
  };

  // Find nearby hospitals using our service
  const findNearbyHospitals = (lat: number, lng: number, googleMap: google.maps.Map) => {
    const hospitals = hospitalService.findNearbyHospitals(lat, lng, 10);
    
    setNearbyHospitals(hospitals);
    
    // Add markers for each hospital
    hospitals.forEach(hospital => {
      addHospitalMarker(hospital, googleMap);
    });

    toast({
      title: "Hospitals Found",
      description: `${hospitals.length} hospitals found nearby`,
      variant: "default"
    });
  };
  
  // Add a marker for a hospital
  const addHospitalMarker = (hospital: HospitalWithDistance, googleMap: google.maps.Map) => {
    const marker = new window.google.maps.Marker({
      position: { lat: hospital.location.lat, lng: hospital.location.lng },
      map: googleMap,
      title: hospital.name,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      }
    });

    setMarkers(prevMarkers => [...prevMarkers, marker]);

    // Add info window for the hospital
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="max-width: 200px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${hospital.name}</h3>
          <p style="margin: 5px 0; font-size: 12px;">${hospital.address}</p>
          <p style="margin: 5px 0; font-size: 12px;"><b>Distance:</b> ${hospital.distance.toFixed(2)} km</p>
          ${hospital.phone ? `<p style="margin: 5px 0; font-size: 12px;"><b>Phone:</b> ${hospital.phone}</p>` : ''}
        </div>
      `
    });

    // Open info window when marker is clicked
    marker.addListener('click', () => {
      infoWindow.open(googleMap, marker);
      setSelectedHospital(hospital);
    });
  };
  
  // Calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
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

  // Show ambulances on map when data is available
  useEffect(() => {
    if (map && ambulances && ambulances.length > 0) {
      ambulances.forEach(ambulance => {
        const marker = new window.google.maps.Marker({
          position: { lat: ambulance.lat, lng: ambulance.lng },
          map,
          title: ambulance.vehicleNumber,
          icon: {
            url: ambulance.status === 'available' 
              ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
              : ambulance.status === 'en-route'
                ? 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        });
        
        setMarkers(prevMarkers => [...prevMarkers, marker]);

        // Add info window for each ambulance
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 200px;">
              <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${ambulance.vehicleNumber}</h3>
              <p style="margin: 5px 0; font-size: 12px;"><b>Status:</b> ${ambulance.status}</p>
              <p style="margin: 5px 0; font-size: 12px;"><b>Type:</b> ${ambulance.vehicleType}</p>
              <p style="margin: 5px 0; font-size: 12px;"><b>Contact:</b> ${ambulance.contactNumber}</p>
            </div>
          `
        });

        // Open info window when marker is clicked
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, ambulances]);

  // Password verification UI
  const renderPasswordVerification = () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border-2 border-gray-200">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 mx-auto text-swift-red mb-2" />
            <h2 className="text-2xl font-bold text-swift-dark">Map Access Required</h2>
            <p className="text-gray-600 mt-2">
              Please enter the password to access the map and ambulance tracking features.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="map-password">Password</Label>
              <div className="relative">
                <Input
                  id="map-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter access password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && password) {
                      e.preventDefault();
                      handleVerifyPassword();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>

            <Button 
              onClick={handleVerifyPassword}
              disabled={!password || isSubmitting}
              className="w-full bg-swift-red hover:bg-red-700"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center">
                  <Unlock className="h-4 w-4 mr-2" />
                  Unlock Map Access
                </span>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              This map access is restricted to authorized personnel only.
              <br />
              If you don't know the password, please contact the administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render hospital search UI
  const renderHospitalSearch = () => {
    if (!isPasswordVerified || !userLocation) return null;
    
    return (
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 p-3 border-b shadow-sm">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search for hospitals"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery) {
                  e.preventDefault();
                  searchHospitals();
                }
              }}
            />
            {searchQuery && (
              <button
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <span className="sr-only">Clear</span>
                &times;
              </button>
            )}
          </div>
          <Button 
            size="sm" 
            onClick={searchHospitals}
            disabled={!searchQuery.trim()}
            className="bg-swift-red hover:bg-red-700"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className={`${className} overflow-hidden`}>
      <CardContent className="p-0 relative">
        {!isPasswordVerified ? (
          renderPasswordVerification()
        ) : !userLocation ? (
          <div className="flex items-center justify-center h-[500px] bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md">
              <AlertCircle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Location Required</h3>
              <p className="text-gray-600 mb-4">
                Please enable location services to see nearby hospitals and ambulances.
              </p>
            </div>
          </div>
        ) : (
          <>
            {renderHospitalSearch()}
            <div ref={mapRef} className="w-full h-[500px]"></div>
          </>
        )}
        
        {/* Loading overlay */}
        {(isLoadingAmbulances || !map) && userLocation && isPasswordVerified && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-swift-red mr-3"></div>
                <span>Loading map data...</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapComponent;
