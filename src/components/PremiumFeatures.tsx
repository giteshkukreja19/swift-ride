
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Crown, Clock, ArrowRight } from 'lucide-react';
import { useReminders } from '@/contexts/ReminderContext';

const PremiumFeatures = () => {
  const navigate = useNavigate();
  const { isPremiumUser } = useReminders();
  
  return (
    <Card className="border border-swift-red/20 shadow-sm bg-white">
      <CardHeader className="bg-gradient-to-r from-swift-red/5 to-transparent">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Crown className="h-5 w-5 text-swift-red mr-2" />
            Premium Features
          </CardTitle>
          {isPremiumUser && (
            <span className="bg-swift-red/10 text-swift-red text-xs px-2 py-1 rounded-full font-medium">
              ACTIVE
            </span>
          )}
        </div>
        <CardDescription>
          {isPremiumUser 
            ? "Your premium account is active. Enjoy these benefits:" 
            : "Upgrade to unlock these special features:"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-start">
            <Bell className="h-5 w-5 text-swift-red mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">Medication Reminders</h3>
              <p className="text-xs text-gray-600">
                Set and receive timely alerts for your medications
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-swift-red mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">Priority Emergency Service</h3>
              <p className="text-xs text-gray-600">
                Faster response times during emergencies
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isPremiumUser ? (
          <Button 
            variant="outline" 
            className="w-full text-swift-red"
            onClick={() => navigate('/reminders')}
          >
            Manage Your Reminders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            className="w-full bg-swift-red hover:bg-swift-red/90"
            onClick={() => navigate('/premium')}
          >
            Upgrade to Premium
            <Crown className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PremiumFeatures;
