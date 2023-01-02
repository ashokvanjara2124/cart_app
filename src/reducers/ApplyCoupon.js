import { APPLY_COUPONS_DATA } from "../constant/action-types";
const intialState = {
    Applycoupon: []
}
export const applycoupon = (state = intialState, action) => {
    switch (action.type) {
        case APPLY_COUPONS_DATA:
            return {
                ...state,
                Applycoupon: action.payload

            }
            break;

        default:
            return state
            break;
    }
}