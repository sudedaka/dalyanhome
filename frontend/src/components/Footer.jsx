import React from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { id: 'anasayfa', labelKey: 'home' },
    { id: 'bilgi',       labelKey: 'information' },
    { id: 'galeri',      labelKey: 'gallery.nav' },
    { id: 'rezervasyon', labelKey: 'reservation' },
    { id: 'iletisim',    labelKey: 'contact' },
  ];

  const activities = t('footer.activities', { returnObjects: true });
  const contact    = t('footer.contact',    { returnObjects: true });

  return (
    <footer className="bg-white text-gray-700 py-12">
      <div id="iletisim" className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Hakkımızda */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t('footer.aboutTitle')}</h4>
          <p className="text-gray-500 leading-relaxed">{t('footer.about')}</p>
        </div>

        {/* Aktiviteler */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t('footer.activitiesTitle')}</h4>
          <ul className="space-y-2 text-gray-500">
            {activities.map((act, i) => <li key={i}>{act}</li>)}
          </ul>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t('footer.linksTitle')}</h4>
          <ul className="space-y-2">
            {quickLinks.map(({ id, labelKey }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-gray-500 hover:text-teal-400 transition"
                >
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t('footer.contactTitle')}</h4>
          <ul className="space-y-3 text-gray-500">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-teal-400" />
              <span>{contact.address}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-teal-400" />
              <a href={`tel:${contact.phone}`} className="hover:text-teal-400 transition">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-teal-400" />
              <a href={`mailto:${contact.email}`} className="hover:text-teal-400 transition">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Instagram className="w-5 h-5 text-teal-400" />
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition"
              >
                {contact.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-12 pt-6 text-center text-xs text-gray-400">
        {t('footer.copy')}
      </div>
    </footer>
  );
};

export default Footer;
