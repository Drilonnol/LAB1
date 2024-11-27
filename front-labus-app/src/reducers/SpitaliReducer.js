import { GET_SPITALI,GET_SPITALIS,CREATE_SPITALI,DELETE_SPITALI } from "../actions/type";

const initialState = {
    spitalis: [],
    spitali: {},
};

export default function spitaliReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SPITALIS:
            return {
                ...state,
                spitalis: action.payload,
            };
        case GET_SPITALI:
            return {
                ...state,
                spitali: action.payload
            };
        case CREATE_SPITALI:
            return {
                ...state,
                spitali: action.payload
            };
        case DELETE_SPITALI:
            return {
                ...state,
                spitalis: state.spitalis.filter((employee) => employee.id !== action.payload)
            };
        default:
            return state; // Removed unnecessary object wrapping
    }
}
