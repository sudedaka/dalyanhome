import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll takibi
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Mobile: Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo (her ekranda ortada) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span
            className={`text-3xl font-bold tracking-wide ${
              scrolled ? "text-teal-700" : "text-white"
            }`}
          >
            DalyanHome
          </span>
        </div>

        {/* Desktop: Linkler */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#anasayfa"
            className={`text-base font-medium ${
              scrolled ? "text-gray-700" : "text-white"
            } hover:text-teal-400 transition`}
          >
            Anasayfa
          </a>
          <a
            href="#galeri"
            className={`text-base font-medium ${
              scrolled ? "text-gray-700" : "text-white"
            } hover:text-teal-400 transition`}
          >
            Galeri
          </a>
          <a
            href="#bilgi"
            className={`text-base font-medium ${
              scrolled ? "text-gray-700" : "text-white"
            } hover:text-teal-400 transition`}
          >
            Bilgi
          </a>
          <a
            href="#iletisim"
            className={`text-base font-medium ${
              scrolled ? "text-gray-700" : "text-white"
            } hover:text-teal-400 transition`}
          >
            İletişim
          </a>
        </nav>

        {/* Desktop: Rezervasyon + Dil */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#rezervasyon"
            className={`px-5 py-3 rounded-full font-medium transition text-base ${
              scrolled
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-white text-teal-600 hover:bg-white/90"
            }`}
          >
            Rezervasyon
          </a>
          <select
            className={`bg-transparent text-base font-medium focus:outline-none ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <option value="tr">TR</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>

      {/* Mobile Menü */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 py-6">
            <a
              href="#anasayfa"
              className="text-lg font-medium text-gray-700 hover:text-teal-600"
              onClick={() => setOpen(false)}
            >
              Anasayfa
            </a>
            <a
              href="#galeri"
              className="text-lg font-medium text-gray-700 hover:text-teal-600"
              onClick={() => setOpen(false)}
            >
              Galeri
            </a>
            <a
              href="#bilgi"
              className="text-lg font-medium text-gray-700 hover:text-teal-600"
              onClick={() => setOpen(false)}
            >
              Bilgi
            </a>
            <a
              href="#iletisim"
              className="text-lg font-medium text-gray-700 hover:text-teal-600"
              onClick={() => setOpen(false)}
            >
              İletişim
            </a>
            <a
              href="#rezervasyon"
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition"
              onClick={() => setOpen(false)}
            >
              Rezervasyon
            </a>
            <select
              className="mt-2 bg-transparent text-gray-700 text-base font-medium focus:outline-none"
              onChange={() => setOpen(false)}
            >
              <option value="tr">TR</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
