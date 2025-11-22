import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGithub } from "react-icons/fa";
import { signup, googleLogin, getGitHubLoginURL } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password1 !== form.password2) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password1.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await signup(form.email, form.username, form.password1, form.password2);
      navigate("/pending");
    } catch (err) {
      if (err.response?.data) {
        const errorData = err.response.data;
        const firstKey = Object.keys(errorData)[0];
        if (firstKey && Array.isArray(errorData[firstKey])) {
          setError(errorData[firstKey][0]);
        } else {
          setError("Signup failed. Please check your details.");
        }
      } else {
        setError("Signup failed. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await googleLogin(tokenResponse.access_token);
        authLogin(res.key);
        navigate("/");
      } catch (err) {
        console.error("Google signup error:", err);
        setError("Google signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google OAuth error:", error);
      setError("Google signup was unsuccessful. Please try again.");
    },
    scope: "openid email profile",
  });

  const handleGitHubSignup = () => {
    window.location.href = getGitHubLoginURL();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16 pb-8">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password1"
              placeholder="Create a password (min 8 characters)"
              value={form.password1}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm your password"
              value={form.password2}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleGoogleSignup()}
            disabled={loading}
            className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700">Sign up with Google</span>
          </button>

          <button
            onClick={handleGitHubSignup}
            disabled={loading}
            className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <FaGithub size={20} />
            <span className="font-medium text-gray-700">Sign up with GitHub</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}