import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCrisisPost, getCrisisDonationSummary } from "../services/crisisService";
import Loader from "../Components/common/Loader";
import { FaShare, FaHeart } from "react-icons/fa";
import DonationSection from "../Components/crisis/DonationSection";
import VolunteerSection from "../Components/crisis/VolunteerSection";
import UpdatesSection from "../Components/crisis/UpdatesSection";
import placeholder1 from "../assets/placeholder1.jpg";

export default function CrisisDetail() {
  const { id } = useParams();
  const [crisis, setCrisis] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("updates");

  useEffect(() => {
    fetchCrisis();
    fetchSummary();
  }, [id]);

  const fetchCrisis = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCrisisPost(id);
      setCrisis(data);
    } catch (err) {
      setError("Failed to load crisis details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await getCrisisDonationSummary(id);
      setSummary(data);
    } catch (err) {
      console.error("Failed to fetch summary:", err);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "national":
        return "bg-red-600 text-white";
      case "district":
        return "bg-green-600 text-white";
      case "individual":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const calculateProgress = () => {
    if (!summary || !summary.total_money) return 0;
    const goal = 200000;
    const raised = parseFloat(summary.total_money);
    return Math.min((raised / goal) * 100, 100);
  };

  const tabs = [
    { id: "updates", label: "Crisis Updates" },
    { id: "distribution", label: "Distribution History" },
    { id: "shelter", label: "Shelter" },
    { id: "donation", label: "Donation Info" },
    { id: "hotline", label: "Hotline Numbers" },
    { id: "goods", label: "Donate Goods" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !crisis) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            {error || "Crisis not found"}
          </div>
          <div className="text-center mt-6">
            <Link to="/crisis" className="text-red-600 hover:underline font-medium">
              ← Back to Crisis List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = crisis.banner_image || placeholder1;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="md:hidden text-center mb-4 pt-4">
          <h1 className="text-lg font-bold text-gray-900">Crisis Details</h1>
        </div>

        {/* Banner Image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
          <img
            src={imageUrl}
            alt={crisis.title}
            className="w-full h-full object-cover"
          />
          
          {/* Type Badge on Image */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${getTypeColor(
                crisis.post_type
              )}`}
            >
              {crisis.post_type === "district" ? "District-Level Crisis" : crisis.post_type}
            </span>
          </div>
        </div>

        {/* Crisis Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {crisis.title}
          </h1>

          {/* Progress Bar */}
          {summary && (
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>৳ {parseFloat(summary.total_money || 0).toLocaleString()} raised</span>
                <span className="text-gray-500">of ৳ 200,000 goal</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          )}

          {/* Main Action Button */}
          <button
            onClick={() => setActiveTab("donation")}
            className="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-lg hover:shadow-xl mb-4"
          >
            Donate Now
          </button>

          {/* Secondary Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium">
              <FaShare className="text-sm" />
              Share
            </button>
            <button
              onClick={() => setActiveTab("volunteer")}
              className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              <FaHeart className="text-sm" />
              Apply as Volunteer
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden mb-0">
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 py-3.5 text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-3 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          {activeTab === "updates" && <UpdatesSection crisisId={id} crisis={crisis} />}
          {activeTab === "donation" && <DonationSection crisisId={id} />}
          {activeTab === "volunteer" && <VolunteerSection crisisId={id} crisis={crisis} />}
          {activeTab === "goods" && <DonationSection crisisId={id} />}
          
          {activeTab === "distribution" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Distribution History</h3>
              <p className="text-gray-600">Distribution records will appear here</p>
            </div>
          )}
          
          {activeTab === "shelter" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Shelter Information</h3>
              <p className="text-gray-600">Shelter details and locations will appear here</p>
            </div>
          )}
          
          {activeTab === "hotline" && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Hotline Numbers</h3>
              <div className="grid gap-4">
                <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">National Emergency</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                    <a href="tel:999" className="text-2xl font-bold text-blue-600">999</a>
                  </div>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Fire Service</p>
                      <p className="text-sm text-gray-600">Fire & Rescue</p>
                    </div>
                    <a href="tel:102" className="text-2xl font-bold text-blue-600">102</a>
                  </div>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Ambulance</p>
                      <p className="text-sm text-gray-600">Medical Emergency</p>
                    </div>
                    <a href="tel:199" className="text-2xl font-bold text-blue-600">199</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            to="/crisis"
            className="text-red-600 hover:text-red-700 font-medium hover:underline"
          >
            ← Back to Crisis List
          </Link>
        </div>
      </div>
    </div>
  );
}