import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-20 bg-swift-dark text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're here to help with any questions about our emergency medical transport services
            </p>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-swift-dark mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="How can we help you?" rows={5} />
                  </div>
                  <Button className="w-full bg-swift-red hover:bg-red-700 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-swift-dark mb-6">Contact Information</h2>
                <div className="bg-gray-100 p-8 rounded-lg">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="text-swift-red w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-bold text-swift-dark">Phone</h3>
                        <p className="text-gray-600">Emergency: 102</p>
                        <p className="text-gray-600">Customer Service: (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Mail className="text-swift-red w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-bold text-swift-dark">Email</h3>
                        <p className="text-gray-600">info@swiftriderescue.com</p>
                        <p className="text-gray-600">support@swiftriderescue.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-swift-red w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-bold text-swift-dark">Address</h3>
                        <p className="text-gray-600">123 Emergency Drive</p>
                        <p className="text-gray-600">Rescue City, RC 10911</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="text-swift-red w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-bold text-swift-dark">Hours</h3>
                        <p className="text-gray-600">Emergency Services: 24/7</p>
                        <p className="text-gray-600">Office Hours: Mon-Fri 8am-6pm</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Map Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
