import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Vision & Agenda", path: "/vision" },
    { name: "Gallery", path: "/gallery" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "News", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-green-800 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-700">AA</span>
            </div>
            <div>
              <h1
                className={`font-bold text-lg ${scrolled ? "text-green-800" : "text-white"}`}
              >
                Adehun
              </h1>
              <p
                className={`text-xs ${scrolled ? "text-gray-600" : "text-green-200"}`}
              >
                Koniye!!!
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? scrolled
                      ? "text-green-700 border-b-2 border-green-700"
                      : "text-yellow-400 border-b-2 border-yellow-400"
                    : scrolled
                      ? "text-gray-700 hover:text-green-700"
                      : "text-white hover:text-yellow-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/volunteer"
              className="bg-yellow-500 text-green-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Join Movement
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className={`w-6 h-6 ${scrolled ? "text-gray-800" : "text-white"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 font-medium ${
                  isActive(link.path)
                    ? scrolled
                      ? "text-green-700"
                      : "text-yellow-400"
                    : scrolled
                      ? "text-gray-700"
                      : "text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/volunteer"
              className="block mt-4 bg-yellow-500 text-green-900 px-6 py-2 rounded-full font-semibold text-center hover:bg-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Join Movement
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
