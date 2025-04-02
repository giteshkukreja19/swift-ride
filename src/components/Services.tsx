
import React from 'react';
import { Ambulance, Heart, Medal, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const servicesData = [
  {
    icon: Ambulance,
    title: "Emergency Transport",
    description: "Rapid response ambulance services for medical emergencies, accidents, and urgent situations.",
    bgColor: "bg-red-50"
  },
  {
    icon: Users,
    title: "Non-Emergency Transport",
    description: "Scheduled medical transport for hospital visits, transfers between facilities, and doctor appointments.",
    bgColor: "bg-blue-50"
  },
  {
    icon: Heart,
    title: "Critical Care Transport",
    description: "Specialized transport with advanced life support capabilities for critical patients.",
    bgColor: "bg-green-50"
  },
  {
    icon: Medal,
    title: "Special Event Coverage",
    description: "Dedicated ambulance and medical staff for sports events, concerts, and public gatherings.",
    bgColor: "bg-yellow-50"
  }
];

const Services = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-swift-dark">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Swift Ride Rescue offers a comprehensive range of medical transport services to meet all emergency and non-emergency needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              <div className={`${service.bgColor} p-6`}>
                <service.icon className="h-12 w-12 text-swift-red" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-swift-dark">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
