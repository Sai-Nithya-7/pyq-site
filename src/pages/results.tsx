"use client"

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { SlidersHorizontal } from "lucide-react";

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
    const [cSearch, setCSearch] = useState(searchTerm as string);
    const [cYear, setCYear] = useState(year as string);
    const [cSubject, setCSubject] = useState(subject as string);
    const [cType, setCType] = useState(type as string);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        setCSearch(searchTerm as string);
        setCYear(year as string);
        setCSubject(subject as string);
        setCType(type as string);
    }, [searchTerm, year, subject, type]);

    useEffect(() => {
        const searchString = (searchTerm as string) || ""
        const words = searchString.toLowerCase().split(" ").filter(Boolean);

        const filter = sampleData.filter((item) => {
            const matchSearch = 
            words.length === 0 ||
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
    
    const updateQuery = (newQuery: string, value: string) => {
        const newValue = {
            ...router.query,
            [newQuery] : value,
        };

        if (!value) delete newValue[newQuery];
        router.push({ pathname: "/results", query: newValue }, undefined, { shallow: true});
    };

    return (
        <>
            <Head>
                <title> Search Results | PYQ Search</title>
                <meta name = "description" content = "Search results for the applied filters" />
            </Head>
            <div className = "min-h-screen bg-black text-white p-4 sm:p-8">
                <header className = "flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className = "text-2xl font-bold">Search Results</h1>
                    <div className = "flex items-center gap-4">
                        <button className = "bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                        onClick = {() => setShowFilter((prev) => !prev)}
                        title = "Filters"
                        >
                            <SlidersHorizontal className = "text-white w-6 h-6"/>
                        </button>
                        <Link href = "/" passHref>
                            <button className = "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </header>

                <div className = "flex flex-col md:flex-row gap-6">
                    {showFilter && (
                        <aside className = "w-full md:w-1/4 bg-gray-900 p-4 rounded-lg">
                        <h2 className = "text-lg font-semibold mb-4">Filters</h2>
                        <input
                        type = "text"
                        placeholder = "Search ..."
                        className = "w-full mb-4 p-2 rounded bg-gray-800 text-white"
                        value = {cSearch}
                        onChange = {(e) => updateQuery("searchTerm", e.target.value)}
                        />

                        <select 
                            className = "w-full mb-4 p-2 rounded bg-gray-800 text-white"
                            value = {cYear}
                            onChange={(e) => updateQuery("year", e.target.value)}
                        >
                            <option value = "">Year (All)</option>
                            <option value = "2023">2023</option>
                            <option value = "2022">2022</option>
                        </select>

                        <select 
                            className = "w-full mb-4 p-2 rounded bg-gray-800 text-white"
                            value = {cSubject}
                            onChange = {(e) => updateQuery("subject", e.target.value)}
                        >
                            <option value = "">Subject (All)</option>
                            <option value = "Data Structures">Data Structures</option>
                            <option value = "Python">Python</option>
                        </select>

                        <select 
                            className = "w-full mb-4 p-2 rounded bg-gray-800 text-white"
                            value = {cType}
                            onChange = {(e) => updateQuery("type", e.target.value)}
                        >
                            <option value = "">Type (All)</option>
                            <option value = "Endsem">Endsem</option>
                            <option value = "Midsem">Midsem</option>
                        </select>

                        <button
                            className = "w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                            onClick = {() => {
                                router.push("/results")
                            }}
                        >
                            Clear all Filters
                        </button>
                    </aside>
                    )}

                    <main className = {`"flex-1" $ {!showFilter ? "w-full" : ""}`}>
                        {noFilter && (
                        <p className = "text-gray-400 text-center mb-6">
                            No filters applied. Showing all PYQs.
                        </p>
                        )}

                        {!noFilter && (
                            <div className = "mb-6 p-3 bg-gray-900 rounded-lg">
                                <h2 className = "font-semibold mb-2">Applied Filters:</h2>
                                <div className = "flex flex-wrap gap-2">
                                    { searchTerm && (
                                        <span
                                            className = "bg-blue-600 px-3 py-1 rounded-full text-sm"> Search: {searchTerm}</span>
                                    )}
                                    { year && (
                                        <span
                                            className = "bg-green-600 px-3 py-1 rounded-full text-sm"> Year: {year}</span>
                                    )}
                                    { subject && (
                                        <span
                                            className = "bg-purple-600 px-3 py-1 rounded-full text-sm"> Subject: {subject}</span>
                                    )}
                                    { type && (
                                        <span
                                            className = "bg-orange-600 px-3 py-1 rounded-full text-sm"> Type: {type}</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {filterResults.length === 0 ? (
                            <div className = "text-center py-10">
                                <p className = "text-gray-400 text-xl mb-4">No results found.</p>
                                <p className = "text-gray-400 text-xl mb-4">Try adjusting your search filters.</p>
                            </div>
                            ) : ( 
                                <div className = "grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {filterResults.map((item, index) => (
                                        <div
                                            key = {index}
                                            className = "bg-gray-800 p-4 rounded-lg shadow:hover-lg transition-all hover:translate-y-[-2px]"
                                        >
                                            <h2 className = "text-lg font-semibold">{item.title}</h2>
                                            <div className = "flex flex-wrap gap-2 mt-2">
                                                <p className = "text-sm text-gray-400 mt-1">
                                                    Tags: {item.tags.join(", ")}
                                                </p>
                                            </div>
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
                            )}
                    </main>  
                </div>
            </div>
        </>
    );
}