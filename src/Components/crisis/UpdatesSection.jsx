import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getCrisisUpdates,
  createCrisisUpdate,
  createComment,
  getUpdateComments,
} from "../../services/crisisService";
import Loader from "../common/Loader";
import { FaHeart, FaComment, FaClock } from "react-icons/fa";

export default function UpdatesSection({ crisisId, crisis }) {
  const { isAuthenticated, user } = useAuth();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedUpdate, setExpandedUpdate] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetchUpdates();
  }, [crisisId]);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const data = await getCrisisUpdates(crisisId);
      setUpdates(data);
    } catch (err) {
      setError("Failed to load updates.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCommentSubmit = async (updateId) => {
    if (!commentText[updateId]?.trim()) return;

    try {
      await createComment(updateId, commentText[updateId]);
      setCommentText({ ...commentText, [updateId]: "" });
      // Refresh comments
      const commentsData = await getUpdateComments(updateId);
      setComments({ ...comments, [updateId]: commentsData });
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const toggleComments = async (updateId) => {
    if (expandedUpdate === updateId) {
      setExpandedUpdate(null);
    } else {
      setExpandedUpdate(updateId);
      if (!comments[updateId]) {
        try {
          const commentsData = await getUpdateComments(updateId);
          setComments({ ...comments, [updateId]: commentsData });
        } catch (err) {
          console.error("Failed to load comments:", err);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📢</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Updates Yet</h3>
        <p className="text-gray-600">
          Updates from volunteers and organizers will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>

      <div className="space-y-6">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Update Header */}
            <div className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {update.creator_name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {update.creator_name}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <FaClock className="text-xs" />
                      {formatDate(update.created_at)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {update.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
                {update.description}
              </p>

              {/* Update Image */}
              {update.update_image && (
                <img
                  src={update.update_image}
                  alt={update.title}
                  className="w-full rounded-lg mb-4"
                />
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                  <FaHeart />
                  <span className="text-sm font-medium">React</span>
                </button>
                <button
                  onClick={() => toggleComments(update.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                >
                  <FaComment />
                  <span className="text-sm font-medium">
                    Comment {update.total_comments > 0 && `(${update.total_comments})`}
                  </span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            {expandedUpdate === update.id && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                {/* Comment Input */}
                {isAuthenticated ? (
                  <div className="mb-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={commentText[update.id] || ""}
                          onChange={(e) =>
                            setCommentText({
                              ...commentText,
                              [update.id]: e.target.value,
                            })
                          }
                          placeholder="Write a comment..."
                          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleCommentSubmit(update.id);
                            }
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleCommentSubmit(update.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 text-center text-sm text-gray-600">
                    Please log in to comment
                  </div>
                )}

                {/* Comments List */}
                {comments[update.id] && comments[update.id].length > 0 ? (
                  <div className="space-y-3">
                    {comments[update.id].map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {comment.user_name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 bg-white rounded-lg p-3 border border-gray-200">
                          <div className="font-semibold text-sm text-gray-900 mb-1">
                            {comment.user_name}
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDate(comment.created_at)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-4">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}