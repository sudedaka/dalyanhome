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
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Information = () => {
  const { t } = useTranslation();

  const paragraphs = t('info.paragraphs', { returnObjects: true });
  const kitchenItems = t('info.kitchen.items', { returnObjects: true });
  const amenities = t('info.amenities', { returnObjects: true });
  const distances = t('info.location.distances', { returnObjects: true });
  const activities = t('info.activities.items', { returnObjects: true });
  const notes = t('info.notes.items', { returnObjects: true });

  return (
    <section
      id="bilgi"
      className="py-20 px-4 md:px-10 font-serif text-lg leading-relaxed"
    >
      <div className="relative max-w-5xl mx-auto bg-white/20 backdrop-blur-2xl border border-teal-500/40 shadow-2xl rounded-[2rem] p-10 space-y-16">
        <img
          src="/bird.jpeg"
          alt="Dal görseli"
          className="absolute top-[-60px] right-[-30px] w-[150px] md:w-[200px] lg:w-[250px] h-auto z-30"
        />

        <img
          src="/sakura.png"
          alt="Dal görseli"
          className="absolute top-[-140px] left-[-35px] w-[150px] md:w-[200px] lg:w-[250px] h-auto z-30"
        />

        {/* Tanıtım Açıklama */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="space-y-6"
        >
          <h2 className="text-center text-4xl md:text-5xl text-teal-800 tracking-wide font-medium relative">
            {t('info.sectionTitle')}
          </h2>
          {/* Alt çizgi */}
          <div className="w-32 mx-auto mt-3 mb-8 border-b-4 border-teal-800 rounded-lg"></div>

          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-slate-700 font-light text-[17px] leading-7 max-w-3xl mx-auto px-2 md:px-0"
            >
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
              <h3 className="text-2xl text-teal-700 font-medium">
                {t('info.rooms.parent.title')}
              </h3>
              <p className="text-slate-600 font-light">
                {t('info.rooms.parent.desc')}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <BedSingle className="w-8 h-8 text-teal-600" />
            <div>
              <h3 className="text-2xl text-teal-700 font-medium">
                {t('info.rooms.child.title')}
              </h3>
              <p className="text-slate-600 font-light">
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
            <h3 className="text-2xl text-teal-700 font-medium">
              {t('info.kitchen.title')}
            </h3>
            <ul className="list-disc list-inside text-slate-700 font-light space-y-1">
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
            const Icon = [
              Wifi,
              Film,
              Car,
              Thermometer,
              MapPin,
              CheckCircle,
              Users,
              Droplets,
              Flame,
              Armchair,
            ][i];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-2"
              >
                <Icon className="w-10 h-10 text-teal-600" />
                <span className="text-slate-700 font-light">{label}</span>
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
            <h3 className="text-2xl text-teal-700 font-medium mb-2">
              {t('info.location.title')}
            </h3>
            <ul className="list-disc list-inside text-slate-700 font-light space-y-1">
              {Object.values(distances).map((d, i) => (
                <li key={i} className="flex items-center">
                  {i === 4 ? (
                    <Plane className="w-5 h-5 text-teal-600 mr-2" />
                  ) : (
                    <MapPin className="w-5 h-5 text-teal-600 mr-2" />
                  )}
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl text-teal-700 font-medium mb-2">
              {t('info.activities.title')}
            </h3>
            <ul className="list-disc list-inside text-slate-700 font-light space-y-1">
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
          <Waves className="w-10 h-10 text-teal-500" />
          <div>
            <h3 className="text-2xl text-teal-700 font-medium">
              {t('info.pool.title')}
            </h3>
            <p className="text-slate-600 font-light">{t('info.pool.desc')}</p>
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
          <h3 className="text-2xl text-teal-700 font-medium">
            {t('info.notes.title')}
          </h3>
          <ul className="list-disc list-inside text-slate-700 font-light space-y-1">
            {notes.map((note, i) => (
              <li key={i} className="flex items-center">
                {i < 1 ? (
                  <Info className="w-5 h-5 text-teal-600 mr-2" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                )}
                {note}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Information;
