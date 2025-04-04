
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';
import { createEmergencyRequest } from '@/utils/emergencyService';

interface EmergencyRequestButtonProps {
  form: UseFormReturn<any>;
  userLocation: { lat: number; lng: number } | null;
}

const EmergencyRequestButton: React.FC<EmergencyRequestButtonProps> = ({ form, userLocation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmergencyAccess = async () => {
    setIsLoading(true);
    
    try {
      // Validate required fields
      const name = form.getValues('name');
      const phone = form.getValues('phone');
      const bloodGroup = form.getValues('bloodGroup');
      const address = form.getValues('address');
      const notes = form.getValues('notes');
      
      let isValid = true;
      let missingFields = [];
      
      if (!name || name.length < 2) {
        form.setError('name', { message: 'Name is required for emergency services' });
        isValid = false;
        missingFields.push('name');
      }
      
      if (!phone || phone.length < 10) {
        form.setError('phone', { message: 'Valid phone number is required for emergency services' });
        isValid = false;
        missingFields.push('phone number');
      }
      
      if (!bloodGroup) {
        form.setError('bloodGroup', { message: 'Blood group is required for emergency services' });
        isValid = false;
        missingFields.push('blood group');
      }
      
      if (!address && !userLocation) {
        form.setError('address', { message: 'Address or location access is required for emergency services' });
        isValid = false;
        missingFields.push('address or location access');
      }
      
      if (!isValid) {
        toast({
          title: "Missing Information",
          description: `Please provide your ${missingFields.join(', ')} for emergency services`,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // All required fields are present, proceed with emergency request
      const emergencyRequest = createEmergencyRequest({
        name,
        phone,
        bloodGroup,
        address,
        notes,
        location: userLocation,
      });
      
      if (!emergencyRequest) {
        throw new Error('Failed to create emergency request');
      }
      
      // Store emergency request data for the session
      localStorage.setItem('current_emergency_request', JSON.stringify(emergencyRequest));
      
      // Show success toast
      toast({
        title: "Emergency Request Sent",
        description: "Your location has been shared. Ambulance dispatched to your location!",
        variant: "destructive"
      });
      
      // Navigate to ambulance tracking page
      navigate('/tracking');
    } catch (error) {
      console.error('Emergency request error:', error);
      toast({
        title: "Error",
        description: "Failed to process emergency request. Please try again or call emergency services directly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleEmergencyAccess}
      className="w-full emergency-gradient text-white hover:bg-red-700 flex items-center justify-center py-6 text-lg font-bold"
      variant="destructive"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing Request...
        </>
      ) : (
        <>
          <Navigation className="mr-2 h-6 w-6" />
          Share Location & Request Ambulance
        </>
      )}
    </Button>
  );
};

export default EmergencyRequestButton;
