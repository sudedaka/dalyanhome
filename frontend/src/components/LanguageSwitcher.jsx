import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ scrolled }) => {
  const { i18n } = useTranslation();          
  const initial = (i18n.language || 'tr').toUpperCase();
  const [selected, setSelected] = useState(initial);
  const [open, setOpen] = useState(false);

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());       
    setSelected(lang);
    setOpen(false);
  };

  return (
    <div className="relative cursor-pointer select-none font-sans">
      <div
        onClick={() => setOpen(o => !o)}
        className={`flex items-center px-2 py-1 ${
          scrolled ? 'text-teal-600' : 'text-white'
        }`}
      >
        <span>{selected}</span>
        <span className="text-sm ml-1">▼</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 bg-white border border-gray-200 rounded z-50"
          >
            {['TR','EN'].map(lang => (
              <div
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`px-4 py-2 text-sm hover:bg-gray-100 ${
                  selected === lang ? 'font-semibold' : ''
                }`}
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
