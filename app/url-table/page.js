"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UrlList() {
  const [urlList, setUrlList] = useState([]);

  async function fetchUrls() {
    const response = await fetch("/api/urls");
    const result = await response.json();
    setUrlList(result.urls);
  }

  async function handleDelete(id) {
    await fetch("/api/urls", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchUrls(); // refresh list after delete
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 gap-6">
      <div className="p-10 bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">All Short Urls</h1>
        <div className="space-y-4">
          {urlList.map((url) => (
            <div
              key={url._id}
              className="p-4 bg-gray-700 rounded-lg shadow border border-gray-600"
            >
              <p className="text-gray-300 overflow-auto">
                <strong>Original URL:</strong> {url.originalUrl}
              </p>
              <p className="text-gray-300">
                <strong>Short URL:</strong>{" "}
                <a
                  href={process.env.NEXT_PUBLIC_HOST + "/api/urls/" + url.shortUrl}
                  target="_blank"
                  className="underline hover:text-blue-300 transition"
                >
                  {process.env.NEXT_PUBLIC_HOST + "/api/urls/" + url.shortUrl}
                </a>
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleDelete(url._id);
                }}
                className="mt-4"
              >
                <button
                  type="submit"
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Link href="/">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
            Create
          </button>
        </Link>
      </div>
    </div>
  );
}
