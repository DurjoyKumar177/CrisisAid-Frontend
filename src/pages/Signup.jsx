import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/auth/signup/",
        form
      );
      navigate("/verify-email-pending");
    } catch (err) {
      if (err.response?.data) {
        const firstError =
          Object.values(err.response.data)[0]?.[0] || "Signup failed.";
        setError(firstError);
      } else {
        setError("Signup failed. Please check your details.");
      }
    }
  };

  // ✅ Google signup using access_token
  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/accounts/google/",
          { access_token: tokenResponse.access_token }
        );
        localStorage.setItem("token", res.data.key);
        navigate("/");
      } catch (err) {
        setError("Google signup failed. Try again.");
      }
    },
    onError: () => setError("Google signup was unsuccessful. Try again."),
    scope: "openid email profile",
  });

  const handleGitHubSignup = () => {
    window.location.href = "http://127.0.0.1:8000/api/accounts/github/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3">
            {error}
          </div>
        )}

        {/* Manual signup form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            name="password1"
            placeholder="Password"
            value={form.password1}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={form.password2}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        {/* Social signup buttons */}
        <div className="flex flex-col gap-3">
          {/* Google Signup */}
          <button
            onClick={() => googleSignup()}
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          {/* GitHub Signup */}
          <button
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50"
            onClick={handleGitHubSignup}
          >
            <FaGithub size={20} /> Sign up with GitHub
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}