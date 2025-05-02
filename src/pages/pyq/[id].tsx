"use client"

import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import { ArrowLeft } from  "lucide-react"
import PdfViewer from "@/components/pdf-viewer"
import { pyqData } from "@/data/pyq-data"

export default function PyqDetailPage() {
    const router = useRouter()
    const { id } = router.query
    const pyq = pyqData.find((item) => item.id === id)
    if (!pyq) {
        return (
            <div className = "min-h-screen bg-black text-white p-8">
                <Head>
                    <title>PYQ Not Found | PYQ Search</title>
                </Head>
                <div className = "max-h-4xl mx-auto">
                    <Link href = "/results" className = "inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
                        <ArrowLeft className = "mr-2 h-4 w-4" />
                        Back to Results
                    </Link>

                    <div className = "bg-gray-800 rounded-lg p-8 text-center">
                        <h1 className = "text-2xl font-bold mb-4">PYQ Not Found</h1>
                        <p className = "text-gray-400 mb-6">The requested PYQ could not be found.</p>
                        <Link href = "/results">
                            <button className = "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                Browse All PYQs
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className = "min-h-screen bg-black text-white p-4 sm:p-8">
            <Head>
                <title>{pyq.title} | PYQ Search</title>
            </Head>

            <div className = "max-w-5xl mx-auto">
                <div className = "mb-6">
                    <Link 
                        href = "/results"
                        className = "inline-flex items-center text-blue-400 hover:blue-300">
                            <ArrowLeft className = "mr-2 w-4 h-4" />
                            Back to Results
                    </Link>
                </div>
                
                <div className = "mb-6">
                    <h1 className = "text-2xl font-bold mb-2">{pyq.title}</h1>
                    <div className = "flex flex-wrap gap-2 mb-4">
                        <span className = "bg-blue-900 text-xs px-2 py-1 rounded">{pyq.year}</span>
                        <span className = "bg-purple-900 text-xs px-2 py-1 rounded">{pyq.subject}</span>
                        <span className = "bg-green-900 text-xs px-2 py-1 rounded">{pyq.type}</span>
                    </div>

                    {pyq.tags.length > 0 && (
                        <div className = "text-sm text-gray-400">
                            <span className = "font-medium">Topics covered: </span>
                            {pyq.tags.join(", ")}
                        </div>
                    )}
                </div>

                <div className = "bg-gray-900 rounded-lg overflow-hidden">
                    <PdfViewer pdfPath = {pyq.pdfPath} title = {pyq.title} />
                </div>
            </div>
        </div>
    )
}