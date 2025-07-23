import React from 'react';
import { motion } from 'framer-motion';
import {
  BedDouble, BedSingle, UtensilsCrossed, Wifi, Film, Car, Thermometer,
  Droplets, Flame, Armchair, MapPin, Plane, Compass, Waves,
  Info, AlertTriangle, CheckCircle, Users
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
  const poolFeatures = t('info.pool.features', { returnObjects: true });

  return (
    <section id="bilgi" className="py-20 px-4 md:px-10 font-serif text-lg leading-relaxed">
      <div className="relative max-w-5xl mx-auto bg-white/30 backdrop-blur-3xl ring-1 ring-white/40 shadow-[0_10px_60px_rgba(0,0,0,0.1)] rounded-[2rem] p-10 space-y-16">
        <img
          src="/bird.jpeg"
          alt="Kuş"
          className="absolute top-[-40px] right-[-20px] sm:top-[-50px] sm:right-[-25px] md:top-[-60px] md:right-[-30px] w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-auto z-30"
        />
        <img
          src="/sakura.png"
          alt="Dal"
          className="absolute top-[-100px] left-[-20px] sm:top-[-120px] sm:left-[-30px] md:top-[-140px] md:left-[-35px] w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-auto z-30"
        />

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants} className="space-y-6 text-center">
          <h2 className="text-4xl md:text-5xl text-[#695843] font-semibold tracking-wide">
            {t('info.sectionTitle')}
          </h2>
          <div className="w-24 mx-auto border-b-4 border-[#695843] rounded-lg"></div>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-slate-700 font-light text-[17px] leading-7 max-w-3xl mx-auto px-2 md:px-0">
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{
            icon: <BedDouble className="w-8 h-8 text-teal-600" />,
            title: t('info.rooms.parent.title'),
            desc: t('info.rooms.parent.desc')
          }, {
            icon: <BedSingle className="w-8 h-8 text-teal-600" />,
            title: t('info.rooms.child.title'),
            desc: t('info.rooms.child.desc')
          }].map(({ icon, title, desc }, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/80 rounded-full shadow">{icon}</div>
                <div>
                  <h3 className="text-xl text-teal-700 font-semibold">{title}</h3>
                  <p className="text-slate-600 text-sm font-light">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants} className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-white/80 rounded-full shadow">
              <UtensilsCrossed className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl text-teal-700 font-semibold mb-1">{t('info.kitchen.title')}</h3>
              <ul className="list-disc list-inside text-slate-700 text-sm font-light space-y-1">
                {kitchenItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {amenities.map((label, i) => {
          const Icon = [Wifi, Car, Thermometer, MapPin, CheckCircle, Users, Droplets, Flame, Armchair][i];
            return (
              <div key={i} className="flex flex-col items-center text-center space-y-2 group">
                <div className="p-3 bg-white/70 rounded-full shadow-md group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-teal-600" />
                </div>
                <span className="text-slate-700 font-light text-sm">{label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Konum ve Aktiviteler */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md">
         <h3 className="text-xl text-teal-700 font-semibold mb-4">
          {t('info.location.title')}
        </h3>

            <ul className="space-y-3">
              {Object.values(distances).map((d, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  {i === 4 ? <Plane className="w-5 h-5 text-teal-600" /> : <MapPin className="w-5 h-5 text-teal-600" />} {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md">
       <h3 className="text-xl text-teal-700 font-semibold mb-4">
        {t('info.activities.title')}
      </h3>
            <ul className="space-y-3">
              {activities.map((act, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <Compass className="w-5 h-5 text-teal-600" /> {act}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

       <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md"
      >
        <h3 className="text-xl text-teal-700 font-semibold mb-4 flex items-center gap-2">
          <Waves className="w-6 h-6 text-teal-500" />
          {t('info.pool.title')}
        </h3>
        <ul className="space-y-2 pl-2 text-slate-700 text-sm font-light">
          {poolFeatures.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-500" />
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>

     <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md space-y-3"
    >
      <h3 className="text-xl text-teal-700 font-semibold">{t('info.notes.title')}</h3>
      <ul className="space-y-2 text-slate-700 text-sm font-light">
        {notes.map((note, i) => (
          <li key={i} className="flex items-center">
            {i < 1 ? <Info className="w-5 h-5 text-teal-600 mr-2" /> : <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />}
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
