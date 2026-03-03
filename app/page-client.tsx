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
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen">
      {/* Full-Screen Hero */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <motion.h2
          {...animationProps}
          id="gallery"
          className="text-4xl font-bold text-center mb-12 border-b border-safelight/20 pb-4"
        >
          Moments In Time
        </motion.h2>

        <Gallery coopImages={coopImages} vetteImages={vetteImages} myselfImages={myselfImages} />

        <div id="about" className="mt-24 pt-8 border-t border-[var(--edge)]">
          <motion.h2
            {...animationProps}
            className="text-4xl font-bold text-center mb-8"
          >
            About Me
          </motion.h2>
          <motion.section
            {...animationProps}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto border border-[var(--edge)] p-8 bg-film rounded-sm"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative w-56 h-56 flex-shrink-0 rounded-full overflow-hidden border-4 border-safelight/20">
                <Image
                  src="/photos/profile/me.JPG"
                  alt="Isai Alegria"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 30%" }}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-3xl font-bold self-center">Isai Alegria</h3>
                <p className="text-safelight font-medium mt-1 mb-4 self-center">Software Engineer & Photographer</p>
                <p className="text-silver-soft leading-relaxed text-lg">
                  Welcome to my portfolio — a space where I share some of my favorite moments through the lens.
                  Feel free to explore the gallery, and don't hesitate to reach out with any questions, ideas, or collaboration opportunities.
                </p>
                <div className="w-16 h-px bg-safelight/40 my-6" />
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a
                    href="mailto:eesighee@gmail.com"
                    aria-label="Email eesighee@gmail.com"
                    className="inline-block px-8 py-3 w-48 sm:w-auto rounded-sm font-semibold transition-all duration-200 border border-[var(--edge)] hover:border-safelight hover:text-safelight focus:outline-none focus:ring-2 focus:ring-safelight"
                  >
                    Email
                  </a>
                  <a
                    href="https://instagram.com/eesighee_"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram (opens in new window)"
                    className="inline-block px-8 py-3 w-48 sm:w-auto rounded-sm font-semibold transition-all duration-200 border border-[var(--edge)] hover:border-safelight hover:text-safelight focus:outline-none focus:ring-2 focus:ring-safelight"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://twitter.com/eesighee"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X (opens in new window)"
                    className="inline-block px-8 py-3 w-48 sm:w-auto rounded-sm font-semibold transition-all duration-200 border border-[var(--edge)] hover:border-safelight hover:text-safelight focus:outline-none focus:ring-2 focus:ring-safelight"
                  >
                    Twitter / X
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
