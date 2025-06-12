import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["anasayfa", "galeri", "bilgi", "iletisim","rezervasyon"];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (id) => `relative text-base font-medium transition ${
    scrolled ? "text-gray-700" : "text-white"
  } hover:text-teal-400 ${
    activeSection === id
      ? "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-1 after:bg-teal-600 after:rounded-full"
      : ""
  }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Mobile: Hamburger */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo (ortada) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center mt-2">
          <span
            className={`text-3xl font-bold tracking-wide font-savate ${
              scrolled ? "text-teal-700" : "text-white"
            }`}
          >
            DalyanHome
          </span>
          <div
            className={`text-base font-oooh mt-0.5 ${
              scrolled ? "text-gray-500" : "text-white/80"
            }`}
          >
            ● Muğla ●
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#anasayfa" className={navLinkClass("anasayfa")}>Anasayfa</a>
          <a href="#galeri" className={navLinkClass("galeri")}>Galeri</a>
          <a href="#bilgi" className={navLinkClass("bilgi")}>Bilgi</a>
          <a href="#iletisim" className={navLinkClass("iletisim")}>İletişim</a>
        </nav>

        {/* Rezervasyon & Dil */}
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
          <LanguageSwitcher scrolled={scrolled} />
        </div>
      </div>

      {/* Mobile Menu */}
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
