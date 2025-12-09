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

              <div className="space-y-6">
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
                  onClick={handleSubmit}
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
              </div>
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
      <section className="py-16 bg-gray-50">
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

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '500px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0446277891757!2d90.38003641498207!3d23.739743584589474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7db3123bb%3A0x33f738dc3ddbe79f!2sDhaka%20City%20College!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dhaka City College Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
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

// Newsletter Section Component
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // TODO: Implement actual newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess("Thank you for subscribing! Check your inbox for confirmation.");
      setEmail("");
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl">
          <FaEnvelope className="text-6xl text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for crisis updates, success stories, and ways to make a difference in your community.
          </p>

          {success && (
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg p-4 mb-6 max-w-md mx-auto font-semibold">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-600/80 backdrop-blur-sm border-2 border-red-400 text-white rounded-lg p-4 mb-6 max-w-md mx-auto font-semibold">
              {error}
            </div>
          )}

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/50 focus:outline-none font-medium"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>

          <p className="text-white text-sm mt-6 font-medium">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}