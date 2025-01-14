import { GET_SPECIALIZIMET,CREATE_SPECIALIZIMET,DELETE_SPECIALIZIMET,UPDATE_SPECIALIZIMET } from "../actions/type";

const initialState = {

    specializimis:[],
    specializimi:{}
};
export default function specializimiReducer(state = initialState,action){
    switch (action.type){
       
           case GET_SPECIALIZIMET:
            return{
                ...state,
                specializimis:action.payload
            }; case UPDATE_SPECIALIZIMET:
            return{
                ...state,
                specializimi:action.payload
            };
            case CREATE_SPECIALIZIMET:
                return{
                ...state,
                specializimi:action.payload
                }
                case DELETE_SPECIALIZIMET:
                    return{
                        ...state,
                        specializimis: state.specializimis.filter((task)=>task.id !== action.payload)
                    }
            default:
                return state;
    
}
}

