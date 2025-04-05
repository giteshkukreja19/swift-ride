
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, Calendar, Trash2, Plus, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useReminders, Reminder } from '@/contexts/ReminderContext';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const Reminders = () => {
  const navigate = useNavigate();
  const { reminders, addReminder, deleteReminder } = useReminders();
  
  const [newReminder, setNewReminder] = useState({
    message: '',
    time: '',
    isRecurring: false,
    recurringPattern: 'daily' as 'daily' | 'weekly' | 'monthly',
    isPremium: true
  });
  
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReminder.message) {
      toast({
        title: "Missing information",
        description: "Please enter a reminder message",
        variant: "destructive",
      });
      return;
    }
    
    if (!newReminder.time) {
      toast({
        title: "Missing information",
        description: "Please select a time for the reminder",
        variant: "destructive",
      });
      return;
    }
    
    addReminder(newReminder);
    
    toast({
      title: "Reminder Added",
      description: "Your medication reminder has been scheduled",
      variant: "default"  // Changed from "success" to "default" which is allowed
    });
    
    setNewReminder({
      message: '',
      time: '',
      isRecurring: false,
      recurringPattern: 'daily',
      isPremium: true
    });
  };
  
  const formatReminderTime = (time: string) => {
    const date = new Date(time);
    return format(date, 'MMM d, yyyy h:mm a');
  };
  
  const handleDelete = (id: string) => {
    deleteReminder(id);
    toast({
      title: "Reminder Deleted",
      description: "Your medication reminder has been removed",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-swift-red flex items-center justify-center">
              <Bell className="h-8 w-8 mr-3 text-swift-red" />
              Medication Reminders
            </h1>
            <p className="text-gray-600 mt-2">
              Never miss an important medication with timely reminders
            </p>
          </div>
          
          <Card className="mb-8 border-2 border-swift-red/10">
            <CardHeader>
              <CardTitle>Add New Reminder</CardTitle>
              <CardDescription>
                Set up a new medication reminder with optional recurring schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddReminder} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="message">Medication Name/Description</Label>
                  <Input 
                    id="message" 
                    placeholder="e.g., Blood Pressure Medication"
                    value={newReminder.message}
                    onChange={(e) => setNewReminder({...newReminder, message: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="time">Reminder Time</Label>
                  <Input 
                    id="time" 
                    type="datetime-local"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="recurring"
                      checked={newReminder.isRecurring}
                      onCheckedChange={(checked) => 
                        setNewReminder({...newReminder, isRecurring: checked})
                      }
                    />
                    <Label htmlFor="recurring">Recurring Reminder</Label>
                  </div>
                  
                  {newReminder.isRecurring && (
                    <Select
                      value={newReminder.recurringPattern}
                      onValueChange={(value: any) => 
                        setNewReminder({...newReminder, recurringPattern: value})
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                
                <Button type="submit" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reminder
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Active Reminders</CardTitle>
              <CardDescription>
                Manage your medication schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reminders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p>You don't have any reminders set.</p>
                  <p className="text-sm">Add your first medication reminder above.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {reminders.map((reminder) => (
                    <li key={reminder.id} className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{reminder.message}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatReminderTime(reminder.time)}
                          {reminder.isRecurring && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                              {reminder.recurringPattern}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500 border-t pt-4">
              <p className="w-full">Reminders will trigger browser notifications when it's time to take your medication.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reminders;
