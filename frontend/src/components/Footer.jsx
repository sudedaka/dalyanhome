import React from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white text-gray-700 py-12">
    <div id = "iletisim" className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Hakkımızda */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Hakkımızda</h4>
        <p className="text-gray-500 leading-relaxed">
          DalyanHome, Okçular Köyü’nde ailelere ve arkadaş gruplarına özel,
          korunaklı havuzlu müstakil villamızda doğayla iç içe, huzurlu bir
          tatil deneyimi sunuyor.
        </p>
      </div>

      {/* Aktiviteler */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Aktiviteler</h4>
        <ul className="space-y-2 text-gray-500">
          <li>Su Dalışı</li>
          <li>Çamur Banyosu &amp; Sıcak Su Kaynakları</li>
          <li>Tekne Turları</li>
          <li>Likya Yolu’nda Trekking</li>
          <li>Ölüdeniz’de Yamaç Paraşütü</li>
        </ul>
      </div>

      {/* Hızlı Linkler */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
        <ul className="space-y-2">
          {['Anasayfa', 'Bilgi', 'Galeri', 'Rezervasyon', 'İletişim'].map((label) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase()}`}
                className="text-gray-500 hover:text-teal-400 transition"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* İletişim */}
      <div>
        <h4 className="text-lg font-semibold mb-4">İletişim</h4>
        <ul className="space-y-3 text-gray-500">
          <li className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            <span>Okçular Köyü, Dalyan / Muğla</span>
          </li>
          <li className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-teal-400" />
            <a href="tel:+905536084504" className="hover:text-teal-400 transition">
              +90 553 608 45 04
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-teal-400" />
            <a
              href="mailto:batuhan_daka@hotmail.com"
              className="hover:text-teal-400 transition"
            >
              batuhan_daka@hotmail.com
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <Instagram className="w-5 h-5 text-teal-400" />
            <a
              href="https://www.instagram.com/daly.anhome"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition"
            >
              @daly.anhome
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-200 mt-12 pt-6 text-center text-xs text-gray-400">
      © 2025 DalyanHome. Tüm hakları saklıdır.
    </div>
  </footer>
);

export default Footer;
