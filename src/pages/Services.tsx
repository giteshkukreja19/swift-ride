
import React from 'react';
import Header from '@/components/Header';
import Services from '@/components/Services';
import EmergencyCTA from '@/components/EmergencyCTA';
import Footer from '@/components/Footer';

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-20 bg-swift-dark text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive emergency and non-emergency medical transport solutions
            </p>
          </div>
        </div>
        <Services />
        <EmergencyCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
