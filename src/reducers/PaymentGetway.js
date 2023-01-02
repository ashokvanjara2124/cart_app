import { PAYMENT_METHOD } from "../constant/action-types";
const intialState = {
    payment:[]
}
export const Paymentreducers = (state = intialState, action) => {

    switch (action.type) {
        case PAYMENT_METHOD:
            return {
                ...state,
                payment: action.payload
            }
            default:
                return state
    }
}
