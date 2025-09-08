import React from 'react'
import Hero from "../Components/Hero";
import CrisisCarousel from "../Components/CrisisCarousel";
import HowItWorks from "../Components/HowItWorks";
import ImpactMetrics from "../Components/ImpactMetrics";
import Features from "../Components/Features";
import Testimonials from "../Components/Testimonials";
import CallToAction from "../Components/CallToAction";
const Home = () => {
  return (
    <div>
             <main className="mt-16">
        <Hero />
        <CrisisCarousel />
        <HowItWorks />
        <ImpactMetrics />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
    </div>
  )
}

export default Home