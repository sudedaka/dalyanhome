import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const categorizedMedia = {
  garden: [
    { type: 'video', src: 'video.mp4' },
    { type: 'image', src: 'garden1.png' },
    { type: 'image', src: 'garden2.png' },
    { type: 'image', src: 'garden3.jpeg' },
    { type: 'image', src: 'garden4.jpeg' },
    { type: 'image', src: 'garden5.png' },
    { type: 'image', src: 'garden6.png' },
    { type: 'image', src: 'garden7.png' },
    { type: 'image', src: 'garden8.png' },
  ],
  livingRoom: [
    { type: 'image', src: 'living1.jpeg' },
    { type: 'image', src: 'living2.jpeg' },
    { type: 'image', src: 'living3.jpeg' },
    { type: 'image', src: 'living4.jpeg' },
    { type: 'image', src: 'living5.jpeg' },
  ],
  kidsRoom: [
    { type: 'image', src: 'kids1.jpeg' },
    { type: 'image', src: 'kids2.jpeg' },
    { type: 'image', src: 'kids3.jpeg' },
    { type: 'image', src: 'kids4.jpeg' },
    { type: 'image', src: 'kids5.jpeg' },
  ],
  parentBedroom: [
    { type: 'image', src: 'parent1.jpeg' },
    { type: 'image', src: 'parent2.jpeg' },
    { type: 'image', src: 'parent3.jpeg' },
  ],
  bathroom: [
    { type: 'image', src: 'bath1.jpeg' },
    { type: 'image', src: 'bath2.jpeg' },
  ],
};

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('garden');
  const [currentIndex, setCurrentIndex] = useState(0);

  const media = categorizedMedia[selectedCategory];
  const length = media.length;
  const currentMedia = media[currentIndex];

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
          {Object.keys(categorizedMedia).map((category) => (
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
            {currentMedia.type === 'video' ? (
              <video
                src="/images/gallery/garden/gallery0.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={`/images/gallery/${selectedCategory}/${currentMedia.src}`}
                alt={t('gallery.section.alt', { number: currentIndex + 1 })}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
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
          {media.map((item, idx) => (
            <div key={idx} className="w-24 h-16 overflow-hidden rounded-lg">
              {item.type === 'video' ? (
                <video
                  src={`/images/gallery/${selectedCategory}/${item.src}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-full h-full object-cover cursor-pointer transition-all duration-200 ${
                    idx === currentIndex
                      ? 'ring-4 ring-teal-500'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  muted
                />
              ) : (
                <img
                  src={`/images/gallery/${selectedCategory}/${item.src}`}
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
