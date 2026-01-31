"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Stats from "../components/Stats";
import IncidentCard from "../components/IncidentCard";
import IncidentModal from "../components/IncidentModal";

export default function Home() {
  // ✅ Session Hook
  const { data: session, status } = useSession();

  // ✅ ALL Hooks must always run first
  const [incidents, setIncidents] = useState([]);
  const [category, setCategory] = useState("cybersecurity");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedIncident, setSelectedIncident] = useState(null);

  // ✅ Fetch incidents only if logged in
  useEffect(() => {
    if (!session) return;

    async function fetchIncidents() {
      setLoading(true);

      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${category}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      const results = data.hits
        .filter((item) => item.title || item.story_title)
        .slice(0, 15)
        .map((item) => ({
          title: item.title || item.story_title,
          url: item.url || item.story_url,
          author: item.author,
          date: item.created_at,
        }));

      setIncidents(results);
      setLoading(false);
    }

    fetchIncidents();
  }, [category, session]);

  // ✅ Loading screen while session loads
  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <h1 className="text-xl font-semibold">Loading Dashboard...</h1>
      </div>
    );
  }

  // ✅ Redirect if not logged in
  if (!session) {
    window.location.href = "/login";
    return null;
  }

  // ✅ Search Filter
  const filteredIncidents = incidents.filter((incident) =>
    incident.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-10 py-10 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">
            Security Operations Dashboard
          </h1>

          <p className="text-gray-500 text-base mt-2 max-w-xl">
            Live incident monitoring with real-time cybersecurity intelligence.
          </p>

          {/* Stats */}
          <div className="mt-12">
            <Stats total={incidents.length} />
          </div>

          {/* Search */}
          <div className="mt-10 mb-8">
            <input
              type="text"
              placeholder="Search incidents, malware reports, breaches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-gray-950 border border-gray-800 px-5 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 flex-wrap mb-12">
            {["cybersecurity", "malware", "hacking", "data breach"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    category === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              )
            )}
          </div>

          {/* Incident Feed */}
          {loading ? (
            <p className="text-gray-400">Loading incidents...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIncidents.map((incident, index) => (
                <IncidentCard
                  key={index}
                  incident={incident}
                  onClick={setSelectedIncident}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      <IncidentModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
}
