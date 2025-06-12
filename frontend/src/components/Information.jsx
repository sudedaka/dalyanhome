import React from 'react';
import { motion } from 'framer-motion';
import {
  BedDouble,
  BedSingle,
  UtensilsCrossed,
  Wifi,
  Archive,
  Thermometer,
  Droplets,
  Waves,
  Armchair,
  Flame,
  Umbrella,
  Car,
  MapPin,
  CheckCircle,
  Users,
  Film,
  AlertTriangle,
  Info,
  Plane,
  ShoppingCart,
  Compass,
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Information = () => (
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
        Konaklama Hakkında
      </h2>

    <p className="text-gray-700">
      Dalyan ve Ortaca arasında, Okçular Köyü’ndeki 2+1 Amerikan mutfak
      konfigürasyonlu, ailelere özel korunaklı havuzlu müstakil evimiz; doğa
      içinde, şehirden uzak sakin bir tatil deneyimi sunar.
    </p>

    <p className="text-gray-700">
      Eviniz gibi hissedeceğiniz bu konaklama, hem çocuklu aileler hem de
      arkadaş grupları için idealdir. Ebeveyn odası, çocuk odası ve tam
      donanımlı mutfak ile konforlu bir tatil imkanı sunar. Evin bahçesi ve
      havuzu dışarıdan hiçbir şekilde görünmemektedir, böylece tam gizlilik
      içinde tatilin tadını çıkarabilirsiniz.
    </p>

    <p className="text-gray-700">
      Tatilciler için tasarlanmıştır; özel alanınıza dışarıdan müdahale kesinlikle
      mümkün değildir. Balayı çiftleri, çekirdek aileler ve arkadaş grupları
      için uygundur.
    </p>

    <p className="text-gray-700">
      1 çift kişilik ve 2 tek kişilik yatak mevcuttur; salondaki koltuklar da
      konaklama için uygundur. İki tek kişilik yataklı oda ve Amerikan mutfaklı
      salon kısmı havuz manzaralı, 1 çift kişilik oda ise doğa manzaralıdır.
      1 adet banyo bulunmaktadır. Otopark sorunu yoktur.
    </p>

    <p className="text-gray-700">
      Tam donanımlı mutfak: tüm tatil boyunca ihtiyaç duyacağınız mutfak aparatları
      (çatal-bıçak, tencere, tabak vb.), buzdolabı, mikrodalga, ocak, kettle,
      tost makinesi, çamaşır ve bulaşık makinesi, ütü ve ütü masası mevcuttur.
    </p>

    <p className="text-gray-700">
      Villamız 8×4 m boyutlarında ve 1.55 m derinliğinde bir havuza sahiptir;
      ayrıca çocuk havuzu, açık alan duşu, barbekü alanı, 4 adet şezlong ve
      bahçe oturma grupları bulunmaktadır. Bahçede salıncak da yer almaktadır.
    </p>

    <p className="text-gray-700">
      Yeterli sayıda temiz el havlusu temin edilmektedir. Hijyeniniz için
      kendi sabun ve şampuanlarınızı getirmenizi öneriyoruz.
    </p>

    <p className="text-gray-700">
      Büyük marketlerin sanal uygulamaları üzerinden sipariş verebilirsiniz.
      Diğer ihtiyaçlarınızı Ortaca ilçe merkezinden karşılayabilirsiniz.
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
          <h3 className="font-sans text-2xl">Ebeveyn Odası</h3>
          <p className="text-gray-600">Çift kişilik yatak, klimalı ve doğa manzaralı konforlu oda.</p>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <BedSingle className="w-8 h-8 text-teal-600" />
        <div>
          <h3 className="font-sans text-2xl">Çocuk Odası</h3>
          <p className="text-gray-600">İki tek kişilik yatak, klimalı ve havuz manzaralı konforlu oda.</p>
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
        <h3 className="font-sans text-2xl">Tam Donanımlı Mutfak & Salon</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Tüm mutfak aparatları (çatal-bıçak, tabak, tencere, sunum tabak ve bardaklar vb.)</li>
        <li>Buzdolabı, fırın, ocak, kettle</li>
        <li>Çamaşır & bulaşık makinesi, ütü, ütü masası, süpürge</li>
        <li>Oturma grubu, plazma TV, klima, kitaplık</li>
        <li>Bar tabureleriyle çevrili ada mutfak</li>
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
        { icon: Film, label: 'Netflix Üyeliği' },
        { icon: Car,  label: 'Özel otopark' },
        { icon: Thermometer, label: 'Klima (Tüm Alanlar)' },
        { icon: MapPin, label: 'Dalyan Okçular Mevkii' },
        { icon: CheckCircle, label: 'Tam Gizlilik' },
        { icon: Users, label: 'Maksimum 6 Kişi' },
        { icon: Droplets, label: 'Açık hava duşu' },
        { icon: Flame, label: 'Barbekü & Şömine Alanı' },
        { icon: Armchair, label: 'Bahçe Oturma Grubu & Salıncak' },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center text-center">
          <item.icon className="w-10 h-10 text-teal-600 mb-2" />
          <span className="text-gray-700">{item.label}</span>
        </div>
      ))}
    </motion.div>

    {/* Konum & Mesafeler ve Muğla Aktiviteleri */}
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Konum & Mesafeler */}
      <div>
        <h3 className="font-sans text-2xl mb-2">Konum & Mesafeler</h3>

          <ul className="list-disc list-inside text-gray-600 space-y-1">
      <li className="flex items-center">
        <MapPin className="w-5 h-5 text-teal-600 mr-2" />
        Dalyan Merkez: 4 km
      </li>
      <li className="flex items-center">
        <MapPin className="w-5 h-5 text-teal-600 mr-2" />
        Ortaca Merkez: 8 km
      </li>
      <li className="flex items-center">
        <MapPin className="w-5 h-5 text-teal-600 mr-2" />
        Sarıgerme Plajı: 10 km
      </li>
      <li className="flex items-center">
        <MapPin className="w-5 h-5 text-teal-600 mr-2" />
        İztuzu (Kaplumbağa) Plajı: 15 km
      </li>
      <li className="flex items-center">
        <Plane className="w-5 h-5 text-teal-600 mr-2" />
        Dalaman Havalimanı: 15 km
      </li>
      <li className="flex items-center">
        <MapPin className="w-5 h-5 text-teal-600 mr-2" />
        Göcek: 20 km
      </li>
      <li className="flex items-center">
        <MapPin className="w-5 h-5 text-teal-600 mr-2" />
        Fethiye: 45 km
      </li>
      <li className="flex items-center">
        <MapPin className="w-5 h-5 text-teal-600 mr-2" />
        Akyaka: 55 km
      </li>

         </ul>
      </div>

      {/* Muğla Aktiviteleri */}
      <div>
        <h3 className="font-sans text-2xl mb-2">Muğla’da Yapabilecekleriniz</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {[
            'Su Dalışı',
            'Dalyan Çamur Banyosu ve Sıcak Su Kaynakları',
            'Kano Turu',
            'Antik Kentleri Gezmek',
            'Likya Yolu’nda Trekking',
            'Saklıkent Kanyonu Gezisi',
            'Butterfly Valley Tekne Turu',
            'Jeep Safari & Doğa Turları',
            'Ölüdeniz’de Yamaç Paraşütü',
          ].map((activity, i) => (
            <li key={i} className="flex items-center">
              <Compass className="w-5 h-5 text-teal-600 mr-2" />
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>

    {/* Havuz Özellikleri */}
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="flex items-center space-x-4"
    >
      <Waves className="w-10 h-10 text-blue-500" />
      <div>
        <h3 className="font-sans text-2xl">Havuz Özellikleri</h3>
        <p className="text-gray-600">
          8×4 m boyutlarında, 1.55 m derinliğinde ve çocuk havuzu dahil olmak
          üzere kapsamlı yüzme imkânı. Çevrede 4 adet şezlong ile beraber geniş şemsiyeleri bulunmaktadır.
        </p>
      </div>
    </motion.div>

    {/* Önemli Notlar */}
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="space-y-3"
    >
      <h3 className="font-sans text-2xl">Önemli Notlar</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
               <li className="flex items-center">
         <Info className="w-5 h-5 text-teal-600 mr-2" />
         Temizlik ücreti bulunmaktadır.
       </li>
       <li className="flex items-center">
         <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
         Evcil hayvan kabul edilmemektedir.
       </li>
       <li className="flex items-center">
         <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
        İç mekânda sigara içmek yasaktır.
      </li>
      </ul>
    </motion.div>
  </section>
);

export default Information;
