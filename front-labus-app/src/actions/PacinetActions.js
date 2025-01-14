import { GET_PACINETI,GET_PACINETS,CREATE_PACINETI,DELETE_PACIENTI } from "../actions/type";
import axios from "axios";
import { GET_ERRORS } from "../actions/type";

export const getPacinets = (qytetiId, spitaliId,repartiId) => async (dispatch) => {
    try {
        const response= await axios.get(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/pacient/all/${qytetiId}/${spitaliId}/${repartiId}`);
        dispatch({
            type: GET_PACINETS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};


export const creaetPacient = (qytetiId, spitaliId,repartiId,pacinet) => async (dispatch) => {
    try {
        console.log(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/pacient/add/${qytetiId}/${spitaliId}/${repartiId}`,pacinet)
        const response = 
        await axios.post(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/pacient/add/${qytetiId}/${spitaliId}/${repartiId}`,pacinet);
        //window.location.href = `/`
        dispatch({
            type: CREATE_PACINETI,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getPacinet = (qytetiId, spitaliId,repartiId,pacientId) => async (dispatch) => {
    try {
        const response =
         await axios.get(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/pacient/o/${qytetiId}/${spitaliId}/${repartiId}/${pacientId}`);
        dispatch({
            type: GET_PACINETI,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deletePacinet = ( repartiId,pacinetId) => async (dispatch) => {
    try {
        console.log(`Request URL: http://192.168.0.22:8081/meaxhimi-spitalit-app/api/pacient/${repartiId}/${pacinetId}`); // Log request URL
        const response 
        = await axios.delete(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/pacient/delete/${repartiId}/${pacinetId}`);
        console.log('deleteReparti called with:', {   repartiId ,pacinetId});
        dispatch({
            type: DELETE_PACIENTI,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};
