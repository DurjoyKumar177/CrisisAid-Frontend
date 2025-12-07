import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "support@crisisaid.org",
      link: "mailto:support@crisisaid.org",
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+880 1234-567890",
      link: "tel:+8801234567890",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "Dhaka, Bangladesh",
      link: "#",
      color: "text-green-600",
      bg: "bg-green-50"
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // TODO: Implement actual contact form submission
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess("Thank you for contacting us! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Have questions, suggestions, or need help? We're here to assist you 24/7.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white shadow-md -mt-8 relative z-10 mx-4 sm:mx-8 lg:mx-16 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className={`${info.bg} rounded-xl p-6 text-center hover:shadow-lg transition-all`}
              >
                <info.icon className={`text-4xl ${info.color} mx-auto mb-3`} />
                <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className={`${info.color} font-semibold`}>{info.details}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <p className="text-green-700">{success}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Support Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Emergency Hotline</span>
                    <span className="text-green-600 font-bold">24/7</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Email Support</span>
                    <span className="text-blue-600 font-bold">24/7</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Phone Support</span>
                    <span className="text-gray-600">9 AM - 9 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-semibold text-gray-700">Office Visits</span>
                    <span className="text-gray-600">By Appointment</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                <p className="text-white/90 mb-6">
                  Follow us on social media for updates, stories, and ways to get involved.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/durjoykumar.sarker.9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaFacebook size={24} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/durjoy-kumar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaLinkedin size={24} />
                  </a>

                  <a
                    href="https://github.com/DurjoyKumar177"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Emergency Contact</h3>
                <p className="text-white/90 mb-4">
                  For urgent crisis situations requiring immediate attention:
                </p>
                <a
                  href="tel:999"
                  className="block w-full bg-white text-red-600 py-4 rounded-lg font-bold text-xl text-center hover:bg-gray-100 transition"
                >
                  📞 Call 999
                </a>
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
              question="How quickly will I receive a response?"
              answer="We typically respond to all inquiries within 24 hours. For urgent crisis situations, please call our emergency hotline for immediate assistance."
            />
            <FAQItem
              question="Can I volunteer or donate through this form?"
              answer="While you can express interest through this form, we recommend using our dedicated Volunteer and Donate pages for faster processing and better tracking."
            />
            <FAQItem
              question="How can I report a crisis?"
              answer="To report a crisis, please log in to your account and use the 'Report Crisis' button. Your submission will be reviewed by our team within 2-4 hours."
            />
            <FAQItem
              question="Is my information secure?"
              answer="Yes, all information submitted through this form is encrypted and handled according to our privacy policy. We never share your personal information with third parties."
            />
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-6xl text-red-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Dhaka, Bangladesh</p>
              <p className="text-gray-500 text-sm mt-2">Detailed address will be provided upon appointment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className="text-blue-600 text-2xl font-bold">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 bg-gray-50">
          {answer}
        </div>
      )}
    </div>
  );
}