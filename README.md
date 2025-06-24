# 🚀 NASAflix – Explore Space Data Visually

**NASAflix** is a full-stack web application that lets users explore outer space using real-time data from NASA's Open APIs. Inspired by Netflix’s interface, NASAflix combines sleek UI with interactive visualizations and animations to deliver an immersive cosmic experience.

---

## 🌌 Features

### ✅ Frontend (React + Tailwind CSS)

- Cosmic-themed, Netflix-style responsive UI
- Animated homepage with Spline 3D and space ambience audio
- Clean route-based structure with:
  - **APOD** – Astronomy Picture of the Day
  - **Mars Rover Photos** – filter by sol, rover, and camera
  - **EPIC** – Earth imagery from DSCOVR
  - **NEO Tracker** – visual charts of near-Earth objects
- React Router for seamless navigation
- Recharts for dynamic data graphs
- Particle background effects, glow buttons, hover sounds

### ✅ Backend (Node.js + Express)

- API proxy to securely fetch data from NASA
- Routes:
  - `/apod`
  - `/mars-photos`
  - `/epic`
  - `/neo`
- Uses `dotenv` for environment management
- Handles CORS and error responses gracefully

---

## 🛠️ Tech Stack

| Frontend       | Backend       |
|----------------|---------------|
| React          | Node.js       |
| Tailwind CSS   | Express       |
| React Router   | Axios         |
| Framer Motion  | dotenv + CORS |
| Spline 3D      |               |
| Recharts       |               |

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nasaflix.git
cd nasaflix
2. Backend Setup
bash
Copy
Edit
cd backend
npm install

# Add your NASA API key
echo "NASA_API_KEY=your_api_key_here" > .env

npm run dev
3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
🌐 Deployment
Frontend: Vercel

Backend: Render

Note: Ensure your backend CORS policy allows your frontend domain.

📁 Project Structure
arduino
Copy
Edit
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── tailwind.config.js
└── README.md
Features
 1. Filter options (camera, sol, rover)
 2. Ambient background space music with mute toggle
 3. Spline 3D and particle effects
 4. Chart.js visualizations for NEOs
 5. Fully mobile responsive layout

📞 Contact
For questions or collaboration, feel free to open an issue on GitHub.
