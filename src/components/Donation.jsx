import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Gift, Shirt, ArrowUpRight } from 'lucide-react';
import './Donation.css';

export default function Donation() {
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Dynamic Spotlight Coordinates Tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSpotlightPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      className="donation-section" 
      id="donation-section" 
      ref={containerRef}
      style={{
        // Set CSS variables for spotlight center
        '--mouse-x': `${spotlightPos.x}px`,
        '--mouse-y': `${spotlightPos.y}px`,
      }}
    >
      {/* Spotlight overlay mask */}
      <div className="spotlight-overlay" />
      <div className="donation-grid-lines" />

      <div className="donation-content-wrapper">
        <span className="donation-pre">THE MISSION NEEDS YOU</span>
        
        {/* Emotional Centered Quote */}
        <motion.div 
          className="donation-quote-container"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2 }}
        >
          <span className="quote-mark open">“</span>
          <h2 className="donation-quote">
            ONE MEAL CAN CHANGE SOMEONE’S ENTIRE DAY.
          </h2>
          <span className="quote-mark close">”</span>
          <div className="quote-author">— RINGO VISION</div>
        </motion.div>

        {/* CTA cards */}
        <div className="donation-cta-grid">
          {/* Card 1 */}
          <motion.div 
            className="donation-card card-glass accent-border-gold"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="donation-card-icon-wrapper gold">
              <HeartHandshake size={24} className="card-icon" />
            </div>
            
            <h3>GoFundMe Campaign</h3>
            <p>Every single pound goes directly to food supplies, packaging, mobile cooking equipment, and emergency blankets.</p>
            
            <a 
              href="https://gofundme.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="donation-btn gold-theme"
            >
              DONATE TO FUND <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="donation-card card-glass accent-border-green"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="donation-card-icon-wrapper green">
              <Gift size={24} className="card-icon" />
            </div>
            
            <h3>Volunteer Outreach</h3>
            <p>Join us on the ground. We need street coordinators, food servers, kitchen assistants, and drivers across the UK.</p>
            
            <a 
              href="#contact" 
              className="donation-btn green-theme"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('footer-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              JOIN VOLUNTEERS <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="donation-card card-glass accent-border-red"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="donation-card-icon-wrapper red">
              <Shirt size={24} className="card-icon" />
            </div>
            
            <h3>Official Creator Merch</h3>
            <p>100% of merchandise profits feed directly back into our street feeding logistics. Wear the message proudly.</p>
            
            <a 
              href="https://shop.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="donation-btn red-theme"
            >
              SHOP EXCLUSIVE MERCH <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
