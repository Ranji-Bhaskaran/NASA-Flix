import { useEffect, useState } from 'react';
import axios from 'axios';

const placeholderImg = 'https://via.placeholder.com/400x300?text=No+Image';

function MarsRover() {
  const [photos, setPhotos] = useState([]);
  const [sol, setSol] = useState(1000);
  const [rover, setRover] = useState('curiosity');
  const [camera, setCamera] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);

  // Reset sol on rover change for safer results
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
    <div className="min-h-screen px-6 py-10 bg-[#141414] text-white">
      <h2 className="text-4xl font-bold text-red-500 mb-8 text-center">🛰️ Mars Rover Gallery</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <label className="flex flex-col text-sm">
          Rover
          <select
            value={rover}
            onChange={(e) => setRover(e.target.value)}
            className="bg-black border border-gray-700 px-2 py-1 rounded text-white"
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </label>

        <label className="flex flex-col text-sm">
          Sol (Martian Day)
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(Number(e.target.value))}
            min="0"
            max="5000"
            className="bg-black border border-gray-700 px-2 py-1 rounded text-white"
          />
        </label>

        <label className="flex flex-col text-sm">
          Camera
          <select
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
            className="bg-black border border-gray-700 px-2 py-1 rounded text-white"
          >
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

      {/* Loading / No results */}
      {loading && <p className="text-center text-gray-400">Loading photos...</p>}
      {!loading && photos.length === 0 && (
        <p className="text-center text-gray-400">
          No photos found for Sol {sol} {camera && `with ${camera}`} on{' '}
          {rover.charAt(0).toUpperCase() + rover.slice(1)}.
        </p>
      )}

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {photos.slice(0, visibleCount).map((photo) => (
          <div
            key={photo.id}
            className="bg-[#1f1f1f] p-3 rounded-lg shadow-md hover:shadow-red-500 transition group"
          >
            <div className="overflow-hidden rounded">
              <img
                src={photo.img_src.replace('http://', 'https://')}
                alt={`Rover ${photo.rover.name}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImg;
                }}
                className="w-full h-48 object-cover rounded transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 text-sm">
              <p className="font-semibold">{photo.camera.full_name}</p>
              <p className="text-xs text-gray-400">{photo.earth_date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {!loading && visibleCount < photos.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount(visibleCount + 20)}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default MarsRover;
