import { GET_REPARTI,GET_REPARTS,CREATE_REPARTI,DELETE_REPARTI } from "../actions/type";

const initialState = {

    reparts:[],
    repart:{},
};
export default function repartiReducer(state = initialState,action){
    switch (action.type){
        case GET_REPARTS:
            return{...state,
                reparts:action.payload,
           };
           case GET_REPARTI:
            return{
                ...state,
                repart:action.payload
            };
            case CREATE_REPARTI:
                return{
                ...state,
                repart:action.payload
                }
                case DELETE_REPARTI:
                    return{
                        ...state,
                        reparts: state.tasks.filter((task)=>task.id !== action.payload)
                    }
            default:
                return state;
    
}
}

