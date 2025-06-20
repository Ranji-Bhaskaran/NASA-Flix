import { useState, useEffect } from 'react';
import axios from 'axios';
import './APOD.css';

function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  const fetchAPOD = (selectedDate = '') => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/apod${selectedDate ? `?date=${selectedDate}` : ''}`)
      .then((res) => {
        setApod(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    fetchAPOD(e.target.value);
  };

  return (
    <div className="apod-container">
      <div className="apod-header">
        <h1 className="apod-title">🚀 NASA Astronomy Picture of the Day</h1>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="apod-date-picker"
        />
      </div>

      <div className="apod-card">
        {loading && <div className="apod-loading">Loading the cosmos...</div>}

        {!loading && apod && (
          <div className="apod-content">
            <h2 className="apod-media-title">{apod.title}</h2>
            <p className="apod-date">📅 {apod.date}</p>

            <div className="apod-media">
              {apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} className="apod-image" />
              ) : (
                <iframe
                  title="space video"
                  src={apod.url}
                  frameBorder="0"
                  allow="encrypted-media"
                  allowFullScreen
                  className="apod-video"
                />
              )}
            </div>

            <p className="apod-description">{apod.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default APOD;
