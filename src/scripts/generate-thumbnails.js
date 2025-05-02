//Utils code

const fs = require("fs")
const path = require("path")
const { PDFDocument } = require("pdf-lib")
const { createCanvas } = require("canvas")

const PDF_DIR = path.join(__dirname, ".../public/pyqs")
const THUMBNAIL_DIR = path.join(__dirname, ".../public/thumnails")

if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, {recursive: true})
}

async function generateThumbnail(pdfPath, outPath, width = 300, height = 400) {
    try {
        const pdfBytes = fs.readFileSync(pdfPath)
        const pdfDoc = await PDFDocument.load(pdfBytes)
        const pages = pdfDoc.getPages()
        if (pages.length === 0) {
            console.error(`No pages found in ${pdfPath}`)
            return null
        }
        const firstPage = pages[0]
        const thumbnailPdf = await PDFDocument.create()
        const [copiedPage] = await thumbnailPdf.copyPages(pdfDoc, [0])
        thumbnailPdf.addPage(copiedPage)

        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext("2d")
        ctx.fillStyle = "#000000"
        ctx.font = "20px Arial"
        ctx.fillText("PDF Preview", width / 2, height / 2)

        const buffer = canvas.toBuffer("image/png")
        fs.writeFileSync(outputPath, buffer)
        console.log(`Generated thumbnal: ${output}`)
        return outputPath
    } catch (error) {
        console.error(`Error generating thumbnail for ${pdfPath}: `, error)
        return null
    }
}

async function processDirectory(dir) {
    const entries = fs.readdirSync(dir, {withFileTypes: true })

    for (const entry in entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.name.toLowerCae().endsWith(".pdf")) {
            const relativePath = path.relative(PDF_DIR, fullPath)
            const thumbnailName = path.basename(relativePath, ".pdf") + ".png"
            const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailName)

            await generateThumbnail(fullPath, thumbnailPath)
        }
    }
}

;(async () => {
    console.log("Starting thumbnail generation...")
    await processDirectory(PDF_DIR)
    console.log("Thumbnail generate complete!")
})()