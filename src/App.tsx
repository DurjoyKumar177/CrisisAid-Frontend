import './App.css'
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import CrisisCarousel from "./Components/CrisisCarousel";
import HowItWorks from "./Components/HowItWorks";
import ImpactMetrics from "./Components/ImpactMetrics";
import Features from "./Components/Features";
import Testimonials from "./Components/Testimonials";
import CallToAction from "./Components/CallToAction";
import Footer from "./Components/Footer";
import "./index.css";

function App() {

  return (
    <>
       <Navbar />
      <main className="mt-16">
        <Hero />
        <CrisisCarousel />
        <HowItWorks />
        <ImpactMetrics />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      
    </>
  )
}

export default App
