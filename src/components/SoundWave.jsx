import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './SoundWave.css';

export default function SoundWave() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const synthNodesRef = useRef([]);

  // Generate procedural rain and fire soundscapes using Web Audio API
  const startAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      synthNodesRef.current = [];

      // 1. Procedural Deep Street Hum (Deep Drone)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const droneGain = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.value = 55; // A1 note
      
      osc2.type = 'triangle';
      osc2.frequency.value = 110.2; // Small detune
      
      droneGain.gain.value = 0.15;
      
      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      synthNodesRef.current.push(osc1, osc2, droneGain);

      // 2. Procedural Rain (White Noise + Bandpass Filter)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.value = 800;
      rainFilter.Q.value = 0.5;
      
      const rainGain = ctx.createGain();
      rainGain.gain.value = 0.08;
      
      noiseSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(ctx.destination);
      
      noiseSource.start();
      synthNodesRef.current.push(noiseSource, rainFilter, rainGain);

      // 3. Procedural Cooking Fire Crackles (Random high-pass clicks)
      const crackleNode = ctx.createScriptProcessor(4096, 0, 1);
      crackleNode.onaudioprocess = (e) => {
        const outChannel = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < e.outputBuffer.length; i++) {
          outChannel[i] = 0;
          // Random tiny spikes to simulate wood crackles
          if (Math.random() < 0.0008) {
            // Crackle impulse
            outChannel[i] = (Math.random() * 2 - 1) * 0.4;
          }
        }
      };

      const fireFilter = ctx.createBiquadFilter();
      fireFilter.type = 'highpass';
      fireFilter.frequency.value = 2500;
      
      const fireGain = ctx.createGain();
      fireGain.gain.value = 0.12;

      crackleNode.connect(fireFilter);
      fireFilter.connect(fireGain);
      fireGain.connect(ctx.destination);
      
      synthNodesRef.current.push(crackleNode, fireFilter, fireGain);

      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  };

  const stopAudio = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    synthNodesRef.current = [];
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="audio-toggle-container">
      <button 
        className={`audio-toggle-btn ${isPlaying ? 'active' : ''}`}
        onClick={toggleAudio}
        aria-label="Toggle atmospheric sound design"
        title="Experience London Ambient Street Audio"
      >
        <span className="audio-icon-wrapper">
          {isPlaying ? <Volume2 size={16} className="audio-icon gold" /> : <VolumeX size={16} className="audio-icon" />}
        </span>
        
        <span className="audio-label">
          {isPlaying ? 'AMBIENT ON' : 'AMBIENT OFF'}
        </span>

        {/* Equalizer animation bars */}
        <div className={`equalizer-bars ${isPlaying ? 'animating' : ''}`}>
          <span className="eq-bar bar-1"></span>
          <span className="eq-bar bar-2"></span>
          <span className="eq-bar bar-3"></span>
          <span className="eq-bar bar-4"></span>
        </div>
      </button>
    </div>
  );
}
