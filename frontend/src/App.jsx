import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Features from "./components/Features";
import Information from "./components/Information";
function App() {
  return (
    <div className="scroll-smooth">
      <Header />
      <Hero/>
      <Features/>
      <Gallery/>
      <Information/>
    </div>
  );
}
export default App;
