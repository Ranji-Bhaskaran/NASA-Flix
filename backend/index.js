const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NASA API Backend is running!');
});

app.get('/apod', async (req, res) => {
  const date = req.query.date;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}` + (date ? `&date=${date}` : '');

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD:', error.message);
    res.status(500).json({ error: 'Error fetching data from NASA API' });
  }
});

app.get('/mars-photos', async (req, res) => {
  const { rover = 'curiosity', sol = 1000, camera } = req.query;

  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${process.env.NASA_API_KEY}`;
  
  if (camera) {
    url += `&camera=${camera}`;
  }

  try {
    console.log('🚀 Fetching:', url);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Mars photos:', error.message);
    res.status(500).json({ error: 'Failed to fetch Mars photos' });
  }
});


app.get('/epic', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching EPIC data:', err.message);
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
});

app.get('/neo', async (req, res) => {
  const start_date = req.query.start_date || '2024-05-01';
  const end_date = req.query.end_date || '2024-05-07';

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${process.env.NASA_API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log('✅ NEO API fetched:', Object.keys(response.data.near_earth_objects));
    res.json(response.data);
  } catch (err) {
    console.error('❌ NEO API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
