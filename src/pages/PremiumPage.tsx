
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Crown, Bell, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReminders } from '@/contexts/ReminderContext';

const PremiumPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setPremiumUser } = useReminders();
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  const handleUpgrade = () => {
    setIsUpgrading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Set user as premium
      setPremiumUser(true);
      
      // Show success toast
      toast({
        title: "Premium Activated",
        description: "You now have access to all premium features!",
        variant: "default"  // Changed from "success" to "default" which is allowed
      });
      
      // Navigate to reminders page
      navigate('/reminders');
      
      setIsUpgrading(false);
    }, 2000);
  };
  
  const features = [
    {
      title: "Medication Reminders",
      description: "Set up alerts for your medication schedule to never miss a dose",
      icon: <Bell className="h-6 w-6 text-swift-red" />
    },
    {
      title: "Priority Emergency Service",
      description: "Get faster response times during emergencies",
      icon: <Ambulance className="h-6 w-6 text-swift-red" />
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-swift-red/10 p-3 rounded-full mb-4">
              <Crown className="h-12 w-12 text-swift-red" />
            </div>
            <h1 className="text-3xl font-bold text-swift-dark">Upgrade to Premium</h1>
            <p className="mt-2 text-gray-600">
              Enhance your emergency care with our premium features
            </p>
          </div>
          
          <Card className="border-2 border-swift-red/10 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Swift Ride Rescue Premium</span>
                <span className="text-swift-red font-bold">$9.99/month</span>
              </CardTitle>
              <CardDescription>
                Access exclusive features to enhance your healthcare experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-swift-red hover:bg-swift-red/90 text-white"
                disabled={isUpgrading}
                onClick={handleUpgrade}
              >
                {isUpgrading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-5 w-5" />
                    Upgrade Now
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              By upgrading, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PremiumPage;

// Missing import for Ambulance icon
import { Ambulance } from 'lucide-react';
