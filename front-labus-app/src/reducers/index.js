import { combineReducers } from "redux";
import qytetiReducer from "./QyteteReducers";
import errorReducer from "./errorReducer";
import spitaliReducer from "./SpitaliReducer";
import repartiReducer from "./RepartiReducers";
import mjeketReducer from "./MjeketReduser";
import PacinetReducer from "./PacinetiReducers";
import InfermieriReducer from "./PacinetiReducers";
import alergjiaReducer from "./AlergjiaReducers";
import takimReducer from "./TakimetReducers";
import specializimiReducer from "./SpecializimiReducers";
import recetetaReducer from "./RecetaReducer";
import UserReducers from "./UserReducers";
const rootReducer= combineReducers({
    errorReducerContent: errorReducer,
    qytetiReducerContent: qytetiReducer,
    spitaliReducerContent:spitaliReducer,
    repartiReducerContent: repartiReducer,
    mjeketReducerContetnt:mjeketReducer,
    pacinetReducerContent: PacinetReducer, 
    infermieriReducerContent: InfermieriReducer,
    alergjiaReducerContent: alergjiaReducer,
    takimReducerContent: takimReducer,
    specializimiReducerContent: specializimiReducer,
    recetetaReducerContent:recetetaReducer,
    useReducerContent:UserReducers
    
})
export default rootReducer;