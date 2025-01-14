import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser, verifikimi } from '../actions/SingupAction';
import { Logout } from '../actions/LogoutActions';
import { Redirect } from 'react-router-dom';
import useAuthentication from '../actions/auth';

const LogoutButton = () => {
  const { logout } = useAuthentication();

  const handleLogout = () => {
    logout();
    window.location.href="/";
    // Shko në faqen e logout-it ose bëj ndonjë veprim tjetër që është e nevojshme
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};
  /*const handleLogout = () => {
  //  localStorage.removeItem('user');

    // Fshini token-in nga localStorage
    //localStorage.removeItem('token');

   dispatch(Logout())
   window.location.href="/";
  };*/



export default LogoutButton;