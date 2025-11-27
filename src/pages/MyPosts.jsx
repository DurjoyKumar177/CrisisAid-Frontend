import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyCrisisPosts, deleteCrisisPost } from "../services/crisisService";
import Loader from "../Components/common/Loader";
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaPlus,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function MyPosts() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [posts, setPosts] = useState([]);
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

    // Show success message from location state
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      // Clear the state
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccessMessage(""), 5000);
    }

    fetchPosts();
  }, [isAuthenticated, navigate, location]);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyCrisisPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to load your posts. Please try again.");
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
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <FaCheckCircle /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
            <FaClock /> Pending Review
          </span>
        );
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Crisis Posts</h1>
            <p className="text-gray-600">Manage and track your crisis reports</p>
          </div>
          <Link
            to="/crisis/create"
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition font-semibold shadow-lg"
          >
            <FaPlus />
            Create New Crisis
          </Link>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg animate-pulse">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <p className="text-green-700 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Crisis Posts Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't created any crisis posts. Start making a difference today!
            </p>
            <Link
              to="/crisis/create"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              <FaPlus />
              Create Your First Crisis Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
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
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(post.status)}
                  </div>

                  {/* Type Badge */}
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

                  {/* Meta Info */}
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    {post.location && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="truncate">{post.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>Created {formatDate(post.created_at)}</span>
                    </div>
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
                      onClick={() => navigate(`/crisis/${post.id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm"
                    >
                      <FaEdit />
                      Edit
                    </button>
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
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-3xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Crisis Post?</h3>
              <p className="text-gray-600">
                Are you sure you want to delete "<strong>{deleteModal.title}</strong>"? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.id)}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
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