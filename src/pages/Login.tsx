
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import LocationMap from '@/components/LocationMap';
import EmergencyRequestButton from '@/components/EmergencyRequestButton';
import { useLocation } from '@/hooks/use-location';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  bloodGroup: z.string().min(1, { message: "Please select your blood group" }),
  address: z.string().min(5, { message: "Please enter your address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const { userLocation, locationStatus, fetchAddressFromCoordinates } = useLocation();
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      bloodGroup: '',
      address: '',
      password: '',
    },
  });

  // Update address field when location is found
  useEffect(() => {
    if (locationStatus === 'success' && userLocation) {
      fetchAddressFromCoordinates(userLocation.lat, userLocation.lng).then(address => {
        if (address) {
          form.setValue('address', address);
        }
      });
    }
  }, [locationStatus, userLocation, fetchAddressFromCoordinates, form]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 rounded-full bg-swift-red flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M3 9h11v7c0 .55 .45 1 1 1h2"></path>
                  <path d="M6 8v-3a1 1 0 0 1 1 -1h2"></path>
                  <path d="M15 8h4a1 1 0 0 1 1 1v3.5"></path>
                  <path d="M14 11v4h4"></path>
                  <path d="M14 8v3"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-swift-red">Swift Ride Rescue</h1>
            <p className="text-gray-600 mt-2">Access your health dashboard</p>
          </div>
          
          <Card className="border-2 border-swift-red/10 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-swift-red/5 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-swift-red" />
                Log In
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <LoginForm 
                form={form} 
                locationStatus={locationStatus}
                userLocation={userLocation}
              />
              
              <div className="mt-6">
                <EmergencyRequestButton 
                  form={form}
                  userLocation={userLocation}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
              <Button variant="link" size="sm" asChild className="px-0">
                <Link to="/forgot-password">Forgot password?</Link>
              </Button>
              <Button variant="link" size="sm" asChild className="px-0">
                <Link to="/register">Create an account</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <LocationMap 
            location={userLocation} 
            className="mt-6"
          />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need emergency services? <Link to="/" className="text-swift-red font-medium">Return to home</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
