import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCrisisPosts } from "../services/crisisService";
import Loader from "../Components/common/Loader";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import placeholder1 from "../assets/placeholder1.jpg";

export default function CrisisListing() {
  const [allCrises, setAllCrises] = useState([]);
  const [filteredCrises, setFilteredCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [filters, setFilters] = useState({
    post_type: "national",
    search: "",
    location: "",
  });

  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchCrises();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, allCrises]);

  const fetchCrises = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCrisisPosts();
      const approved = data.filter((crisis) => crisis.status === "approved");
      setAllCrises(approved);
      setFilteredCrises(approved);
    } catch (err) {
      setError("Failed to load crisis posts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...allCrises];

    // Filter by type
    if (filters.post_type && filters.post_type !== "all") {
      result = result.filter((crisis) => crisis.post_type === filters.post_type);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (crisis) =>
          crisis.title.toLowerCase().includes(searchLower) ||
          crisis.description.toLowerCase().includes(searchLower) ||
          crisis.location?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by location
    if (filters.location) {
      result = result.filter((crisis) =>
        crisis.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    setFilteredCrises(result);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ post_type: "all", search: "", location: "" });
    setSortBy("newest");
  };

  // Separate crises by type
  const nationalCrises = filteredCrises.filter((c) => c.post_type === "national");
  const districtCrises = filteredCrises.filter((c) => c.post_type === "district");
  const individualCrises = filteredCrises.filter((c) => c.post_type === "individual");

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Active Crises</h1>
          <p className="text-gray-600">
            Browse ongoing crisis situations and contribute to relief efforts
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Filters:</span>

            {/* Crisis Type Chips */}
            <button
              onClick={() => handleFilterChange("post_type", "national")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filters.post_type === "national"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              National
            </button>
            <button
              onClick={() => handleFilterChange("post_type", "district")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filters.post_type === "district"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              District
            </button>
            <button
              onClick={() => handleFilterChange("post_type", "individual")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filters.post_type === "individual"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => handleFilterChange("post_type", "all")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filters.post_type === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Categories
            </button>

            {/* Location Filter */}
            <input
              type="text"
              placeholder="All Locations"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
            />

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

            {/* Status Chips */}
            <button className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-700">
              Ongoing
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300">
              Resolved
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300">
              Urgent
            </button>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="ml-auto text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        ) : filteredCrises.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Crisis Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={resetFilters}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* National Level Crises */}
            {(filters.post_type === "national" || filters.post_type === "all") &&
              nationalCrises.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl">🚨</span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      National Level Crises
                    </h2>
                    <span className="ml-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      High Priority
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nationalCrises.map((crisis) => (
                      <CrisisCard key={crisis.id} crisis={crisis} priority="high" />
                    ))}
                  </div>
                </section>
              )}

            {/* District-Level Crises */}
            {(filters.post_type === "district" || filters.post_type === "all") &&
              districtCrises.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl">🌍</span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      District-Level Crises
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {districtCrises.map((crisis) => (
                      <CrisisCard key={crisis.id} crisis={crisis} priority="medium" />
                    ))}
                  </div>
                </section>
              )}

            {/* Community & Personal Crises */}
            {(filters.post_type === "individual" || filters.post_type === "all") &&
              individualCrises.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl">👥</span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Community & Personal Crises
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {individualCrises.map((crisis) => (
                      <PersonalCrisisCard key={crisis.id} crisis={crisis} />
                    ))}
                  </div>
                </section>
              )}

            {/* Load More */}
            <div className="text-center pt-8">
              <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Crisis Card Component (National & District)
function CrisisCard({ crisis, priority }) {
  const imageUrl = crisis.banner_image || placeholder1;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSeverityBadge = () => {
    if (priority === "high") {
      return "bg-red-600 text-white";
    } else if (priority === "medium") {
      return "bg-orange-600 text-white";
    }
    return "bg-yellow-600 text-white";
  };

  return (
    <Link
      to={`/crisis/${crisis.id}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={crisis.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityBadge()}`}
          >
            {priority === "high" ? "Extreme" : priority === "medium" ? "High" : "Moderate"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition">
          {crisis.title}
        </h3>

        {crisis.location && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{crisis.location}</span>
          </div>
        )}

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {crisis.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Donation</span>
            <span>65%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-600" style={{ width: "65%" }} />
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-600 mb-4">
          <span>Volunteers: <strong>45%</strong></span>
          <span>Status: <strong className="text-orange-600">Ongoing</strong></span>
        </div>

        <button className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition font-semibold">
          View Details
        </button>
      </div>
    </Link>
  );
}

// Personal Crisis Card Component (Smaller)
function PersonalCrisisCard({ crisis }) {
  return (
    <Link
      to={`/crisis/${crisis.id}`}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {crisis.owner_name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 line-clamp-1 text-sm">
            {crisis.title}
          </h4>
          {crisis.location && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FaMapMarkerAlt className="text-red-500 text-xs" />
              {crisis.location}
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {crisis.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
          Emergency
        </span>
        <button className="text-sm text-red-600 font-semibold hover:underline">
          View
        </button>
      </div>
    </Link>
  );
}