import { useState, useEffect } from 'react';
import axios from 'axios';

function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  const fetchAPOD = (selectedDate = '') => {
    setLoading(true);
    axios.get(`http://localhost:5000/apod${selectedDate ? `?date=${selectedDate}` : ''}`)
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
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
    <div>
      <h1>NASA Astronomy Picture of the Day</h1>
      <input type="date" value={date} onChange={handleDateChange} style={{ marginBottom: '1rem' }} />
      {loading && <p>Loading...</p>}
      {!loading && apod && (
        <>
          <h2>{apod.title}</h2>
          <p>{apod.date}</p>
          {apod.media_type === 'image' ? (
            <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />
          ) : (
            <iframe title="video" src={apod.url} width="100%" height="400px" />
          )}
          <p>{apod.explanation}</p>
        </>
      )}
    </div>
  );
}

export default APOD;
