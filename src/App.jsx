import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import SoundWave from './components/SoundWave';
import Hero from './components/Hero';
import Movement from './components/Movement';
import VideoShowcase from './components/VideoShowcase';
import LiveExperience from './components/LiveExperience';
import Donation from './components/Donation';
import SocialGrid from './components/SocialGrid';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Gritty Film Grain Overlay */}
      <div className="film-grain" />

      {/* Lagging magnetic custom cursor */}
      <CustomCursor />

      {/* Web Audio API atmospheric procedural street audio */}
      <SoundWave />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            className="main-wrapper"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
          >
            {/* Sections assembly */}
            <Hero />
            <Movement />
            <VideoShowcase />
            <LiveExperience />
            <Donation />
            <SocialGrid />
            <CTA />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
