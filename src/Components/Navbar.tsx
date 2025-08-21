import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#map", label: "Crisis Map" },
  { href: "#donate", label: "Donate" },
  { href: "#volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-white/95 backdrop-blur shadow" : "bg-transparent"
      }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-red-600 grid place-content-center text-white font-bold">
              
            </div>
            <img src="../assets/Logo_2.png" alt="" />
            <div className="leading-tight">
              <p className="font-extrabold text-lg text-red-600">CrisisAid</p>
              <p className="text-[11px] text-gray-500 -mt-1">
                Together, We Respond
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-gray-700 hover:text-red-600 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button className="rounded-lg border border-red-600 px-3 py-2 text-red-600 hover:bg-red-600 hover:text-blue-600 transition">
                Login
              </button>
            </li>
            <li>
              <button className="rounded-lg bg-red-600 px-3 py-2 text-black hover:bg-red-700 transition">
                Sign Up
              </button>
            </li>
            <li>
              <select
                aria-label="Language"
                className="rounded-lg border px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
                defaultValue="EN">
                <option value="EN">EN</option>
                <option value="BN">বাংলা</option>
              </select>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu">
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50">
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 rounded-lg border border-red-600 px-3 py-2 text-red-600">
                Login
              </button>
              <button className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-white">
                Sign Up
              </button>
              <select className="rounded-lg border px-2 py-2 text-sm">
                <option>EN</option>
                <option>বাংলা</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
