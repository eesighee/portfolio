"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest < 100) {
      setVisible(true);
    } else if (latest > prev) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-darkroom/80 border-b border-[var(--edge)]"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-silver tracking-wide"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Fotos de Alegría
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#gallery"
            className="text-sm text-silver-soft hover:text-safelight transition-colors duration-200"
          >
            Gallery
          </Link>
          <Link
            href="/#about"
            className="text-sm text-silver-soft hover:text-safelight transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm text-silver-soft hover:text-safelight transition-colors duration-200"
          >
            Blog
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
