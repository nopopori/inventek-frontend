import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk mengirim data register ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Mengirim data ke backend menggunakan axios
      const response = await axios.post(
        "http://localhost:8000/api/register", // Ganti dengan URL backend-mu
        formData
      );

      // Menangani jika sukses
      setMessage(response.data.message);
      setError(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      // Menangani error
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong!");
      }
      setMessage(null);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
