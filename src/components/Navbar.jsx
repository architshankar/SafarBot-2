
import React, { useState, useEffect } from 'react';
import { UserButton, SignedIn, ClerkProvider, SignedOut } from '@clerk/clerk-react';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-safarDark flex items-center">
            <span className="text-safarOrange mr-1">Safar</span>Bot
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="features" className="text-safarDark hover:text-safarOrange transition-colors">Features</a>
          <a href="how-it-works" className="text-safarDark hover:text-safarOrange transition-colors">How It Works</a>
          <a href="testimonials" className="text-safarDark hover:text-safarOrange transition-colors">Testimonials</a>
          <a href="planner" className="text-safarDark hover:text-safarOrange transition-colors">Pricing</a>
          {/* <button className="btn-primary">Get Started</button> */}
          <SignedOut>
            <a href="/login" className="w-10 h-10 rounded-full bg-safarOrange text-white flex items-center justify-center text-sm font-semibold self-start">
              U
            </a>
            
            </SignedOut>
          <SignedIn>

            <UserButton />
          </SignedIn>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-safarDark"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4">
          <div className="flex flex-col space-y-4">
            <a href="#features" className="text-safarDark hover:text-safarOrange transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-safarDark hover:text-safarOrange transition-colors" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" className="text-safarDark hover:text-safarOrange transition-colors" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#pricing" className="text-safarDark hover:text-safarOrange transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            {/* <button className="btn-primary w-full">Get Started</button> */}
            <a href="/login" className="w-10 h-10 rounded-full bg-safarOrange text-white flex items-center justify-center text-sm font-semibold self-start">
              U
            </a>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
