
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-swift-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-swift-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">SR</span>
              </div>
              <span className="text-white font-bold text-xl">Swift Ride Rescue</span>
            </div>
            <p className="text-gray-400 mb-6">
              Providing fast, reliable emergency medical transport services when you need them most.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services/emergency" className="text-gray-400 hover:text-white transition-colors">Emergency Transport</Link></li>
              <li><Link to="/services/non-emergency" className="text-gray-400 hover:text-white transition-colors">Non-Emergency Transport</Link></li>
              <li><Link to="/services/critical" className="text-gray-400 hover:text-white transition-colors">Critical Care Transport</Link></li>
              <li><Link to="/services/events" className="text-gray-400 hover:text-white transition-colors">Special Event Coverage</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-swift-red flex-shrink-0 mt-1" />
                <span className="text-gray-400">Emergency: 911<br/>Customer Service: (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-swift-red flex-shrink-0 mt-1" />
                <span className="text-gray-400">info@swiftriderescue.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-swift-red flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Emergency Drive<br/>Rescue City, RC 10911</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Swift Ride Rescue. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
