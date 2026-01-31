"use client";

import { useEffect, useState } from "react";

export default function CVEFeedPage() {
  const [cves, setCves] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");

  // Store saved CVEs permanently
  const [savedSet, setSavedSet] = useState(new Set());

  useEffect(() => {
    async function fetchCVEs() {
      setLoading(true);

      const res = await fetch(
        "https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=25"
      );

      const data = await res.json();

      const results = data.vulnerabilities.map((item) => {
        const metricV31 = item.cve.metrics?.cvssMetricV31?.[0];
        const metricV30 = item.cve.metrics?.cvssMetricV30?.[0];
        const metricV2 = item.cve.metrics?.cvssMetricV2?.[0];

        const score =
          metricV31?.cvssData?.baseScore ||
          metricV30?.cvssData?.baseScore ||
          metricV2?.cvssData?.baseScore ||
          null;

        let severity = "Unknown";

        if (score !== null) {
          if (score >= 9) severity = "Critical";
          else if (score >= 7) severity = "High";
          else if (score >= 4) severity = "Medium";
          else severity = "Low";
        }

        return {
          cveId: item.cve.id,
          description:
            item.cve.descriptions?.[0]?.value || "No description available",
          published: item.cve.published,
          score,
          severity,
          link: `https://nvd.nist.gov/vuln/detail/${item.cve.id}`,
        };
      });

      setCves(results);
      setLoading(false);
    }

    async function fetchSavedCVEs() {
      const res = await fetch("/api/cves");
      const data = await res.json();

      const savedIds = new Set(data.map((cve) => cve.cveId));
      setSavedSet(savedIds);
    }

    fetchCVEs();
    fetchSavedCVEs();
  }, []);

  function badgeStyle(severity) {
    if (severity === "Critical") return "bg-red-700";
    if (severity === "High") return "bg-orange-600";
    if (severity === "Medium") return "bg-yellow-600";
    if (severity === "Low") return "bg-green-700";
    return "bg-gray-700";
  }

  async function saveCVE(cve) {
    const res = await fetch("/api/cves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cve),
    });

    const data = await res.json();

    if (data.success) {
      setSavedSet((prev) => new Set([...prev, cve.cveId]));
    }
  }

  const filteredCVEs =
    filter === "All"
      ? cves
      : cves.filter((cve) => cve.severity === filter);

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-4">Latest CVE Feed</h1>

      <div className="mb-10">
        <label className="text-gray-400 text-sm mr-3">
          Filter Severity:
        </label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-950 border border-gray-700 px-4 py-2 rounded-lg text-white"
        >
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
          <option>Unknown</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading CVEs...</p>
      ) : (
        <div className="space-y-6">
          {filteredCVEs.map((cve) => {
            const alreadySaved = savedSet.has(cve.cveId);

            return (
              <div
                key={cve.cveId}
                className="bg-gray-950 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{cve.cveId}</h2>

                  <span
                    className={`text-sm px-3 py-1 rounded-full ${badgeStyle(
                      cve.severity
                    )}`}
                  >
                    {cve.severity}
                  </span>
                </div>

                <p className="text-gray-400 mt-3">{cve.description}</p>

                <div className="flex gap-4 mt-5 items-center">
                  <a
                    href={cve.link}
                    target="_blank"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View on NVD
                  </a>

                  <button
                    disabled={alreadySaved}
                    onClick={() => saveCVE(cve)}
                    className={`text-sm px-4 py-2 rounded-lg transition ${
                      alreadySaved
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gray-900 border border-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    {alreadySaved ? "Saved" : "Save CVE"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
