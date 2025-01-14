import axios from 'axios';
import { GET_USER, GET_ERRORS, GET_USERS } from './type';

export const getUser = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://192.168.0.22:8081/meaxhimi-spitalit-app/api/takimet/auth/user/${userId}`);
        const user = response.data;

        dispatch({
            type: GET_USER,
            payload: user
        });

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getAllUsers = () => async (dispatch) => {
    try {
        const response = await axios.get(`http://192.168.0.22:8083/in.mahesh.tasks/auth/user/all`);
        const user = response.data;

        dispatch({
            type: GET_USERS,
            payload:  response.data
        });

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};