import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import all images directly
import aboutImg from "../images/about.jpeg";
import agbajeImg from "../images/agbaje.png";
import img1 from "../images/1.jpeg";
import img2 from "../images/2.jpeg";
import img3 from "../images/3.jpeg";
import img4 from "../images/4.jpeg";
import img5 from "../images/5.jpeg";
import img6 from "../images/6.jpeg";
import img7 from "../images/7.jpeg";
import img8 from "../images/8.jpeg";
import img9 from "../images/9.jpeg";
import img10 from "../images/10.jpeg";
import img11 from "../images/11.jpeg";

const Hero = () => {
  const [currentImages, setCurrentImages] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  // Use imported images
  const imagePaths = [
    aboutImg,
    agbajeImg,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];

  // Function to select random images from the pool
  const selectRandomImages = () => {
    const shuffled = [...imagePaths];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 8).map((path, index) => ({
      id: index,
      path: path,
      position: {
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 150 + Math.random() * 200,
        opacity: 0.15 + Math.random() * 0.25,
        rotation: -15 + Math.random() * 30,
      },
    }));
  };

  useEffect(() => {
    setCurrentImages(selectRandomImages());

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImages(selectRandomImages());
        setFadeIn(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Background Images Container */}
      <div className="absolute inset-0 overflow-hidden">
        {currentImages.map((image) => (
          <div
            key={image.id}
            className={`absolute transition-all duration-1000 ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              top: `${image.position.top}%`,
              left: `${image.position.left}%`,
              transform: `translate(-50%, -50%) rotate(${image.position.rotation}deg)`,
              opacity: image.position.opacity,
            }}
          >
            <img
              src={image.path}
              alt="Background scenery"
              className="object-cover rounded-2xl shadow-2xl"
              style={{
                width: `${image.position.size}px`,
                height: `${image.position.size}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Rest of your component remains the same */}
      <div className="absolute inset-0 bg-white opacity-70 backdrop-blur-sm" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 animate-fade-in">
          ADEHUN
        </h1>
        <h2 className="text-2xl md:text-3xl mb-4 text-green-700 animate-slide-up">
          A Movement for Justice, Unity, and Responsible Leadership
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700 animate-slide-up animation-delay-200">
          Building a people-first future through inclusive governance, loyalty,
          and purposeful leadership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          <Link
            to="/vision"
            className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-all transform hover:scale-105"
          >
            See Our Vision
          </Link>
          <Link
            to="/volunteer"
            className="border-2 border-green-700 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-all transform hover:scale-105"
          >
            Join the Movement
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-600 rounded-full animate-bounce mt-2" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Hero;
