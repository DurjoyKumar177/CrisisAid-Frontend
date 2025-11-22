import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/crisis", label: "Crisis" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-white/95 backdrop-blur shadow" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-red-600 grid place-content-center text-white font-bold">
              C
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-lg text-red-600">CrisisAid</p>
              <p className="text-[11px] text-gray-500 -mt-1">
                Together, We Respond
              </p>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="text-gray-700 hover:text-red-600 transition-colors"
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
                    className="rounded-lg border bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="relative group">
                <button className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 hidden group-hover:block bg-white rounded-lg shadow-lg w-48 py-2">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-posts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Posts
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-blue-400 px-3 py-2 text-center text-blue-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-center text-white"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="w-full space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}