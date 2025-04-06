
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/use-location';
import { MapPin, User, Phone, Droplet, Home, Navigation } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LocationMap from '@/components/LocationMap';
import LocationStatus from '@/components/LocationStatus';
import EmergencyRequestButton from '@/components/EmergencyRequestButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NearbyHospitals from '@/components/NearbyHospitals';
import { useNavigate } from 'react-router-dom';

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your full name" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  bloodGroup: z.string().min(1, { message: "Please select your blood group" }),
  address: z.string().min(5, { message: "Please enter your address" }).optional(),
  notes: z.string().optional(),
});

const bloodGroups = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

const EmergencyRequest = () => {
  const navigate = useNavigate();
  const { userLocation, locationStatus, fetchAddressFromCoordinates } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      bloodGroup: '',
      address: '',
      notes: '',
    },
  });

  // Update address field when location is found
  React.useEffect(() => {
    if (locationStatus === 'success' && userLocation) {
      fetchAddressFromCoordinates(userLocation.lat, userLocation.lng).then(address => {
        if (address) {
          form.setValue('address', address);
        }
      });
    }
  }, [locationStatus, userLocation, fetchAddressFromCoordinates, form]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-swift-red">Emergency Ambulance Request</h1>
            <p className="text-gray-600 mt-2">Please fill in your details for immediate assistance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Emergency Form */}
            <Card className="border-2 border-swift-red/10 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-swift-red/5 to-transparent">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-swift-red" />
                  Request Emergency Assistance
                </CardTitle>
                <CardDescription>
                  Fill in your details below. We'll dispatch help immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="h-4 w-4 text-swift-red" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-swift-red" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-swift-red" />
                            Blood Group
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your blood group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bloodGroups.map((group) => (
                                <SelectItem key={group} value={group}>{group}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-swift-red" />
                            Address
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input placeholder="Your location address" {...field} />
                            </FormControl>
                            <div className="absolute right-2 top-2.5">
                              <LocationStatus status={locationStatus} />
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <textarea 
                              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Any medical conditions, allergies, or specific needs" 
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                
                <div className="mt-6">
                  <EmergencyRequestButton 
                    form={form}
                    userLocation={userLocation}
                  />
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-xs text-gray-500">
                    Your information is securely transmitted and only used for emergency purposes.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = 'tel:102'}
                  className="text-swift-red border-swift-red hover:bg-swift-red/10"
                >
                  Call Emergency (102)
                </Button>
              </CardFooter>
            </Card>
            
            {/* Location and Hospitals */}
            <div className="space-y-6">
              <LocationMap 
                location={userLocation}
                className="shadow-lg"
              />
              
              <NearbyHospitals />
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-lg">
            <h2 className="text-lg font-semibold text-swift-red flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              How It Works
            </h2>
            <ol className="mt-2 space-y-2 list-decimal list-inside text-sm text-gray-700">
              <li>Fill in your personal details and medical information</li>
              <li>Allow location access or manually input your address</li>
              <li>Click "Share Location & Request Ambulance"</li>
              <li>An ambulance will be dispatched to your location immediately</li>
              <li>You'll receive a tracking link to monitor the ambulance's arrival</li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmergencyRequest;
