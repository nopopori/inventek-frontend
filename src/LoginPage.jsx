import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import loginVector from './assets/login-vector.jpg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempted with:', { email, password });
    // Disini nanti bisa dihubungkan dengan backend
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image">
          {/* Gambar yang diimpor */}
          <div className="login-illustration">
            <img src={loginVector} alt="Login Illustration" className="login-vector" />
          </div>
        </div>
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Tumbuh lebih baik, dapatkan dukungan!</p>
          
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Masukkan Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Masukkan Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            className="login-button"
            onClick={handleLogin}
          >
            Login
          </button>
          
          <div className="register-link">
            Belum buat akun? <Link to="/register">Buat akun disini!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;