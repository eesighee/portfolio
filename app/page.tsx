import fs from "fs";
import path from "path";
import HomeClient from "./page-client";

export default function Home() {
  let coopImages: string[] = [];
  let vetteImages: string[] = [];
  let myselfImages: string[] = [];

  try {
    const photosDir = path.join(process.cwd(), "public", "photos");
    const categories = ["coop", "vette", "myself"];
    let allCategorizedImages: string[] = [];

    categories.forEach(category => {
      const categoryPath = path.join(photosDir, category);
      if (fs.existsSync(categoryPath) && fs.lstatSync(categoryPath).isDirectory()) {
        const categoryFiles = fs.readdirSync(categoryPath).sort((a, b) => a.localeCompare(b));
        const originals = categoryFiles.filter((f) => {
          const extOk = /\.(jpe?g|png|webp|svg)$/i.test(f);
          const isVariant = /-(small|medium|large|lightbox)\.(webp|jpe?g|png)$/i.test(f);
          return extOk && !f.startsWith('.') && !isVariant;
        });
        originals.forEach(file => {
          allCategorizedImages.push(`/photos/${category}/${file}`);
        });
      }
    });

    // Assign to specific arrays based on collected paths
    coopImages = allCategorizedImages.filter(p => p.includes("/coop/"));
    vetteImages = allCategorizedImages.filter(p => p.includes("/vette/"));
    myselfImages = allCategorizedImages.filter(p => p.includes("/myself/"));

  } catch (e) {
    // Silently fail, props will be empty arrays
    console.error("Error reading photos directory:", e);
  }

  return <HomeClient coopImages={coopImages} vetteImages={vetteImages} myselfImages={myselfImages} />;
}