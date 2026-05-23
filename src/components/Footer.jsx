import { Heart, Mail, MessageCircle, HeartHandshake } from 'lucide-react';
import './Footer.css';

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

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" id="footer-section">
      {/* Accent border with Jamaican Flag gradient */}
      <div className="footer-accent-border" />

      <div className="footer-grid">
        {/* Brand Cell */}
        <div className="footer-brand-cell">
          <div className="footer-logo" onClick={handleScrollToTop}>
            RINGO<span>VISION</span>
          </div>
          <p className="footer-pitch">
            Documenting UK street reality, spreading hope, and serving communities one hot meal at a time.
          </p>
          <div className="footer-social-row">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube channel">
              <Youtube size={18} className="social-icon hover-gold" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile">
              <Instagram size={18} className="social-icon hover-red" />
            </a>
            <a href="https://gofundme.com" target="_blank" rel="noopener noreferrer" aria-label="GoFundMe project">
              <HeartHandshake size={18} className="social-icon hover-green" />
            </a>
          </div>
        </div>

        {/* Quick Links Cell */}
        <div className="footer-links-cell">
          <h4>EXPLORE</h4>
          <ul>
            <li><a href="#hero-section" onClick={(e) => { e.preventDefault(); document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Intro</a></li>
            <li><a href="#movement-section" onClick={(e) => { e.preventDefault(); document.getElementById('movement-section')?.scrollIntoView({ behavior: 'smooth' }); }}>The Movement</a></li>
            <li><a href="#video-showcase-section" onClick={(e) => { e.preventDefault(); document.getElementById('video-showcase-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Featured Videos</a></li>
            <li><a href="#live-experience-section" onClick={(e) => { e.preventDefault(); document.getElementById('live-experience-section')?.scrollIntoView({ behavior: 'smooth' }); }}>UK Streets</a></li>
          </ul>
        </div>

        {/* Support Links Cell */}
        <div className="footer-links-cell">
          <h4>MISSION</h4>
          <ul>
            <li><a href="#donation-section" onClick={(e) => { e.preventDefault(); document.getElementById('donation-section')?.scrollIntoView({ behavior: 'smooth' }); }}>GoFundMe</a></li>
            <li><a href="#donation-section" onClick={(e) => { e.preventDefault(); document.getElementById('donation-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Volunteer</a></li>
            <li><a href="#donation-section" onClick={(e) => { e.preventDefault(); document.getElementById('donation-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Merch Store</a></li>
            <li><a href="mailto:info@ringovision.com">Contact Outreach</a></li>
          </ul>
        </div>

        {/* Subscription Cell */}
        <div className="footer-sub-cell">
          <h4>NEWSLETTER</h4>
          <p>Get direct logs, street bulletins, and food drive schedules.</p>
          <form className="sub-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="sub-input" 
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="sub-submit-btn" aria-label="Subscribe">
              <Mail size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Copyright row */}
      <div className="footer-bottom-row">
        <span>© 2026 RINGO VISION. ALL RIGHTS RESERVED.</span>
        <span className="built-with">
          BUILT WITH <Heart size={10} fill="var(--accent-red)" className="heart-love" /> IN LONDON
        </span>
      </div>
    </footer>
  );
}
