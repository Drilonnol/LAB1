import { CREATE_USER, GET_USER } from "../actions/type";
import axios from "axios";
import { GET_ERRORS } from "../actions/type";

export const createUser = (user) => async (dispatch) => {
    try {
        const response = 
        await axios.post(`http://192.168.0.22:8083/in.mahesh.tasks/auth/signup`,user);
        //window.location.href = `/`
        dispatch({
            type: CREATE_USER,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};


export const login = (newPacinet) => async (dispatch) => {
    try {
      const response = await axios.post('http://192.168.0.22:8083/in.mahesh.tasks/auth/signin', newPacinet);
  
      if (response.data.status) {
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        
        localStorage.setItem('jwtToken', response.data.jwt);
        localStorage.setItem('userId', response.data.id);
        return response.data;
    } else {
    
        dispatch({ type: 'LOGIN_FAILURE', payload: response.data.message });
        return response.data;
    }
} catch (error) {
    
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    return { status: false, message: error.message };
}
};


  export const verifikimi = (token) => async (dispatch) => {
    try {
      const response = await axios.post(
        'http://192.168.0.22:8083/in.mahesh.tasks/auth/verifyToken',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data) {
        return { status: true, message: 'Token is valid' };
      } else {
        return { status: false, message: 'Token is invalid' };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  };

  /*export const getUser = (userId) => async (dispatch) => {
    try {
        const response =
         await axios.get(`http://localhost:8083/user/${userId}`);
        dispatch({
            type: GET_USER,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};*/
 
 
 
 
 
 
  /*export const logoutUser = () => (dispatch) => {
    // Clear user data from local storage or session storage
    localStorage.removeItem('userToken'); // or sessionStorage
    localStorage.removeItem('user'); // or sessionStorage
  
    // Dispatch the logout action
    dispatch({
      type: 'LOGOUT_USER',
    });
  
    // Optionally, redirect to login page if needed
    window.location.reload();
    window.location.href = '/';
    
  };*/
