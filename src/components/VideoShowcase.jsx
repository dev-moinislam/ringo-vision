import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Flame, Film, ShieldAlert, Coffee } from 'lucide-react';
import './VideoShowcase.css';

const VIDEOS = [
  {
    id: 'vid-1',
    title: 'Feeding The Homeless',
    category: 'OUTREACH',
    views: '2.4M Views',
    duration: '18:42',
    icon: Flame,
    color: 'var(--accent-red)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barbecue-food-cooking-close-up-42023-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    desc: 'Serving over 500 hot meals in central London and listening to stories of survival.',
  },
  {
    id: 'vid-2',
    title: 'Croydon Documentary',
    category: 'MINI-DOC',
    views: '1.8M Views',
    duration: '24:15',
    icon: Film,
    color: 'var(--accent-gold)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-rainy-night-in-the-city-43956-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
    desc: 'An unfiltered look into the night streets, community centers, and struggles in South London.',
  },
  {
    id: 'vid-3',
    title: 'Dangerous Street Encounters',
    category: 'REALITY',
    views: '3.1M Views',
    duration: '15:10',
    icon: ShieldAlert,
    color: 'var(--accent-red)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-alone-on-a-street-at-night-42008-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    desc: 'Navigating late-night conflicts, understanding gang dynamics, and diffusing tension with respect.',
  },
  {
    id: 'vid-4',
    title: 'Community Kitchen',
    category: 'CULTURE',
    views: '920K Views',
    duration: '12:35',
    icon: Coffee,
    color: 'var(--accent-green)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-frying-diced-vegetables-in-a-pan-43005-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    desc: 'Celebrating Jamaican soul heritage, seasoning traditional jerk chicken, and uniting the neighborhood.',
  },
];

export default function VideoShowcase() {
  const [activeHover, setActiveHover] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="video-showcase-section" id="video-showcase-section">
      <div className="showcase-glow ambient-glow" style={{ top: '30%', right: '10%', backgroundColor: 'var(--accent-gold)' }} />
      
      <div className="showcase-header">
        <div>
          <span className="showcase-pre">CINEMATIC OUTLET</span>
          <h2 className="section-title">FEATURED RELEASES</h2>
        </div>
        
        {/* Customized scroll arrows */}
        <div className="showcase-nav">
          <button 
            className="nav-arrow-btn" 
            onClick={handleScrollLeft} 
            aria-label="Scroll left"
          >
            ←
          </button>
          <button 
            className="nav-arrow-btn" 
            onClick={handleScrollRight} 
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Scroll viewport */}
      <div className="scroll-viewport" ref={scrollContainerRef}>
        <div className="cards-slider">
          {VIDEOS.map((vid) => {
            const IconComponent = vid.icon;
            const isHovered = activeHover === vid.id;

            return (
              <div
                key={vid.id}
                className={`video-card card-glass ${isHovered ? 'active-hover' : ''}`}
                style={{ '--accent-glow': vid.color }}
                onMouseEnter={() => setActiveHover(vid.id)}
                onMouseLeave={() => setActiveHover(null)}
              >
                {/* Media Container (Image fallback or Video loop) */}
                <div className="video-thumbnail-container">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className={`video-thumbnail-img ${isHovered ? 'fade-out' : ''}`}
                    loading="lazy"
                  />
                  
                  {isHovered && (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="card-video-loop"
                      src={vid.videoUrl}
                    />
                  )}

                  {/* Top badges */}
                  <span className="duration-tag">{vid.duration}</span>
                  <span className="category-tag" style={{ borderLeftColor: vid.color }}>
                    <IconComponent size={10} className="tag-icon" style={{ color: vid.color }} />
                    {vid.category}
                  </span>

                  {/* Standard overlay and hover play button */}
                  <div className="card-media-overlay" />
                  
                  <div className="play-button-halo">
                    <Play size={22} fill="white" className="play-symbol" />
                  </div>
                </div>

                {/* Info block */}
                <div className="video-info-block">
                  <span className="video-views">{vid.views}</span>
                  <h3 className="video-card-title">{vid.title}</h3>
                  
                  <div className="video-hover-details">
                    <p className="video-desc">{vid.desc}</p>
                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="watch-link"
                      style={{ color: vid.color }}
                    >
                      WATCH FULL YOUTUBE VIDEO →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
