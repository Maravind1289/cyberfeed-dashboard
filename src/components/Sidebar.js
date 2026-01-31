import {
  LayoutDashboard,
  ShieldAlert,
  FileText,
  Settings,
} from "lucide-react";

const links = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Incidents", icon: ShieldAlert },
  { name: "Threat Reports", icon: FileText },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-gray-950 to-gray-900 border-r border-gray-800 min-h-screen px-8 py-10 hidden lg:flex flex-col">
      
      {/* Section Title */}
      <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-10">
        Navigation
      </h2>

      {/* Nav Links */}
      <nav className="space-y-2 flex-1">
        {links.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                index === 0
                  ? "bg-blue-600 text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <p className="text-xs text-gray-600 mt-10">
        CyberFeed SOC Dashboard • v1.0
      </p>
    </aside>
  );
}
