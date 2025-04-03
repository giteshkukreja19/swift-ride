
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LockKeyhole, AtSign, LogIn, User, Phone, Droplet, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { UseFormReturn } from 'react-hook-form';
import { verifyLogin, getUserByEmail, addUser } from '@/utils/userDatabase';
import LocationStatus from './LocationStatus';

interface LoginFormProps {
  form: UseFormReturn<any>;
  locationStatus: 'idle' | 'loading' | 'success' | 'error';
  userLocation: { lat: number; lng: number } | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, locationStatus, userLocation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    
    try {
      // Check if user exists
      const existingUser = getUserByEmail(values.email);
      
      if (existingUser) {
        // Verify login credentials
        const userData = verifyLogin(values.email, values.password);
        
        if (userData) {
          // Add location data to user session
          const userDataWithLocation = {
            ...userData,
            location: userLocation
          };
          
          // Login successful
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(userDataWithLocation));
          
          toast({
            title: "Login successful",
            description: "Welcome back to Swift Ride Rescue",
          });
          
          navigate('/');
        } else {
          // Invalid password
          toast({
            title: "Login failed",
            description: "Invalid password. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        // User doesn't exist, create a new account
        const newUser = addUser({
          id: Date.now().toString(),
          name: values.name,
          email: values.email,
          phone: values.phone,
          bloodGroup: values.bloodGroup,
          address: values.address,
          password: values.password,
        });
        
        // Add location data to user session
        const userDataWithLocation = {
          ...newUser,
          location: userLocation
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userDataWithLocation));
        
        toast({
          title: "Account created",
          description: "Your account has been created and you're now logged in",
        });
        
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="John Doe"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="you@example.com"
                    className="pl-10"
                    {...field}
                  />
                </div>
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    {...field}
                  />
                </div>
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
              <FormLabel>Blood Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <div className="relative">
                    <Droplet className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select your blood group" />
                    </SelectTrigger>
                  </div>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
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
                Address
                <LocationStatus status={locationStatus} />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="123 Main St, City, State"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-swift-red hover:bg-swift-red/90" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
