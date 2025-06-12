import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSwitcher = ({ scrolled }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("TR");

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
  };

  const textColor = scrolled ? "text-teal-600" : "text-white";

  return (
    <div className="relative text-base font-medium cursor-pointer select-none font-sans">
      {/* Seçili Dil */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center space-x-1 px-2 py-1 ${textColor}`}
      >
        <span>{selected}</span>
        <span className="text-sm">▼</span>
      </div>

      {/* Dropdown (framer-motion) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 bg-transparent border border-white/20 rounded z-50"
          >
            {["TR", "EN"].map((lang) => (
           <div
          key={lang}
          onClick={() => handleSelect(lang)}
          className={`px-4 py-2 text-sm border ${
            scrolled
              ? "text-teal-600 border-teal-600/20"
              : "text-white border-white/20"
          } hover:text-black hover:bg-white/10 transition`}
        >
          {lang}
        </div>

            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
