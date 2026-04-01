import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-green-900 to-green-700">
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Barr. Akeem Adedeji Agbaje
        </h1>

        <h2 className="text-2xl md:text-3xl mb-4 text-yellow-400">
          Your Next Governor, Oyo State 2027
        </h2>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          A leader with integrity, vision, and a proven commitment to the people
          of Oyo State
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/vision"
            className="bg-yellow-500 text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
          >
            See Our Vision
          </Link>
          <Link
            to="/volunteer"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-colors"
          >
            Join the Movement
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
