import fs from "fs";
import path from "path";
import HomeClient from "./page-client";

export default function Home() {
  // Read photos from the public/photos directory at build/runtime on the server
  let images: string[] = [];
  try {
    const photosDir = path.join(process.cwd(), "public", "photos");
    const files = fs.readdirSync(photosDir).sort((a, b) => a.localeCompare(b));
    const originals = files.filter((f) => {
      const extOk = /\.(jpe?g|png|webp|svg)$/i.test(f);
      const isVariant = /-(small|medium|large)\.(webp|jpe?g|png)$/i.test(f);
      const isMetadata = f === "images-metadata.json";
      const isFavicon = f.startsWith("favicon") || f === "apple-touch-icon.png";
      const isHeroImage = f === "austin_storm.jpg";
      const isProfileImage = f === "me.JPG";
      return extOk && !isVariant && !isMetadata && !isFavicon && !isHeroImage && !isProfileImage;
    });

    // Group for stability: coop first, vette second, then others (all alphabetically within each group)
    const coop = originals.filter(f => f.toLowerCase().includes("coop")).sort();
    const vette = originals.filter(f => f.toLowerCase().includes("vette")).sort();
    const others = originals.filter(f => !f.toLowerCase().includes("coop") && !f.toLowerCase().includes("vette")).sort();

    images = [...coop, ...vette, ...others].map(f => `/photos/${f}`);
  } catch (e) {
    images = [];
  }

  return <HomeClient images={images} />;
}