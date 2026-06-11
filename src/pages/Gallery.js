import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import {
  useBackgroundImages,
  BackgroundOverlay,
} from "../hooks/useBackgroundImages";

// These imports are now only used for the background scattering effect
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

const Gallery = () => {
  // State for fetched gallery images
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  // Background scattering effect (unchanged, uses local images)
  const [currentBackgroundImages, setCurrentBackgroundImages] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  const categories = [
    { id: "all", name: "All" },
    { id: "campaign", name: "Campaign" },
    { id: "events", name: "Events" },
    { id: "meetings", name: "Meetings" },
    { id: "community", name: "Community" },
    { id: "personal", name: "Personal" },
  ];

  // Background image paths for scattering effect (still uses local imports)
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
        size: 150 + Math.random() * 200,
        opacity: 0.1 + Math.random() * 0.15,
        rotation: -15 + Math.random() * 30,
      },
    }));
  };

  // Setup background image rotation
  useEffect(() => {
    setCurrentBackgroundImages(selectRandomBackgroundImages());
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentBackgroundImages(selectRandomBackgroundImages());
        setFadeIn(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real gallery images from backend
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/gallery"); // baseURL includes /api
      if (response.data.success && response.data.data) {
        // Map backend fields to the expected structure
        const images = response.data.data.map((img) => ({
          id: img._id,
          imageUrl: img.imageUrl,
          title: img.title || "Untitled",
          category: img.category,
          description: img.description || "",
        }));
        setGalleryImages(images);
      } else {
        setGalleryImages([]);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchGalleryImages}
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Background Images Container - positioned behind everything */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {currentBackgroundImages.map((image) => (
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

      {/* White Transparent Overlay - only behind content area */}
      <div className="fixed inset-0 bg-white opacity-85 backdrop-blur-sm -z-10" />

      {/* Content */}
      <div className="relative pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              Campaign Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Moments from our journey to transform Oyo State
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-green-700 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-xl shadow-xl cursor-pointer bg-white"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-white text-green-700 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-green-700 hover:text-white">
                      View Details
                    </button>
                  </div>
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-semibold text-lg">
                        {image.title}
                      </p>
                      <p className="text-gray-200 text-sm mt-1 capitalize">
                        {image.category}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No images in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10 transition-transform hover:scale-110"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes />
          </button>
          <div className="relative max-w-6xl w-full mx-auto">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6 rounded-b-lg">
                <h3 className="text-2xl font-semibold mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200">{selectedImage.description}</p>
                <p className="text-green-400 text-sm mt-2 capitalize">
                  Category: {selectedImage.category}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
