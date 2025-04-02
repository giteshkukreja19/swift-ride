
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
import { MapPin } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <section className="py-8 bg-swift-light">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <Link to="/tracking">
                <Button className="bg-swift-dark hover:bg-gray-800 text-white flex items-center gap-2">
                  <MapPin size={18} />
                  Track Our Ambulances
                </Button>
              </Link>
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
