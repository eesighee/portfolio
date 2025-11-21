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
  lightbox: 2048,
};

// Supported image extensions (skip .webp to avoid re-processing generated variants)
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Function to recursively get all image files
function getFilesRecursively(directory) {
  let files = [];
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImages() {
  try {
    const allFiles = getFilesRecursively(PHOTOS_DIR);

    const originalImageFiles = allFiles.filter((filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      const fileName = path.basename(filePath);
      const isVariantName = /-(small|medium|large|lightbox)\./i.test(fileName);
      return SUPPORTED_EXTENSIONS.includes(ext) && !fileName.startsWith('.') && !isVariantName;
    });

    if (originalImageFiles.length === 0) {
      console.log('No original images found in public/photos/ or its subdirectories.');
      return;
    }

    console.log(`Found ${originalImageFiles.length} images to optimize...`);

    const metadata = {};

    for (const inputPath of originalImageFiles) {
      const relativePath = path.relative(PHOTOS_DIR, inputPath); // e.g., 'coop/coop.jpg'
      const file = path.basename(inputPath); // e.g., 'coop.jpg'
      const fileWithoutExt = path.parse(file).name; // e.g., 'coop'
      const dirWithoutPhotos = path.dirname(relativePath); // e.g., 'coop'

      try {
        const image = sharp(inputPath);
        const imageMetadata = await image.metadata();

        console.log(`\nOptimizing: ${relativePath} (${imageMetadata.width}x${imageMetadata.height})`);

        // Generate blur placeholder (10px width, very low quality base64)
        const blurBuffer = await sharp(inputPath)
          .resize(10, 10, { fit: 'cover' })
          .jpeg({ quality: 20 })
          .toBuffer();
        const blurBase64 = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;

        // Generate WebP versions for each size
        const variants = {};
        for (const [sizeKey, sizeValue] of Object.entries(SIZES)) {
          // Construct webpPath to be in the same subdirectory as the original
          const webpFileName = `${fileWithoutExt}-${sizeKey}.webp`;
          const webpPath = path.join(PHOTOS_DIR, dirWithoutPhotos, webpFileName);

          await sharp(inputPath)
            .resize(sizeValue, Math.round((imageMetadata.height / imageMetadata.width) * sizeValue), {
              fit: 'cover',
              withoutEnlargement: true,
            })
            .webp({ quality: 95 })
            .toFile(webpPath);

          variants[sizeKey] = `/photos/${dirWithoutPhotos}/${webpFileName}`; // URL path
          console.log(`  ✓ Generated ${sizeKey} WebP (${sizeValue}px)`);
        }

        // Store metadata for this image
        metadata[relativePath] = { // Store by relative path, not just filename
          original: `/photos/${relativePath}`,
          blur: blurBase64,
          variants: variants,
          width: imageMetadata.width,
          height: imageMetadata.height,
        };
      } catch (err) {
        console.error(`Error optimizing ${relativePath}:`, err.message);
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
