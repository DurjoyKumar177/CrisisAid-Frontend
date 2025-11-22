import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function Pending() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-16">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <FaEnvelope className="text-green-600 text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Check Your Email
        </h2>

        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address.
          Please click the link to verify your account.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> Check your spam folder if you don't see the email.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/login"
            className="block w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition font-medium"
          >
            Go to Login
          </Link>
          <Link
            to="/"
            className="block w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}