import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    let query = `/results?searchTerm=${search}`;

    if (year) query += `&year=${year}`;
    if (subject) query += `&subject=${subject}`;
    if (type) query += `&type=${type}`;

    router.push(query);
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
        <input
          type = "text"
          placeholder = "Search previous year questions..."
          className = "w-full sm:w-2/3 md:w-1/2 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value = {search}
          onChange = {(e) => setSearch(e.target.value)}
          onKeyDown = {handleKeyPress}
        />

        <div className = "flex flex-wrap gap-4 justify-center">
          <select 
          className = "text-black dark:text-white bg-white dark:bg-[#1f1f1f] border border-gray-300 dark:border-gray-700 px-3 py-2 border rounded-md"
          onChange={(e) => setYear(e.target.value)}
          >
            <option value = "">Year</option>
            <option value = "2023">2023</option>
            <option value = "2022">2022</option>
          </select>

          <select 
          className = "text-black dark:text-white bg-white dark:bg-[#1f1f1f] border border-gray-300 dark:border-gray-700 px-3 py-2 border rounded-md"
          onChange = {(e) => setSubject(e.target.value)}
          >
            <option value = "">Subject</option>
            <option value = "Data Structures">Data Structures</option>
            <option value = "Python">Python</option>
          </select>

          <select 
          className = "text-black dark:text-white bg-white dark:bg-[#1f1f1f] border border-gray-300 dark:border-gray-700 px-3 py-2 border rounded"
          onChange = {(e) => setType(e.target.value)}
          >
            <option value = "">Type</option>
            <option value = "Endsem">Endsem</option>
            <option value = "Midsem">Midsem</option>
          </select>
        </div>

        <div className = "test-center mt-6 max-w-xl">
          <h1 className = "text-3xl sm:text-5xl font-bold text-white text-center font-serif mb-2">Welcome!</h1>
          <p className = "text-xl-gray-700 sm:text-3xl text-center font-semibold">
            Here you can find PYQs by searching above or using the filters. <br />Let's get started !
          </p>
        </div>

        <button
          onClick= {handleSearch}
          className= "mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg:blue-350"
          >
            Search
          </button>
      </div>
    </>
  );
}
