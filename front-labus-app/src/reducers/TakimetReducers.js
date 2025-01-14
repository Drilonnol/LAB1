import { GET_TAKIMET,GET_TAKIMETS,DELETE_TAKIMET,CREATE_TAKIMET,GET_TAKIMBYID} from "../actions/type";
//definimi i inialState
const inialState = {
    takims: [],
    takim: {},
    meetings:[],
}

export default function takimReducer(state= inialState , action){
    switch(action.type){
        case GET_TAKIMETS:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                takims: action.payload
            };
        case CREATE_TAKIMET:
            return{
                ...state,
                takim:action.payload
            };
        case GET_TAKIMET:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                takim: action.payload
            }; 
        case DELETE_TAKIMET:
            return{
                ...state,
                takims: state.takims.filter((takim) => takim.id !== action.payload)
            };
        case GET_TAKIMBYID:
            return{
                ...state,
                meetings: action.payload
            }; 
        default:
            return state;        
    }
}