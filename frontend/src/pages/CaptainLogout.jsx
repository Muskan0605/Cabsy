import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const token = localStorage.getItem('token');

        await axios.get(`${BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem('token');
        navigate('/captain-login');
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      }
    };

    logoutCaptain();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
