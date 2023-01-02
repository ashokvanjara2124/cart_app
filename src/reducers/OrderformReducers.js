import { ORDER } from '../constant/action-types'
const intialState = {
    payment_method: "",
    payment_method_title: '',
    line_items: "",
    shipping_lines: [],
    coupon_lines: [],

    billing: {
        first_name: "",
        last_name: "",
        address_1: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        email: "",
        phone: "",
    },
    shipping: {
        first_name: "",
        last_name: "",
        address_1: "",
        city: "",
        postcode: "",
        country: "",
        state: "",
    },
    orderRecivedData: [],
    loading: true
}
export const orderReducer = (state = intialState, action) => {
    // console.log("orderdatareders",state.orderRecivedData)
    switch (action.type) {
        case ORDER:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state
    }
}
