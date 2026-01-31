"use client";

import { Shield } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/50 border-b border-gray-800">
      <div className="flex items-center justify-between px-10 py-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Shield className="text-blue-500" size={20} />
          <h1 className="text-lg font-semibold text-white tracking-wide">
            CyberFeed
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-400 hidden md:block">
            Security Intelligence and Incident Monitoring
          </p>

          {/* Logout Button */}
          <button
            onClick={() => signOut()}
            className="text-sm bg-gray-900 px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
