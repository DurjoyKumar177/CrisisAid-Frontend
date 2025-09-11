// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-6">
        <img
          src={user.profile_image || "/assets/default_profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-800">Account Info</h2>
        <ul className="mt-2 space-y-2 text-gray-700">
          <li>
            <span className="font-medium">Full Name:</span> {user.full_name || "N/A"}
          </li>
          <li>
            <span className="font-medium">Joined:</span>{" "}
            {new Date(user.date_joined).toLocaleDateString()}
          </li>
          <li>
            <span className="font-medium">Verified:</span>{" "}
            {user.is_verified ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </li>
        </ul>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="rounded-lg bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
