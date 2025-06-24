import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import Spline from '@splinetool/react-spline';
import { useEffect, useRef, useState } from 'react';
import './Home.css';

const tiles = [
  { label: 'APOD', to: '/apod' },
  { label: 'Mars Rover', to: '/mars' },
  { label: 'EPIC', to: '/epic' },
  { label: 'NEOs', to: '/neo' },
];

function Home() {
  const bgAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.3;
      bgAudioRef.current.loop = true;
      bgAudioRef.current.muted = muted;
      bgAudioRef.current.play().catch(console.warn);
    }
    setStarted(true);
  };

  const handleTileClick = () => {
    if (!muted && clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(console.warn);
    }
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = newMuted;
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      {/* 🔊 Audio refs */}
      <audio ref={bgAudioRef} src="/sounds/space-ambient.mp3" />
      <audio ref={clickAudioRef} src="/sounds/click.wav" />

      {/* 🔇 Mute toggle */}
      {started && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-50 bg-black/70 text-white px-3 py-1 rounded-lg border border-white hover:bg-white hover:text-black transition-all"
        >
          {muted ? '🔇' : '🔊'}
        </button>
      )}

      {!started && (
  <div
    onClick={handleStart}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: 1000,
    }}
  >
    <div
      style={{
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        fontFamily: "'Orbitron', sans-serif",
        textAlign: 'center',
        animation: 'bounce 2s infinite',
      }}
    >
      🌌 Click to Enter the World of Space
    </div>

  </div>
)}





      {/* 🪐 Spline visual */}
      <div className="fixed top-0 left-0 w-full h-full z-10 opacity-60 pointer-events-none">
        <Spline scene="https://prod.spline.design/8lTazHlUkEZV2qI2/scene.splinecode" />
      </div>

      <Particles
        className="absolute inset-0 z-20"
        options={{
          fullScreen: false,
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            move: { enable: true, speed: 0.3 },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
          },
        }}
      />

      {/* 🌌 Main UI */}
      {started && (
        <motion.div
          className="relative z-30 flex flex-col items-center justify-center px-4 py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="netflix-title mb-8"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            NASAFLIX
          </motion.h1>

          <motion.p
            className="floating-text text-center italic text-gray-300 text-xl mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Astonished by Astronomy?
          </motion.p>

          <div className="grid grid-cols-1 gap-6 w-full sm:w-[400px] px-4">
            {tiles.map((tile, index) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <button
                  onClick={handleTileClick}
                  className="home-nav-button w-full"
                >
                  <Link to={tile.to} className="block w-full h-full">
                    {tile.label}
                  </Link>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
