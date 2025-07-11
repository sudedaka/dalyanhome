import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);

  // Scroll progress (0 = en üstte, 1 = tamamen scroll bitmiş)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Başlık için scale, y offset, opacity
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Alt yazı için sadece opacity
  const subtitleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Scroll to explore click handler
  const scrollToGallery = () => {
    const el = document.getElementById("galeri");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="anasayfa"
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6"
      style={{ backgroundImage: "url('/images/dalyan.jpg')" }}
    >
      {/* Siyah transparan overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* İçerik */}
      <div className="relative z-10 max-w-3xl text-center text-white">
        <motion.h1
          style={{ scale, y, opacity }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          style={{ opacity: subtitleOpacity }}
          className="text-base sm:text-lg md:text-xl font-sans text-white/90 mb-8"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Rezervasyon Butonu - mobil ve desktop için görünür */}
        <a
          href="#rezervasyon"
          className="inline-block rounded-full bg-white/30 backdrop-blur-md px-6 py-2 sm:px-10 sm:py-3 text-white/90 font-semibold shadow-lg hover:bg-white/50 transition duration-300 text-base sm:text-lg"
          aria-label="Rezervasyon"
        >
          Rezervasyon
        </a>
      </div>

      {/* Scroll to Explore */}
      <button
        onClick={scrollToGallery}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white cursor-pointer select-none"
        aria-label="Scroll to explore"
      >
        <span className="mb-2 text-sm font-medium tracking-wide">Scroll to Explore</span>
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </section>
  );
};

export default Hero;
