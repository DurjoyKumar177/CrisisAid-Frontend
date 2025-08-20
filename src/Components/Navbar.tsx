import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-red-600">
          CrisisAid <span className="text-sm text-gray-500">– Together, We Respond</span>
        </h1>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="hover:text-red-600">Home</a>
          <a href="#about" className="hover:text-red-600">About</a>
          <a href="#map" className="hover:text-red-600">Crisis Map</a>
          <a href="#donate" className="hover:text-red-600">Donate</a>
          <a href="#volunteer" className="hover:text-red-600">Volunteer</a>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Login / Sign Up
          </button>
          <button className="ml-4 border px-3 py-1 rounded hover:bg-gray-100">
            বাংলা / EN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
