import { SHIPPING_LINESDATA } from "../constant/action-types";
const intialState = {
        shipping_linesData:[]
}
export const SetformDatareducers = (state=intialState,action)=>{
    switch (action.type) {
        case  SHIPPING_LINESDATA:
            return{
                ...state,
                shipping__linesdata:action.payload
            }
            break;
    
        default:
            return state
            break;
    }
}