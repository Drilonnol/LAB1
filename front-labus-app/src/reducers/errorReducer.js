import { GET_ERRORS } from "../actions/type";

const initialState = {
    errors: null 
};
//aksioni gjithmon e ka nje type dhe paylod type tipin e aksionit 
//ndersa payload qfare ka me kthy
export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                errors: action.payload 
            };
        default:
            return state; 
    }
}