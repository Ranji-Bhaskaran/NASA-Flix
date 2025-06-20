import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const links = [
    { label: 'Home', to: '/' },
    { label: 'APOD', to: '/apod' },
    { label: 'Mars Rover', to: '/mars' },
    { label: 'EPIC', to: '/epic' },
    { label: 'NEOs', to: '/neo' },
  ];

  return (
    <nav className="cosmic-navbar">
      <div className="nav-wrapper">
        <div className="nav-title">🚀 NASAFLIX</div>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
