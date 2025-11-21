import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

type LightboxProps = {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  metadata?: Record<string, ImageMetadata>;
};

export default function Lightbox({ images, index, onClose, onPrev, onNext, metadata = {} }: LightboxProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const currentImage = images[index];
  const fileName = currentImage.split('/').pop() || currentImage;
  const imageMeta = metadata[fileName];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        onClick={onClose}
      >
        <motion.div
          className="max-h-full max-w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div 
            layoutId={`photo-${index}`}
            className="relative w-[min(90vw,1000px)] h-[min(60vh,700px)]"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image
              src={currentImage}
              alt={`Photo ${index + 1}`}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>

          <div className="mt-4 flex items-center justify-between gap-4 text-white">
            <button onClick={onPrev} className="rounded bg-white/10 px-3 py-2">Prev</button>
            <button onClick={onClose} className="rounded bg-white/10 px-3 py-2">Close</button>
            <button onClick={onNext} className="rounded bg-white/10 px-3 py-2">Next</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
