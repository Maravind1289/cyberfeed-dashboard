import { Shield } from "lucide-react";

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

        {/* Right Info */}
        <p className="text-sm text-gray-400 hidden md:block">
          Security Intelligence and Incident Monitoring
        </p>
      </div>
    </nav>
  );
}
