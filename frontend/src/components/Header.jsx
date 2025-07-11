import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";


const Header = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["anasayfa", "galeri", "bilgi", "iletisim", "rezervasyon"];
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

  const navLinkClass = (id) => `
    relative text-base font-medium transition
    ${scrolled ? "text-gray-700" : "text-white"}
    hover:text-teal-400
    ${
      activeSection === id
        ? "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-1 after:bg-teal-600 after:rounded-full"
        : ""
    }
  `;

  const mobileNavItems = [
    { id: "anasayfa", labelKey: "home" },
    { id: "galeri", labelKey: "gallery.nav" },
    { id: "bilgi", labelKey: "information" },
    { id: "iletisim", labelKey: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Mobile Hamburger */}
      <button
      aria-label={open ? "Close menu" : "Open menu"}
      className={`md:hidden p-3 rounded ${scrolled ? "text-gray-700" : "text-white"}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>


        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
          <span
            className={`text-3xl font-bold tracking-wide font-savate ${
              scrolled ? "text-teal-700" : "text-white"
            }`}
          >
            Villa Han
          </span>
          <div
            className={`text-base font-oooh mt-0.5 ${
              scrolled ? "text-gray-500" : "text-white/80"
            }`}
          >
           Muğla ● Dalyan
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#anasayfa" className={navLinkClass("anasayfa")}>
            {t("home")}
          </a>
          <a href="#galeri" className={navLinkClass("galeri")}>
            {t("gallery.nav")}
          </a>
          <a href="#bilgi" className={navLinkClass("bilgi")}>
            {t("information")}
          </a>
          <a href="#iletisim" className={navLinkClass("iletisim")}>
            {t("contact")}
          </a>
        </nav>

        {/* Desktop Reservation + Language */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#rezervasyon"
            className={`px-5 py-3 rounded-full font-medium transition text-base ${
              scrolled
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-white text-teal-600 hover:bg-white/90"
            }`}
          >
            {t("reservation")}
          </a>
          <div className="hidden md:block">
          <button
            onClick={() => {
              const newLang = i18n.language === "tr" ? "en" : "tr";
              i18n.changeLanguage(newLang);
            }}
            className={`text-sm font-medium transition ${
              scrolled ? "text-teal-600 hover:text-teal-700" : "text-white hover:text-teal-200"
            }`}
          >
            {i18n.language === "tr" ? "EN" : "TR"}
          </button>
        </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white shadow-md"
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              {mobileNavItems.map(({ id, labelKey }) => (
                <button
                  key={id}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById(id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 250);
                  }}
                  className="text-lg font-medium text-gray-700 hover:text-teal-600 px-4 py-2 w-full text-center"
                >
                  {t(labelKey)}
                </button>
              ))}

              <button
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    const target = document.getElementById("rezervasyon");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition"
              >
                {t("reservation")}
              </button>

              {/* DİL DEĞİŞTİRME (MOBİL) */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    const newLang = i18n.language === "tr" ? "en" : "tr";
                    i18n.changeLanguage(newLang);
                  }}
                  className="text-sm text-gray-700 hover:text-teal-600 font-medium"
                >
                  {i18n.language === "tr" ? "EN" : "TR"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
