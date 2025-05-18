// src/api/axiosPrivate.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: false,
});