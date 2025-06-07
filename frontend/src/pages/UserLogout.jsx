import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        // Still redirect to login even if logout API fails
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate, token]);

  return <div>Logging out...</div>;
};

export default UserLogout;
