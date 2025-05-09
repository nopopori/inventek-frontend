import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // sesuaikan dengan URL Laravel-mu
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // opsional, aktifkan jika pakai Sanctum
});

export default instance;
