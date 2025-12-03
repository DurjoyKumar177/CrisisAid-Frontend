import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  createMoneyDonation,
  createGoodsDonation,
  getCrisisDonationSummary,
} from "../../services/crisisService";
import Loader from "../common/Loader";

export default function DonationSection({ crisisId }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [donationType, setDonationType] = useState("money");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [moneyForm, setMoneyForm] = useState({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    amount: "",
    payment_method: "bkash",
    transaction_id: "",
    message: "",
    is_anonymous: false,
  });

  const [goodsForm, setGoodsForm] = useState({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    item_description: "",
    quantity: "",
    delivery_method: "",
    message: "",
    is_anonymous: false,
  });

  useEffect(() => {
    fetchSummary();
    if (isAuthenticated && user) {
      setMoneyForm((prev) => ({
        ...prev,
        donor_name: user.username,
        donor_email: user.email,
      }));
      setGoodsForm((prev) => ({
        ...prev,
        donor_name: user.username,
        donor_email: user.email,
      }));
    }
  }, [isAuthenticated, user, crisisId]);

  const fetchSummary = async () => {
    try {
      const data = await getCrisisDonationSummary(crisisId);
      setSummary(data);
    } catch (err) {
      console.error("Failed to fetch donation summary:", err);
    }
  };

  const handleMoneySubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError("Please login to make a donation. Click the 'Login to Donate' button below.");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createMoneyDonation({
        crisis_post: crisisId,
        ...moneyForm,
      });
      setSuccess("Thank you for your donation! 🙏");
      setMoneyForm({
        donor_name: user?.username || "",
        donor_email: user?.email || "",
        donor_phone: "",
        amount: "",
        payment_method: "bkash",
        transaction_id: "",
        message: "",
        is_anonymous: false,
      });
      fetchSummary();
    } catch (err) {
      setError("Failed to process donation. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoodsSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError("Please login to make a donation. Click the 'Login to Donate' button below.");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createGoodsDonation({
        crisis_post: crisisId,
        ...goodsForm,
      });
      setSuccess("Thank you for your donation! 🙏");
      setGoodsForm({
        donor_name: user?.username || "",
        donor_email: user?.email || "",
        donor_phone: "",
        item_description: "",
        quantity: "",
        delivery_method: "",
        message: "",
        is_anonymous: false,
      });
      fetchSummary();
    } catch (err) {
      setError("Failed to process donation. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Donation Summary */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="text-3xl font-bold text-green-600">
              ৳{parseFloat(summary.total_money || 0).toLocaleString()}
            </div>
            <p className="text-gray-600 mt-2">Total Funds Raised</p>
            <p className="text-sm text-gray-500 mt-1">
              {summary.total_donors_money || 0} donors
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">
              {summary.total_goods_donations || 0}
            </div>
            <p className="text-gray-600 mt-2">Goods Donations</p>
            <p className="text-sm text-gray-500 mt-1">Items contributed</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <div className="text-3xl font-bold text-purple-600">
              {(summary.total_donors_money || 0) +
                (summary.total_goods_donations || 0)}
            </div>
            <p className="text-gray-600 mt-2">Total Contributors</p>
            <p className="text-sm text-gray-500 mt-1">Helping this crisis</p>
          </div>
        </div>
      )}

      {/* Login Required Message for Unauthenticated Users */}
      {!isAuthenticated && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🔒</span>
            <h3 className="text-xl font-bold text-gray-900">
              Login Required to Donate
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            You need to be logged in to make a donation. This helps us ensure transparency and track donations properly.
          </p>
          <button
            onClick={() => navigate("/login", { 
              state: { from: `/crisis/${crisisId}`, tab: "donation" } 
            })}
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition font-semibold shadow-lg hover:shadow-xl"
          >
            Login to Donate
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup", { 
                state: { from: `/crisis/${crisisId}`, tab: "donation" } 
              })}
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Sign up here
            </button>
          </p>
        </div>
      )}

      {/* Donation Forms (Only for Authenticated Users) */}
      {isAuthenticated && (
        <>
          {/* Donation Type Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setDonationType("money")}
              className={`px-6 py-3 font-semibold transition-colors ${
                donationType === "money"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              💰 Money Donation
            </button>
            <button
              onClick={() => setDonationType("goods")}
              className={`px-6 py-3 font-semibold transition-colors ${
                donationType === "goods"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              📦 Goods Donation
            </button>
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

          {/* Money Donation Form */}
          {donationType === "money" && (
            <form onSubmit={handleMoneySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={moneyForm.donor_name}
                    onChange={(e) =>
                      setMoneyForm({ ...moneyForm, donor_name: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={moneyForm.donor_email}
                    onChange={(e) =>
                      setMoneyForm({ ...moneyForm, donor_email: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={moneyForm.donor_phone}
                    onChange={(e) =>
                      setMoneyForm({ ...moneyForm, donor_phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (BDT) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={moneyForm.amount}
                    onChange={(e) =>
                      setMoneyForm({ ...moneyForm, amount: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method *
                  </label>
                  <select
                    value={moneyForm.payment_method}
                    onChange={(e) =>
                      setMoneyForm({ ...moneyForm, payment_method: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  >
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="rocket">Rocket</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={moneyForm.transaction_id}
                    onChange={(e) =>
                      setMoneyForm({ ...moneyForm, transaction_id: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={moneyForm.message}
                  onChange={(e) =>
                    setMoneyForm({ ...moneyForm, message: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous-money"
                  checked={moneyForm.is_anonymous}
                  onChange={(e) =>
                    setMoneyForm({ ...moneyForm, is_anonymous: e.target.checked })
                  }
                  className="w-4 h-4 text-red-600 focus:ring-red-400"
                />
                <label htmlFor="anonymous-money" className="text-sm text-gray-700">
                  Make this donation anonymous
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? <Loader size="sm" /> : "Donate Now"}
              </button>
            </form>
          )}

          {/* Goods Donation Form */}
          {donationType === "goods" && (
            <form onSubmit={handleGoodsSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={goodsForm.donor_name}
                    onChange={(e) =>
                      setGoodsForm({ ...goodsForm, donor_name: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={goodsForm.donor_email}
                    onChange={(e) =>
                      setGoodsForm({ ...goodsForm, donor_email: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={goodsForm.donor_phone}
                    onChange={(e) =>
                      setGoodsForm({ ...goodsForm, donor_phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={goodsForm.quantity}
                    onChange={(e) =>
                      setGoodsForm({ ...goodsForm, quantity: e.target.value })
                    }
                    placeholder="e.g., 50 bags, 100 kg"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Description *
                </label>
                <textarea
                  value={goodsForm.item_description}
                  onChange={(e) =>
                    setGoodsForm({ ...goodsForm, item_description: e.target.value })
                  }
                  required
                  rows="3"
                  placeholder="Describe the items you're donating..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Method
                </label>
                <input
                  type="text"
                  value={goodsForm.delivery_method}
                  onChange={(e) =>
                    setGoodsForm({ ...goodsForm, delivery_method: e.target.value })
                  }
                  placeholder="e.g., Self delivery, Courier"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={goodsForm.message}
                  onChange={(e) =>
                    setGoodsForm({ ...goodsForm, message: e.target.value })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous-goods"
                  checked={goodsForm.is_anonymous}
                  onChange={(e) =>
                    setGoodsForm({ ...goodsForm, is_anonymous: e.target.checked })
                  }
                  className="w-4 h-4 text-red-600 focus:ring-red-400"
                />
                <label htmlFor="anonymous-goods" className="text-sm text-gray-700">
                  Make this donation anonymous
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? <Loader size="sm" /> : "Donate Goods"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}