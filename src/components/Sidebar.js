"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-950 border-r border-gray-800 px-6 py-8">
      <h2 className="text-lg font-semibold mb-10 text-white">
        Navigation
      </h2>

      <nav className="flex flex-col gap-5 text-gray-400">
        <Link href="/" className="hover:text-white transition">
          Dashboard
        </Link>

        <Link href="/saved-reports" className="hover:text-white transition">
          Saved Reports
        </Link>

        <Link href="/cves" className="hover:text-white transition">
          Latest CVEs
        </Link>

        <Link href="/saved-cves" className="hover:text-white transition">
          Saved CVEs
        </Link>

        <p className="hover:text-white transition cursor-pointer">
          Threat Reports
        </p>

        <p className="hover:text-white transition cursor-pointer">
          Settings
        </p>
      </nav>
    </aside>
  );
}
