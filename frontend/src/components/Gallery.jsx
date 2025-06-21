import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const categorizedImages = {
  garden: ['garden1.png', 'garden2.png', 'garden3.jpeg', 'garden4.jpeg', 'garden5.png', 'garden6.png', 'garden7.png', 'garden8.png'],
  livingRoom: ['living1.jpeg', 'living2.jpeg', 'living3.jpeg', 'living4.jpeg', 'living5.jpeg'],
  kidsRoom: ['kids1.jpeg', 'kids2.jpeg', 'kids3.jpeg', 'kids4.jpeg', 'kids5.jpeg'],
  parentBedroom: ['parent1.jpeg', 'parent2.jpeg', 'parent3.jpeg'],
  bathroom: ['bath1.jpeg', 'bath2.jpeg'],
};

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('garden');
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = categorizedImages[selectedCategory];
  const length = images.length;

  const prevSlide = () => setCurrentIndex((currentIndex - 1 + length) % length);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % length);

  const changeCategory = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  return (
    <section id="galeri" className="py-8 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {t('gallery.nav')}
        </h2>

        {/* Kategori Butonları */}
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          {Object.keys(categorizedImages).map((category) => (
            <button
              key={category}
              onClick={() => changeCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedCategory === category
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {t(`gallery.categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative mb-4">
          <div className="w-full h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg">
            <img
              src={`/images/gallery/${selectedCategory}/${images[currentIndex]}`}
              alt={t('gallery.section.alt', { number: currentIndex + 1 })}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
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

        {/* Thumbnail'ler */}
        <div className="mt-4 flex items-center justify-center flex-wrap gap-2">
          {images.map((src, idx) => (
            <div key={idx} className="w-24 h-16 overflow-hidden rounded-lg">
              <img
                src={`/images/gallery/${selectedCategory}/${src}`}
                alt={t('gallery.section.thumbnailAlt', { number: idx + 1 })}
                onClick={() => setCurrentIndex(idx)}
                className={`w-full h-full object-cover cursor-pointer transition-all duration-200 ${
                  idx === currentIndex
                    ? 'ring-4 ring-teal-500'
                    : 'opacity-70 hover:opacity-100'
                }`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
