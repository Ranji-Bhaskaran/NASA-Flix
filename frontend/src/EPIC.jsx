import { useState, useEffect } from 'react';
import axios from 'axios';
import './EPIC.css';

function EPIC() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/epic')
      .then((res) => {
        setImages(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('EPIC fetch error:', err);
        setLoading(false);
      });
  }, []);

  const buildImageUrl = (item) => {
    const date = item.date.split(' ')[0].replaceAll('-', '/');
    return `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${item.image}.png`;
  };

  return (
    <div className="epic-page">
      {/* 🔭 Cosmic Background */}
      <img src="/bg.jpg" alt="space background" className="epic-bg" />

      {/* 🔮 Foreground UI */}
      <div className="epic-content">
        <h1 className="epic-title">🌍 EPIC Earth Views</h1>

        {loading && <p className="epic-loading">🚀 Syncing with Earth's low orbit sensors...</p>}
        {!loading && images.length === 0 && (
          <p className="epic-empty">🛰️ No images from this timeline detected.</p>
        )}

        <div className="epic-grid">
          {images.slice(0, 12).map((img) => (
            <div key={img.identifier} className="epic-card">
              <div className="epic-card-border">
                <img src={buildImageUrl(img)} alt="EPIC Earth" className="epic-img" />
              </div>
              <p className="epic-date">{new Date(img.date).toUTCString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EPIC;
