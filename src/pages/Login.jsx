import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGithub } from "react-icons/fa";
import { login, googleLogin, getGitHubLoginURL } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin, checkAuth } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(form.username, form.password);
      authLogin(res.key);
      // Give a moment for the token to be set, then check auth to get profile data
      setTimeout(() => {
        checkAuth();
        navigate("/");
      }, 100);
    } catch (err) {
      if (err.response?.data) {
        const errorData = err.response.data;
        if (errorData.non_field_errors) {
          setError(errorData.non_field_errors[0]);
        } else if (errorData.detail) {
          setError(errorData.detail);
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } else {
        setError("Login failed. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await googleLogin(tokenResponse.access_token);
        authLogin(res.key);
        // Give a moment for the token to be set, then check auth to get profile data
        setTimeout(() => {
          checkAuth();
          navigate("/");
        }, 100);
      } catch (err) {
        console.error("Google login error:", err);
        setError("Google login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google OAuth error:", error);
      setError("Google login was unsuccessful. Please try again.");
    },
    scope: "openid email profile",
  });

  const handleGitHubLogin = () => {
    window.location.href = getGitHubLoginURL();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Login to CrisisAid
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username or email"
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
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleGoogleLogin()}
            disabled={loading}
            className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700">Login with Google</span>
          </button>

          <button
            onClick={handleGitHubLogin}
            disabled={loading}
            className="flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <FaGithub size={20} />
            <span className="font-medium text-gray-700">Login with GitHub</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}