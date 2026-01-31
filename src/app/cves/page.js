"use client";

import { useEffect, useState } from "react";

export default function CVEFeedPage() {
  const [cves, setCves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCVEs() {
      setLoading(true);

      const res = await fetch(
        "https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=10"
      );

      const data = await res.json();

      const results = data.vulnerabilities.map((item) => ({
        id: item.cve.id,
        description:
          item.cve.descriptions?.[0]?.value || "No description available",
        published: item.cve.published,
      }));

      setCves(results);
      setLoading(false);
    }

    fetchCVEs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">Latest CVE Feed</h1>

      {loading ? (
        <p className="text-gray-400">Loading CVEs...</p>
      ) : (
        <div className="space-y-6">
          {cves.map((cve) => (
            <div
              key={cve.id}
              className="bg-gray-950 border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold">{cve.id}</h2>

              <p className="text-gray-400 mt-2">{cve.description}</p>

              <p className="text-gray-500 text-sm mt-3">
                Published: {new Date(cve.published).toDateString()}
              </p>

              <a
                href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
                target="_blank"
                className="text-blue-500 hover:underline text-sm mt-3 inline-block"
              >
                View on NVD
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
