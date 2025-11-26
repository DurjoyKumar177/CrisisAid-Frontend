import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCrisisPosts } from "../services/crisisService";
import CrisisCard from "../Components/crisis/CrisisCard";
import Loader from "../Components/common/Loader";

export default function CrisisListing() {
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    post_type: "",
    location: "",
  });

  useEffect(() => {
    fetchCrises();
  }, [filters]);

  const fetchCrises = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCrisisPosts(filters);
      setCrises(data);
    } catch (err) {
      setError("Failed to load crisis posts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Crises</h1>
            <p className="text-gray-600 mt-1">Browse ongoing crisis situations and contribute</p>
          </div>
          <Link
            to="/crisis/create"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
          >
            + Report Crisis
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crisis Type
              </label>
              <select
                value={filters.post_type}
                onChange={(e) => handleFilterChange("post_type", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
              >
                <option value="">All Types</option>
                <option value="national">National-Level</option>
                <option value="district">District-Level</option>
                <option value="individual">Individual-Level</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Search by location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilters({ post_type: "", location: "" })}
                className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Crisis Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        ) : crises.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No crisis posts found.</p>
            <Link
              to="/crisis/create"
              className="inline-block mt-4 text-red-600 hover:underline font-medium"
            >
              Report the first crisis
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crises.map((crisis) => (
              <CrisisCard key={crisis.id} crisis={crisis} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}