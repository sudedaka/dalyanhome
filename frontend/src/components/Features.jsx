import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Droplet,
  Sunrise,
  BookOpen,
  Flame,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const iconMap = [MapPin, Star, Droplet, Sunrise, BookOpen, Flame];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const iconVariants = {
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

const Features = () => {
  const { t } = useTranslation();
  const sectionTitle = t("features.sectionTitle");
  const items = t("features.items", { returnObjects: true });

  const customColors = [
    "#2d241d", // doğada yürüyüş
    "#fcd34d", // yıldız
    "#67e8f9", // havuz keyfi
    "#22c55e", // yoga meditasyon
    "#a5b4fc", // kitap okuma
    "#b91c1c", // şömine
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-gray-800 tracking-wide">
          {sectionTitle}
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {items.map(({ title, description }, idx) => {
            const Icon = iconMap[idx];
            const color = customColors[idx];
            return (
              <motion.div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center text-center cursor-pointer
                  hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
                variants={cardVariants}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="mb-6"
                  style={{ color }}
                  variants={iconVariants}
                  animate="bounce"
                >
                  <Icon className="w-16 h-16" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3 font-serif text-gray-900">
                  {title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-[280px]">
                  {description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
