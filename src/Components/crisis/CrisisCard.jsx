// FILE: src/Components/crisis/CrisisCard.jsx
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function CrisisCard({ crisis }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "national":
        return "bg-red-100 text-red-700";
      case "district":
        return "bg-orange-100 text-orange-700";
      case "individual":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Link
      to={`/crisis/${crisis.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
    >
      {/* Banner Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {crisis.banner_image ? (
          <img
            src={crisis.banner_image}
            alt={crisis.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
            <span className="text-red-400 text-4xl">📢</span>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
              crisis.post_type
            )}`}
          >
            {crisis.post_type.replace("-", " ").toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition">
          {crisis.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {crisis.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          {crisis.location && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
              <span className="truncate">{crisis.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-400 flex-shrink-0" />
            <span>Posted {formatDate(crisis.created_at)}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <span className="text-sm text-gray-600">
            By <span className="font-medium text-gray-900">{crisis.owner_name}</span>
          </span>
          <span className="text-red-600 font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}