import Appointment from "./components/Appointment";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Prices from "./components/Prices";


const App = () => {
  return <div className="w-full px-auto bg-orange-quaternary relative">
    <Header />
    <Hero />
    <Prices />
    <Appointment />
    <Contact />
    <Footer />    
  </div>;
};

export default App;
