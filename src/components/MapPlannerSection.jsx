
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, MessageSquareShare, UserPlus, Share } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MapPlannerSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
    
    timeline.from(contentRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(imageRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7");
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="container">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div ref={contentRef} className="w-full lg:w-1/2 mt-12 lg:mt-0 lg:pr-12">
            <div className="bg-orange-100 text-safarOrange inline-block px-4 py-1 rounded-full text-sm font-medium mb-4">Collaborative Planning</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Multi-User Collaborative Trip Planning</h2>
            <p className="text-lg text-gray-600 mb-6">
              Plan your perfect journey together with friends and family in real-time. Multiple users can access SafarBot simultaneously, making group decision-making seamless and enjoyable.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Real-time collaboration with multiple users",
                "Chat and discuss trip details within the platform",
                "Vote on destinations, activities, and accommodations",
                "Track changes and contributions from each team member"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-safarOrange mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <button className="btn-primary">
              Try Collaborative Planning
            </button>
          </div>
          
          <div ref={imageRef} className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-safarOrange rounded-full opacity-10"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-safarOrange rounded-full opacity-10"></div>
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="bg-safarOrange text-white p-2 rounded-full mr-3">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Trip to Goa</h3>
                      <p className="text-sm text-gray-500">4 collaborators</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <UserPlus size={18} />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Share size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-xl p-4 mb-6">
                  <div className="flex space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">R</div>
                    <div className="flex-1">
                      <div className="bg-blue-100 p-3 rounded-lg inline-block">
                        <p className="text-sm">How about we stay near Baga Beach?</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Rahul • 2m ago</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 justify-end">
                    <div className="flex-1 text-right">
                      <div className="bg-orange-100 p-3 rounded-lg inline-block text-left">
                        <p className="text-sm">Great idea! I'll look for hotels there.</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">You • Just now</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-safarOrange flex items-center justify-center text-white text-sm font-bold">Y</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">AI</div>
                    <p className="text-sm font-medium">SafarBot suggests:</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Based on your group preferences, I recommend:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Zostel Goa for affordable beachside stays</li>
                      <li>Tito's Lane for nightlife experiences</li>
                      <li>Curlies Beach Shack for group dinners</li>
                    </ul>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button className="bg-safarOrange text-xs text-white px-3 py-1 rounded-full">Add to itinerary</button>
                  </div>
                </div>
                
                <div className="flex mt-6 items-center">
                  <input 
                    type="text" 
                    placeholder="Send a message..." 
                    className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-safarOrange"
                  />
                  <button className="bg-safarOrange text-white px-4 py-2 rounded-r-lg">
                    <MessageSquareShare size={18} />
                  </button>
                </div>
                
                <div className="flex mt-4 -space-x-2">
                  {['R', 'P', 'A', 'S'].map((initial, index) => (
                    <div 
                      key={index} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white ${
                        ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'][index]
                      }`}
                    >
                      {initial}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold border-2 border-white">
                    +2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPlannerSection;
