
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ambulance, Menu, X, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMobile } from '@/hooks/use-mobile';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '');
        setUserData(userData);
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    
    // Redirect to home after logout
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      // Force a reload to update UI states if already on home page
      window.location.reload();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/tracking', label: 'Tracking' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Ambulance className="h-8 w-8 text-swift-red" />
            <span className="ml-2 text-xl font-bold text-swift-dark">Swift Ride Rescue</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-swift-red ${
                  isActive(link.path) ? 'text-swift-red' : 'text-swift-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-swift-red text-white">
                      {userData?.name.charAt(0) || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal text-sm truncate">
                    {userData?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-swift-dark" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-t border-gray-100">
          <nav className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium py-2 transition-colors hover:text-swift-red ${
                  isActive(link.path) ? 'text-swift-red' : 'text-swift-dark'
                }`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-sm font-medium py-2 transition-colors hover:text-swift-red"
                  onClick={closeMobileMenu}
                >
                  <User className="inline-block mr-2 h-4 w-4" />
                  Profile
                </Link>
                <button 
                  className="text-sm font-medium py-2 text-left transition-colors hover:text-swift-red"
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                >
                  <LogOut className="inline-block mr-2 h-4 w-4" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
