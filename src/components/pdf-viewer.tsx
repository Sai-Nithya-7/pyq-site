"use client"

import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

const pdfWorker = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf/worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

interface PdfViewerProp {
    pdfPath: string
    title: string
}

export default function PdfViewer({ pdfPath, title}: PdfViewerProp) {
    const [numPages, SetnumPages] = useState<number | null>(null)
    const [PgNo, SetPgNo] = useState(1)
    const [scale, SetScale] = useState(1.0)
    const [load, SetLoad] = useState(true)
    const [error, SetError] = useState<Error | null>(null)
    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    })

    function DocumentSuccess({ numPages }: { numPages: number }) {
        SetnumPages(numPages)
        SetLoad(false)
    }

    function DocumentFail( error: Error ) {
        SetError(error)
        SetLoad(false)
    }

    function changePage(offset: number) {
        SetPgNo((prevPgNo) => {
            const newPgNo = prevPgNo + offset
            return Math.max(1, Math.min(numPages || 1, newPgNo))
        })
    }

    function changeScale(delta: number) {
        SetScale((prevScl) => {
            const newScl = prevScl + delta
            return Math.max(0.5, Math.min(2.5, newScl))
        })
    }

    return (
        <div className = "flex flex-col items-center">
            <div className = "w-full bg-gray-800 p-4 rounded-t-lg flex justify-between items-center">
                <h2 className = "text-lg font-medium truncate">{title}</h2>
                <div className = "flex items-center gap-2">
                    <a
                        href = {pdfPath}
                        download className = "p-2 bg-green-600 hover:bg:green-700 rounded-full transition-colors"
                        title = "Download PDF"
                    >
                        <Download className = "w-5 h-5" />
                    </a>
                </div>
            </div>

            <div className = "w-full bg-gray-900 p-4 rounded-b-lg overflow-auto max-h-[80vh]">
                {load && (
                    <div className = "flex justify-center items-center h-[500px]">
                        <div className = "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className = "flex flex-col justify-center items-center h-[500px] text-red-500">
                        <p className = "text-xl font-bold">
                            Please try downloading the file instead
                        </p>
                    </div>
                )}

                <Document
                    file = {pdfPath}
                    onLoadSuccess = {DocumentSuccess}
                    onLoadError = {DocumentFail}
                    className = "flex justify-center"
                >
                    <Page
                        pageNumber = {PgNo}
                        scale = {scale}
                        renderTextLayer = {true}
                        renderAnnotationLayer = {true}
                        className = "shadow-lg"
                    />
                </Document>
                
                {numPages && (
                    <div className = "flex justify-between items-center mt-4 bg-gray-800 p-2 rounded-lg">
                        <div className = "flex items-center gap-2">
                            <button
                                onClick = {() => changeScale(-0.1)}
                                disabled = {scale <= 0.5}
                                className = "p-2 bg-gray-700 rounded hover:bg-gray-600 disabled: opacity-50"
                                title = "Zoom out"
                            >
                                <ZoomOut className = "w-4 h-4" />
                            </button>
                            <span className = "text-sm">{Math.round(scale*100)}&</span>
                            <button
                                onClick = {() => changeScale(0.1)}
                                disabled = {scale >= 2.5}
                                className = "p-2 bg-gray-700 rounded hover:bg-gray-600 diabled: opacity-50"
                                title = "Zoom in"
                            >
                                <ZoomIn className = "w-4 h-4" />
                            </button>
                        </div>

                        <div className = "flex items-center gap-2">
                            <button
                                onClick = {() => changePage(-1)}
                                disabled = {PgNo <= 1}
                                className = "p-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                                title = "Previous page"
                            >
                                <ChevronLeft className = "w-4 h-4" />
                            </button>
                            <span className = "text-sm"> Page {PgNo} of {numPages}</span>
                            <button
                                onClick = {() => changePage(1)}
                                disabled = {PgNo >= numPages}
                                className = "p-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                                title = "Next page"
                            >
                                <ChevronRight className = "w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}