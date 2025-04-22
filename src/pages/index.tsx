"use client"

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react"

export default function Home() {

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    const query = `/results?`
    const para = new URLSearchParams()

    if (search.trim()) para.append("searchTerm", search.trim())
    if (year) para.append("year", year)
    if (subject) para.append("subject", subject)
    if (type) para.append("type", type)
      router.push(`/results${para.toString() ? "?" + para.toString() : ""}`)
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  return (
    <> 
      <Head>
          <title> PYQ Search</title>
          <meta name = "description" content = "Find previous year question papers easily" />
      </Head>
      <div className = "flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 gap-6 bg-black text-white">
        <div className = "w-full sm:w-2/3 md:w-1/2 justify-center relative">
          <input
            type = "text"
            placeholder = "Search previous year questions..."
            className = "w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            value = {search}
            onChange = {(e) => setSearch(e.target.value)}
            onKeyDown = {handleKeyPress}
          />
        </div>

        <div className = "flex flex-wrap gap-4 justify-center">
          <select 
          className = "text-white bg-gray-900 border border-gray-700 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange={(e) => setYear(e.target.value)}
          >
            <option value = "">Year (All)</option>
            <option value = "2023">2023</option>
            <option value = "2022">2022</option>
          </select>

          <select 
          className = "text-white bg-gray-900 border border-gray-700 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange = {(e) => setSubject(e.target.value)}
          >
            <option value = "">Subject (All)</option>
            <option value = "Data Structures">Data Structures</option>
            <option value = "Python">Python</option>
          </select>

          <select 
          className = "text-white bg-gray-900 border border-gray-700 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onChange = {(e) => setType(e.target.value)}
          >
            <option value = "">Type (All)</option>
            <option value = "Endsem">Endsem</option>
            <option value = "Midsem">Midsem</option>
          </select>
        </div>

        <div className = "test-center mt-6 max-w-xl">
          <h1 className = "text-3xl sm:text-5xl font-bold text-white text-center font-serif mb-4">Welcome!</h1>
          <p className = "text-xl text-gray-300 sm:text-2xl text-center font-semibold">
            Here you can find PYQs by searching above or using the filters. <br />Let's get started !
          </p>
        </div>

        <button
          onClick= {handleSearch}
          className= "mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Search
          </button>
      </div>
    </>
  );
}
