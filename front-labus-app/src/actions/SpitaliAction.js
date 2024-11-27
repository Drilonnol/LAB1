import axios from "axios";
import { GET_SPITALI, GET_SPITALIS, CREATE_SPITALI, DELETE_SPITALI, GET_ERRORS } from "./type";

export const getSpitaletList = (qyteti_id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/spitalet/reparti/${qyteti_id}`);
        dispatch({
            type: GET_SPITALIS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response ? error.response.data : "Gabim Rrjeti"
        });
    }
};

export const createEmployee = (qytetiId, spitali) => async (dispatch) => {
    try {
        const response = await axios.post(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/spitalet/create/${qytetiId}`, spitali,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Marrja e JWT token-it nga localStorage
            }
        }
    );
        dispatch({
            type: CREATE_SPITALI,
            payload: response.data
        });
        window.location.href = `/employeeList/${qytetiId}`;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response ? error.response.data : "Gabim Rrjeti"
        });
    }
};

export const getEmployee = (qytetiId, spitaliId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/spitalet/get/${qytetiId}/${spitaliId}`);
        dispatch({
            type: GET_SPITALI,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response ? error.response.data : "Gabim Rrjeti"
        });
    }
};

export const deleteEmployee = (qytetiId, spitaliId) => async (dispatch) => {
    try {
        if (window.confirm("A je i sigurt që dëshiron ta fshish?")) {
            await axios.delete(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/spitalet/delete/${qytetiId}/${spitaliId}`);
            dispatch({
                type: DELETE_SPITALI,
                payload: spitaliId
            });
            window.location.reload();
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response ? error.response.data : "Gabim Rrjeti"
        });
    }
};