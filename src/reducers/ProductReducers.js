import { SET_PRODUCTS } from "../constant/action-types"
const intialState = {
    products: [],

}
export const productreducers = (state = intialState, action) => {

    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        default:
            return state
    }
}