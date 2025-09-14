import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/auth/login/",
        form
      );
      localStorage.setItem("token", res.data.key);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  // ✅ Google login using access_token
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/accounts/google/",
          { access_token: tokenResponse.access_token }
        );
        localStorage.setItem("token", res.data.key);
        navigate("/");
      } catch (err) {
        setError("Google login failed. Try again.");
      }
    },
    onError: () => setError("Google login was unsuccessful. Try again."),
    scope: "openid email profile",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Login to CrisisAid
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3">
            {error}
          </div>
        )}

        {/* Normal login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="login"
            placeholder="Email or Username"
            value={form.login}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        {/* Google Login Button */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => googleLogin()}
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>

          {/* GitHub Login */}
          <button
            className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50"
            onClick={() =>
              (window.location.href =
                "http://127.0.0.1:8000/api/accounts/github/")
            }
          >
            <FaGithub size={20} /> Login with GitHub
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}