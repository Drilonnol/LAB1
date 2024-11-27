// importimi i actions type
import { GET_MJEKET,GET_MJEKETS,CREATE_MJEKET,DELETE_MJEKET } from "../actions/type";
//definimi i inialState
const inialState = {
    mjekets: [],
    mjeket: {},
}

export default function mjeketReducer (state= inialState , action){
    switch(action.type){
        case GET_MJEKETS:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                mjekets: action.payload
            };
        case CREATE_MJEKET:
            return{
                ...state,
                mjeket:action.payload
            };
        case GET_MJEKET:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                mjeket: action.payload
            }; 
        case DELETE_MJEKET:
            return{
                ...state,
                mjekets: state.mjekets.filter((mjeket) => mjeket.id !== action.payload)
            };
        default:
            return state;        
    }
}