"use client";

import { useEffect, useState } from "react";

export default function SavedReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchReports() {
    const res = await fetch("/api/reports");
    const data = await res.json();
    setReports(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchReports();
  }, []);

  async function handleRemove(id) {
    await fetch("/api/reports", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchReports();
  }

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">Saved Reports</h1>

      {loading ? (
        <p className="text-gray-400">Loading saved reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-gray-950 border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="font-semibold text-lg mb-3">{report.title}</h2>

              <p className="text-gray-500 text-sm mb-2">
                Author: {report.author}
              </p>

              <div className="flex justify-between items-center mt-4">
                <a
                  href={report.url}
                  target="_blank"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Article
                </a>

                <button
                  onClick={() => handleRemove(report._id)}
                  className="text-sm bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
