
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Laptop, ArrowRight } from "lucide-react";

const AppDownload = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-swift-dark mb-6 text-center">
              Download Swift Ride Rescue App
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-64 h-96 bg-gray-100 rounded-3xl overflow-hidden border-8 border-gray-200">
                    <div className="absolute top-0 w-1/2 h-6 bg-gray-200 left-1/4 rounded-b-xl"></div>
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center p-4">
                        <Smartphone size={80} className="mx-auto text-swift-red mb-4" />
                        <h3 className="text-xl font-bold text-swift-dark">Swift Ride Rescue</h3>
                        <p className="text-gray-500 mt-2">Mobile App</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold text-swift-dark mb-4">
                    Get Immediate Access on Your Phone
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Download our mobile app for faster access to emergency services, real-time ambulance tracking, and immediate medical assistance.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-swift-dark flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-swift-red text-white flex items-center justify-center">1</span>
                        For Android Users
                      </h3>
                      <div className="ml-10 mt-2">
                        <Button className="bg-swift-red hover:bg-red-700 text-white w-full md:w-auto flex items-center gap-2">
                          <Download size={18} />
                          Download APK File
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                          After downloading, open the file to install the app
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-swift-dark flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-swift-red text-white flex items-center justify-center">2</span>
                        For iOS Users
                      </h3>
                      <div className="ml-10 mt-2">
                        <p className="text-sm text-gray-600">
                          iOS version coming soon! Please use our mobile website for now.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-swift-dark mb-4">
                  Why Download Our App?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-swift-red flex-shrink-0 mt-1" size={18} />
                    <span>One-tap emergency ambulance request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-swift-red flex-shrink-0 mt-1" size={18} />
                    <span>Real-time ambulance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-swift-red flex-shrink-0 mt-1" size={18} />
                    <span>Store medical history and emergency contacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="text-swift-red flex-shrink-0 mt-1" size={18} />
                    <span>Works offline in emergency mode</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Having trouble downloading? Contact our support team for assistance.
              </p>
              <Button variant="outline" className="border-swift-red text-swift-red hover:bg-swift-red/10">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppDownload;
