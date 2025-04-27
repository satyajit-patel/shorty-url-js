"use client"
import Link from "next/link"; 
import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("/api/urls", {
      method: "POST",
      body: JSON.stringify({originalUrl})
    });
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-xl text-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            name="originalUrl"
            placeholder="Enter URL here"
            className="w-full bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            required
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Link href="/url-table">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">Read</button>
        </Link>
      </div>
    </div>
  );
}