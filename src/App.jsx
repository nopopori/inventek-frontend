// Import libraries dan komponen yang diperlukan
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register'; // Import komponen Register yang sudah dibuat sebelumnya

// Komponen utama aplikasi
function App() {
  return (
    <Router>
      <div>
        <h1 className="text-red-500 font-extrabold text-2xl">
          Welcome to My App
        </h1>

        {/* Routing untuk halaman-halaman */}
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
