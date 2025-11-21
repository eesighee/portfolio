"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-Screen Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/photos/austin_storm.jpg" 
          alt="Featured photography"
          fill
          style={{ objectFit: "cover" }}
          quality={75}
          priority
          className="brightness-75"
        />
      </motion.div>

      {/* Text Content & Overlay */}
      <div className="absolute inset-0 bg-primary-dark/40 flex flex-col justify-end p-8 md:p-16 lg:p-24">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-text-light drop-shadow-lg leading-tight mb-4"
        >
          <span className="block">Fotos de</span>
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="block"
          >
            Alegría.
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-xl md:text-2xl text-accent max-w-2xl mb-8 drop-shadow-md"
        >
          Software Engineer & Photographer. I build scalable systems and capture life's moments.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="flex space-x-4"
        >
          <motion.a 
            href="#gallery" 
            className="px-8 py-3 text-lg font-medium text-primary-dark bg-callout hover:bg-opacity-90 transition duration-300 cursor-pointer rounded-sm border border-white"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(184, 134, 11, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            View Gallery
          </motion.a>
          <motion.a 
            href="#about" 
            className="px-8 py-3 text-lg font-medium text-text-light border border-accent hover:bg-accent/20 transition duration-300 cursor-pointer rounded-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(163, 163, 163, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            About Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
