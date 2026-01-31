import { ExternalLink } from "lucide-react";

export default function IncidentCard({ incident, onClick }) {
  return (
    <div
      onClick={() => onClick(incident)}
      className="bg-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-blue-600 transition duration-300 hover:shadow-2xl cursor-pointer"
    >
      {/* Title */}
      <h2 className="text-base font-semibold text-white leading-snug line-clamp-2">
        {incident.title}
      </h2>

      {/* Metadata */}
      <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
        <span className="px-3 py-1 rounded-full bg-gray-900 border border-gray-800">
          {incident.author}
        </span>
        <span>{new Date(incident.date).toDateString()}</span>
      </div>

      {/* Footer */}
      <p className="flex items-center gap-2 mt-6 text-sm font-medium text-blue-400">
        View Report <ExternalLink size={16} />
      </p>
    </div>
  );
}
