
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import EmergencyCTA from '@/components/EmergencyCTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import EmergencyButton from '@/components/EmergencyButton';
import AIHealthAssistant from '@/components/AIHealthAssistant';
import NearbyHospitals from '@/components/NearbyHospitals';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Ambulance as AmbulanceIcon, Stethoscope, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-8 bg-swift-light">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-swift-dark mb-4">Emergency Services at Your Fingertips</h2>
              <p className="text-gray-600 text-center max-w-2xl mb-6">
                Fast and reliable emergency medical services with real-time tracking, health guidance, and nearby hospital information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <EmergencyButton />
                <Link to="/tracking" className="w-full md:w-auto">
                  <Button variant="outline" className="border-swift-red text-swift-red hover:bg-swift-red/10 flex items-center gap-2 w-full md:w-auto px-8 py-6">
                    <Navigation size={18} />
                    Track Ambulance
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-swift-dark">Complete Emergency Services</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Swift Ride Rescue provides comprehensive emergency services to help you in critical situations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AmbulanceIcon className="h-7 w-7 text-swift-red" />
                </div>
                <h3 className="text-xl font-bold text-swift-dark mb-2">One-Tap Ambulance</h3>
                <p className="text-gray-600">
                  Request an ambulance with a single tap and track its arrival in real-time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-swift-dark mb-2">Nearby Hospitals</h3>
                <p className="text-gray-600">
                  Find the closest hospitals and emergency care facilities with wait times.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-swift-dark mb-2">AI Health Assistant</h3>
                <p className="text-gray-600">
                  Get basic guidance for common health issues and medical concerns.
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="assistance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="assistance" className="flex items-center gap-1">
                  <Stethoscope className="h-4 w-4" />
                  <span className="hidden sm:inline">Health Assistant</span>
                </TabsTrigger>
                <TabsTrigger value="hospitals" className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Nearby Hospitals</span>
                </TabsTrigger>
                <TabsTrigger value="tracking" className="flex items-center gap-1">
                  <Navigation className="h-4 w-4" />
                  <span className="hidden sm:inline">Ambulance Service</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="assistance" className="mt-6">
                <AIHealthAssistant />
              </TabsContent>
              <TabsContent value="hospitals" className="mt-6">
                <NearbyHospitals />
              </TabsContent>
              <TabsContent value="tracking" className="mt-6">
                <div className="flex flex-col items-center text-center">
                  <AmbulanceIcon className="h-12 w-12 text-swift-red mb-4" />
                  <h3 className="text-xl font-bold text-swift-dark mb-2">Real-Time Ambulance Tracking</h3>
                  <p className="text-gray-600 max-w-xl mb-6">
                    Monitor our ambulance fleet with GPS precision. Track location, status, and estimated arrival times.
                  </p>
                  <Link to="/tracking">
                    <Button className="bg-swift-red hover:bg-red-700 text-white flex items-center gap-2">
                      <AmbulanceIcon size={18} />
                      View Ambulance Tracking
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <HowItWorks />
        <Services />
        <Testimonials />
        <EmergencyCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
