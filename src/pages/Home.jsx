import React from 'react'
import Hero from "../Components/home/Hero";
import CrisisCarousel from "../Components/home/CrisisCarousel";
import HowItWorks from "../Components/home/HowItWorks";
import ImpactMetrics from "../Components/home/ImpactMetrics";
import Features from "../Components/home/Features";
import Testimonials from "../Components/home/Testimonials";
import CallToAction from "../Components/home/CallToAction";
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