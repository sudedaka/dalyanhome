import React from "react";

const Hero = () => {
  return (
    <section
      id="anasayfa"
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/dalyan.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
          Doğanın Kalbinde Sakinlik
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-sans text-white/90">
          Şehirden uzak, sadece size ait bir mola.
        </p>
      </div>
    </section>
  );
};

export default Hero;
