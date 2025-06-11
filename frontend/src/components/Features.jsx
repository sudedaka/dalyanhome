import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Droplet, Sunrise, BookOpen, Flame } from 'lucide-react';

// Özellik listesi, ikon ve renk bilgisi
const features = [
  {
    icon: MapPin,
    title: 'Doğada yürüyüş',
    description: 'Yeşil patikalarda doğa yürüyüşü yapın.',
    color: 'text-teal-600',
  },
  {
    icon: Star,
    title: 'Gece yıldız izleme',
    description: 'Gökyüzünün berraklığıyla yıldızların tadını çıkarın.',
    color: 'text-black',
  },
  {
    icon: Droplet,
    title: 'Havuz Keyfi',
    description: 'Sıcak günlerde serin havuzumuzda yüzme keyfi yaşayın.',
    color: 'text-blue-500',
  },
  {
    icon: Sunrise,
    title: 'Yoga & Meditasyon',
    description: 'Gün doğumunda veya gün batımında zihin ve bedeninizi dinlendirin.',
    color: 'text-yellow-400',
  },
  {
    icon: BookOpen,
    title: 'Kuş sesleri eşliğinde kitap okuma',
    description: 'Doğanın melodisi eşliğinde sayfalar arasında kaybolun.',
    color: 'text-green-600',
  },
  {
    icon: Flame,
    title: 'Dışarıda Şömine Akşamı',
    description: 'Ateşin başında sıcak sohbetlerle unutulmaz anlar.',
    color: 'text-red-500',
  },
];

// Container animasyon varyantları
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } }
};

// Kart animasyon varyantları
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.3, duration: 0.8 }
  }
};

const Features = () => (
  <section id="bilgi" className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Öne Çıkan Aktiviteler
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map(({ icon: Icon, title, description, color }, idx) => (
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
        ))}
      </motion.div>
    </div>
  </section>
);

export default Features;
