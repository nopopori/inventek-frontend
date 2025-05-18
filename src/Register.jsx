import { useState } from 'react';
import './Register.css';
import registerVector from './assets/register-vector.jpg';

function Register() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [noHP, setNoHP] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign up attempted with:', { nama, email, noHP, password });
    // Disini nanti bisa dihubungkan dengan backend
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-image">
          {/* Gambar yang diimpor */}
          <div className="register-illustration">
            <img src={registerVector} alt="Register Illustration" className="register-vector" />
          </div>
        </div>
        <div className="register-form">
          <h1 className="register-title">Register</h1>
          <p className="register-subtitle">
            Kelola inventaris Anda dengan lebih cerdas
            <br />
            Verifikasi akun pribadi dan mulailah membangun profil kerja Anda.
          </p>
          
          <div className="form-group">
            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              id="nama"
              className="input-field"
              placeholder="Masukkan Nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
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
              <label htmlFor="noHP">No. HP</label>
              <input
                type="tel"
                id="noHP"
                className="input-field"
                placeholder="minimal 8 karakter"
                value={noHP}
                onChange={(e) => setNoHP(e.target.value)}
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
          
          <button 
            className="signup-button"
            onClick={handleSignUp}
          >
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