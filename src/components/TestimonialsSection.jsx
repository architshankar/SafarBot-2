
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const testimonialRefs = useRef([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      testimonialRefs.current.forEach((testimonial, index) => {
        if (!testimonial) return; // skip nulls
        gsap.from(testimonial, {
          scrollTrigger: {
            trigger: testimonial,
            start: "top bottom-=50",
            toggleActions: "play none none none"
          },
          y: 30,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out"
        });
      });
    });
  }, []);
  
  
  
  const testimonials = [
    {
      content: "SafarBot transformed our family trip to Rajasthan. The voice planning feature saved us hours of research, and the food recommendations were spot on!",
      author: "Priya Sharma",
      role: "Family Traveler",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      rating: 5
    },
    {
      content: "As a business traveler, I need efficient planning tools. SafarBot's real-time flight updates and restaurant availability features are game-changers for my work trips.",
      author: "Rahul Mehta",
      role: "Business Traveler",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      rating: 5
    },
    {
      content: "Planning a group trip to Goa was always chaotic until we used SafarBot. The collaborative features made it easy for everyone to contribute and vote on activities.",
      author: "Neha Gupta",
      role: "Group Trip Organizer",
      image: "https://randomuser.me/api/portraits/women/19.jpg",
      rating: 4
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" ref={sectionRef} className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">Join thousands of satisfied travelers who have revolutionized their journey planning with SafarBot</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => testimonialRefs.current[index] = el}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-orange-50 px-4 py-2 rounded-lg border border-orange-100 mb-6">
            <div className="flex items-center">
              <div className="flex mr-2">
                {Array(5).fill(0).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-medium">4.9/5 from over 10,000+ happy travelers</span>
            </div>
          </div>
          <button className="btn-primary">
            Read More Stories
          </button>
        </div>
      </div>


    </section>
  );
};

export default TestimonialsSection;

