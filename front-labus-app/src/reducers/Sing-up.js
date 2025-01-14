import { CREATE_USER, LOGIN_USER , GET_USER} from "../actions/type";
//definimi i inialState
const inialState = {
    users: [],
    useri: {},
}

export default function SignuoinReducer (state= inialState , action){
    switch(action.type){
        case CREATE_USER:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                users: action.payload
            };
        case LOGIN_USER:
            return{
                ...state,
                useri:action.payload
            };
            /*case GET_USER:
                return{
                    ...state,
                    useri:action.payload
                };*/
        default:
            return state;        
    }
}