import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // pastikan sesuai route Laravel
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true, // sangat penting untuk cookie-based auth Sanctum
});

export default instance;
