"use client"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { SlidersHorizontal, Search, X } from "lucide-react"
import PyqCard from "@/components/pyq-card"
import type { Pyq } from "@/types/pyq"
import { pyqData, filterPyqs } from "@/data/pyq-data"

export default function ResultsPage() {
    const router = useRouter()
    const { searchTerm = "", year = "", subject = "", type = ""} = router.query

    const noFilter = !searchTerm && !year && !subject && !type
     
    const [filterResults, setFilterResults] = useState<Pyq[]>([])
    const [cSearch, setCSearch] = useState(searchTerm as string)
    const [cYear, setCYear] = useState(year as string)
    const [cSubject, setCSubject] = useState(subject as string)
    const [cType, setCType] = useState(type as string)
    const [showFilter, setShowFilter] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setCSearch(searchTerm as string)
        setCYear(year as string)
        setCSubject(subject as string)
        setCType(type as string)
    }, [searchTerm, year, subject, type])

    useEffect(() => {
        setIsLoading(true)

        setTimeout(() => {
            const filter = filterPyqs(pyqData, searchTerm as string, year as string, subject as string, type as string)
            setFilterResults(filter)
            setIsLoading(false)
        }, 500)
    }, [searchTerm, year, subject, type])
    
    const updateQuery = (newQuery: string, value: string) => {
        const newValue = {
            ...router.query,
            [newQuery] : value,
        }

        if (!value) delete newValue[newQuery]
        router.push({ pathname: "/results", query: newValue }, undefined, { shallow: true})
    }

    const clearFilter = (filter: string) => {
        const newQuery = { ...router.query }
        delete newQuery[filter]
        router.push({ pathname: "/results", query: newQuery}, undefined, {shallow: true})
    }

    const clearAll = () => {
        router.push("/pathname", undefined, {shallow: true})
    }

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
                        <div className = "relative mb-4">
                            <input
                                type = "text"
                                placeholder = "Search ..."
                                className = "w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value = {cSearch}
                                onChange = {(e) => updateQuery("searchTerm", e.target.value)}
                            />
                            <Search className = "absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        </div>

                        <select 
                            className = "w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value = {cYear}
                            onChange={(e) => updateQuery("year", e.target.value)}
                        >
                            <option value = "">Year (All)</option>
                            <option value = "2024">2024</option>
                            <option value = "2023">2023</option>
                            <option value = "2022">2022</option>
                        </select>

                        <select 
                            className = "w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value = {cSubject}
                            onChange = {(e) => updateQuery("subject", e.target.value)}
                        >
                            <option value = "">Subject (All)</option>
                            <option value = "Data Structures">Data Structures</option>
                            <option value = "Python">Python</option>
                            <option value = "Computer Organization & Architecture">Computer Organization & Architecture</option>
                            <option value = "Classical Cryptography">Classical Cryptography</option>
                        </select>

                        <select 
                            className = "w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value = {cType}
                            onChange = {(e) => updateQuery("type", e.target.value)}
                        >
                            <option value = "">Type (All)</option>
                            <option value = "Endsem">Endsem</option>
                            <option value = "Midsem">Midsem</option>
                        </select>

                        <button
                            className = "w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                            onClick = {clearAll}
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
                                        <span className = "bg-blue-600 px-3 py-1 rounded-full text-sm"> Search: {searchTerm}
                                            <button 
                                                className = "m1-2 hover:bg-blue-700 rounded-full p-0.5"
                                                onClick = {() => clearFilter("searchTerm")}
                                            >
                                                <X className = "h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                    { year && (
                                        <span className = "bg-green-600 px-3 py-1 rounded-full text-sm"> Year: {year}
                                                <button 
                                                className = "m1-2 hover:bg-green-700 rounded-full p-0.5"
                                                onClick = {() => clearFilter("year")}
                                                >
                                                    <X className = "h-3 w-3" />
                                                </button>
                                        </span>
                                    )}
                                    { subject && (
                                        <span className = "bg-purple-600 px-3 py-1 rounded-full text-sm"> Subject: {subject}
                                            <button 
                                                className = "m1-2 hover:bg-purple-700 rounded-full p-0.5"
                                                onClick = {() => clearFilter("subject")}
                                            >
                                                <X className = "h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                    { type && (
                                        <span className = "bg-orange-600 px-3 py-1 rounded-full text-sm"> Type: {type}
                                            <button 
                                                className = "m1-2 hover:bg-orange-700 rounded-full p-0.5"
                                                onClick = {() => clearFilter("type")}
                                            >
                                                <X className = "h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {isLoading ? (
                            <div className = "flex justify-center items-center py-20">
                                <div className = "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : filterResults.length === 0 ? (
                            <div className = "text-center py-10">
                                <p className = "text-gray-400 text-xl mb-4">No results found.</p>
                                <p className = "text-gray-400 text-xl mb-4">Try adjusting your search filters.</p>
                                <button onClick = {clearAll} className = "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                    Clear All Filters
                                </button>
                            </div>
                            ) : ( 
                                <>
                                    <p className = "text-gray-400 mb-4">Found {filterResults.length} results </p>
                                    <div className = "grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {filterResults.map((item, index) => (
                                        <PyqCard key = {item.id} pyq = {item} />
                                    ))}
                                    </div>
                                </>
                            )}
                    </main>  
                </div>
            </div>
        </>
    )
}