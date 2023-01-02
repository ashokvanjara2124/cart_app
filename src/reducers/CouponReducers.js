import { APPLY_COUPON } from "../constant/action-types";
const intialState = {
    coupon:[]
}
export  const  couponReducers = (state =intialState,action)=>{
    switch (action.type) {
        case APPLY_COUPON:
            return{
                ...state,
                coupon:action.payload
            }
            
            
    
        default:
            return state
            
    }
}