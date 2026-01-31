"use client";

import { useEffect, useState } from "react";

export default function IncidentModal({ incident, onClose }) {
  const [alreadySaved, setAlreadySaved] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      const res = await fetch("/api/reports");
      const data = await res.json();

      const exists = data.some((r) => r.url === incident.url);
      setAlreadySaved(exists);
    }

    if (incident) checkSaved();
  }, [incident]);

  async function handleSaveReport() {
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: incident.title,
        author: incident.author,
        url: incident.url,
        date: incident.date,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setAlreadySaved(true);
    }
  }

  if (!incident) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">{incident.title}</h2>

        <p className="text-gray-400 mb-6">Reported by: {incident.author}</p>

        <div className="flex gap-4">
          <a
            href={incident.url}
            target="_blank"
            className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition"
          >
            Open Full Article
          </a>

          <button
            disabled={alreadySaved}
            onClick={handleSaveReport}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              alreadySaved
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gray-900 border border-gray-700 hover:bg-gray-800"
            }`}
          >
            {alreadySaved ? "Saved" : "Save Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
