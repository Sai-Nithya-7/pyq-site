import type { Pyq } from "@/types/pyq"

export const pyqData: Pyq[] = [
  {
    id: "ds-endsem-2022",
    title: "Endsem - Data Structures (2022)",
    year: "2022",
    subject: "Data Structures",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/pyqs/2022/data-structures-endsem-2022.pdf",
    thumbnailPath: "/thumbnails/ds-endsem-2022.png",
  },
  {
    id: "ds-endsem-2023",
    title: "Endsem - Data Structures (2023)",
    year: "2023",
    subject: "Data Structures",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/pyqs/2023/data-structures-endsem-2023.pdf",
    thumbnailPath: "/thumbnails/ds-endsem-2023.png",
  },
  {
    id: "ds-endsem-iot-2023",
    title: "Endsem - Data Structures iOT(2023)",
    year: "2023",
    subject: "Data Structures",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/pyqs/2023/data-structures-iot-endsem-2023.pdf",
    thumbnailPath: "/thumbnails/ds--iot-endsem-2023.png",
  },
  {
    id: "ds-endsem-2024",
    title: "Endsem - Data Structures (2024)",
    year: "2024",
    subject: "Data Structures",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/pyqs/2024/data-structures-endsem-2024.pdf",
    thumbnailPath: "/thumbnails/ds-endsem-2024.png",
  },
  {
    id: "ds-endsem-2024",
    title: "Endsem - Data Structures iOT(2024)",
    year: "2024",
    subject: "Data Structures",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/pyqs/2024/data-structures-endsem-2024.pdf",
    thumbnailPath: "/thumbnails/ds-endsem-iot-2024.png",
  },
  {
    id: "python-endsem-2023",
    title: "Endsem - Python (2023)",
    year: "2023",
    subject: "Python",
    type: "Endsem",
    tags: ["OOP", "File Handling", "Modules"],
    pdfPath: "/pyqs/2023/python-endsem-2023.pdf",
    thumbnailPath: "/thumbnails/python-endsem-2023.png",
  },
  {
    id: "python-endsem-2022",
    title: "Endsem - Python (2022)",
    year: "2022",
    subject: "Python",
    type: "Endsem",
    tags: ["Loops", "Functions", "Dictionaries"],
    pdfPath: "/pyqs/2022/python-endsem-2022.pdf",
    thumbnailPath: "/thumbnails/python-endsem-2022.png",
  },
  {
    id: "python-endsem-2024",
    title: "Endsem - Python (2024)",
    year: "2024",
    subject: "Python",
    type: "Endsem",
    tags: ["Loops", "Functions", "Dictionaries"],
    pdfPath: "/pyqs/2024/python-endsem-2024.pdf",
    thumbnailPath: "/thumbnails/python-endsem-2024.png",
  },
  {
    id: "coa-endsem-2023",
    title: "Endsem - Computer Organization & Architecture (2023)",
    year: "2023",
    subject: "Computer Organization & Architecture",
    type: "Endsem",
    tags: ["Booth Multipliers", "Assembly", "Processor"],
    pdfPath: "/pyqs/2023/coa-endsem-2023.pdf",
    thumbnailPath: "/thumbnails/coa-endsem-2023.png",
  },
  {
    id: "coa-endsem-2024",
    title: "Endsem - Computer Organization & Architecture (2023)",
    year: "2024",
    subject: "Computer Organization & Architecture",
    type: "Endsem",
    tags: ["Booth Multipliers", "Assembly", "Processor"],
    pdfPath: "/pyqs/2024/coa-endsem-2024.pdf",
    thumbnailPath: "/thumbnails/coa-endsem-2024.png",
  },
  {
    id: "crypto-endsem-2023",
    title: "Endsem - Classical Cryptography (2023)",
    year: "2023",
    subject: "Classical Cryptography",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/PYQs/2023/classical-cryptography-endsem-2023.pdf",
    thumbnailPath: "/thumbnails/crypto-endsem-2023.png",
  },
  {
    id: "crypto-endsem-2024",
    title: "Endsem - Classical Cryptography (2023)",
    year: "2024",
    subject: "Classical Cryptography",
    type: "Endsem",
    tags: ["Linked List", "Arrays", "List ADT"],
    pdfPath: "/PYQs/2024/classical-cryptography-endsem-2024.pdf",
    thumbnailPath: "/thumbnails/crypto-endsem-2024.png",
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