import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Pyq = {
    title: string;
    year: string;
    subject: string;
    type: string;
    tags: string[];
};

const sampleData: Pyq[] = [
    {
        title: "Endsem - Data Structures (2023)",
        year: "2023",
        subject: "Data Structures",
        type: "Endsem",
        tags: ["Linked List", "Arrays", "List ADT"],
    },
    {
        title: "Endsem - Python (2023)",
        year: "2023",
        subject: "Python",
        type: "Endsem",
        tags: ["OOP", "File Handling", "Modules"],
    },
    {
        title: "Midsem - Python (2022)",
        year: "2022",
        subject: "Python",
        type: "Midsem",
        tags: ["Loops", "Functions", "Dictionaries"],
    },
];

export default function ResultsPage() {
    const router = useRouter();
    const { searchTerm = "", year = "", subject = "", type = ""} = router.query;

    const noFilter = !searchTerm && !year && !subject && !type;
     
    const [filterResults, setFilterResults] = useState<Pyq[]>([]);
    const [cSearch, setCSearch] = useState(searchTerm);
    const [cYear, setCYear] = useState(year);
    const [cSubject, setCSubject] = useState(subject);
    const [cType, setCType] = useState(type);

    useEffect(() => {
        const SearchWords = (searchTerm as string)
    })
    useEffect(() => {
        const filter = sampleData.filter((item) => {
            const words = (searchTerm as string).toLowerCase().split(" ").filter(Boolean);
            
            const matchSearch = 
            !searchTerm ||
            words.every((word) =>
                item.title.toLowerCase().includes((word).toLowerCase()) ||
            item.tags.some((tag) =>
                tag.toLowerCase().includes((word).toLowerCase())
            )
            );

            const matchYear = !year || item.year === year;
            const matchSubject = !subject || item.subject === subject;
            const matchType = !type || item.type === type;

            return noFilter || (matchSearch && matchYear && matchSubject && matchType);
        });

        setFilterResults(filter);
    }, [searchTerm, year, subject, type]);

    return (
        <>
            <Head>
                <title> Search Results |PYQ Search</title>
            </Head>
            <div className = "min-h-screen bg-black text-white p-4 sm:p-8">
                <header className = "flex justify-between items-center mb-6">
                    <h1 className = "text-2xl font-bold">Search Results</h1>
                    <Link href = "/" passHref>
                    <button className = "text-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transitions">
                        Back to Home
                    </button>
                    </Link>
                </header>

                {noFilter && (
                    <p className = "text-gray-400 text-center mb-6">
                        No filters applied. Showing all PYQs.
                    </p>
                )}
                
                {filterResults.length === 0 ? (
                    <p className = "text-gray-400 text-center">No results found.</p>
                ) : ( 
                    <div className = "grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {filterResults.map((item, index) => (
                            <div
                                key = {index}
                                className = "bg-gray-800 p-4 rounded-lg shadow:hover-lg transition-all"
                            >
                                <h2 className = "text-lg font-semibold">{item.title}</h2>
                                <p className = "text-sm text-gray-400 mt-1">
                                    Tags: {item.tags.join(", ")}
                                </p>
                                <div className = "flex gap-3 mt-4">
                                    <button title = "View" className = "bg-blue-600 hover:bg-blue-700 p-2 rounded-full">
                                        🔍 
                                    </button>
                                    <button title = "Download" className = "bg-green-600 hover:bg-green-700 p-2 rounded-full">
                                        ⬇️
                                    </button>
                                </div>
                            </div> 
                        ))}
                    </div>
                )
            }
            </div>
        </>
    );
}