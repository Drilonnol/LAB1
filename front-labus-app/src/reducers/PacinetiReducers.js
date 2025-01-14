// importimi i actions type
import { GET_PACINETI,GET_PACINETS,CREATE_PACINETI,DELETE_PACIENTI } from "../actions/type";
//definimi i inialState
const inialState = {
    pacinets: [],
    pacinet: {},
}

export default function InfermieriReducer (state= inialState , action){
    switch(action.type){
        case GET_PACINETS:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                pacinets: action.payload
            };
        case CREATE_PACINETI:
            return{
                ...state,
                pacinet:action.payload
            };
        case GET_PACINETI:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                pacinet: action.payload
            }; 
        case DELETE_PACIENTI:
            return{
                ...state,
                pacinets: state.pacinets.filter((pacinet) => pacinet.id !== action.payload)
            };
        default:
            return state;        
    }
}