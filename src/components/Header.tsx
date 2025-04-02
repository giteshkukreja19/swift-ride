
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Phone, Navigation, Ambulance, Menu, X, Building2, Stethoscope } from "lucide-react";
import EmergencyButton from '@/components/EmergencyButton';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:text-swift-red transition-colors">
                    Ambulance Service
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/tracking"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-swift-red/50 to-swift-red p-6 no-underline outline-none focus:shadow-md"
                          >
                            <Ambulance className="h-6 w-6 text-white" />
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Ambulance Tracking
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Real-time tracking of emergency medical transport fleet
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/tracking"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            <Navigation className="h-4 w-4 inline mr-2" />
                            GPS Tracking
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Monitor ambulance locations in real-time
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            <Building2 className="h-4 w-4 inline mr-2" />
                            Nearby Hospitals
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find the closest emergency care centers
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            <Stethoscope className="h-4 w-4 inline mr-2" />
                            Health Assistant
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            AI-powered basic medical guidance
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/services" className="hover:text-swift-red transition-colors">Services</Link>
            <Link to="/about" className="hover:text-swift-red transition-colors">About</Link>
            <Link to="/contact" className="hover:text-swift-red transition-colors">Contact</Link>
          </nav>
          
          <div className="hidden md:flex">
            <EmergencyButton />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-2">
          <nav className="flex flex-col space-y-3 py-3">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tracking" 
              className="px-3 py-2 rounded-md hover:bg-gray-100 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Ambulance Tracking
            </Link>
            <Link 
              to="/services" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <EmergencyButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
