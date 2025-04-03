
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Phone, Droplet, MapPin, Edit, Save, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bloodGroup?: string;
  address?: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state for editing
  const [editableData, setEditableData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast({
        title: "Not logged in",
        description: "Please log in to view your profile",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // Get user data from local storage
    try {
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        setEditableData(parsedData);
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      toast({
        title: "Error",
        description: "Could not load user data",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const handleEditToggle = () => {
    if (isEditing && editableData) {
      // Save changes
      localStorage.setItem('user', JSON.stringify(editableData));
      setUserData(editableData);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableData) {
      setEditableData({
        ...editableData,
        [name]: value
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swift-red"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-swift-dark mb-6">My Profile</h1>
          
          {userData && (
            <Card className="border-2 border-swift-red/10 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-swift-red/5 to-transparent relative pb-6">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="h-24 w-24 rounded-full bg-swift-red/10 border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-swift-red">
                      {userData.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="pt-12 text-center">
                  <CardTitle className="text-2xl font-bold text-swift-dark">
                    {userData.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {userData.email}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {isEditing ? (
                    // Editable form
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="phone"
                            value={editableData?.phone || ''}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Blood Group</label>
                        <div className="relative">
                          <Droplet className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="bloodGroup"
                            value={editableData?.bloodGroup || ''}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            name="address"
                            value={editableData?.address || ''}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // Read-only view
                    <>
                      <div className="flex items-start p-3 rounded-lg bg-gray-50">
                        <Phone className="h-5 w-5 text-swift-red mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="text-base font-medium text-gray-900">{userData.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-3 rounded-lg bg-gray-50">
                        <Droplet className="h-5 w-5 text-swift-red mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Blood Group</p>
                          <p className="text-base font-medium text-gray-900">{userData.bloodGroup || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-3 rounded-lg bg-gray-50 md:col-span-2">
                        <MapPin className="h-5 w-5 text-swift-red mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-base font-medium text-gray-900">{userData.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-swift-dark mb-2">Emergency Information</h3>
                  <p className="text-gray-600 text-sm">
                    Your blood group and address information are critical in case of emergencies. Please keep them updated.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between border-t p-6">
                <Button 
                  variant="outline" 
                  onClick={handleEditToggle}
                  className="w-full sm:w-auto"
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="w-full sm:w-auto"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
