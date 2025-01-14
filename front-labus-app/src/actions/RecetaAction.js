import { GET_RECETA,GET_RECETAS,CREATE_RECETA,UPDATE_RECETA,DELETE_RECETA ,GET_ERRORS} from "../actions/type";

import axios from "axios";

// Fetch all recetas by mjekId and departmentId
export const getRecetas = (repartiId, mjekId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/receta/mjek/${repartiId}/${mjekId}`);
        dispatch({
            type: GET_RECETAS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

// Fetch a single receta by id
export const getReceta = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/receta/${id}`);
        dispatch({
            type: GET_RECETA,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

// Create a new receta
export const createReceta = (mjekId, receta) => async (dispatch) => {
    try {
        const response = await axios.post(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/receta/in/${mjekId}`, receta,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Marrja e JWT token-it nga localStorage
            }
        }
    );

        dispatch({
            type: CREATE_RECETA,
            payload: response.data
        });
      //  window.location.href = `/recetalist/${mjekId}`;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

// Update an existing receta
export const updateReceta = (id, recetaDetails) => async (dispatch) => {
    try {
        const response = await axios.put(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/receta/${id}`, recetaDetails);
        dispatch({
            type: UPDATE_RECETA,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

// Delete a receta by id
export const deleteReceta = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/receta/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Marrja e JWT token-it nga localStorage
            }
        }
    );
        dispatch({
            type: DELETE_RECETA,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};