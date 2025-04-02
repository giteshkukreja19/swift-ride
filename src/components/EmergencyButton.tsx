
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ambulance, AlertTriangle, MapPin, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from '@/components/ui/dialog';

const EmergencyButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  const handleEmergencyClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmRequest = () => {
    setIsRequesting(true);
    
    // Simulate request processing
    setTimeout(() => {
      setIsRequesting(false);
      setIsConfirmed(true);
      
      // Auto close after showing confirmation
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsConfirmed(false);
        
        toast({
          title: "Ambulance Dispatched",
          description: "An ambulance has been dispatched to your location. ETA: 8 minutes.",
          variant: "default",
        });
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <Button 
        onClick={handleEmergencyClick}
        className="bg-swift-red hover:bg-red-700 text-white text-lg flex items-center gap-2 px-8 py-6 w-full md:w-auto"
      >
        <Ambulance className="h-6 w-6" />
        <span>Request Ambulance</span>
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-swift-red">
              <AlertTriangle className="h-5 w-5" />
              Emergency Ambulance Request
            </DialogTitle>
            <DialogDescription>
              Confirm your request to dispatch an ambulance to your current location.
            </DialogDescription>
          </DialogHeader>
          
          {!isConfirmed ? (
            <>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                <MapPin className="h-5 w-5 text-swift-red flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Your current location</p>
                  <p className="text-xs text-gray-500">123 Main Street, Central City</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                By confirming, you understand that emergency services will be dispatched to your location. 
                False alarms may result in charges.
              </p>
              
              <DialogFooter className="flex sm:justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isRequesting}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  type="button"
                  className="bg-swift-red hover:bg-red-700 text-white"
                  onClick={handleConfirmRequest}
                  disabled={isRequesting}
                >
                  {isRequesting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Ambulance className="mr-2 h-4 w-4" />
                      Confirm Emergency
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Ambulance className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-green-600 mb-2">Ambulance Dispatched!</h3>
              <p className="text-sm text-gray-600 mb-2">An ambulance is on its way to your location.</p>
              <p className="text-sm font-medium">Estimated arrival time: 8 minutes</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;
