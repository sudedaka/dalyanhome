import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Droplet, Sunrise, BookOpen, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const iconMap = [MapPin, Star, Droplet, Sunrise, BookOpen, Flame];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.3, duration: 0.8 },
  },
};

const Features = () => {
  const { t } = useTranslation();
  const sectionTitle = t('features.sectionTitle');
  const items = t('features.items', { returnObjects: true });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {sectionTitle}
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {items.map(({ title, description, color }, idx) => {
            const Icon = iconMap[idx];
            return (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 h-56 flex flex-col items-center text-center shadow-lg cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`${color} w-12 h-12 mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
