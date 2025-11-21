"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type ImageMetadata = {
  original: string;
  blur: string;
  variants: {
    small: string;
    medium: string;
    large: string;
  };
  width: number;
  height: number;
};

export default function Gallery({ images }: { images: string[] }) {
  const [metadata, setMetadata] = useState<Record<string, ImageMetadata>>({});

  // Load image metadata for optimized variants
  useEffect(() => {
    async function loadMetadata() {
      try {
        const res = await fetch('/photos/images-metadata.json');
        if (res.ok) {
          const data = await res.json();
          setMetadata(data);
        }
      } catch (err) {
        console.warn('Could not load image metadata:', err);
      }
    }
    loadMetadata();
  }, []);

  // Group images so we can place specific filenames in sections
  const myselfImages = images.filter((s) => s.toLowerCase().startsWith("/photos/myself"));
  const coopImages = images.filter((s) => s.toLowerCase().includes("coop"));
  const vetteImages = images.filter((s) => s.toLowerCase().includes("vette"));

  const renderImage = (src: string, i: number) => {
    const fileName = src.split("/").pop() || src;
    const imageMeta = metadata[fileName];

    return (
      <motion.div
        key={src}
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full"
      >
        <div className="relative w-full h-[600px]">
          <Image
            src={src}
            alt={`Photo ${i + 1}`}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-sm"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section className="card w-full border border-[var(--accent)]/20 p-8 bg-[var(--secondary-dark)]">
      {coopImages.length > 0 && (
        <div className="grid grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-2 md:grid-cols-3 mb-4">
          {coopImages.map((src, i) => renderImage(src, i))}
        </div>
      )}

      {vetteImages.length > 0 && (
        <div className="grid grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-2 md:grid-cols-3 mb-4">
          {vetteImages.map((src, i) => renderImage(src, i))}
        </div>
      )}

      {myselfImages.length > 0 && (
        <div className="grid grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-2 md:grid-cols-3 mb-4">
          {myselfImages.map((src, i) => renderImage(src, i))}
        </div>
      )}
    </section>
  );
}
