import { GET_ALERGJIA,GET_ALERGJIAS,CREATE_ALERGJIA,DELETE_ALERGJIA } from "../actions/type";

const initialState = {
    alergjis: [],
    alergjia: {},
};

export default function alergjiaReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALERGJIAS:
            return {
                ...state,
                alergjis: action.payload,
            };
        case GET_ALERGJIA:
            return {
                ...state,
                alergjia: action.payload
            };
        case CREATE_ALERGJIA:
            return {
                ...state,
                alergjia: action.payload
            };
        case DELETE_ALERGJIA:
            return {
                ...state,
                alergjis: state.alergjis.filter((alergjia) => alergjia.id !== action.payload)
            };
        default:
            return state; // Removed unnecessary object wrapping
    }
}
