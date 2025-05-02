import Image from "next/image"
import Link from "next/link"
import { Eye, Download } from "lucide-react"
import type { Pyq } from "@/types/pyq"

interface PyqCardProps {
    pyq: Pyq
}

export default function PyqCard({ pyq }: PyqCardProps) {
    return (
        <div className = "bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:translate-y-[-2px]">
            <div className = "relative h-40 bg-gray-700">
                <Image 
                    src = {pyq.thumbnailPath || "/placeholder.svg"}
                    alt = {`Thumbnal for ${pyq.title}`}
                    fill
                    className = "object-cover"
                    onError = {(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                    }}
                />
            </div>

            <div className = "p-4">
                <h2 className = "text-lg font-semibold line-clamp-2">{pyq.title}</h2>

                <div className = "flex flex-wrap gap-2 mt-2">
                    <span className = "bg-blue-900 text-xs px-2 py-1 rounded">{pyq.type}</span>
                </div>

                {pyq.tags.length > 0 && (
                    <p className = "text-sm text-gray-400 mt-3 line-clamp-1">Topics: {pyq.tags.join(",")}</p>
                )}

                <div className = "flex gap-3 mt-4 justify-between">
                    <Link href = {`/pyq/${pyq.id}`} className = "flex-1">
                        <button title = "View PDF"
                        className = "w-full bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors flex items-center justify-center"
                        >
                            <Eye className = "w-4 h-4" />
                            <span>View</span>
                        </button>
                    </Link>

                    <a href = {pyq.pdfPath} download className = "flex-1">
                        <button
                            title = "Download PDF"
                            className = "w-full bg-green-60 hover:bg-green-700 p-2 rounded transition-colors flex items-center justify-center gap-2"
                        >
                            <Download className = "w-4 h-4" />
                            <span>Download</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}