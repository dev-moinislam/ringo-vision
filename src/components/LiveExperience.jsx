import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, MapPin } from 'lucide-react';
import './LiveExperience.css';

const STREET_CARDS = [
  {
    id: 'story-1',
    author: '@ringovision',
    time: '2 hours ago',
    location: 'CROYDON HIGH ST',
    text: 'Just finished serving over 200 portions of hot jerk chicken and rice & peas. The rain is pouring in South London tonight, but the warmth from the community is unmatched. Shoutout to everyone who volunteered.',
    likes: '4.8K',
    comments: '342',
    tag: 'LIVE OUTREACH',
    tagColor: 'var(--accent-green)',
  },
  {
    id: 'story-2',
    author: '@ringovision',
    time: '1 day ago',
    location: 'BRIXTON ROAD',
    text: 'Met a gentleman named Arthur today who has been sleeping rough for 4 years. We did more than serve food—we secured him emergency shelter for the freezing nights ahead. This is why we do what we do. The mission continues.',
    likes: '12K',
    comments: '908',
    tag: 'STREET STORY',
    tagColor: 'var(--accent-gold)',
  },
  {
    id: 'story-3',
    author: '@ringovision',
    time: '3 days ago',
    location: 'CAMDEN TOWN',
    text: 'Special outreach session in North London. The street kitchens are expanding! We are looking for local kitchen partners who want to donate cooking space. Send us a DM if you want to support!',
    likes: '6.2K',
    comments: '411',
    tag: 'COMMUNITY CALL',
    tagColor: 'var(--accent-red)',
  },
];

export default function LiveExperience() {
  const canvasRef = useRef(null);

  // HTML5 Canvas animated falling rain simulator
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const rainCount = 120;
    const drops = [];

    for (let i = 0; i < rainCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 12 + 18,
        opacity: Math.random() * 0.18 + 0.05,
      });
    }

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw rainy lines
      ctx.strokeStyle = 'rgba(174, 194, 224, 0.4)';
      ctx.lineWidth = 1;

      for (let i = 0; i < rainCount; i++) {
        const drop = drops[i];
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 200, 230, ${drop.opacity})`;
        ctx.moveTo(drop.x, drop.y);
        // Slightly skewed rain lines representing London wind
        ctx.lineTo(drop.x - 2, drop.y + drop.length);
        ctx.stroke();

        // Advance drop
        drop.y += drop.speed;
        drop.x -= 2; // Wind drift

        // Reset drop at bottom or edges
        if (drop.y > height || drop.x < 0) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="live-experience-section" id="live-experience-section">
      {/* Dynamic Rain Overlay Canvas */}
      <canvas className="rain-canvas" ref={canvasRef} />

      {/* Flashing Street Siren Lights (Atmospheric London Night) */}
      <div className="siren-glow red-siren" />
      <div className="siren-glow blue-siren" />
      
      {/* Moving fog layer */}
      <div className="london-fog" />

      <div className="live-header">
        <span className="live-badge">LIVE STREET PULSE</span>
        <h2 className="section-title">THE UK STREETS</h2>
        <p className="cinematic-lead live-lead">
          Raw logs, real faces, and direct updates documented live from the pavement.
        </p>
      </div>

      {/* Grid of outreach cards */}
      <div className="live-feed-grid">
        {STREET_CARDS.map((card, idx) => {
          return (
            <motion.div 
              key={card.id}
              className="live-post-card card-glass"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="post-card-header">
                <div>
                  <span className="post-author">{card.author}</span>
                  <span className="post-time">• {card.time}</span>
                </div>
                
                <span className="post-pill" style={{ borderColor: card.tagColor, color: card.tagColor }}>
                  {card.tag}
                </span>
              </div>

              {/* Location Tag */}
              <div className="post-location">
                <MapPin size={12} className="location-pin" />
                <span>{card.location}</span>
              </div>

              {/* Content */}
              <p className="post-text">{card.text}</p>

              {/* Action Buttons */}
              <div className="post-card-actions">
                <button className="post-action-btn hover-red" aria-label="Like post">
                  <Heart size={14} className="action-icon" />
                  <span>{card.likes}</span>
                </button>
                
                <button className="post-action-btn hover-gold" aria-label="Comment on post">
                  <MessageSquare size={14} className="action-icon" />
                  <span>{card.comments}</span>
                </button>

                <button className="post-action-btn hover-green" aria-label="Share post">
                  <Share2 size={14} className="action-icon" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
