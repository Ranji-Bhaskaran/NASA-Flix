import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import APOD from './APOD';
import MarsRover from './MarsRover';
import EPIC from './EPIC';
import NEO from './NEO';
import Navbar from './Navbar';
import Home from './Home'; // pulled Home into its own file for clarity

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/mars" element={<MarsRover />} />
          <Route path="/epic" element={<EPIC />} />
          <Route path="/neo" element={<NEO />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
