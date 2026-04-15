import React from "react";
import { motion } from "framer-motion";
import {
  useBackgroundImages,
  BackgroundOverlay,
} from "../hooks/useBackgroundImages";
import about from "../images/about.jpeg";

const About = () => {
  const { currentImages, fadeIn } = useBackgroundImages();

  return (
    <>
      <BackgroundOverlay currentImages={currentImages} fadeIn={fadeIn} />

      <div className="relative pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                ABOUT ADEHUN
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
                src={about}
                alt="Barr. Akeem Agbaje"
                className="w-full h-100 object-cover"
              />
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Who We Are
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Adehun is a strategic political movement committed to
                  redefining leadership through unity, accountability, and
                  purposeful governance. It brings together stakeholders, loyal
                  party members, and forward-thinking individuals with a shared
                  goal of building a more cohesive and effective political
                  structure.
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">
                  Our Purpose
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Adehun exists to serve the people by restoring trust, unity,
                  and purpose in leadership. Inspired by the passion and
                  unwavering commitment of Barrister Akeem Agbaje, the movement
                  is rooted in the belief that leadership is first a
                  responsibility to the people and to God. Guided by strong
                  moral and Godly values—integrity, compassion, fairness, and
                  accountability—Adehun seeks to bridge the gap between
                  leadership and the grassroots, ensuring that every voice is
                  heard and every contribution is valued.
                </p>
                <h2>Our Position</h2>
                <p>
                  Leadership must remain connected to the grassroots, responsive
                  to the needs of the people, and grounded in values that
                  promote unity and justice. We advocate for a system where
                  loyalty is recognized, voices are respected, and opportunities
                  are distributed with fairness and compassion. Adehun upholds
                  the principle that governance should not be distant or
                  exclusive, but accessible and inclusive—ensuring that every
                  decision reflects both the will of the people and a deep sense
                  of moral responsibility.
                </p>
                <br />
                <h2>OUR APPROACH</h2>
                <p>
                  Our approach is rooted in service to the people, guided by the
                  passion and steadfast commitment of Barrister Akeem Agbaje to
                  responsible and compassionate leadership. We believe that true
                  leadership begins with a genuine connection to the
                  people—listening, understanding, and responding to their needs
                  with sincerity and purpose. Every decision and action within
                  Adehun is shaped by a deep sense of responsibility, not just
                  to the people, but to the values of integrity and
                  accountability before God.
                </p>
                <br />
                <h2>
                  DRIVEN BY THE PRINCIPLES, WE ADOPT A PEOPLE-FIRST APPROACH
                  THAT PRIORITIZES:
                </h2>
                <p>
                  Active engagement with communities at all levels Inclusive
                  decision-making that reflects the voice of the grassroots
                  Recognition of loyalty and dedication within the structure
                  Promotion of unity, fairness, and mutual respect Our approach
                  emphasizes collaboration over division, service over
                  self-interest, and impact over rhetoric. We are committed to
                  building a political culture where leadership is accessible,
                  trustworthy, and consistently aligned with the well-being of
                  the people. At its core, Adehun’s approach is about doing what
                  is right—guided by conscience, strengthened by unity, and
                  dedicated to delivering meaningful progress for all. We
                  prioritize strategic engagement, consensus-building, and
                  sustainable political development. Adehun operates with a
                  clear understanding that unity within the structure is
                  essential for electoral success and effective governance.
                </p>
                <br />
                <h2>CLOSING</h2>
                <p>
                  Adehun is not just a movement—it is a structured pathway
                  toward a more unified, credible, and people-oriented political
                  future.
                </p>
                <p></p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Born and raised in Oyo State, Barr. Agbaje understands the
                  challenges facing our communities. His journey from a humble
                  background to becoming one of Nigeria's respected legal minds
                  is a testament to his resilience, hard work, and dedication to
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
                  Our Commitment
                </h3>
                <p className="space-y-2 text-gray-600">
                  Adehun is committed to fostering a system where leadership is
                  responsible, inclusive, and results-driven—ensuring that
                  political success translates into tangible benefits for the
                  people.
                </p>
                <hr />
                <p>
                  Adehun is not just a movement—it is a structured pathway
                  toward a more unified, credible, and people-oriented political
                  future.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-3">
                  WHY ADEHUN
                </h3>
                <p>
                  At a defining moment in our political landscape, Adehun stands
                  as a corrective force—focused on avoiding past mistakes and
                  building a structure rooted in fairness, inclusion, and
                  internal cohesion.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-3">
                  We recognize that:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• ⁠Disunity weakens progress</li>
                  <li>• ⁠Loyalty must be rewarded, not ignored</li>
                  <li>
                    • Leadership must emerge from those who understand the
                    people
                  </li>
                  <li>
                    • Accessibility and connection to the grassroots are
                    non-negotiable
                  </li>
                </ul>
                <hr />
                <p>
                  Adehun is positioned to bridge gaps, unify stakeholders, and
                  deliver a credible path forward.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
