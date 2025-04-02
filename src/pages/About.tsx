
import React from 'react';
import Header from '@/components/Header';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-20 bg-swift-dark text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Swift Ride Rescue</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our mission is to revolutionize emergency medical transport
            </p>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-swift-dark mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Swift Ride Rescue was founded in 2022 by a team of emergency medical professionals and technology innovators who saw an opportunity to improve emergency response times through modern technology.
                </p>
                <p className="text-gray-600 mb-4">
                  After witnessing the challenges of traditional emergency response systems, our founders created a platform that leverages mobile technology, GPS, and a network of certified ambulance services to provide faster and more efficient emergency medical transport.
                </p>
                <p className="text-gray-600 mb-6">
                  Today, Swift Ride Rescue operates in major cities across the country, helping thousands of people get the emergency medical care they need when every second counts.
                </p>
                <Button className="bg-swift-red hover:bg-red-700 text-white">
                  Join Our Team
                </Button>
              </div>
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">Company Image</span>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
