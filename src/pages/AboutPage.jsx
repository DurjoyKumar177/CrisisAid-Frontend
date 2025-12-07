import { FaHeart, FaHandsHelping, FaEye, FaBullseye, FaUsers, FaShieldAlt } from "react-icons/fa";

export default function AboutPage() {
  const stats = [
    { icon: FaUsers, value: "50,000+", label: "Active Users" },
    { icon: FaHandsHelping, value: "2,300+", label: "Volunteers" },
    { icon: FaHeart, value: "৳12M+", label: "Funds Raised" },
    { icon: FaShieldAlt, value: "120+", label: "Crises Managed" }
  ];

  const teamMembers = [
    {
      name: "Durjoy Kumar",
      role: "Founder & Lead Developer",
      image: "D",
      description: "Full-stack developer passionate about using technology for social good"
    },
    {
      name: "Development Team",
      role: "Core Contributors",
      image: "T",
      description: "Dedicated team building features that save lives"
    },
    {
      name: "Community Moderators",
      role: "Content & Support",
      image: "C",
      description: "Ensuring quality and authenticity of crisis reports"
    },
    {
      name: "Field Coordinators",
      role: "On-Ground Support",
      image: "F",
      description: "Coordinating relief efforts across Bangladesh"
    }
  ];

  const values = [
    {
      icon: "🤝",
      title: "Transparency",
      description: "We maintain complete transparency in fund allocation and relief distribution to build trust with donors and beneficiaries."
    },
    {
      icon: "⚡",
      title: "Speed",
      description: "During crises, every second counts. We ensure rapid response and quick fund disbursement to save lives."
    },
    {
      icon: "💯",
      title: "Accountability",
      description: "Every donation and volunteer action is tracked and reported, ensuring accountability at every level."
    },
    {
      icon: "🌟",
      title: "Innovation",
      description: "We leverage technology to create innovative solutions for disaster management and relief coordination."
    },
    {
      icon: "🤲",
      title: "Compassion",
      description: "At our core, we believe in treating every affected individual with dignity and compassion."
    },
    {
      icon: "🔗",
      title: "Collaboration",
      description: "We work with NGOs, government agencies, and local communities to maximize impact."
    }
  ];

  const milestones = [
    { year: "2024", event: "CrisisAid Platform Launched", description: "Started operations with initial crisis management features" },
    { year: "2024", event: "Flood Relief Success", description: "Coordinated relief for 10,000+ families during monsoon floods" },
    { year: "2024", event: "Volunteer Network Established", description: "Built a network of 2,000+ trained volunteers across Bangladesh" },
    { year: "2024", event: "First ৳10M Milestone", description: "Successfully raised and distributed ৳10 million in relief funds" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            About CrisisAid
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Connecting communities, coordinating relief, and saving lives during Bangladesh's most challenging moments.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-md -mt-8 relative z-10 mx-4 sm:mx-8 lg:mx-16 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="text-4xl text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaBullseye className="text-5xl text-red-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                To provide a transparent, efficient, and accessible platform that connects people in crisis with immediate relief and support from volunteers, donors, and organizations across Bangladesh.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We strive to minimize response time during disasters, maximize the impact of every donation, and ensure that no cry for help goes unheard.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaEye className="text-5xl text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                To create a Bangladesh where every citizen affected by a crisis receives timely support, and where the power of community and technology combine to build a more resilient nation.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We envision a future where disaster response is so efficient and coordinated that no family has to face a crisis alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                CrisisAid was born from a simple observation: during disasters, the willingness to help often exceeds the ability to coordinate that help effectively. In 2024, witnessing the devastating floods across Bangladesh, we saw families struggle not because help wasn't available, but because it couldn't reach them in time.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Traditional relief efforts faced challenges: fragmented communication, lack of transparency in fund allocation, difficulty in volunteer coordination, and no centralized platform for crisis information. We knew technology could bridge these gaps.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                What started as a small project by a group of concerned developers quickly grew into a comprehensive platform. Today, CrisisAid connects thousands of volunteers with those in need, processes millions of taka in donations with complete transparency, and provides real-time updates from crisis zones across Bangladesh.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We're not just building a platform; we're building a movement. A movement where every Bangladeshi, regardless of their location or resources, can contribute to national resilience during times of crisis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Core Values</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            These principles guide every decision we make and every feature we build
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                      <div className="text-red-600 font-bold text-2xl mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Meet Our Team</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Dedicated individuals working tirelessly to make CrisisAid a reality
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-red-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 text-white/90">
            Together, we can build a more resilient Bangladesh. Be part of the solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/volunteer"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Become a Volunteer
            </a>
            <a
              href="/donate"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition"
            >
              Make a Donation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}