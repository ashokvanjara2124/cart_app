
import { SET_SIPPING } from "../constant/action-types";
const intialState = {
    shippingData:[]
}
export  const shippingReducer = (state = intialState,action)=>{
    switch (action.type) {
        case  SET_SIPPING:
            return{
                ...state,
                Shipping:action.payload
            }
            break;
    
        default:
            return state
            break;
    }
}