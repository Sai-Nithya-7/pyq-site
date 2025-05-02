const { createCanvas } = require("canvas");
const { getDocument } = require("pdfjs-dist");
const fs = require("fs");
const path = require("path")

async function generateThumbnail(
  pdfPath, 
  outputPath, 
  width = 300, 
  height = 400
) {
  try {
    const pdfDocument = await getDocument(pdfPath).promise;

    const page = await pdfDocument.getPage(1);

    const viewport = page.getViewport({ scale: 1.0 });
    const scale = Math.min(width / viewport.width, height / viewport.height);
    const scaledViewport = page.getViewport({ scale });

    const canvas = createCanvas(scaledViewport.width, scaledViewport.height);
    const context = canvas.getContext("2d");

    await page.render({
      canvasContext: context,
      viewport: scaledViewport,
    }).promise;

    const buffer = canvas.toBuffer("image/png");

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, buffer);

    console.log(`Thumbnail generated: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    throw error;
  }
}

module.exports = { generateThumbnail };