import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandsHelping,
  FaBullhorn,
  FaChartLine,
} from "react-icons/fa";
import Hero from "../components/Hero";
import CountUp from "../components/CountUp";

const Home = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl text-green-600" />,
      title: "Community First",
      description:
        "Putting the people of Oyo State at the heart of every decision and policy.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-green-600" />,
      title: "Grassroots Empowerment",
      description:
        "Creating opportunities and empowering local communities across all 33 LGAs.",
    },
    {
      icon: <FaBullhorn className="text-4xl text-green-600" />,
      title: "Voice for All",
      description:
        "Ensuring every citizen's voice is heard and represented in governance.",
    },
    {
      icon: <FaChartLine className="text-4xl text-green-600" />,
      title: "Progressive Leadership",
      description:
        "Driving sustainable development and economic growth for Oyo State.",
    },
  ];

  return (
    <div>
      <Hero />

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              A Vision for a Greater Oyo State
            </h2>
            <p className="text-xl text-gray-600">
              Together, we can build a state where every citizen thrives,
              opportunities abound, and progress touches every community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <CountUp end={33} duration={2} />
              <p className="text-xl mt-2">Local Government Areas</p>
            </div>
            <div>
              <CountUp end={500} duration={2} suffix="+" />
              <p className="text-xl mt-2">Communities Reached</p>
            </div>
            <div>
              <CountUp end={10000} duration={2} suffix="+" />
              <p className="text-xl mt-2">Active Supporters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            Join the Movement for Change
          </h2>
          <p className="text-xl text-green-800 mb-8 max-w-2xl mx-auto">
            Be part of history. Support Barr. Akeem Agbaje in building a better
            Oyo State for all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/volunteer"
              className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
            >
              Volunteer Today
            </Link>
            <Link
              to="/contact"
              className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
