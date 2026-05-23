import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, MessageCircle, Heart } from 'lucide-react';
import './SocialGrid.css';

// Premium inline SVG icons for compilation stability
const Instagram = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

const GRID_ITEMS = [
  {
    id: 'social-1',
    type: 'video',
    size: 'tall',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-frying-diced-vegetables-in-a-pan-43005-large.mp4',
    likes: '1.2K',
    comments: '88',
    channel: 'Instagram',
  },
  {
    id: 'social-2',
    type: 'image',
    size: 'wide',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    likes: '2.5K',
    comments: '184',
    channel: 'YouTube Shorts',
  },
  {
    id: 'social-3',
    type: 'image',
    size: 'square',
    thumbnail: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=600&auto=format&fit=crop',
    likes: '940',
    comments: '42',
    channel: 'Community Post',
  },
  {
    id: 'social-4',
    type: 'video',
    size: 'square',
    thumbnail: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barbecue-food-cooking-close-up-42023-large.mp4',
    likes: '1.8K',
    comments: '110',
    channel: 'Instagram Reels',
  },
  {
    id: 'social-5',
    type: 'image',
    size: 'square',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
    likes: '3.1K',
    comments: '298',
    channel: 'Instagram',
  },
];

export default function SocialGrid() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="social-grid-section" id="social-grid-section">
      <div className="social-glow ambient-glow" style={{ bottom: '10%', left: '5%', backgroundColor: 'var(--accent-green)' }} />
      
      <div className="social-header">
        <span className="social-pre">JOIN OUR COMMUNITY</span>
        <h2 className="section-title">THE DIGITAL FEED</h2>
      </div>

      <div className="social-masonry-grid">
        {GRID_ITEMS.map((item) => {
          const isHovered = hoveredId === item.id;
          
          return (
            <motion.div
              key={item.id}
              className={`social-cell ${item.size}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="social-cell-inner card-glass">
                {/* Media representation */}
                <div className="cell-media-wrapper">
                  <img
                    src={item.thumbnail}
                    alt="Social feed outreach moment"
                    className={`cell-image ${isHovered ? 'cell-image-blur' : ''}`}
                    loading="lazy"
                  />
                  
                  {/* Playing dynamic loops for video cells */}
                  {item.type === 'video' && isHovered && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="cell-video-loop"
                      src={item.videoUrl}
                    />
                  )}

                  {/* Dark overlay showing channel icon */}
                  <div className="cell-social-overlay">
                    <span className="cell-channel-tag">
                      {item.channel.includes('Instagram') ? (
                        <Instagram size={14} className="cell-icon text-glow-red" />
                      ) : (
                        <Youtube size={14} className="cell-icon text-glow-gold" />
                      )}
                      {item.channel}
                    </span>

                    <div className="cell-social-stats">
                      <span className="stat-item"><Heart size={14} fill="white" /> {item.likes}</span>
                      <span className="stat-item"><MessageCircle size={14} fill="white" /> {item.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
