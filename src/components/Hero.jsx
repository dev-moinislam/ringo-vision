import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShieldAlert } from 'lucide-react';
import CookingPot3D from './CookingPot3D';
import './Hero.css';

export default function Hero() {
  // Title letter container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  const handleScrollToMovement = () => {
    const section = document.getElementById('movement-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDonation = () => {
    const section = document.getElementById('donation-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero-section">
      {/* Background cinematic atmospheric video (cooking fire loop) */}
      <div className="hero-video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          src="https://assets.mixkit.co/videos/preview/mixkit-fire-burning-in-a-stove-in-slow-motion-42999-large.mp4"
          poster="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1920&auto=format&fit=crop"
        />
        <div className="hero-dark-overlay" />
        <div className="hero-color-gradient-mask" />
      </div>

      <div className="hero-grid-overlay" />

      {/* Floating particles */}
      <div className="hero-particles">
        <span className="particle p-1"></span>
        <span className="particle p-2"></span>
        <span className="particle p-3"></span>
        <span className="particle p-4"></span>
        <span className="particle p-5"></span>
      </div>

      <div className="hero-content-container">
        <motion.div
          className="hero-text-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge-wrapper" variants={itemVariants}>
            <span className="hero-badge-line green"></span>
            <span className="hero-badge">LONDON OUTREACH MOVEMENT</span>
            <span className="hero-badge-line red"></span>
          </motion.div>

          <motion.h1 className="cinematic-title hero-heading" variants={itemVariants}>
            FEEDING PEOPLE.<br />
            <span className="highlight-text">CHANGING LIVES.</span>
          </motion.h1>

          <motion.p className="cinematic-lead hero-subheading" variants={itemVariants}>
            Ringo Vision travels across the UK serving hot Jamaican street food, 
            helping the homeless, and documenting raw street reality with raw emotion and soul.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <button 
              onClick={handleScrollToMovement}
              className="btn-premium"
              id="hero-watch-btn"
            >
              <Play size={16} fill="black" />
              WATCH DOCUMENTARY
            </button>
            
            <button 
              onClick={handleScrollToDonation}
              className="btn-secondary accent-border-gold text-glow-gold"
              id="hero-support-btn"
            >
              <ShieldAlert size={16} />
              SUPPORT THE MISSION
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Renders the floating 3D cooking pot */}
      <CookingPot3D />

      {/* Hero bottom indicator */}
      <div className="hero-scroll-indicator" onClick={handleScrollToMovement}>
        <span>SCROLL DOWN</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
}
