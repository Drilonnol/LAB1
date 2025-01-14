// file: authUtils.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifikimi } from './SingupAction';

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setIsAuthenticated(false);
      } else {
        const response = await dispatch(verifikimi(token));
        setIsAuthenticated(response.status);
      }
    };

    verifyUser();
  }, [dispatch]);

  //return isAuthenticated;
  const logout = () => {
    // Fshirja e tokenit nga localStorage
    localStorage.removeItem('jwtToken');
    // Ndryshimi i statusit të autentikimit
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};


export default useAuthentication;
