import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios'; // asumsi file axios.js di src/api/
import './Register.css';
import registerVector from './assets/register-vector.jpg';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('/register', {
        name,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
      });

      navigate('/login?registered=success');
    } catch (err) {
      console.error('Registrasi gagal:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Registrasi gagal.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-image">
          <div className="register-illustration">
            <img src={registerVector} alt="Register Illustration" className="register-vector" />
          </div>
        </div>
        <div className="register-form">
          <h1 className="register-title">Register</h1>
          <p className="register-subtitle">
            Kelola inventaris Anda dengan lebih cerdas
            <br />
            Verifikasi akun pribadi dan mulai bangun profil kerja Anda.
          </p>

          {error && (
  <div className="error-message">
    <ul>
      {typeof error === 'string' ? (
        <li>{error}</li>
      ) : (
        Object.entries(error).map(([field, messages]) =>
          messages.map((msg, i) => (
            <li key={`${field}-${i}`}>
              <strong>{field}:</strong> {msg}
            </li>
          ))
        )
      )}
    </ul>
  </div>
)}

          <div className="form-group">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              id="name"
              className="input-field"
              placeholder="Masukkan Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group half">
              <label htmlFor="phone">No. HP</label>
              <input
                type="text"
                id="phone"
                className="input-field"
                placeholder="Masukkan Nomor HP"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Masukkan Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirmation">Konfirmasi Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              className="input-field"
              placeholder="Ulangi Kata Sandi"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <button className="signup-button" onClick={handleSignUp}>
            Sign up
          </button>

          <div className="login-link">
            Sudah punya akun? <a href="/login">Login disini</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
