import { useState, useEffect } from 'react';
import axios from 'axios';

function EPIC() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/epic')
      .then(res => {
        setImages(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('EPIC fetch error:', err);
        setLoading(false);
      });
  }, []);

  const buildImageUrl = (item) => {
    const date = item.date.split(' ')[0].replaceAll('-', '/');
    return `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${item.image}.png`;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🌍 EPIC Earth Views</h2>
      {loading && <p>Loading...</p>}
      {!loading && images.length === 0 && <p>No EPIC images found.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {images.slice(0, 12).map((img) => (
          <div key={img.identifier} style={{ background: '#000', padding: '1rem', borderRadius: '10px' }}>
            <img src={buildImageUrl(img)} alt="EPIC Earth" style={{ width: '100%' }} />
            <p>{img.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EPIC;
