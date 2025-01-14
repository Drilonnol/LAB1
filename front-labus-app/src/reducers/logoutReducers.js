import { LOGOUT_USER } from "../actions/type";

const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  export default function SignuoinReducer (state= inialState , action){
    switch(action.type){
        case LOGOUT_USER:
            return{
                ...state,//copy gjendjen dhe endryshon nje pjes
                users: action.payload
            };
      // Handle other actions...
      default:
        return state;
    }
  }