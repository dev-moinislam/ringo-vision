import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse coordinate refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Update sharp core dot directly in DOM for 60fps performance
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // One-time requestAnimationFrame loop for smooth trailing
    let animFrameId;
    const updateTrail = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      
      const dx = targetX - trailRef.current.x;
      const dy = targetY - trailRef.current.y;
      
      // Lagging formula
      trailRef.current.x += dx * 0.15;
      trailRef.current.y += dy * 0.15;

      if (haloRef.current) {
        haloRef.current.style.left = `${trailRef.current.x}px`;
        haloRef.current.style.top = `${trailRef.current.y}px`;
      }

      animFrameId = requestAnimationFrame(updateTrail);
    };

    updateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Hover detection for interactive items
  useEffect(() => {
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], .video-card, .social-item');
      
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Watch for dynamic updates in DOM
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverListeners();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Sharp core dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isClicking ? 'clicking' : ''}`}
      />
      {/* Interactive lagging halo */}
      <div
        ref={haloRef}
        className={`custom-cursor-halo ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  );
}
