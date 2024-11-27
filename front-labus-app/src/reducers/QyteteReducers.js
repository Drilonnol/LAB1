// importimi i actions type
import { GET_QYTETETS,GET_QYTETI,CREATE_QYTETI,DELETE_QYTETI } from "../actions/type";

//definimi i inialState
const inialState = {
    qytetets: [],
    qytet: {},
}

export default function qytetiReducer (state= inialState , action){
    switch(action.type){
        case GET_QYTETETS:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                qytetets: action.payload
            };
        case CREATE_QYTETI:
            return{
                ...state,
                qytet:action.payload
            };
        case GET_QYTETI:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                qytet: action.payload
            }; 
        case DELETE_QYTETI:
            return{
                ...state,
                qytetets: state.qytetets.filter((qytet) => qytet.id !== action.payload)
            };
        default:
            return state;        
    }
}