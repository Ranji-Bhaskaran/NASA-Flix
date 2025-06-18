import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function NEO() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get('http://localhost:5000/neo?start_date=2024-05-01&end_date=2024-05-07')
    .then(res => {
      const raw = res.data.near_earth_objects;
      if (!raw) return setData([]);
      const formatted = Object.entries(raw).map(([date, asteroids]) => ({
        date,
        count: asteroids.length
      }));
      setData(formatted);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching NEO data:', err);
      setLoading(false);
    });
}, []);


  return (
    <div style={{ padding: '2rem' }}>
      <h2>☄️ Near Earth Object Tracker</h2>
      {loading && <p>Loading NEO data...</p>}

      {!loading && data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#e50914" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {!loading && data.length === 0 && <p>No NEO data available for the selected period.</p>}
    </div>
  );
}

export default NEO;
