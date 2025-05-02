const fs = require("fs");
const path = require("path");
const { generateThumbnail } = require("../utils/thumbnail-generator");

const PDF_DIR = path.join(__dirname, "../../public/pyqs");
const THUMBNAIL_DIR = path.join(__dirname, "../../public/thumbnails");

if (!fs.existsSync(THUMBNAIL_DIR)) {
  fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.name.toLowerCase().endsWith(".pdf")) {

      const relativePath = path.relative(PDF_DIR, fullPath);
      const thumbnailName = path.basename(relativePath, ".pdf") + ".png";
      const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailName);

      try {
        await generateThumbnail(fullPath, thumbnailPath);
        console.log(`Processed: ${relativePath}`);
      } catch (error) {
        console.error(`Failed to process ${relativePath}:`, error);
      }
    }
  }
}

(async () => {
  console.log("Starting thumbnail generation...");
  console.log(`PDF directory: ${PDF_DIR}`);
  console.log(`Thumbnail directory: ${THUMBNAIL_DIR}`);
  
  try {
    await processDirectory(PDF_DIR);
    console.log("Thumbnail generation complete!");
  } catch (error) {
    console.error("Error during thumbnail generation:", error);
    process.exit(1);
  }
})();