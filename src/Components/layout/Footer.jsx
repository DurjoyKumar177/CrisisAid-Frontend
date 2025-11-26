import { FaGithub, FaLinkedin, FaFacebook, FaGlobe, FaDiscord, FaHeart } from "react-icons/fa";
import logo from "../../assets/Logo_2.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#003049] via-[#002137] to-[#001829] text-white mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="CrisisAid Logo" className="h-12 w-12 object-contain" />
              <div>
                <span className="text-xl font-bold text-white">CrisisAid</span>
                <p className="text-xs text-gray-300">Together, We Respond</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              A transparent, real-time platform to coordinate relief and empower communities across Bangladesh during crises.
            </p>
            <div className="mt-6 flex items-center gap-2 text-red-400">
              <FaHeart className="animate-pulse" />
              <span className="text-sm font-medium">Built for Bangladesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-red-400">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> Home
                </a>
              </li>
              <li>
                <a href="/crisis" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> Active Crises
                </a>
              </li>
              <li>
                <a href="/volunteer" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> Become a Volunteer
                </a>
              </li>
              <li>
                <a href="/donate" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> Donate
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-red-400">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> Terms of Service
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">▸</span> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-red-400">Stay Updated</h4>
            <p className="text-sm text-gray-300 mb-4">
              Get the latest updates on crisis relief efforts.
            </p>
            <form className="mb-6">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-red-600 text-white px-4 py-2.5 font-semibold hover:bg-red-700 transition-all text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div>
              <h5 className="font-semibold text-sm mb-3 text-gray-300">Connect with Developer</h5>
              <div className="flex gap-3">
                <a
                  href="https://github.com/DurjoyKumar177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/durjoy-kumar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://www.facebook.com/durjoykumar.sarker.9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://durjoy-kumar-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Portfolio"
                >
                  <FaGlobe size={20} />
                </a>
                <a
                  href="https://discord.com/users/durjoykumar22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Discord"
                >
                  <FaDiscord size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>
              © {currentYear} <span className="font-semibold text-red-400">CrisisAid</span>. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Developed by{" "}
              <a
                href="https://durjoy-kumar-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-400 hover:underline"
              >
                Durjoy Kumar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}