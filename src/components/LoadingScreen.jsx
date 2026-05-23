import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Reveal text shortly after launch
    const textTimer = setTimeout(() => setShowText(true), 300);

    // Fast cinematic counting animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        }
        // Organic irregular jumps to feel interactive
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => {
      clearTimeout(textTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100, 
        filter: 'blur(30px)', 
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="loading-grid-overlay" />
      
      <div className="loading-content">
        <AnimatePresence>
          {showText && (
            <motion.div 
              className="brand-intro"
              initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="brand-badge">A CINEMATIC STORY</div>
              <h1 className="brand-logo-text">
                RINGO<span>VISION</span>
              </h1>
              
              <div className="jamaican-accent-line">
                <span className="accent-bar green" />
                <span className="accent-bar gold" />
                <span className="accent-bar red" />
              </div>
              
              <p className="brand-subtitle">FEEDING PEOPLE • CHANGING LIVES • DOCUMENTING REALITY</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="progress-container">
          <div className="progress-bar-wrapper">
            <motion.div 
              className="progress-bar-fill" 
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
          <div className="progress-number">
            {progress}<span>%</span>
          </div>
        </div>
      </div>
      
      <div className="loading-footer">
        <span>© 2026 RINGO VISION. ALL RIGHTS RESERVED.</span>
        <span>LONDON OUTREACH MOVEMENT</span>
      </div>
    </motion.div>
  );
}
