// FILE: src/Components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Logo_2.png";
import { 
  FaUser, 
  FaChartLine, 
  FaHistory, 
  FaSignOutAlt,
  FaTachometerAlt,
  FaPlus
} from "react-icons/fa";

const links = [
  { href: "/", label: "Home" },
  { href: "/crisis", label: "Crisis" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  const getProfileImage = () => {
    if (user?.profile_picture) {
      if (user.profile_picture.startsWith('/media/') || user.profile_picture.startsWith('media/')) {
        return `http://127.0.0.1:8000${user.profile_picture}`;
      }
      return user.profile_picture;
    }
    return null;
  };

  const profileImage = getProfileImage();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="CrisisAid Logo"
              className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="leading-tight">
              <p className="font-extrabold text-xl text-red-600 group-hover:text-red-500 transition-colors">
                CrisisAid
              </p>
              <p className="text-[10px] -mt-0.5 text-gray-600">
                Together, We Respond
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="text-gray-700 hover:text-red-600 transition-colors font-semibold"
                >
                  {l.label}
                </Link>
              </li>
            ))}

            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="rounded-lg border-2 border-blue-500 bg-blue-500 text-white px-5 py-2 font-semibold hover:bg-blue-600 hover:border-blue-600 transition-all"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="rounded-lg bg-red-600 px-5 py-2 text-white font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user?.username}
                      className="w-10 h-10 rounded-full border-2 border-red-500 object-cover shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-lg ${profileImage ? 'hidden' : 'flex'}`}
                  >
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>

                {/* Premium Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 bg-white rounded-2xl shadow-2xl w-72 py-2 border border-gray-100 animate-fadeIn"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {/* User Info Header */}
                    <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
                      <div className="flex items-center gap-3">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt={user?.username}
                            className="w-12 h-12 rounded-full border-2 border-red-500 object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-lg ${profileImage ? 'hidden' : 'flex'}`}
                        >
                          {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {user?.username}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="py-2">
                      <Link
                        to="/crisis/create"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all mx-2 rounded-lg shadow-md"
                      >
                        <FaPlus className="text-base" />
                        <span className="font-semibold">Create Crisis Post</span>
                      </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
                          <FaUser className="text-blue-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">My Profile</p>
                          <p className="text-xs text-gray-500">View and edit profile</p>
                        </div>
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
                          <FaTachometerAlt className="text-purple-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">Dashboard</p>
                          <p className="text-xs text-gray-500">Posts & applications</p>
                        </div>
                      </Link>

                      <Link
                        to="/dashboard?tab=history"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors">
                          <FaHistory className="text-green-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">Activity History</p>
                          <p className="text-xs text-gray-500">Donations & updates</p>
                        </div>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                          <FaSignOutAlt className="text-red-600 text-sm" />
                        </div>
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path
                strokeWidth="2"
                strokeLinecap="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="flex gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2.5 text-center text-white font-semibold hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-center text-white font-semibold hover:bg-red-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="border-t pt-3 space-y-2">
                {/* User Info */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user?.username}
                      className="w-10 h-10 rounded-full border-2 border-red-500 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold ${profileImage ? 'hidden' : 'flex'}`}
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* Quick Action */}
                <Link
                  to="/crisis/create"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-center font-semibold hover:from-red-700 hover:to-orange-700 transition"
                >
                  + Create Crisis Post
                </Link>

                {/* Menu Items */}
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-red-50 transition"
                >
                  <FaUser /> Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-red-50 transition"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
                <Link
                  to="/dashboard?tab=history"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-red-50 transition"
                >
                  <FaHistory /> Activity History
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left rounded-lg px-4 py-2.5 text-red-600 hover:bg-red-50 transition font-medium"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}