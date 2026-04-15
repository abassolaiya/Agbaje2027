import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useBackgroundImages,
  BackgroundOverlay,
} from "../hooks/useBackgroundImages";

const Contact = () => {
  const { currentImages, fadeIn } = useBackgroundImages();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/contact", formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = (phoneNumber) => {
    // Remove any non-digit characters from the phone number
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    // Create WhatsApp URL
    // For Nigerian numbers, ensure it has country code (234)
    let whatsappNumber = cleanNumber;
    if (cleanNumber.startsWith("0")) {
      // Convert local format (0XXX...) to international format (234XXX...)
      whatsappNumber = "234" + cleanNumber.substring(1);
    } else if (!cleanNumber.startsWith("234") && cleanNumber.length === 10) {
      // If it's 10 digits without country code
      whatsappNumber = "234" + cleanNumber;
    }

    // Open WhatsApp with a default message
    const message = encodeURIComponent(
      "Hello, I'm interested in your campaign services. I'd like to get more information.",
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open in new tab
    window.open(whatsappUrl, "_blank");
  };

  // Function to handle regular phone call
  const handlePhoneCall = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    window.location.href = `tel:${cleanNumber}`;
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-green-700" />,
      title: "Phone",
      details: ["+234 916 061 0199", "+234 803 657 8256"],
      showWhatsApp: true, // Add WhatsApp option
    },
    {
      icon: <FaEnvelope className="text-2xl text-green-700" />,
      title: "Email",
      details: ["info@akeemagbaje.com", "agbajeadehun27@gmail.com"],
      isEmail: true, // Mark as email for mailto links
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-green-700" />,
      title: "Campaign Office",
      details: ["Adehun Building, Bodija, Ibadan", "Oyo State, Nigeria"],
    },
    {
      icon: <FaClock className="text-2xl text-green-700" />,
      title: "Office Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 2pm"],
    },
  ];

  return (
    <>
      <BackgroundOverlay currentImages={currentImages} fadeIn={fadeIn} />

      <div className="relative pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Get in touch with our campaign team
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">{info.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => {
                      // Handle phone numbers with WhatsApp
                      if (info.showWhatsApp && detail.match(/[\d\s\+]+/)) {
                        const cleanPhone = detail.replace(/\s/g, "");
                        return (
                          <div
                            key={idx}
                            className="flex items-center space-x-3 mb-2"
                          >
                            <p className="text-gray-600">{detail}</p>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handlePhoneCall(detail)}
                                className="text-green-600 hover:text-green-700 transition-colors p-1"
                                title="Call now"
                              >
                                <FaPhone className="text-sm" />
                              </button>
                              <button
                                onClick={() => handleWhatsAppClick(detail)}
                                className="text-green-600 hover:text-green-700 transition-colors p-1"
                                title="Message on WhatsApp"
                              >
                                <FaWhatsapp className="text-sm" />
                              </button>
                            </div>
                          </div>
                        );
                      }
                      // Handle email addresses
                      else if (info.isEmail) {
                        return (
                          <a
                            key={idx}
                            href={`mailto:${detail}`}
                            className="text-gray-600 hover:text-green-700 transition-colors block mb-1"
                          >
                            {detail}
                          </a>
                        );
                      }
                      // Regular text
                      return (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  title="Campaign Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.703593283717!2d3.911354314776859!3d7.392063794642893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d6b2ac4fae5%3A0x3d4e8e6d5f2c8a7!2sAgodi%20GRA%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
