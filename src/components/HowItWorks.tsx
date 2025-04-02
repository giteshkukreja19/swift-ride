
import React from 'react';
import { Smartphone, MapPin, Ambulance, Clock } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Request Service",
    description: "Open our app or website and request emergency medical transport with a single tap."
  },
  {
    icon: MapPin,
    title: "Share Location",
    description: "Your exact location is automatically shared with our dispatchers and nearby ambulance services."
  },
  {
    icon: Ambulance,
    title: "Immediate Dispatch",
    description: "The closest available ambulance is dispatched to your location immediately."
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Track the ambulance's arrival time and receive updates throughout the entire process."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-swift-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-swift-dark">How Swift Ride Rescue Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform connects those in need with emergency medical transport services quickly and efficiently.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-swift-red text-white flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-swift-red">
                  <step.icon size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-swift-dark">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
