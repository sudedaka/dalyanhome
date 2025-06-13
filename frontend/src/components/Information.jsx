import React from 'react';
import { motion } from 'framer-motion';
import {
  BedDouble,
  BedSingle,
  UtensilsCrossed,
  Wifi,
  Film,
  Car,
  Thermometer,
  Droplets,
  Flame,
  Armchair,
  MapPin,
  Plane,
  Compass,
  Waves,
  Info,
  AlertTriangle,
  CheckCircle,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Information = () => {
  const { t } = useTranslation();

  const paragraphs   = t('info.paragraphs',          { returnObjects: true });
  const kitchenItems = t('info.kitchen.items',       { returnObjects: true });
  const amenities    = t('info.amenities',           { returnObjects: true });
  const distances    = t('info.location.distances',  { returnObjects: true });
  const activities   = t('info.activities.items',    { returnObjects: true }); 
  const notes        = t('info.notes.items',         { returnObjects: true });

  return (
    <section
      id="bilgi"
      className="py-16 bg-white font-serif text-lg leading-relaxed px-6 max-w-5xl mx-auto space-y-12"
    >
      {/* Tanıtım Açıklama */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="space-y-6"
      >
        <h2 className="text-center font-savate text-4xl md:text-5xl">
          {t('info.sectionTitle')}
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700">
            {p}
          </p>
        ))}
      </motion.div>

      {/* Odalar */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="flex items-start space-x-4">
          <BedDouble className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-sans text-2xl">
              {t('info.rooms.parent.title')}
            </h3>
            <p className="text-gray-600">
              {t('info.rooms.parent.desc')}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <BedSingle className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-sans text-2xl">
              {t('info.rooms.child.title')}
            </h3>
            <p className="text-gray-600">
              {t('info.rooms.child.desc')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mutfak */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="flex items-start space-x-6"
      >
        <UtensilsCrossed className="w-8 h-8 text-teal-600" />
        <div>
          <h3 className="font-sans text-2xl">
            {t('info.kitchen.title')}
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {kitchenItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Olanaklar */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {amenities.map((label, i) => {
          const Icon = [Wifi, Film, Car, Thermometer, MapPin, CheckCircle, Users, Droplets, Flame, Armchair][i];
          return (
            <div key={i} className="flex flex-col items-center text-center">
              <Icon className="w-10 h-10 text-teal-600 mb-2" />
              <span className="text-gray-700">{label}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Konum & Aktiviteler */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <h3 className="font-sans text-2xl mb-2">
            {t('info.location.title')}
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {Object.values(distances).map((d, i) => (
              <li key={i} className="flex items-center">
                {i === 4
                  ? <Plane className="w-5 h-5 text-teal-600 mr-2" />
                  : <MapPin className="w-5 h-5 text-teal-600 mr-2" />
                }
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-2xl mb-2">
            {t('info.activities.title')}
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {activities.map((act, i) => (
              <li key={i} className="flex items-center">
                <Compass className="w-5 h-5 text-teal-600 mr-2" />
                {act}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Havuz */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="flex items-center space-x-4"
      >
        <Waves className="w-10 h-10 text-blue-500" />
        <div>
          <h3 className="font-sans text-2xl">{t('info.pool.title')}</h3>
          <p className="text-gray-600">{t('info.pool.desc')}</p>
        </div>
      </motion.div>

      {/* Notlar */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="space-y-3"
      >
        <h3 className="font-sans text-2xl">{t('info.notes.title')}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {notes.map((note, i) => (
            <li key={i} className="flex items-center">
              {i < 1
                ? <Info className="w-5 h-5 text-teal-600 mr-2" />
                : <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              }
              {note}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Information;
