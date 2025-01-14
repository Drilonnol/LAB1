import { GET_RECETA,GET_RECETAS,CREATE_RECETA,UPDATE_RECETA,DELETE_RECETA } from "../actions/type";

const initialState = {

    recetas:[],
    receta:{}
};
export default function recetetaReducer(state = initialState,action){
    switch (action.type){
       
           case GET_RECETA:
            return{
                ...state,
                receta:action.payload
            }; 
            case UPDATE_RECETA:
            return{
                ...state,
                receta:action.payload
            };case GET_RECETAS:
            return{
                ...state,
                recetas:action.payload
            };
            case CREATE_RECETA:
                return{
                ...state,
                receta:action.payload
                }
                case DELETE_RECETA:
                    return{
                        ...state,
                        recetas: state.recetas.filter((receta)=>receta.id !== action.payload)
                    }
            default:
                return state;
    
}
}