// FILE: src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  getMyCrisisPosts, 
  deleteCrisisPost,
  getMyVolunteerApplications,
  getMyDonations 
} from "../services/crisisService";
import Loader from "../Components/common/Loader";
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaPlus,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaFileAlt,
  FaHandsHelping,
  FaHistory,
  FaHeart,
  FaBox
} from "react-icons/fa";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'posts';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [posts, setPosts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate, activeTab]);

const fetchData = async () => {
  setLoading(true);
  setError("");
  try {
    if (activeTab === 'posts') {
      const data = await getMyCrisisPosts();
      setPosts(data);
    } else if (activeTab === 'applications') {
      const data = await getMyVolunteerApplications();
      console.log("Applications data:", data); // ADD THIS LINE HERE
      setApplications(data);
    } else if (activeTab === 'history') {
      const data = await getMyDonations();
      setDonations(data);
    }
  } catch (err) {
    setError("Failed to load data. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteCrisisPost(id);
      setPosts(posts.filter(post => post.id !== id));
      setDeleteModal(null);
      setSuccessMessage("Crisis post deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete post. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700"
    };
    const icons = {
      approved: <FaCheckCircle />,
      rejected: <FaTimesCircle />,
      pending: <FaClock />
    };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 ${styles[status]} rounded-full text-xs font-semibold`}>
        {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeColor = (type) => {
    const colors = {
      national: "bg-red-100 text-red-700",
      district: "bg-orange-100 text-orange-700",
      individual: "bg-blue-100 text-blue-700"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const tabs = [
    { id: 'posts', label: 'My Posts', icon: FaFileAlt, color: 'blue' },
    { id: 'applications', label: 'Applications', icon: FaHandsHelping, color: 'green' },
    { id: 'history', label: 'History', icon: FaHistory, color: 'purple' }
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-gray-600">Manage your crisis posts, applications, and activity</p>
            </div>
            <Link
              to="/crisis/create"
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-orange-700 transition font-semibold shadow-lg hover:shadow-xl"
            >
              <FaPlus />
              Create New Crisis
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-xl animate-pulse">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-xl" />
              <p className="text-green-700 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? `text-${tab.color}-600 border-b-4 border-${tab.color}-600 bg-${tab.color}-50`
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" />
              </div>
            ) : (
              <>
                {/* My Posts Tab */}
                {activeTab === 'posts' && (
                  posts.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-7xl mb-4">📝</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Crisis Posts Yet</h3>
                      <p className="text-gray-600 mb-6">Start making a difference by creating your first crisis post</p>
                      <Link
                        to="/crisis/create"
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                      >
                        <FaPlus />
                        Create Your First Post
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {posts.map((post) => (
                        <div
                          key={post.id}
                          className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Image */}
                          <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                            {post.banner_image ? (
                              <img
                                src={post.banner_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-6xl">📢</span>
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              {getStatusBadge(post.status)}
                            </div>
                            <div className="absolute top-3 left-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(post.post_type)}`}>
                                {post.post_type.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {post.description}
                            </p>

                            {post.location && (
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span className="truncate">{post.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                              <FaClock />
                              <span>{formatDate(post.created_at)}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t">
                              <Link
                                to={`/crisis/${post.id}`}
                                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                              >
                                <FaEye />
                                View
                              </Link>
                              <button
                                onClick={() => setDeleteModal(post)}
                                className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium text-sm"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}

{/* Applications Tab */}
{activeTab === 'applications' && (
  applications.length === 0 ? (
    <div className="text-center py-16">
      <div className="text-7xl mb-4">🤝</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Applications Yet</h3>
      <p className="text-gray-600">You haven't applied to volunteer for any crisis</p>
    </div>
  ) : (
    <div className="space-y-4">
      {applications.map((app) => {
        // Get crisis details from the nested object
        const crisisDetail = app.crisis_post_detail;
        const crisisId = crisisDetail?.id;
        const crisisTitle = crisisDetail?.title;
        const crisisStatus = crisisDetail?.status;
        
        return (
          <div key={app.id} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {crisisTitle || "Crisis Post"}
                  </h3>
                  {crisisStatus && crisisStatus !== 'approved' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                      {crisisStatus}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{app.message || "No message provided"}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaClock />
                  <span>Applied {formatDate(app.applied_at)}</span>
                </div>
              </div>
              {getStatusBadge(app.status)}
            </div>
            {crisisId ? (
              crisisStatus === 'approved' ? (
                <Link
                  to={`/crisis/${crisisId}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  View Crisis Post →
                </Link>
              ) : (
                <span className="text-gray-400 text-sm">
                  Crisis post is pending approval
                </span>
              )
            ) : (
              <span className="text-gray-400 text-sm">
                Cannot view - crisis ID not found
              </span>
            )}
          </div>
        );
      })}
    </div>
  )
)}

                {/* History Tab */}
                {activeTab === 'history' && (
                  donations.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-7xl mb-4">💝</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Donation History</h3>
                      <p className="text-gray-600">Start helping by making your first donation</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {donations.money_donations?.map((donation) => (
                        <div key={donation.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 rounded-xl p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                <FaHeart className="text-white text-xl" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Money Donation</h3>
                                <p className="text-2xl font-bold text-green-600 mb-2">৳{donation.amount}</p>
                                <p className="text-sm text-gray-600 mb-2">{donation.crisis_title}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <FaClock />
                                  <span>{formatDate(donation.donated_at)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {donations.goods_donations?.map((donation) => (
                        <div key={donation.id} className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-xl p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                <FaBox className="text-white text-xl" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Goods Donation</h3>
                                <p className="text-gray-700 mb-2">{donation.item_description}</p>
                                <p className="text-sm text-gray-600 mb-2">{donation.crisis_title}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <FaClock />
                                  <span>{formatDate(donation.donated_at)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-3xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Crisis Post?</h3>
              <p className="text-gray-600">
                Are you sure you want to delete "<strong>{deleteModal.title}</strong>"?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.id)}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}