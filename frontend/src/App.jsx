import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Features from "./components/Features";
import Information from "./components/Information";
import Footer from "./components/Footer";

import BookingPage from "./components/BookingPage";
function App() {
  return (
    <div className="scroll-smooth">
      <Header />
      <Hero/>
      <Features/>
      <Gallery/>
      <Information/>
      <BookingPage/>
      <Footer/>
 
    </div>
  );
}
export default App;
