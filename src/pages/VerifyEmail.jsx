import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { key } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.post("http://127.0.0.1:8000/api/accounts/auth/registration/verify-email/", {
          key,
        });
        setStatus("Email verified successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setStatus("Invalid or expired verification link.");
      }
    };
    verify();
  }, [key, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Email Verification</h2>
        <p className="text-gray-700">{status}</p>
      </div>
    </div>
  );
}
