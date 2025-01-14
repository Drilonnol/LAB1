import { GET_SPECIALIZIMET, GET_SPECIALIZIMETS, CREATE_SPECIALIZIMET, DELETE_SPECIALIZIMET, GET_ERRORS,UPDATE_SPECIALIZIMET } from "../actions/type";
import axios from "axios";

export const createSpecializimi = (mjekiId, specializimi) => async(dispatch) => {
    try {
        const response = await axios.post(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/specializimi/${mjekiId}`, specializimi);
        dispatch({
            type: CREATE_SPECIALIZIMET,
            payload: response.data, // Ensure the payload is correct
        });
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getAllSpecializimet = () => async(dispatch) => {
    try {
        const response = await axios.get('http://10.116.1.253:8081/meaxhimi-spitalit-app/api/specializimi/all');
        dispatch({
            type: GET_SPECIALIZIMETS,
            payload: response.data
        });
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}; 

export const getSpecializimi = (mjekiId) => async(dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/specializimi/${mjekiId}`);
        dispatch({ 
            type: GET_SPECIALIZIMET,
            payload: response.data
        });
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};
export const deleteSpecializimi = (mjekiId) => async(dispatch) => {
    if(window.confirm("Jeni i sigurt qe doni te fshini kete?")) {
        try {
            await axios.delete(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/specializimi/${mjekiId}`);
            dispatch({
                type: DELETE_SPECIALIZIMET,
                payload: mjekiId, // Make sure payload matches with what reducer expects
            });
        } catch(error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            });
        }
    }
};
export const updatespecializimi = (mjekiId, specializimi) => async(dispatch) => {
    try {
        const response = await axios.put(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/specializimi/${mjekiId}`, specializimi);
        dispatch({
            type: UPDATE_SPECIALIZIMET,
            payload: response.data, // Ensure the payload is correct
        });
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};
