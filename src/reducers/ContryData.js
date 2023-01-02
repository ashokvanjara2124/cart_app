import { CONTRY } from "../constant/action-types";
const intialState = {
    contry: []
}
export const contryreducers = (state = intialState, action) => {
    switch (action.type) {
        case CONTRY:
            return {
                ...state,
                contry: action.payload
            }
        default:
            return state;
    }
}