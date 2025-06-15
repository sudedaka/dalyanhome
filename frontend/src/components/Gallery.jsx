import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const images = [
  'gallery1.png',
  'gallery2.png',
  'gallery3.jpeg',
  'gallery4.jpeg',
  'gallery5.png',
  "gallery6.jpeg",
  "gallery7.jpeg",
];

const Gallery = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const prevSlide = () => setCurrent((current - 1 + length) % length);
  const nextSlide = () => setCurrent((current + 1) % length);

  return (
    <section id="galeri" className="py-2 bg-white">
      <div className="max-w-5xl mx-auto px-6">
       
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {t('gallery.nav')}
        </h2>


        <h3 className="sr-only">{t('gallery.section.title')}</h3>

        <div className="relative">
          <div className="w-full h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
            <img
              src={`/images/gallery/${images[current]}`}
              alt={t('gallery.section.alt', { number: current + 1 })}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full p-2"
            aria-label={t('gallery.section.prev')}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full p-2"
            aria-label={t('gallery.section.next')}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center space-x-2 overflow-x-auto">
          {images.map((src, idx) => (
            <div key={idx} className="w-24 h-16 overflow-hidden rounded-lg">
              <img
                src={`/images/gallery/${src}`}
                alt={t('gallery.section.thumbnailAlt', { number: idx + 1 })}
                loading="lazy"
                decoding="async"
                onClick={() => setCurrent(idx)}
                className={`w-full h-full object-cover cursor-pointer transition-all duration-200 ${
                  idx === current
                    ? 'ring-4 ring-teal-500'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
