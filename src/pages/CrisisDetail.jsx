// FILE: src/pages/CrisisDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCrisisPost, getCrisisDonationSummary, getMyCrisisPosts } from "../services/crisisService";
import Loader from "../Components/common/Loader";
import { FaShare, FaHeart, FaMapMarkerAlt, FaPhone, FaLock } from "react-icons/fa";
import DonationSection from "../Components/crisis/DonationSection";
import VolunteerSection from "../Components/crisis/VolunteerSection";
import UpdatesSection from "../Components/crisis/UpdatesSection";
import placeholder1 from "../assets/placeholder1.jpg";

export default function CrisisDetail() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [crisis, setCrisis] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("updates");
  const [isOwner, setIsOwner] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    fetchCrisis();
  }, [id, isAuthenticated]);

  const fetchCrisis = async () => {
    setLoading(true);
    setError("");
    setCrisis(null);
    setIsOwner(false);
    setIsApproved(false);
    
    try {
      // Try to get the post normally (for approved posts)
      const data = await getCrisisPost(id);
      setCrisis(data);
      setIsApproved(true);
      
      // Check if current user is the owner
      if (isAuthenticated && user && data.owner_name === user.username) {
        setIsOwner(true);
      }
      
      // Fetch summary if post is approved
      fetchSummary();
      
    } catch (err) {
      // If error is about unapproved post or 403/404, check if user is owner
      if (err.message.includes("not approved") || 
          err.message.includes("permission") || 
          err.response?.status === 403 || 
          err.response?.status === 404) {
        
        if (isAuthenticated) {
          // Try to get the post from user's own posts
          try {
            const myPosts = await getMyCrisisPosts();
            const myPost = myPosts.find(post => post.id === parseInt(id));
            
            if (myPost) {
              setCrisis(myPost);
              setIsOwner(true);
              setIsApproved(myPost.status === 'approved');
              if (myPost.status === 'approved') {
                fetchSummary();
              }
              return;
            }
          } catch (innerErr) {
            console.error("Failed to fetch user's posts:", innerErr);
          }
        }
        
        setError("This post is not approved yet. Only the owner and admins can view it.");
        
      } else if (err.message.includes("not found")) {
        setError("Crisis post not found");
      } else {
        setError("Failed to load crisis details. Please try again.");
      }
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
    if (!isApproved || !summary || !summary.total_money) return 0;
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
    { id: "volunteer", label: "Volunteer" },
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
          
          {/* Pending Approval Badge */}
          {!isApproved && (
            <div className="absolute top-4 right-4">
              <span className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white rounded-full text-xs font-bold uppercase">
                <FaLock className="text-xs" />
                Pending Approval
              </span>
            </div>
          )}
        </div>

        {/* Crisis Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {crisis.title}
          </h1>

          {/* Location */}
          {crisis.location && (
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{crisis.location}</span>
            </div>
          )}

          {/* Owner Information */}
          {isOwner && !isApproved && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-700 text-sm">
                <strong>⚠️ Your post is pending admin approval.</strong> 
                Only you can see this page until it's approved. Donations and volunteer applications will be available after approval.
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {isApproved && summary && (
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
          {isApproved ? (
            <button
              onClick={() => setActiveTab("donation")}
              className="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-lg hover:shadow-xl mb-4"
            >
              Donate Now
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3.5 rounded-lg font-bold text-lg mb-4 cursor-not-allowed"
            >
              Donations Available After Approval
            </button>
          )}

          {/* Secondary Action Buttons */}
          {isApproved ? (
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
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button disabled className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-400 py-2.5 rounded-lg font-medium cursor-not-allowed">
                <FaShare className="text-sm" />
                Share
              </button>
              <button disabled className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-400 py-2.5 rounded-lg font-medium cursor-not-allowed">
                <FaHeart className="text-sm" />
                Apply as Volunteer
              </button>
            </div>
          )}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden mb-0">
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => isApproved && setActiveTab(tab.id)}
                disabled={!isApproved}
                className={`flex-shrink-0 px-5 py-3.5 text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-3 border-blue-600 bg-blue-50"
                    : !isApproved 
                      ? "text-gray-400 cursor-not-allowed"
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
          {!isApproved ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Post Pending Approval</h3>
              <p className="text-gray-600 mb-6">
                This crisis post is currently under review by our admin team.
                <br />
                All features will be available once the post is approved.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong> {crisis.status}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Submitted:</strong> {new Date(crisis.created_at).toLocaleDateString()}
                  </p>
                </div>
                {isOwner && (
                  <p className="text-sm text-gray-500">
                    You can edit or delete this post from your dashboard.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              {activeTab === "updates" && <UpdatesSection crisisId={id} crisis={crisis} />}
              {activeTab === "donation" && <DonationSection crisisId={id} />}
              {activeTab === "volunteer" && <VolunteerSection crisisId={id} crisis={crisis} />}
              
              {/* YOUR ORIGINAL DISTRIBUTION HISTORY CONTENT */}
              {activeTab === "distribution" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Distribution History</h3>
                  
                  {/* Sample Distribution Data */}
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-600 pl-6 py-4 bg-green-50 rounded-r-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">Food Relief Distribution</h4>
                          <p className="text-sm text-gray-600 mt-1">1,000 families received rice, lentils, and cooking oil</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">Nov 20, 2024</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                        <span>📦 Location: Kurigram District</span>
                        <span>👥 Beneficiaries: 1,000 families</span>
                      </div>
                    </div>

                    <div className="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 rounded-r-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">Medical Supplies</h4>
                          <p className="text-sm text-gray-600 mt-1">Emergency medical kits and medicines distributed</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">Nov 18, 2024</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                        <span>🏥 Location: Field Hospital</span>
                        <span>💊 Items: 500 medical kits</span>
                      </div>
                    </div>

                    <div className="border-l-4 border-orange-600 pl-6 py-4 bg-orange-50 rounded-r-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">Shelter Materials</h4>
                          <p className="text-sm text-gray-600 mt-1">Tarpaulins, ropes, and shelter kits provided</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">Nov 15, 2024</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                        <span>🏕️ Location: Relief Camp 3</span>
                        <span>📦 Items: 300 shelter kits</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                    <p className="text-gray-600 text-sm">
                      More distribution records will be added as relief operations continue
                    </p>
                  </div>
                </div>
              )}
              
              {/* YOUR ORIGINAL SHELTER CONTENT */}
              {activeTab === "shelter" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Shelter Information</h3>
                  
                  <div className="grid gap-4">
                    {/* Shelter 1 */}
                    <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">🏫</span>
                            <h4 className="text-xl font-bold text-gray-900">Kurigram Primary School</h4>
                          </div>
                          <p className="text-gray-600 mb-3">Main relief shelter with medical facilities</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <FaMapMarkerAlt className="text-red-500" />
                              <span>Kurigram Sadar, Kurigram District</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="font-semibold">Capacity:</span>
                              <span>500 people</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="font-semibold">Currently:</span>
                              <span className="text-orange-600 font-semibold">320 people (64% occupied)</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          OPEN
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          ✓ Food available • ✓ Clean water • ✓ Medical aid • ✓ Blankets
                        </p>
                      </div>
                    </div>

                    {/* Shelter 2 */}
                    <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">🏢</span>
                            <h4 className="text-xl font-bold text-gray-900">Community Center</h4>
                          </div>
                          <p className="text-gray-600 mb-3">Secondary shelter for families</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <FaMapMarkerAlt className="text-red-500" />
                              <span>Char Rajibpur, Kurigram</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="font-semibold">Capacity:</span>
                              <span>200 people</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="font-semibold">Currently:</span>
                              <span className="text-red-600 font-semibold">180 people (90% occupied)</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                          ALMOST FULL
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          ✓ Food available • ✓ Clean water • ✓ Blankets
                        </p>
                      </div>
                    </div>

                    {/* Shelter 3 */}
                    <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">⛺</span>
                            <h4 className="text-xl font-bold text-gray-900">Emergency Relief Camp</h4>
                          </div>
                          <p className="text-gray-600 mb-3">Temporary shelter with basic facilities</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <FaMapMarkerAlt className="text-red-500" />
                              <span>Ulipur Upazila, Kurigram</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="font-semibold">Capacity:</span>
                              <span>300 people</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="font-semibold">Currently:</span>
                              <span className="text-green-600 font-semibold">150 people (50% occupied)</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          OPEN
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          ✓ Food available • ✓ Clean water
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* YOUR ORIGINAL HOTLINE NUMBERS CONTENT */}
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
                        <a href="tel:999" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                          <FaPhone className="text-lg" /> 999
                        </a>
                      </div>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">Fire Service</p>
                          <p className="text-sm text-gray-600">Fire & Rescue</p>
                        </div>
                        <a href="tel:102" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                          <FaPhone className="text-lg" /> 102
                        </a>
                      </div>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">Ambulance</p>
                          <p className="text-sm text-gray-600">Medical Emergency</p>
                        </div>
                        <a href="tel:199" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                          <FaPhone className="text-lg" /> 199
                        </a>
                      </div>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">Police Control Room</p>
                          <p className="text-sm text-gray-600">Emergency Police</p>
                        </div>
                        <a href="tel:100" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                          <FaPhone className="text-lg" /> 100
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
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