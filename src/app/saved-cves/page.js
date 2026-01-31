"use client";

import { useEffect, useState } from "react";

export default function SavedCVEsPage() {
  const [cves, setCves] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSavedCVEs() {
    const res = await fetch("/api/cves");
    const data = await res.json();
    setCves(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchSavedCVEs();
  }, []);

  async function removeCVE(id) {
    await fetch("/api/cves", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchSavedCVEs();
  }

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">Saved CVEs</h1>

      {loading ? (
        <p className="text-gray-400">Loading saved CVEs...</p>
      ) : cves.length === 0 ? (
        <p className="text-gray-500">No CVEs saved yet.</p>
      ) : (
        <div className="space-y-6">
          {cves.map((cve) => (
            <div
              key={cve._id}
              className="bg-gray-950 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold">{cve.cveId}</h2>

              <p className="text-gray-400 mt-2">{cve.description}</p>

              <button
                onClick={() => removeCVE(cve._id)}
                className="mt-4 text-sm bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
