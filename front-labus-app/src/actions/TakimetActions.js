import axios from "axios";
import { GET_TAKIMET,GET_TAKIMETS,DELETE_TAKIMET,CREATE_TAKIMET,GET_TAKIMBYID } from "./type";
import { GET_ERRORS } from "./type";

export const getTakimiList = (repartiId, mjekeiId , ) => async (dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/takimet/${repartiId}/${mjekeiId}`);
        dispatch({
            type: GET_TAKIMETS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const createTakimi = (repartiId, mjekeiId, userId ,takimi) => async (dispatch) => {
    try {
        const response = await axios.post(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/takimet/create/${repartiId}/${mjekeiId}/${userId}`,takimi);
        //window.location.href = `/taskList/${dep_id}/${emp_id}`
        dispatch({
            type: CREATE_TAKIMET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getTask = (repartiId, mjekeiId, takimiId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/takimet/get/${repartiId}/${mjekeiId}/${takimiId}`);
        dispatch({
            type: GET_TAKIMET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deleteTakimi = (repartiId, mjekeiId,takimiId) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/takimet/delete/${repartiId}/${mjekeiId}/${takimiId}`);
        dispatch({
            type: DELETE_TAKIMET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};


export const getTakmiById = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://10.116.1.253:8081/meaxhimi-spitalit-app/api/takimet/user-with-meetings/${userId}`);
        dispatch({
            type: GET_TAKIMBYID,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};







/*export const getTakimiList = (repartiId, mjekeiId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8081/api/takimet/${repartiId}/${mjekeiId}`);
        dispatch({
            type: GET_TAKIMETS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const createTakimi = (repartiId, mjekeiId, takimi) => async (dispatch) => {
    try {
        const response = await axios.post(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/takimet/create/${repartiId}/${mjekeiId}`,takimi);
        //window.location.href = `/taskList/${dep_id}/${emp_id}`
        dispatch({
            type: CREATE_TAKIMET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getTask = (repartiId, mjekeiId, takimiId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8081/api/takimet/get/${repartiId}/${mjekeiId}/${takimiId}`);
        dispatch({
            type: GET_TAKIMET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deleteTakimi = (repartiId, mjekeiId,takimiId) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:8081/api/takimet/delete/${repartiId}/${mjekeiId}/${takimiId}`);
        dispatch({
            type: DELETE_TAKIMET,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};*/