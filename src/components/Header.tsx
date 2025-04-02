
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Phone, Navigation } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-swift-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">SR</span>
            </div>
            <span className="text-swift-dark font-bold text-xl md:text-2xl">Swift Ride Rescue</span>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-swift-dark">
            <Link to="/" className="hover:text-swift-red transition-colors">Home</Link>
            <Link to="/tracking" className="hover:text-swift-red transition-colors flex items-center gap-1">
              <Navigation size={16} />
              <span>Ambulance Service</span>
            </Link>
            <Link to="/services" className="hover:text-swift-red transition-colors">Services</Link>
            <Link to="/about" className="hover:text-swift-red transition-colors">About</Link>
            <Link to="/contact" className="hover:text-swift-red transition-colors">Contact</Link>
          </nav>
          
          <Button className="bg-swift-red hover:bg-red-700 text-white hidden md:flex items-center gap-2">
            <Phone size={18} />
            <span>Emergency</span>
          </Button>
          
          {/* Mobile menu button - in a real implementation, this would toggle a mobile menu */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
