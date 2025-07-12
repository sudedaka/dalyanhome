import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Features from "./components/Features";
import Information from "./components/Information";
import Footer from "./components/Footer";

import BookingPage from "./components/BookingPage";
function App() {
  return (
    <div className="overflow-x-hidden scroll-smooth">
      <Header />
      <Hero /> 
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <Features />
        <Gallery />
        <Information />
        <BookingPage />
        <Footer />
      </div>
    </div>
  );
}
export default App;
