
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCMS } from './CMSContext';

export const Hero: React.FC = () => {
  const { data } = useCMS();
  const { hero } = data;

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="SMM for Musicians"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
        >
          {hero.title}
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-2xl mb-10 max-w-3xl font-light"
        >
          {hero.subtitle}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-[#f05a28] text-white font-semibold text-lg rounded-full hover:bg-[#d35400] transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            {hero.buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
