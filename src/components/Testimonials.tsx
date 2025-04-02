
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    quote: "Swift Ride Rescue got an ambulance to me in under 5 minutes when I was experiencing chest pain. The ease of use and quick response may have saved my life.",
    stars: 5
  },
  {
    name: "Michael Torres",
    role: "Healthcare Provider",
    quote: "As an ER doctor, I've seen how Swift Ride Rescue has improved emergency response times in our community. Their integration with our hospital system streamlines the entire process.",
    stars: 5
  },
  {
    name: "Emily Chen",
    role: "Caregiver",
    quote: "My elderly mother needed regular transport to dialysis treatments. Swift Ride Rescue made scheduling recurring non-emergency transport simple and stress-free.",
    stars: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-swift-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">What People Are Saying</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Swift Ride Rescue has helped thousands of people get the emergency medical transport they need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.stars ? 'text-swift-gold fill-swift-gold' : 'text-gray-500'}`} 
                  />
                ))}
              </div>
              <p className="italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-swift-red rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
