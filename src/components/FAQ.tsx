
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is Swift Ride Rescue?",
    answer: "Swift Ride Rescue is an on-demand emergency medical transport service that connects patients with ambulance services through our mobile app and website. We aim to reduce response times and improve access to emergency medical transportation."
  },
  {
    question: "How quickly can I expect an ambulance to arrive?",
    answer: "Response times vary based on your location and the availability of nearby ambulances. In urban areas, our average response time is under 8 minutes. You'll receive real-time updates and can track the ambulance's arrival on our app."
  },
  {
    question: "Is Swift Ride Rescue available in my area?",
    answer: "We're currently operating in major metropolitan areas and expanding rapidly. Enter your location in our app or website to check service availability in your area."
  },
  {
    question: "How much does the service cost?",
    answer: "Costs vary depending on the type of transport needed and your insurance coverage. Emergency transport costs are often covered by insurance. Our app provides transparent pricing before you confirm the service."
  },
  {
    question: "Can I use Swift Ride Rescue for non-emergency medical transport?",
    answer: "Yes! We offer both emergency and non-emergency medical transport services. You can schedule non-emergency transport in advance for hospital visits, transfers, or other medical appointments."
  },
  {
    question: "Is my medical information secure?",
    answer: "Absolutely. Swift Ride Rescue is HIPAA compliant and uses enterprise-grade encryption to protect all personal and medical information. Your privacy and data security are our top priorities."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-swift-dark">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Swift Ride Rescue's emergency medical transport services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-swift-dark">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
