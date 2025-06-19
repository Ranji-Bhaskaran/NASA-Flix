# 🚀 NASAflix - Explore Space Data Visually

**NASAflix** is a full-stack web application that allows users to explore space through stunning visuals and real-time data using NASA's Open APIs. Featuring a Netflix-inspired design, it combines clean UI with interactive visualizations.

---

## 🌌 Features

### ✅ Frontend (React + TailwindCSS)

* Responsive, Netflix-themed UI
* Navbar + Hamburger menu for mobile
* Views:

  * **APOD** (Astronomy Picture of the Day)
  * **Mars Rover Photos** (filter by sol, rover, and camera)
  * **EPIC** (Earth imagery from DSCOVR)
  * **NEO Tracker** (Near Earth Object chart visualization)
* Smooth routing with React Router
* Interactivity via dropdown filters and dynamic image loading

### ✅ Backend (Node.js + Express)

* API proxy server to securely fetch from NASA
* Environment variable support for NASA API key
* Handles:

  * `/apod`
  * `/mars-photos`
  * `/epic`
  * `/neo`

---

## 🛠️ Technologies Used

| Frontend     | Backend       |
| ------------ | ------------- |
| React        | Node.js       |
| Tailwind CSS | Express       |
| Recharts     | Axios         |
| React Router | dotenv + cors |

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nasaflix.git
cd nasaflix
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "NASA_API_KEY=your_api_key_here" > .env

npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Railway / Cyclic

Ensure CORS is enabled in backend when deploying.

---

## 📊 Sample Screenshot

> Coming soon after design polish 🎨

---

## 📁 Project Structure

```
├── backend/
│   ├── index.js
│   └── .env
├── frontend/
│   ├── src/
│   └── tailwind.config.js
└── README.md
```

---

## 🧪 Bonus Features

* [x] Filters (Camera, Rover, Sol)
* [x] Responsive mobile support
* [x] Chart visualization (NEOs)
* [ ] AI enhancement (planned)
* [ ] Unit testing (planned)

---

## 📬 Submission Checklist

* [x] Live URL deployed ✅
* [x] GitHub Repo ✅
* [x] README with setup guide ✅

---

## 🤖 License

MIT

---

## 📞 Contact

For any queries, feel free to reach out via GitHub Issues.

---

**Enjoy exploring space with NASAflix! 🌠**
