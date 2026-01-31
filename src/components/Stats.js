import { Activity, AlertTriangle, Globe } from "lucide-react";

export default function Stats({ total }) {
  const stats = [
    {
      label: "Total Incidents",
      value: total,
      icon: Globe,
    },
    {
      label: "High Severity Alerts",
      value: "12",
      icon: AlertTriangle,
    },
    {
      label: "Active Monitoring",
      value: "24/7",
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <div
            key={i}
            className="bg-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-blue-600 transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <Icon size={20} className="text-blue-500" />
            </div>

            <h2 className="text-4xl font-bold text-white mt-4">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
