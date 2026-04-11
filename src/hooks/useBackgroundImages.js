// hooks/useBackgroundImages.js
import { useState, useEffect } from "react";

// Import all background images
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
import aboutImg from "../images/about.jpeg";
import agbajeImg from "../images/agbaje.png";

export const useBackgroundImages = () => {
  const [currentImages, setCurrentImages] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  const backgroundImagePaths = [
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
    aboutImg,
    agbajeImg,
  ];

  const selectRandomBackgroundImages = () => {
    const shuffled = [...backgroundImagePaths];
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
        size: 180 + Math.random() * 250, // Slightly larger images
        opacity: 0.3 + Math.random() * 0.25, // Higher opacity for better visibility
        rotation: -15 + Math.random() * 30,
      },
    }));
  };

  useEffect(() => {
    setCurrentImages(selectRandomBackgroundImages());

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImages(selectRandomBackgroundImages());
        setFadeIn(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return { currentImages, fadeIn };
};

// Background Component to be used in each page
export const BackgroundOverlay = ({ currentImages, fadeIn }) => {
  return (
    <>
      {/* Background Images Container */}
      <div className="fixed inset-0 overflow-hidden -z-20">
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

      {/* White Transparent Overlay - Reduced blur, more transparent */}
      <div className="fixed inset-0 bg-white/30 -z-10" />
    </>
  );
};
