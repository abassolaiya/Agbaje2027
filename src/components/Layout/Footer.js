import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Adehun 2027</h3>
            <p className="text-gray-400 mb-4">
              Building a people-first future through inclusive governance,
              loyalty, and purposeful leadership.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/g/18PZCKEs4S/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                f
              </a>
              <a
                href="https://www.tiktok.com/@adehun27?_r=1&_t=ZS-95N4TY9lG7B"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                t
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbBe8101CYoW9cAtVb2n"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                w
              </a>
              <a
                href="https://www.instagram.com/akeemadedejiagbaje?utm_source=qr&igsh=ZjJ5c3p0dnRoMTd2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                i
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/vision"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Vision & Agenda
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">agbajeadehun27@gmail.com</li>
              <li className="text-gray-400">
                +234 916 061 0199, +234 803 657 8256
              </li>
              <li className="text-gray-400">
                Adehun Building, Bodija,
                <br />
                Ibadan, Oyo State, Nigeria
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for campaign updates and news.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
              />
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Barr. Akeem Agbaje Campaign. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
