import { useEffect, useState } from 'react';
import axios from 'axios';

function MarsRover() {
  const [photos, setPhotos] = useState([]);
  const [sol, setSol] = useState(1000);
  const [rover, setRover] = useState('curiosity');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);
  const [camera, setCamera] = useState('');


  const fetchPhotos = () => {
    setLoading(true);
    axios.get(`http://localhost:5000/mars-photos?rover=${rover}&sol=${sol}${camera ? `&camera=${camera}` : ''}`)
      .then(res => {
        setPhotos(res.data.photos || []);
        setVisibleCount(20); // Reset pagination when new data loads
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching Mars photos:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, [rover, sol]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mars Rover Photos</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Rover:
          <select value={rover} onChange={(e) => setRover(e.target.value)}>
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Sol:
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(Number(e.target.value))}
            min="0"
            max="5000"
          />
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && photos.length === 0 && <p>No photos found for Sol {sol}.</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem'
        }}
      >
        {photos.slice(0, visibleCount).map(photo => (
          <div key={photo.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <img src={photo.img_src} alt={`Rover ${photo.rover.name}`} style={{ width: '100%' }} />
            <p><strong>{photo.camera.full_name}</strong></p>
            <p>{photo.earth_date}</p>
          </div>
        ))}
      </div>

      {!loading && visibleCount < photos.length && (
        <button onClick={() => setVisibleCount(visibleCount + 20)} style={{ marginTop: '1rem' }}>
          Load More
        </button>
      )}
    </div>
  );
}

export default MarsRover;
