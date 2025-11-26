import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCrisisPosts } from "../services/crisisService";
import { FaHeart, FaHandHoldingHeart, FaUsers, FaChartLine } from "react-icons/fa";
import Loader from "../Components/common/Loader";
import placeholder1 from "../assets/placeholder1.jpg";

export default function DonatePage() {
  const [featuredCrises, setFeaturedCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  useEffect(() => {
    fetchFeaturedCrises();
  }, []);

  const fetchFeaturedCrises = async () => {
    try {
      const data = await getCrisisPosts();
      const approved = data.filter((c) => c.status === "approved").slice(0, 6);
      setFeaturedCrises(approved);
    } catch (err) {
      console.error("Failed to fetch crises:", err);
    } finally {
      setLoading(false);
    }
  };

  const impactStats = [
    { icon: FaHeart, value: "12M+", label: "Total Raised", color: "text-red-600" },
    { icon: FaUsers, value: "50,000+", label: "Donors", color: "text-blue-600" },
    { icon: FaHandHoldingHeart, value: "120+", label: "Crises Supported", color: "text-green-600" },
    { icon: FaChartLine, value: "98%", label: "Transparency", color: "text-purple-600" },
  ];

  const donationCategories = [
    {
      title: "Emergency Relief",
      description: "Immediate food, water, and medical supplies",
      icon: "🚨",
      color: "bg-red-50 border-red-200 hover:border-red-400",
    },
    {
      title: "Shelter & Housing",
      description: "Temporary shelters and rebuilding homes",
      icon: "🏠",
      color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    },
    {
      title: "Medical Aid",
      description: "Healthcare services and medicine",
      icon: "⚕️",
      color: "bg-green-50 border-green-200 hover:border-green-400",
    },
    {
      title: "Education Support",
      description: "School supplies and educational programs",
      icon: "📚",
      color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
            Your Donation Saves Lives
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Every contribution makes a difference. Help us reach those in need during Bangladesh's toughest moments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#donate-now"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
            >
              Donate Now
            </a>
            <a
              href="#how-it-helps"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition"
            >
              Learn How It Helps
            </a>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white shadow-md -mt-8 relative z-10 mx-4 sm:mx-8 lg:mx-16 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className={`text-4xl ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Donation Form */}
      <section id="donate-now" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Make Your Donation
            </h2>

            {/* Donation Type Toggle */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setDonationType("one-time")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  donationType === "one-time"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setDonationType("monthly")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  donationType === "monthly"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Quick Amount Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Amount (BDT)
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-3 rounded-lg font-bold transition ${
                      selectedAmount === amount
                        ? "bg-red-600 text-white ring-2 ring-red-400"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ৳{amount.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  ৳
                </span>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition"
                />
              </div>
            </div>

            {/* What Your Donation Does */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                💡 Your {selectedAmount || customAmount || "donation"} BDT can provide:
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Food supplies for 5 families for 3 days</li>
                <li>✓ Clean water for 20 people for 1 week</li>
                <li>✓ Emergency medical kits for 10 individuals</li>
              </ul>
            </div>

            {/* Donate Button */}
            <button className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition font-bold text-lg shadow-lg hover:shadow-xl">
              Proceed to Donate ৳{selectedAmount || customAmount || "___"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              🔒 Secure payment powered by SSL encryption
            </p>
          </div>
        </div>
      </section>

      {/* Donation Categories */}
      <section id="how-it-helps" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Where Your Donation Goes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              100% of your donation goes directly to crisis relief. We maintain complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationCategories.map((category, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${category.color}`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Crisis to Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Active Crises That Need Your Help
            </h2>
            <p className="text-gray-600">
              Donate directly to a specific crisis or let us allocate your funds where they're needed most.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCrises.map((crisis) => (
                <CrisisCard key={crisis.id} crisis={crisis} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/crisis"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              View All Active Crises
            </Link>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Donate to CrisisAid?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">100% Transparency</h3>
                    <p className="text-white/90">
                      Track exactly where your money goes with real-time updates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Direct Impact</h3>
                    <p className="text-white/90">
                      Your donation reaches those in need within 24-48 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Verified Needs</h3>
                    <p className="text-white/90">
                      All crises are verified by our team and local volunteers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Tax Benefits</h3>
                    <p className="text-white/90">
                      Receive tax deduction certificates for your donations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6">Donor Testimonial</h3>
              <div className="mb-4">
                <div className="flex gap-1 text-yellow-500 mb-3">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-gray-700 italic mb-4">
                  "I donated during the last flood and was amazed by the transparency. 
                  I could see exactly how my money helped families rebuild their lives. 
                  CrisisAid is doing incredible work."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Ayesha Rahman</p>
                    <p className="text-sm text-gray-500">Donor from Dhaka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="Is my donation secure?"
              answer="Yes! All donations are processed through SSL-encrypted payment gateways. Your financial information is completely secure."
            />
            <FAQItem
              question="Can I donate anonymously?"
              answer="Absolutely! You can choose to make your donation anonymous during the checkout process."
            />
            <FAQItem
              question="How quickly does my donation reach those in need?"
              answer="We process donations within 24 hours and deliver aid within 48 hours of receiving funds."
            />
            <FAQItem
              question="Can I track how my donation is used?"
              answer="Yes! After donating, you'll receive regular updates with photos and reports showing the impact of your contribution."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Every Second Counts
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Your donation today can provide immediate relief to families in crisis.
          </p>
          <a
            href="#donate-now"
            className="inline-block bg-white text-red-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-xl"
          >
            Donate Now
          </a>
        </div>
      </section>
    </div>
  );
}

// Crisis Card Component
function CrisisCard({ crisis }) {
  const imageUrl = crisis.banner_image || placeholder1;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-48">
        <img src={imageUrl} alt={crisis.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold">
            Urgent
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {crisis.title}
        </h3>

        {crisis.location && (
          <p className="text-sm text-gray-600 mb-3">📍 {crisis.location}</p>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Raised</span>
            <span>65%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: "65%" }} />
          </div>
        </div>

        <Link
          to={`/crisis/${crisis.id}`}
          className="block w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold text-center"
        >
          Donate to This Crisis
        </Link>
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className="text-red-600 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
}