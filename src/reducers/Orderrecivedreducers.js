import { ORDERRECIVED } from "../constant/action-types";
const intialState = {
    orderreceived: [],
}
export const Orderrecivedreducers = (state = intialState, action) => {
    switch (action.type) {

        case ORDERRECIVED:
        console.log("ORDERRECIVED", action.payload); 
        return {
                ...state,
                orderreceived: action.payload
            }
            break;

        default:
            return state;
            break;
    }
}