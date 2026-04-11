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
import {
  useBackgroundImages,
  BackgroundOverlay,
} from "../hooks/useBackgroundImages";

const Vision = () => {
  const { currentImages, fadeIn } = useBackgroundImages();

  const pillars = [
    {
      icon: <FaGraduationCap className="text-4xl text-green-700" />,
      title: "Purpose-Driven and Godly Leadership",
      description:
        "We champion leadership that is accountable not only to the people but also guided by strong moral and Godly principles—ensuring decisions are made with integrity, fairness, and a genuine heart for service.",
    },
    {
      icon: <FaHospitalUser className="text-4xl text-green-700" />,
      title: "A Truly People-Centered Movement",
      description:
        "Our strength lies in the people. We are committed to building a system where policies, decisions, and actions are shaped by the real needs, voices, and aspirations of the grassroots.",
    },
    {
      icon: <FaChartLine className="text-4xl text-green-700" />,
      title: "⁠Inclusive Opportunities for All",
      description:
        "We promote a system that creates fair opportunities for participation and growth, ensuring that no individual or group is excluded from contributing to collective progress.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-green-700" />,
      title: "Strengthening Internal Cohesion",
      description:
        "We will build a united and disciplined structure anchored on trust, respect, and continuous engagement—eliminating divisions that weaken progress.",
    },
    {
      icon: <FaLeaf className="text-4xl text-green-700" />,
      title: "Merit Based Advancement",
      description:
        "We advocate for a culture where responsibility and leadership roles are earned through competence, proven capacity, and commitment to service",
    },
    {
      icon: <FaBriefcase className="text-4xl text-green-700" />,
      title: "Accessible, Listening, and Responsive Leadership",
      description:
        "Leadership must remain close to the people—open, approachable, and willing to listen. We will ensure continuous engagement and timely response to the concerns of the people.",
    },
    {
      icon: <FaGraduationCap className="text-4xl text-green-700" />,
      title: "Values-Based Governance",
      description:
        "Our actions will be guided by principles of honesty, compassion, justice, and accountability—reflecting a deep respect for ethical standards and Godly values in leadership.",
    },
    {
      icon: <FaHospitalUser className="text-4xl text-green-700" />,
      title: "Effective Communication and People Engagement",
      description:
        "We will maintain clear, consistent, and transparent communication—leveraging both traditional and digital platforms to keep the people informed, involved, and connected.",
    },
    {
      icon: <FaLeaf className="text-4xl text-green-700" />,
      title: "Grassroots Connection and Empowerment",
      description:
        "We will deepen our presence at the grassroots by actively engaging communities, supporting local initiatives, and ensuring that development starts from the people and reaches every level.",
    },
  ];

  return (
    <>
      <BackgroundOverlay currentImages={currentImages} fadeIn={fadeIn} />

      <div className="relative pt-24 pb-20 min-h-screen">
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
              To inspire a new era of leadership rooted in service, guided by
              integrity and Godly values, and committed to building a united,
              people-focused society where every citizen is heard, valued, and
              empowered.
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
                  <p className="text-gray-600 text-center">
                    {pillar.description}
                  </p>
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
    </>
  );
};

export default Vision;
