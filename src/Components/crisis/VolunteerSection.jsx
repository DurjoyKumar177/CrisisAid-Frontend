import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  applyAsVolunteer,
  getCrisisVolunteers,
} from "../../services/crisisService";
import Loader from "../common/Loader";

export default function VolunteerSection({ crisisId, crisis }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await applyAsVolunteer(crisisId, message);
      setSuccess("Application submitted successfully! 🎉");
      setHasApplied(true);
      setMessage("");
    } catch (err) {
      if (err.response?.status === 400) {
        setError("You have already applied for this crisis.");
        setHasApplied(true);
      } else {
        setError("Failed to submit application. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">
          🤝 Become a Volunteer
        </h3>
        <p className="text-blue-700">
          Help make a difference by volunteering for this crisis. Your time and
          effort can save lives and rebuild communities.
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      )}

      {!hasApplied ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why do you want to volunteer? *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
              placeholder="Tell us about your skills, experience, and why you want to help..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              What to expect:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Your application will be reviewed by the crisis organizer</li>
              <li>✓ You'll be notified once approved</li>
              <li>✓ Approved volunteers can post updates about the crisis</li>
              <li>✓ Coordinate with other volunteers and organizers</li>
            </ul>
          </div>

          {!isAuthenticated && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ You need to be logged in to apply as a volunteer.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isAuthenticated}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? <Loader size="sm" /> : "Submit Application"}
          </button>
        </form>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-xl font-bold text-green-900 mb-2">
            Application Submitted
          </h3>
          <p className="text-green-700">
            Your volunteer application is under review. You'll be notified once
            it's approved.
          </p>
        </div>
      )}
    </div>
  );
}