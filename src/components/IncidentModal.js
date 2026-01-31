import { X } from "lucide-react";

export default function IncidentModal({ incident, onClose }) {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 w-full max-w-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-4">
          {incident.title}
        </h2>

        {/* Info */}
        <p className="text-sm text-gray-500 mb-2">
          Reported by <span className="text-gray-300">{incident.author}</span>
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Published: {new Date(incident.date).toDateString()}
        </p>

        {/* Button */}
        <a
          href={incident.url}
          target="_blank"
          className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition"
        >
          Open Full Article
        </a>
      </div>
    </div>
  );
}
