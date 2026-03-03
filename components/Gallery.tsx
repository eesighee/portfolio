"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { isRemoteImage } from "../lib/image-utils";

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

export default function Gallery({
  coopImages,
  vetteImages,
  myselfImages,
}: {
  coopImages: string[];
  vetteImages: string[];
  myselfImages: string[];
}) {
  const [metadata, setMetadata] = useState<Record<string, ImageMetadata>>({});

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

  const renderImage = (src: string, i: number) => {
    const imageMeta = isRemoteImage(src) ? undefined : metadata[src];
    const aspectW = imageMeta?.width ?? 3;
    const aspectH = imageMeta?.height ?? 4;

    return (
      <motion.div
        key={src}
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-4 break-inside-avoid group"
      >
        <div
          className="relative w-full overflow-hidden rounded-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/30"
          style={{ aspectRatio: `${aspectW} / ${aspectH}` }}
        >
          <Image
            src={src}
            alt={`Photo ${i + 1}`}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-sm transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </motion.div>
    );
  };

  const sectionHeader = (title: string) => (
    <div className="py-6 mb-2">
      <h3 className="text-2xl font-semibold text-silver tracking-wide text-center">
        {title}
      </h3>
      <div className="mt-2 mx-auto w-16 h-px bg-safelight/40" />
    </div>
  );

  return (
    <section className="w-full space-y-12">
      {coopImages.length > 0 && (
        <div>
          {sectionHeader("Coop")}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {coopImages.map((src, i) => renderImage(src, i))}
          </div>
        </div>
      )}

      {vetteImages.length > 0 && (
        <div>
          {sectionHeader("Auto")}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {vetteImages.map((src, i) => renderImage(src, i))}
          </div>
        </div>
      )}

      {myselfImages.length > 0 && (
        <div>
          {sectionHeader("Self-Portraits")}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {myselfImages.map((src, i) => renderImage(src, i))}
          </div>
        </div>
      )}
    </section>
  );
}
