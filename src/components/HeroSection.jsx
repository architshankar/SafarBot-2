import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Typewriter, Cursor } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/itinerary');
  }

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5")
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .from(imageRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");
    }, heroRef);

    return () => ctx.revert(); // Clean up animation on unmount
  }, []);

  


  return (
    <div ref={heroRef} className="py-20 md:py-32 relative overflow-hidden" id="home">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 -z-10"></div>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-xl">
          <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Travel Planning,
            <span className="text-safarOrange">
              <Typewriter
                words={['Simplified']}
                typeSpeed={50}
                deleteSpeed={80}
                delaySpeed={3000}
                loop={false}
              />
            </span>
            <Cursor cursorColor="#FF9900" />
          </h1>

          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-700 mb-8">
            Plan your perfect journey with voice commands, collaborative itineraries, and local food discoveries
          </p>

          <div ref={ctaRef} className="flex flex-wrap sm:flex-row gap-4">
            <Link to="/planner" className="btn-primary inline-block">
              Start Planning Your Adventure
            </Link>
            <button className="bg-white border-2 border-gray-200 text-charcoal hover:border-primary transition-colors font-medium py-3 px-6 rounded-lg flex items-center justify-center text-lg sm:text-base"
            onClick={handleClick}>
                <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                Watch Demo
              </button>
          </div>
        </div>

        <div ref={imageRef} className="relative">
          <div className="rounded-3xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <img 
              src="https://images.unsplash.com/photo-1728230569861-8839f8009693?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="SafarBot Interface" 
              className="w-full h-[70vh] object-cover mix-blend-overlay"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
