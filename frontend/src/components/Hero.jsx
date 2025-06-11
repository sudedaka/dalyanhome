import React from "react";

const Hero = () => {
  return (
    <section
      id="anasayfa"
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/dalyan.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Metin */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hayalinizdeki Tatil Burada Başlıyor
        </h1>
        <p className="text-lg md:text-2xl">
          Dalyan’ın kalbinde lüks ve huzurlu bir deneyim sizi bekliyor.
        </p>
      </div>
    </section>
  );
};

export default Hero;
