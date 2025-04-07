
import React from 'react';
import { Button } from "@/components/ui/button";
import { Ambulance, Clock, MapPin, Download } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const handleEmergencyRequest = () => {
    navigate('/emergency');
  };
  
  const handleDownloadApp = () => {
    // For mobile devices, directly start the download
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && /Android/i.test(navigator.userAgent)) {
      // For Android mobile devices, directly start the APK download
      window.location.href = '/downloads/swift-ride-rescue.apk';
    } else {
      // For desktop or iOS, navigate to the app download instructions page
      navigate('/app-download');
    }
  };

  return (
    <section className="hero-pattern py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swift-dark mb-6">
                Emergency Medical Transport 
                <span className="text-swift-red block mt-2">When You Need It Most</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Swift Ride Rescue connects you with emergency medical transport services instantly. Our app-based platform gets help to your location quickly, providing peace of mind when every second counts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleEmergencyRequest}
                  className="bg-swift-red hover:bg-red-700 text-white text-lg px-8 py-6 rounded-md"
                >
                  <Ambulance className="mr-2 h-6 w-6" />
                  Request Ambulance
                </Button>
                <Button 
                  variant="outline" 
                  className="border-swift-red text-swift-red hover:bg-swift-red hover:text-white text-lg px-8 py-6 rounded-md"
                  onClick={handleDownloadApp}
                >
                  <Download className="mr-2 h-6 w-6" />
                  Download App
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="w-full h-80 md:h-[450px] bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400">
                  <Ambulance size={120} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>Fast Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>Exact Location</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-swift-gold text-swift-dark font-bold py-2 px-4 rounded-full animate-pulse-light">
              Available 24/7
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
