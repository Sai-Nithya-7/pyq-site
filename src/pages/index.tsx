import Head from "next/head";

export default function Home() {
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
        />
        <div className = "flex flex-wrap gap-4 justify-center">
          <select className = "text-black dark:text-white bg-white dark:bg-[#1f1f1f] border border-gray-300 dark:border-gray-700 px-3 py-2 border rounded-md">
            <option>Year</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <select className = "text-black dark:text-white bg-white dark:bg-[#1f1f1f] border border-gray-300 dark:border-gray-700 px-3 py-2 border rounded-md">
            <option>Subject</option>
            <option>Data Structures</option>
            <option>Python</option>
          </select>
          <select className = "text-black dark:text-white bg-white dark:bg-[#1f1f1f] border border-gray-300 dark:border-gray-700 px-3 py-2 border rounded">
            <option>Type</option>
            <option>Endsem</option>
            <option>Midsem</option>
          </select>
        </div>

        <div className = "test-center mt-6 max-w-xl">
          <h1 className = "text-3xl sm:text-5xl font-bold text-white text-center font-serif mb-2">Welcome!</h1>
          <p className = "text-xl-gray-700 sm:text-3xl text-center font-semibold">
            Here you can find PYQs by searching above or using the filters. <br />Let's get started !
          </p>
        </div>
      </div>
    </>
  );
}
