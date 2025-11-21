#!/usr/bin/env node
/**
 * Image optimization script
 * Generates WebP variants, multiple sizes, and blur placeholders for all images in public/photos/
 * Outputs metadata to public/photos/images-metadata.json for use in the gallery
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PHOTOS_DIR = path.join(process.cwd(), 'public', 'photos');
const OUTPUT_METADATA_FILE = path.join(PHOTOS_DIR, 'images-metadata.json');

// Image sizes to generate (width in pixels)
const SIZES = {
  small: 400,
  medium: 800,
  large: 1200,
};

// Supported image extensions (skip .webp to avoid re-processing generated variants)
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function optimizeImages() {
  try {
    // Read all files in photos directory
    const files = fs.readdirSync(PHOTOS_DIR).filter((f) => {
      const ext = path.extname(f).toLowerCase();
      // Skip files that look like already-generated variants (e.g. name-small.jpg or name-small.webp)
      const isVariantName = /-(small|medium|large)\./i.test(f);
      return SUPPORTED_EXTENSIONS.includes(ext) && !f.startsWith('.') && !isVariantName;
    });

    if (files.length === 0) {
      console.log('No images found in public/photos/');
      return;
    }

    console.log(`Found ${files.length} images to optimize...`);

    const metadata = {};

    for (const file of files) {
      const inputPath = path.join(PHOTOS_DIR, file);
      const fileWithoutExt = path.parse(file).name;

      try {
        const image = sharp(inputPath);
        const imageMetadata = await image.metadata();

        console.log(`\nOptimizing: ${file} (${imageMetadata.width}x${imageMetadata.height})`);

        // Generate blur placeholder (10px width, very low quality base64)
        const blurBuffer = await sharp(inputPath)
          .resize(10, 10, { fit: 'cover' })
          .jpeg({ quality: 20 })
          .toBuffer();
        const blurBase64 = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;

        // Generate WebP versions for each size
        const variants = {};
        for (const [sizeKey, sizeValue] of Object.entries(SIZES)) {
          const webpFileName = `${fileWithoutExt}-${sizeKey}.webp`;
          const webpPath = path.join(PHOTOS_DIR, webpFileName);

          await sharp(inputPath)
            .resize(sizeValue, Math.round((imageMetadata.height / imageMetadata.width) * sizeValue), {
              fit: 'cover',
              withoutEnlargement: true,
            })
            .webp({ quality: 80 })
            .toFile(webpPath);

          variants[sizeKey] = `/photos/${webpFileName}`;
          console.log(`  ✓ Generated ${sizeKey} WebP (${sizeValue}px)`);
        }

        // Store metadata for this image
        metadata[file] = {
          original: `/photos/${file}`,
          blur: blurBase64,
          variants: variants,
          width: imageMetadata.width,
          height: imageMetadata.height,
        };
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err.message);
      }
    }

    // Write metadata to file so gallery can use it
    fs.writeFileSync(OUTPUT_METADATA_FILE, JSON.stringify(metadata, null, 2));
    console.log(`\n✓ Metadata saved to ${OUTPUT_METADATA_FILE}`);
    console.log('Image optimization complete!');
  } catch (err) {
    console.error('Error during image optimization:', err);
    process.exit(1);
  }
}

optimizeImages();
