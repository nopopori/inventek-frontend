import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios'; // pastikan path ini benar

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuth(false);
      return;
    }

    axios
      .get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>; // Atau spinner
  }

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;