"use client";

import { useState } from "react";

export default function IncidentModal({ incident, onClose }) {
  const [statusMessage, setStatusMessage] = useState("");

  if (!incident) return null;

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
      setStatusMessage("Report saved successfully");
    } else {
      setStatusMessage("This report is already saved");
    }

    setTimeout(() => setStatusMessage(""), 3000);
  }

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

        <p className="text-gray-400 mb-2">Reported by: {incident.author}</p>

        <p className="text-gray-500 mb-6">
          Published: {new Date(incident.date).toDateString()}
        </p>

        <div className="flex gap-4">
          <a
            href={incident.url}
            target="_blank"
            className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition"
          >
            Open Full Article
          </a>

          <button
            onClick={handleSaveReport}
            className="bg-gray-900 border border-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Save Report
          </button>
        </div>

        {statusMessage && (
          <p className="mt-6 text-sm text-green-400">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}
