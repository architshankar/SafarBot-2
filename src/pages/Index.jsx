import React from 'react';
import CtaSection from '../components/CtaSection';
// Commenting out components - we'll add them back one by one
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import VoiceInterfaceSection from '../components/VoiceInterfaceSection';
import MapPlannerSection from '../components/MapPlannerSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      
      
      <Navbar />
      <HeroSection />
      <VoiceInterfaceSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      {/* <MapPlannerSection /> */}
      <Footer />
     
    </div>
  );
};

export default Index;
