import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
          ADEHUN
        </h1>

        <h2 className="text-2xl md:text-3xl mb-4 text-green-700">
          A Movement for Justice, Unity, and Responsible Leadership
        </h2>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700">
          Building a people-first future through inclusive governance, loyalty,
          and purposeful leadership.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/vision"
            className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
          >
            See Our Vision
          </Link>
          <Link
            to="/volunteer"
            className="border-2 border-green-700 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-colors"
          >
            Join the Movement
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
