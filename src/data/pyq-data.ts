import type { Pyq } from "@/types/pyq"

export const pyqData: Pyq[] = [
  {
    id: "ds-endsem-2023",
    title: "Endsem - Data Structures (2023)",
    year: "2023",
    subject: "Data Structures",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/PYQs/2023/data-structures-endsem.pdf",
    thumbnailPath: "/thumbnails/ds-endsem-2023.png",
  },
  {
    id: "python-endsem-2023",
    title: "Endsem - Python (2023)",
    year: "2023",
    subject: "Python",
    type: "Endsem",
    tags: ["OOP", "File Handling", "Modules"],
    pdfPath: "/PYQs/2023/python-endsem.pdf",
    thumbnailPath: "/thumbnails/python-endsem-2023.png",
  },
  {
    id: "python-midsem-2022",
    title: "Midsem - Python (2022)",
    year: "2022",
    subject: "Python",
    type: "Midsem",
    tags: ["Loops", "Functions", "Dictionaries"],
    pdfPath: "/PYQs/2022/python-midsem.pdf",
    thumbnailPath: "/thumbnails/python-midsem-2022.png",
  },
]

export function filterPyqs(pyqs: Pyq[], searchTerm = "", year = "", subject = "", type = ""): Pyq[] {
  const searchString = searchTerm || ""
  const words = searchString.toLowerCase().split(" ").filter(Boolean)

  return pyqs.filter((item) => {
    const matchSearch =
      words.length === 0 ||
      words.every(
        (word) => item.title.toLowerCase().includes(word) || item.tags.some((tag) => tag.toLowerCase().includes(word)),
      )

    const matchYear = !year || item.year === year
    const matchSubject = !subject || item.subject === subject
    const matchType = !type || item.type === type

    return matchSearch && matchYear && matchSubject && matchType
  })
}