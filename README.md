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


⚙️ Installation
1. Clone the Repository

git clone https://github.com/yourusername/nasaflix.git
cd nasaflix
