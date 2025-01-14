// importimi i actions type
import { GET_INFERMIERETS,GET_INFERMIERI,CREATE_INFERMIERI,DELETE_INFERMIERI } from "../actions/type";
//definimi i inialState
const inialState = {
    infermierts: [],
    infermiert: {},
}

export default function PacinetReducer (state= inialState , action){
    switch(action.type){
        case GET_INFERMIERETS:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                infermierts: action.payload
            };
        case CREATE_INFERMIERI:
            return{
                ...state,
                infermiert:action.payload
            };
        case GET_INFERMIERI:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                infermiert: action.payload
            }; 
        case DELETE_INFERMIERI:
            return{
                ...state,
                infermierts: state.infermierts.filter((infermiert) => infermiert.id !== action.payload)
            };
        default:
            return state;        
    }
}