import axios from "axios";
import { LOGOUT_USER } from "../actions/type";
import { GET_ERRORS } from "../actions/type";

export const Logout = () => async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:8083/auth/logout`);
      console.log("Logout response:", response.data); 
      dispatch({
        type: LOGOUT_USER,
        payload: response.data
      });
    } catch (error) {
      console.error("Logout error:", error.response.data); 
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  };
  