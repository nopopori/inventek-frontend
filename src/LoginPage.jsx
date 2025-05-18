import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from './api/axios';
import './App.css';
import loginVector from './assets/login-vector.jpg';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  if (params.get('registered') === 'success') {
    setRegisterSuccessMessage('Registrasi berhasil! Silakan login.');

    params.delete('registered');
    const newSearch = params.toString();
    navigate({ pathname: location.pathname, search: newSearch }, { replace: true });
  }
}, [location, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (error) {
      alert('Login gagal. Periksa email dan kata sandi Anda.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image">
          <div className="login-illustration">
            <img src={loginVector} alt="Login Illustration" className="login-vector" />
          </div>
        </div>
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Tumbuh lebih baik, dapatkan dukungan!</p>

          {registerSuccessMessage && (
            <div className="success-message">{registerSuccessMessage}</div>
          )}

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

          <button className="login-button" onClick={handleLogin}>
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
