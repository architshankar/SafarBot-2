import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-rose-500 opacity-70"></div>
          
          <div className="relative z-10 px-6 py-16 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Travel Experience?
            </h2>
            <p className="text-lg text-white opacity-90 max-w-2xl mx-auto mb-10">
              Join thousands of travelers who are planning smarter, experiencing more, and creating unforgettable memories with SafarBot.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="bg-white text-safarDark hover:bg-gray-100 transition-colors font-semibold px-8 py-3 rounded-lg shadow-lg">
                Start Free Trial
              </button>
              <button className="bg-transparent text-white border-2 border-white hover:bg-white/10 transition-colors font-semibold px-8 py-3 rounded-lg">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
