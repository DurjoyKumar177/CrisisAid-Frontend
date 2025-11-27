import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCrisisPosts, getMyVolunteerApplications } from "../services/crisisService";
import Loader from "../Components/common/Loader";
import { 
  FaHandsHelping, 
  FaUsers, 
  FaClock, 
  FaHeart,
  FaCheckCircle,
  FaMedkit,
  FaTools,
  FaTruck,
  FaBullhorn,
  FaGraduationCap,
  FaClipboardCheck
} from "react-icons/fa";
import placeholder1 from "../assets/placeholder1.jpg";

export default function VolunteerPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [activeCrises, setActiveCrises] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const crises = await getCrisisPosts();
      const approved = crises.filter((c) => c.status === "approved").slice(0, 6);
      setActiveCrises(approved);

      if (isAuthenticated) {
        try {
          const apps = await getMyVolunteerApplications();
          setMyApplications(apps);
        } catch (err) {
          console.log("No applications yet");
        }
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const volunteerStats = [
    { icon: FaUsers, value: "2,300+", label: "Active Volunteers" },
    { icon: FaHandsHelping, value: "120+", label: "Crises Served" },
    { icon: FaClock, value: "50,000+", label: "Hours Contributed" },
    { icon: FaHeart, value: "18,420", label: "Lives Impacted" },
  ];

  const volunteerRoles = [
    {
      icon: FaMedkit,
      title: "Medical Support",
      description: "Provide healthcare assistance and medical aid",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      id: "medical"
    },
    {
      icon: FaTruck,
      title: "Relief Distribution",
      description: "Help distribute food, water, and supplies",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      id: "distribution"
    },
    {
      icon: FaTools,
      title: "Reconstruction",
      description: "Assist in rebuilding homes and infrastructure",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      id: "reconstruction"
    },
    {
      icon: FaBullhorn,
      title: "Awareness & Outreach",
      description: "Spread awareness and coordinate relief efforts",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      id: "outreach"
    },
    {
      icon: FaGraduationCap,
      title: "Education Support",
      description: "Teach children and provide educational resources",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      id: "education"
    },
    {
      icon: FaClipboardCheck,
      title: "Data & Documentation",
      description: "Record relief activities and maintain records",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      id: "documentation"
    },
  ];

  const requirements = [
    "Must be 18 years or older",
    "Commitment to work at least 8 hours per week",
    "Good physical health and stamina",
    "Ability to work in challenging conditions",
    "Strong communication skills",
    "Compassion and empathy for those in need"
  ];

  const benefits = [
    "Make a real difference in people's lives",
    "Gain hands-on crisis management experience",
    "Build leadership and teamwork skills",
    "Receive volunteer certificates",
    "Join a supportive community",
    "Contribute to national resilience"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🤝 Join Our Mission
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Become a CrisisAid Volunteer
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Be the help they need. Join thousands of volunteers making a real difference during Bangladesh's toughest moments.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#apply"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </a>

                <a
                  href="#how-it-works"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition"
                >
                  How It Works
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Why Volunteer?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-300 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Direct Impact</p>
                      <p className="text-white/80 text-sm">See the immediate results of your efforts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-300 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Skill Development</p>
                      <p className="text-white/80 text-sm">Gain valuable crisis management experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-300 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Community Building</p>
                      <p className="text-white/80 text-sm">Connect with like-minded individuals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white shadow-md -mt-8 relative z-10 mx-4 sm:mx-8 lg:mx-16 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {volunteerStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="text-4xl text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the area where you want to make a difference. We have opportunities for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerRoles.map((role, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-6 transition-all cursor-pointer hover:shadow-lg ${role.bg} ${role.border} hover:border-opacity-100`}
                onClick={() => setSelectedRole(role.id)}
              >
                <role.icon className={`text-5xl ${role.color} mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                <button className={`text-sm font-semibold ${role.color} hover:underline`}>
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How to Become a Volunteer
            </h2>
            <p className="text-gray-600">Simple steps to start making a difference</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600 text-sm">
                Create your account and complete your profile
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Apply</h3>
              <p className="text-gray-600 text-sm">
                Browse active crises and apply to volunteer
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Approved</h3>
              <p className="text-gray-600 text-sm">
                Wait for crisis organizer to review your application
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Start Helping</h3>
              <p className="text-gray-600 text-sm">
                Coordinate with team and make an impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements & Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📋 Requirements
              </h2>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎁 Benefits
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaHeart className="text-red-600 text-xl flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Active Opportunities */}
      <section id="apply" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Active Volunteer Opportunities
            </h2>
            <p className="text-gray-600">
              Browse current crises that need volunteers and apply today
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {activeCrises.map((crisis) => (
                  <VolunteerOpportunityCard key={crisis.id} crisis={crisis} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/crisis"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  View All Opportunities
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* My Applications */}
      {isAuthenticated && myApplications.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              My Volunteer Applications
            </h2>

            <div className="grid gap-4">
              {myApplications.map((app) => (
                <div key={app.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {app.crisis_title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{app.message}</p>
                      <p className="text-sm text-gray-500">
                        Applied on {new Date(app.applied_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status === "approved" ? "✓ Approved" : 
                       app.status === "rejected" ? "✗ Rejected" : 
                       "⏳ Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Volunteer Stories */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Stories from Our Volunteers
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Hear from volunteers who've made a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <VolunteerStory
              name="Rahim Khan"
              role="Medical Volunteer"
              quote="Volunteering during the Sylhet floods was life-changing. I helped 200+ families access medical care."
              image="R"
            />
            <VolunteerStory
              name="Nusrat Jahan"
              role="Relief Distribution"
              quote="Being part of food distribution efforts made me realize how much we can achieve together."
              image="N"
            />
            <VolunteerStory
              name="Karim Ahmed"
              role="Reconstruction Team"
              quote="Rebuilding homes with my own hands gave me purpose. I've never felt more fulfilled."
              image="K"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of dedicated volunteers and help save lives during crises.
          </p>
          {!isAuthenticated ? (
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-lg"
              >
                Sign Up to Volunteer
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-lg hover:bg-blue-50 transition font-bold text-lg"
              >
                Login
              </button>
            </div>
          ) : (
            <Link
              to="/crisis"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-lg"
            >
              Browse Opportunities
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

// Volunteer Opportunity Card Component
function VolunteerOpportunityCard({ crisis }) {
  const imageUrl = crisis.banner_image || placeholder1;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-48">
        <img src={imageUrl} alt={crisis.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
            Volunteers Needed
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {crisis.title}
        </h3>

        {crisis.location && (
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
            📍 {crisis.location}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <FaUsers /> 15 slots left
          </span>
          <span className="flex items-center gap-1">
            <FaClock /> Urgent
          </span>
        </div>

        <Link
          to={`/crisis/${crisis.id}`}
          className="block w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-center"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

// Volunteer Story Component
function VolunteerStory({ name, role, quote, image }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xl">
          {image}
        </div>
        <div>
          <p className="font-bold text-lg">{name}</p>
          <p className="text-sm text-white/80">{role}</p>
        </div>
      </div>
      <p className="text-white/90 italic">"{quote}"</p>
    </div>
  );
}