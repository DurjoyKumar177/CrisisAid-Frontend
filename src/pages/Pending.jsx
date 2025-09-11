import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function Pending() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 rounded-full">
            <Mail className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a confirmation link to your email address.  
          Please check your inbox (and spam folder) and click the link  
          to activate your account.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Once verified, you can log in to your account.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
