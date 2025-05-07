
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VoiceInterfaceSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const waveformRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !contentRef.current) return;
  
    // Scroll animation for image and content
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      }
    });
  
    timeline.fromTo(imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo(contentRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
  
    // Animate the waveform if ref is set and bars exist
    if (waveformRef.current) {
      const waveformBars = waveformRef.current.querySelectorAll('.waveform-bar');
      if (waveformBars.length > 0) {
        gsap.to(waveformBars, {
          height: "random(10, 40)",
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          stagger: {
            each: 0.1,
            from: "center"
          }
        });
      }
    }
  }, []);
  

  return (
    <section ref={sectionRef} className="section bg-gray-50">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center">
          <div ref={imageRef} className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-safarOrange rounded-full opacity-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-safarOrange rounded-full opacity-10"></div>
              <img 
                src="https://images.unsplash.com/36/xIsiRLngSRWN02yA2BbK_submission-photo-7.jpg?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Voice Interface" 
                className="rounded-2xl shadow-lg relative z-10 w-full"
              />
              
              <div className="absolute bottom-4 left-0 right-0 mx-auto w-3/4 bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <div className="text-sm text-gray-500 mb-2">Say something like:</div>
                <div className="text-safarDark font-medium">"Find me a 5-day trip to Goa"</div>
                <div ref={waveformRef} className="flex items-end space-x-1 h-10 mt-3">
                  {[...Array(14)].map((_, i) => (
                    <div 
                      key={i}
                      className="waveform-bar w-1.5 bg-safarOrange rounded-full"
                      style={{ height: `${Math.random() * 30 + 5}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div ref={contentRef} className="w-full lg:w-1/2">
            <div className="bg-orange-100 text-safarOrange inline-block px-4 py-1 rounded-full text-sm font-medium mb-4">Voice Commands</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Plan Your Trip Using Just Your Voice</h2>
            <p className="text-lg text-gray-600 mb-6">
              Speak naturally to SafarBot and watch as your travel plans come to life. Our advanced voice interface understands complex queries and helps you plan every aspect of your journey without typing a single word.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="font-semibold mb-4">Try these voice commands:</h3>
              <ul className="space-y-3">
                {[
                  "Find me a 3-day trip to Kerala with cultural experiences",
                  "What are the best restaurants in Jaipur for vegetarians?",
                  "Show me budget-friendly hotels in Mumbai near the beach",
                  "Plan a day trip to Agra with the Taj Mahal"
                ].map((cmd, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-safarOrange mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">"{cmd}"</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button className="btn-primary">
              Start Voice Planning
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceInterfaceSection;
