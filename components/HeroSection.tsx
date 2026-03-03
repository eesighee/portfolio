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
        style={{ y, willChange: 'transform' }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/photos/hero/austin_storm.jpg"
          alt="Featured photography"
          fill
          style={{ objectFit: "cover" }}
          quality={90}
          sizes="100vw"
          priority
          className="brightness-90"
        />
      </motion.div>

      {/* Text Content & Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-darkroom/60 via-darkroom/10 to-transparent flex flex-col justify-end pb-4 pt-4 md:p-16 lg:p-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-silver drop-shadow-lg leading-tight mb-4"
          style={{ fontFamily: "var(--font-display), serif" }}
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
          className="text-xl md:text-2xl text-silver-soft max-w-2xl mb-8 drop-shadow-md"
        >
          Software Engineer & Photographer. I build scalable systems and capture life's moments.
        </motion.p>

        <div className="flex space-x-4">
          <a
            href="#gallery"
            className="px-8 py-3 text-lg font-medium text-darkroom bg-safelight hover:brightness-110 transition duration-300 cursor-pointer rounded-sm border border-safelight-glow/30 hover:shadow-lg hover:shadow-safelight/20 focus:outline-none focus:ring-2 focus:ring-safelight"
          >
            View Gallery
          </a>
          <a
            href="#about"
            className="px-8 py-3 text-lg font-medium text-silver border border-[var(--edge-bright)] hover:border-safelight hover:text-safelight transition duration-300 cursor-pointer rounded-sm focus:outline-none focus:ring-2 focus:ring-safelight"
          >
            About Me
          </a>
          <a
            href="/blog"
            className="px-8 py-3 text-lg font-medium text-silver border border-[var(--edge-bright)] hover:border-safelight hover:text-safelight transition duration-300 cursor-pointer rounded-sm focus:outline-none focus:ring-2 focus:ring-safelight"
          >
            Blog
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
