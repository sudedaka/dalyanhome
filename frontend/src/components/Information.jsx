import React from 'react';
import { motion } from 'framer-motion';
import {
  BedDouble,
  BedSingle,
  UtensilsCrossed,
  Tv,
  Wifi,
  Archive,
  Thermometer,
  Waves,
  Armchair,
  Flame,
  Droplets,
  Umbrella,
  CheckCircle,
  XCircle,
} from 'lucide-react';


const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Information = () => (
  <section id="detaylar" className="py-16 bg-white">
    <div className="max-w-5xl mx-auto px-6 space-y-12">
      {/* Tanıtım Açıklama */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Konaklama Hakkında
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Dalyan ve Ortaca arasında, Okçular Köyü’ndeki 2+1 Amerikan mutfak
          konfigürasyonlu, ailelere özel korunaklı havuzlu müstakil evimiz;
          doğa içinde, şehirden uzak sakin bir tatil deneyimi sunar. Şıklığıyla
          göz kamaştıran villamız, ailelerin en çok tercih ettiği
          tesislerdendir.
        </p>
      </motion.div>

      {/* Ev Planı */}
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
            <h3 className="font-semibold">Ebeveyn Odası</h3>
            <p className="text-sm text-gray-600">
              Çift kişilik yatak, komodin, giysi dolabı, dağ manzarası.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <BedSingle className="w-8 h-8 text-teal-600" />
          <div>
            <h3 className="font-semibold">Çocuk Odası</h3>
            <p className="text-sm text-gray-600">
              İki adet tek kişilik yatak, klima, komodin, havuz manzaralı.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mutfak ve Oturma Alanı */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="flex items-start space-x-6"
      >
        <UtensilsCrossed className="w-8 h-8 text-teal-600" />
        <div>
          <h3 className="font-semibold">Amerikan Mutfak & Salon</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Buzdolabı, mikrodalga, ocak, kettle, tost makinesi</li>
            <li>Çamaşır & bulaşık makinesi</li>
            <li>Ütü ve ütü masası</li>
            <li>Oturma grubu, plazma TV, klima</li>
          </ul>
        </div>
      </motion.div>

      {/* Temel Olanaklar */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {[
          { icon: Wifi, label: 'Ücretsiz Wi-Fi' },
          { icon: Tv, label: 'Uydu & Plazma TV' },
          { icon: Archive, label: 'Buzdolabı' },
          { icon: Thermometer, label: 'Klima' },
          { icon: Droplets, label: 'Dış Mekan Duşu' },
          { icon: Flame, label: 'Barbekü' },
          { icon: Umbrella, label: 'Şezlong & Şemsiye (4 adet)' },
          { icon: Armchair, label: 'Bahçe Mobilyası & Salıncak' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <item.icon className="w-10 h-10 text-teal-600 mb-2" />
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Havuz Zamanı */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="flex items-center space-x-4"
      >
        <Waves className="w-10 h-10 text-blue-500" />
        <div>
          <h3 className="font-semibold">Havuz Özellikleri</h3>
          <p className="text-sm text-gray-600">
            155 cm derinlikte korunaklı havuz ve ayrı çocuk havuzu mevcuttur.
          </p>
        </div>
      </motion.div>

      {/* Banyolar */}
      <motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  variants={sectionVariants}
  className="grid grid-cols-1 md:grid-cols-2 gap-8"
>
  <div className="flex items-center space-x-4"> {/* items-start -> items-center */}
    <BedDouble className="w-8 h-8 text-teal-600" />
    <div>
      <h3 className="font-semibold">Ebeveyn Odası</h3>
      <p className="text-sm text-gray-600">
        Çift kişilik yatak, komodin, giysi dolabı, dağ manzarası.
      </p>
    </div>
  </div>
  <div className="flex items-center space-x-4"> {/* burada da aynı */}
    <BedSingle className="w-8 h-8 text-teal-600" />
    <div>
      <h3 className="font-semibold">Çocuk Odası</h3>
      <p className="text-sm text-gray-600">
        İki adet tek kişilik yatak, klima, komodin, havuz manzaralı.
      </p>
    </div>
  </div>
</motion.div>


      {/* Fiyata Dahil */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="space-y-3"
      >
        <h3 className="text-xl font-semibold">Fiyata Dahil Olanlar</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Profesyonel temizlik hizmeti</li>
        </ul>
      </motion.div>
    </div>
  </section>
);

export default Information;
