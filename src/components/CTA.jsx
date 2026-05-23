import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import './CTA.css';

export default function CTA() {
  const handleScrollToDonation = () => {
    const section = document.getElementById('donation-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-section" id="cta-section">
      {/* Background slow-motion fire loops */}
      <div className="cta-media-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="cta-video"
          src="https://assets.mixkit.co/videos/preview/mixkit-fire-burning-in-a-stove-in-slow-motion-42999-large.mp4"
          poster="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop"
        />
        <div className="cta-dark-overlay" />
      </div>

      <div className="cta-content-container">
        <motion.div 
          className="cta-card card-glass"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-spark-wrapper">
            <span className="cta-spark gold" />
            <Flame className="cta-icon text-glow-gold" size={32} />
            <span className="cta-spark red" />
          </div>

          <h2 className="cinematic-title cta-heading">
            THE MISSION<br />
            <span className="highlight-text">CONTINUES.</span>
          </h2>
          
          <p className="cinematic-lead cta-subheading">
            Whether you donate, volunteer on the streets, or simply share the stories—you are a vital part of Ringo Vision. Let’s bring hope and hot food to every corner of the UK.
          </p>

          <button 
            onClick={handleScrollToDonation}
            className="btn-premium cta-btn"
            id="cta-join-btn"
          >
            JOIN THE MOVEMENT
          </button>
        </motion.div>
      </div>
    </section>
  );
}
