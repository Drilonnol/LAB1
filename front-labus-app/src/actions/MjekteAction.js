import { GET_MJEKET,GET_MJEKETS,CREATE_MJEKET,DELETE_MJEKET } from "../actions/type";
import axios from "axios";
import { GET_ERRORS } from "../actions/type";

export const getMjektets = (qytetiId, spitaliId,repartiId) => async (dispatch) => {
    try {
        const response 
        = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/mjeket/all/${qytetiId}/${spitaliId}/${repartiId}`);
        dispatch({
            type: GET_MJEKETS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const creaetMjeket = (qytetiId, spitaliId,repartiId,mjeket) => async (dispatch) => {
    try {
        const response = 
        await axios.post(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/mjeket/${qytetiId}/${spitaliId}/${repartiId}`,mjeket 
            ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Marrja e JWT token-it nga localStorage
            }
        }
    );
        dispatch({
            type: CREATE_MJEKET,
            payload: response.data
        });
        window.location.href = `/mjeketList/${qytetiId}/${spitaliId}/${repartiId}`;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getMjek = (qytetiId, spitaliId,repartiId,mjektId) => async (dispatch) => {
    try {
        console.log(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/mjeket/o/${qytetiId}/${spitaliId}/${repartiId}/${mjektId}`);
        const response =
         await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/mjeket/o/${qytetiId}/${spitaliId}/${repartiId}/${mjektId}`);
        dispatch({
            type: GET_MJEKET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deletemjkete = ( repartiId,mjektId) => async (dispatch) => {
    try {
        const response 
        = await axios.delete(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/mjeket/delete/${repartiId}/${mjektId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Marrja e JWT token-it nga localStorage
            }
        }
    );
        console.log('deleteReparti called with:', {  repartiId ,mjektId});
        dispatch({
            type: DELETE_MJEKET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};
