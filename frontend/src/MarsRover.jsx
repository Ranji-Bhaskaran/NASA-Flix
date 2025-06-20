import { useEffect, useState } from 'react';
import axios from 'axios';
import './MarsRover.css';

const placeholderImg = 'https://via.placeholder.com/400x300?text=No+Image';

function MarsRover() {
  const [photos, setPhotos] = useState([]);
  const [sol, setSol] = useState(1000);
  const [rover, setRover] = useState('curiosity');
  const [camera, setCamera] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    if (rover === 'curiosity') setSol(1000);
    if (rover === 'opportunity') setSol(1000);
    if (rover === 'spirit') setSol(500);
  }, [rover]);

  const fetchPhotos = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/mars-photos?rover=${rover}&sol=${sol}${
          camera ? `&camera=${camera}` : ''
        }`
      )
      .then((res) => {
        setPhotos(res.data.photos || []);
        setVisibleCount(20);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching Mars photos:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, [rover, sol, camera]);

  return (
    <div className="mars-container">
      <h2 className="mars-title">🪐 Mars Rover Image Vault</h2>

      {/* Filters */}
      <div className="mars-filters">
        <label>
          Rover
          <select value={rover} onChange={(e) => setRover(e.target.value)}>
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </label>

        <label>
          Sol (Martian Day)
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(Number(e.target.value))}
            min="0"
            max="5000"
          />
        </label>

        <label>
          Camera
          <select value={camera} onChange={(e) => setCamera(e.target.value)}>
            <option value="">All</option>
            <option value="FHAZ">Front Hazard</option>
            <option value="RHAZ">Rear Hazard</option>
            <option value="NAVCAM">Navcam</option>
            <option value="MAST">Mastcam</option>
            <option value="CHEMCAM">ChemCam</option>
            <option value="PANCAM">PanCam</option>
          </select>
        </label>
      </div>

      {loading && <p className="mars-loading">🚧 Calibrating cosmic feed...</p>}

      {!loading && photos.length === 0 && (
        <div className="mars-empty">
          <img
            src={placeholderImg}
            alt="No images found"
            className="w-72 h-56 object-contain opacity-60 mb-4"
          />
          <p>
            🛸 No signals from {rover.charAt(0).toUpperCase() + rover.slice(1)} on Sol {sol}{' '}
            {camera && `with ${camera}`}.
          </p>
        </div>
      )}

      {/* Image Grid */}
      <div className="mars-gallery">
        {photos.slice(0, visibleCount).map((photo) => (
          <div key={photo.id} className="mars-card">
            <img
              src={photo.img_src.replace('http://', 'https://')}
              alt={`Rover ${photo.rover.name}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImg;
              }}
              className="mars-img"
            />
            <div className="mars-meta">
              <p className="mars-camera">{photo.camera.full_name}</p>
              <p className="mars-date">{photo.earth_date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {!loading && visibleCount < photos.length && (
        <div className="mars-load">
          <button onClick={() => setVisibleCount(visibleCount + 20)}>
            Load More Stardust
          </button>
        </div>
      )}
    </div>
  );
}

export default MarsRover;
