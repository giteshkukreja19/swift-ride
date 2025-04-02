
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import EmergencyCTA from '@/components/EmergencyCTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
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
