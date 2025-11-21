"use client";

import Image from "next/image";
import Gallery from "../components/Gallery";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";

export default function HomeClient({
  coopImages,
  vetteImages,
  myselfImages,
}: {
  coopImages: string[];
  vetteImages: string[];
  myselfImages: string[];
}) {
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.5 }
  };

  return (
    <div 
      className="min-h-screen text-[var(--text-light)]"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px),
          linear-gradient(135deg, #121212 0%, #3A3A3A 50%, #121212 100%)
        `,
        backgroundSize: '12px 12px, 100% 100%',
        backgroundAttachment: 'scroll, fixed'
      }}
    >
      {/* Full-Screen Hero */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <motion.h2
          {...animationProps}
          id="gallery"
          className="text-4xl font-bold text-center mb-12 border-b-2 border-[var(--accent)]/20 pb-4"
        >
          Moments In Time
        </motion.h2>

        <Gallery coopImages={coopImages} vetteImages={vetteImages} myselfImages={myselfImages} />

        <div id="about" className="mt-24 pt-8 border-t border-[var(--secondary-dark)]">
          <motion.h2
            {...animationProps}
            className="text-4xl font-bold text-center mb-8"
          >
            About Me
          </motion.h2>
          <motion.section
            {...animationProps}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card max-w-3xl mx-auto border-2 border-[var(--accent)]/20 p-8 bg-[var(--secondary-dark)]"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-48 h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-[var(--accent)]/30">
                <Image
                  src="/photos/profile/me.JPG"
                  alt="Isai Alegria"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 30%" }}
                  className="rounded-full"
                />
              </div>
              <p className="text-[var(--text-light)] leading-relaxed text-lg">
                Welcome to my photography portfolio. My name is Isai Alegria, 
                I wanted to build a little project to share some of my favorite memories
                with you guys.
                Feel free to explore the gallery and contact me with any questions, ideas, or if you want to collab!
              </p>
            </div>
          </motion.section>

          <motion.section
            {...animationProps}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card mt-16 text-center max-w-3xl mx-auto border-2 border-[var(--accent)]/20 p-8 bg-[var(--secondary-dark)]"
          >
            <h3 className="text-2xl font-semibold text-[var(--text-light)] mb-6">Connect</h3>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                                                                                  <a
                                                                                                    href="mailto:eesighee@gmail.com"
                                                                                                    className="inline-block px-8 py-3 w-48 md:w-auto text-[var(--primary-dark)] rounded-sm font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl border border-white"
                                                                                                                    style={{
                                                                                                                      backgroundImage: 'linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FFA000 100%)'
                                                                                                                    }}                                                                                                  >
                                                                                                    Email
                                                                                                  </a>
                                                                                                  <a
                                                                                                    href="https://instagram.com/c8_sai"
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="inline-block px-8 py-3 w-48 md:w-auto text-white rounded-sm font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl border border-white"
                                                                                                    style={{
                                                                                                      backgroundImage: 'linear-gradient(135deg, #f687b3 0%, #ec4899 50%, #db2777 100%)'
                                                                                                    }}
                                                                                                  >
                                                                                                    Instagram
                                                                                                  </a>
                                                                                                  <a
                                                                                                    href="https://twitter.com/eesighee"
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="inline-block px-8 py-3 w-48 md:w-auto text-white rounded-sm font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl border border-white"
                                                                                                    style={{
                                                                                                      backgroundImage: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0284c7 100%)'
                                                                                                    }}
                                                                                                  >
                                                                                                    Twitter / X
                                                                                                  </a>            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
