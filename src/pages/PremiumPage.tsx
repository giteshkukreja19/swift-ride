
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle, Crown, Bell, Shield, Clock, Heart, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIHealthAssistant from '@/components/AIHealthAssistant';
import { useReminders } from '@/contexts/ReminderContext';
import { toast } from '@/hooks/use-toast';

const PremiumPage = () => {
  const navigate = useNavigate();
  const { setPremiumUser, isPremiumUser } = useReminders();

  const activatePremium = () => {
    setPremiumUser(true);
    toast({
      title: "Premium Activated!",
      description: "You now have access to all premium features.",
      variant: "success",
    });
    navigate('/reminders');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-swift-red mb-3">
              <Crown className="inline-block mr-2" /> Swift Ride Rescue Premium
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your emergency preparedness with our premium features designed to keep you and your loved ones safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <Card className="border-2 border-swift-red/10 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Standard Plan</CardTitle>
                <CardDescription>Basic emergency services</CardDescription>
                <div className="mt-4 text-3xl font-bold">Free</div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Emergency ambulance requests</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Basic ambulance tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Basic health information</span>
                  </li>
                  <li className="flex items-start opacity-50">
                    <AlertCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Medication reminders</span>
                  </li>
                  <li className="flex items-start opacity-50">
                    <AlertCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Priority emergency dispatches</span>
                  </li>
                  <li className="flex items-start opacity-50">
                    <AlertCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>24/7 Medical professional hotline</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button variant="outline" disabled={true}>Current Plan</Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-swift-red shadow-lg bg-gradient-to-b from-white to-swift-red/5 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-swift-red text-white">
                  <Star className="h-3 w-3 mr-1 fill-current" /> RECOMMENDED
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center">
                  Premium Plan <Crown className="h-5 w-5 ml-2 text-yellow-500" />
                </CardTitle>
                <CardDescription>Enhanced emergency protection</CardDescription>
                <div className="mt-4 text-3xl font-bold">$9.99/month</div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Emergency ambulance requests</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Enhanced ambulance tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Comprehensive health information</span>
                  </li>
                  <li className="flex items-start font-medium">
                    <Check className="h-5 w-5 text-swift-red mr-2 mt-0.5" />
                    <span>Medication reminders with alerts</span>
                  </li>
                  <li className="flex items-start font-medium">
                    <Check className="h-5 w-5 text-swift-red mr-2 mt-0.5" />
                    <span>Priority emergency dispatches</span>
                  </li>
                  <li className="flex items-start font-medium">
                    <Check className="h-5 w-5 text-swift-red mr-2 mt-0.5" />
                    <span>24/7 Medical professional hotline</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  variant="default" 
                  className="bg-swift-red hover:bg-swift-red/90" 
                  onClick={activatePremium}
                  disabled={isPremiumUser}
                >
                  {isPremiumUser ? "Already Subscribed" : "Activate Premium"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Bell className="h-12 w-12 text-swift-red mb-4" />
              <h3 className="text-lg font-semibold mb-2">Medication Reminders</h3>
              <p className="text-gray-600">Never miss important medications with customizable reminders and alerts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-swift-red mb-4" />
              <h3 className="text-lg font-semibold mb-2">Priority Response</h3>
              <p className="text-gray-600">Get priority ambulance dispatch during emergencies with VIP handling.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-swift-red mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Access to medical professionals around the clock for advice and guidance.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-4 text-swift-red flex items-center">
              <Heart className="h-6 w-6 mr-2" /> Premium Health Assistant Preview
            </h2>
            <AIHealthAssistant />
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={activatePremium}
              disabled={isPremiumUser}
              className="bg-swift-red hover:bg-swift-red/90"
            >
              <Crown className="mr-2 h-5 w-5" />
              {isPremiumUser ? "You're already a Premium Member" : "Upgrade to Premium Now"}
            </Button>
            {!isPremiumUser && (
              <p className="mt-2 text-sm text-gray-500">
                No credit card required for this demo. Click to instantly activate premium features.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PremiumPage;
