import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaHospitalUser,
  FaChartLine,
  FaHandsHelping,
  FaLeaf,
  FaBriefcase,
} from "react-icons/fa";

const Vision = () => {
  const pillars = [
    {
      icon: <FaGraduationCap className="text-4xl text-green-700" />,
      title: "Quality Education",
      description:
        "Revolutionize education with modern infrastructure, qualified teachers, and digital learning tools. Ensure every child has access to quality education.",
      goals: [
        "Build 100 new model schools",
        "Train 5,000 teachers annually",
        "Provide free laptops to students",
        "Establish technical colleges",
      ],
    },
    {
      icon: <FaHospitalUser className="text-4xl text-green-700" />,
      title: "Healthcare for All",
      description:
        "Transform healthcare delivery with modern facilities, affordable services, and comprehensive health insurance for all residents.",
      goals: [
        "Upgrade all primary health centers",
        "Build 5 new general hospitals",
        "Implement universal health coverage",
        "Recruit 1,000 medical professionals",
      ],
    },
    {
      icon: <FaChartLine className="text-4xl text-green-700" />,
      title: "Economic Growth",
      description:
        "Create an enabling environment for businesses, attract investments, and generate employment opportunities for our youth.",
      goals: [
        "Establish industrial parks",
        "Support small businesses",
        "Create 50,000 jobs annually",
        "Develop agricultural value chains",
      ],
    },
    {
      icon: <FaHandsHelping className="text-4xl text-green-700" />,
      title: "Social Welfare",
      description:
        "Implement comprehensive social protection programs to support the vulnerable and elderly in our society.",
      goals: [
        "Monthly stipends for elderly",
        "Skill acquisition programs",
        "Food security initiative",
        "Housing for the poor",
      ],
    },
    {
      icon: <FaLeaf className="text-4xl text-green-700" />,
      title: "Agriculture & Food Security",
      description:
        "Modernize agriculture, support farmers, and ensure food sufficiency while creating export opportunities.",
      goals: [
        "Irrigate 10,000 hectares",
        "Provide subsidized inputs",
        "Establish processing zones",
        "Youth in agriculture program",
      ],
    },
    {
      icon: <FaBriefcase className="text-4xl text-green-700" />,
      title: "Infrastructure",
      description:
        "Build and maintain critical infrastructure to support economic growth and improve quality of life.",
      goals: [
        "Construct 500km of roads",
        "Improve power supply",
        "Provide clean water",
        "Develop rural infrastructure",
      ],
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Vision & Agenda
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-1 bg-green-700 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600"
          >
            A comprehensive blueprint for a prosperous, inclusive, and
            sustainable Oyo State
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">{pillar.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {pillar.description}
                </p>
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-semibold text-green-700 mb-2">
                    Key Goals:
                  </h4>
                  <ul className="space-y-2">
                    {pillar.goals.map((goal, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 text-sm flex items-start"
                      >
                        <span className="text-green-700 mr-2">✓</span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-green-700 rounded-lg shadow-xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Join Us in Building a Greater Oyo State
          </h2>
          <p className="text-xl mb-6">
            Your support can help turn this vision into reality. Together, we
            can make Oyo State a model of excellence.
          </p>
          <a
            href="/volunteer"
            className="inline-block bg-yellow-500 text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
          >
            Volunteer Today
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Vision;
