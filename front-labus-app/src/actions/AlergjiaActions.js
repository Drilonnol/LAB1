import { GET_ALERGJIA,GET_ALERGJIAS,CREATE_ALERGJIA,DELETE_ALERGJIA } from "../actions/type";
import axios from "axios";
import { GET_ERRORS } from "../actions/type";

export const getAlergjit = (repartiId, pacinetId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/alergjia/${repartiId}/${pacinetId}`);
        dispatch({
            type: GET_ALERGJIAS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const createAlergjia = (repartiId, pacinetId, alergjia) => async (dispatch) => {
    try {
        const response = await axios.post(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/alergjia/${repartiId}/${pacinetId}`,alergjia);
        window.location.href = `/alergjialist/${repartiId}/${pacinetId}`
        dispatch({
            type: CREATE_ALERGJIA,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getAlergjia = (qytetiId, pacinetId, alergjiaId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/alergjia/get/${qytetiId}/${pacinetId}/${alergjiaId}`);
        dispatch({
            type: GET_ALERGJIA,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deleteAlergjia = (repartiId, pacinetiId,alergjiaId) => async (dispatch) => {
    try {
        console.log(`Request URL: http://192.168.0.22:8081/meaxhimi-spitalit-app/api/alergjia/delete/${repartiId}/${pacinetiId}/${alergjiaId}`); // Log request URL
        const response = await axios.delete(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/alergjia/delete/${repartiId}/${pacinetiId}/${alergjiaId}`);
        console.log('deleteReparti called with:', { repartiId, pacinetiId, alergjiaId });
        dispatch({
            type: DELETE_ALERGJIA,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};
