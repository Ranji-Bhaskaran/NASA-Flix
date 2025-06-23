import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import Spline from '@splinetool/react-spline';
import './Home.css';

const tiles = [
  { label: 'APOD', to: '/apod' },
  { label: 'Mars Rover', to: '/mars' },
  { label: 'EPIC', to: '/epic' },
  { label: 'NEOs', to: '/neo' },
];

function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">

      {/* 🪐 Background Image - moved behind spline
      <img
        src="/bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-[.35] z-0 opacity-60"
      /> */}


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

      {/* 🚀 Main UI Content */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 py-24">
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

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 gap-6 w-full sm:w-[400px] px-4">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link to={tile.to}>
                <button className="home-nav-button w-full">
                  {tile.label}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
