import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PresaleCheck from "./components/PresaleCheck";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <PresaleCheck />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;