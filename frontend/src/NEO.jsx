import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './NEO.css';

function NEO() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/neo?start_date=2024-05-01&end_date=2024-05-07')
      .then(res => {
        const raw = res.data.near_earth_objects;
        if (!raw) {
          setData([]);
          setLoading(false);
          return;
        }

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
    <div className="neo-page">
      <img src="/bg.jpg" alt="space background" className="neo-bg" />

      <div className="neo-content">
        <h2 className="neo-title">☄️ Near Earth Object Tracker</h2>

        {loading && <p className="neo-status">🛰️ Scanning space for threats...</p>}

        {!loading && data.length > 0 && (
          <div className="neo-chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#00ffee" />
                <YAxis stroke="#00ffee" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111',
                    border: '1px solid #00ffe7',
                    color: '#fff',
                    fontFamily: 'Orbitron',
                  }}
                />
                <Bar dataKey="count" fill="#ff0077" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {!loading && data.length === 0 && (
          <p className="neo-status">✅ No threatening objects near Earth detected during this time.</p>
        )}
      </div>
    </div>
  );
}

export default NEO;
