
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import EmergencyCTA from '@/components/EmergencyCTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Ambulance as AmbulanceIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <section className="py-8 bg-swift-light">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-swift-dark mb-4">Real-time Ambulance Tracking</h2>
              <p className="text-gray-600 text-center max-w-2xl mb-6">
                Monitor our ambulance fleet with GPS precision. Track location, status, and estimated arrival times in real-time.
              </p>
              <div className="flex gap-4">
                <Link to="/tracking">
                  <Button className="bg-swift-red hover:bg-red-700 text-white flex items-center gap-2">
                    <AmbulanceIcon size={18} />
                    Ambulance Service
                  </Button>
                </Link>
                <Link to="/tracking">
                  <Button variant="outline" className="border-swift-red text-swift-red hover:bg-swift-red/10 flex items-center gap-2">
                    <Navigation size={18} />
                    GPS Tracking
                  </Button>
                </Link>
              </div>
            </div>
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
