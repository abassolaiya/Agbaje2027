import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              About Barr. Akeem Agbaje
            </h1>
            <div className="w-20 h-1 bg-green-700 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden mb-12"
          >
            <img
              src="/images/akeem-agbaje-portrait.jpg"
              alt="Barr. Akeem Agbaje"
              className="w-full h-96 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                A Leader with Integrity and Vision
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Barr. Akeem Adedeji Agbaje is a distinguished legal
                practitioner, philanthropist, and passionate advocate for the
                people of Oyo State. With over two decades of experience in law
                and public service, he has consistently demonstrated unwavering
                commitment to justice, equality, and sustainable development.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Born and raised in Oyo State, Barr. Agbaje understands the
                challenges facing our communities. His journey from a humble
                background to becoming one of Nigeria's respected legal minds is
                a testament to his resilience, hard work, and dedication to
                excellence.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a governorship aspirant under the All Progressives Congress
                (APC), he brings a unique combination of legal expertise,
                business acumen, and grassroots connection to the table. His
                vision is to create a prosperous Oyo State where every citizen
                has equal opportunities to thrive.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-3">
                Education
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• LL.B, University of Lagos</li>
                <li>• B.L, Nigerian Law School</li>
                <li>• LL.M, University of Ibadan</li>
                <li>• Certificate in Leadership, Harvard Kennedy School</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-3">Career</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Principal Partner, Agbaje & Associates</li>
                <li>• Former Chairman, NBA Ibadan Branch</li>
                <li>• Member, Oyo State Law Reform Committee</li>
                <li>• Consultant to多家 International Organizations</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-3">
                Philanthropy
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Founder, Agbaje Foundation</li>
                <li>• Scholarship for 500+ Students</li>
                <li>• Healthcare Support Program</li>
                <li>• Youth Empowerment Initiative</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
