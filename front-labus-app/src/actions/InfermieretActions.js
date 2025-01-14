import { GET_INFERMIERETS,GET_INFERMIERI,CREATE_INFERMIERI,DELETE_INFERMIERI } from "../actions/type";
import axios from "axios";
import { GET_ERRORS } from "../actions/type";

export const getInfermiers = (qytetiId, spitaliId,repartiId) => async (dispatch) => {
    try {
        const response 
        = await axios.get(`http://localhost:8081/api/infermieret/all/${qytetiId}/${spitaliId}/${repartiId}`);
        dispatch({
            type: GET_INFERMIERETS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const creaetInfermier = (qytetiId, spitaliId,repartiId,infermier) => async (dispatch) => {
    try {
        console.log(`http://localhost:8081/api/infermieret/${qytetiId}/${spitaliId}/${repartiId}`,infermier)
        const response = 
        await axios.post(`http://localhost:8081/api/infermieret/${qytetiId}/${spitaliId}/${repartiId}`,infermier);
        //window.location.href = `/`
        dispatch({
            type: CREATE_INFERMIERI,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getPacinet = (qytetiId, spitaliId,repartiId,infermierId) => async (dispatch) => {
    try {
        const response =
         await axios.get(`http://localhost:8081/api/infermieret/o/${qytetiId}/${spitaliId}/${repartiId}/${infermierId}`);
        dispatch({
            type: GET_INFERMIERI,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deleteInfermier = ( repartiId,pacinetId) => async (dispatch) => {
    try {
        console.log(`Request URL: http://localhost:8081/api/infermieret/reparti/${repartiId}/mjeket/${pacinetId}`); // Log request URL
        const response 
        = await axios.delete(`http://localhost:8081/api/infermieret/reparti/${repartiId}/mjeket/${pacinetId}`);
        console.log('deleteReparti called with:', {   repartiId ,pacinetId});
        dispatch({
            type: DELETE_INFERMIERI,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};
