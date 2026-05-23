import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Eye, Video, Heart } from 'lucide-react';
import './Movement.css';

// Custom lightweight counter hook that counts when visible
function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: '-100px 0px' });

  // Extract number and suffix
  const match = value.match(/^([\d,]+)(.*)$/);
  const numberStr = match ? match[1].replace(/,/g, '') : '0';
  const suffix = match ? match[2] : '';
  const target = parseInt(numberStr, 10);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * target);
      
      setCount(currentVal);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, target, duration]);

  // Format with commas
  const formattedCount = count.toLocaleString();

  return (
    <span ref={elementRef} className="counter-val">
      {formattedCount}{suffix}
    </span>
  );
}

export default function Movement() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(5px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="movement-section" id="movement-section">
      <div className="movement-glow-1 ambient-glow" style={{ top: '20%', left: '10%', backgroundColor: 'var(--accent-green)' }} />
      <div className="movement-glow-2 ambient-glow" style={{ bottom: '15%', right: '5%', backgroundColor: 'var(--accent-red)' }} />

      <div className="movement-header">
        <div className="movement-pre">THE MOVEMENT</div>
        <h2 className="section-title text-glow-gold">RAW STREET SOUL</h2>
        <div className="movement-accent-stripe"></div>
      </div>

      <div className="movement-grid">
        {/* Left Column - Storytelling */}
        <motion.div 
          className="movement-story"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.p className="story-paragraph" variants={cardVariants}>
            “It’s not just about a meal. It’s about looking someone in the eye, hearing their story, 
            and letting them know they are seen. A hot bowl of soup can be the spark that restores a person's dignity.”
          </motion.p>
          
          <motion.div className="story-image-grid" variants={cardVariants}>
            <div className="story-img-card block-1">
              <div className="img-overlay">
                <span>CROYDON OUTREACH</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?q=80&w=600&auto=format&fit=crop" 
                alt="Homeless charity distribution in London" 
                loading="lazy"
              />
            </div>
            
            <div className="story-img-card block-2">
              <div className="img-overlay">
                <span>JAMAICAN STREET FOOD</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop" 
                alt="Hot street food cooking" 
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Mission Pillars & Stats */}
        <motion.div 
          className="movement-stats-pillars"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {/* Statistics Grid */}
          <div className="stats-grid">
            <motion.div className="stat-card card-glass" variants={cardVariants}>
              <Users className="stat-icon text-glow-gold" size={24} />
              <div className="stat-num"><AnimatedCounter value="43000+" /></div>
              <div className="stat-label">SUBSCRIBERS</div>
            </motion.div>

            <motion.div className="stat-card card-glass" variants={cardVariants}>
              <Eye className="stat-icon text-glow-red" size={24} />
              <div className="stat-num"><AnimatedCounter value="15000000+" /></div>
              <div className="stat-label">TOTAL VIEWS</div>
            </motion.div>

            <motion.div className="stat-card card-glass" variants={cardVariants}>
              <Video className="stat-icon text-glow-green" size={24} />
              <div className="stat-num"><AnimatedCounter value="2000+" /></div>
              <div className="stat-label">VIDEOS PUBLISHED</div>
            </motion.div>

            <motion.div className="stat-card card-glass" variants={cardVariants}>
              <Heart className="stat-icon text-glow-gold" size={24} />
              <div className="stat-num"><AnimatedCounter value="50000+" /></div>
              <div className="stat-label">THOUSANDS FED</div>
            </motion.div>
          </div>

          {/* Pillars List */}
          <div className="pillars-list">
            <motion.div className="pillar-item card-glass accent-border-green" variants={cardVariants}>
              <span className="pillar-tag green">01</span>
              <div>
                <h3>Feeding Communities</h3>
                <p>Distributing fresh, chef-cooked Caribbean meals straight to Londoners on the streets.</p>
              </div>
            </motion.div>

            <motion.div className="pillar-item card-glass accent-border-gold" variants={cardVariants}>
              <span className="pillar-tag gold">02</span>
              <div>
                <h3>Documenting Reality</h3>
                <p>Shining an unfiltered, cinematic light on homelessness, poverty, and human resilience.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
